"use client";
import { useEffect, useState } from "react";
import { INPUT, LABEL, OAuthButtons, OAUTH_BTN, PRIMARY, postJson } from "./AuthShell";

const HEARD: Record<string, string[]> = { saas: ["LinkedIn", "Word of mouth", "Google search", "A creator", "Other"], influencer: ["LinkedIn", "Another creator", "Word of mouth", "Google search", "Other"] };

/** Steps 1a → 1b → 1c of both sign-up flows: choose method, e-mail form, 6-digit verification. */
export default function EmailSignup({ role, title, intro, tagline, onVerified, presetEmail, stepLabel }: { role: "saas" | "influencer"; title: string; intro: string; tagline?: string; onVerified: () => void; presetEmail?: string | null; stepLabel?: string }) {
  const [stage, setStage] = useState<"options" | "form" | "code">(presetEmail ? "code" : "options");
  const [f, setF] = useState({ firstName: "", lastName: "", email: presetEmail || "", password: "", heardFrom: "" });
  const [code, setCode] = useState(""); const [err, setErr] = useState<string | null>(null); const [busy, setBusy] = useState(false); const [resend, setResend] = useState(59); const [delivery, setDelivery] = useState<string | undefined>();
  useEffect(() => { if (stage !== "code" || resend <= 0) return; const t = setTimeout(() => setResend((r) => r - 1), 1000); return () => clearTimeout(t); }, [stage, resend]);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setErr(null);
    const r = await postJson("/api/auth/register", { ...f, role });
    setBusy(false);
    if (r.ok) { setDelivery(r.delivery as string | undefined); setStage("code"); setResend(59); } else setErr(r.error || "Something went wrong. Please try again.");
  };
  const verify = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setErr(null);
    const r = await postJson("/api/auth/verify", { email: f.email, code });
    setBusy(false);
    if (r.ok) onVerified(); else setErr(r.error || "Invalid or expired code.");
  };
  const resendCode = async () => { const r = await postJson("/api/auth/resend", { email: f.email }); setDelivery(r.delivery as string | undefined); setResend(59); };
  if (stage === "code") return (
    <div className="space-y-4">
      {stepLabel && <div className="text-xs font-semibold text-[#2563eb] uppercase tracking-wide">{stepLabel}</div>}
      <h1 className="text-2xl font-bold text-[#111827]">Check your email</h1>
      <p className="text-sm text-[#6B7280]">We sent a 6-digit code to <b className="text-[#111827]">{f.email}</b> <button type="button" className="text-[#2563eb] font-medium ml-1" onClick={() => setStage("form")}>Edit email</button></p>
      <p className="text-sm text-[#6B7280]">Enter it below, stay on this page.</p>
      {delivery === "outbox" && <p className="text-xs text-[#1E40AF] bg-[#EEF4FF] border border-[#C4D5FF] rounded-lg p-3">No mail provider is configured on this server, so the message was delivered to the <a className="underline font-semibold" href="/dev/inbox" target="_blank">local inbox</a>. Open it to read your code.</p>}
      {err && <p className="text-sm text-[#B91C1C] bg-[#FEF2F2] border border-[#FECACA] rounded-xl px-4 py-3">{err}</p>}
      <form className="space-y-4" onSubmit={verify}>
        <input name="code" inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="000000" className={INPUT + " text-center text-2xl tracking-[0.5em] font-semibold"} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} autoFocus />
        <button type="submit" className={PRIMARY} disabled={busy || code.length !== 6}>{busy ? "Verifying…" : "Verify & continue"}</button>
        <button type="button" className="w-full text-sm text-[#6B7280] disabled:opacity-60" disabled={resend > 0} onClick={resendCode}>{resend > 0 ? `Resend code in ${resend}s` : "Resend code"}</button>
      </form>
    </div>
  );
  if (stage === "form") return (
    <div className="space-y-4">
      <button type="button" className="text-sm text-[#6B7280] hover:text-[#111827] flex items-center gap-1" onClick={() => setStage("options")}>← Back to sign-up options</button>
      {stepLabel && <div className="text-xs font-semibold text-[#2563eb] uppercase tracking-wide">{stepLabel}</div>}
      <h1 className="text-[1.75rem] font-extrabold tracking-tight text-[#0f172a]">{title}</h1>
      {tagline && <p className="text-[0.95rem] font-bold text-[#2563eb]">{tagline}</p>}
      <p className="text-sm text-[#64748b]">{intro}</p>
      {err && <p className="text-sm text-[#B91C1C] bg-[#FEF2F2] border border-[#FECACA] rounded-xl px-4 py-3">{err}</p>}
      <form className="space-y-4" onSubmit={submit}>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={LABEL}>First name</label><input name="firstName" required placeholder="First name" className={INPUT} value={f.firstName} onChange={(e) => setF({ ...f, firstName: e.target.value })} /></div>
          <div><label className={LABEL}>Last name</label><input name="lastName" required placeholder="Last name" className={INPUT} value={f.lastName} onChange={(e) => setF({ ...f, lastName: e.target.value })} /></div>
        </div>
        <div><label className={LABEL}>{role === "saas" ? "Business email" : "Email"}</label><input name="email" type="email" required placeholder={role === "saas" ? "you@company.com" : "you@email.com"} className={INPUT} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
        <div><label className={LABEL}>Password</label><input name="password" type="password" required minLength={8} placeholder="Create a strong password" className={INPUT} value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} /></div>
        <div><label className={LABEL}>How did you hear about us?</label><div className="flex flex-wrap gap-2">{HEARD[role]!.map((h) => <button key={h} type="button" className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${f.heardFrom === h ? "border-[#2563eb] bg-[#EEF4FF] text-[#1D4ED8]" : "border-[#D1D5DB] text-[#374151] hover:border-[#9CA3AF]"}`} onClick={() => setF({ ...f, heardFrom: h })}>{h}</button>)}</div></div>
        <button type="submit" className={PRIMARY} disabled={busy}>{busy ? "Creating…" : "Continue"}</button>
      </form>
      <p className="text-xs text-center text-[#64748b]">Already have an account? <a href="/login?reauth=1" className="text-[#2563eb] font-semibold">Sign in here</a></p>
    </div>
  );
  return (
    <div className="space-y-4">
      {stepLabel && <div className="text-xs font-semibold text-[#2563eb] uppercase tracking-wide">{stepLabel}</div>}
      <h1 className="text-[1.75rem] font-extrabold tracking-tight text-[#0f172a]">{title}</h1>
      {tagline && <p className="text-[0.95rem] font-bold text-[#2563eb]">{tagline}</p>}
      <p className="text-sm text-[#64748b]">{intro}</p>
      <OAuthButtons mode="up" role={role} />
      <button type="button" className={OAUTH_BTN} onClick={() => setStage("form")}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></svg><span>Sign up with email</span></button>
      <p className="text-xs text-center text-[#64748b]">Already have an account? <a href="/login?reauth=1" className="text-[#2563eb] font-semibold">Sign in here</a></p>
    </div>
  );
}
