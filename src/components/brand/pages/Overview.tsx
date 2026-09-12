"use client";
import type { Ctx } from "../BrandApp";
import { CREATORS, creatorBySlug } from "@/data/creators";
import { avatarGradient } from "../Avatar";
import { fmtK, initials } from "@/lib/format";

const Clouds = () => (
  <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute", overflow: "hidden" }}>
    <defs>
      <symbol id="nnd-clouds" viewBox="0 0 360 130">
        <path fill="rgba(255,255,255,.22)" d="M-30 91c18-14 39-15 56-5 4-20 25-31 44-24 11-24 45-29 63-9 17-11 40-3 46 17 18-7 40 4 44 21H-30Z" />
        <path fill="rgba(255,255,255,.5)" d="M-28 108c16-19 43-24 64-12 7-25 33-40 56-31 14-26 52-31 73-8 19-12 44-3 50 20 18-5 39 7 44 29v24H-28Z" />
        <path fill="rgba(255,255,255,.5)" d="M190 102c12-16 35-20 52-8 8-25 39-35 61-18 18-14 48-4 54 21 14-3 30 4 40 19v14H190Z" />
        <path fill="rgba(255,255,255,.82)" d="M-26 126c17-22 49-28 72-13 14-25 49-31 72-12 19-17 50-13 64 8 21-10 50-2 60 20H-26Z" />
        <path fill="rgba(255,255,255,.82)" d="M237 129c14-18 40-23 59-11 14-23 48-28 68-7 12-5 27-2 38 9v10H237Z" />
      </symbol>
    </defs>
  </svg>
);

export default function Overview({ ctx }: { ctx: Ctx }) {
  const { snap, nav } = ctx;
  const active = snap.bookings.filter((b) => !["cancelled", "declined"].includes(b.status));
  const published = snap.bookings.filter((b) => b.status === "published");
  const tasks = [
    ...(snap.company.balance_cents === 0 ? [{ t: "Top up your wallet", tag: "Blocked", cls: "soon", go: () => ctx.openMoney() }] : []),
    { t: "Book a call for your next campaign", tag: "Suggested", cls: "info", go: () => window.open("/book", "_blank") },
    { t: "Find new creators for your next campaign", tag: "Suggested", cls: "info", go: () => nav("marketplace") },
    ...(active.length ? [{ t: `Follow up on ${active.length} collaboration${active.length > 1 ? "s" : ""}`, tag: "To do", cls: "info", go: () => nav("collaborations") }] : []),
  ];
  const fresh = CREATORS.slice(8, 16);
  const waiting = snap.conversations.filter((c) => c.kind === "booking").slice(0, 3);
  return (
    <section className="page visible" id="page-overview" data-screen-label="Overview">
      <div className="nn-dash">
        <Clouds />
        <main>
          <div className="wrap">
            <div className="top">
              <div>
                <div className="hello" id="nnd-hello">Hello {snap.user.firstName} 👋</div>
                <h1 id="nnd-title">Here is what is happening for {snap.company.name} on Naano.</h1>
              </div>
              <div className="top-actions">
                <button className="btn primary" onClick={() => nav("campaign-new")}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                  <span>New campaign</span>
                </button>
              </div>
            </div>
            <div className="kpis" id="nnd-kpis">
              <div className="kpi"><div className="kpi-lbl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.8-3.3 3.4-5 6.5-5s5.7 1.7 6.5 5" /><path d="M16 5.2a3.5 3.5 0 0 1 0 5.6M18.5 15.5c1.6.8 2.7 2.3 3 4.5" /></svg><span>Creators activated</span></div><b>{new Set(active.map((b) => b.creator_slug)).size}</b></div>
              <div className="kpi"><div className="kpi-lbl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></svg><span>Posts published</span></div><b>{published.reduce((a, b) => a + b.posts, 0)}</b></div>
              <div className="kpi"><div className="kpi-lbl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-5.9A8.4 8.4 0 1 1 21 11.5z" /></svg><span>Profiles engaged</span></div><b>{published.length * 0}</b></div>
              <div className="kpi"><div className="kpi-lbl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg><span>Impressions</span></div><b>{fmtK(published.reduce((a, b) => a + (creatorBySlug(b.creator_slug)?.medianViews ?? 0) * b.posts, 0))}</b></div>
            </div>
            <div className="grid grid-top">
              <section className="card rise" data-nn-entered="1" style={{ animationDelay: "0ms" }}>
                <div className="card-head"><h2>To do</h2><span className="count" id="nnd-tasks-count" /><a href="#collaborations">See all</a></div>
                <div className="sub">Priority actions</div>
                <div className="tasks" id="nnd-tasks">
                  {tasks.map((t) => (
                    <div className="task" key={t.t}>
                      <span className="task-check" />
                      <div className="task-body"><b>{t.t}</b></div>
                      <span className={`task-tag ${t.cls}`}>{t.tag}</span>
                      <button className="task-go" onClick={t.go} aria-label={t.t}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg></button>
                    </div>
                  ))}
                </div>
              </section>
              <section className="card rise" data-nn-entered="1" style={{ animationDelay: "42ms" }}>
                <div className="sky-cover">
                  <svg className="an-clouds" viewBox="0 0 360 130" preserveAspectRatio="none" aria-hidden="true"><use href="#nnd-clouds" /></svg>
                  <div className="sky-copy"><small>RECENTLY ENGAGED COMPANIES</small><b>ICP accounts in your target</b></div>
                  <a className="sky-link" href="#results/all/leads">See all</a>
                </div>
                <div className="people" id="nnd-people">
                  <div className="person"><div className="person-main"><span>No company has engaged yet.</span></div></div>
                </div>
              </section>
            </div>
            <div className="grid grid-bot">
              <section className="card rise" data-nn-entered="1" style={{ animationDelay: "84ms" }}>
                <div className="card-head"><h2>Messages</h2><span className="count" id="nnd-msgs-count">{waiting.length || ""}</span></div>
                <div className="sub">Waiting on your reply</div>
                <div className="msgs compact" id="nnd-msgs">
                  {waiting.length === 0 ? (
                    <div className="msg"><div className="msg-main"><div className="msg-text">No conversation yet.</div></div></div>
                  ) : waiting.map((c) => {
                    const b = snap.bookings.find((x) => x.id === c.booking_id); const cr = b ? creatorBySlug(b.creator_slug) : null; const last = c.messages[c.messages.length - 1];
                    return (
                      <div className="msg" key={c.id} onClick={() => nav("messages")} style={{ cursor: "pointer" }}>
                        <div className="msg-main"><b style={{ display: "block", fontSize: ".86rem" }}>{cr?.name ?? "Creator"}</b><div className="msg-text">{last?.body}</div></div>
                      </div>
                    );
                  })}
                </div>
              </section>
              <section className="card rise" data-nn-entered="1" style={{ animationDelay: "126ms" }}>
                <div className="card-head"><h2>New creators</h2><span className="count" id="nnd-strip-count">{fresh.length}</span><a href="#marketplace">Explore</a></div>
                <div className="sub">Profiles that fit your buyers</div>
                <div className="strip">
                  <div className="strip-track" id="nnd-strip">
                    {fresh.map((c, i) => (
                      <article className="cc" key={c.slug} onClick={() => ctx.openCreator(c.slug)} style={{ cursor: "pointer" }}>
                        <div className={`cc-cover t${(i % 4) + 1}`}><svg className="cc-clouds" viewBox="0 0 360 130" preserveAspectRatio="none" aria-hidden="true"><use href="#nnd-clouds" /></svg></div>
                        <div className="cc-av" style={{ backgroundImage: "none", background: avatarGradient(c.name), display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 18 }}>{initials(c.name)}</div>
                        <div className="cc-body">
                          <b>{c.name}</b>
                          <div className="cc-role">{c.industries.slice(0, 3).join(" · ")}</div>
                          <span className="cc-fit">{c.icpFit}% ICP</span>
                          <div className="cc-rate"><span>from</span><b>{Math.round(c.priceCents / 100)}€</b><span>/post</span></div>
                          <button type="button" className="cc-add" onClick={(e) => { e.stopPropagation(); ctx.toggleShortlist(c.slug); }}>{ctx.shortlisted(c.slug) ? "Saved" : "Add"}</button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            </div>
            <section className="card nnd-expert rise" data-nn-entered="1" style={{ animationDelay: "168ms", marginTop: 18, display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
              <img src="/lp/naano-team-face.jpg" alt="" style={{ width: 56, height: 56, borderRadius: 999, objectFit: "cover" }} />
              <div style={{ flex: 1, minWidth: 240 }}>
                <small style={{ fontSize: ".7rem", letterSpacing: ".08em", fontWeight: 700, color: "var(--muted)" }}>NAANO EXPERTS AVAILABLE</small>
                <h3 style={{ margin: "4px 0 2px", fontSize: "1.05rem" }}>Need an expert eye? Book a free call.</h3>
                <p className="muted" style={{ margin: 0, fontSize: ".86rem" }}>15 minutes with a Naano expert to frame your next campaign, sharpen your shortlist or improve the posts already running.</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <button className="btn primary" onClick={() => window.open("/book", "_blank")}>Book a free call →</button>
                <div className="muted" style={{ fontSize: ".74rem", marginTop: 6 }}>No commitment · Slot available today</div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </section>
  );
}
