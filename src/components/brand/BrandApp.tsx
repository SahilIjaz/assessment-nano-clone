"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { BrandSnapshot } from "@/lib/brand-data";
import { CREATORS, creatorBySlug, type Creator } from "@/data/creators";
import { initials } from "@/lib/format";
import { brandApi } from "./api";
import Sidebar from "./Sidebar";
import AccountToolbar, { type Notice } from "./AccountToolbar";
import Overview from "./pages/Overview";
import Marketplace from "./pages/Marketplace";
import Campaigns from "./pages/Campaigns";
import CampaignNew from "./pages/CampaignNew";
import Collaborations from "./pages/Collaborations";
import Results from "./pages/Results";
import Messages from "./pages/Messages";
import Billing from "./pages/Billing";
import Settings from "./pages/Settings";
import Integrations from "./pages/Integrations";
import CreatorModal from "./modals/CreatorModal";
import NegotiationModal from "./modals/NegotiationModal";
import MoneyModal from "./modals/MoneyModal";

export type Route = { page: string; parts: string[] };
export type Toast = { id: number; text: string; kind?: "ok" | "err" };

export type Ctx = {
  snap: BrandSnapshot; setSnap: (s: BrandSnapshot) => void; nav: (hash: string) => void; route: Route;
  api: (action: string, body?: Record<string, unknown>) => Promise<{ ok: boolean; error?: string; [k: string]: unknown }>;
  toast: (text: string, kind?: "ok" | "err") => void;
  openCreator: (slug: string) => void; openBooking: (slug: string, kind?: "single" | "bundle") => void; openMoney: (suggestCents?: number) => void;
  toggleShortlist: (slug: string) => Promise<void>; shortlisted: (slug: string) => boolean;
};

function parseHash(h: string): Route {
  const clean = (h || "#overview").replace(/^#/, "");
  const parts = clean.split("/").filter(Boolean);
  const first = parts[0] || "overview";
  const map: Record<string, string> = { campaigns: "studio", results: "leads", "campaign-new": "campaign-new", creators: "marketplace" };
  return { page: map[first] || first, parts: parts.slice(1) };
}

export default function BrandApp({ initial }: { initial: BrandSnapshot }) {
  const [snap, setSnap] = useState<BrandSnapshot>(initial);
  const [route, setRoute] = useState<Route>({ page: "overview", parts: [] });
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [creatorOpen, setCreatorOpen] = useState<Creator | null>(null);
  const [booking, setBooking] = useState<{ creator: Creator; kind: "single" | "bundle" } | null>(null);
  const [money, setMoney] = useState<{ open: boolean; suggest?: number }>({ open: false });
  const [welcome, setWelcome] = useState(false);

  useEffect(() => {
    const apply = () => setRoute(parseHash(window.location.hash));
    apply();
    const qs = new URLSearchParams(window.location.search);
    if (qs.get("welcomeStep")) { setWelcome(true); if (!window.location.hash) window.location.hash = "#marketplace"; }
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const nav = useCallback((hash: string) => { window.location.hash = hash.startsWith("#") ? hash : `#${hash}`; window.scrollTo({ top: 0 }); }, []);
  const toast = useCallback((text: string, kind: "ok" | "err" = "ok") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text, kind }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3800);
  }, []);
  const api = useCallback(async (action: string, body: Record<string, unknown> = {}) => {
    const r = await brandApi(action, body);
    if (r.state) setSnap(r.state);
    if (!r.ok && r.error) toast(r.error, "err");
    return r as { ok: boolean; error?: string; [k: string]: unknown };
  }, [toast]);

  const shortlisted = useCallback((slug: string) => snap.shortlist.includes(slug), [snap.shortlist]);
  const toggleShortlist = useCallback(async (slug: string) => {
    const on = !snap.shortlist.includes(slug);
    await api("shortlist", { slug, on });
    toast(on ? "Saved to your shortlist" : "Removed from your shortlist");
  }, [api, snap.shortlist, toast]);

  const ctx: Ctx = useMemo(() => ({
    snap, setSnap, nav, route, api, toast,
    openCreator: (slug) => { const c = creatorBySlug(slug); if (c) setCreatorOpen(c); },
    openBooking: (slug, kind = "single") => { const c = creatorBySlug(slug); if (c) setBooking({ creator: c, kind }); },
    openMoney: (suggest) => setMoney({ open: true, suggest }),
    toggleShortlist, shortlisted,
  }), [snap, nav, route, api, toast, toggleShortlist, shortlisted]);

  const activation = useMemo(() => {
    const done = 1 + (snap.campaigns.length ? 1 : 0) + (snap.bookings.length ? 1 : 0);
    const label = done >= 3 ? "You're all set" : done === 2 ? "Book or negotiate with a creator" : "Create your first brief";
    return { done: Math.min(done, 3), total: 3, label: done === 1 && !snap.campaigns.length ? "Discover the Marketplace" : label };
  }, [snap]);

  const notices: Notice[] = useMemo(() => snap.bookings.slice(0, 5).map((b) => ({ id: b.id, title: `${creatorBySlug(b.creator_slug)?.name ?? "Creator"} · ${b.status.replace(/_/g, " ")}`, body: b.next_action || "", when: new Date(b.updated_at).toLocaleString("en-GB") })), [snap.bookings]);
  const unread = 0;

  const signOut = async () => { await fetch("/api/auth/logout", { method: "POST" }); window.location.href = "/login"; };
  const fullName = `${snap.user.firstName} ${snap.user.lastName}`.trim();
  const companyName = snap.company.name;
  const pages: Record<string, React.ReactNode> = {
    overview: <Overview ctx={ctx} />,
    marketplace: <Marketplace ctx={ctx} welcome={welcome} onWelcomeDone={() => setWelcome(false)} />,
    studio: <Campaigns ctx={ctx} />,
    "campaign-new": <CampaignNew ctx={ctx} />,
    collaborations: <Collaborations ctx={ctx} />,
    leads: <Results ctx={ctx} />,
    messages: <Messages ctx={ctx} />,
    billing: <Billing ctx={ctx} />,
    settings: <Settings ctx={ctx} />,
    integrations: <Integrations ctx={ctx} />,
  };
  return (
    <div className="app" data-page={route.page}>
      <Sidebar page={route.page} companyName={companyName} onNav={(p) => nav(p === "studio" ? "campaigns" : p === "leads" ? "results" : p)} collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} unread={unread} />
      <button type="button" id="sb-openbtn" className="sb-openbtn" aria-label="Open navigation" onClick={() => setMobileOpen(true)}>
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
      </button>
      <div id="m-scrim" className={`m-scrim${mobileOpen ? " on" : ""}`} onClick={() => setMobileOpen(false)} />
      <div className="main">
        <div className="m-topbar">
          <button type="button" className="m-navbtn" id="m-nav-btn" aria-label="Open navigation" aria-controls="platform-sidebar" aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)}>
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
          <div className="m-logo-sm"><img src="/lp/naano-logomark.png" alt="" style={{ height: "22px", width: "auto", display: "block" }} />naano</div>
        </div>
        <AccountToolbar balanceCents={snap.company.balance_cents} locale={snap.user.locale} onLocale={(l) => api("locale", { locale: l })} activation={activation} onNav={(p) => nav(p)} onOpenMoney={() => setMoney({ open: true })} onSignOut={signOut} initials={initials(fullName || "N")} fullName={fullName} email={snap.user.email} notices={notices} onBook={() => { const first = CREATORS[0]!; setBooking({ creator: first, kind: "single" }); }} />
        {pages[route.page] ?? <Overview ctx={ctx} />}
      </div>
      {creatorOpen && <CreatorModal ctx={ctx} creator={creatorOpen} onClose={() => setCreatorOpen(null)} onBook={(kind) => { setBooking({ creator: creatorOpen, kind }); setCreatorOpen(null); }} />}
      {booking && <NegotiationModal ctx={ctx} creator={booking.creator} kind={booking.kind} onClose={() => setBooking(null)} onBack={() => { setBooking(null); setCreatorOpen(booking.creator); }} />}
      {money.open && <MoneyModal ctx={ctx} suggest={money.suggest} onClose={() => setMoney({ open: false })} />}
      <div id="toasts" className="toasts" aria-live="polite">
        {toasts.map((t) => <div key={t.id} className={`toast show ${t.kind === "err" ? "err" : "ok"}`}>{t.text}</div>)}
      </div>
    </div>
  );
}
