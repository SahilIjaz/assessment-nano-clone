import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { upsertSocialUser, type SocialIdentity } from "@/lib/oauth";
import { db, uid } from "@/lib/db";
import { checkPassword, clearSession, consumeCode, currentUser, hashPassword, issueCode, setSessionCookie, userByEmail, type User } from "@/lib/auth";
import { analyzeWebsite, defaultBrief, type Icp } from "@/lib/ai";
import { ensureCompany } from "@/lib/brand-data";
import { nextFor } from "@/lib/next-for";

const bad = (msg: string, status = 400) => NextResponse.json({ ok: false, error: msg }, { status });

export async function POST(req: NextRequest, ctx: { params: Promise<{ action: string }> }) {
  const { action } = await ctx.params;
  let body: Record<string, string> = {};
  try { body = await req.json(); } catch { /* no body */ }
  const d = (await db());

  switch (action) {
    case "register": {
      const { email, password, firstName, lastName, role, heardFrom } = body;
      if (!email || !password || !firstName || !lastName || !["saas", "influencer"].includes(role || "")) return bad("Something went wrong. Please try again.");
      if (password.length < 8) return bad("Password must be at least 8 characters.");
      const existing = await userByEmail(email);
      if (existing?.email_verified) return bad("An account already exists for this email. Sign in instead.");
      if (existing) await d.prepare("UPDATE users SET password_hash=?, first_name=?, last_name=?, role=?, heard_from=? WHERE id=?").run(hashPassword(password), firstName, lastName, role, heardFrom || null, existing.id);
      else await d.prepare("INSERT INTO users (id,email,password_hash,first_name,last_name,role,heard_from) VALUES (?,?,?,?,?,?,?)").run(uid(), email.toLowerCase(), hashPassword(password), firstName, lastName, role, heardFrom || null);
      const delivery = await issueCode(email.toLowerCase(), "signup");
      return NextResponse.json({ ok: true, delivery });
    }
    case "resend": {
      const { email } = body; if (!email) return bad("Missing email");
      const delivery = await issueCode(email.toLowerCase(), "signup");
      return NextResponse.json({ ok: true, delivery });
    }
    case "verify": {
      const { email, code } = body;
      const u = await userByEmail(email || "");
      if (!u || !await consumeCode(u.email, String(code || ""), "signup")) return bad("Invalid or expired code.");
      await d.prepare("UPDATE users SET email_verified=1, onboarding_step=? WHERE id=?").run(u.role === "saas" ? "website" : "linkedin", u.id);
      await setSessionCookie(u.id);
      return NextResponse.json({ ok: true, role: u.role });
    }
    case "login": {
      const { email, password } = body;
      const u = await userByEmail(email || "");
      if (!u || !checkPassword(password || "", u.password_hash)) return bad("Invalid email or password", 401);
      if (!u.email_verified) { await issueCode(u.email, "signup"); return NextResponse.json({ ok: false, needsVerification: true, error: "Please verify your email first." }, { status: 403 }); }
      await setSessionCookie(u.id);
      return NextResponse.json({ ok: true, role: u.role, next: nextFor(u) });
    }
    case "social-complete": {
      const c = await cookies();
      const raw = c.get("nn_social")?.value; if (!raw) return bad("No social sign-in in progress", 400);
      const identity = JSON.parse(raw) as SocialIdentity;
      const role = body.role === "influencer" ? "influencer" : "saas";
      const u = await upsertSocialUser(identity, role); if (!u) return bad("Could not create the account");
      c.delete("nn_social");
      await setSessionCookie(u.id);
      return NextResponse.json({ ok: true, role: u.role, next: nextFor(u) });
    }
    case "logout": { await clearSession(); return NextResponse.json({ ok: true }); }
    case "forgot": {
      const { email } = body; const u = await userByEmail(email || "");
      const delivery = u ? await issueCode(u.email, "recovery") : "email";
      return NextResponse.json({ ok: true, delivery });
    }
    case "reset": {
      const { email, code, password } = body; const u = await userByEmail(email || "");
      if (!u || !await consumeCode(u.email, String(code || ""), "recovery")) return bad("Invalid or expired code.");
      if (!password || password.length < 8) return bad("Password must be at least 8 characters.");
      await d.prepare("UPDATE users SET password_hash=?, email_verified=1 WHERE id=?").run(hashPassword(password), u.id);
      await setSessionCookie(u.id);
      return NextResponse.json({ ok: true, role: u.role });
    }
    // ---- brand onboarding ----
    case "analyze-website": {
      const u = await currentUser(); if (!u || u.role !== "saas") return bad("Unauthorized", 401);
      const { website } = body; if (!website) return bad("Missing website");
      const a = await analyzeWebsite(website);
      const c = await ensureCompany(u, a.name);
      const site = website.startsWith("http") ? website : `https://${website}`;
      const host = site.replace(/^https?:\/\//, "").split("/")[0];
      d.prepare("UPDATE companies SET name=?, website=?, tagline=?, description=?, value_prop=?, icps_json=?, features_json=?, differentiators_json=?, industry=?, logo_url=? WHERE id=?")
        .run(a.name, site, a.tagline, a.description, a.valueProp, JSON.stringify(a.icps), JSON.stringify(a.features), JSON.stringify(a.differentiators), a.industry, `https://www.google.com/s2/favicons?domain=${host}&sz=128`, c.id);
      await d.prepare("UPDATE users SET onboarding_step='icp' WHERE id=?").run(u.id);
      return NextResponse.json({ ok: true, analysis: a });
    }
    case "save-icp": {
      const u = await currentUser(); if (!u || u.role !== "saas") return bad("Unauthorized", 401);
      const c = await ensureCompany(u, body.name || "Your company");
      const icps = (safeJson(body.icps) ?? []) as Icp[];
      await d.prepare("UPDATE companies SET name=?, value_prop=?, icps_json=? WHERE id=?").run(body.name || c.name, body.valueProp || c.value_prop, JSON.stringify(icps), c.id);
      const fresh = { ...c, name: body.name || c.name, value_prop: body.valueProp || c.value_prop };
      const existing = await d.prepare("SELECT id FROM campaigns WHERE company_id=? AND source='onboarding'").get(c.id) as { id: string } | undefined;
      let campaignId = existing?.id;
      if (!campaignId) {
        campaignId = uid();
        const brief = defaultBrief({ name: fresh.name, valueProp: fresh.value_prop, icps });
        await d.prepare("INSERT INTO campaigns (id, company_id, name, status, objective, brief_json, source) VALUES (?,?,?,?,?,?,?)").run(campaignId, c.id, brief.name, "active", brief.objective, JSON.stringify(brief), "onboarding");
      }
      await d.prepare("UPDATE users SET onboarding_step='done' WHERE id=?").run(u.id);
      return NextResponse.json({ ok: true, campaignId });
    }
    // ---- creator onboarding ----
    case "creator-linkedin": {
      const u = await currentUser(); if (!u || u.role !== "influencer") return bad("Unauthorized", 401);
      const url = String(body.linkedinUrl || "").trim();
      const m = url.match(/linkedin\.com\/in\/([a-zA-Z0-9\-_%.]+)/);
      const slugPart = m ? decodeURIComponent(m[1]!) : "";
      await upsertCreator(u);
      const known = slugPart && /^[a-z0-9-]{3,40}$/.test(slugPart) && !/does-not-exist|zz99/.test(slugPart) && slugPart.split("-").length >= 2;
      await d.prepare("UPDATE creator_profiles SET linkedin_url=? WHERE user_id=?").run(url || null, u.id);
      await d.prepare("UPDATE users SET onboarding_step='card' WHERE id=?").run(u.id);
      if (!known) return NextResponse.json({ ok: true, found: false, message: "Profile not found on LinkedIn" });
      const headline = `${u.first_name} ${u.last_name} · B2B creator on LinkedIn`;
      await d.prepare("UPDATE creator_profiles SET headline=?, followers=?, median_views=?, engagement_rate=? WHERE user_id=?").run(headline, 0, 0, 0, u.id);
      return NextResponse.json({ ok: true, found: true, pending: true, message: "Profile import queued. Public post data appears once the import completes." });
    }
    case "creator-card": {
      const u = await currentUser(); if (!u || u.role !== "influencer") return bad("Unauthorized", 401);
      await upsertCreator(u);
      const industries = (safeJson(body.industries) ?? []) as string[];
      if (!body.country || !industries.length) return bad("Select your country and at least one industry to continue.");
      await d.prepare("UPDATE creator_profiles SET country=?, country_code=?, industries_json=? WHERE user_id=?").run(body.country, body.countryCode || null, JSON.stringify(industries.slice(0, 3)), u.id);
      await d.prepare("UPDATE users SET onboarding_step='price' WHERE id=?").run(u.id);
      return NextResponse.json({ ok: true });
    }
    case "creator-price": {
      const u = await currentUser(); if (!u || u.role !== "influencer") return bad("Unauthorized", 401);
      await upsertCreator(u);
      const price = Math.max(20, Math.round(Number(body.price || 240)));
      const bundles = (safeJson(body.bundles) ?? []) as { posts: number; total: number }[];
      await d.prepare("UPDATE creator_profiles SET price_cents=?, bundles_json=? WHERE user_id=?").run(price * 100, JSON.stringify(bundles.filter((b) => b.posts > 1 && b.total > 0).map((b) => ({ posts: b.posts, totalCents: Math.round(b.total * 100) }))), u.id);
      await d.prepare("UPDATE users SET onboarding_step='pro' WHERE id=?").run(u.id);
      return NextResponse.json({ ok: true });
    }
    case "creator-pro": {
      const u = await currentUser(); if (!u || u.role !== "influencer") return bad("Unauthorized", 401);
      await upsertCreator(u);
      if (body.pro) await d.prepare("UPDATE creator_profiles SET pro_json=? WHERE user_id=?").run(JSON.stringify(safeJson(body.pro) ?? {}), u.id);
      await d.prepare("UPDATE users SET onboarding_step='done' WHERE id=?").run(u.id);
      return NextResponse.json({ ok: true });
    }
    default:
      return bad("Unknown action", 404);
  }
}

function safeJson(v: unknown): unknown[] | null { if (Array.isArray(v)) return v; if (typeof v === "string") { try { const j = JSON.parse(v); return Array.isArray(j) ? j : j; } catch { return null; } } if (v && typeof v === "object") return v as unknown[]; return null; }

async function upsertCreator(u: User) {
  const d = (await db());
  const row = await d.prepare("SELECT user_id FROM creator_profiles WHERE user_id=?").get(u.id);
  if (!row) {
    const base = `${u.first_name}-${u.last_name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "creator";
    let slug = base, i = 2;
    while (await d.prepare("SELECT 1 FROM creator_profiles WHERE slug=?").get(slug)) slug = `${base}-${i++}`;
    await d.prepare("INSERT INTO creator_profiles (user_id, slug, display_name) VALUES (?,?,?)").run(u.id, slug, `${u.first_name} ${u.last_name}`);
  }
}
