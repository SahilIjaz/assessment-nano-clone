import { db, uid } from "./db";
import type { User } from "./auth";
import type { Brief, Icp } from "./ai";

export type Company = {
  id: string; owner_id: string; name: string; website: string | null; tagline: string | null; description: string | null; logo_url: string | null;
  industry: string; size: string; value_prop: string | null; icps_json: string; features_json: string; differentiators_json: string;
  target_industries_json: string; target_regions_json: string; balance_cents: number; pixel_key: string | null; created_at: string;
};
export type Campaign = { id: string; company_id: string; name: string; status: string; objective: string | null; brief_json: string; source: string; created_at: string };
export type Booking = { id: string; company_id: string; campaign_id: string | null; creator_slug: string; creator_user_id: string | null; kind: string; posts: number; amount_cents: number; proposed_cents: number | null; status: string; next_action: string | null; due_date: string | null; created_at: string; updated_at: string };
export type Txn = { id: string; company_id: string; type: string; amount_cents: number; reference: string | null; status: string; created_at: string };
export type Conversation = { id: string; company_id: string | null; creator_user_id: string | null; booking_id: string | null; kind: string; created_at: string; messages: { id: number; sender: string; body: string; created_at: string }[] };

export async function companyForUser(u: User): Promise<Company | null> {
  return (await (await db()).prepare("SELECT * FROM companies WHERE owner_id=? ORDER BY created_at LIMIT 1").get(u.id) as Company | undefined) ?? null;
}

export async function ensureCompany(u: User, name: string): Promise<Company> {
  const existing = await companyForUser(u);
  if (existing) return existing;
  const id = uid();
  await (await db()).prepare("INSERT INTO companies (id, owner_id, name, pixel_key) VALUES (?,?,?,?)").run(id, u.id, name, "nn_" + uid().replace(/-/g, "").slice(0, 24));
  return (await companyForUser(u))!;
}

export function parseIcps(c: Company): Icp[] { try { return JSON.parse(c.icps_json); } catch { return []; } }
export function parseJson<T>(s: string, d: T): T { try { return JSON.parse(s) as T; } catch { return d; } }

export async function brandSnapshot(u: User) {
  const d = await db();
  const company = await companyForUser(u);
  if (!company) return null;
  const campaigns = await d.prepare("SELECT * FROM campaigns WHERE company_id=? ORDER BY created_at DESC").all(company.id) as Campaign[];
  const bookings = await d.prepare("SELECT * FROM bookings WHERE company_id=? ORDER BY updated_at DESC").all(company.id) as Booking[];
  const shortlist = (await d.prepare("SELECT creator_slug FROM shortlist WHERE company_id=? ORDER BY created_at DESC").all(company.id) as { creator_slug: string }[]).map((r) => r.creator_slug);
  const transactions = await d.prepare("SELECT * FROM transactions WHERE company_id=? ORDER BY created_at DESC").all(company.id) as Txn[];
  const convs = await d.prepare("SELECT * FROM conversations WHERE company_id=? ORDER BY created_at DESC").all(company.id) as Omit<Conversation, "messages">[];
  const conversations: Conversation[] = await Promise.all(convs.map(async (c) => ({ ...c, messages: (await d.prepare("SELECT id,sender,body,created_at FROM messages WHERE conversation_id=? ORDER BY id").all(c.id)) as Conversation["messages"] })));
  const searches = await d.prepare("SELECT * FROM nao_searches WHERE company_id=? ORDER BY created_at DESC LIMIT 20").all(company.id) as { id: string; prompt: string; summary: string | null; results_json: string; created_at: string }[];
  const team = await d.prepare("SELECT * FROM team_members WHERE company_id=? ORDER BY created_at").all(company.id) as { email: string; role: string; status: string; created_at: string }[];
  const chats = await d.prepare("SELECT * FROM ai_campaign_chats WHERE company_id=? ORDER BY created_at DESC LIMIT 10").all(company.id) as { id: string; messages_json: string; created_at: string }[];
  return {
    user: { id: u.id, email: u.email, firstName: u.first_name, lastName: u.last_name, locale: u.locale },
    company: { ...company, icps: parseIcps(company), features: parseJson<string[]>(company.features_json, []), differentiators: parseJson<string[]>(company.differentiators_json, []), targetIndustries: parseJson<string[]>(company.target_industries_json, []), targetRegions: parseJson<string[]>(company.target_regions_json, []) },
    campaigns: campaigns.map((c) => ({ ...c, brief: parseJson<Brief | null>(c.brief_json, null) })),
    bookings, shortlist, transactions, conversations, team,
    searches: searches.map((s) => ({ ...s, results: parseJson<{ slug: string; reason: string }[]>(s.results_json, []) })),
    chats: chats.map((c) => ({ ...c, messages: parseJson<{ role: "user" | "assistant"; content: string }[]>(c.messages_json, []) })),
  };
}
export type BrandSnapshot = NonNullable<Awaited<ReturnType<typeof brandSnapshot>>>;
