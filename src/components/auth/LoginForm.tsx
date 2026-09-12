"use client";
import { useState } from "react";
import { AuthLayout, BlueSide, INPUT, LABEL, OAuthButtons, PRIMARY, postJson } from "./AuthShell";

export default function LoginForm({ initialError }: { initialError?: string | null }) {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [show, setShow] = useState(false);
  const [err, setErr] = useState<string | null>(initialError ?? null); const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setErr(null);
    const r = await postJson("/api/auth/login", { email, password });
    setBusy(false);
    if (r.ok) window.location.href = (r.next as string) || (r.role === "saas" ? "/brand" : "/creator");
    else if (r.needsVerification) window.location.href = `/register?role=${email.includes("creator") ? "influencer" : "saas"}&verify=${encodeURIComponent(email)}`;
    else setErr(r.error || "Invalid email or password");
  };
  return (
    <AuthLayout side={<BlueSide title="Welcome back." body="Sign in to manage your campaigns, creators and payouts, all in one place." />}>
      <h1 className="text-2xl font-bold text-[#111827]">Welcome back</h1>
      <p className="text-sm text-[#6B7280] mt-1 mb-6">Sign in to your account</p>
      {err && <p className="text-sm text-[#B91C1C] bg-[#FEF2F2] border border-[#FECACA] rounded-xl px-4 py-3 mb-4" role="alert">{err}</p>}
      <form className="space-y-5" noValidate onSubmit={submit}>
        <OAuthButtons mode="in" />
        <div className="space-y-4 pt-1">
          <div className="flex items-center gap-3"><span className="h-px flex-1 bg-[#E9E9E7]" /><span className="text-[11px] text-[#9B9A97] font-medium uppercase tracking-wide">Or continue with email</span><span className="h-px flex-1 bg-[#E9E9E7]" /></div>
          <div><label htmlFor="login-email" className={LABEL}>Email</label><input id="login-email" name="email" type="email" required autoComplete="email" placeholder="john@company.com" className={INPUT} value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div>
            <div className="flex items-center justify-between mb-1.5 ml-1"><label htmlFor="login-password" className="block text-xs font-semibold text-[#5C5B57] uppercase tracking-wide">Password</label><a className="text-xs text-[#2563eb] hover:text-[#1d4ed8] transition-colors cursor-pointer font-medium" href="/login/forgot-password">Forgot password?</a></div>
            <div className="relative">
              <input id="login-password" name="password" type={show ? "text" : "password"} required autoComplete="current-password" placeholder="••••••••" className={INPUT + " pr-12"} value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" aria-label={show ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-[#9B9A97] hover:text-[#37352F] hover:bg-[#F7F6F3] transition-colors cursor-pointer" onClick={() => setShow((v) => !v)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" />{show && <path d="M3 3l18 18" />}</svg>
              </button>
            </div>
          </div>
          <button type="submit" className={PRIMARY} disabled={busy || !email || !password}>{busy ? "Signing in…" : "Sign in"}</button>
        </div>
      </form>
      <p className="text-xs text-center text-[#6B7280] mt-6">Don&apos;t have an account? <a href="/register" className="text-[#2563eb] font-medium">Sign up</a></p>
    </AuthLayout>
  );
}
