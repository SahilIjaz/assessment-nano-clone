"use client";
import { useEffect, useState } from "react";
import { AuthLayout, BlueSide, INPUT, LABEL, PRIMARY, postJson } from "./AuthShell";
import EmailSignup from "./EmailSignup";
import type { WebsiteAnalysis } from "@/lib/ai";

type Step = "signup" | "website" | "analyzing" | "icp" | "matching";
const SIDE = <BlueSide title="Creators. Brands. Results." body="Run LinkedIn creator campaigns that drive real business - discover creators, track performance, pay in one click." foot="Built for B2B marketing teams" />;

export default function BrandRegister({ initialStep, presetEmail, initialAnalysis }: { initialStep: Step; presetEmail?: string | null; initialAnalysis?: WebsiteAnalysis | null }) {
  const [step, setStep] = useState<Step>(initialStep);
  const [website, setWebsite] = useState("");
  const [a, setA] = useState<WebsiteAnalysis | null>(initialAnalysis ?? null);
  const [err, setErr] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  useEffect(() => { if (step !== "analyzing" && step !== "matching") return; const t = setInterval(() => setTick((x) => x + 1), 900); return () => clearInterval(t); }, [step]);

  const analyze = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(null); setStep("analyzing"); setTick(0);
    const r = await postJson("/api/auth/analyze-website", { website });
    if (r.ok) { setA(r.analysis as WebsiteAnalysis); setStep("icp"); } else { setErr(r.error || "Could not analyse this website"); setStep("website"); }
  };
  const confirm = async () => {
    if (!a) return; setStep("matching"); setTick(0);
    const r = await postJson("/api/auth/save-icp", { name: a.name, valueProp: a.valueProp, icps: a.icps });
    if (r.ok) { setTimeout(() => { window.location.href = `/brand?welcomeCampaign=${r.campaignId}&welcomeStep=creators#marketplace`; }, 2200); } else { setErr(r.error || "Something went wrong"); setStep("icp"); }
  };

  const Steps = ({ n }: { n: number }) => <div className="flex items-center gap-2 text-xs font-semibold text-[#2563eb]"><span>Step {n} of 3</span>{[1, 2, 3].map((i) => <span key={i} className={`h-1.5 w-[72px] rounded-full ${i <= n ? "bg-[#2563eb]" : "bg-[#E5E7EB]"}`} />)}</div>;
  const LOAD = ["Reading your website...", "Extracting product signals...", "Identifying your ICP...", "Preparing your brand profile..."];
  const MATCH = ["Reading your brand profile...", "Scanning 900+ vetted creators...", "Scoring audience fit...", "Preparing your marketplace..."];

  return (
    <AuthLayout side={SIDE} wide={step === "icp"}>
      {step === "signup" && <EmailSignup role="saas" title="Join Naano" tagline="Creators. Brands. Results." intro="The #1 platform to run LinkedIn creator campaigns that drive real business." presetEmail={presetEmail} onVerified={() => setStep("website")} />}
      {step === "website" && (
        <div className="space-y-4">
          <Steps n={1} />
          <h1 className="text-2xl font-bold text-[#111827]">Your website</h1>
          <p className="text-sm text-[#6B7280]">We&apos;ll read your site to understand the product and your 3 main ICPs. This usually takes 20–40 seconds.</p>
          {err && <p className="text-sm text-[#B91C1C] bg-[#FEF2F2] border border-[#FECACA] rounded-xl px-4 py-3">{err}</p>}
          <form className="space-y-4" onSubmit={analyze}>
            <div><label className={LABEL}>Your website</label><input name="website" type="url" required placeholder="https://yourcompany.com" className={INPUT} value={website} onChange={(e) => setWebsite(e.target.value)} /></div>
            <button type="submit" className={PRIMARY} disabled={!website}>Analyze my website</button>
          </form>
        </div>
      )}
      {(step === "analyzing" || step === "matching") && (
        <div className="space-y-4">
          <Steps n={step === "analyzing" ? 1 : 3} />
          <h1 className="text-2xl font-bold text-[#111827]">{step === "analyzing" ? "Reading your brand…" : "Matching you with creators…"}</h1>
          <p className="text-sm text-[#6B7280]">{step === "analyzing" ? "This usually takes 20–40 seconds. We'll only show you the product and 3 ICPs." : "Your marketplace is being personalised with the creators your buyers already follow."}</p>
          <div className="flex justify-center py-6"><span className="relative grid h-28 w-28 place-items-center rounded-full bg-[#EEF2FF]"><span className="absolute inset-0 rounded-full border-2 border-[#C7D2FE] animate-ping opacity-40" /><span className="grid h-16 w-16 place-items-center rounded-2xl bg-white shadow-[0_10px_30px_rgba(37,99,235,0.15)]"><img src="/logo.svg" alt="" className="h-8 w-8" /></span></span></div>
          <ol className="space-y-3">
            {(step === "analyzing" ? LOAD : MATCH).map((l, i) => { const done = tick > i * 2; const cur = !done && tick >= (i - 1) * 2 + 1 && (i === 0 || tick > (i - 1) * 2); return (
              <li key={l} className={`flex items-center gap-3 text-sm ${done ? "text-[#6B7280]" : cur ? "text-[#111827] font-semibold" : "text-[#9CA3AF]"}`}><span className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${done ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#EEF2FF] text-[#2563eb]"}`}>{done ? "✓" : i + 1}</span><span className="flex-1">{l}</span>{cur && <span className="text-[#2563eb] tracking-widest">•••</span>}</li>
            ); })}
          </ol>
        </div>
      )}
      {step === "icp" && a && (
        <div className="space-y-4">
          <Steps n={2} />
          <h1 className="text-2xl font-bold text-[#111827]">Value prop & ICP</h1>
          <p className="text-sm text-[#6B7280]"><b className="text-[#111827]">{a.name}</b> · Review these details once. Naano turns them into a brief for your creators.</p>
          <div><label className={LABEL}>Value proposition</label><p className="text-xs text-[#6B7280] mb-2">What the company does, for whom, how — 4 to 6 sentences. Edit if needed.</p><textarea className={INPUT} rows={6} value={a.valueProp} onChange={(e) => setA({ ...a, valueProp: e.target.value })} /></div>
          <div><label className={LABEL}>Your 3 ICPs</label><p className="text-xs text-[#6B7280] mb-2">The audiences your creators need to understand.</p>
            <div className="space-y-2">{a.icps.map((i, idx) => <div key={idx} className="rounded-xl border border-[#E5E7EB] p-3 space-y-2"><input className={INPUT + " font-semibold"} value={i.title} onChange={(e) => setA({ ...a, icps: a.icps.map((x, k) => (k === idx ? { ...x, title: e.target.value } : x)) })} /><textarea className={INPUT} rows={2} value={i.description} onChange={(e) => setA({ ...a, icps: a.icps.map((x, k) => (k === idx ? { ...x, description: e.target.value } : x)) })} /></div>)}</div>
          </div>
          <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4 text-sm text-[#374151] space-y-1">
            <p className="font-semibold text-[#111827]">Brief preview · {a.name}</p>
            <p className="line-clamp-3">{a.valueProp}</p>
            <p className="text-xs text-[#6B7280]">{a.icps.map((i) => i.title).join(" · ")}</p>
            <p className="text-xs text-[#6B7280]">Creators can adapt the angle to their expertise, while keeping every product claim factual.</p>
          </div>
          <p className="text-xs text-[#6B7280]">↗ Every creator you invite will receive this brief. You can edit it later from Campaigns.</p>
          {err && <p className="text-sm text-[#B91C1C] bg-[#FEF2F2] border border-[#FECACA] rounded-xl px-4 py-3">{err}</p>}
          <div className="flex gap-3"><button type="button" className="h-11 px-4 rounded-xl border border-[#D1D5DB] text-sm font-semibold text-[#374151] hover:bg-[#F9FAFB]" onClick={() => setStep("website")}>Back</button><button type="button" className={PRIMARY} onClick={confirm}>Continue to AI Matching</button></div>
        </div>
      )}
    </AuthLayout>
  );
}
