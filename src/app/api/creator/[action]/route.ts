import { NextRequest, NextResponse } from "next/server";
import type { InValue } from "@libsql/client";
import { db, uid } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { creatorSnapshot, ensureCreatorProfile } from "@/lib/creator-data";
import { assistantReply } from "@/lib/ai";

const bad = (msg: string, status = 400) => NextResponse.json({ ok: false, error: msg }, { status });

export async function GET(_req: NextRequest, ctx: { params: Promise<{ action: string }> }) {
  const { action } = await ctx.params;
  const u = await currentUser();
  if (!u || u.role !== "influencer") return bad("Unauthorized", 401);
  if (action === "state") return NextResponse.json({ ok: true, state: await creatorSnapshot(u) });
  return bad("Unknown action", 404);
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ action: string }> }) {
  const { action } = await ctx.params;
  const u = await currentUser();
  if (!u || u.role !== "influencer") return bad("Unauthorized", 401);
  const d = (await db());
  const p = await ensureCreatorProfile(u);
  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { /* empty */ }
  const str = (k: string) => String(body[k] ?? "");
  const done = async () => NextResponse.json({ ok: true, state: await creatorSnapshot(u) });

  switch (action) {
    case "profile": {
      const fields: [string, unknown][] = [];
      for (const k of ["display_name", "headline", "bio", "linkedin_url", "x_url", "country", "country_code"]) if (body[k] !== undefined) fields.push([k, str(k)]);
      if (body.industries !== undefined) fields.push(["industries_json", JSON.stringify((body.industries as string[]).slice(0, 3))]);
      if (body.price !== undefined) fields.push(["price_cents", Math.max(1000, Math.round(Number(body.price) * 100))]);
      if (body.bundles !== undefined) fields.push(["bundles_json", JSON.stringify((body.bundles as { posts: number; total: number }[]).filter((b) => b.posts > 1 && b.total > 0).map((b) => ({ posts: Math.round(b.posts), totalCents: Math.round(b.total * 100) })))]);
      if (body.pro !== undefined) fields.push(["pro_json", JSON.stringify(body.pro)]);
      if (body.payout !== undefined) fields.push(["payout_json", JSON.stringify(body.payout)]);
      if (fields.length) d.prepare(`UPDATE creator_profiles SET ${fields.map(([k]) => `${k}=?`).join(", ")} WHERE user_id=?`).run(...(fields.map(([, v]) => v) as InValue[]), u.id);
      if (body.first_name !== undefined || body.last_name !== undefined) await d.prepare("UPDATE users SET first_name=?, last_name=? WHERE id=?").run(str("first_name") || u.first_name, str("last_name") || u.last_name, u.id);
      return done();
    }
    case "refresh-linkedin": {
      // Simulated public-profile refresh: once a week, seeds plausible public stats when a LinkedIn URL is on file.
      if (!p.linkedin_url) return bad("Add your LinkedIn URL first.");
      await d.prepare("UPDATE creator_profiles SET followers=?, median_views=?, engagement_rate=? WHERE user_id=?").run(p.followers || 1240, p.median_views || 860, p.engagement_rate || 2.4, u.id);
      return done();
    }
    case "apply": {
      const campaignId = str("campaignId");
      const c = await d.prepare("SELECT * FROM campaigns WHERE id=? AND status='active'").get(campaignId) as { id: string; company_id: string } | undefined;
      if (!c) return bad("This campaign is no longer open.");
      if (await d.prepare("SELECT 1 FROM bookings WHERE campaign_id=? AND creator_user_id=?").get(campaignId, u.id)) return bad("You already applied to this campaign.");
      const id = uid();
      const amount = p.price_cents;
      await d.prepare("INSERT INTO bookings (id, company_id, campaign_id, creator_slug, creator_user_id, kind, posts, amount_cents, status, next_action, due_date) VALUES (?,?,?,?,?,?,?,?,?,?,?)").run(id, c.company_id, campaignId, p.slug ?? "creator", u.id, "single", 1, amount, "application", "Waiting for the brand to review your application", new Date(Date.now() + 5 * 864e5).toISOString());
      const convId = uid();
      await d.prepare("INSERT INTO conversations (id, company_id, creator_user_id, booking_id, kind) VALUES (?,?,?,?,?)").run(convId, c.company_id, u.id, id, "booking");
      await d.prepare("INSERT INTO messages (conversation_id, sender, body) VALUES (?,?,?)").run(convId, "system", `${p.display_name ?? u.first_name} applied to this campaign at €${Math.round(amount / 100)} per post.${str("pitch") ? " Pitch: " + str("pitch") : ""}`);
      return done();
    }
    case "booking-action": {
      const id = str("id"); const act = str("act");
      const b = await d.prepare("SELECT * FROM bookings WHERE id=? AND creator_user_id=?").get(id, u.id) as { status: string; amount_cents: number } | undefined;
      if (!b) return bad("Unknown collaboration");
      if (act === "accept") await d.prepare("UPDATE bookings SET status='accepted', next_action='Submit your draft for review', updated_at=datetime('now') WHERE id=?").run(id);
      else if (act === "decline") await d.prepare("UPDATE bookings SET status='declined', next_action=NULL, updated_at=datetime('now') WHERE id=?").run(id);
      else if (act === "submit-draft") { await d.prepare("UPDATE bookings SET status='draft_review', next_action='Brand is reviewing your draft', updated_at=datetime('now') WHERE id=?").run(id); const conv = await d.prepare("SELECT id FROM conversations WHERE booking_id=?").get(id) as { id: string } | undefined; if (conv) await d.prepare("INSERT INTO messages (conversation_id, sender, body) VALUES (?,?,?)").run(conv.id, "creator", str("draft") || "Draft submitted for review."); }
      else if (act === "publish") { await d.prepare("UPDATE bookings SET status='published', next_action='Post is live — payment releases after delivery check', updated_at=datetime('now') WHERE id=?").run(id); await d.prepare("UPDATE creator_profiles SET earned_cents=earned_cents+?, available_cents=available_cents+? WHERE user_id=?").run(b.amount_cents, b.amount_cents, u.id); }
      return done();
    }
    case "withdraw": {
      const amount = Math.round(Number(body.amountCents ?? p.available_cents));
      if (amount <= 0 || amount > p.available_cents) return bad("No earnings are currently waiting for release.");
      await d.prepare("UPDATE creator_profiles SET available_cents=available_cents-? WHERE user_id=?").run(amount, u.id);
      await d.prepare("INSERT INTO transactions (id, company_id, type, amount_cents, reference, status) VALUES (?,?,?,?,?,?)").run(uid(), "creator:" + u.id, "withdrawal", amount, "WD-" + Date.now().toString(36).toUpperCase(), "in_transit");
      return done();
    }
    case "message": {
      const convId = str("conversationId"); const text = str("body").trim(); if (!text) return bad("Empty message");
      if (convId === "naanobot") {
        let conv = await d.prepare("SELECT id FROM conversations WHERE creator_user_id=? AND kind='assistant'").get(u.id) as { id: string } | undefined;
        if (!conv) { conv = { id: uid() }; await d.prepare("INSERT INTO conversations (id, creator_user_id, kind) VALUES (?,?,?)").run(conv.id, u.id, "assistant"); }
        await d.prepare("INSERT INTO messages (conversation_id, sender, body) VALUES (?,?,?)").run(conv.id, "creator", text);
        const reply = await assistantReply(text, { role: "creator", name: u.first_name });
        await d.prepare("INSERT INTO messages (conversation_id, sender, body) VALUES (?,?,?)").run(conv.id, "assistant", reply);
        return done();
      }
      if (!await d.prepare("SELECT 1 FROM conversations WHERE id=? AND creator_user_id=?").get(convId, u.id)) return bad("Unknown conversation");
      await d.prepare("INSERT INTO messages (conversation_id, sender, body) VALUES (?,?,?)").run(convId, "creator", text);
      return done();
    }
    case "locale": { await d.prepare("UPDATE users SET locale=? WHERE id=?").run(str("locale") === "fr" ? "fr" : "en", u.id); return done(); }
    case "delete-account": { await d.prepare("DELETE FROM users WHERE id=?").run(u.id); return NextResponse.json({ ok: true }); }
    default: return bad("Unknown action", 404);
  }
}
