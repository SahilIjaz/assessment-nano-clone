"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Ctx } from "../BrandApp";
import { CREATORS, INDUSTRIES, MARKETPLACE_TOTAL, creatorBySlug, type Creator } from "@/data/creators";
import { rankCreators } from "@/lib/ai";
import { CreatorAvatar } from "../Avatar";
import { fmtK } from "@/lib/format";

const LI_PATH = "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z";
export const LinkedInIcon = () => (<span className="mkt-linkedin-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={LI_PATH} /></svg></span>);
const euro = (c: number) => "€" + Math.round(c / 100).toLocaleString("en-US");

type Sort = "rel" | "price" | "fol" | "eng";
const SORTS: [Sort, string][] = [["rel", "Best match"], ["price", "Price: low to high"], ["fol", "Most followers"], ["eng", "Best engagement"]];

export function CreatorCard({ c, ctx, index, selected, onSelect }: { c: Creator; ctx: Ctx; index: number; selected: boolean; onSelect: () => void }) {
  const saved = ctx.shortlisted(c.slug);
  return (
    <article className="card mkt-creator-card" data-creator-id={c.slug} style={{ ["--mkt-card-index" as string]: String(index) }} aria-labelledby={`mkt-creator-${c.slug}-name`}>
      <div className="mkt-card-flipper">
        <section className="mkt-card-face mkt-card-front">
          <div className="mkt-card-cover" style={{ backgroundImage: "linear-gradient(180deg,rgba(231,245,255,.08),rgba(220,239,252,.18)),url('/lp/brand-overview-clouds.jpg')" }}>
            <div className="mkt-card-cover-left">
              <button type="button" className={`mkt-card-bulk-check${selected ? " is-on" : ""}`} aria-label={`Add to selection · ${c.name}`} title={`Add to selection · ${c.name}`} aria-pressed={selected} onClick={onSelect}>
                <svg viewBox="0 0 20 20" aria-hidden="true"><rect className="mkt-check-box" x="3.2" y="3.2" width="13.6" height="13.6" rx="3.4" /><path className="mkt-check-mark" d="M6.1 10.2l2.5 2.5 5.3-5.5" /></svg>
              </button>
              <a className="mkt-card-top-icon mkt-card-linkedin-top" href={`/creators/${c.slug}`} target="_blank" rel="noopener" aria-label="Open the creator profile" title="Open the public creator profile"><LinkedInIcon /></a>
            </div>
            <div className="mkt-card-cover-actions">
              <button type="button" className={`mkt-card-top-icon mkt-card-save mkt-card-save-top ${saved ? "is-saved" : ""}`} aria-label={saved ? "Remove from my list" : "Save to my list"} title="Save to my list" aria-pressed={saved} onClick={() => ctx.toggleShortlist(c.slug)}>
                <svg viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3z" /></svg>
              </button>
              <button type="button" className="mkt-card-add" aria-label="Invite creator" onClick={() => ctx.openBooking(c.slug)}>Book</button>
            </div>
            <button type="button" className="mkt-avatar-ring" aria-label={`See details · ${c.name}`} onClick={() => ctx.openCreator(c.slug)}>
              <CreatorAvatar name={c.name} />
            </button>
          </div>
          <div className="mkt-profile-copy">
            <h3 id={`mkt-creator-${c.slug}-name`} title={c.name}>{c.name}</h3>
            <div className="mkt-card-role" title={`${c.industries.slice(0, 2).join(" · ")} · ${c.country}`}>
              <span>{c.industries.slice(0, 2).join(" · ")}</span>
              <span className="mkt-card-country-flag" role="img" aria-label={c.country}>{c.flag}</span>
            </div>
            <div className="mkt-card-bio" title={c.headline}>{c.headline}</div>
          </div>
          <div className="mkt-card-stats has-cpm" title="Stats updated 3 d ago">
            <div className="mkt-card-stat"><b>{fmtK(c.followers)}</b><span>Followers</span></div>
            <div className="mkt-card-stat"><b>{fmtK(c.medianViews)}</b><span>Median views</span></div>
            <div className="mkt-card-stat"><b>{euro(c.cpmCents)}</b><span>CPM</span></div>
            <div className="mkt-card-stat"><b>{euro(c.priceCents)}</b><span>Post cost</span></div>
          </div>
          <button type="button" className="mkt-card-analysis" onClick={() => ctx.openCreator(c.slug)}>
            <iconify-icon icon="ph:user-circle" aria-hidden="true" /><span>View profile</span><iconify-icon icon="ph:arrow-right" aria-hidden="true" />
          </button>
        </section>
      </div>
    </article>
  );
}

function FilterPop({ id, label, icon, open, onToggle, children, count }: { id: string; label: string; icon: string; open: boolean; onToggle: () => void; children: React.ReactNode; count?: number }) {
  return (
    <div className={`mkt-filter-wrap${open ? " is-open" : ""}`} id={`${id}-wrap`}>
      <button type="button" className={`mkt-filter-trigger${count ? " has-value" : ""}`} aria-controls={`${id}-pop`} aria-haspopup="listbox" aria-expanded={open} onClick={onToggle}>
        <iconify-icon icon={icon} aria-hidden="true" />
        <span className="mkt-filter-label">{label}{count ? ` · ${count}` : ""}</span>
        <iconify-icon className="mkt-filter-chev" icon="ph:caret-down" aria-hidden="true" />
      </button>
      <div className={`mkt-filter-pop${open ? " is-open" : ""}`} id={`${id}-pop`} style={open ? { display: "block" } : undefined}>{children}</div>
    </div>
  );
}

export default function Marketplace({ ctx, welcome, onWelcomeDone }: { ctx: Ctx; welcome: boolean; onWelcomeDone: () => void }) {
  const { snap, route } = ctx;
  const [experience, setExperience] = useState<"ai" | "marketplace">(route.parts[0] === "list" ? "marketplace" : "ai");
  const [tab, setTab] = useState<"all" | "saved">("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("rel");
  const [sortOpen, setSortOpen] = useState(false);
  const [pop, setPop] = useState<string | null>(null);
  const [inds, setInds] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number]>([0, 5000]);
  const [adv, setAdv] = useState({ cpm: "", views: "", minFol: "", maxFol: "", eng: "" });
  const [indQ, setIndQ] = useState(""); const [ctryQ, setCtryQ] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [coach, setCoach] = useState(welcome);
  const [showAll, setShowAll] = useState(false);
  // Nao
  const [prompt, setPrompt] = useState("");
  const [thinking, setThinking] = useState(false);
  const [result, setResult] = useState<{ prompt: string; intro: string; summary: string; picks: { slug: string; reason: string }[] } | null>(null);
  const [naoOpen, setNaoOpen] = useState(true);
  const firstCampaign = snap.campaigns[0];

  useEffect(() => { if (welcome && firstCampaign) setPrompt(`Find 4 creators for ${firstCampaign.name}. Use my campaign brief and prioritize strong audience and content fit.`); }, [welcome, firstCampaign]);
  useEffect(() => { const h = (e: MouseEvent) => { if (!(e.target as HTMLElement).closest(".mkt-filter-wrap, .mkt-sort-wrap")) { setPop(null); setSortOpen(false); } }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, []);

  const ranked = useMemo(() => rankCreators("", { industries: snap.company.targetIndustries, icps: snap.company.icps, valueProp: snap.company.value_prop }), [snap.company]);
  const filtered = useMemo(() => {
    let list = ranked.filter((c) => {
      if (tab === "saved" && !snap.shortlist.includes(c.slug)) return false;
      if (q && !`${c.name} ${c.headline} ${c.industries.join(" ")}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (inds.length && !c.industries.some((i) => inds.includes(i))) return false;
      if (countries.length && !countries.includes(c.country)) return false;
      const p = c.priceCents / 100; if (p < price[0] || (price[1] < 5000 && p > price[1])) return false;
      if (adv.cpm && c.cpmCents / 100 > Number(adv.cpm)) return false;
      if (adv.views && c.medianViews < Number(adv.views)) return false;
      if (adv.minFol && c.followers < Number(adv.minFol)) return false;
      if (adv.maxFol && c.followers > Number(adv.maxFol)) return false;
      if (adv.eng && c.engagement < Number(adv.eng)) return false;
      return true;
    });
    if (sort === "price") list = [...list].sort((a, b) => a.priceCents - b.priceCents);
    if (sort === "fol") list = [...list].sort((a, b) => b.followers - a.followers);
    if (sort === "eng") list = [...list].sort((a, b) => b.engagement - a.engagement);
    return list;
  }, [ranked, tab, q, inds, countries, price, adv, sort, snap.shortlist]);
  const isFiltered = !!(q || inds.length || countries.length || price[0] > 0 || price[1] < 5000 || Object.values(adv).some(Boolean));
  const totalLabel = isFiltered || tab === "saved" ? filtered.length : MARKETPLACE_TOTAL;
  const top = filtered.slice(0, 40); const rest = filtered.slice(40);
  const countryList = useMemo(() => Array.from(new Set(CREATORS.map((c) => c.country))).sort(), []);

  const runNao = async (text: string) => {
    const p = text.trim(); if (!p || thinking) return;
    setThinking(true); setResult(null); setPrompt(p);
    const r = await ctx.api("nao", { prompt: p, count: /\b(\d+)\s+creators?/i.test(p) ? Number(p.match(/\b(\d+)\s+creators?/i)![1]) : 4 });
    setThinking(false);
    if (r.ok) setResult(r.search as typeof result);
  };
  const reset = () => { setQ(""); setInds([]); setCountries([]); setPrice([0, 5000]); setAdv({ cpm: "", views: "", minFol: "", maxFol: "", eng: "" }); setSort("rel"); };
  const toggleSel = (slug: string) => setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]));
  const inviteSelection = async () => { for (const slug of selected) await ctx.api("book", { slug, kind: "single", campaignId: firstCampaign?.id }); ctx.toast(`${selected.length} invitation${selected.length > 1 ? "s" : ""} sent`); setSelected([]); ctx.nav("collaborations"); };

  const starters = [
    `Find creators who already reach ${snap.company.icps[0]?.title || "your buyers"}`,
    `Find creators with credible content about ${snap.company.targetIndustries[0] || "B2B"}`,
    `Build a shortlist for this campaign angle: ${(snap.company.value_prop || snap.company.name).slice(0, 90)}`,
    `Build a balanced creator shortlist for ${snap.company.name}`,
  ];

  return (
    <section className={`page visible${result ? " has-ai-results" : ""}`} id="page-marketplace" data-experience={experience}>
      <div className="page-head mkt-page-head">
        <div className="mkt-page-heading-copy">
          <h1 id="mkt-page-title">{experience === "ai" ? "AI creator matching" : tab === "saved" ? "Shortlist" : "All creators"}</h1>
          <svg className="ink-line" viewBox="0 0 120 12" aria-hidden="true"><path d="M3 7C26 2 46 10 68 6S104 4 117 6" /></svg>
          <div className="page-sub" id="mkt-page-sub">{experience === "ai" ? "Tell Nao who you want to reach. It turns your request into a comparable creator shortlist." : "All creators are shown from most to least relevant, using sector fit first and verified performance statistics to refine the order."}</div>
        </div>
        <div className="mkt-experience-switch" id="mkt-experience-switch" role="tablist" aria-label="Creator discovery mode" data-active={experience}>
          <span className="mkt-experience-thumb" aria-hidden="true" style={{ transform: experience === "ai" ? "translateX(0)" : "translateX(100%)" }} />
          <button type="button" className={experience === "ai" ? "is-active" : ""} data-experience="ai" role="tab" aria-selected={experience === "ai"} onClick={() => setExperience("ai")}>
            <span className="mkt-experience-nao-mark" aria-hidden="true"><img src="/logo.svg" alt="" /></span><span>AI Matching</span>
          </button>
          <button type="button" className={experience === "marketplace" ? "is-active" : ""} data-experience="marketplace" role="tab" aria-selected={experience === "marketplace"} onClick={() => setExperience("marketplace")}>
            <iconify-icon icon="ph:users-three" aria-hidden="true" /><span>Creator Marketplace</span>
          </button>
        </div>
      </div>

      {experience === "marketplace" && (
        <>
          <div className="mkt-toolbar" id="mkt-toolbar">
            <div className="mkt-mode is-ready" id="mkt-mode" role="tablist" aria-label="Marketplace views">
              <span className="mkt-mode-thumb" aria-hidden="true" style={{ width: tab === "all" ? "116px" : "104px", transform: tab === "all" ? "translate3d(0,0,0)" : "translate3d(118px,0,0)" }} />
              <button type="button" className={tab === "all" ? "on" : ""} data-m="all" role="tab" aria-selected={tab === "all"} onClick={() => setTab("all")}><span>All creators</span> <span className="ct" id="mkt-all-count">{MARKETPLACE_TOTAL}</span></button>
              <button type="button" className={tab === "saved" ? "on" : ""} data-m="saved" role="tab" aria-selected={tab === "saved"} onClick={() => setTab("saved")}><span>Shortlist</span> <span className="ct" id="saved-count">{snap.shortlist.length}</span></button>
            </div>
            <div className="mkt-ranking-note" id="mkt-ranking-note">
              <iconify-icon icon="ph:list-numbers" aria-hidden="true" />
              <span><b>Ranked for your company</b><small>All creators are shown from most to least relevant, using sector fit first and verified performance statistics to refine the order.</small></span>
            </div>
          </div>
          <div className="mkt-sticky-search" id="mkt-sticky-search">
            <section className="mkt-filter-panel" id="mkt-filter-panel" aria-label="Creator filters">
              <div className="mkt-filter-primary">
                <label className="mkt-search-premium" id="mkt-search-control">
                  <iconify-icon icon="ph:magnifying-glass" aria-hidden="true" />
                  <input id="mkt-search" type="search" autoComplete="off" placeholder="Search for a creator…" value={q} onChange={(e) => setQ(e.target.value)} />
                  {q && <button type="button" className="mkt-search-clear" aria-label="Clear search" onClick={() => setQ("")}><iconify-icon icon="ph:x" aria-hidden="true" /></button>}
                </label>
                <div className={`mkt-sort-wrap${sortOpen ? " is-open" : ""}`} id="mkt-sort-wrap">
                  <button type="button" className="mkt-sort-button" id="mkt-sort-btn" aria-haspopup="listbox" aria-expanded={sortOpen} onClick={() => setSortOpen((v) => !v)}>
                    <span className="mkt-sort-copy"><small>Sort by</small><span className="mkt-sort-value">{SORTS.find((s) => s[0] === sort)![1]}</span></span>
                    <span className="mkt-sort-caret" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="m5 8 5 5 5-5" /></svg></span>
                  </button>
                  <div className={`mkt-filter-pop mkt-sort-pop align-right${sortOpen ? " is-open" : ""}`} id="mkt-sort-pop" role="listbox" style={sortOpen ? { display: "block" } : undefined}>
                    {SORTS.map(([k, l]) => (
                      <button key={k} type="button" className={`mkt-sort-option${sort === k ? " is-selected" : ""}`} role="option" aria-selected={sort === k} onClick={() => { setSort(k); setSortOpen(false); }}>
                        <span>{l}</span><span className="mkt-sort-check" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="m3 8 3 3 7-7" /></svg></span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mkt-filter-secondary">
                <FilterPop id="mkt-industry" label="Industry" icon="ph:buildings" open={pop === "industry"} onToggle={() => setPop(pop === "industry" ? null : "industry")} count={inds.length}>
                  <label className="mkt-filter-pop-search"><iconify-icon icon="ph:magnifying-glass" aria-hidden="true" /><input placeholder="Search an industry…" value={indQ} onChange={(e) => setIndQ(e.target.value)} /></label>
                  <div className="mkt-filter-options" role="listbox">
                    {INDUSTRIES.filter((i) => i.toLowerCase().includes(indQ.toLowerCase())).map((i) => (
                      <label className="mkt-filter-option" key={i}><input type="checkbox" checked={inds.includes(i)} onChange={() => setInds((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]))} /><span>{i}</span></label>
                    ))}
                  </div>
                </FilterPop>
                <FilterPop id="mkt-country" label="Country" icon="ph:globe-simple" open={pop === "country"} onToggle={() => setPop(pop === "country" ? null : "country")} count={countries.length}>
                  <label className="mkt-filter-pop-search"><iconify-icon icon="ph:magnifying-glass" aria-hidden="true" /><input placeholder="Search a country…" value={ctryQ} onChange={(e) => setCtryQ(e.target.value)} /></label>
                  <div className="mkt-filter-options" role="listbox">
                    {countryList.filter((i) => i.toLowerCase().includes(ctryQ.toLowerCase())).map((i) => (
                      <label className="mkt-filter-option" key={i}><input type="checkbox" checked={countries.includes(i)} onChange={() => setCountries((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]))} /><span className="mkt-filter-option-flag">{CREATORS.find((c) => c.country === i)?.flag}</span><span>{i}</span></label>
                    ))}
                  </div>
                </FilterPop>
                <FilterPop id="mkt-price" label="Price" icon="ph:currency-eur" open={pop === "price"} onToggle={() => setPop(pop === "price" ? null : "price")} count={price[0] > 0 || price[1] < 5000 ? 1 : 0}>
                  <div className="mkt-price-pop-body" style={{ padding: 12, minWidth: 260 }}>
                    <div className="mkt-price-range" style={{ display: "grid", gap: 8 }}>
                      <input type="range" min={0} max={5000} step={50} value={price[0]} onChange={(e) => setPrice([Math.min(Number(e.target.value), price[1]), price[1]])} />
                      <input type="range" min={0} max={5000} step={50} value={price[1]} onChange={(e) => setPrice([price[0], Math.max(Number(e.target.value), price[0])])} />
                    </div>
                    <div className="mkt-price-inputs" style={{ display: "flex", gap: 10, marginTop: 10 }}>
                      <label style={{ flex: 1 }}><small className="muted">Minimum €</small><input className="mkt-advanced-input" type="number" placeholder="Min" value={price[0] || ""} onChange={(e) => setPrice([Number(e.target.value || 0), price[1]])} /></label>
                      <label style={{ flex: 1 }}><small className="muted">Maximum €+</small><input className="mkt-advanced-input" type="number" placeholder="Max" value={price[1] < 5000 ? price[1] : ""} onChange={(e) => setPrice([price[0], Number(e.target.value || 5000)])} /></label>
                    </div>
                    <div className="mkt-price-actions"><button type="button" className="mkt-price-clear" onClick={() => setPrice([0, 5000])}>Clear</button><button type="button" className="mkt-price-apply" onClick={() => setPop(null)}>Show {filtered.length} creators</button></div>
                  </div>
                </FilterPop>
                <FilterPop id="mkt-advanced" label="Filters" icon="ph:sliders-horizontal" open={pop === "adv"} onToggle={() => setPop(pop === "adv" ? null : "adv")} count={Object.values(adv).filter(Boolean).length}>
                  <div className="mkt-advanced-body" style={{ padding: 12, minWidth: 300, display: "grid", gap: 10 }}>
                    {([["cpm", "Maximum CPM", "€"], ["views", "Minimum median views", "views"], ["minFol", "Minimum followers", ""], ["maxFol", "Maximum followers", ""], ["eng", "Minimum engagement", "%"]] as const).map(([k, l, unit]) => (
                      <label key={k} className="mkt-advanced-field"><span>{l}{unit ? ` ${unit}` : ""}</span><input className="mkt-advanced-input" type="number" placeholder="Any" value={adv[k]} onChange={(e) => setAdv({ ...adv, [k]: e.target.value })} /></label>
                    ))}
                    <div className="mkt-advanced-unknown">Creators with unavailable performance data remain visible.</div>
                    <div className="mkt-price-actions"><button type="button" className="mkt-price-clear" onClick={() => setAdv({ cpm: "", views: "", minFol: "", maxFol: "", eng: "" })}>Clear</button><button type="button" className="mkt-price-apply" onClick={() => setPop(null)}>Apply filters</button></div>
                  </div>
                </FilterPop>
                <div className="mkt-filter-meta">
                  <span><b id="mkt-filter-count">{totalLabel}</b> <span>creators</span></span>
                  <button type="button" className={`mkt-filter-reset${isFiltered || sort !== "rel" ? " show" : ""}`} id="mkt-filter-reset" onClick={reset}><iconify-icon icon="ph:arrow-counter-clockwise" aria-hidden="true" /><span>Reset</span></button>
                </div>
              </div>
            </section>
          </div>
        </>
      )}

      <div className="mkt-workspace" id="mkt-workspace">
        {experience === "marketplace" ? (
          <main className="mkt-results">
            <div className="creator-grid is-list-layout" id="creator-grid">
              {filtered.length === 0 ? (
                <div className="card" style={{ padding: 32, textAlign: "center" }}><b>{tab === "saved" ? "Your shortlist is empty." : "No creator matches these filters."}</b><p className="muted" style={{ margin: "6px 0 14px" }}>{tab === "saved" ? "Save creators with the star on any card to compare them here." : "Try widening your filters or resetting them."}</p>{tab === "saved" ? <button className="btn btn-primary" onClick={() => setTab("all")}>Browse all creators</button> : <button className="btn" onClick={reset}>Reset filters</button>}</div>
              ) : (
                <>
                  <section className="mkt-ranked-card-section">
                    <div className="mkt-ranked-section-label"><b>{tab === "saved" ? "Your shortlist" : "Top ranked creators"}</b><span>{tab === "saved" ? `${filtered.length} saved creators, ready to invite.` : "The 40 strongest profiles according to your sector and performance signals."}</span></div>
                    <div className="mkt-ranked-card-grid">
                      {top.map((c, i) => <CreatorCard key={c.slug} c={c} ctx={ctx} index={i} selected={selected.includes(c.slug)} onSelect={() => toggleSel(c.slug)} />)}
                    </div>
                  </section>
                  {rest.length > 0 && (
                    <section className="mkt-ranked-card-section">
                      <div className="mkt-ranked-section-label"><b>More creators</b><span>{rest.length} additional profiles ranked by fit.</span></div>
                      {showAll ? <div className="mkt-ranked-card-grid">{rest.map((c, i) => <CreatorCard key={c.slug} c={c} ctx={ctx} index={i} selected={selected.includes(c.slug)} onSelect={() => toggleSel(c.slug)} />)}</div> : <button className="btn" onClick={() => setShowAll(true)}>Show {rest.length} more creators</button>}
                    </section>
                  )}
                </>
              )}
            </div>
          </main>
        ) : (
          <NaoPanel ctx={ctx} prompt={prompt} setPrompt={setPrompt} thinking={thinking} result={result} onRun={runNao} starters={starters} coach={coach} onCoachDone={() => { setCoach(false); onWelcomeDone(); }} open={naoOpen} setOpen={setNaoOpen} onNew={() => { setResult(null); setPrompt(""); }} recent={snap.searches[0]} />
        )}
      </div>

      <div className={`mkt-bulk-bar${selected.length ? " is-visible" : ""}`} id="mkt-bulk-bar" role="region" aria-live="polite" aria-label="Selected creators" style={selected.length ? { display: "flex" } : { display: "none" }}>
        <div className="mkt-bulk-bar-avatars" id="mkt-bulk-avatars">{selected.slice(0, 4).map((s) => <CreatorAvatar key={s} name={creatorBySlug(s)!.name} className="mkt-bulk-avatar nn-avatar-initials" size={28} />)}</div>
        <div className="mkt-bulk-summary"><b id="mkt-bulk-count">{selected.length} creator{selected.length > 1 ? "s" : ""} selected</b><span>Invite them to one campaign in a single action.</span></div>
        <div className="mkt-bulk-actions"><button type="button" className="mkt-bulk-cancel" onClick={() => setSelected([])}>Cancel</button><button type="button" className="mkt-bulk-submit" id="mkt-bulk-submit" disabled={!selected.length} onClick={inviteSelection}>Invite selection</button></div>
      </div>
    </section>
  );
}

function NaoPanel({ ctx, prompt, setPrompt, thinking, result, onRun, starters, coach, onCoachDone, onNew, recent }: { ctx: Ctx; prompt: string; setPrompt: (s: string) => void; thinking: boolean; result: { prompt: string; intro: string; summary: string; picks: { slug: string; reason: string }[] } | null; onRun: (s: string) => void; starters: string[]; coach: boolean; onCoachDone: () => void; open: boolean; setOpen: (v: boolean) => void; onNew: () => void; recent?: { prompt: string; created_at: string } }) {
  const ta = useRef<HTMLTextAreaElement>(null);
  const [stage, setStage] = useState(0);
  useEffect(() => { if (!thinking) { setStage(0); return; } const t = setInterval(() => setStage((s) => Math.min(s + 1, 3)), 1400); return () => clearInterval(t); }, [thinking]);
  const stages = ["Reading your brief and ICP…", "Scanning the creator catalogue…", "Checking content evidence…", "Ranking by fit, performance and cost…"];
  const faces = (cls: string) => (
    <span className={`${cls} mkt-nao-face-stack`} aria-hidden="true">
      <img className="mkt-lya-face-idle mkt-nao-face-neutral" src="/lp/lya-cloud-mascot-v1.png" alt="" />
      <img className="mkt-lya-face-thinking mkt-nao-face-thinking" src="/lp/lya-cloud-mascot-thinking-v1.png" alt="" />
      <img className="mkt-lya-face-happy mkt-nao-face-happy" src="/lp/lya-cloud-mascot-happy-v1.png" alt="" />
      <img className="mkt-lya-face-surprised mkt-nao-face-surprised" src="/lp/lya-cloud-mascot-surprised-v1.png" alt="" />
      <img className="mkt-lya-face-wink mkt-nao-face-wink" src="/lp/lya-cloud-mascot-wink-v1.png" alt="" />
    </span>
  );
  return (
    <aside className={`mkt-agent has-welcome${result ? " has-history has-result has-selection-result" : ""}${thinking ? " is-thinking" : ""}`} id="mkt-agent" data-enabled="true" aria-label="Nao" aria-expanded="true" data-nao-emotion={thinking ? "thinking" : result ? "happy" : "neutral"}>
      <div className="mkt-agent-panel">
        {coach && (
          <div className="mkt-coachmark" role="dialog" style={{ position: "absolute", left: 24, top: 92, zIndex: 20, width: 330, background: "#fff", borderRadius: 18, boxShadow: "0 18px 50px rgba(15,18,32,.18)", padding: "16px 18px" }}>
            <b style={{ display: "block", fontSize: "1rem" }}>Nao is using your campaign brief</b>
            <p className="muted" style={{ margin: "6px 0 12px", fontSize: ".84rem" }}>Your starter brief is attached. Tell Nao what matters most, open profiles, and save the creators you want to invite.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", alignItems: "center" }}><button className="btn btn-primary" style={{ background: "#0F1220" }} onClick={onCoachDone}>Got it</button><button className="btn btn-ghost" onClick={() => { onCoachDone(); ctx.nav("campaigns"); }}>Back to campaign</button></div>
          </div>
        )}
        <div className="mkt-lya-hero" id="mkt-lya-hero" style={result || thinking ? { display: "none" } : undefined}>
          <div className="mkt-lya-orb" aria-hidden="true"><span className="mkt-lya-orb-halo" /><span className="mkt-lya-orb-ring" />{faces("mkt-lya-orb-core")}</div>
          <small>Nao · Creator intelligence</small>
          <h2 id="mkt-lya-greeting">Hey {ctx.snap.company.name}, let’s find the right creators for you.</h2>
          <p>Describe the audience, geography, creative direction or budget. Nao turns your request into a comparable creator shortlist.</p>
        </div>
        <div className="mkt-agent-scroll">
          <div className="mkt-agent-welcome" id="mkt-agent-welcome">
            {(thinking || result) && (
              <div className="mkt-agent-history" id="mkt-agent-history">
                <div className="mkt-agent-history-turn is-user is-current"><span>{result?.prompt || prompt}</span></div>
                {thinking && (
                  <div className="mkt-lya-thinking-label" role="status" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0" }}>
                    {faces("mkt-lya-selection-intro-visual")}
                    <div><b style={{ display: "block" }}>Nao is thinking…</b><span className="muted" style={{ fontSize: ".85rem" }}>{stages[stage]}</span></div>
                  </div>
                )}
                {result && (
                  <section className="mkt-agent-turn-selection" data-selection-turn="1">
                    <div className="mkt-lya-selection-intro">
                      {faces("mkt-lya-selection-intro-visual")}
                      <div className="mkt-nao-message-content"><p>{result.intro}</p><p>{result.summary}</p></div>
                    </div>
                    <div className="mkt-lya-results-inline">
                      {result.picks.map((p, i) => { const c = creatorBySlug(p.slug); if (!c) return null; const saved = ctx.shortlisted(c.slug); return (
                        <article className="mkt-lya-result-row" key={p.slug} style={{ ["--mkt-card-index" as string]: String(i) }}>
                          <span className="mkt-lya-result-rank" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                          <a className="mkt-lya-result-profile" href={`/creators/${c.slug}`} target="_blank" rel="noopener noreferrer" aria-label={`Open the creator profile · ${c.name}`}>
                            <span className="mkt-lya-result-avatar"><CreatorAvatar name={c.name} className="mkt-lya-result-avatar-initials nn-avatar-initials" size={44} /></span>
                            <span className="mkt-lya-result-identity"><b><span className="mkt-lya-result-name">{c.name}</span><LinkedInIcon /></b><span>{c.industries.slice(0, 2).join(" · ")} · {c.flag}</span><small className="is-adjacent" title={p.reason}>{p.reason.length > 60 ? p.reason.slice(0, 57) + "…" : p.reason}</small></span>
                          </a>
                          <span className="mkt-lya-result-metric"><b>{fmtK(c.medianViews)}</b><small>Median views</small></span>
                          <span className="mkt-lya-result-metric"><b>{euro(c.cpmCents)}</b><small>CPM</small></span>
                          <span className="mkt-lya-result-metric"><b>{euro(c.priceCents)}</b><small>Post cost</small></span>
                          <span className="mkt-lya-result-actions">
                            <button type="button" className="mkt-lya-result-book" onClick={() => ctx.openBooking(c.slug)}>Book</button>
                            <button type="button" className={`mkt-lya-result-save ${saved ? "is-saved" : ""}`} aria-label="Save to my list" aria-pressed={saved} onClick={() => ctx.toggleShortlist(c.slug)}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5.5 3.5h9v13L10 14l-4.5 2.5z" fill={saved ? "currentColor" : "none"} /></svg></button>
                            <button type="button" className="mkt-lya-result-open" aria-label={`See details · ${c.name}`} onClick={() => ctx.openCreator(c.slug)}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" /></svg></button>
                          </span>
                        </article>
                      ); })}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
          <form className="mkt-agent-command" onSubmit={(e) => { e.preventDefault(); onRun(prompt); }}>
            {result && <div className="mkt-lya-command-head"><button type="button" className="mkt-lya-new-research" aria-label="New research" onClick={onNew}><iconify-icon icon="ph:arrow-counter-clockwise" aria-hidden="true" /><span>New research</span></button></div>}
            <div className="mkt-agent-command-main">
              <span className="mkt-agent-logo"><img src="/logo.svg" alt="" aria-hidden="true" /></span>
              <textarea id="mkt-agent-input" ref={ta} rows={1} maxLength={500} autoComplete="off" aria-label="Ask Nao a question, or find creators…" placeholder="Tell Nao who you're looking for…" value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onRun(prompt); } }} />
              <button type="submit" className="mkt-agent-send" aria-label="Apply request" aria-busy={thinking} disabled={thinking}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 16V4M5.5 8.5 10 4l4.5 4.5" /></svg></button>
            </div>
            <div className="mkt-lya-composer-meta"><span>Nao can make mistakes. Check important information.</span></div>
          </form>
          {!result && !thinking && (
            <div className="mkt-lya-starters" id="mkt-lya-starters">
              <small>Suggested for you</small>
              <div>{starters.map((s) => <button type="button" key={s} data-query={s} onClick={() => onRun(s)}>{s}</button>)}</div>
            </div>
          )}
          {!result && !thinking && recent && (
            <button type="button" className="mkt-lya-recent" id="mkt-lya-recent" onClick={() => onRun(recent.prompt)}>
              <iconify-icon icon="ph:clock-counter-clockwise" aria-hidden="true" />
              <span><b>{recent.prompt}</b><small>Recent search</small></span>
              <iconify-icon icon="ph:arrow-up-right" aria-hidden="true" />
            </button>
          )}
      </div>
    </aside>
  );
}
