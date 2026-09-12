"use client";
import { useEffect, useRef, useState } from "react";
import { fmtEur } from "@/lib/format";

export type Notice = { id: string; title: string; body: string; when: string };

export default function AccountToolbar({ balanceCents, locale, onLocale, activation, onNav, onOpenMoney, onSignOut, initials, fullName, email, notices, onBook }: {
  balanceCents: number; locale: string; onLocale: (l: string) => void; activation: { done: number; total: number; label: string }; onNav: (p: string) => void; onOpenMoney: () => void; onSignOut: () => void; initials: string; fullName: string; email: string; notices: Notice[]; onBook: () => void;
}) {
  const [menu, setMenu] = useState<null | "user" | "bell" | "activation">(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setMenu(null); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);
  const pct = Math.round((activation.done / activation.total) * 100);
  return (
    <div className="nn-account-toolbar" id="nn-account-toolbar" ref={ref}>
      <button type="button" className="nn-mcp-header-chip" title="Connect Naano to your AI assistant" aria-label="Connect Naano to your AI assistant" onClick={() => onNav("integrations")}>
        <span className="nn-mcp-signal" aria-hidden="true" />
        <span><span className="nn-mcp-brand">{"Naano "}</span>MCP</span>
        <span className="nn-mcp-divider" aria-hidden="true">/</span>
        <span className="nn-mcp-action">Connect</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </button>
      <button type="button" className="wallet-pill" id="sb-balance-pill" title="Available balance: topped-up funds not yet committed. Open Billing." onClick={() => onNav("billing")}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2.5" /><path d="M2 10h20" /></svg>
        <span className="wp-txt"><b id="topbar-balance" data-done="1">{fmtEur(balanceCents)}</b><span>Available balance</span></span>
        <svg className="chev" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m9 6 6 6-6 6" /></svg>
      </button>
      <div className="lang-seg" id="nn-lang-seg" role="group" aria-label="Language" title="Language">
        <button type="button" className={`lang-opt${locale === "en" ? " on" : ""}`} data-loc="en" aria-pressed={locale === "en"} onClick={() => onLocale("en")}>EN</button>
        <button type="button" className={`lang-opt${locale === "fr" ? " on" : ""}`} data-loc="fr" aria-pressed={locale === "fr"} onClick={() => onLocale("fr")}>FR</button>
      </div>
      <div style={{ position: "relative" }}>
        <button type="button" id="nn-activation-entry" className="nn-activation-entry" aria-expanded={menu === "activation"} aria-label={`Activation progress: ${activation.done} of ${activation.total}`} style={{ ["--activation-progress" as string]: `${pct}%` }} onClick={() => setMenu(menu === "activation" ? null : "activation")}>
          <span className="nn-activation-entry-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /><circle cx="12" cy="12" r="3.5" /></svg></span>
          <span className="nn-activation-entry-copy"><small>Get started</small><b>{activation.label}</b></span>
          <span className="nn-activation-entry-progress"><span>{activation.done}/{activation.total}</span></span>
        </button>
        {menu === "activation" && (
          <div className="nn-activation-panel is-open" role="dialog" style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", zIndex: 90, width: 380, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, boxShadow: "0 18px 50px rgba(15,18,32,.16)", padding: 18 }}>
            <small style={{ fontSize: ".7rem", letterSpacing: ".08em", color: "var(--muted)", fontWeight: 700 }}>YOUR LAUNCH PLAN</small>
            <h3 style={{ margin: "6px 0 4px", fontSize: "1.05rem" }}>Launch your first creator collaboration</h3>
            <p className="muted" style={{ margin: "0 0 12px", fontSize: ".85rem" }}>Three guided actions take you from discovery to your first creator invitation.</p>
            <div className="muted" style={{ fontSize: ".78rem", marginBottom: 10 }}>{activation.total - activation.done} steps left</div>
            {[
              { t: "Discover the Marketplace", d: "Compare your matched creators by sector, reach, performance and price.", cta: "Explore", go: () => onNav("marketplace"), done: activation.done >= 1 },
              { t: "Create your first brief", d: "Open the guided editor and turn your campaign goal into creator-ready instructions.", cta: "Open", go: () => onNav("studio"), done: activation.done >= 2 },
              { t: "Book or negotiate with a creator", d: "Choose an offer, negotiate if needed, and send your first funded invitation.", cta: "Choose", go: () => { onNav("marketplace"); onBook(); }, done: activation.done >= 3 },
            ].map((s) => (
              <div key={s.t} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderTop: "1px solid var(--border)" }}>
                <div style={{ flex: 1 }}><b style={{ display: "block", fontSize: ".9rem" }}>{s.t}</b><span className="muted" style={{ fontSize: ".78rem" }}>{s.d}</span></div>
                <button type="button" className={`btn ${s.done ? "btn-ghost" : "btn-primary"}`} style={{ height: 32, padding: "0 12px", fontSize: ".8rem" }} onClick={() => { setMenu(null); s.go(); }}>{s.done ? "Done" : s.cta} →</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ position: "relative" }}>
        <button type="button" className="bell" aria-label="Notifications" aria-haspopup="dialog" aria-expanded={menu === "bell"} onClick={() => setMenu(menu === "bell" ? null : "bell")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M10.3 21a2 2 0 0 0 3.4 0" /></svg>
          <span className="dot" style={{ display: notices.length ? "inline-flex" : "none" }}>{notices.length}</span>
        </button>
        {menu === "bell" && (
          <div role="dialog" style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", zIndex: 90, width: 360, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, boxShadow: "0 18px 50px rgba(15,18,32,.16)", padding: 18 }}>
            <b style={{ display: "block", fontSize: "1rem" }}>Notifications</b>
            <span className="muted" style={{ fontSize: ".8rem" }}>Your next useful actions, in one place</span>
            <div style={{ marginTop: 12 }}>
              {notices.length === 0 ? (
                <div style={{ textAlign: "center", padding: "18px 0" }}><b style={{ display: "block" }}>You're all caught up</b><span className="muted" style={{ fontSize: ".8rem" }}>New activity on your campaigns will show up here.</span></div>
              ) : notices.map((n) => (
                <div key={n.id} style={{ padding: "10px 0", borderTop: "1px solid var(--border)" }}><b style={{ display: "block", fontSize: ".88rem" }}>{n.title}</b><span className="muted" style={{ fontSize: ".78rem" }}>{n.body}</span><div className="muted" style={{ fontSize: ".72rem", marginTop: 2 }}>{n.when}</div></div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="user-slot">
        <button type="button" className={`user-btn${menu === "user" ? " open" : ""}`} id="user-btn" aria-label="Account" aria-haspopup="menu" aria-expanded={menu === "user"} aria-controls="user-menu" onClick={() => setMenu(menu === "user" ? null : "user")}>
          <span className="ub-av"><span className="avatar-sm" style={{ background: "#0F1220" }}>{initials}</span></span>
          <span className="ub-txt"><b>{fullName}</b><span>{email}</span></span>
          <svg className="uchev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
        </button>
        <div className={`user-menu${menu === "user" ? " open" : ""}`} id="user-menu" role="menu" aria-labelledby="user-btn">
          <button type="button" className="nav-item" role="menuitem" onClick={() => { setMenu(null); onNav("marketplace"); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M18 8v6M21 11h-6" /></svg><span>Invite Creators</span>
          </button>
          <button type="button" className="nav-item" role="menuitem" onClick={() => { setMenu(null); window.open("/book", "_blank"); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></svg><span>Book a call</span>
          </button>
          <button type="button" className="nav-item" role="menuitem" onClick={() => { setMenu(null); onNav("integrations"); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.5 12.5 5 16a3 3 0 0 0 4.2 4.2l3.5-3.5" /><path d="m15.5 11.5 3.5-3.5A3 3 0 0 0 14.8 3.8l-3.5 3.5" /><path d="m9 15 6-6" /></svg><span>Integrations</span>
          </button>
          <button type="button" className="nav-item" role="menuitem" onClick={() => { setMenu(null); onNav("settings"); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6A7 7 0 0 0 5 12a7 7 0 0 0 .1 1.2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2L10 21h4l.5-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6A7 7 0 0 0 19 12z" /></svg><span>Settings</span>
          </button>
          <div className="sep" role="separator" />
          <button type="button" className="nav-item" role="menuitem" onClick={onSignOut}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg><span>Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
