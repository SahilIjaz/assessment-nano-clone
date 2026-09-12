"use client";
import { useState } from "react";
import type { CCtx } from "../CreatorApp";
import { INDUSTRIES } from "@/data/creators";

export default function CSettings({ ctx }: { ctx: CCtx }) {
  const { snap } = ctx; const p = snap.profile;
  const [tab, setTab] = useState<"profile" | "payments" | "account">("profile");
  const [name, setName] = useState(p.display_name ?? ""); const [li, setLi] = useState(p.linkedin_url ?? ""); const [x, setX] = useState(p.x_url ?? ""); const [inds, setInds] = useState(p.industries); const [price, setPrice] = useState(p.price_cents / 100);
  const [pro, setPro] = useState({ company: p.pro.company ?? "", vat: p.pro.vat ?? "", address: p.pro.address ?? "" });
  const [pw, setPw] = useState({ current: "", next: "" }); const [confirmDelete, setConfirmDelete] = useState(false);
  const inp = { width: "100%", border: "1px solid var(--border2,#DBE0EA)", borderRadius: 10, padding: "10px 12px", font: "inherit" } as const;
  const chip = (on: boolean) => ({ padding: "4px 11px", borderRadius: 20, fontSize: ".72rem", fontWeight: 600, cursor: "pointer", border: `1px solid ${on ? "var(--blue,#1D5BF5)" : "var(--border2,#DBE0EA)"}`, background: on ? "var(--blue-soft,#EAF0FF)" : "#fff", color: on ? "var(--blue-d,#0F46D8)" : "var(--text,#0F1220)" });
  const save = async () => { const r = await ctx.api("profile", { display_name: name, linkedin_url: li, x_url: x, industries: inds, price }); if (r.ok) ctx.toast("Profile settings saved"); };
  return (
    <section className="page nn-settings visible" id="page-settings" data-screen-label="Settings">
      <div className="st-shell">
        <div className="page-head"><h1>Settings</h1><p className="page-sub">Manage your profile and payment details.</p></div>
        <div className="st-settings-layout">
          <nav className="st-settings-nav" aria-label="Settings navigation">{(["profile", "payments", "account"] as const).map((t) => <button key={t} type="button" aria-pressed={tab === t} className={tab === t ? "is-active" : ""} onClick={() => setTab(t)}><span>{t[0]!.toUpperCase() + t.slice(1)}</span></button>)}</nav>
          <div className="st-settings-main">
            {tab === "profile" && (
              <section className="settings-panel">
                <div className="card"><h2>Personal profile</h2><div className="muted" style={{ fontSize: ".88rem", margin: "2px 0 14px" }}>This name appears on your creator card, messages and collaborations.</div><label className="settings-label" htmlFor="crs-display-name">Display name</label><div className="settings-input-row"><input id="crs-display-name" maxLength={120} style={{ ...inp, flex: 1 }} value={name} onChange={(e) => setName(e.target.value)} /><button type="button" className="btn btn-ghost" onClick={save}>Save name</button></div></div>
                <div className="card settings-divider">
                  <h2>Social links</h2><div className="muted" style={{ fontSize: ".88rem", margin: "2px 0 14px" }}>Manage your public profile links.</div>
                  <label className="settings-label" htmlFor="crs-linkedin">LinkedIn</label><div className="settings-input-row"><input id="crs-linkedin" style={{ ...inp, flex: 1 }} value={li} onChange={(e) => setLi(e.target.value)} /><button className="btn btn-ghost" style={{ border: "1px solid var(--border2,#DBE0EA)", whiteSpace: "nowrap" }} onClick={async () => { const r = await ctx.api("refresh-linkedin"); if (r.ok) ctx.toast("Profile refresh queued — public stats imported"); }}>Refresh profile</button></div>
                  <div className="muted" style={{ fontSize: ".78rem", margin: "-6px 0 12px" }}>Profile last updated: {p.followers ? "today" : "never"} · limited to once a week.</div>
                  <p className="muted" style={{ fontSize: ".8rem", lineHeight: 1.5, margin: "0 0 14px" }}>Refresh your profile, followers and authorized recent posts. Queued updates resume automatically.</p>
                  <details className="settings-details" open><summary><span>Industries</span><span className="settings-selection">{" · " + (inds.join(", ") || "none")}</span></summary><p className="settings-help">(you can edit, up to 3)</p><div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{INDUSTRIES.map((i) => <button key={i} type="button" aria-pressed={inds.includes(i)} style={chip(inds.includes(i))} disabled={!inds.includes(i) && inds.length >= 3} onClick={() => setInds(inds.includes(i) ? inds.filter((v) => v !== i) : [...inds, i])}>{i}</button>)}</div></details>
                  <label className="settings-label" htmlFor="crs-x">X (Twitter)</label><input id="crs-x" placeholder="https://x.com/your-account" style={inp} value={x} onChange={(e) => setX(e.target.value)} />
                </div>
                <div className="card"><h2>Your price per Post (net to you)</h2><div className="muted" style={{ fontSize: ".86rem", margin: "2px 0 12px" }}>Set your net price per post. You can change it anytime in Settings.</div><div style={{ display: "flex", alignItems: "center", gap: 8 }}><span>€</span><input type="number" min={10} step={1} style={{ ...inp, width: 150 }} value={price} onChange={(e) => setPrice(Number(e.target.value))} /></div></div>
                <div className="settings-actions"><button className="btn btn-primary" onClick={save}>Save profile settings</button></div>
              </section>
            )}
            {tab === "payments" && (
              <section className="settings-panel">
                <div className="card"><h2>Company and billing</h2><p className="settings-help">{pro.company ? `Invoicing as ${pro.company}.` : "Complete your billing details to receive payments."}</p>
                  <label className="settings-label">Company / legal name</label><input style={inp} value={pro.company} onChange={(e) => setPro({ ...pro, company: e.target.value })} />
                  <label className="settings-label" style={{ marginTop: 10 }}>VAT / tax number</label><input style={inp} value={pro.vat} onChange={(e) => setPro({ ...pro, vat: e.target.value })} />
                  <label className="settings-label" style={{ marginTop: 10 }}>Billing address</label><input style={inp} value={pro.address} onChange={(e) => setPro({ ...pro, address: e.target.value })} />
                  <div className="settings-actions"><button className="btn btn-primary" onClick={async () => { const r = await ctx.api("profile", { pro }); if (r.ok) ctx.toast("Billing details saved"); }}>Save billing details</button></div>
                </div>
                <div className="card settings-divider"><h2>Payout method</h2><p className="settings-help">Bank transfer or Stripe. Manage it from <a href="#earnings">Earnings</a>.</p></div>
              </section>
            )}
            {tab === "account" && (
              <section className="settings-panel">
                <div className="card"><h2>Account</h2><p className="settings-help">Signed in as {snap.user.email}. Member since {new Date(snap.user.createdAt).toLocaleDateString("en-GB")}.</p>
                  <label className="settings-label">Current password</label><input type="password" style={inp} value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} />
                  <label className="settings-label" style={{ marginTop: 10 }}>New password</label><input type="password" style={inp} value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} />
                  <div className="settings-actions"><button className="btn btn-primary" onClick={() => ctx.toast("Use “Forgot password” on the sign-in page to reset your password")}>Update password</button></div>
                </div>
                <div className="card settings-divider"><h2 style={{ color: "var(--red,#E5484D)" }}>Delete account</h2><p className="settings-help">This permanently removes your card, collaborations and messages.</p>{confirmDelete ? <div style={{ display: "flex", gap: 8 }}><button className="btn" style={{ background: "var(--red,#E5484D)", color: "#fff" }} onClick={async () => { await ctx.api("delete-account"); window.location.href = "/"; }}>Yes, delete my account</button><button className="btn btn-ghost" onClick={() => setConfirmDelete(false)}>Cancel</button></div> : <button className="btn btn-ghost" onClick={() => setConfirmDelete(true)}>Delete my account</button>}</div>
              </section>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
