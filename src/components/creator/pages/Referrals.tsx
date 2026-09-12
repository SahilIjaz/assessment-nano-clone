"use client";
import type { CCtx } from "../CreatorApp";
import { fmtEur0 } from "@/lib/format";

export default function Referrals({ ctx }: { ctx: CCtx }) {
  const link = typeof window !== "undefined" ? `${window.location.origin}/register?role=saas&ref=${ctx.snap.profile.slug}` : "";
  return (
    <section className="page visible" id="page-referrals" data-screen-label="Affiliate program">
      <div className="page-head"><h1>Affiliate program</h1><div className="page-sub">Bring a brand to Naano and earn 25% of Naano's commission on everything they spend for 3 months.</div></div>
      <div className="cr-ov-kpis" style={{ marginBottom: 18 }}>
        {[["Referred brands", "0", "Signed up through your link"], ["Attributed spend", "€0", "Campaign spend from your brands"], ["Your reward", "€0", "25% of Naano's commission"], ["Pending", "€0", "Released after the campaigns are paid"]].map(([t, v, s]) => <div key={t} className="cr-ov-kpi"><span className="cr-ov-kpi-label">{t}</span><strong>{v}</strong><small>{s}</small></div>)}
      </div>
      <div className="cr-com-grid">
        <section className="card" style={{ padding: 20 }}>
          <b style={{ fontSize: "1.05rem" }}>Your Deal Link</b><p className="muted" style={{ fontSize: ".86rem" }}>Share it with brands you already work with, or add your public card to your LinkedIn profile. Attribution is automatic.</p>
          <div style={{ display: "flex", gap: 8 }}><input readOnly value={link} style={{ flex: 1, border: "1px solid var(--border2,#DBE0EA)", borderRadius: 10, padding: "10px 12px", font: "inherit", background: "#F8F9FC" }} /><button className="btn btn-primary" onClick={() => { navigator.clipboard?.writeText(link); ctx.toast("Deal Link copied"); }}>Copy</button></div>
          <ol style={{ margin: "16px 0 0", paddingLeft: 18, fontSize: ".88rem", lineHeight: 1.7 }}><li>A brand creates its workspace through your link.</li><li>They book creators — including you — on Naano.</li><li>You earn 25% of Naano's commission for 3 months, paid with your earnings.</li></ol>
        </section>
        <section className="card" style={{ padding: 20 }}>
          <b style={{ fontSize: "1.05rem" }}>Referred brands</b>
          <table className="st-table" style={{ marginTop: 10 }}><thead><tr><th>Brand</th><th>Joined</th><th>Spend</th><th>Reward</th></tr></thead><tbody><tr><td colSpan={4} className="muted" style={{ textAlign: "center", padding: 18 }}>No referred brand yet. Your first attributed signup shows up here.</td></tr></tbody></table>
          <div className="muted" style={{ fontSize: ".8rem", marginTop: 10 }}>Rewards are released with your earnings once the brand's campaigns are paid. Balance today: {fmtEur0(0)}.</div>
        </section>
      </div>
    </section>
  );
}
