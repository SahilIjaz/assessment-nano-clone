"use client";
import { useState } from "react";
import { INPUT, LABEL, LangButton, PRIMARY, postJson } from "./AuthShell";

export default function ForgotForm() {
  const [step, setStep] = useState<"request" | "reset" | "done">("request");
  const [email, setEmail] = useState(""); const [code, setCode] = useState(""); const [password, setPassword] = useState(""); const [err, setErr] = useState<string | null>(null); const [busy, setBusy] = useState(false);
  const [delivery, setDelivery] = useState<string | undefined>();
  const request = async (e: React.FormEvent) => { e.preventDefault(); setBusy(true); const r = await postJson("/api/auth/forgot", { email }); setDelivery(r.delivery as string | undefined); setBusy(false); setStep("reset"); };
  const reset = async (e: React.FormEvent) => { e.preventDefault(); setBusy(true); setErr(null); const r = await postJson("/api/auth/reset", { email, code, password }); setBusy(false); if (r.ok) window.location.href = r.role === "saas" ? "/brand" : "/creator"; else setErr(r.error || "Invalid code"); };
  return (
    <>
      <div className="bg-noise" />
      <div className="min-h-screen flex items-center justify-center p-6 bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-8"><a href="/" className="flex items-center gap-2"><img src="/logo.svg" alt="naano" className="h-7" /><span className="font-bold text-lg text-[#111827]">naano</span></a><LangButton /></div>
          {step === "request" ? (
            <>
              <h1 className="text-2xl font-bold text-[#111827]">Reset your password</h1>
              <p className="text-sm text-[#6B7280] mt-1 mb-6">Enter your email and we&apos;ll send you a 6-digit code to set a new password.</p>
              <form className="space-y-4" onSubmit={request}>
                <div><label className={LABEL} htmlFor="fp-email">Email</label><input id="fp-email" type="email" required placeholder="john@company.com" className={INPUT} value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                <button type="submit" className={PRIMARY} disabled={busy || !email}>{busy ? "Sending…" : "Send recovery code"}</button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-[#111827]">Check your email</h1>
              <p className="text-sm text-[#6B7280] mt-1 mb-6">If an account exists for <b>{email}</b>, we sent a 6-digit code. Enter it with your new password.</p>
              {delivery === "outbox" && <p className="text-xs text-[#1E40AF] bg-[#EEF4FF] border border-[#C4D5FF] rounded-lg p-3 mb-4">No mail provider is configured on this server: the message is in the <a className="underline font-semibold" href="/dev/inbox" target="_blank">local inbox</a>.</p>}
              {err && <p className="text-sm text-[#B91C1C] bg-[#FEF2F2] border border-[#FECACA] rounded-xl px-4 py-3 mb-4">{err}</p>}
              <form className="space-y-4" onSubmit={reset}>
                <div><label className={LABEL} htmlFor="fp-code">Recovery code</label><input id="fp-code" inputMode="numeric" maxLength={6} placeholder="000000" className={INPUT + " tracking-[0.4em] text-center text-lg"} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} /></div>
                <div><label className={LABEL} htmlFor="fp-pass">New password</label><input id="fp-pass" type="password" minLength={8} placeholder="At least 8 characters" className={INPUT} value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                <button type="submit" className={PRIMARY} disabled={busy || code.length !== 6 || password.length < 8}>{busy ? "Saving…" : "Set new password"}</button>
              </form>
            </>
          )}
          <div className="mt-6 text-sm"><a href="/login" className="text-[#6B7280] hover:text-[#111827]">← Sign in</a></div>
        </div>
      </div>
    </>
  );
}
