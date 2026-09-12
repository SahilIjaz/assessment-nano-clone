"use client";
import { useState } from "react";

export function LangButton() {
  return (
    <button type="button" aria-label="Switch language" title="Only English is available for now" style={{ display: "flex", alignItems: "center", gap: "6px", height: "32px", padding: "0 10px", borderRadius: "8px", border: "none", background: "transparent", cursor: "not-allowed", fontFamily: "inherit", opacity: 1 }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: "#6B7280" }}><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
      <span style={{ display: "inline-block", width: "20px", height: "18px", position: "relative", overflow: "hidden" }}><span style={{ display: "block", position: "absolute", inset: "0", fontSize: "13px", fontWeight: "600", textTransform: "uppercase", color: "var(--v3-text-secondary, #17181C)", letterSpacing: "0.02em", lineHeight: "18px", textAlign: "center" }}>EN</span></span>
    </button>
  );
}

export const GoogleIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" /><path fill="#FBBC05" d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.95l3.66-2.84Z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.07.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" /></svg>);
export const LinkedInBadge = () => (<span aria-hidden="true" style={{ display: "inline-flex", width: 20, height: 20, borderRadius: 4, background: "#0A66C2", color: "#fff", alignItems: "center", justifyContent: "center" }}><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45Z" /></svg></span>);

export const OAUTH_BTN = "w-full h-12 rounded-xl text-[15px] font-semibold text-[#111827] bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all cursor-pointer flex items-center justify-center gap-3";
export const INPUT = "w-full bg-white border border-[#D1D5DB] rounded-xl px-4 py-3.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30 focus:border-[#2563eb] transition-all";
export const LABEL = "block text-xs font-semibold text-[#5C5B57] uppercase tracking-wide mb-1.5 ml-1";
export const PRIMARY = "w-full h-11 bg-[#2563eb] text-white rounded-xl text-sm font-semibold hover:bg-[#1d4ed8] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2";

export function OAuthButtons({ mode, role }: { mode: "in" | "up"; role?: string }) {
  const label = mode === "in" ? "Continue with" : "Sign up with";
  const q = role ? `&role=${role}` : "";
  return (
    <div className="space-y-3">
      <a href={`/api/auth/oauth/start?provider=linkedin_oidc${q}`} className={OAUTH_BTN}><LinkedInBadge /><span>{label} LinkedIn</span></a>
      <a href={`/api/auth/oauth/start?provider=google${q}`} className={OAUTH_BTN}><GoogleIcon /><span>{label} Google</span></a>
    </div>
  );
}

export function AuthLayout({ children, side, wide }: { children: React.ReactNode; side: React.ReactNode; wide?: boolean }) {
  return (
    <>
      <div className="bg-noise" />
      <div className="min-h-screen flex" style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="flex-1 flex items-start sm:items-center justify-center p-6 sm:p-10 bg-white min-w-0 overflow-y-auto">
          <div className={`w-full ${wide ? "max-w-lg" : "max-w-md"}`}>
            <div className="flex items-center justify-between gap-4 mb-8"><a href="/"><img src="/logo.svg" alt="naano" className="h-7" /></a><div className="flex items-center gap-3"><LangButton /></div></div>
            {children}
          </div>
        </div>
        {side}
      </div>
    </>
  );
}

export function BlueSide({ title, body, foot }: { title: string; body: string; foot?: string }) {
  return (
    <div className="hidden lg:flex flex-1 items-center justify-center p-12 text-white" style={{ background: "#2563eb" }}>
      <div className="max-w-sm"><h2 className="text-3xl font-bold mb-4">{title}</h2><p className="text-blue-100 mb-8">{body}</p>{foot && <div className="text-sm text-blue-200">{foot}</div>}</div>
    </div>
  );
}

export async function postJson(url: string, body: Record<string, unknown>) {
  const r = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  return r.json() as Promise<{ ok: boolean; error?: string; [k: string]: unknown }>;
}
