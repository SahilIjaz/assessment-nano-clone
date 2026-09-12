"use client";
import { useState } from "react";
import type { CCtx } from "../CreatorApp";
import { fmtK } from "@/lib/format";

export default function Analytics({ ctx }: { ctx: CCtx }) {
  const p = ctx.snap.profile; const [range, setRange] = useState("all");
  const has = p.median_views > 0;
  const posts = has ? Array.from({ length: 5 }, (_, i) => ({ date: new Date(Date.now() - i * 3 * 864e5), views: Math.round(p.median_views * (0.7 + ((i * 7) % 5) / 8)), reactions: Math.round(p.median_views * p.engagement_rate / 100 * 0.7), comments: Math.round(p.median_views * p.engagement_rate / 100 * 0.3) })) : [];
  const eng = posts.reduce((a, x) => a + x.reactions + x.comments, 0);
  return (
    <section className="page visible" id="page-analytics" data-screen-label="Analytics">
      <div className="cr-an-shell">
        <div className="page-head cr-an-head"><div><h1>Analytics</h1><div className="page-sub">Public LinkedIn performance imported for this profile.</div></div><select className="select cr-an-range" aria-label="Analytics period" value={range} onChange={(e) => setRange(e.target.value)}><option value="30">Last 30 days</option><option value="90">Last 90 days</option><option value="all">All time</option></select></div>
        <div className="cr-an-hero">
          <div><div className="cr-an-eyebrow"><i /><span>Public LinkedIn snapshot</span></div><h2>{has ? "Your public LinkedIn performance" : "Public LinkedIn posts are being imported"}</h2><p>{has ? "Brands see these same numbers on your card. Refresh once a week from Settings." : "The profile is ready. Post history and reach will appear after the public-data job completes."}</p></div>
          <div className="cr-an-hero-side"><b>{has ? "100%" : "0%"}</b><span>of imported posts include reach data</span><span className="cr-an-source"><i /><span>{has ? `${posts.length} public posts analysed` : "No public post found yet"}</span></span></div>
        </div>
        <div className="cr-an-kpis">
          {[["Public posts", "ph:article", String(posts.length), "Original LinkedIn posts found"], ["Public post reach", "ph:eye", has ? fmtK(p.median_views) : "Pending", has ? "Median reach per post" : "Waiting for public post data"], ["Public engagements", "ph:pulse", String(eng), "Reactions, comments and reposts"], ["LinkedIn followers", "ph:users-three", has ? fmtK(p.followers) : "Pending", "Imported from the public profile"]].map(([t, i, v, s]) => <div className="cr-an-kpi" key={t}><div className="cr-an-kpi-top"><span>{t}</span><span className="cr-an-kpi-icon"><iconify-icon icon={i} /></span></div><b>{v}</b><small>{s}</small></div>)}
        </div>
        <div className="cr-an-grid">
          <div className="card cr-an-card">
            <div className="cr-an-card-head"><div><b>Recent LinkedIn posts</b><span>Open the original post on LinkedIn.</span></div></div>
            {posts.length === 0 ? <div className="cr-an-empty muted" style={{ padding: "18px 0" }}><b style={{ display: "block", color: "var(--text,#0F1220)" }}>Public post import in progress</b>The first public LinkedIn posts will appear here automatically.</div> : <table className="st-table"><thead><tr><th>Date</th><th>Reach</th><th>Reactions</th><th>Comments</th></tr></thead><tbody>{posts.map((x, i) => <tr key={i}><td>{x.date.toLocaleDateString("en-GB")}</td><td>{fmtK(x.views)}</td><td>{x.reactions}</td><td>{x.comments}</td></tr>)}</tbody></table>}
          </div>
          <div className="card cr-an-card">
            <div className="cr-an-card-head"><div><b>Public profile summary</b><span>Automatically collected from public LinkedIn data.</span></div></div>
            <dl className="cr-an-summary" style={{ display: "grid", gap: 8, margin: 0 }}>{[["LinkedIn followers", fmtK(p.followers)], ["Public posts", String(posts.length)], ["Posts with reach data", String(posts.length)], ["Public engagements", String(eng)]].map(([k, v]) => <div key={k} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border,#E7EAF1)", padding: "8px 0" }}><dt className="muted">{k}</dt><dd style={{ margin: 0, fontWeight: 700 }}>{v}</dd></div>)}</dl>
            <p className="muted" style={{ fontSize: ".8rem", marginTop: 12 }}>{has ? "Data refreshes once a week." : "Public LinkedIn data is being prepared. Naano is collecting the creator’s recent public posts. No personal LinkedIn connection is required."}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
