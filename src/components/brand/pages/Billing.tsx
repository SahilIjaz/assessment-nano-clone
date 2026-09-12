"use client";
import { useState } from "react";
import type { Ctx } from "../BrandApp";
import { fmtDate, fmtEur, fmtEur0 } from "@/lib/format";
import { creatorBySlug } from "@/data/creators";

export default function Billing({ ctx }: { ctx: Ctx }) {
  const { snap } = ctx;
  const [tab, setTab] = useState<"all" | "topup" | "booking">("all");
  const rows = [
    ...snap.transactions.map((t) => ({ id: t.id, ref: t.reference ?? t.id.slice(0, 8).toUpperCase(), date: t.created_at, type: "topup" as const, label: "Top-up", amount: t.amount_cents, status: "Paid" })),
    ...snap.bookings.filter((b) => !["cancelled", "declined"].includes(b.status)).map((b) => ({ id: b.id, ref: "BK-" + b.id.slice(0, 6).toUpperCase(), date: b.created_at, type: "booking" as const, label: `Booking · ${creatorBySlug(b.creator_slug)?.name ?? ""}`, amount: -(b.proposed_cents ?? b.amount_cents), status: b.status === "published" || b.status === "completed" ? "Paid" : "Reserved" })),
  ].filter((r) => tab === "all" || r.type === tab).sort((a, b) => b.date.localeCompare(a.date));
  const escrow = snap.bookings.filter((b) => ["accepted", "draft_pending", "draft_review", "draft_changes", "scheduled"].includes(b.status)).reduce((a, b) => a + (b.proposed_cents ?? b.amount_cents), 0);
  return (
    <section className="page visible" id="page-billing" data-screen-label="Billing">
      <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start", marginBottom: "22px" }}>
        <div><h1>Billing</h1><svg className="ink-line" viewBox="0 0 120 12" aria-hidden="true"><path d="M3 7C26 2 46 10 68 6S104 4 117 6" /></svg><div className="page-sub">Manage your budget, plan and invoices.</div></div>
        <button className="ov3-pill" onClick={() => ctx.nav("messages")}><iconify-icon icon="ph:question" style={{ fontSize: "16px" }} /> <span>Need help?</span></button>
      </div>
      <div>
        <div className="card bb-balance rise" data-nn-entered="1" style={{ animationDelay: "0ms" }}>
          <span className="bb-coin" aria-hidden="true"><iconify-icon icon="ph:currency-eur" /></span>
          <span className="bb-bal-label">Available balance</span>
          <div className="bb-val" id="bill-balance" data-done="1">{fmtEur(snap.company.balance_cents)}</div>
          <div className="bb-bal-sub">
            <span className="muted">Ready to spend across your campaigns.</span>
            {escrow > 0 && <span className="bb-escrow" title="Reserved for your ongoing collaborations"><iconify-icon icon="ph:lock-simple" /><b>{fmtEur0(escrow)}</b> <span>held in escrow</span> <small>· reserved for your ongoing collabs</small></span>}
          </div>
          <div className="bb-bal-actions">
            <button className="btn btn-primary" onClick={() => ctx.openMoney()}>Add budget</button>
            <button className="bb-quick" onClick={() => ctx.api("topup", { amountCents: 250000 }).then((r) => r.ok && ctx.toast("€2,500 credited"))}>+ €2,500</button>
            <button className="bb-quick" onClick={() => ctx.api("topup", { amountCents: 1000000 }).then((r) => r.ok && ctx.toast("€10,000 credited"))}>+ €10,000</button>
          </div>
        </div>
      </div>
      <div className="card bl2-inv rise" data-nn-entered="1" style={{ animationDelay: "42ms" }}>
        <b style={{ fontSize: "1.1rem" }}>Invoices</b>
        <div className="tabs" id="bl2-tabs" style={{ margin: "10px 0 0" }}>
          {(["all", "topup", "booking"] as const).map((t) => <button key={t} className={`tab${tab === t ? " on" : ""}`} onClick={() => setTab(t)}>{t === "all" ? "All" : t === "topup" ? "Top-ups" : "Bookings"}</button>)}
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="st-table" id="bl2-table">
            <thead><tr><th>Reference</th><th>Date</th><th>Type</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {rows.length === 0 ? <tr><td colSpan={6} className="muted" style={{ textAlign: "center", padding: "18px" }}>No invoices or entries yet.</td></tr> : rows.map((r) => (
                <tr key={r.id}><td><b>{r.ref}</b></td><td className="muted">{fmtDate(r.date)}</td><td>{r.label}</td><td><b style={{ color: r.amount < 0 ? "var(--text)" : "var(--green)" }}>{r.amount < 0 ? "−" : "+"}{fmtEur(Math.abs(r.amount))}</b></td><td><span className={`pill ${r.status === "Paid" ? "st-completed" : "st-invited"}`}>{r.status}</span></td><td><button className="btn btn-ghost" style={{ height: 30, padding: "0 10px" }} onClick={() => ctx.toast("Invoice PDF is generated after payment settles")}>Invoice</button></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
