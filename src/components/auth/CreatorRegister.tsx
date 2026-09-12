"use client";
import { useMemo, useState } from "react";
import { INPUT, LABEL, LangButton, PRIMARY, postJson } from "./AuthShell";
import EmailSignup from "./EmailSignup";
import CreatorCardPreview from "@/components/creator/CreatorCardPreview";
import { INDUSTRIES } from "@/data/creators";
import { COUNTRIES } from "@/data/countries";

type Step = "signup" | "linkedin" | "card" | "price" | "pro" | "reveal";
type Bundle = { posts: number; total: number };

export default function CreatorRegister({ initialStep, presetEmail, name }: { initialStep: Step; presetEmail?: string | null; name: string }) {
  const [step, setStep] = useState<Step>(initialStep);
  const [linkedin, setLinkedin] = useState("");
  const [liState, setLiState] = useState<{ found: boolean; message: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [country, setCountry] = useState(""); const [inds, setInds] = useState<string[]>([]);
  const [price, setPrice] = useState(240); const [bundles, setBundles] = useState<Bundle[]>([]); const [showBundle, setShowBundle] = useState(false);
  const [pro, setPro] = useState({ company: "", vat: "", address: "" }); const [proOpen, setProOpen] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const cc = useMemo(() => COUNTRIES.find((c) => c.name === country), [country]);
  const card = { name: name || "Your name", headline: liState?.found ? "Profile import queued" : null, industries: inds, flag: cc?.flag ?? null, country, followers: 0, medianViews: 0, priceCents: step === "signup" || step === "linkedin" ? 0 : price * 100, bundles: bundles.filter((b) => b.posts > 1 && b.total > 0).map((b) => ({ posts: b.posts, totalCents: b.total * 100 })), linkedinUrl: linkedin };
  const stepNo = step === "linkedin" ? 2 : step === "card" ? 3 : step === "price" ? 4 : 1;

  const importLi = async () => { setBusy(true); setErr(null); const r = await postJson("/api/auth/creator-linkedin", { linkedinUrl: linkedin }); setBusy(false); if (r.ok) { setLiState({ found: !!r.found, message: String(r.message) }); setStep("card"); } else setErr(r.error || "Something went wrong"); };
  const saveCard = async () => { setBusy(true); setErr(null); const r = await postJson("/api/auth/creator-card", { country, countryCode: cc?.code, industries: inds }); setBusy(false); if (r.ok) setStep("price"); else setErr(r.error || "Select your country and at least one industry to continue."); };
  const savePrice = async () => { setBusy(true); const r = await postJson("/api/auth/creator-price", { price, bundles }); setBusy(false); if (r.ok) setStep("pro"); };
  const finish = async (withPro: boolean) => { setBusy(true); const r = await postJson("/api/auth/creator-pro", withPro ? { pro } : {}); setBusy(false); if (r.ok) setStep("reveal"); };

  const Right = (
    <div className="hidden lg:flex flex-1 items-start justify-center overflow-y-auto bg-[linear-gradient(180deg,#F3F6FC_0%,#EEF2FA_100%)] px-10 pb-12 pt-[clamp(1.75rem,7dvh,4.5rem)]">
      <div className="w-full max-w-[520px]">
        <div className="text-center mb-6"><div className="text-xs font-semibold tracking-[0.18em] text-[#2563eb] uppercase">Your Marketplace card</div><h2 className="mt-2 text-[28px] font-extrabold tracking-tight text-[#0F172A]">Build a card brands can trust.</h2><p className="mt-1 text-[15px] text-[#64748B]">It updates live with your profile, analytics, positioning and price.</p></div>
        <CreatorCardPreview d={card} />
      </div>
    </div>
  );
  const Frame = ({ children }: { children: React.ReactNode }) => (
    <>
      <div className="bg-noise" />
      <div style={{ fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif" }} className="flex min-h-[100dvh]">
        <div className="flex min-h-0 flex-1 items-start justify-center overflow-y-auto bg-white px-8 xl:px-10 pb-10 pt-[clamp(1.75rem,7dvh,4.5rem)] sm:pb-12">
          <div className="w-full max-w-md pb-4">
            <div className="flex items-center justify-between mb-8"><a href="/"><img src="/logo.svg" alt="naano" className="h-7" /></a><LangButton /></div>
            {children}
            <div className="mt-8 lg:hidden"><CreatorCardPreview d={card} /></div>
          </div>
        </div>
        {Right}
      </div>
    </>
  );
  const LiBanner = () => liState && (
    <div className={`rounded-lg border p-4 text-sm ${liState.found ? "border-[#BBF7D0] bg-[#F0FDF4] text-[#166534]" : "border-[#FDE68A] bg-[#FFFBEB] text-[#92400E]"}`}><p>{liState.message}</p>{!liState.found && <button type="button" className="mt-3 cursor-pointer rounded-lg border border-[#F59E0B] bg-white px-3 py-2 text-xs font-semibold transition-colors duration-200 hover:bg-[#FEF3C7]" onClick={() => setStep("linkedin")}>Check the URL and try again</button>}</div>
  );
  const chip = (on: boolean) => `px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors ${on ? "border-[#2563eb] bg-[#EEF4FF] text-[#1D4ED8]" : "border-[#D1D5DB] text-[#374151] hover:border-[#9CA3AF]"}`;

  return (
    <Frame>
      {step === "signup" && <EmailSignup role="influencer" stepLabel="Step 1 of 4" title="Join Naano" intro="Get paid to create LinkedIn content for B2B brands you actually use." presetEmail={presetEmail} onVerified={() => setStep("linkedin")} />}
      {step === "linkedin" && (
        <div className="space-y-4">
          <button type="button" className="text-sm text-[#6B7280] hover:text-[#111827]" onClick={() => setStep("signup")}>← Back to my account</button>
          <div className="text-xs font-semibold text-[#2563eb] uppercase tracking-wide">Step {stepNo} of 4</div>
          <h1 className="text-2xl font-bold text-[#111827]">Add your public LinkedIn profile</h1>
          <p className="text-sm text-[#6B7280]">No extension is needed. We&apos;ll retrieve only the minimum public information required to create your Basic card: headline, followers and recent public posts.</p>
          {err && <p className="text-sm text-[#B91C1C] bg-[#FEF2F2] border border-[#FECACA] rounded-xl px-4 py-3">{err}</p>}
          <div><label className={LABEL}>Public LinkedIn profile URL</label><input name="linkedinUrl" type="url" placeholder="https://www.linkedin.com/in/you" className={INPUT} value={linkedin} onChange={(e) => setLinkedin(e.target.value)} /></div>
          <button type="button" className={PRIMARY} disabled={busy || !linkedin} onClick={importLi}>{busy ? "Importing…" : "Import my public profile"}</button>
        </div>
      )}
      {step === "card" && (
        <div className="space-y-4">
          <div className="text-xs font-semibold text-[#2563eb] uppercase tracking-wide">Step {stepNo} of 4</div>
          <h1 className="text-2xl font-bold text-[#111827]">Complete your creator card</h1>
          <LiBanner />
          <label className="block"><span className="mb-1.5 block text-sm font-semibold text-[#111827]">Your country</span><span className="mb-2 block text-xs leading-5 text-[#6B7280]">Confirm your country before continuing.</span>
            <select className="w-full border border-[#D1D5DB] rounded-lg px-3 py-2 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30" value={country} onChange={(e) => setCountry(e.target.value)}><option value="">Select your country</option>{COUNTRIES.map((c) => <option key={c.code} value={c.name}>{c.name}</option>)}</select>
          </label>
          <div><p className="mb-2 text-xs text-[#6B7280]">Choose up to 3 industries to help relevant brands find your card.</p><div className="flex flex-wrap gap-2">{INDUSTRIES.map((i) => <button key={i} type="button" className={chip(inds.includes(i))} disabled={!inds.includes(i) && inds.length >= 3} onClick={() => setInds((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]))}>{i}</button>)}</div></div>
          <p className="text-xs text-[#6B7280]">{country && inds.length ? `${inds.length} of 3 industries selected.` : "Select your country and at least one industry to continue."}</p>
          {err && <p className="text-sm text-[#B91C1C] bg-[#FEF2F2] border border-[#FECACA] rounded-xl px-4 py-3">{err}</p>}
          <button type="button" className={PRIMARY} disabled={busy || !country || !inds.length} onClick={saveCard}>Continue</button>
        </div>
      )}
      {step === "price" && (
        <div className="space-y-4">
          <div className="text-xs font-semibold text-[#2563eb] uppercase tracking-wide">Step {stepNo} of 4</div>
          <h1 className="text-2xl font-bold text-[#111827]">Complete your creator card</h1>
          <LiBanner />
          <button type="button" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#596273] hover:text-[#111827]" onClick={() => (showBundle ? setShowBundle(false) : setStep("card"))}>← {showBundle ? "Edit my price per post" : "Edit my industries"}</button>
          {!showBundle ? (
            <div className="overflow-hidden rounded-[26px] border border-[#E3E8F2] bg-white shadow-[0_18px_50px_rgba(30,64,175,0.06)]">
              <div className="px-5 pt-5 pb-4 sm:px-6"><div className="text-xs font-bold uppercase tracking-[0.12em] text-[#596273]">Set your price per post</div><p className="mt-1 text-xs leading-5 text-[#697386]">We do not have enough data yet to make a reliable recommendation. Choose the rate that works for you.</p></div>
              <div className="border-t border-[#EEF1F6] px-5 py-4 sm:px-6">
                <div className="flex items-center rounded-xl border border-[#DDE3ED] bg-white px-3 focus-within:border-[#7EA4FA]"><span className="text-sm font-bold text-[#596273]">€</span><input type="number" min={20} step={10} className="min-w-0 flex-1 border-0 bg-transparent py-2.5 pl-1 text-lg font-bold text-[#172033] outline-none" value={price} onChange={(e) => setPrice(Number(e.target.value))} /><span className="text-xs font-semibold text-[#8A93A3]">/ post</span></div>
                <p className="mt-2 text-[11px] font-medium text-[#697386]">This is your net price per post. You can change it at any time from your Naano profile.</p>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-[26px] border border-[#E3E8F2] bg-white shadow-[0_18px_50px_rgba(30,64,175,0.06)]">
              <div className="flex items-start gap-3 px-5 pb-4 pt-5 sm:px-6"><span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EEF3FF] text-[#2864ED]"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M8 10h8M8 14h5" /></svg></span><div><h3 className="text-sm font-bold text-[#172033]">Your bundle offer (optional)</h3><p className="mt-1 text-xs leading-5 text-[#697386]">Optionally set the total price paid for several posts. You can add bundles later in Settings.</p></div></div>
              <div className="space-y-3 border-t border-[#EEF1F6] px-5 py-4 sm:px-6">
                {bundles.map((b, i) => (
                  <div key={i} className="rounded-[18px] border border-[#E7EBF3] bg-[#FAFBFD] p-3.5">
                    <div className="flex items-center justify-between gap-3"><span className="text-xs font-bold uppercase tracking-[0.12em] text-[#596273]">{i === 0 ? "Primary bundle" : `Bundle ${i + 1}`}</span><button type="button" aria-label="Remove this bundle" className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#8A93A3] hover:bg-white" onClick={() => setBundles(bundles.filter((_, k) => k !== i))}>×</button></div>
                    <div className="mt-3 grid grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] gap-3">
                      <label className="block"><span className="mb-1.5 block text-[11px] font-semibold text-[#697386]">Number of posts</span><div className="flex items-center rounded-xl border border-[#DDE3ED] bg-white px-3"><input type="number" min={2} max={20} className="min-w-0 flex-1 border-0 bg-transparent py-2.5 text-lg font-bold text-[#172033] outline-none" value={b.posts} onChange={(e) => setBundles(bundles.map((x, k) => (k === i ? { ...x, posts: Number(e.target.value) } : x)))} /><span className="text-xs font-semibold text-[#8A93A3]">posts</span></div></label>
                      <label className="block"><span className="mb-1.5 block text-[11px] font-semibold text-[#697386]">Total net price</span><div className="flex items-center rounded-xl border border-[#DDE3ED] bg-white px-3"><span className="text-sm font-bold text-[#596273]">€</span><input type="number" min={10} step={10} className="min-w-0 flex-1 border-0 bg-transparent py-2.5 pl-1 text-lg font-bold text-[#172033] outline-none" value={b.total} onChange={(e) => setBundles(bundles.map((x, k) => (k === i ? { ...x, total: Number(e.target.value) } : x)))} /></div></label>
                    </div>
                    <p className="mt-2 text-[11px] font-medium text-[#697386]">€{b.posts ? Math.round(b.total / b.posts) : 0}/post · brand saves €{Math.max(0, price * b.posts - b.total)}</p>
                  </div>
                ))}
                <button type="button" className="inline-flex items-center gap-2 rounded-xl px-2 py-2 text-xs font-bold text-[#2864ED] hover:bg-[#F3F6FF]" onClick={() => setBundles([...bundles, { posts: 5, total: Math.round(price * 5 * 0.85) }])}>+ Add {bundles.length ? "another" : "a"} bundle</button>
              </div>
            </div>
          )}
          <button type="button" className={PRIMARY} disabled={busy || price < 20} onClick={savePrice}>{showBundle ? "Confirm my offer and create my profile" : "Create my marketplace profile"}</button>
          {!showBundle && <button type="button" className="w-full text-sm font-semibold text-[#2563eb]" onClick={() => { setShowBundle(true); if (!bundles.length) setBundles([{ posts: 5, total: Math.round(price * 5 * 0.85) }]); }}>Add a bundle (optional)</button>}
        </div>
      )}
      {step === "pro" && (
        <div className="space-y-4">
          <div className="text-xs font-semibold text-[#2563eb] uppercase tracking-wide">Optional</div>
          <h1 className="text-2xl font-bold text-[#111827]">Complete your professional information now?</h1>
          <p className="text-sm text-[#6B7280]">This step is optional now. You can complete it later from your profile, before applying to paid campaigns, accepting bookings, invoicing or withdrawing your earnings.</p>
          <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4 text-sm text-[#374151] space-y-2"><p><b>France and European Union:</b> a registered professional activity is required to invoice companies and withdraw your earnings.</p><p><b>United States and outside the European Union:</b> a registered business is not mandatory. You can continue as an individual and add professional information if you have it.</p></div>
          {proOpen && (
            <div className="space-y-3 rounded-xl border border-[#E5E7EB] p-4"><div className="text-xs font-bold uppercase tracking-wide text-[#596273]">Business (professional accounts only)</div>
              <div><label className={LABEL}>Company name</label><input className={INPUT} value={pro.company} onChange={(e) => setPro({ ...pro, company: e.target.value })} /></div>
              <div><label className={LABEL}>VAT / tax number</label><input className={INPUT} value={pro.vat} onChange={(e) => setPro({ ...pro, vat: e.target.value })} /></div>
              <div><label className={LABEL}>Billing address</label><input className={INPUT} value={pro.address} onChange={(e) => setPro({ ...pro, address: e.target.value })} /></div>
              <button type="button" className={PRIMARY} disabled={busy} onClick={() => finish(true)}>Save my professional information</button>
            </div>
          )}
          {!proOpen && <button type="button" className={PRIMARY} onClick={() => setProOpen(true)}>Complete now</button>}
          <button type="button" className="w-full h-11 rounded-xl border border-[#D1D5DB] text-sm font-semibold text-[#374151] hover:bg-[#F9FAFB]" disabled={busy} onClick={() => finish(false)}>{proOpen ? "Go to my workspace — finish later" : "Finish later"}</button>
        </div>
      )}
      {step === "reveal" && (
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-bold text-[#111827]">Here is your Marketplace card</h1>
          <p className="text-sm text-[#6B7280]">Tap it to flip it over. You will be able to customize it in the profile coming next.</p>
          <div className="lg:hidden"><CreatorCardPreview d={card} /></div>
          <button type="button" className={PRIMARY + " max-w-[500px] mx-auto"} onClick={() => { window.location.href = "/creator?tour=1#profile"; }}>Continue to my profile</button>
        </div>
      )}
    </Frame>
  );
}
