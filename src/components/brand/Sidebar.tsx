"use client";
import { useState } from "react";

export const NAV: { page: string; icon: string; label: string }[] = [
  { page: "overview", icon: "ph:squares-four", label: "Overview" },
  { page: "marketplace", icon: "ph:storefront", label: "Creators" },
  { page: "studio", icon: "ph:stack", label: "Campaigns" },
  { page: "collaborations", icon: "ph:users-three", label: "Collaborations" },
  { page: "leads", icon: "ph:chart-line-up", label: "Results" },
  { page: "messages", icon: "ph:chat-circle", label: "Messages" },
  { page: "billing", icon: "ph:credit-card", label: "Billing" },
];

export default function Sidebar({ page, companyName, onNav, collapsed, setCollapsed, mobileOpen, setMobileOpen, unread }: { page: string; companyName: string; onNav: (p: string) => void; collapsed: boolean; setCollapsed: (v: boolean) => void; mobileOpen: boolean; setMobileOpen: (v: boolean) => void; unread: number }) {
  const [wsOpen, setWsOpen] = useState(false);
  const [hover, setHover] = useState(false);
  return (
    <aside className={`sidebar${hover && !collapsed ? " is-hover-ready" : ""}${collapsed ? " is-collapsed" : ""}${mobileOpen ? " m-open" : ""}`} id="platform-sidebar" onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setWsOpen(false); }}>
      <div className="sb-head">
        <div className="logo">
          <img src="/lp/naano-logomark.png" alt="" style={{ height: "26px", width: "auto", display: "block" }} />
          <span className="logo-word">naano</span>
        </div>
        <div style={{ position: "relative" }} id="nn-ws-wrap">
          <button className="ov3-pill" id="nn-ws-pill" type="button" aria-expanded={wsOpen} onClick={() => setWsOpen((v) => !v)}>
            <iconify-icon icon="ph:buildings" style={{ fontSize: "15px" }} />{" "}
            <span id="nn-ws-name">{companyName}</span>{" "}
            <svg className="chev" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m6 9 6 6 6-6" /></svg>
          </button>
          <div id="nn-ws-menu" style={{ display: wsOpen ? "block" : "none", position: "absolute", top: "calc(100% + 6px)", left: "auto", right: "0", minWidth: "250px", maxHeight: "calc(100dvh - 92px)", overflowY: "auto", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "14px", boxShadow: "0 12px 40px rgba(15,18,32,.15)", padding: "6px", zIndex: "80" }}>
            <button type="button" className="nav-item active" style={{ width: "100%" }} onClick={() => setWsOpen(false)}><iconify-icon icon="ph:buildings" /><span>{companyName}</span></button>
            <button type="button" className="nav-item" style={{ width: "100%" }} onClick={() => { setWsOpen(false); onNav("settings"); }}><iconify-icon icon="ph:gear" /><span>Workspace settings</span></button>
          </div>
        </div>
        <button type="button" className="sb-toggle" id="sb-toggle" title="Collapse navigation" aria-label="Collapse navigation" aria-controls="platform-sidebar" aria-expanded={!collapsed} onClick={() => setCollapsed(!collapsed)}>
          <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18" /><path d="m15 9-3 3 3 3" /></svg>
        </button>
      </div>
      <nav className="nav">
        {NAV.map((n) => (
          <button key={n.page} className={`nav-item${page === n.page ? " active" : ""}`} data-page={n.page} aria-label={n.label} title={n.label} onClick={() => { onNav(n.page); setMobileOpen(false); }}>
            <iconify-icon icon={n.icon} />
            <span>{n.label}</span>
            {n.page === "messages" && <span className="badge-count" style={{ display: unread ? "inline-flex" : "none" }}>{unread}</span>}
          </button>
        ))}
      </nav>
      <div className="sb-handle" id="sb-handle" role="separator" tabIndex={0} aria-orientation="vertical" aria-valuemin={208} aria-valuemax={400} aria-valuenow={264} aria-label="Drag to resize" title="Drag to resize" />
    </aside>
  );
}
