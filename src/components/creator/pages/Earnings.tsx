"use client";
import { useState } from "react";
import type { CCtx } from "../CreatorApp";
import { fmtEur0 } from "@/lib/format";

export default function Earnings({ ctx }: { ctx: CCtx }) {
  const p = ctx.snap.profile;
  const [method, setMethod] = useState<"bank" | "stripe">(p.payout.method === "bank" ? "bank" : "stripe");
  const [amount, setAmount] = useState(""); const [editBank, setEditBank] = useState(false); const [bank, setBank] = useState({ holder: p.payout.holder ?? "", iban: p.payout.iban ?? "" });
  const paid = ctx.snap.bookings.filter((b) => ["published", "completed"].includes(b.status));
  const months = Array.from({ length: 6 }, (_, i) => { const d = new Date(); d.setMonth(d.getMonth() - (5 - i)); return d; });
  const perMonth = months.map((m) => paid.filter((b) => { const d = new Date(b.updated_at); return d.getMonth() === m.getMonth() && d.getFullYear() === m.getFullYear(); }).reduce((a, b) => a + (b.proposed_cents ?? b.amount_cents), 0));
  const max = Math.max(1, ...perMonth);
  const inTransit = ctx.snap.withdrawals.filter((w) => w.status === "in_transit").reduce((a, w) => a + w.amount_cents, 0);
  const withdraw = async () => { const cents = amount ? Math.round(Number(amount) * 100) : p.available_cents; const r = await ctx.api("withdraw", { amountCents: cents }); if (r.ok) { ctx.toast("Withdrawal requested"); setAmount(""); } };
  const rows = [...ctx.snap.withdrawals.map((w) => ({ id: w.id, date: w.created_at, type: "Withdrawal", detail: w.reference, amount: -w.amount_cents, status: w.status === "in_transit" ? "In transit" : "Paid" })), ...paid.map((b) => ({ id: b.id, date: b.updated_at, type: "Collaboration", detail: b.company?.name ?? "", amount: b.proposed_cents ?? b.amount_cents, status: "Released" }))].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <section className="page visible" id="page-earnings" data-screen-label="Earnings">
      <div className="cr-ear-shell">
        <div className="cr-ear-head"><div><h1>Earnings</h1><div className="page-sub">Track revenue from your paid collaborations and withdraw available funds.</div></div><span className="cr-ear-mode"><i /><span>Paid collaborations</span></span></div>
        <div className="cr-ear-kpis">
          <article className="card cr-ear-balance"><div><span className="cr-ear-label"><iconify-icon icon="ph:trend-up" /><span>Total earned</span></span><strong>{fmtEur0(p.earned_cents)}</strong></div><small>{paid.length} paid collaboration{paid.length === 1 ? "" : "s"} · {fmtEur0(paid.length ? p.earned_cents / paid.length : 0)} average</small></article>
          <article className="cr-ear-kpi"><span className="cr-ear-kpi-icon pending" aria-hidden="true"><iconify-icon icon="ph:clock" /></span><strong>{fmtEur0(inTransit)}</strong><b>In transit</b><small>International transfers usually arrive within 1–7 days, depending on the destination and banking network.</small></article>
          <article className="cr-ear-kpi"><span className="cr-ear-kpi-icon available"><iconify-icon icon="ph:wallet" /></span><strong>{fmtEur0(p.available_cents)}</strong><b>Available now</b><small>Ready to withdraw to your selected payout method.</small></article>
        </div>
        <div className="cr-ear-main">
          <section className="cr-ear-card">
            <div className="cr-ear-card-head"><div><b>Earnings over time</b><span>Net collaboration earnings from the last six months.</span></div><span>{fmtEur0(perMonth.reduce((a, b) => a + b, 0))} over 6 months</span></div>
            <div className="cr-ear-chart" role="img" aria-label="Monthly collaboration earnings over the last six months">{months.map((m, i) => <div key={i} className={`cr-ear-month${i === 5 ? " current" : ""}`} title={`${m.toLocaleDateString("en-GB", { month: "long", year: "numeric" })} · ${fmtEur0(perMonth[i]!)}`}><span className="cr-ear-month-value">{fmtEur0(perMonth[i]!)}</span><span className="cr-ear-month-bar"><i style={{ height: `${Math.max(3, (perMonth[i]! / max) * 100)}%` }} /></span><span className="cr-ear-month-label">{m.toLocaleDateString("en-GB", { month: "short" })}</span></div>)}</div>
          </section>
          <aside className="cr-ear-card cr-ear-withdraw">
            <div className="cr-ear-card-head"><div><b>Withdraw earnings</b><span>Choose where your available balance should be sent.</span></div></div>
            <div className="rail-lbl">Payout method</div>
            <div id="cr-pay-methods">
              <div className={`pay-block${method === "bank" ? " sel" : ""}`} role="radio" aria-checked={method === "bank"} tabIndex={0} onClick={() => setMethod("bank")}>
                <div className="pb-head"><span className="pb-radio" /><iconify-icon icon="ph:bank" />{" Bank transfer"}</div>
                <div style={{ marginTop: 10 }}>
                  {editBank ? <div style={{ display: "grid", gap: 6 }}><input placeholder="Account holder" value={bank.holder} onChange={(e) => setBank({ ...bank, holder: e.target.value })} style={{ border: "1px solid var(--border2,#DBE0EA)", borderRadius: 8, padding: 8, font: "inherit" }} /><input placeholder="IBAN" value={bank.iban} onChange={(e) => setBank({ ...bank, iban: e.target.value })} style={{ border: "1px solid var(--border2,#DBE0EA)", borderRadius: 8, padding: 8, font: "inherit" }} /><button className="btn btn-primary btn-sm" onClick={async (e) => { e.stopPropagation(); const r = await ctx.api("profile", { payout: { ...p.payout, method: "bank", ...bank } }); if (r.ok) { setEditBank(false); ctx.toast("Bank details saved"); } }}>Save</button></div> : <><div style={{ fontSize: ".86rem" }}>{p.payout.holder || "No account holder on file"}</div><div className="muted" style={{ fontSize: ".85rem", fontVariantNumeric: "tabular-nums" }}>{p.payout.iban ? `•••• ${p.payout.iban.slice(-4)}` : "No bank details on file"}</div><button className="btn btn-ghost btn-sm" style={{ border: "1px solid var(--border2,#DBE0EA)", marginTop: 9 }} onClick={(e) => { e.stopPropagation(); setEditBank(true); }}>Edit</button></>}
                </div>
              </div>
              <div className={`pay-block${method === "stripe" ? " sel" : ""}`} role="radio" aria-checked={method === "stripe"} tabIndex={0} onClick={() => setMethod("stripe")}>
                <div className="pb-head"><span className="pb-radio" /><iconify-icon icon="ph:credit-card" />{" Stripe"}</div>
                <div style={{ marginTop: 10, fontSize: ".86rem" }}>{"Status: "}<span className="muted">{p.payout.stripe ? "Connected" : "Not connected"}</span></div>
                <div className="muted" style={{ fontSize: ".8rem", marginTop: 2 }}>Instant transfer to your connected Stripe account.</div>
                <button className="btn btn-ghost btn-sm" style={{ border: "1px solid var(--border2,#DBE0EA)", marginTop: 9 }} onClick={async (e) => { e.stopPropagation(); const r = await ctx.api("profile", { payout: { ...p.payout, method: "stripe", stripe: "acct_local_demo" } }); if (r.ok) ctx.toast("Stripe connected (local sandbox)"); }}>{p.payout.stripe ? "Manage" : "Connect Stripe"}</button>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}><span style={{ alignSelf: "center" }}>€</span><input type="number" placeholder={String(p.available_cents / 100)} value={amount} onChange={(e) => setAmount(e.target.value)} style={{ flex: 1, border: "1px solid var(--border2,#DBE0EA)", borderRadius: 10, padding: "8px 10px", font: "inherit" }} /><button className="btn btn-ghost" onClick={() => setAmount(String(p.available_cents / 100))}>Withdraw all</button></div>
            <button className="btn btn-primary" style={{ width: "100%", marginTop: 8 }} disabled={p.available_cents === 0} onClick={withdraw}>Confirm withdrawal</button>
            {p.available_cents === 0 && <p className="muted" style={{ fontSize: ".8rem", marginTop: 8 }}>No earnings are currently waiting for release.</p>}
          </aside>
        </div>
        <section className="cr-ear-card" style={{ marginTop: 18 }}>
          <div className="cr-ear-card-head"><div><b>Recent activity</b><span>Collaboration earnings, withdrawals and invoices in one place.</span></div></div>
          <table className="st-table"><thead><tr><th>Date</th><th>Type</th><th>Detail</th><th>Amount</th><th>Status</th><th>Invoice</th></tr></thead><tbody>{rows.length === 0 ? <tr><td colSpan={6} className="muted" style={{ textAlign: "center", padding: 18 }}>No movements yet. Your first payment will appear here.</td></tr> : rows.map((r) => <tr key={r.id}><td>{new Date(r.date).toLocaleDateString("en-GB")}</td><td>{r.type}</td><td>{r.detail}</td><td><b>{r.amount < 0 ? "−" : "+"}{fmtEur0(Math.abs(r.amount))}</b></td><td>{r.status}</td><td><button className="btn btn-ghost btn-sm" onClick={() => ctx.toast("Invoices are generated after each released payment")}>PDF</button></td></tr>)}</tbody></table>
        </section>
      </div>
    </section>
  );
}
