"use client";
import { useState } from "react";
import type { Ctx } from "../BrandApp";
import type { Brief } from "@/lib/ai";
import { creatorBySlug } from "@/data/creators";
import { fmtDate, fmtEur0, initials } from "@/lib/format";
import { CollabTable, CollabPanel } from "./Collaborations";
import { CreatorCard } from "./Marketplace";
import { AnalyticsBlock } from "./Results";
import type { Booking } from "@/lib/brand-data";

const SKY = [["#C3D0F4", "#EEF1FD"], ["#F4D9C3", "#FDF3EE"], ["#C9E9D8", "#EEFBF4"], ["#E3D2F3", "#F7F0FD"]];

function BrandMark({ ctx }: { ctx: Ctx }) {
  const c = ctx.snap.company;
  return <span className="ac-card-mark ac-brand-mark" title={c.name} data-ini={initials(c.name)[0]}>{c.logo_url ? <img src={c.logo_url} alt={c.name} loading="lazy" /> : null}</span>;
}

export function BriefDoc({ brief, editable, onSave }: { brief: Brief; editable?: boolean; onSave?: (b: Brief) => void }) {
  const [edit, setEdit] = useState(false);
  const [draft, setDraft] = useState<Brief>(brief);
  if (edit) {
    const f = (k: keyof Brief, v: string) => setDraft({ ...draft, [k]: v });
    return (
      <article className="nn-brief-document card" style={{ display: "grid", gap: 14 }}>
        <label className="st-field"><span className="st-label">Campaign name</span><input className="st-input" value={draft.name} onChange={(e) => f("name", e.target.value)} /></label>
        <label className="st-field"><span className="st-label">Objective</span><textarea className="st-input" rows={2} value={draft.objective} onChange={(e) => f("objective", e.target.value)} /></label>
        <label className="st-field"><span className="st-label">Context</span><textarea className="st-input" rows={6} value={draft.context} onChange={(e) => f("context", e.target.value)} /></label>
        <label className="st-field"><span className="st-label">Tone</span><input className="st-input" value={draft.tone} onChange={(e) => f("tone", e.target.value)} /></label>
        <label className="st-field"><span className="st-label">Do (one per line)</span><textarea className="st-input" rows={3} value={draft.dos.join("\n")} onChange={(e) => setDraft({ ...draft, dos: e.target.value.split("\n").filter(Boolean) })} /></label>
        <label className="st-field"><span className="st-label">Avoid (one per line)</span><textarea className="st-input" rows={3} value={draft.donts.join("\n")} onChange={(e) => setDraft({ ...draft, donts: e.target.value.split("\n").filter(Boolean) })} /></label>
        <div style={{ display: "flex", gap: 8 }}><button className="btn btn-primary" onClick={() => { onSave?.(draft); setEdit(false); }}>Save brief</button><button className="btn btn-ghost" onClick={() => { setDraft(brief); setEdit(false); }}>Cancel</button></div>
      </article>
    );
  }
  return (
    <>
      <div className="nn-brief-heading">
        <div><h2>Campaign brief</h2><span className="nn-brief-origin">Naano AI</span></div>
        {editable && <button type="button" className="btn" onClick={() => { setDraft(brief); setEdit(true); }}><iconify-icon icon="ph:pencil-simple" />Edit the brief</button>}
      </div>
      <article className="nn-brief-document card">
        <section className="nn-brief-section"><h2>Context & objective</h2><p className="nn-brief-prose">{brief.context}</p><p className="nn-brief-prose"><b>Objective.</b> {brief.objective}</p></section>
        <section className="nn-brief-section"><h2>Audience & tone</h2><div className="nn-brief-columns"><div><h3>Audience</h3><p className="nn-brief-prose">{brief.audience}</p></div><div><h3>Tone</h3><p className="nn-brief-prose">{brief.tone}</p></div></div></section>
        <section className="nn-brief-section"><h2>Editorial rules</h2><div className="nn-brief-columns"><div><h3>Do</h3><p className="nn-brief-prose">{brief.dos.join(" ")}</p></div><div><h3>Avoid</h3><p className="nn-brief-prose">{brief.donts.join(" ")}</p></div></div></section>
        <section className="nn-brief-section"><h2>Angles & post examples</h2>
          {brief.angles.map((a, i) => (
            <article className="nn-brief-angle" key={i}><h3><span>{String(i + 1).padStart(2, "0")}</span>{a.title}</h3><blockquote>{a.description}</blockquote><p className="nn-brief-prose">{a.example}</p><details><summary>Post example</summary><p className="nn-brief-prose">{`A common challenge for ${brief.audience} is understanding where the product fits in their work. In this post, I share my perspective on that problem and explain how it changes the workflow — ${a.description.toLowerCase()}`}</p></details></article>
          ))}
        </section>
      </article>
    </>
  );
}

function CampaignDetail({ ctx, id, tab }: { ctx: Ctx; id: string; tab: string }) {
  const { snap } = ctx;
  const camp = snap.campaigns.find((c) => c.id === id);
  const [open, setOpen] = useState<Booking | null>(null);
  const [q, setQ] = useState("");
  if (!camp) return <div className="card" style={{ padding: 24 }}>Campaign not found. <button className="btn" onClick={() => ctx.nav("campaigns")}>Back to campaigns</button></div>;
  const bookings = snap.bookings.filter((b) => b.campaign_id === camp.id && (!q || (creatorBySlug(b.creator_slug)?.name ?? "").toLowerCase().includes(q.toLowerCase())));
  const committed = bookings.filter((b) => !["cancelled", "declined"].includes(b.status)).reduce((a, b) => a + (b.proposed_cents ?? b.amount_cents), 0);
  const shortlist = snap.shortlist.map((s) => creatorBySlug(s)!).filter(Boolean);
  const tabs: [string, string][] = [["pipeline", "Collaborations"], ["brief", "Brief"], ["shortlist", "Shortlist"], ["analytics", "Analytics"]];
  const brief = camp.brief;
  return (
    <div id="ci-app" aria-live="polite">
      <div className="ac-workspace-dock nn-compact-workspace">
        <header className="ac-workspace-head">
          <div className="nn-heading-with-back">
            <button type="button" className="nn-campaign-back" onClick={() => ctx.nav("campaigns")}><iconify-icon icon="ph:arrow-left" aria-hidden="true" /><span>Campaigns</span></button>
            <div className="ac-title-status"><h1>{camp.name}</h1><span className={`ac-status ${camp.status === "active" ? "live" : camp.status === "completed" ? "done" : "draft"}`}><i />{camp.status === "active" ? "Active" : camp.status === "completed" ? "Completed" : "Draft"}</span></div>
          </div>
          <div className="ac-workspace-actions">
            <label className="ac-switcher"><span>Switch campaign</span><div><iconify-icon icon="ph:arrows-left-right" /><select className="select" aria-label="Campaign" value={camp.id} onChange={(e) => ctx.nav(`campaigns/${e.target.value}/${tab}`)}>{snap.campaigns.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div></label>
            <button className="btn btn-primary ac-primary-action" onClick={() => ctx.nav("marketplace")}><iconify-icon icon="ph:user-plus" /><span>Invite a creator</span></button>
          </div>
        </header>
        <nav className="nn-workspace-tabs" role="tablist" aria-label="Campaign workspace">
          {tabs.map(([k, l]) => <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => ctx.nav(`campaigns/${camp.id}/${k}`)}>{l}</button>)}
        </nav>
      </div>
      <div className="ac-workspace-body" id="nn-workspace-body" role="tabpanel">
        {tab === "pipeline" && (
          <div id="nn-workspace-collaborations">
            <div id="nn-workspace-search" className="nn-campaign-toolbar">
              <label className="search cl2-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg><input placeholder="Search creators, campaigns…" value={q} onChange={(e) => setQ(e.target.value)} /></label>
              <div className="cl2-hero-stats" aria-label="Collaboration overview">
                <div className="cl2-stat"><span className="ic"><iconify-icon icon="ph:users-three" /></span><div><b>{bookings.length}</b><span>collaborations</span></div></div>
                <div className="cl2-stat"><span className="ic"><iconify-icon icon="ph:shield-check" /></span><div><b>{fmtEur0(committed)}</b><span>committed</span></div></div>
                <div className="cl2-stat"><span className="ic"><iconify-icon icon="ph:warning-circle" /></span><div><b>{bookings.filter((b) => b.status === "draft_review").length}</b><span>to do</span></div></div>
              </div>
            </div>
            <div className="cl2-wrap"><CollabTable ctx={ctx} bookings={bookings} onOpen={setOpen} hideCampaign /></div>
          </div>
        )}
        {tab === "brief" && brief && <BriefDoc brief={brief} editable onSave={(b) => ctx.api("campaign-update", { id: camp.id, name: b.name, status: camp.status, brief: b }).then((r) => r.ok && ctx.toast("Brief saved"))} />}
        {tab === "shortlist" && (
          <div id="nn-workspace-shortlist">
            {shortlist.length === 0 ? (
              <section className="nn-preparation-host"><div className="nn-preparation-card"><h2>Shortlist</h2><p>Save creators from the marketplace to build your shortlist.</p><button className="btn btn-ghost" type="button" onClick={() => ctx.nav("marketplace/list")}>Find creators</button></div></section>
            ) : (
              <div className="creator-grid is-list-layout"><section className="mkt-ranked-card-section"><div className="mkt-ranked-section-label"><b>Shortlist</b><span>{shortlist.length} saved creators for this campaign.</span></div><div className="mkt-ranked-card-grid">{shortlist.map((c, i) => <CreatorCard key={c.slug} c={c} ctx={ctx} index={i} selected={false} onSelect={() => {}} />)}</div></section></div>
            )}
          </div>
        )}
        {tab === "analytics" && <AnalyticsBlock ctx={ctx} campaignId={camp.id} compact />}
      </div>
      {open && <CollabPanel ctx={ctx} b={snap.bookings.find((x) => x.id === open.id) ?? open} onClose={() => setOpen(null)} />}
    </div>
  );
}

export default function Campaigns({ ctx }: { ctx: Ctx }) {
  const { snap, route } = ctx;
  const [scope, setScope] = useState<"all" | "live" | "draft" | "completed">("all");
  if (route.parts[0]) return <section className="page visible" id="page-studio" data-screen-label="Campaign workspace"><CampaignDetail ctx={ctx} id={route.parts[0]} tab={route.parts[1] || "pipeline"} /></section>;
  const list = snap.campaigns.filter((c) => scope === "all" || (scope === "live" ? c.status === "active" : c.status === scope));
  const firstReady = snap.campaigns.find((c) => c.source === "onboarding") && !snap.bookings.length;
  return (
    <section className="page visible" id="page-studio" data-screen-label="Campaign inbox">
      {firstReady && <div className="nn-first-resume"><b>Your first brief is ready</b><button className="nn-first-secondary" type="button" onClick={() => ctx.nav(`campaigns/${snap.campaigns[0]!.id}/brief`)}>See my campaign</button></div>}
      <div id="ci-app" aria-live="polite">
        <section className="nn-campaign-index-header">
          <header className="ac-index-head"><div className="nn-heading-with-back"><h1>Campaigns</h1></div><button className="btn btn-primary ac-create" onClick={() => ctx.nav("campaign-new")}><iconify-icon icon="ph:plus" />Create a campaign</button></header>
          <div className="ac-index-toolbar">
            <div className="ac-scope nn-liquid-segment" role="group" aria-label="Filters">
              {(["all", "live", "draft", "completed"] as const).map((s) => <button key={s} className={scope === s ? "on" : ""} onClick={() => setScope(s)}>{s === "all" ? "All" : s === "live" ? "Active" : s === "draft" ? "Draft" : "Completed"}</button>)}
            </div>
            <span>{list.length} campaign{list.length === 1 ? "" : "s"}</span>
          </div>
        </section>
        <div className="ac-campaign-grid">
          {list.map((c, i) => { const bk = snap.bookings.filter((b) => b.campaign_id === c.id && !["cancelled", "declined"].includes(b.status)); const [a, b] = SKY[i % SKY.length]!; return (
            <article className="ac-campaign-card" key={c.id} style={{ ["--ac-index" as string]: String(i), ["--ac-sky-a" as string]: a, ["--ac-sky-b" as string]: b, ["--ac-cloud-x" as string]: "32%", ["--ac-cloud-y" as string]: "90%" }} role="button" tabIndex={0} onClick={() => ctx.nav(`campaigns/${c.id}/pipeline`)}>
              <span className="ac-card-gloss" aria-hidden="true" />
              <span className={`ac-card-cover mkt-sky-banner mkt-sky-${(i % 6) + 1}`}><BrandMark ctx={ctx} /><span className={`ac-status ${c.status === "active" ? "live" : c.status === "completed" ? "done" : "draft"}`}><i />{c.status === "active" ? "Active" : c.status === "completed" ? "Completed" : "Draft"}</span><span className="ac-card-date">Created on {fmtDate(c.created_at)}</span></span>
              <strong>{c.name}</strong>
              <span className="ac-card-context">{c.brief?.context ?? c.objective}</span>
              <span className="ac-card-metrics"><span><b>{new Set(bk.map((x) => x.creator_slug)).size}</b><small>Creators</small></span><span><b>{bk.filter((x) => x.status === "published").length}</b><small>Published</small></span><span><b>{fmtEur0(bk.reduce((s, x) => s + (x.proposed_cents ?? x.amount_cents), 0))}</b><small>Committed budget</small></span></span>
              <span className="ac-card-foot"><span className="ac-card-people" /><span className="ac-card-actions"><span className="ac-card-primary">{"Open campaign "}<iconify-icon icon="ph:arrow-right" /></span><span className="ac-card-slash">/</span><button type="button" onClick={(e) => { e.stopPropagation(); ctx.nav(`campaigns/${c.id}/brief`); }}><iconify-icon icon="ph:file-text" />My brief</button></span></span>
            </article>
          ); })}
          <article className="ac-campaign-card ac-create-card" style={{ ["--ac-index" as string]: String(list.length) }} role="button" tabIndex={0} onClick={() => ctx.nav("campaign-new")}>
            <span className="ac-card-gloss" aria-hidden="true" />
            <span className="ac-create-cover"><BrandMark ctx={ctx} /></span>
            <strong>Create a campaign</strong>
            <span className="ac-card-context">Launch a new campaign in 2 minutes — with AI, the Naano team, or an existing link.</span>
            <span className="ac-card-metrics"><span><b>—</b><small>Creators</small></span><span><b>—</b><small>Published</small></span><span><b>—</b><small>Committed budget</small></span></span>
            <span className="ac-card-foot"><span className="ac-card-people" /><span className="ac-card-actions"><span className="ac-card-primary">{"Get started "}<iconify-icon icon="ph:arrow-right" /></span></span></span>
          </article>
        </div>
      </div>
    </section>
  );
}
