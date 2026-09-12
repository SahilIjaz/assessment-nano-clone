import { db, uid } from "./db";
import type { User } from "./auth";
import type { Booking, Campaign, Company } from "./brand-data";
import { parseJson } from "./brand-data";
import type { Brief } from "./ai";

export type CreatorProfile = {
  user_id: string; slug: string | null; display_name: string | null; headline: string | null; bio: string | null; linkedin_url: string | null; x_url: string | null;
  country: string | null; country_code: string | null; industries_json: string; price_cents: number; bundles_json: string; followers: number; median_views: number; engagement_rate: number;
  pro_json: string; payout_json: string; earned_cents: number; available_cents: number; created_at: string;
};

export async function ensureCreatorProfile(u: User): Promise<CreatorProfile> {
  const d = (await db());
  let row = await d.prepare("SELECT * FROM creator_profiles WHERE user_id=?").get(u.id) as CreatorProfile | undefined;
  if (!row) {
    const base = `${u.first_name}-${u.last_name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "creator";
    let slug = base, i = 2;
    while (await d.prepare("SELECT 1 FROM creator_profiles WHERE slug=?").get(slug)) slug = `${base}-${i++}`;
    await d.prepare("INSERT INTO creator_profiles (user_id, slug, display_name) VALUES (?,?,?)").run(u.id, slug, `${u.first_name} ${u.last_name}`);
    row = await d.prepare("SELECT * FROM creator_profiles WHERE user_id=?").get(u.id) as CreatorProfile;
  }
  return row;
}

export async function creatorSnapshot(u: User) {
  const d = await db();
  const p = await ensureCreatorProfile(u);
  const bookings = await d.prepare("SELECT * FROM bookings WHERE creator_user_id=? ORDER BY updated_at DESC").all(u.id) as Booking[];
  const companies = Object.fromEntries((await d.prepare("SELECT * FROM companies").all() as Company[]).map((c) => [c.id, { id: c.id, name: c.name, logo_url: c.logo_url, industry: c.industry, website: c.website }]));
  const campaigns = (await d.prepare("SELECT * FROM campaigns WHERE status='active' ORDER BY created_at DESC LIMIT 40").all() as Campaign[]).map((c) => ({ id: c.id, company_id: c.company_id, name: c.name, objective: c.objective, created_at: c.created_at, brief: parseJson<Brief | null>(c.brief_json, null), company: companies[c.company_id] ?? null, applied: bookings.some((b) => b.campaign_id === c.id) }));
  const convs = await d.prepare("SELECT * FROM conversations WHERE creator_user_id=? ORDER BY created_at DESC").all(u.id) as { id: string; company_id: string | null; booking_id: string | null; kind: string; created_at: string }[];
  const conversations = await Promise.all(convs.map(async (c) => ({ ...c, company: c.company_id ? companies[c.company_id] ?? null : null, messages: (await d.prepare("SELECT id,sender,body,created_at FROM messages WHERE conversation_id=? ORDER BY id").all(c.id)) as { id: number; sender: string; body: string; created_at: string }[] })));
  const withdrawals = await d.prepare("SELECT * FROM transactions WHERE company_id=? ORDER BY created_at DESC").all("creator:" + u.id) as { id: string; type: string; amount_cents: number; reference: string | null; status: string; created_at: string }[];
  return {
    user: { id: u.id, email: u.email, firstName: u.first_name, lastName: u.last_name, locale: u.locale, createdAt: u.created_at },
    profile: { ...p, industries: parseJson<string[]>(p.industries_json, []), bundles: parseJson<{ posts: number; totalCents: number }[]>(p.bundles_json, []), pro: parseJson<Record<string, string>>(p.pro_json, {}), payout: parseJson<Record<string, string>>(p.payout_json, {}) },
    bookings: await Promise.all(bookings.map(async (b) => ({ ...b, company: b.company_id ? companies[b.company_id] ?? null : null, campaign: ((await d.prepare("SELECT name FROM campaigns WHERE id=?").get(b.campaign_id ?? "")) as { name: string } | undefined)?.name ?? null }))),
    campaigns, conversations, withdrawals,
  };
}
export type CreatorSnapshot = Awaited<ReturnType<typeof creatorSnapshot>>;
export const newId = uid;
