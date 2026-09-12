"use client";
import type { CCtx } from "../CreatorApp";
import CreatorCardPreview from "../CreatorCardPreview";
import { fmtK, fmtEur0 } from "@/lib/format";

export default function Home({ ctx }: { ctx: CCtx }) {
  const { snap, nav } = ctx;
  const p = snap.profile;
  const active = snap.bookings.filter((b) => !["cancelled", "declined", "completed", "published"].includes(b.status));
  const steps = [{ t: "Card and price ready", d: "Your positioning and offer are ready to review.", done: p.price_cents > 0, go: () => nav("profile") }, { t: "Reach the Marketplace audience threshold", d: "Your workspace and card remain available while your audience grows.", done: ctx.visible, go: () => nav("settings") }];
  const done = steps.filter((s) => s.done).length;
  const cardUrl = typeof window !== "undefined" ? `${window.location.origin}/creators/${p.slug}` : `/creators/${p.slug}`;
  const opps = snap.campaigns.slice(0, 3);
  return (
    <section className="page visible" id="page-home" data-screen-label="Overview">
      <div className="cr-ov">
        <header className="cr-ov-head"><div><div className="eyebrow">Creator workspace</div><h1 id="cr-hello">Good to see you, {snap.user.firstName}</h1><div className="page-sub">Your creator activity, at a glance.</div></div></header>
        <div className="cr-ov-kpis" id="cr-ov-kpis">
          <button type="button" className="cr-ov-kpi" onClick={() => nav("analytics")}><span className="cr-ov-kpi-label"><iconify-icon icon="ph:eye" />Public post reach</span><strong>{p.median_views ? fmtK(p.median_views) : "—"}</strong><small>{p.median_views ? "Median reach per public post" : "Waiting for public post data"}</small></button>
          <button type="button" className="cr-ov-kpi" onClick={() => nav("analytics")}><span className="cr-ov-kpi-label"><iconify-icon icon="ph:article" />Public posts</span><strong>{p.median_views ? 5 : 0}</strong><small>Original LinkedIn posts found</small></button>
          <button type="button" className="cr-ov-kpi" onClick={() => nav("analytics")}><span className="cr-ov-kpi-label"><iconify-icon icon="ph:pulse" />Public engagements</span><strong>{p.median_views ? Math.round(p.median_views * p.engagement_rate / 100 * 5) : 0}</strong><small>Reactions, comments and reposts</small></button>
          <button type="button" className="cr-ov-kpi" onClick={() => nav("analytics")}><span className="cr-ov-kpi-label"><iconify-icon icon="ph:users-three" />LinkedIn followers</span><strong>{p.followers ? fmtK(p.followers) : "—"}</strong><small>Imported from the public profile</small></button>
        </div>
        <div className="cr-ov-showcase">
          <section className="card cr-ov-card cr-ov-card-shell">
            <div className="cr-ov-card-head">
              <div><b>Your creator card</b><p>This is how brands discover your positioning and collaboration offer.</p></div>
              <div className="cr-ov-card-actions">
                <button type="button" className="btn btn-ghost" onClick={() => nav("profile")}><iconify-icon icon="ph:identification-card" /><span>Open card</span></button>
                <button type="button" className="btn btn-ghost" onClick={() => { navigator.clipboard?.writeText(cardUrl); ctx.toast("Card link copied"); }}><iconify-icon icon="ph:copy" /><span>Copy card link</span></button>
                <button type="button" className="btn btn-primary" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(cardUrl)}`, "_blank")}><iconify-icon icon="ph:share-network" /><span>Share my card</span></button>
              </div>
            </div>
            <div className="cr-ov-card-stage"><div id="cr-profile-card" style={{ padding: "8px 8px 0" }}><CreatorCardPreview d={ctx.cardData()} /></div></div>
          </section>
          <section className="card cr-ov-card cr-ov-next-card">
            <div className="cr-ov-card-head cr-ov-todo-head"><div><b>Your launch guide</b><p id="cr-guide-progress">{done} of {steps.length} steps complete</p></div><button className="link-arrow" onClick={() => nav("profile")}>Open card</button></div>
            <div className="cr-ov-action-body cr-ov-todo-body"><div className="cr-ov-todo-stack"><div className="cr-ov-growth">
              {steps.map((s) => <div key={s.t} className={`cr-todo-row${s.done ? " is-complete" : ""}`}><span className="cr-todo-check" aria-hidden="true"><iconify-icon icon="ph:check-circle" /></span><span className="cr-todo-copy"><b>{s.t}</b><span>{s.d}</span></span><span className="cr-todo-tag">{s.done ? "Complete" : "To do"}</span><button type="button" className="cr-todo-go" aria-label={s.t} onClick={s.go}><iconify-icon icon="ph:caret-right" /></button></div>)}
            </div></div></div>
            <div className="cr-ov-card-head" style={{ marginTop: 18 }}><div><b>Recommended opportunities</b><p>The 3 campaigns that best match your audience.</p></div><button className="link-arrow" onClick={() => nav("opportunities")}>Explore</button></div>
            {!ctx.visible ? (
              <div className="cr-ov-locked" style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "12px 14px", border: "1px solid var(--border,#E7EAF1)", borderRadius: 12, fontSize: ".84rem" }}><iconify-icon icon="ph:lock-simple" style={{ fontSize: 18, color: "var(--muted,#747B90)" }} /><span><b>Paid campaigns open at 1,000 followers</b> - You have {fmtK(p.followers)} followers. Keep posting and come back - re-check your count once a week from Settings.</span></div>
            ) : opps.length === 0 ? <div className="muted" style={{ fontSize: ".86rem" }}>No open campaign right now. Brands publish new briefs every week.</div> : (
              <div style={{ display: "grid", gap: 8 }}>{opps.map((c) => <button key={c.id} type="button" className="cr-todo-row" onClick={() => nav("opportunities")}><span className="cr-todo-copy"><b>{c.name}</b><span>{c.company?.name} · {c.objective}</span></span><span className="cr-todo-tag">{c.applied ? "Applied" : "Open"}</span></button>)}</div>
            )}
          </section>
        </div>
        <section className="card" style={{ marginTop: 18, padding: 20 }}>
          <div className="cr-ov-card-head"><div><b>Active collaborations</b><p>Everything currently moving from brief to publication.</p></div><button className="link-arrow" onClick={() => nav("collabs")}>See all</button></div>
          <table className="st-table" style={{ marginTop: 10 }}><thead><tr><th>Brand</th><th>Status</th><th>Next action</th><th>Due</th><th>Net</th></tr></thead><tbody>
            {active.length === 0 ? <tr><td colSpan={5} className="muted" style={{ textAlign: "center", padding: 16 }}>No active collaborations.</td></tr> : active.map((b) => <tr key={b.id}><td><b>{b.company?.name}</b></td><td>{b.status.replace(/_/g, " ")}</td><td className="muted">{b.next_action}</td><td className="muted">{b.due_date ? new Date(b.due_date).toLocaleDateString("en-GB") : "—"}</td><td><b>{fmtEur0(b.proposed_cents ?? b.amount_cents)}</b></td></tr>)}
          </tbody></table>
        </section>
      </div>
    </section>
  );
}
