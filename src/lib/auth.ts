import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { db, uid } from "./db";
import { codeEmail, sendMail, type MailDelivery } from "./mail";

export type User = {
  id: string; email: string; password_hash: string | null; first_name: string; last_name: string; role: "saas" | "influencer";
  heard_from: string | null; email_verified: number; onboarding_step: string; locale: string; created_at: string;
};

const COOKIE = "nn_session";

export function hashPassword(p: string) { return bcrypt.hashSync(p, 10); }
export function checkPassword(p: string, hash: string | null) { return !!hash && bcrypt.compareSync(p, hash); }

export async function createSession(userId: string) {
  const token = uid() + uid().replace(/-/g, "");
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString();
  await (await db()).prepare("INSERT INTO sessions (token,user_id,expires_at) VALUES (?,?,?)").run(token, userId, expires);
  return { token, expires };
}

export async function setSessionCookie(userId: string) {
  const { token, expires } = await createSession(userId);
  const c = await cookies();
  c.set(COOKIE, token, { httpOnly: true, sameSite: "lax", path: "/", expires: new Date(expires) });
}

export async function clearSession() {
  const c = await cookies();
  const t = c.get(COOKIE)?.value;
  if (t) await (await db()).prepare("DELETE FROM sessions WHERE token=?").run(t);
  c.delete(COOKIE);
}

export async function currentUser(): Promise<User | null> {
  const c = await cookies();
  const t = c.get(COOKIE)?.value;
  if (!t) return null;
  const row = await (await db()).prepare(`SELECT u.* FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token=? AND s.expires_at > datetime('now')`).get(t) as User | undefined;
  return row ?? null;
}

export async function userByEmail(email: string): Promise<User | null> {
  return (await (await db()).prepare("SELECT * FROM users WHERE lower(email)=lower(?)").get(email) as User | undefined) ?? null;
}

/** Generates a 6-digit verification code, stores it and e-mails it (or keeps it in the local outbox when no mail provider is configured). */
export async function issueCode(email: string, purpose: "signup" | "recovery" = "signup"): Promise<MailDelivery> {
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const d = (await db());
  await d.prepare("UPDATE verification_codes SET used=1 WHERE email=? AND purpose=?").run(email, purpose);
  d.prepare("INSERT INTO verification_codes (email,code,purpose,expires_at) VALUES (?,?,?,datetime('now','+15 minutes'))").run(email, code, purpose);
  const m = codeEmail(code, purpose);
  return sendMail(email, m.subject, m.text, m.html);
}

export async function consumeCode(email: string, code: string, purpose = "signup") {
  const d = (await db());
  const row = await d.prepare("SELECT id FROM verification_codes WHERE email=? AND code=? AND purpose=? AND used=0 AND expires_at > datetime('now') ORDER BY id DESC LIMIT 1").get(email, code, purpose) as { id: number } | undefined;
  if (!row) return false;
  await d.prepare("UPDATE verification_codes SET used=1 WHERE id=?").run(row.id);
  return true;
}
