"use client";
import { useState } from "react";
import type { CCtx } from "../CreatorApp";
import { fmtEur0 } from "@/lib/format";

const LABEL: Record<string, string> = { application: "Application sent", invited: "Invitation received", negotiating: "Offer received", accepted: "Accepted · draft due", draft_review: "Draft in review", draft_changes: "Changes requested", published: "Published", completed: "Completed", declined: "Declined", cancelled: "Cancelled" };
const bucket = (s: string) => (["declined", "cancelled"].includes(s) ? "declined" : ["completed", "published"].includes(s) ? "completed" : s === "application" ? "applied" : ["invited", "negotiating", "draft_changes", "accepted"].includes(s) ? "action" : "active");

export default function Collabs({ ctx }: { ctx: CCtx }) {
  const { snap } = ctx;
  const [tab, setTab] = useState("all"); const [open, setOpen] = useState<string | null>(null); const [draft, setDraft] = useState("");
  const counts = { all: snap.bookings.length, active: snap.bookings.filter((b) => ["active", "action"].includes(bucket(b.status))).length, action: snap.bookings.filter((b) => bucket(b.status) === "action").length, applied: snap.bookings.filter((b) => bucket(b.status) === "applied").length, declined: snap.bookings.filter((b) => bucket(b.status) === "declined").length, completed: snap.bookings.filter((b) => bucket(b.status) === "completed").length };
  const list = snap.bookings.filter((b) => tab === "all" || (tab === "active" ? ["active", "action"].includes(bucket(b.status)) : bucket(b.status) === tab));
  const b = open ? snap.bookings.find((x) => x.id === open) : null;
  const act = async (id: string, a: string, extra: Record<string, unknown> = {}) => { const r = await ctx.api("booking-action", { id, act: a, ...extra }); if (r.ok) ctx.toast("Updated"); };
  return (
    <section className="page visible" id="page-collabs" data-screen-label="Collaborations">
      <div className="page-head"><h1>Collaborations</h1><div className="page-sub">Every step tells you where you stand, what to do, and what happens if you do nothing.</div></div>
      <div className="tabs" style={{ margin: "0 0 18px" }}>{([["all", "All"], ["active", "Active"], ["action", "Needs action"], ["applied", "Applications sent"], ["declined", "Declined"], ["completed", "Completed"]] as const).map(([k, l]) => <button key={k} className={`tab${tab === k ? " on" : ""}`} onClick={() => setTab(k)}><span>{l}</span> <span className="pill">{counts[k]}</span></button>)}</div>
      <div className="cl2-wrap"><div className="card st-table-card" style={{ marginBottom: 0, minWidth: 0 }}>
        <div style={{ overflowX: "auto" }}><table className="st-table"><thead><tr><th>Brand</th><th>Campaign</th><th>Status</th><th>Performance</th><th>Next action</th><th>Due date</th><th>Your net</th><th /></tr></thead><tbody>
          {list.length === 0 ? <tr><td colSpan={8} className="muted" style={{ textAlign: "center", padding: 18 }}>No collaborations yet. Brand invitations and your accepted applications land here.</td></tr> : list.map((x) => <tr key={x.id} style={{ cursor: "pointer" }} onClick={() => setOpen(x.id)}><td><b>{x.company?.name}</b></td><td>{x.campaign}</td><td><span className={`pill st-${bucket(x.status) === "action" ? "action" : bucket(x.status) === "completed" ? "completed" : "invited"}`}>{LABEL[x.status] ?? x.status}</span></td><td className="muted">{x.status === "published" ? "Live" : "—"}</td><td className="muted">{x.next_action}</td><td className="muted">{x.due_date ? new Date(x.due_date).toLocaleDateString("en-GB") : "—"}</td><td><b>{fmtEur0(x.proposed_cents ?? x.amount_cents)}</b></td><td><button className="btn btn-ghost" style={{ height: 30, padding: "0 10px" }}>Open</button></td></tr>)}
        </tbody></table></div>
        <div className="cl2-foot"><span className="muted" style={{ fontSize: ".86rem" }}>{list.length} collaboration{list.length === 1 ? "" : "s"}</span><div className="cl2-pages"><button className="on">1</button></div></div>
      </div></div>
      {b && (
        <div className="overlay open" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(null); }}>
          <div className="modal" role="dialog" aria-modal="true" style={{ maxWidth: 620 }}>
            <div className="nn-offer-head"><h2>{b.company?.name} · {b.campaign}</h2><button aria-label="Close" onClick={() => setOpen(null)}>✕</button></div>
            <div style={{ display: "grid", gap: 12 }}>
              <div className="card" style={{ padding: 14 }}><span className="pill st-invited">{LABEL[b.status] ?? b.status}</span><p className="muted" style={{ margin: "8px 0 0", fontSize: ".86rem" }}>{b.next_action}</p><p style={{ margin: "6px 0 0", fontSize: ".86rem" }}>{b.posts} post{b.posts > 1 ? "s" : ""} · <b>{fmtEur0(b.proposed_cents ?? b.amount_cents)}</b> net{b.proposed_cents ? ` (brand proposed ${fmtEur0(b.proposed_cents)} instead of ${fmtEur0(b.amount_cents)})` : ""}</p></div>
              {(b.status === "invited" || b.status === "negotiating") && <div style={{ display: "flex", gap: 8 }}><button className="btn btn-primary" onClick={() => act(b.id, "accept")}>Accept {b.proposed_cents ? "the offer" : "the invitation"}</button><button className="btn btn-ghost" onClick={() => act(b.id, "decline")}>Decline</button></div>}
              {(b.status === "accepted" || b.status === "draft_changes") && <div><label className="settings-label">Your draft</label><textarea style={{ width: "100%", minHeight: 120, border: "1px solid var(--border2,#DBE0EA)", borderRadius: 10, padding: 10, font: "inherit" }} placeholder="Paste the post you plan to publish. The brand reviews it before you go live." value={draft} onChange={(e) => setDraft(e.target.value)} /><button className="btn btn-primary" style={{ marginTop: 8 }} disabled={!draft.trim()} onClick={() => { act(b.id, "submit-draft", { draft }); setDraft(""); }}>Submit draft for review</button></div>}
              {b.status === "draft_review" && <p className="muted" style={{ fontSize: ".86rem" }}>Waiting for the brand. If you do nothing, the brand has 5 days to approve or request changes.</p>}
              {b.status === "scheduled" || b.status === "accepted" ? null : null}
              {["draft_review", "accepted"].includes(b.status) && <button className="btn" onClick={() => act(b.id, "publish")}>Mark as published on LinkedIn</button>}
              <button className="btn btn-ghost" onClick={() => { setOpen(null); ctx.nav("messages"); }}>Open the conversation</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
