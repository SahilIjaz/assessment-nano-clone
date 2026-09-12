import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { fetchIdentity, isProvider, providerConfigured, upsertSocialUser, type SocialIdentity } from "@/lib/oauth";
import { setSessionCookie } from "@/lib/auth";
import { nextFor } from "@/lib/next-for";

async function finish(req: NextRequest, identity: SocialIdentity, role: "saas" | "influencer" | null) {
  const origin = new URL(req.url).origin;
  const c = await cookies();
  c.delete("nn_oauth");
  const user = await upsertSocialUser(identity, role);
  if (!user) {
    // New person arriving from the sign-in page: keep the identity and let them pick a side first.
    c.set("nn_social", JSON.stringify(identity), { httpOnly: true, sameSite: "lax", path: "/", maxAge: 900 });
    return NextResponse.redirect(new URL("/register?social=1", origin));
  }
  await setSessionCookie(user.id);
  return NextResponse.redirect(new URL(nextFor(user), origin));
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const c = await cookies();
  const raw = c.get("nn_oauth")?.value;
  const st = raw ? (JSON.parse(raw) as { state: string; provider: string; role: "saas" | "influencer" | null }) : null;
  const state = url.searchParams.get("state");
  if (!st || !state || st.state !== state || !isProvider(st.provider)) return NextResponse.redirect(new URL("/login?error=oauth_state", url.origin));
  if (url.searchParams.get("error")) return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(url.searchParams.get("error")!)}`, url.origin));
  try {
    if (!providerConfigured(st.provider)) {
      // Local consent screen posts the chosen identity back here.
      const email = (url.searchParams.get("email") || "").toLowerCase().trim();
      const name = (url.searchParams.get("name") || "").trim();
      if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) return NextResponse.redirect(new URL(`/oauth/consent?provider=${st.provider}&state=${state}&error=email`, url.origin));
      const [firstName, ...rest] = name.split(" ");
      return finish(req, { provider: st.provider, sub: `local:${email}`, email, firstName: firstName || email.split("@")[0]!, lastName: rest.join(" ") }, st.role);
    }
    const code = url.searchParams.get("code");
    if (!code) return NextResponse.redirect(new URL("/login?error=oauth_code", url.origin));
    const identity = await fetchIdentity(st.provider, code, `${process.env.APP_URL || url.origin}/api/auth/oauth/callback`);
    return finish(req, identity, st.role);
  } catch (e) {
    console.error("[oauth]", e);
    return NextResponse.redirect(new URL("/login?error=oauth_failed", url.origin));
  }
}
