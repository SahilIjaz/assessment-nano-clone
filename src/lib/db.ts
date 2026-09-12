import { createClient, type Client, type InArgs, type InValue } from "@libsql/client";
import path from "node:path";
import fs from "node:fs";

/**
 * Database access (libSQL). Locally it is a SQLite file (./data/naano.db); in production point TURSO_DATABASE_URL
 * (+ TURSO_AUTH_TOKEN) at a hosted Turso database. The SQL dialect is SQLite in both cases.
 */
type Row = Record<string, unknown>;
type Args = InValue[];

class Statement {
  constructor(private c: Client, private sql: string) {}
  async get<T = Row>(...args: Args): Promise<T | undefined> { const r = await this.c.execute({ sql: this.sql, args: args as InArgs }); return r.rows[0] as T | undefined; }
  async all<T = Row>(...args: Args): Promise<T[]> { const r = await this.c.execute({ sql: this.sql, args: args as InArgs }); return r.rows as unknown as T[]; }
  async run(...args: Args): Promise<{ changes: number }> { const r = await this.c.execute({ sql: this.sql, args: args as InArgs }); return { changes: r.rowsAffected }; }
}

export class Db {
  constructor(private c: Client) {}
  prepare(sql: string) { return new Statement(this.c, sql); }
  exec(sql: string) { return this.c.executeMultiple(sql); }
}

let _db: Db | null = null;
let _ready: Promise<void> | null = null;

function client(): Client {
  if (process.env.TURSO_DATABASE_URL) return createClient({ url: process.env.TURSO_DATABASE_URL, authToken: process.env.TURSO_AUTH_TOKEN });
  // Local file. On serverless hosts (Vercel) the project dir is read-only, so fall back to /tmp — ephemeral, meant only
  // for a first deploy before TURSO_DATABASE_URL is configured.
  const dir = process.env.VERCEL ? "/tmp" : path.join(process.cwd(), "data");
  fs.mkdirSync(dir, { recursive: true });
  if (process.env.VERCEL) console.warn("[db] TURSO_DATABASE_URL is not set: using an ephemeral /tmp database. Connect Turso for persistent data.");
  return createClient({ url: "file:" + path.join(dir, "naano.db") });
}

/** Returns the database, running migrations once per process. */
export async function db(): Promise<Db> {
  if (!_db) _db = new Db(client());
  if (!_ready) _ready = migrate(_db);
  await _ready;
  return _db;
}

async function migrate(d: Db) {
  await d.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    first_name TEXT NOT NULL DEFAULT '',
    last_name TEXT NOT NULL DEFAULT '',
    role TEXT NOT NULL CHECK (role IN ('saas','influencer')),
    heard_from TEXT,
    email_verified INTEGER NOT NULL DEFAULT 0,
    onboarding_step TEXT NOT NULL DEFAULT 'verify',
    locale TEXT NOT NULL DEFAULT 'en',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS verification_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    code TEXT NOT NULL,
    purpose TEXT NOT NULL DEFAULT 'signup',
    expires_at TEXT NOT NULL,
    used INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS companies (
    id TEXT PRIMARY KEY,
    owner_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    website TEXT,
    tagline TEXT,
    description TEXT,
    logo_url TEXT,
    industry TEXT DEFAULT 'SaaS',
    size TEXT DEFAULT '11–50',
    value_prop TEXT,
    icps_json TEXT NOT NULL DEFAULT '[]',
    features_json TEXT NOT NULL DEFAULT '[]',
    differentiators_json TEXT NOT NULL DEFAULT '[]',
    target_industries_json TEXT NOT NULL DEFAULT '["B2B","SaaS","Software"]',
    target_regions_json TEXT NOT NULL DEFAULT '["Europe"]',
    balance_cents INTEGER NOT NULL DEFAULT 0,
    pixel_key TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS creator_profiles (
    user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    slug TEXT UNIQUE,
    display_name TEXT,
    headline TEXT,
    bio TEXT,
    linkedin_url TEXT,
    x_url TEXT,
    country TEXT,
    country_code TEXT,
    industries_json TEXT NOT NULL DEFAULT '[]',
    price_cents INTEGER NOT NULL DEFAULT 24000,
    bundles_json TEXT NOT NULL DEFAULT '[]',
    followers INTEGER NOT NULL DEFAULT 0,
    median_views INTEGER NOT NULL DEFAULT 0,
    engagement_rate REAL NOT NULL DEFAULT 0,
    pro_json TEXT NOT NULL DEFAULT '{}',
    payout_json TEXT NOT NULL DEFAULT '{}',
    earned_cents INTEGER NOT NULL DEFAULT 0,
    available_cents INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS campaigns (
    id TEXT PRIMARY KEY,
    company_id TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    objective TEXT,
    brief_json TEXT NOT NULL DEFAULT '{}',
    source TEXT NOT NULL DEFAULT 'onboarding',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS shortlist (
    company_id TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    creator_slug TEXT NOT NULL,
    campaign_id TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (company_id, creator_slug)
  );
  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    company_id TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    campaign_id TEXT REFERENCES campaigns(id) ON DELETE SET NULL,
    creator_slug TEXT NOT NULL,
    creator_user_id TEXT,
    kind TEXT NOT NULL DEFAULT 'single',
    posts INTEGER NOT NULL DEFAULT 1,
    amount_cents INTEGER NOT NULL,
    proposed_cents INTEGER,
    status TEXT NOT NULL DEFAULT 'invited',
    next_action TEXT,
    due_date TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
    company_id TEXT NOT NULL,
    type TEXT NOT NULL,
    amount_cents INTEGER NOT NULL,
    reference TEXT,
    status TEXT NOT NULL DEFAULT 'paid',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS conversations (
    id TEXT PRIMARY KEY,
    company_id TEXT,
    creator_user_id TEXT,
    booking_id TEXT,
    kind TEXT NOT NULL DEFAULT 'booking',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS nao_searches (
    id TEXT PRIMARY KEY,
    company_id TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    prompt TEXT NOT NULL,
    summary TEXT,
    results_json TEXT NOT NULL DEFAULT '[]',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS ai_campaign_chats (
    id TEXT PRIMARY KEY,
    company_id TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    messages_json TEXT NOT NULL DEFAULT '[]',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS team_members (
    company_id TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'member',
    status TEXT NOT NULL DEFAULT 'invited',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (company_id, email)
  );
  CREATE TABLE IF NOT EXISTS social_identities (
    provider TEXT NOT NULL,
    subject TEXT NOT NULL,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    email TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (provider, subject)
  );
  CREATE TABLE IF NOT EXISTS outbox (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    to_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  `);
}

export const uid = () => crypto.randomUUID();
export const nowIso = () => new Date().toISOString();
