"use client";
import { useState } from "react";
import type { Ctx } from "../BrandApp";
import { fmtEur0 } from "@/lib/format";

export default function MoneyModal({ ctx, suggest, onClose }: { ctx: Ctx; suggest?: number; onClose: () => void }) {
  const [amount, setAmount] = useState<number>(suggest ? Math.max(500, Math.ceil(suggest / 100 / 100) * 100) : 5000);
  const [custom, setCustom] = useState("");
  const [busy, setBusy] = useState(false);
  const chips = [2500, 5000, 10000, 25000];
  const value = custom ? Number(custom) : amount;
  const pay = async () => {
    if (value < 500) { ctx.toast("Minimum €500", "err"); return; }
    setBusy(true);
    const r = await ctx.api("topup", { amountCents: Math.round(value * 100) });
    setBusy(false);
    if (r.ok) { ctx.toast(`€${value.toLocaleString("en-US")} credited to your balance`); onClose(); }
  };
  return (
    <div className="overlay open" id="modal-money" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal bb-money-modal" role="dialog" aria-modal="true" aria-labelledby="bb-money-title">
        <div className="bb-money-head">
          <div className="bb-money-head-copy">
            <div className="bb-money-kicker" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg><span>Secure payment</span></div>
            <h2 id="bb-money-title">Add budget</h2>
            <p>One-time deposit to your Naano balance. Use it across all campaigns — no subscription.</p>
          </div>
          <button type="button" className="bb-money-close" aria-label="Close" onClick={onClose}>✕</button>
        </div>
        <div className="bb-money-body">
          {suggest ? (
            <div className="bb-money-suggest" role="status">
              <span className="bb-money-suggest-ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="13" rx="2.5" /><path d="M3 10h18" /><path d="M8 15h3" /></svg></span>
              <div className="bb-money-suggest-copy"><b>Suggested for your selection</b><span>Covers the creators you picked. You can adjust below.</span></div>
              <span className="bb-money-suggest-amt">{fmtEur0(suggest)}</span>
            </div>
          ) : null}
          <div className="bb-money-label">Choose an amount</div>
          <div className="bb-chips" role="group" aria-label="Preset amounts">
            {chips.map((c) => <button key={c} type="button" className={`bb-chip${!custom && amount === c ? " on" : ""}`} data-amt={c} onClick={() => { setAmount(c); setCustom(""); }}>€{c.toLocaleString("en-US")}</button>)}
          </div>
          <label className="bb-money-custom" htmlFor="bb-custom-in"><span className="bb-money-custom-cur" aria-hidden="true">€</span><input id="bb-custom-in" type="number" min="500" step="0.01" inputMode="decimal" placeholder="Custom amount" aria-label="Custom amount" value={custom} onChange={(e) => setCustom(e.target.value)} /></label>
          <div className="bb-money-min">Minimum <b>€500</b> · credited right after payment</div>
          <div className="bb-money-summary">
            <div><small>You will credit</small><b>€{value.toLocaleString("en-US")}</b></div>
            <div className="bb-money-balance"><small>Current balance</small><b>{fmtEur0(ctx.snap.company.balance_cents)}</b></div>
          </div>
          <div className="bb-money-trust" aria-label="Payment guarantees">
            <div className="bb-money-trust-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg><span><strong>Card payment</strong> — entered only on Stripe’s secure checkout (PCI DSS).</span></div>
            <div className="bb-money-trust-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 4v5c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V7l7-4z" /><path d="m9 12 2 2 4-4" /></svg><span><strong>No subscription</strong> — funds stay in your Naano balance until used.</span></div>
            <div className="bb-money-trust-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg><span><strong>Pay on delivery</strong> — creators are charged only after the post is delivered.</span></div>
          </div>
          <button type="button" className="bb-money-cta" id="bb-add-btn" disabled={busy} onClick={pay}>{busy ? "Processing…" : `Add €${value.toLocaleString("en-US")}`}</button>
          <div className="bb-money-foot"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg> End-to-end encrypted · powered by Stripe</div>
        </div>
      </div>
    </div>
  );
}
