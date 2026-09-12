"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { CreatorSnapshot } from "@/lib/creator-data";
import { fmtEur0, initials } from "@/lib/format";
import { creatorApi } from "./api";
import Home from "./pages/Home";
import MyCard from "./pages/MyCard";
import Opportunities from "./pages/Opportunities";
import Collabs from "./pages/Collabs";
import Analytics from "./pages/Analytics";
import Community from "./pages/Community";
import Earnings from "./pages/Earnings";
import Referrals from "./pages/Referrals";
import CMessages from "./pages/Messages";
import CIntegrations from "./pages/Integrations";
import CSettings from "./pages/Settings";

export type CCtx = { snap: CreatorSnapshot; nav: (h: string) => void; route: { page: string; parts: string[] }; api: (a: string, b?: Record<string, unknown>) => Promise<{ ok: boolean; error?: string; [k: string]: unknown }>; toast: (t: string, k?: "ok" | "err") => void; cardData: () => import("./CreatorCardPreview").CardData; visible: boolean };

const NAV = [["home", "ph:squares-four", "Overview"], ["profile", "ph:identification-card", "My card"], ["opportunities", "ph:storefront", "Opportunities"], ["collabs", "ph:stack", "Collaborations"], ["analytics", "ph:chart-line-up", "Analytics"], ["community", "ph:users-three", "Community"], ["earnings", "ph:wallet", "Earnings"], ["referrals", "ph:percent", "Affiliate program"], ["messages", "ph:chat-circle", "Messages"]] as const;
const TOUR = [["profile", "Your Marketplace card", "This is your private preview and editor. Keep your positioning, packs and price clear before sharing your card."], ["home", "Your overview", "Public reach, launch guide and active collaborations, at a glance."], ["opportunities", "Opportunities", "Open brand campaigns. Apply, the brand accepts, and the booking is created on your terms."], ["collabs", "Collaborations", "Every step tells you where you stand, what to do, and what happens if you do nothing."], ["analytics", "Analytics", "Public LinkedIn performance imported for this profile — brands see the same numbers."]] as const;

export default function CreatorApp({ initial }: { initial: CreatorSnapshot }) {
  const [snap, setSnap] = useState(initial);
  const [route, setRoute] = useState({ page: "home", parts: [] as string[] });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [menu, setMenu] = useState<null | "user" | "bell">(null);
  const [toasts, setToasts] = useState<{ id: number; text: string; kind: string }[]>([]);
  const [tour, setTour] = useState<number>(-1);
  useEffect(() => {
    const apply = () => { const h = window.location.hash.replace(/^#/, "") || "home"; const parts = h.split("/"); setRoute({ page: parts[0]!, parts: parts.slice(1) }); };
    apply(); window.addEventListener("hashchange", apply);
    if (new URLSearchParams(window.location.search).get("tour") === "1") setTour(0);
    return () => window.removeEventListener("hashchange", apply);
  }, []);
  useEffect(() => { if (tour >= 0 && tour < TOUR.length) window.location.hash = "#" + TOUR[tour]![0]; }, [tour]);
  const nav = useCallback((h: string) => { window.location.hash = h.startsWith("#") ? h : "#" + h; window.scrollTo({ top: 0 }); }, []);
  const toast = useCallback((text: string, kind: "ok" | "err" = "ok") => { const id = Date.now() + Math.random(); setToasts((t) => [...t, { id, text, kind }]); setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3800); }, []);
  const api = useCallback(async (a: string, b: Record<string, unknown> = {}) => { const r = await creatorApi(a, b); if (r.state) setSnap(r.state); if (!r.ok && r.error) toast(r.error, "err"); return r; }, [toast]);
  const visible = snap.profile.followers >= 1000;
  const ctx: CCtx = useMemo(() => ({ snap, nav, route, api, toast, visible, cardData: () => { const p = snap.profile; const flag = p.country_code ? String.fromCodePoint(...[...p.country_code].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)) : null; return { name: p.display_name || `${snap.user.firstName} ${snap.user.lastName}`, headline: p.headline, bio: p.bio, industries: p.industries, flag, country: p.country, followers: p.followers, medianViews: p.median_views, priceCents: p.price_cents, bundles: p.bundles, linkedinUrl: p.linkedin_url, engagement: p.engagement_rate }; } }), [snap, nav, route, api, toast, visible]);
  const fullName = `${snap.user.firstName} ${snap.user.lastName}`;
  const signOut = async () => { await fetch("/api/auth/logout", { method: "POST" }); window.location.href = "/login"; };
  const pages: Record<string, React.ReactNode> = { home: <Home ctx={ctx} />, profile: <MyCard ctx={ctx} />, opportunities: <Opportunities ctx={ctx} />, collabs: <Collabs ctx={ctx} />, analytics: <Analytics ctx={ctx} />, community: <Community ctx={ctx} />, earnings: <Earnings ctx={ctx} />, referrals: <Referrals ctx={ctx} />, messages: <CMessages ctx={ctx} />, integrations: <CIntegrations ctx={ctx} />, settings: <CSettings ctx={ctx} /> };
  const notices = snap.bookings.filter((b) => ["invited", "draft_changes"].includes(b.status));
  return (
    <div className="app" data-page={route.page}>
      <aside className={`sidebar${hover ? " is-hover-ready" : ""}${mobileOpen ? " m-open" : ""}`} id="platform-sidebar" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div className="sb-head"><div className="logo"><img src="/lp/naano-logomark.png" alt="" style={{ height: "26px", width: "auto", display: "block" }} /><span className="logo-word">naano</span></div></div>
        <nav className="nav">{NAV.map(([p, icon, label]) => <button key={p} className={`nav-item${route.page === p ? " active" : ""}`} aria-label={label} title={label} onClick={() => { nav(p); setMobileOpen(false); }}><iconify-icon icon={icon} /><span>{label}</span></button>)}</nav>
        <div className="sb-handle" id="sb-handle" role="separator" aria-orientation="vertical" />
      </aside>
      <button type="button" id="sb-openbtn" className="sb-openbtn" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
      <div id="m-scrim" className={`m-scrim${mobileOpen ? " on" : ""}`} onClick={() => setMobileOpen(false)} />
      <div className={`main${route.page === "home" ? " cr-home-white" : ""}`}>
        <div className="m-topbar"><button type="button" className="m-navbtn" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg></button><div className="m-logo-sm"><img src="/lp/naano-logomark.png" alt="" style={{ height: "22px", width: "auto", display: "block" }} />naano</div></div>
        <div className="nn-account-toolbar" id="nn-account-toolbar">
          <button type="button" className="wallet-pill" title="See my earnings" onClick={() => nav("earnings")}><span className="wp-txt"><b id="cr-balance">{fmtEur0(snap.profile.available_cents)}</b><span>Available earnings</span></span></button>
          <div className="lang-seg" role="group" aria-label="Language"><button type="button" className={`lang-opt${snap.user.locale === "en" ? " on" : ""}`} onClick={() => api("locale", { locale: "en" })}>EN</button><button type="button" className={`lang-opt${snap.user.locale === "fr" ? " on" : ""}`} onClick={() => api("locale", { locale: "fr" })}>FR</button></div>
          <div style={{ position: "relative" }}>
            <button type="button" className="bell" aria-label="Notifications" aria-expanded={menu === "bell"} onClick={() => setMenu(menu === "bell" ? null : "bell")}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M10.3 21a2 2 0 0 0 3.4 0" /></svg><span className="dot" style={{ display: notices.length ? "inline-flex" : "none" }}>{notices.length}</span></button>
            {menu === "bell" && <div role="dialog" style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", zIndex: 90, width: 340, background: "var(--card,#fff)", border: "1px solid var(--border,#E7EAF1)", borderRadius: 16, boxShadow: "0 18px 50px rgba(15,18,32,.16)", padding: 18 }}><b style={{ display: "block" }}>Notifications</b>{notices.length === 0 ? <div style={{ textAlign: "center", padding: "16px 0" }}><b style={{ display: "block" }}>You're all caught up</b><span className="muted" style={{ fontSize: ".8rem" }}>Brand invitations and draft feedback show up here.</span></div> : notices.map((b) => <div key={b.id} style={{ padding: "10px 0", borderTop: "1px solid var(--border,#E7EAF1)" }}><b style={{ display: "block", fontSize: ".86rem" }}>{b.company?.name} · {b.status.replace(/_/g, " ")}</b><span className="muted" style={{ fontSize: ".78rem" }}>{b.next_action}</span></div>)}</div>}
          </div>
          <div className="user-slot">
            <div className={`user-menu${menu === "user" ? " open" : ""}`} role="menu">
              <button type="button" className="nav-item" role="menuitem" onClick={() => { setMenu(null); nav("integrations"); }}><iconify-icon icon="ph:link-simple" aria-hidden="true" /><span>Integrations</span></button>
              <button type="button" className="nav-item" role="menuitem" onClick={() => { setMenu(null); nav("settings"); }}><iconify-icon icon="ph:gear" aria-hidden="true" /><span>Settings</span></button>
              <button type="button" className="nav-item" role="menuitem" onClick={() => { setMenu(null); setTour(0); }}><iconify-icon icon="ph:squares-four" aria-hidden="true" /><span>Guided tour</span></button>
              <div className="sep" role="separator" />
              <button type="button" className="nav-item" role="menuitem" onClick={signOut}><iconify-icon icon="ph:sign-out" aria-hidden="true" /><span>Sign out</span></button>
            </div>
            <button type="button" className={`user-btn${menu === "user" ? " open" : ""}`} aria-label="Account" aria-haspopup="menu" aria-expanded={menu === "user"} onClick={() => setMenu(menu === "user" ? null : "user")}><span className="ub-av"><span className="avatar-sm" style={{ background: "#0F1220" }}>{initials(fullName)}</span></span><span className="ub-txt"><b>{fullName}</b><span>{snap.user.email}</span></span><svg className="uchev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></button>
          </div>
        </div>
        {!visible && route.page !== "home" && route.page !== "settings" && route.page !== "integrations" && (
          <div id="cr-profile-professional-banner" style={{ display: "flex", alignItems: "center", gap: "14px", margin: "18px 24px 0", padding: "14px 16px", border: "1px solid rgb(200, 215, 255)", borderRadius: "14px", background: "linear-gradient(135deg,#F3F7FF,#EEF3FF)" }}>
            <iconify-icon icon="ph:lock-simple" style={{ fontSize: "24px", color: "var(--blue,#1D5BF5)", flex: "0 0 auto" }} />
            <div style={{ minWidth: 0, flex: 1 }}><b style={{ display: "block", fontSize: ".9rem" }}>Not visible on the Marketplace yet</b><span className="muted" style={{ display: "block", marginTop: "2px", fontSize: ".78rem", lineHeight: 1.45 }}>Your workspace and card remain accessible. Marketplace visibility unlocks when your audience reaches 1,000 followers.</span></div>
          </div>
        )}
        {pages[route.page] ?? <Home ctx={ctx} />}
      </div>
      {tour >= 0 && tour < TOUR.length && (
        <div className="cr-tour" role="dialog" style={{ position: "fixed", left: 300, top: 90, zIndex: 200, width: 360, background: "#fff", borderRadius: 18, boxShadow: "0 18px 50px rgba(15,18,32,.2)", padding: "18px 20px" }}>
          <small style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".08em", color: "var(--blue,#1D5BF5)" }}>STEP {tour + 1} OF {TOUR.length}</small>
          <b style={{ display: "block", fontSize: "1.05rem", marginTop: 4 }}>{TOUR[tour]![1]}</b>
          <p className="muted" style={{ fontSize: ".86rem", margin: "6px 0 12px" }}>{TOUR[tour]![2]}</p>
          <div style={{ display: "flex", justifyContent: "space-between" }}><button className="btn btn-ghost" onClick={() => setTour(-1)}>Skip</button><button className="btn btn-primary" onClick={() => setTour(tour + 1 >= TOUR.length ? -1 : tour + 1)}>{tour + 1 >= TOUR.length ? "Done" : "Next"}</button></div>
        </div>
      )}
      <div id="toasts" className="toasts" aria-live="polite">{toasts.map((t) => <div key={t.id} className={`toast show ${t.kind === "err" ? "err" : "ok"}`}>{t.text}</div>)}</div>
    </div>
  );
}
