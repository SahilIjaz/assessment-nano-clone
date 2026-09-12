"use client";
import { useState } from "react";
import { postJson } from "./AuthShell";

/**
 * Agency onboarding shell used by /agency (brand agencies, lands in the brand workspace) and /talent-agency
 * (creator agencies, lands in the creator workspace). Three steps: account → e-mail code → agency name.
 * Class names are the production CSS-module names so the vendored stylesheet applies unchanged.
 */
const M = "talent-agency-signup-module__6002dG__";
const c = (n: string) => M + n;

const COPY = {
  brand: {
    eyebrow: "Brand agency workspace",
    title: "Run every client campaign from one portfolio.",
    body: "Create client workspaces, assign their budgets and monitor delivery without mixing accounts.",
    bullets: [["building", "One workspace per client company"], ["landmark", "Budgets allocated from one dashboard"], ["check", "One operational queue across campaigns"]] as const,
    accountIntro: "Use the login of the person who will manage client workspaces.",
    role: "saas" as const,
    nameLabel: "Agency name",
    namePlaceholder: "e.g. Zmirov Communication",
    extraLabel: "Agency website",
    extraPlaceholder: "https://",
    finishTitle: "Set up your agency",
    finishIntro: "Your client workspaces and budgets live under this agency.",
    loginPath: "/agency",
  },
  talent: {
    eyebrow: "Talent agency workspace",
    title: "Run every creator operation from one place.",
    body: "Import your roster, manage collaborations and collect agency earnings without creating accounts for your creators.",
    bullets: [["users", "Import all your creators in minutes"], ["lock", "Creators never need to log in"], ["check", "One task list for the whole agency"]] as const,
    accountIntro: "This login belongs to the agency manager, not to a creator.",
    role: "influencer" as const,
    nameLabel: "Agency name",
    namePlaceholder: "e.g. North Talent",
    extraLabel: "How many creators do you represent?",
    extraPlaceholder: "e.g. 12",
    finishTitle: "Set up your agency",
    finishIntro: "Your roster, collaborations and earnings are grouped under this agency.",
    loginPath: "/talent-agency",
  },
};

const Icon = ({ name }: { name: string }) => {
  const p = { xmlns: "http://www.w3.org/2000/svg", width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (name) {
    case "building": return <svg {...p}><path d="M10 12h4" /><path d="M10 8h4" /><path d="M14 21v-3a2 2 0 0 0-4 0v3" /><path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" /><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" /></svg>;
    case "landmark": return <svg {...p}><path d="M10 18v-7" /><path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z" /><path d="M14 18v-7" /><path d="M18 18v-7" /><path d="M3 22h18" /><path d="M6 18v-7" /></svg>;
    case "users": return <svg {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case "lock": return <svg {...p}><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;
    case "mail": return <svg {...p}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>;
    case "arrow": return <svg {...p} width={17} height={17}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>;
    case "spin": return <svg {...p} width={17} height={17} className={c("spin")}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>;
    default: return <svg {...p}><path d="M20 6 9 17l-5-5" /></svg>;
  }
};

export default function AgencySignup({ kind }: { kind: "brand" | "talent" }) {
  const t = COPY[kind];
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [f, setF] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [code, setCode] = useState("");
  const [agency, setAgency] = useState({ agencyName: "", extra: "" });

  const run = async (fn: () => Promise<void>) => { setBusy(true); setErr(null); try { await fn(); } catch { setErr("Something went wrong. Please try again."); } finally { setBusy(false); } };

  const createAccount = (e: React.FormEvent) => { e.preventDefault(); void run(async () => {
    const r = await postJson("/api/auth/register", { ...f, email: f.email.trim().toLowerCase(), role: t.role, heardFrom: "Agency" });
    if (!r.ok) { setErr(r.error || "Could not create the account."); return; }
    setStatus(r.delivery === "email" ? `We sent a 6-digit code to ${f.email.trim()}.` : `Your code is waiting in the local inbox at /dev/inbox.`);
    setStep(2);
  }); };

  const verify = (e: React.FormEvent) => { e.preventDefault(); void run(async () => {
    const r = await postJson("/api/auth/verify", { email: f.email.trim().toLowerCase(), code: code.trim() });
    if (!r.ok) { setErr(r.error || "Invalid or expired code."); return; }
    setStatus(null); setStep(3);
  }); };

  const resend = () => void run(async () => {
    const r = await postJson("/api/auth/resend", { email: f.email.trim().toLowerCase() });
    setStatus(r.ok ? "A new code is on its way." : (r.error || "Could not resend the code."));
  });

  const finish = (e: React.FormEvent) => { e.preventDefault(); void run(async () => {
    const r = await postJson("/api/auth/agency-setup", { agencyName: agency.agencyName, website: kind === "brand" ? agency.extra : "", roster: kind === "talent" ? agency.extra : "" });
    if (!r.ok) { setErr(r.error || "Could not finish the setup."); return; }
    window.location.href = (r.next as string) || (kind === "brand" ? "/brand" : "/creator");
  }); };

  return (
    <>
      <div className="bg-noise" />
      <main className={c("page")}>
        <section className={c("shell")}>
          <aside className={c("intro")}>
            <a className={c("logo")} aria-label="Naano" href="/">Naano</a>
            <div>
              <span className={c("eyebrow")}>{t.eyebrow}</span>
              <h1>{t.title}</h1>
              <p>{t.body}</p>
            </div>
            <ul>{t.bullets.map(([icon, label]) => <li key={label}><Icon name={icon} /><span>{label}</span></li>)}</ul>
          </aside>
          <div className={c("formPanel")}>
            <div className={c("progress")} aria-label="Onboarding progress">
              {[1, 2, 3].map((n) => <span key={n} className={n === step ? c("current") : n < step ? c("done") : ""} />)}
            </div>

            {step === 1 && (
              <form className={c("form")} onSubmit={createAccount}>
                <div><span className={c("step")}>Step 1 of 3</span><h2>Create your agency account</h2><p>{t.accountIntro}</p></div>
                <div className={c("twoColumns")}>
                  <label><span>First name</span><input required autoComplete="given-name" value={f.firstName} onChange={(e) => setF({ ...f, firstName: e.target.value })} /></label>
                  <label><span>Last name</span><input required autoComplete="family-name" value={f.lastName} onChange={(e) => setF({ ...f, lastName: e.target.value })} /></label>
                </div>
                <label><span>Work email</span><input required type="email" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></label>
                <label><span>Password</span><input required minLength={8} type="password" autoComplete="new-password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} /><small>At least 8 characters</small></label>
                {err && <p className={c("error")}>{err}</p>}
                <button type="submit" disabled={busy}><Icon name={busy ? "spin" : "arrow"} />Continue</button>
                <p className={c("login")}>Already have an account? <a href={`/login?redirectTo=${t.loginPath}`}>Log in</a></p>
              </form>
            )}

            {step === 2 && (
              <form className={c("form")} onSubmit={verify}>
                <div><span className={c("icon")}><Icon name="mail" /></span></div>
                <div><span className={c("step")}>Step 2 of 3</span><h2>Confirm your email</h2><p>Enter the 6-digit code we sent to {f.email.trim()}.</p></div>
                {status && <p className={c("status")}>{status}</p>}
                <label><span>Verification code</span><input className={c("code")} required inputMode="numeric" pattern="[0-9]{6}" maxLength={6} placeholder="000000" autoComplete="one-time-code" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} /></label>
                {err && <p className={c("error")}>{err}</p>}
                <button type="submit" disabled={busy || code.length !== 6}><Icon name={busy ? "spin" : "arrow"} />Verify and continue</button>
                <div className={c("codeActions")}>
                  <button type="button" disabled={busy} onClick={resend}>Resend the code</button>
                  <button type="button" disabled={busy} onClick={() => { setStep(1); setErr(null); setStatus(null); }}>Use another email</button>
                </div>
              </form>
            )}

            {step === 3 && (
              <form className={c("form")} onSubmit={finish}>
                <div><span className={c("step")}>Step 3 of 3</span><h2>{t.finishTitle}</h2><p>{t.finishIntro}</p></div>
                <label><span>{t.nameLabel}</span><input required minLength={2} placeholder={t.namePlaceholder} value={agency.agencyName} onChange={(e) => setAgency({ ...agency, agencyName: e.target.value })} /></label>
                <label><span>{t.extraLabel}</span><input placeholder={t.extraPlaceholder} value={agency.extra} onChange={(e) => setAgency({ ...agency, extra: e.target.value })} /><small>Optional</small></label>
                {err && <p className={c("error")}>{err}</p>}
                <button type="submit" disabled={busy}><Icon name={busy ? "spin" : "arrow"} />Open my workspace</button>
              </form>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
