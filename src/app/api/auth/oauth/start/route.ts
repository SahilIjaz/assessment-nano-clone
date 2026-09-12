import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isProvider, PROVIDERS, providerConfigured } from "@/lib/oauth";
import { uid } from "@/lib/db";

/** Starts the social sign-in: real OAuth when the provider is configured, otherwise the local consent screen. */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const provider = url.searchParams.get("provider") || "";
  const role = url.searchParams.get("role");
  if (!isProvider(provider)) return NextResponse.redirect(new URL("/login?error=unknown_provider", url.origin));
  const state = uid();
  const c = await cookies();
  c.set("nn_oauth", JSON.stringify({ state, provider, role: role === "saas" || role === "influencer" ? role : null }), { httpOnly: true, sameSite: "lax", path: "/", maxAge: 600 });
  const redirectUri = `${process.env.APP_URL || url.origin}/api/auth/oauth/callback`;
  if (!providerConfigured(provider)) {
    return NextResponse.redirect(new URL(`/oauth/consent?provider=${provider}&state=${state}`, url.origin));
  }
  const cfg = PROVIDERS[provider];
  const params = new URLSearchParams({ response_type: "code", client_id: process.env[cfg.idEnv]!, redirect_uri: redirectUri, scope: cfg.scope, state });
  if (provider === "google") { params.set("access_type", "online"); params.set("prompt", "select_account"); }
  return NextResponse.redirect(`${cfg.authorize}?${params}`);
}
