"use client";
import { useState } from "react";
import type { CCtx } from "../CreatorApp";
import { fmtK, fmtEur0, initials } from "@/lib/format";

export default function Opportunities({ ctx }: { ctx: CCtx }) {
  const { snap } = ctx;
  const [q, setQ] = useState(""); const [open, setOpen] = useState<string | null>(null); const [pitch, setPitch] = useState("");
  const invites = snap.bookings.filter((b) => b.status === "invited");
  const list = snap.campaigns.filter((c) => !q || `${c.name} ${c.company?.name ?? ""}`.toLowerCase().includes(q.toLowerCase()));
  const apply = async (id: string) => { const r = await ctx.api("apply", { campaignId: id, pitch }); if (r.ok) { ctx.toast("Application sent"); setOpen(null); setPitch(""); } };
  const current = open ? snap.campaigns.find((c) => c.id === open) : null;
  return (
    <section className="page visible" id="page-opportunities" data-screen-label="Opportunities">
      <div className="page-head"><h1>Opportunities</h1><div className="page-sub">Open brand campaigns - apply, the brand accepts, and the booking is created on your terms.</div></div>
      <div className="card" style={{ padding: "16px 18px", marginBottom: 18 }}>
        <b style={{ fontSize: "1rem" }}>Invitations received</b><div className="muted" style={{ fontSize: ".83rem", marginTop: 2 }}>Brands invited you directly. Accept before they expire.</div>
        <div className="inv-slider-wrap"><div className="inv-slider">{invites.length === 0 ? <div className="muted" style={{ fontSize: ".86rem", padding: "6px 2px" }}>No pending invitations. Polish your public profile, it is what convinces brands.</div> : invites.map((b) => <div key={b.id} className="card" style={{ padding: 14, minWidth: 260, display: "inline-block", marginRight: 10 }}><b>{b.company?.name}</b><div className="muted" style={{ fontSize: ".8rem" }}>{b.campaign} · {b.posts} post · {fmtEur0(b.proposed_cents ?? b.amount_cents)}</div><div style={{ display: "flex", gap: 6, marginTop: 8 }}><button className="btn btn-primary btn-sm" onClick={() => ctx.api("booking-action", { id: b.id, act: "accept" }).then((r) => r.ok && ctx.toast("Invitation accepted"))}>Accept</button><button className="btn btn-ghost btn-sm" onClick={() => ctx.api("booking-action", { id: b.id, act: "decline" })}>Decline</button></div></div>)}</div></div>
      </div>
      {!ctx.visible ? (
        <div className="creator-grid" id="cr-opps"><div className="card" style={{ gridColumn: "1/-1", padding: "34px 30px", textAlign: "center", maxWidth: 560, margin: "0 auto" }}><iconify-icon icon="ph:lock-simple" style={{ fontSize: 30, color: "var(--muted,#747B90)" }} /><h3 style={{ margin: "10px 0 6px" }}>Paid campaigns open at 1,000 followers</h3><div className="muted" style={{ fontSize: ".92rem", lineHeight: 1.55 }}>You have {fmtK(snap.profile.followers)} followers. Keep posting and come back - re-check your count once a week from Settings.</div></div></div>
      ) : (
        <>
          <div className="toolbar" style={{ display: "flex", gap: 10, marginBottom: 14 }}><label className="search" style={{ flex: 1 }}><input placeholder="Search for a campaign or a brand…" value={q} onChange={(e) => setQ(e.target.value)} /></label><select className="select" defaultValue="rel"><option value="rel">Relevance (default)</option><option value="match">Match: high to low</option><option value="new">Newest</option></select></div>
          <div className="creator-grid" id="cr-opps" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 14 }}>
            {list.length === 0 ? <div className="empty muted">No campaign matches these filters. Remove a filter.</div> : list.map((c) => (
              <article key={c.id} className="card" style={{ padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span className="avatar-sm" style={{ background: "#0F1220", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 10, fontWeight: 700 }}>{c.company?.logo_url ? <img src={c.company.logo_url} alt="" style={{ width: 22, height: 22 }} /> : initials(c.company?.name ?? "B")}</span><div><b style={{ display: "block" }}>{c.company?.name}</b><span className="muted" style={{ fontSize: ".78rem" }}>{c.company?.industry} · {new Date(c.created_at).toLocaleDateString("en-GB")}</span></div></div>
                <b style={{ fontSize: "1.02rem" }}>{c.name}</b>
                <p className="muted" style={{ margin: 0, fontSize: ".86rem", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{c.brief?.context ?? c.objective}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}><span className="muted" style={{ fontSize: ".8rem" }}>Your rate · {fmtEur0(snap.profile.price_cents)}/post</span>{c.applied ? <span className="pill st-invited">Applied</span> : <button className="btn btn-primary btn-sm" onClick={() => setOpen(c.id)}>Apply</button>}</div>
              </article>
            ))}
          </div>
        </>
      )}
      {current && (
        <div className="overlay open" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(null); }}>
          <div className="modal" role="dialog" aria-modal="true" style={{ maxWidth: 640 }}>
            <div className="nn-offer-head"><h2>Apply to {current.name}</h2><button aria-label="Close" onClick={() => setOpen(null)}>✕</button></div>
            <div style={{ padding: "0 4px" }}>
              <p className="muted" style={{ fontSize: ".9rem" }}>{current.brief?.objective}</p>
              {current.brief && <details style={{ margin: "8px 0" }}><summary>Read the full brief</summary><p style={{ fontSize: ".88rem" }}>{current.brief.context}</p><b>Do</b><ul>{current.brief.dos.map((d) => <li key={d}>{d}</li>)}</ul><b>Avoid</b><ul>{current.brief.donts.map((d) => <li key={d}>{d}</li>)}</ul></details>}
              <label className="settings-label">Your pitch (optional)</label><textarea style={{ width: "100%", minHeight: 90, border: "1px solid var(--border2,#DBE0EA)", borderRadius: 10, padding: 10, font: "inherit" }} placeholder="Why your audience is the right fit for this brand." value={pitch} onChange={(e) => setPitch(e.target.value)} />
              <div className="nn-pack-actions" style={{ marginTop: 12 }}><button className="nn-pack-negotiate" onClick={() => setOpen(null)}>Cancel</button><button className="nn-pack-book" onClick={() => apply(current.id)}>Apply at {fmtEur0(snap.profile.price_cents)} / post</button></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
