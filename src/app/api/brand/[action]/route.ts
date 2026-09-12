import { NextRequest, NextResponse } from "next/server";
import type { InValue } from "@libsql/client";
import { db, uid } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { brandSnapshot, companyForUser, parseIcps, parseJson } from "@/lib/brand-data";
import { assistantReply, chatBrief, defaultBrief, naoSearch, type Brief } from "@/lib/ai";
import { creatorBySlug } from "@/data/creators";

const bad = (msg: string, status = 400) => NextResponse.json({ ok: false, error: msg }, { status });

export async function GET(_req: NextRequest, ctx: { params: Promise<{ action: string }> }) {
  const { action } = await ctx.params;
  const u = await currentUser();
  if (!u || u.role !== "saas") return bad("Unauthorized", 401);
  if (action === "state") return NextResponse.json({ ok: true, state: await brandSnapshot(u) });
  return bad("Unknown action", 404);
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ action: string }> }) {
  const { action } = await ctx.params;
  const u = await currentUser();
  if (!u || u.role !== "saas") return bad("Unauthorized", 401);
  const company = await companyForUser(u);
  if (!company) return bad("No company", 400);
  const d = (await db());
  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { /* empty */ }
  const str = (k: string) => String(body[k] ?? "");
  const num = (k: string) => Number(body[k] ?? 0);
  const done = async () => NextResponse.json({ ok: true, state: await brandSnapshot(u) });

  switch (action) {
    case "shortlist": {
      const slug = str("slug"); if (!creatorBySlug(slug)) return bad("Unknown creator");
      if (body.on === false) await d.prepare("DELETE FROM shortlist WHERE company_id=? AND creator_slug=?").run(company.id, slug);
      else await d.prepare("INSERT OR IGNORE INTO shortlist (company_id, creator_slug, campaign_id) VALUES (?,?,?)").run(company.id, slug, body.campaignId ? str("campaignId") : null);
      return done();
    }
    case "book": {
      const slug = str("slug"); const c = creatorBySlug(slug); if (!c) return bad("Unknown creator");
      const kind = str("kind") === "bundle" && c.bundle ? "bundle" : "single";
      const posts = kind === "bundle" ? c.bundle!.posts : 1;
      const amount = kind === "bundle" ? c.bundle!.totalCents : c.priceCents;
      const proposed = body.proposedCents ? Math.round(num("proposedCents")) : null;
      const campaignId = str("campaignId") || (await d.prepare("SELECT id FROM campaigns WHERE company_id=? ORDER BY created_at LIMIT 1").get(company.id) as { id: string } | undefined)?.id || null;
      const id = uid();
      const status = proposed ? "negotiating" : "invited";
      d.prepare("INSERT INTO bookings (id, company_id, campaign_id, creator_slug, kind, posts, amount_cents, proposed_cents, status, next_action, due_date) VALUES (?,?,?,?,?,?,?,?,?,?,?)")
        .run(id, company.id, campaignId, slug, kind, posts, amount, proposed, status, proposed ? "Waiting for the creator's answer to your offer" : "Waiting for the creator to accept", new Date(Date.now() + 7 * 864e5).toISOString());
      // open the conversation thread for this booking
      const convId = uid();
      await d.prepare("INSERT INTO conversations (id, company_id, creator_user_id, booking_id, kind) VALUES (?,?,?,?,?)").run(convId, company.id, null, id, "booking");
      await d.prepare("INSERT INTO messages (conversation_id, sender, body) VALUES (?,?,?)").run(convId, "system", proposed ? `You proposed €${(proposed / 100).toFixed(0)} for ${posts} post${posts > 1 ? "s" : ""} to ${c.name}. The creator has 72h to answer.` : `Invitation sent to ${c.name} for ${posts} post${posts > 1 ? "s" : ""} at €${(amount / 100).toFixed(0)}. The thread opens fully once the creator accepts.`);
      await d.prepare("INSERT OR IGNORE INTO shortlist (company_id, creator_slug, campaign_id) VALUES (?,?,?)").run(company.id, slug, campaignId);
      return done();
    }
    case "booking-action": {
      const id = str("id"); const act = str("act");
      const b = await d.prepare("SELECT * FROM bookings WHERE id=? AND company_id=?").get(id, company.id) as { status: string } | undefined;
      if (!b) return bad("Unknown booking");
      if (act === "cancel") await d.prepare("UPDATE bookings SET status='cancelled', next_action=NULL, updated_at=datetime('now') WHERE id=?").run(id);
      else if (act === "approve") await d.prepare("UPDATE bookings SET status='published', next_action='Post is live — results are tracked in Results', updated_at=datetime('now') WHERE id=?").run(id);
      else if (act === "request-changes") await d.prepare("UPDATE bookings SET status='draft_changes', next_action='Creator is revising the draft', updated_at=datetime('now') WHERE id=?").run(id);
      return done();
    }
    case "nao": {
      const prompt = str("prompt").trim(); if (!prompt) return bad("Empty request");
      const res = await naoSearch(prompt, { name: company.name, valueProp: company.value_prop, icps: parseIcps(company), industries: parseJson<string[]>(company.target_industries_json, []) }, Math.min(8, Math.max(3, num("count") || 4)));
      const id = uid();
      await d.prepare("INSERT INTO nao_searches (id, company_id, prompt, summary, results_json) VALUES (?,?,?,?,?)").run(id, company.id, prompt, `${res.intro}\n\n${res.summary}`, JSON.stringify(res.picks));
      return NextResponse.json({ ok: true, search: { id, prompt, intro: res.intro, summary: res.summary, picks: res.picks }, state: await brandSnapshot(u) });
    }
    case "campaign-create": {
      const name = str("name").trim() || `${company.name} campaign`;
      const brief = (body.brief as Brief | undefined) ?? defaultBrief({ name: company.name, valueProp: company.value_prop, icps: parseIcps(company) });
      brief.name = name;
      const id = uid();
      await d.prepare("INSERT INTO campaigns (id, company_id, name, status, objective, brief_json, source) VALUES (?,?,?,?,?,?,?)").run(id, company.id, name, str("status") || "active", brief.objective, JSON.stringify(brief), str("source") || "manual");
      return NextResponse.json({ ok: true, id, state: await brandSnapshot(u) });
    }
    case "campaign-update": {
      const id = str("id"); const c = await d.prepare("SELECT * FROM campaigns WHERE id=? AND company_id=?").get(id, company.id) as { brief_json: string } | undefined; if (!c) return bad("Unknown campaign");
      const brief = { ...parseJson<Brief>(c.brief_json, defaultBrief({ name: company.name })), ...((body.brief as Partial<Brief>) || {}) };
      await d.prepare("UPDATE campaigns SET name=?, status=?, objective=?, brief_json=? WHERE id=?").run(str("name") || brief.name, str("status") || "active", brief.objective, JSON.stringify(brief), id);
      return done();
    }
    case "campaign-ai": {
      const chatId = str("chatId") || uid();
      const existing = await d.prepare("SELECT messages_json FROM ai_campaign_chats WHERE id=? AND company_id=?").get(chatId, company.id) as { messages_json: string } | undefined;
      const messages = existing ? parseJson<{ role: "user" | "assistant"; content: string }[]>(existing.messages_json, []) : [];
      messages.push({ role: "user", content: str("message") });
      const out = await chatBrief(messages, { name: company.name, valueProp: company.value_prop, icps: parseIcps(company) });
      messages.push({ role: "assistant", content: out.reply });
      if (existing) await d.prepare("UPDATE ai_campaign_chats SET messages_json=? WHERE id=?").run(JSON.stringify(messages), chatId);
      else await d.prepare("INSERT INTO ai_campaign_chats (id, company_id, messages_json) VALUES (?,?,?)").run(chatId, company.id, JSON.stringify(messages));
      let campaignId: string | undefined;
      if (out.brief) {
        campaignId = uid();
        await d.prepare("INSERT INTO campaigns (id, company_id, name, status, objective, brief_json, source) VALUES (?,?,?,?,?,?,?)").run(campaignId, company.id, out.brief.name || `${company.name} campaign`, "draft", out.brief.objective, JSON.stringify(out.brief), "ai");
      }
      return NextResponse.json({ ok: true, chatId, reply: out.reply, campaignId, state: await brandSnapshot(u) });
    }
    case "campaign-from-link": {
      const link = str("link").trim(); if (!/^https?:\/\//.test(link)) return bad("Paste a valid link (Notion, Google Docs, PDF…)");
      const brief = defaultBrief({ name: company.name, valueProp: company.value_prop, icps: parseIcps(company) });
      brief.name = `${company.name} · imported brief`;
      brief.context = `Brief imported from ${link}. ${brief.context}`;
      const id = uid();
      await d.prepare("INSERT INTO campaigns (id, company_id, name, status, objective, brief_json, source) VALUES (?,?,?,?,?,?,?)").run(id, company.id, brief.name, "draft", brief.objective, JSON.stringify(brief), "link");
      return NextResponse.json({ ok: true, id, state: await brandSnapshot(u) });
    }
    case "topup": {
      const amount = Math.round(num("amountCents")); if (amount < 50000) return bad("Minimum €500");
      await d.prepare("UPDATE companies SET balance_cents=balance_cents+? WHERE id=?").run(amount, company.id);
      await d.prepare("INSERT INTO transactions (id, company_id, type, amount_cents, reference, status) VALUES (?,?,?,?,?,?)").run(uid(), company.id, "topup", amount, "TOP-" + Date.now().toString(36).toUpperCase(), "paid");
      return done();
    }
    case "message": {
      const convId = str("conversationId"); const text = str("body").trim(); if (!text) return bad("Empty message");
      if (convId === "naanobot") {
        let conv = await d.prepare("SELECT id FROM conversations WHERE company_id=? AND kind='assistant'").get(company.id) as { id: string } | undefined;
        if (!conv) { conv = { id: uid() }; await d.prepare("INSERT INTO conversations (id, company_id, kind) VALUES (?,?,?)").run(conv.id, company.id, "assistant"); }
        await d.prepare("INSERT INTO messages (conversation_id, sender, body) VALUES (?,?,?)").run(conv.id, "brand", text);
        const reply = await assistantReply(text, { role: "brand", name: u.first_name });
        await d.prepare("INSERT INTO messages (conversation_id, sender, body) VALUES (?,?,?)").run(conv.id, "assistant", reply);
        return done();
      }
      const conv = await d.prepare("SELECT id FROM conversations WHERE id=? AND company_id=?").get(convId, company.id);
      if (!conv) return bad("Unknown conversation");
      await d.prepare("INSERT INTO messages (conversation_id, sender, body) VALUES (?,?,?)").run(convId, "brand", text);
      return done();
    }
    case "settings": {
      const fields: [string, unknown][] = [];
      for (const k of ["name", "website", "tagline", "description", "industry", "size"]) if (body[k] !== undefined) fields.push([k, str(k)]);
      if (body.icps !== undefined) fields.push(["icps_json", JSON.stringify(body.icps)]);
      if (body.features !== undefined) fields.push(["features_json", JSON.stringify(body.features)]);
      if (body.differentiators !== undefined) fields.push(["differentiators_json", JSON.stringify(body.differentiators)]);
      if (body.targetIndustries !== undefined) fields.push(["target_industries_json", JSON.stringify(body.targetIndustries)]);
      if (body.targetRegions !== undefined) fields.push(["target_regions_json", JSON.stringify(body.targetRegions)]);
      if (body.valueProp !== undefined) fields.push(["value_prop", str("valueProp")]);
      if (fields.length) d.prepare(`UPDATE companies SET ${fields.map(([k]) => `${k}=?`).join(", ")} WHERE id=?`).run(...(fields.map(([, v]) => v) as InValue[]), company.id);
      return done();
    }
    case "team-invite": {
      const email = str("email").trim().toLowerCase(); if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) return bad("Enter a valid work email");
      await d.prepare("INSERT OR REPLACE INTO team_members (company_id, email, role, status) VALUES (?,?,?,?)").run(company.id, email, str("role") || "member", "invited");
      return done();
    }
    case "team-remove": { await d.prepare("DELETE FROM team_members WHERE company_id=? AND email=?").run(company.id, str("email")); return done(); }
    case "locale": { await d.prepare("UPDATE users SET locale=? WHERE id=?").run(str("locale") === "fr" ? "fr" : "en", u.id); return done(); }
    default: return bad("Unknown action", 404);
  }
}
