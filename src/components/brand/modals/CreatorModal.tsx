"use client";
import { useState } from "react";
import type { Ctx } from "../BrandApp";
import type { Creator } from "@/data/creators";
import { CreatorAvatar } from "../Avatar";
import { fmtK, initials } from "@/lib/format";

function Stack({ title, data }: { title: string; data: [string, number][] }) {
  return (
    <section className="nn-audience-stack">
      <h4>{title}</h4>
      <div className="nn-audience-stack-bar" role="img" aria-label={`${title}: ${data.map(([k, v]) => `${k} ${v}%`).join(", ")}`}>
        {data.map(([k, v]) => <span key={k} style={{ width: `${v.toFixed(2)}%` }} title={`${k} · ${v}%`} />)}
      </div>
      <div className="nn-audience-stack-legend">
        {data.map(([k, v]) => <span key={k}><i aria-hidden="true" /><em title={k}>{k}</em><b>{v}%</b></span>)}
      </div>
    </section>
  );
}

function ReachChart({ c }: { c: Creator }) {
  const vals = c.posts.map((p) => p.views);
  const max = Math.max(...vals), min = Math.min(...vals);
  const pts = vals.map((v, i) => [12 + (i * 496) / (vals.length - 1), 80 - ((v - min) / Math.max(1, max - min)) * 68] as const);
  const line = pts.map(([x, y]) => `L${x.toFixed(1)} ${y.toFixed(1)}`).join(" ").replace(/^L/, "M");
  const area = `M${pts[0]![0].toFixed(1)} 80 ${pts.map(([x, y]) => `L${x.toFixed(1)} ${y.toFixed(1)}`).join(" ")} L${pts[pts.length - 1]![0].toFixed(1)} 80 Z`;
  const d = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return (
    <figure className="nn-reach-chart">
      <div className="nn-reach-chart-head"><b>Reach across recent posts</b><span>Oldest → newest</span></div>
      <svg viewBox="0 0 520 92" role="img" aria-label={`Reach across recent posts: ${vals.map(fmtK).join(", ")}`}>
        <defs><linearGradient id="nnReachArea" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#8392AA" stopOpacity=".34" /><stop offset="1" stopColor="#DCE3EC" stopOpacity=".08" /></linearGradient></defs>
        <line className="nn-reach-chart-grid" x1="0" x2="520" y1="24" y2="24" /><line className="nn-reach-chart-grid" x1="0" x2="520" y1="58" y2="58" />
        <path className="nn-reach-chart-area" d={area} /><path className="nn-reach-chart-line" d={line} />
        {pts.map(([x, y], i) => <circle key={i} className="nn-reach-chart-dot" cx={x.toFixed(1)} cy={y.toFixed(1)} r="3"><title>{fmtK(vals[i]!)}</title></circle>)}
      </svg>
      <div className="nn-reach-chart-labels"><span>{d(c.posts[0]!.date)}</span><span>{d(c.posts[c.posts.length - 1]!.date)}</span></div>
    </figure>
  );
}

function Post({ c, i, expanded, onMore }: { c: Creator; i: number; expanded: boolean; onMore: () => void }) {
  const p = c.posts[i]!;
  const d = new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return (
    <div className="nn-featured-post">
      <div className="nn-linkedin-post-head">
        <span className="nn-linkedin-post-avatar" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{initials(c.name)}</span>
        <span className="nn-linkedin-post-author"><b>{c.name}</b><span>{d} · Public LinkedIn post<a className="nn-post-original-cue" href={`/creators/${c.slug}`} target="_blank" rel="noopener">{"Open original "}<iconify-icon icon="ph:arrow-square-out" aria-hidden="true" /></a></span></span>
        <span className="nn-linkedin-mark" aria-hidden="true"><iconify-icon icon="ph:linkedin-logo-fill" /></span>
      </div>
      <div className="nn-post-copy">
        <p>{expanded ? p.text : p.text.slice(0, 160) + (p.text.length > 160 ? "…" : "")}</p>
        {p.text.length > 160 && <button type="button" className="nn-post-more" aria-expanded={expanded} onClick={onMore}><span>{expanded ? "Show less" : "See full post"}</span><iconify-icon icon="ph:caret-down" aria-hidden="true" /></button>}
      </div>
      <div className="nn-post-metrics">
        <span title="Estimated reach"><iconify-icon icon="ph:eye" aria-hidden="true" />{fmtK(p.views)} estimated</span>
        <span title="reactions"><iconify-icon icon="ph:thumbs-up" aria-hidden="true" />{p.reactions}</span>
        <span title="comments"><iconify-icon icon="ph:chat-circle" aria-hidden="true" />{p.comments}</span>
        <span title="reposts"><iconify-icon icon="ph:repeat" aria-hidden="true" />{p.reposts}</span>
      </div>
    </div>
  );
}

export default function CreatorModal({ ctx, creator: c, onClose, onBook }: { ctx: Ctx; creator: Creator; onClose: () => void; onBook: (kind: "single" | "bundle") => void }) {
  const [tab, setTab] = useState<"overview" | "audience" | "content">("overview");
  const [choice, setChoice] = useState<"single" | "bundle">("single");
  const [postIdx, setPostIdx] = useState(c.posts.length - 1);
  const [expanded, setExpanded] = useState(false);
  const saved = ctx.shortlisted(c.slug);
  const eur = (v: number) => `${Math.round(v / 100).toLocaleString("en-US")} €`;
  const topJob = c.audience.jobTitles[0]!;
  return (
    <div className="overlay open" id="modal-creator" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" id="modal-creator-body" role="dialog" aria-modal="true" aria-labelledby="nn-cm-name">
        <div className="nn-profile-stage is-detail">
          <section className="nn-profile-face nn-profile-detail">
            <header className="nn-profile-back-head">
              <CreatorAvatar name={c.name} className="nn-profile-avatar nn-avatar-initials" />
              <div className="nn-profile-identity"><h2 id="nn-cm-name">{c.name}</h2><p>{c.industries.slice(0, 2).join(" · ")} · LinkedIn creator</p></div>
              <div className="nn-profile-head-actions">
                <button type="button" id="nn-profile-favorite" className={`nn-profile-favorite ${saved ? "is-saved" : ""}`} aria-label="Save to my list" aria-pressed={saved} onClick={() => ctx.toggleShortlist(c.slug)}><svg viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3z" /></svg></button>
                <button type="button" className="modal-close nn-profile-close" aria-label="Close" onClick={onClose}><iconify-icon icon="ph:x" aria-hidden="true" /></button>
              </div>
            </header>
            <div className="nn-decision-workspace">
              <main className="nn-back-stack" id="nn-profile-back-content">
                <section className="nn-decision-tabs">
                  <div className="nn-decision-tablist" role="tablist" aria-label="Creator decision details">
                    {(["overview", "audience", "content"] as const).map((t) => <button key={t} type="button" className={`nn-decision-tab${tab === t ? " is-active" : ""}`} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}>{t[0]!.toUpperCase() + t.slice(1)}</button>)}
                  </div>
                  {tab === "overview" && (
                    <div className="nn-decision-panel" role="tabpanel" data-panel="overview">
                      <div className="nn-overview-panel">
                        <section className="nn-overview-match">
                          <div className="nn-overview-title"><iconify-icon icon="ph:sparkle" aria-hidden="true" /><h3>Creator overview</h3></div>
                          <p>Review this creator’s audience and recent content before booking.</p>
                          <div className="nn-overview-evidence"><span><iconify-icon icon="ph:check-circle" aria-hidden="true" />{topJob[1]}% in observed audience · {topJob[0]}</span><span><iconify-icon icon="ph:check-circle" aria-hidden="true" />{fmtK(c.medianViews)} typical reach</span></div>
                        </section>
                        <section className="nn-overview-section">
                          <div className="nn-overview-section-head"><h3>Audience snapshot</h3><span>Estimated from {40 + (c.followers % 30)} recent public engagers</span></div>
                          <div className="nn-overview-audience"><Stack title="Job title" data={c.audience.jobTitles} /><Stack title="Seniority" data={c.audience.seniority} /></div>
                        </section>
                        <section className="nn-overview-section">
                          <div className="nn-overview-section-head"><h3>Content performance</h3></div>
                          <div className="nn-overview-content"><ReachChart c={c} /><div className="nn-overview-post"><Post c={c} i={c.posts.length - 1} expanded={expanded} onMore={() => setExpanded((v) => !v)} /></div></div>
                        </section>
                        <details className="nn-overview-profile">
                          <summary>Professional profile<iconify-icon icon="ph:caret-down" aria-hidden="true" /></summary>
                          <div>
                            <div className="nn-profile-panel-head"><h3>Creator profile</h3><p>Role, expertise and professional positioning from the creator’s public LinkedIn profile.</p></div>
                            <div className="nn-profile-overview-grid ">
                              <section className="nn-profile-about"><h4>About this creator</h4><p>{c.bio}</p></section>
                              <div className="nn-profile-professional">
                                <section className="nn-professional-card">
                                  <div className="nn-professional-heading"><small>Professional profile</small><h4>Experience</h4></div>
                                  <p className="nn-professional-headline">{c.headline}</p>
                                  <div className="nn-professional-facts"><span><iconify-icon icon="ph:map-pin" aria-hidden="true" /><small>Location</small><b>{c.cc}</b></span><span><iconify-icon icon="ph:translate" aria-hidden="true" /><small>Languages</small><b>{c.languages.join(", ")}</b></span></div>
                                  <div className="nn-profile-skills"><small>Expertise areas</small><div>{c.industries.map((i) => <span key={i}>{i}</span>)}</div></div>
                                  <div className="nn-profile-source"><iconify-icon icon="ph:linkedin-logo-fill" aria-hidden="true" /><span>Updated Sep 7</span><a href={`/creators/${c.slug}`} target="_blank" rel="noopener">{"View public creator card "}<iconify-icon icon="ph:arrow-up-right" aria-hidden="true" /></a></div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </details>
                      </div>
                    </div>
                  )}
                  {tab === "audience" && (
                    <div className="nn-decision-panel" role="tabpanel" data-panel="audience">
                      <div className="nn-audience-tab-head">
                        <div><h3>Audience composition</h3><p>Top segments by dimension; each bar compares like with like.</p></div>
                        <div className="nn-audience-meta"><span className="nn-audience-source"><iconify-icon icon="ph:chart-line-up" aria-hidden="true" />Estimated from {40 + (c.followers % 30)} recent public engagers</span><span className="nn-audience-meta-stat">{"Observed engaged profiles · "}<b>{40 + (c.followers % 30)}</b></span></div>
                      </div>
                      <div className="nn-audience-stack-grid"><Stack title="Job title" data={c.audience.jobTitles} /><Stack title="Seniority" data={c.audience.seniority} /></div>
                    </div>
                  )}
                  {tab === "content" && (
                    <div className="nn-decision-panel" role="tabpanel" data-panel="content">
                      <div className="nn-audience-tab-head"><div><h3>Recent public posts</h3><p>Latest {c.posts.length} original posts, with estimated reach and engagement.</p></div></div>
                      <ReachChart c={c} />
                      <section className="nn-post-carousel" style={{ marginTop: 16 }}>
                        <Post c={c} i={postIdx} expanded={expanded} onMore={() => setExpanded((v) => !v)} />
                        <div className="nn-post-carousel-dots" style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 10 }}>
                          {c.posts.map((_, i) => <button key={i} type="button" className="nn-post-carousel-dot" aria-current={i === postIdx} aria-label={`Show post ${i + 1}`} onClick={() => { setPostIdx(i); setExpanded(false); }} style={{ width: 8, height: 8, borderRadius: 999, border: 0, background: i === postIdx ? "var(--blue)" : "var(--border2)", cursor: "pointer" }} />)}
                        </div>
                      </section>
                    </div>
                  )}
                </section>
              </main>
              <aside id="nn-booking-rail" className="nn-insight-section nn-offer-selector">
                <div className="nn-booking-head"><h3>Book this creator</h3></div>
                <div className="nn-bundle-grid">
                  <button type="button" data-bundle="single" className={`nn-bundle-choice${choice === "single" ? " selected" : ""}`} aria-pressed={choice === "single"} onClick={() => setChoice("single")}>
                    <span className="nn-choice-content"><span className="nn-choice-top"><span className="nn-choice-icon"><iconify-icon icon="ph:circle" aria-hidden="true" /></span><span className="nn-choice-arrow"><iconify-icon icon="ph:cursor-click" aria-hidden="true" /></span></span><span className="nn-choice-title">Single post</span><span className="nn-choice-bottom"><span className="nn-choice-price"><strong>{eur(c.priceCents)}</strong><small>/ post</small></span><span className="nn-choice-cta">Choose</span></span></span>
                  </button>
                  {c.bundle && (
                    <button type="button" data-bundle="0" className={`nn-bundle-choice best${choice === "bundle" ? " selected" : ""}`} aria-pressed={choice === "bundle"} onClick={() => setChoice("bundle")}>
                      <span className="nn-choice-content"><span className="nn-choice-top"><span className="nn-choice-icon"><iconify-icon icon="ph:circle" aria-hidden="true" /></span><span className="nn-choice-arrow"><iconify-icon icon="ph:cursor-click" aria-hidden="true" /></span></span><span className="nn-choice-title">Bundle · {c.bundle.posts}</span><span className="nn-choice-bottom"><span className="nn-choice-price"><strong>{eur(c.bundle.totalCents)}</strong><small>{c.bundle.posts} posts</small></span><span className="nn-choice-cta">Choose</span></span></span>
                    </button>
                  )}
                </div>
                <dl className="nn-booking-facts">
                  <div><dt>Typical reach</dt><dd>{fmtK(c.medianViews)}</dd></div>
                  <div><dt>Estimated CPM</dt><dd>{eur(c.cpmCents)}</dd></div>
                  <div><dt>Posts analyzed</dt><dd>{c.postsAnalyzed}</dd></div>
                </dl>
                <details className="nn-booking-formula"><summary>How pricing is calculated<iconify-icon icon="ph:caret-down" aria-hidden="true" /></summary><p>{eur(c.priceCents)} ÷ {fmtK(c.medianViews)} × 1,000</p></details>
                <div className="nn-canvas-booking">
                  <button type="button" className="nn-canvas-cta" onClick={() => onBook(choice)}>Collaborate with {c.name}</button>
                  <span className="nn-canvas-booking-note"><iconify-icon icon="ph:shield-check" aria-hidden="true" />Secure booking · Creator approves first</span>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
