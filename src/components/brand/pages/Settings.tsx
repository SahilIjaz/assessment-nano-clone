"use client";
import { useEffect, useState } from "react";
import type { Ctx } from "../BrandApp";
import { INDUSTRIES } from "@/data/creators";

const REGIONS = ["Europe", "North America", "Latin America", "Asia", "Africa", "Oceania", "Middle East", "Worldwide"];
const SIZES = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"];

function Chips({ items, onRemove, onAdd, addLabel, options, colored }: { items: string[]; onRemove: (s: string) => void; onAdd?: (s: string) => void; addLabel: string; options?: string[]; colored?: boolean }) {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState("");
  return (
    <div className="st-surface">
      <div className="st-chips">
        {items.map((s) => <button key={s} type="button" className="stg-pill" style={colored ? { background: "#D6F1F7", color: "#0E7490", borderColor: "#AEDFEC" } : undefined} title="Remove" onClick={() => onRemove(s)}>{s}<span className="x">×</span></button>)}
        {onAdd && <button type="button" className="stg-pill stg-add" onClick={() => setOpen((v) => !v)}>{addLabel}</button>}
      </div>
      {open && onAdd && (options ? (
        <div className="st-picker" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>{options.filter((o) => !items.includes(o)).map((o) => <button key={o} type="button" className="stg-pill" onClick={() => { onAdd(o); setOpen(false); }}>{o}</button>)}</div>
      ) : (
        <div className="st-feature-add"><input className="st-input" placeholder="Type and press Add" value={val} onChange={(e) => setVal(e.target.value)} maxLength={80} /><button type="button" className="st-btn st-btn-ghost" onClick={() => { if (val.trim()) { onAdd(val.trim()); setVal(""); setOpen(false); } }}>+ Add</button></div>
      ))}
    </div>
  );
}

export default function Settings({ ctx }: { ctx: Ctx }) {
  const { snap, route } = ctx;
  const c = snap.company;
  const tab = route.parts[0] === "audience" || route.parts[0] === "intelligence" ? "audience" : route.parts[0] === "team" ? "team" : "profile";
  const [form, setForm] = useState({ name: c.name, website: c.website ?? "", tagline: c.tagline ?? "", description: c.description ?? "", valueProp: c.value_prop ?? "", industry: c.industry, size: c.size, features: c.features, differentiators: c.differentiators, icps: c.icps, targetIndustries: c.targetIndustries, targetRegions: c.targetRegions });
  const [invite, setInvite] = useState("");
  const [rescan, setRescan] = useState(false);
  useEffect(() => { setForm({ name: c.name, website: c.website ?? "", tagline: c.tagline ?? "", description: c.description ?? "", valueProp: c.value_prop ?? "", industry: c.industry, size: c.size, features: c.features, differentiators: c.differentiators, icps: c.icps, targetIndustries: c.targetIndustries, targetRegions: c.targetRegions }); }, [c]);
  const save = async () => { const r = await ctx.api("settings", form); if (r.ok) ctx.toast("Settings saved"); };
  const doRescan = async () => { setRescan(true); const r = await fetch("/api/auth/analyze-website", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ website: form.website || c.website }) }).then((x) => x.json()); setRescan(false); if (r.ok) { const s = await ctx.api("locale", { locale: snap.user.locale }); if (s.ok) ctx.toast("Website re-scanned — review the imported details"); } else ctx.toast(r.error || "Could not scan", "err"); };
  const Nav = () => (
    <nav className="st-settings-nav" aria-label="Settings navigation">
      <button type="button" aria-pressed={tab === "profile"} className={tab === "profile" ? "is-active" : ""} onClick={() => ctx.nav("settings")}><span>Profile</span></button>
      <button type="button" aria-pressed={tab === "audience"} className={tab === "audience" ? "is-active" : ""} onClick={() => ctx.nav("settings/audience")}><span>Audience</span></button>
      <a className="card st-card st-team-entry rise" href="#settings/team" aria-pressed={tab === "team"} data-nn-entered="1">
        <span className="ic"><iconify-icon icon="ph:users-three" /></span>
        <span className="st-team-entry-copy"><b>Team & access</b><span className="st-hint">Invite colleagues to work together on campaigns, messages, bookings and your shared wallet.</span></span>
        <span className="st-team-entry-cta">Manage team</span><iconify-icon className="st-team-entry-arrow" icon="ph:arrow-right" />
      </a>
      <a href="#integrations"><span>Integrations</span></a>
    </nav>
  );
  return (
    <section className="page nn-settings visible" id="page-settings" data-screen-label="Settings">
      <div className="st-shell">
        <div className="page-head"><span className="st-kicker">Naano workspace</span><h1>Settings</h1><p className="page-sub">Manage your company profile and the audience you want to reach.</p></div>
        <div className="st-settings-layout">
          <Nav />
          <div className="st-settings-main">
            {tab === "profile" && (
              <section id="settings-profile" className="settings-panel">
                <div className="card st-card rise" id="st-card-company" data-nn-entered="1" style={{ animationDelay: "42ms" }}>
                  <div className="st-card-hd"><span className="ic" id="st-company-icon">{c.logo_url ? <img className="st-company-logo" src={c.logo_url} alt="" loading="lazy" /> : <iconify-icon icon="ph:buildings" />}</span><div><b>Identity</b></div></div>
                  <div className="st-card-bd">
                    <div className="st-2col">
                      <div className="st-field"><label className="st-label" htmlFor="st-name">Company name</label><input id="st-name" className="st-input" placeholder="Your company" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                      <div className="st-field"><label className="st-label" htmlFor="st-website">Website</label><input id="st-website" className="st-input" placeholder="https://your-site.com" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} /></div>
                    </div>
                    <div className="st-field"><label className="st-label" htmlFor="st-tagline">Tagline</label><input id="st-tagline" className="st-input" placeholder="One-line positioning" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} /></div>
                  </div>
                </div>
                <div className="card st-card settings-divider rise" id="st-card-meta" data-nn-entered="1" style={{ animationDelay: "84ms" }}>
                  <div className="st-card-hd"><span className="ic"><iconify-icon icon="ph:sliders-horizontal" /></span><div><b><span>Sector & size</span></b></div></div>
                  <div className="st-card-bd">
                    <div className="st-field"><div className="st-label"><span>Your industry</span></div><Chips items={[form.industry]} onRemove={() => {}} onAdd={(s) => setForm({ ...form, industry: s })} addLabel="Change" options={INDUSTRIES} colored /></div>
                    <div className="st-field"><div className="st-label"><span>Company size</span></div><div className="st-seg" id="st-size">{SIZES.map((s) => <button key={s} type="button" className={form.size === s ? "on" : ""} onClick={() => setForm({ ...form, size: s })}>{s}</button>)}</div></div>
                  </div>
                </div>
                <div className="st-hero settings-divider">
                  <div className="st-hero-copy"><p>Review the information imported from your website.</p><div className="st-meta" id="st-intel-meta"><iconify-icon icon="ph:check-circle" style={{ color: "#16A34A" }} />{` ${form.icps.length} buyer ICPs are ready — review them, then save.`}</div></div>
                  <div className="st-hero-actions"><button type="button" className="st-btn st-btn-ghost" onClick={() => ctx.toast("Logo is imported from your website favicon")}>Change logo</button><button type="button" className="st-btn st-btn-ghost" id="st-rescan" disabled={rescan} onClick={doRescan}><span>{rescan ? "Scanning…" : "Re-scan website"}</span></button></div>
                </div>
                <details className="settings-details" open>
                  <summary><span>Product details</span></summary>
                  <div className="card st-card rise" id="st-card-product" data-nn-entered="1">
                    <div className="st-card-hd"><span className="ic"><iconify-icon icon="ph:article" /></span><div><b><span>Product story</span></b></div></div>
                    <div className="st-card-bd">
                      <div className="st-field"><label className="st-label" htmlFor="st-desc">Description</label><textarea id="st-desc" className="st-input" rows={3} placeholder="What your product does, for whom, and why it matters" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                      <div className="st-field"><label className="st-label" htmlFor="st-product">Product summary</label><textarea id="st-product" className="st-input" rows={4} placeholder="How the product works in practice" value={form.valueProp} onChange={(e) => setForm({ ...form, valueProp: e.target.value })} /></div>
                      <div className="st-row-2">
                        <div><div className="st-label"><span>Product features</span><span className="st-count">{form.features.length} selected</span></div><Chips items={form.features} onRemove={(s) => setForm({ ...form, features: form.features.filter((x) => x !== s) })} onAdd={(s) => setForm({ ...form, features: [...form.features, s] })} addLabel="+ Add a feature" /></div>
                        <div><div className="st-label"><span>Differentiators</span><span className="st-count">{form.differentiators.length} selected</span></div><Chips items={form.differentiators} onRemove={(s) => setForm({ ...form, differentiators: form.differentiators.filter((x) => x !== s) })} onAdd={(s) => setForm({ ...form, differentiators: [...form.differentiators, s] })} addLabel="+ Add a differentiator" /></div>
                      </div>
                    </div>
                  </div>
                </details>
                <div className="st-actions" style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}><button type="button" className="st-btn st-btn-primary btn btn-primary" onClick={save}>Save changes</button></div>
              </section>
            )}
            {tab === "audience" && (
              <section id="settings-intelligence" className="settings-panel">
                <div className="card st-card rise" data-nn-entered="1">
                  <div className="st-card-hd"><span className="ic"><iconify-icon icon="ph:target" /></span><div><b>Target: ICP</b></div></div>
                  <div className="st-card-bd">
                    <div className="st-field"><div className="st-label"><span>Target industries</span><span className="st-count">{form.targetIndustries.length} selected</span></div><Chips items={form.targetIndustries} onRemove={(s) => setForm({ ...form, targetIndustries: form.targetIndustries.filter((x) => x !== s) })} onAdd={(s) => setForm({ ...form, targetIndustries: [...form.targetIndustries, s] })} addLabel="+ Add an industry" options={INDUSTRIES} /></div>
                    <div className="st-field"><div className="st-label"><span>Target regions</span><span className="st-count">{form.targetRegions.length} selected</span></div><div className="st-chips">{REGIONS.map((r) => <button key={r} type="button" className={`stg-pill${form.targetRegions.includes(r) ? " on" : ""}`} style={form.targetRegions.includes(r) ? { background: "var(--blue-soft)", color: "var(--blue-d)", borderColor: "var(--blue-border)" } : undefined} onClick={() => setForm({ ...form, targetRegions: form.targetRegions.includes(r) ? form.targetRegions.filter((x) => x !== r) : [...form.targetRegions, r] })}>{r}{form.targetRegions.includes(r) && <span className="x">×</span>}</button>)}</div></div>
                  </div>
                </div>
                <div className="card st-card rise" data-nn-entered="1" style={{ marginTop: 14 }}>
                  <div className="st-card-hd"><span className="ic"><iconify-icon icon="ph:brain" /></span><div><b>Buyer personas</b><div className="st-hint">The audiences your creators need to understand. Edit freely.</div></div></div>
                  <div className="st-card-bd" style={{ display: "grid", gap: 12 }}>
                    {form.icps.map((i, idx) => (
                      <div key={idx} className="st-surface" style={{ display: "grid", gap: 8 }}>
                        <input className="st-input" value={i.title} onChange={(e) => setForm({ ...form, icps: form.icps.map((x, k) => (k === idx ? { ...x, title: e.target.value } : x)) })} />
                        <textarea className="st-input" rows={3} value={i.description} onChange={(e) => setForm({ ...form, icps: form.icps.map((x, k) => (k === idx ? { ...x, description: e.target.value } : x)) })} />
                      </div>
                    ))}
                    <button type="button" className="st-btn st-btn-ghost" onClick={() => ctx.nav("marketplace")}>View the audience analysis</button>
                  </div>
                </div>
                <div className="st-actions" style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}><button type="button" className="st-btn st-btn-primary btn btn-primary" onClick={save}>Save changes</button></div>
              </section>
            )}
            {tab === "team" && (
              <section id="settings-team" className="settings-panel">
                <div className="card st-card rise" data-nn-entered="1">
                  <div className="st-card-hd"><span className="ic"><iconify-icon icon="ph:users-three" /></span><div><b>Team & access</b><div className="st-hint">Everyone you invite shares campaigns, messages, bookings and the company wallet.</div></div></div>
                  <div className="st-card-bd">
                    <table className="st-table"><thead><tr><th>Member</th><th>Role</th><th>Status</th><th /></tr></thead><tbody>
                      <tr><td><b>{snap.user.firstName} {snap.user.lastName}</b><div className="muted" style={{ fontSize: ".78rem" }}>{snap.user.email}</div></td><td>Owner</td><td><span className="pill st-active">Active</span></td><td /></tr>
                      {snap.team.map((m) => <tr key={m.email}><td><b>{m.email}</b></td><td style={{ textTransform: "capitalize" }}>{m.role}</td><td><span className="pill st-invited">Invited</span></td><td><button className="btn btn-ghost" style={{ height: 30, padding: "0 10px" }} onClick={() => ctx.api("team-remove", { email: m.email })}>Remove</button></td></tr>)}
                    </tbody></table>
                    <div className="st-feature-add" style={{ marginTop: 14 }}><input className="st-input" type="email" placeholder="colleague@company.com" value={invite} onChange={(e) => setInvite(e.target.value)} /><button type="button" className="st-btn btn btn-primary" onClick={async () => { const r = await ctx.api("team-invite", { email: invite }); if (r.ok) { ctx.toast("Invitation sent"); setInvite(""); } }}>Invite</button></div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
