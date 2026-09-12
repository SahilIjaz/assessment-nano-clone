"use client";
import { useMemo, useState } from "react";
import type { Ctx } from "../BrandApp";
import { creatorBySlug } from "@/data/creators";
import { fmtK } from "@/lib/format";

function Chart({ values, labels }: { values: number[]; labels: string[] }) {
  const w = 620, h = 210, l = 8, r = 8, top = 8, bottom = 202;
  const max = Math.max(1, ...values);
  const pts = values.map((v, i) => [l + (i * (w - l - r)) / Math.max(1, values.length - 1), bottom - ((bottom - top) * v) / max] as const);
  const line = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const ys = [max, Math.round(max * 0.75), Math.round(max * 0.5), Math.round(max * 0.25), 0];
  return (
    <div className="chart-wrap" style={{ paddingLeft: "46px" }}>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: 210 }}>
        <defs><linearGradient id="ov3pf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1D5BF5" stopOpacity=".14" /><stop offset="100%" stopColor="#1D5BF5" stopOpacity="0" /></linearGradient></defs>
        <polygon fill="url(#ov3pf)" points={`${l},${bottom} ${line} ${pts[pts.length - 1]![0]},${bottom}`} />
        <polyline fill="none" stroke="#1D5BF5" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" points={line} />
      </svg>
      <div className="chart-y" id="ov3-y">{ys.map((y, i) => <span key={i}>{y}</span>)}</div>
      <div className="chart-x" id="ov3-x">{labels.map((x) => <span key={x}>{x}</span>)}</div>
    </div>
  );
}

export function AnalyticsBlock({ ctx, campaignId, compact }: { ctx: Ctx; campaignId: string; compact?: boolean }) {
  const [period, setPeriod] = useState("30");
  const bookings = ctx.snap.bookings.filter((b) => (campaignId === "all" || b.campaign_id === campaignId) && !["cancelled", "declined"].includes(b.status));
  const published = bookings.filter((b) => b.status === "published");
  const reach = published.reduce((a, b) => a + (creatorBySlug(b.creator_slug)?.medianViews ?? 0) * b.posts, 0);
  const clicks = Math.round(reach * 0.012);
  const committed = bookings.reduce((a, b) => a + (b.proposed_cents ?? b.amount_cents), 0);
  const days = Number(period);
  const labels = useMemo(() => { const out: string[] = []; const n = days === 7 ? 7 : days === 30 ? 3 : 4; for (let i = n - 1; i >= 0; i--) { const d = new Date(Date.now() - (i * days * 864e5) / (n - 1 || 1)); out.push(d.toLocaleDateString("en-GB", { day: "numeric", month: "short" })); } return out; }, [days]);
  const values = useMemo(() => Array.from({ length: 12 }, (_, i) => (clicks ? Math.round((clicks / 12) * (0.5 + ((i * 7) % 5) / 4)) : 0)), [clicks]);
  return (
    <div id="results-global-analytics" className="nn-analytics-without-pixel">
      {compact && <div className="seg seg-light" style={{ marginBottom: 14 }}><button className="on">Analytics</button><button onClick={() => ctx.nav("results/all/leads")}>Leads</button><button onClick={() => ctx.nav("results/all/posts")}>Posts</button></div>}
      <div id="results-summary" style={{ ["--nn-kpi-columns" as string]: "3" }}>
        <div className="ov3-kpi nn-impressions-kpi"><div className="lbl">Est. reach</div><div className="val">{fmtK(reach)}</div><div className="foot">{published.length ? `${published.length} published post${published.length > 1 ? "s" : ""}` : "No published posts yet"}</div></div>
        <div className="card ov3-kpi zoomable" data-k="clicks" role="button" tabIndex={0}><div className="top"><span className="ov3-ic" style={{ background: "#FEF3E0", color: "#EA7A2B" }}><iconify-icon icon="ph:cursor-click" /></span><div><div className="lbl">{"Qualified clicks "}<span className="ov3-info" tabIndex={0} role="button" aria-label="Qualified clicks tracked on your creators' links."><b className="ov3-info-b" aria-hidden="true">i</b><span className="ov3-tip">Qualified clicks tracked on your creators' links.</span></span></div><div className="val">{clicks}</div><div className="foot"><span className="ov3-foot-note">last 30 days</span></div></div></div></div>
        <div className="card ov3-kpi zoomable" data-k="spend" role="button" tabIndex={0}><div className="top"><span className="ov3-ic" style={{ background: "#DFF6F2", color: "#0E9F8A" }}><iconify-icon icon="ph:wallet" /></span><div><div className="lbl">{"Committed budget "}<span className="ov3-info" tabIndex={0} role="button" aria-label="Budget committed in escrow on your creator bookings."><b className="ov3-info-b" aria-hidden="true">i</b><span className="ov3-tip">Budget committed in escrow on your creator bookings.</span></span></div><div className="val">{Math.round(committed / 100).toLocaleString("en-US")}<small>€</small></div><div className="foot"><span className="ov3-foot-note">{bookings.length} booking{bookings.length === 1 ? "" : "s"}</span></div></div></div></div>
      </div>
      <div id="results-chart-grid">
        <div className="card ov3-chart-card">
          <div className="row" style={{ justifyContent: "space-between" }}><h2 style={{ fontSize: "1.05rem" }}>Performance over time</h2><select className="select" id="nn-period" style={{ height: "36px", borderRadius: "10px" }} value={period} onChange={(e) => setPeriod(e.target.value)}><option value="7">Week</option><option value="30">Month</option><option value="365">Year</option></select></div>
          <div className="ov3-legend" id="ov3-legend"><span style={{ cursor: "pointer" }}><i style={{ background: "#1D5BF5" }} />Qualified clicks</span><span style={{ marginLeft: "auto", color: "var(--muted2)", fontSize: ".8rem" }}>Click a card or the legend to zoom</span></div>
          <Chart values={values} labels={labels} />
        </div>
        <section id="nn-funnel" className="card nn-funnel">
          <div className="nn-post-performance">
            <div className="nn-post-performance-heading"><h2>Post performance</h2><span>Without a pixel</span></div>
            <p className="nn-funnel-caption">Latest metrics collected from your posts.</p>
            <dl><div><dt>Posts</dt><dd>{published.reduce((a, b) => a + b.posts, 0)}</dd></div><div><dt>reactions</dt><dd>{published.reduce((a, b) => a + (creatorBySlug(b.creator_slug)?.reactions ?? 0) * b.posts, 0)}</dd></div><div><dt>comments</dt><dd>{published.reduce((a, b) => a + (creatorBySlug(b.creator_slug)?.comments ?? 0) * b.posts, 0)}</dd></div></dl>
            <button type="button" className="nn-posts-link" onClick={() => ctx.nav("results/all/posts")}>{"View posts "}<span aria-hidden="true">→</span></button>
          </div>
        </section>
      </div>
      <div id="nn-pixel-notice"><div className="nn-pixel-notice"><iconify-icon icon="ph:info" /><div><strong>Measure site conversions</strong><p>Connect the pixel to add visits, sign-ups and revenue to your post results.</p></div><button type="button" className="btn" onClick={() => ctx.nav("integrations")}>Install the pixel</button></div></div>
      <div className="card" style={{ marginTop: 20, padding: 18 }}>
        <div className="row" style={{ justifyContent: "space-between" }}><h2 style={{ fontSize: "1.05rem", margin: 0 }}>Attribution by creator</h2></div>
        <table className="st-table" style={{ marginTop: 10 }}><thead><tr><th>Creator</th><th>Clicks</th><th>Est. reach</th><th>Status</th></tr></thead><tbody>
          {bookings.length === 0 ? <tr><td colSpan={4} className="muted" style={{ textAlign: "center", padding: 18 }}>No attributed activity yet.</td></tr> : bookings.map((b) => { const c = creatorBySlug(b.creator_slug); const live = b.status === "published"; return <tr key={b.id}><td><b>{c?.name}</b></td><td>{live ? Math.round((c?.medianViews ?? 0) * 0.012 * b.posts) : 0}</td><td>{live ? fmtK((c?.medianViews ?? 0) * b.posts) : "—"}</td><td className="muted">{b.status.replace(/_/g, " ")}</td></tr>; })}
        </tbody></table>
        <div className="muted" style={{ fontSize: ".8rem", marginTop: 8 }}>More metrics & attribution details appear once posts are live and the pixel is installed.</div>
      </div>
    </div>
  );
}

export default function Results({ ctx }: { ctx: Ctx }) {
  const { route, snap } = ctx;
  const campaign = route.parts[0] && route.parts[0] !== "all" ? route.parts[0] : "all";
  const view = route.parts[1] || "analytics";
  const setView = (v: string) => ctx.nav(`results/${campaign}/${v}`);
  const [leadView, setLeadView] = useState<"people" | "companies">("people");
  const [postView, setPostView] = useState<"table" | "feed">("table");
  const published = snap.bookings.filter((b) => b.status === "published" && (campaign === "all" || b.campaign_id === campaign));
  return (
    <section className="page visible" id="page-leads" data-screen-label="Results">
      <div className="nn-results-heading"><h1>Results</h1><svg className="ink-line" viewBox="0 0 120 12" aria-hidden="true"><path d="M3 7C26 2 46 10 68 6S104 4 117 6" /></svg></div>
      <div className="nn-results-nav" id="results-nav">
        <div className="seg seg-light" id="leads-views" role="tablist">
          {(["analytics", "leads", "posts"] as const).map((v) => <button key={v} className={view === v ? "on" : ""} role="tab" aria-selected={view === v} onClick={() => setView(v)}>{v[0]!.toUpperCase() + v.slice(1)}</button>)}
        </div>
        {view === "leads" && <button id="results-export" className="ov3-pill" onClick={() => ctx.toast("Export starts once leads are collected")}><iconify-icon icon="ph:export" style={{ fontSize: "16px" }} /> <span>Export ICP leads</span></button>}
      </div>
      <div className="nn-results-toolbar">
        <label className="nn-campaign-picker"><span>Campaign</span><select className="select" value={campaign} onChange={(e) => ctx.nav(`results/${e.target.value}/${view}`)}><option value="all">All campaigns</option>{snap.campaigns.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
      </div>
      {view === "leads" && (
        <div id="leads-leads" role="tabpanel">
          <div className="nn-lead-summary" aria-live="polite"><span><b>0</b> <span>people</span></span><span><b>0</b> <span>In ICP</span></span><span><b>0</b> <span>companies</span></span><span><b>0</b> <span>High priority</span></span></div>
          <div className="cl2-wrap" id="ld2-wrap">
            <div className="card nn-lead-card rise" data-nn-entered="1">
              <div className="nn-lead-controls">
                <div className="nn-lead-tabs" role="group" aria-label="Lead view"><button aria-pressed={leadView === "people"} onClick={() => setLeadView("people")}><span>People</span> <span>0</span></button><button aria-pressed={leadView === "companies"} onClick={() => setLeadView("companies")}><span>Companies</span> <span>0</span></button></div>
                <label className="nn-lead-search"><input type="search" aria-label="Search leads" placeholder="Search leads" /></label>
                <select className="select" aria-label="Priority" defaultValue="all"><option value="all">All priorities</option><option value="high">High priority</option><option value="warm">Warm</option><option value="new">New</option></select>
              </div>
              {leadView === "people" ? (
                <div className="ld2-tcard"><div className="ld2-tblwrap"><table className="st-table"><thead><tr><th>Person</th><th>Company</th><th>Engagement</th><th>Source</th><th title="Lead score: comments and reactions (recency-weighted), seniority, ICP fit, plus 30% of the account score. Hot 6+, Warm 2.5+.">Priority</th><th /></tr></thead><tbody><tr><td colSpan={6} className="muted" style={{ textAlign: "center", padding: "18px" }}>No one yet, the people who engage with your posts land here.</td></tr></tbody></table></div></div>
              ) : (
                <div className="ld2-tcard"><div className="ld2-tblwrap"><table className="st-table"><thead><tr><th>Company</th><th>ICP</th><th>People engaged</th><th>Engagement</th><th>Top contact</th><th>Last seen</th><th>Priority</th></tr></thead><tbody><tr><td colSpan={7} className="muted" style={{ textAlign: "center", padding: "18px" }}>No companies identified yet.</td></tr></tbody></table></div></div>
              )}
            </div>
          </div>
        </div>
      )}
      {view === "analytics" && <div id="leads-analytics" role="tabpanel"><AnalyticsBlock ctx={ctx} campaignId={campaign} /></div>}
      {view === "posts" && (
        <div id="leads-posts" role="tabpanel">
          <div className="card rise" data-nn-entered="1" style={{ padding: 18 }}>
            <div className="row" style={{ justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div><b style={{ fontSize: "1.05rem" }}>Published content</b> <span className="muted">{published.reduce((a, b) => a + b.posts, 0)} Posts</span></div>
              <div style={{ display: "flex", gap: 8 }}><div className="seg seg-light"><button className={postView === "table" ? "on" : ""} onClick={() => setPostView("table")}>Table</button><button className={postView === "feed" ? "on" : ""} onClick={() => setPostView("feed")}>Feed</button></div><button className="ov3-pill" onClick={() => ctx.toast("Export starts once posts are live")}>Export</button></div>
            </div>
            <div className="tabs" style={{ margin: "10px 0" }}><button className="tab on">All posts</button><button className="tab">LinkedIn</button><button className="tab">X (Twitter)</button></div>
            <table className="st-table"><thead><tr><th>Post</th><th>Campaign</th><th>Published</th><th>Est. reach</th><th>Reactions</th><th>Comments</th><th>Status</th></tr></thead><tbody>
              {published.length === 0 ? <tr><td colSpan={7} className="muted" style={{ textAlign: "center", padding: "18px" }}>No posts published yet.</td></tr> : published.map((b) => { const c = creatorBySlug(b.creator_slug)!; return <tr key={b.id}><td><b>{c.name}</b><div className="muted" style={{ fontSize: ".78rem" }}>{c.posts[0]!.text.slice(0, 70)}…</div></td><td>{snap.campaigns.find((x) => x.id === b.campaign_id)?.name}</td><td className="muted">{new Date(b.updated_at).toLocaleDateString("en-GB")}</td><td>{fmtK(c.medianViews)}</td><td>{c.reactions}</td><td>{c.comments}</td><td><span className="pill st-active">Live</span></td></tr>; })}
            </tbody></table>
            <div className="cl2-foot"><span className="muted" style={{ fontSize: ".86rem" }}>{published.length} Posts</span><span className="muted" style={{ fontSize: ".86rem" }}>Rows per page: <select className="select" style={{ height: 32, padding: "0 8px" }} defaultValue="10"><option>10</option><option>25</option></select></span></div>
          </div>
        </div>
      )}
    </section>
  );
}
