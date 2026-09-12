import { db, uid } from "./db";
import type { User } from "./auth";

export type Provider = "google" | "linkedin_oidc";

export const PROVIDERS: Record<Provider, { name: string; authorize: string; token: string; userinfo: string; scope: string; idEnv: string; secretEnv: string }> = {
  google: { name: "Google", authorize: "https://accounts.google.com/o/oauth2/v2/auth", token: "https://oauth2.googleapis.com/token", userinfo: "https://openidconnect.googleapis.com/v1/userinfo", scope: "openid email profile", idEnv: "GOOGLE_CLIENT_ID", secretEnv: "GOOGLE_CLIENT_SECRET" },
  linkedin_oidc: { name: "LinkedIn", authorize: "https://www.linkedin.com/oauth/v2/authorization", token: "https://www.linkedin.com/oauth/v2/accessToken", userinfo: "https://api.linkedin.com/v2/userinfo", scope: "openid profile email", idEnv: "LINKEDIN_CLIENT_ID", secretEnv: "LINKEDIN_CLIENT_SECRET" },
};

export const isProvider = (p: string): p is Provider => p === "google" || p === "linkedin_oidc";
export const providerConfigured = (p: Provider) => !!(process.env[PROVIDERS[p].idEnv] && process.env[PROVIDERS[p].secretEnv]);

export type SocialIdentity = { provider: Provider; sub: string; email: string; firstName: string; lastName: string; picture?: string };

/** Exchanges an authorization code for the OpenID user profile. */
export async function fetchIdentity(p: Provider, code: string, redirectUri: string): Promise<SocialIdentity> {
  const cfg = PROVIDERS[p];
  const tokenRes = await fetch(cfg.token, { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: redirectUri, client_id: process.env[cfg.idEnv]!, client_secret: process.env[cfg.secretEnv]! }) });
  if (!tokenRes.ok) throw new Error(`${cfg.name} token exchange failed (${tokenRes.status})`);
  const tok = (await tokenRes.json()) as { access_token: string };
  const infoRes = await fetch(cfg.userinfo, { headers: { authorization: `Bearer ${tok.access_token}` } });
  if (!infoRes.ok) throw new Error(`${cfg.name} userinfo failed (${infoRes.status})`);
  const info = (await infoRes.json()) as { sub: string; email?: string; email_verified?: boolean; given_name?: string; family_name?: string; name?: string; picture?: string };
  if (!info.email) throw new Error(`${cfg.name} did not return an e-mail address`);
  const [gn, ...rest] = (info.name || "").split(" ");
  return { provider: p, sub: info.sub, email: info.email.toLowerCase(), firstName: info.given_name || gn || "", lastName: info.family_name || rest.join(" ") || "", picture: info.picture };
}

/** Finds the user for a social identity, or creates one when a role is known. Returns null when a role is still needed. */
export async function upsertSocialUser(id: SocialIdentity, role: "saas" | "influencer" | null): Promise<User | null> {
  const d = (await db());
  const linked = await d.prepare("SELECT u.* FROM social_identities s JOIN users u ON u.id=s.user_id WHERE s.provider=? AND s.subject=?").get(id.provider, id.sub) as User | undefined;
  if (linked) return linked;
  const byEmail = await d.prepare("SELECT * FROM users WHERE lower(email)=lower(?)").get(id.email) as User | undefined;
  if (byEmail) {
    await d.prepare("INSERT OR IGNORE INTO social_identities (provider, subject, user_id, email) VALUES (?,?,?,?)").run(id.provider, id.sub, byEmail.id, id.email);
    if (!byEmail.email_verified) await d.prepare("UPDATE users SET email_verified=1, onboarding_step=CASE WHEN onboarding_step='verify' THEN (CASE role WHEN 'saas' THEN 'website' ELSE 'linkedin' END) ELSE onboarding_step END WHERE id=?").run(byEmail.id);
    return await d.prepare("SELECT * FROM users WHERE id=?").get(byEmail.id) as User;
  }
  if (!role) return null;
  const userId = uid();
  await d.prepare("INSERT INTO users (id,email,password_hash,first_name,last_name,role,heard_from,email_verified,onboarding_step) VALUES (?,?,?,?,?,?,?,1,?)").run(userId, id.email, null, id.firstName || "New", id.lastName || "User", role, id.provider === "google" ? "Google" : "LinkedIn", role === "saas" ? "website" : "linkedin");
  await d.prepare("INSERT INTO social_identities (provider, subject, user_id, email) VALUES (?,?,?,?)").run(id.provider, id.sub, userId, id.email);
  if (role === "influencer" && id.provider === "linkedin_oidc") await d.prepare("INSERT OR IGNORE INTO creator_profiles (user_id, slug, display_name) VALUES (?,?,?)").run(userId, `${id.firstName}-${id.lastName}-${userId.slice(0, 4)}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"), `${id.firstName} ${id.lastName}`.trim());
  return await d.prepare("SELECT * FROM users WHERE id=?").get(userId) as User;
}
