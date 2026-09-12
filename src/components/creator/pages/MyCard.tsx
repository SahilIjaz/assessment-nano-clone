"use client";
import { useEffect, useState } from "react";
import type { CCtx } from "../CreatorApp";
import CreatorCardPreview from "../CreatorCardPreview";
import { INDUSTRIES } from "@/data/creators";
import { COUNTRIES } from "@/data/countries";

export default function MyCard({ ctx }: { ctx: CCtx }) {
  const p = ctx.snap.profile;
  const [f, setF] = useState({ display_name: p.display_name ?? "", headline: p.headline ?? "", bio: p.bio ?? "", country: p.country ?? "", industries: p.industries, price: p.price_cents / 100, bundles: p.bundles.map((b) => ({ posts: b.posts, total: b.totalCents / 100 })), linkedin_url: p.linkedin_url ?? "" });
  useEffect(() => { setF({ display_name: p.display_name ?? "", headline: p.headline ?? "", bio: p.bio ?? "", country: p.country ?? "", industries: p.industries, price: p.price_cents / 100, bundles: p.bundles.map((b) => ({ posts: b.posts, total: b.totalCents / 100 })), linkedin_url: p.linkedin_url ?? "" }); }, [p]);
  const cc = COUNTRIES.find((c) => c.name === f.country);
  const preview = { ...ctx.cardData(), name: f.display_name || ctx.cardData().name, headline: f.headline, bio: f.bio, industries: f.industries, flag: cc?.flag ?? null, country: f.country, priceCents: f.price * 100, bundles: f.bundles.filter((b) => b.posts > 1 && b.total > 0).map((b) => ({ posts: b.posts, totalCents: b.total * 100 })), linkedinUrl: f.linkedin_url };
  const save = async () => { const r = await ctx.api("profile", { ...f, country_code: cc?.code }); if (r.ok) ctx.toast("Card saved"); };
  const chip = (on: boolean) => ({ padding: "4px 11px", borderRadius: 20, fontSize: ".72rem", fontWeight: 600, cursor: "pointer", border: `1px solid ${on ? "var(--blue,#1D5BF5)" : "var(--border2,#DBE0EA)"}`, background: on ? "var(--blue-soft,#EAF0FF)" : "#fff", color: on ? "var(--blue-d,#0F46D8)" : "var(--text,#0F1220)" });
  const inp = { width: "100%", border: "1px solid var(--border2,#DBE0EA)", borderRadius: 10, padding: "10px 12px", font: "inherit" } as const;
  return (
    <section className="page visible" id="page-profile" data-screen-label="My card">
      <div className="page-head"><h1>My card</h1><div className="page-sub">Your private preview and editor. Keep your positioning, packs and price clear before sharing your card.</div></div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(320px,520px)", gap: 22, alignItems: "start" }} className="cr-card-layout">
        <div style={{ display: "grid", gap: 14 }}>
          <div className="card" style={{ padding: 20 }}>
            <h2 style={{ margin: "0 0 2px" }}>Positioning</h2><div className="muted" style={{ fontSize: ".86rem", marginBottom: 14 }}>What brands read first on your card.</div>
            <label className="settings-label">Display name</label><input style={inp} value={f.display_name} onChange={(e) => setF({ ...f, display_name: e.target.value })} />
            <label className="settings-label" style={{ marginTop: 12 }}>Headline</label><input style={inp} placeholder="e.g. Sales leader turned creator · B2B & AI" value={f.headline} onChange={(e) => setF({ ...f, headline: e.target.value })} />
            <label className="settings-label" style={{ marginTop: 12 }}>About</label><textarea style={{ ...inp, minHeight: 90 }} placeholder="Who you write for and what your audience gets from you." value={f.bio} onChange={(e) => setF({ ...f, bio: e.target.value })} />
            <label className="settings-label" style={{ marginTop: 12 }}>Country</label><select className="select" style={{ ...inp }} value={f.country} onChange={(e) => setF({ ...f, country: e.target.value })}><option value="">Select your country</option>{COUNTRIES.map((c) => <option key={c.code} value={c.name}>{c.name}</option>)}</select>
            <label className="settings-label" style={{ marginTop: 12 }}>Industries <span className="muted">(up to 3)</span></label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{INDUSTRIES.map((i) => <button key={i} type="button" style={chip(f.industries.includes(i))} disabled={!f.industries.includes(i) && f.industries.length >= 3} onClick={() => setF({ ...f, industries: f.industries.includes(i) ? f.industries.filter((x) => x !== i) : [...f.industries, i] })}>{i}</button>)}</div>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <h2 style={{ margin: "0 0 2px" }}>Your price per post (net to you)</h2><div className="muted" style={{ fontSize: ".86rem", marginBottom: 12 }}>Set your net price per post. Brands pay this amount plus Naano's fee.</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span>€</span><input type="number" min={20} step={10} style={{ ...inp, width: 150 }} value={f.price} onChange={(e) => setF({ ...f, price: Number(e.target.value) })} /><span className="muted">/ post</span></div>
            <h3 style={{ margin: "18px 0 2px", fontSize: "1rem" }}>Bundles (optional)</h3><div className="muted" style={{ fontSize: ".84rem", marginBottom: 10 }}>Total net price for several posts.</div>
            {f.bundles.map((b, i) => <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, marginBottom: 8, alignItems: "center" }}><input type="number" min={2} style={inp} value={b.posts} onChange={(e) => setF({ ...f, bundles: f.bundles.map((x, k) => (k === i ? { ...x, posts: Number(e.target.value) } : x)) })} /><input type="number" min={10} style={inp} value={b.total} onChange={(e) => setF({ ...f, bundles: f.bundles.map((x, k) => (k === i ? { ...x, total: Number(e.target.value) } : x)) })} /><button className="btn btn-ghost" onClick={() => setF({ ...f, bundles: f.bundles.filter((_, k) => k !== i) })}>Remove</button></div>)}
            <button className="btn btn-ghost" onClick={() => setF({ ...f, bundles: [...f.bundles, { posts: 5, total: Math.round(f.price * 5 * 0.85) }] })}>+ Add a bundle</button>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <h2 style={{ margin: "0 0 2px" }}>Public profile link</h2><div className="muted" style={{ fontSize: ".86rem", marginBottom: 12 }}>Your public card lives at <a href={`/creators/${p.slug}`} target="_blank" rel="noopener">/creators/{p.slug}</a>.</div>
            <label className="settings-label">LinkedIn</label><input style={inp} placeholder="https://www.linkedin.com/in/you" value={f.linkedin_url} onChange={(e) => setF({ ...f, linkedin_url: e.target.value })} />
          </div>
          <div className="settings-actions"><button className="btn btn-primary" onClick={save}>Save my card</button></div>
        </div>
        <div style={{ position: "sticky", top: 20 }}><CreatorCardPreview d={preview} /></div>
      </div>
    </section>
  );
}
