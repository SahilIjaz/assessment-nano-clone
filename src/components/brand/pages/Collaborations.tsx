"use client";
import { useMemo, useState } from "react";
import type { Ctx } from "../BrandApp";
import { creatorBySlug } from "@/data/creators";
import { CreatorAvatar } from "../Avatar";
import { fmtDate, fmtEur0 } from "@/lib/format";
import type { Booking } from "@/lib/brand-data";

export const STATUS_LABEL: Record<string, string> = { invited: "Invitation sent", negotiating: "Offer pending", accepted: "Accepted", draft_pending: "Draft in progress", draft_review: "Draft to review", draft_changes: "Changes requested", scheduled: "Scheduled", published: "Published", completed: "Completed", cancelled: "Cancelled", declined: "Declined" };
const bucket = (b: Booking) => (["cancelled", "declined", "completed"].includes(b.status) ? "completed" : ["invited", "negotiating"].includes(b.status) ? "invited" : b.status === "draft_review" ? "action" : "active");

export function CollabTable({ ctx, bookings, onOpen, hideCampaign }: { ctx: Ctx; bookings: Booking[]; onOpen: (b: Booking) => void; hideCampaign?: boolean }) {
  return (
    <div className="card st-table-card rise" style={{ marginBottom: "0px", minWidth: "0px", animationDelay: "0ms" }} data-nn-entered="1">
      <div style={{ overflowX: "auto" }}>
        <table className="st-table" id="cl2-table">
          <thead><tr><th><label className="cl2-select-all"><input type="checkbox" aria-label="Select all" disabled /><span>Creator</span></label></th>{!hideCampaign && <th>Campaign</th>}<th>Status</th><th>Next action</th><th>Due date</th><th>Amount</th><th>Updated</th><th /></tr></thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr><td colSpan={8} className="muted" style={{ textAlign: "center", padding: "18px" }}>No collaborations yet, invite a creator from the Marketplace.</td></tr>
            ) : bookings.map((b) => { const c = creatorBySlug(b.creator_slug); const camp = ctx.snap.campaigns.find((x) => x.id === b.campaign_id); return (
              <tr key={b.id} style={{ cursor: "pointer" }} onClick={() => onOpen(b)}>
                <td><div style={{ display: "flex", alignItems: "center", gap: 10 }}><CreatorAvatar name={c?.name ?? "?"} className="avatar-sm nn-avatar-initials" size={30} /><div><b style={{ display: "block" }}>{c?.name}</b><span className="muted" style={{ fontSize: ".78rem" }}>{c?.industries.slice(0, 2).join(" · ")}</span></div></div></td>
                {!hideCampaign && <td>{camp?.name ?? "—"}</td>}
                <td><span className={`pill st-${bucket(b)}`}>{STATUS_LABEL[b.status] ?? b.status}</span></td>
                <td className="muted">{b.next_action ?? "—"}</td>
                <td className="muted">{b.due_date ? fmtDate(b.due_date) : "—"}</td>
                <td><b>{fmtEur0(b.proposed_cents ?? b.amount_cents)}</b>{b.proposed_cents ? <span className="muted" style={{ fontSize: ".75rem" }}> offer</span> : null}</td>
                <td className="muted">{fmtDate(b.updated_at)}</td>
                <td><button type="button" className="btn btn-ghost" style={{ height: 30, padding: "0 10px" }} onClick={(e) => { e.stopPropagation(); onOpen(b); }}>Open</button></td>
              </tr>
            ); })}
          </tbody>
        </table>
      </div>
      <div className="cl2-foot">
        <span className="muted" style={{ fontSize: ".86rem" }}>{bookings.length} collaboration{bookings.length === 1 ? "" : "s"}</span>
        <div className="cl2-pages"><button className="on">1</button></div>
        <span className="muted" style={{ fontSize: ".86rem", display: "flex", alignItems: "center", gap: "8px" }}><span>Rows per page:</span> <select className="select" style={{ height: "32px", padding: "0 8px" }} defaultValue="10"><option>10</option><option>25</option><option>50</option></select></span>
      </div>
    </div>
  );
}

export function CollabPanel({ ctx, b, onClose }: { ctx: Ctx; b: Booking; onClose: () => void }) {
  const c = creatorBySlug(b.creator_slug)!;
  const conv = ctx.snap.conversations.find((x) => x.booking_id === b.id);
  const act = async (a: string) => { await ctx.api("booking-action", { id: b.id, act: a }); ctx.toast(a === "cancel" ? "Collaboration cancelled" : "Updated"); if (a === "cancel") onClose(); };
  return (
    <div className="cl2-overlay is-open" id="cl2-overlay" aria-hidden="false" style={{ display: "block" }}>
      <div className="cl2-overlay-backdrop" aria-hidden="true" onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(15,18,32,.35)", zIndex: 120 }} />
      <aside className="cl2-detail-card" id="cl2-panel" role="dialog" aria-modal="true" aria-label="Collaboration detail" style={{ display: "block", position: "fixed", right: 16, top: 16, bottom: 16, width: 460, background: "var(--card)", borderRadius: 18, boxShadow: "0 24px 60px rgba(15,18,32,.22)", zIndex: 121, padding: 22, overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <CreatorAvatar name={c.name} className="nn-profile-avatar nn-avatar-initials" size={48} />
          <div style={{ flex: 1 }}><b style={{ display: "block", fontSize: "1.05rem" }}>{c.name}</b><span className="muted" style={{ fontSize: ".82rem" }}>{c.industries.slice(0, 2).join(" · ")} · {c.flag}</span></div>
          <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>✕</button>
        </div>
        <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
          <div className="card" style={{ padding: 14 }}><small className="muted">Status</small><div><span className={`pill st-${bucket(b)}`}>{STATUS_LABEL[b.status] ?? b.status}</span></div><p className="muted" style={{ margin: "8px 0 0", fontSize: ".85rem" }}>{b.next_action}</p></div>
          <div className="card" style={{ padding: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div><small className="muted">Offer</small><b style={{ display: "block" }}>{b.posts} post{b.posts > 1 ? "s" : ""} · {fmtEur0(b.proposed_cents ?? b.amount_cents)}</b></div>
            <div><small className="muted">Due</small><b style={{ display: "block" }}>{b.due_date ? fmtDate(b.due_date) : "—"}</b></div>
            <div><small className="muted">Campaign</small><b style={{ display: "block" }}>{ctx.snap.campaigns.find((x) => x.id === b.campaign_id)?.name ?? "—"}</b></div>
            <div><small className="muted">Created</small><b style={{ display: "block" }}>{fmtDate(b.created_at)}</b></div>
          </div>
          <div className="card" style={{ padding: 14 }}>
            <small className="muted">What happens next</small>
            <ol style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: ".85rem", lineHeight: 1.6 }}>
              <li>{c.first} accepts the invitation (72h). Your balance is only committed then.</li><li>The creator submits a draft; you approve or request changes.</li><li>The post goes live and results land in Results.</li><li>Payment is released to the creator after delivery.</li>
            </ol>
          </div>
          {conv && <div className="card" style={{ padding: 14 }}><small className="muted">Thread</small>{conv.messages.slice(-3).map((m) => <p key={m.id} style={{ margin: "6px 0 0", fontSize: ".85rem" }}><b>{m.sender === "brand" ? "You" : m.sender === "system" ? "Naano" : c.first}:</b> {m.body}</p>)}<button className="btn btn-ghost" style={{ marginTop: 8 }} onClick={() => { onClose(); ctx.nav("messages"); }}>Open conversation</button></div>}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {b.status === "draft_review" && <><button className="btn btn-primary" onClick={() => act("approve")}>Approve draft</button><button className="btn" onClick={() => act("request-changes")}>Request changes</button></>}
            {!["cancelled", "declined", "completed", "published"].includes(b.status) && <button className="btn btn-ghost" onClick={() => act("cancel")}>Cancel collaboration</button>}
            <button className="btn" onClick={() => { onClose(); ctx.openCreator(c.slug); }}>View creator</button>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function Collaborations({ ctx }: { ctx: Ctx }) {
  const { snap } = ctx;
  const [tab, setTab] = useState("all");
  const [campaign, setCampaign] = useState("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Booking | null>(null);
  const all = snap.bookings;
  const counts = useMemo(() => ({ all: all.length, active: all.filter((b) => bucket(b) === "active").length, received: 0, invited: all.filter((b) => bucket(b) === "invited").length, action: all.filter((b) => bucket(b) === "action").length, completed: all.filter((b) => bucket(b) === "completed").length }), [all]);
  const list = all.filter((b) => (tab === "all" || bucket(b) === tab) && (campaign === "all" || b.campaign_id === campaign) && (!q || (creatorBySlug(b.creator_slug)?.name ?? "").toLowerCase().includes(q.toLowerCase())));
  const committed = all.filter((b) => !["cancelled", "declined"].includes(b.status)).reduce((a, b) => a + (b.proposed_cents ?? b.amount_cents), 0);
  const tabs: [string, string][] = [["all", "All"], ["active", "Active"], ["received", "Invitations received"], ["invited", "Invitations sent"], ["action", "To do"], ["completed", "Completed"]];
  return (
    <section className="page visible" id="page-collaborations" data-screen-label="Collaborations">
      <section className="cl2-hero nn-campaign-header" aria-labelledby="cl2-title">
        <div className="cl2-hero-main">
          <div className="cl2-hero-copy"><h1 id="cl2-title">Collaborations</h1><svg className="ink-line" viewBox="0 0 120 12" aria-hidden="true"><path d="M3 7C26 2 46 10 68 6S104 4 117 6" /></svg></div>
          <div className="cl2-hero-stats" aria-label="Collaboration overview">
            <div className="cl2-stat"><span className="ic"><iconify-icon icon="ph:users-three" /></span><div><b>{all.length}</b><span>collaborations</span></div></div>
            <div className="cl2-stat"><span className="ic"><iconify-icon icon="ph:shield-check" /></span><div><b>{fmtEur0(committed)}</b><span>committed</span></div></div>
            <div className="cl2-stat"><span className="ic"><iconify-icon icon="ph:warning-circle" /></span><div><b>{counts.action}</b><span>to do</span></div></div>
          </div>
        </div>
        <div className="nn-campaign-toolbar">
          <label className="nn-campaign-picker"><span>Campaign</span><select className="select" value={campaign} onChange={(e) => setCampaign(e.target.value)}><option value="all">All campaigns</option>{snap.campaigns.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
          <label className="search cl2-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg><input placeholder="Search creators, campaigns…" value={q} onChange={(e) => setQ(e.target.value)} /></label>
          <div className="nn-campaign-actions">{campaign !== "all" && <button type="button" className="btn btn-ghost" onClick={() => ctx.nav(`campaigns/${campaign}/pipeline`)}>Open campaign</button>}</div>
        </div>
        <div className="cl2-control-deck">
          <div className="tabs cl2-tabs nn-liquid-segment" role="tablist" aria-label="Collaboration filters">
            {tabs.map(([k, l]) => <button key={k} className={`tab${tab === k ? " on" : ""}`} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}><span>{l}</span> <span className="pill">{counts[k as keyof typeof counts]}</span></button>)}
          </div>
        </div>
      </section>
      <div className="cl2-wrap" id="cl2-wrap"><CollabTable ctx={ctx} bookings={list} onOpen={setOpen} /></div>
      {open && <CollabPanel ctx={ctx} b={snap.bookings.find((x) => x.id === open.id) ?? open} onClose={() => setOpen(null)} />}
    </section>
  );
}
