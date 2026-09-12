"use client";
import { useEffect, useRef, useState } from "react";
import type { Ctx } from "../BrandApp";
import { creatorBySlug } from "@/data/creators";
import { CreatorAvatar } from "../Avatar";
import { initials } from "@/lib/format";

const EMOJI = ["👍", "👏", "🙌", "🎉", "🔥", "💡", "✅", "❤️", "😊", "😂", "👀", "🚀"];

export default function Messages({ ctx }: { ctx: Ctx }) {
  const { snap } = ctx;
  const [active, setActive] = useState<string>("naanobot");
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const [q, setQ] = useState("");
  const feed = useRef<HTMLDivElement>(null);
  const bot = snap.conversations.find((c) => c.kind === "assistant");
  const threads = snap.conversations.filter((c) => c.kind === "booking").filter((c) => { const b = snap.bookings.find((x) => x.id === c.booking_id); const n = b ? creatorBySlug(b.creator_slug)?.name ?? "" : ""; return !q || n.toLowerCase().includes(q.toLowerCase()); });
  const current = active === "naanobot" ? bot : snap.conversations.find((c) => c.id === active);
  const currentBooking = current?.booking_id ? snap.bookings.find((x) => x.id === current.booking_id) : null;
  const currentCreator = currentBooking ? creatorBySlug(currentBooking.creator_slug) : null;
  useEffect(() => { feed.current?.scrollTo({ top: 1e6 }); }, [current?.messages.length, active, busy]);
  const send = async (body?: string) => {
    const t = (body ?? text).trim(); if (!t || busy) return;
    setText(""); setBusy(true);
    await ctx.api("message", { conversationId: active === "naanobot" ? "naanobot" : active, body: t });
    setBusy(false);
  };
  const fullName = `${snap.user.firstName} ${snap.user.lastName}`;
  const rail: [string, string, string][] = [["overview", "Overview", "M4 13h6V4H4v9Zm10 7h6V11h-6v9ZM4 20h6v-3H4v3Zm10-13h6V4h-6v3Z"], ["marketplace", "Creators", "M4 10h16M5 10l1-5h12l1 5v9H5v-9Zm4 9v-5h6v5"]];
  return (
    <section className="page visible" id="page-messages">
      <div className="page-head"><h1>Messages</h1><svg className="ink-line" viewBox="0 0 120 12" aria-hidden="true"><path d="M3 7C26 2 46 10 68 6S104 4 117 6" /></svg><div className="page-sub">Talk with your creators and your communities.</div></div>
      <div className="msg-app card rise" data-nn-entered="1" style={{ animationDelay: "0ms" }}>
        <nav className="msg-icon-rail" aria-label="Main navigation">
          <button className="msg-rail-brand" type="button" aria-label="Naano — Home" onClick={() => ctx.nav("overview")}><span className="msg-rail-logo"><img src="/logo.svg" alt="" /></span><span className="msg-rail-brand-name">naano</span></button>
          <div className="msg-rail-menu">
            {rail.map(([p, l, d]) => <button key={p} className="msg-rail-item" type="button" title={l} onClick={() => ctx.nav(p)}><span className="msg-rail-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg></span><span className="msg-rail-label">{l}</span></button>)}
            <button className="msg-rail-item" type="button" title="Campaigns" onClick={() => ctx.nav("campaigns")}><span className="msg-rail-icon"><iconify-icon icon="ph:stack" /></span><span className="msg-rail-label">Campaigns</span></button>
            <button className="msg-rail-item" type="button" title="Results" onClick={() => ctx.nav("results")}><span className="msg-rail-icon"><iconify-icon icon="ph:chart-line-up" /></span><span className="msg-rail-label">Results</span></button>
            <button className="msg-rail-item active" type="button" aria-current="page"><span className="msg-rail-icon"><iconify-icon icon="ph:chat-circle" /></span><span className="msg-rail-label">Messages</span></button>
            <button className="msg-rail-item" type="button" title="Billing" onClick={() => ctx.nav("billing")}><span className="msg-rail-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v11H4V7Zm0 4h16M7 15h4" /></svg></span><span className="msg-rail-label">Billing</span></button>
            <span className="msg-rail-spacer" />
          </div>
          <div className="msg-rail-bottom"><button className="msg-rail-account" type="button" title="Account" onClick={() => ctx.nav("settings")}><span className="msg-rail-account-avatar">{initials(fullName)}</span><span className="msg-rail-label">{fullName}</span></button></div>
        </nav>
        <div className="msg-list">
          <h3>Conversations</h3>
          <div className="msg-inbox-head"><h1>Messages</h1><svg className="ink-line" viewBox="0 0 120 12" aria-hidden="true"><path d="M3 7C26 2 46 10 68 6S104 4 117 6" /></svg><button className="msg-inbox-compose" type="button" aria-label="New message" title="New message" onClick={() => ctx.nav("marketplace")}><svg viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" /></svg></button></div>
          <div className="msg-search-wrap"><label className="msg-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg><input type="search" placeholder="Search conversations" aria-label="Search conversations" value={q} onChange={(e) => setQ(e.target.value)} /></label></div>
          <div className="msg-inbox-modes"><div className="msg-mode-switch" aria-label="Message display mode"><button className="msg-mode-button is-active" type="button">All messages</button><button className="msg-mode-button" type="button" aria-haspopup="listbox" title="Choose a campaign"><span>Campaign</span><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 7.5 5 5 5-5" /></svg></button></div></div>
          <button className={`msg-pin-card${active === "naanobot" ? " is-active" : ""}`} type="button" aria-pressed={active === "naanobot"} onClick={() => setActive("naanobot")}>
            <span className="msg-pin-logo"><img src="/logo.svg" alt="" /></span>
            <span className="msg-pin-copy"><span><b>NaanoBot</b></span><p>Have a question or need help? Click here.</p></span>
            <span className="msg-pin-side"><span>Now</span><span className="msg-pin-count">1</span></span>
          </button>
          <div id="conv-list">
            {threads.length === 0 ? <div className="muted" style={{ padding: "18px", fontSize: ".88rem" }}>No conversations yet.</div> : threads.map((c) => { const b = snap.bookings.find((x) => x.id === c.booking_id); const cr = b ? creatorBySlug(b.creator_slug) : null; const last = c.messages[c.messages.length - 1]; return (
              <button key={c.id} type="button" className={`conv${active === c.id ? " on" : ""}`} style={{ display: "flex", gap: 10, width: "100%", textAlign: "left", padding: "12px 14px", border: 0, borderBottom: "1px solid var(--border)", background: active === c.id ? "var(--blue-soft)" : "transparent", cursor: "pointer" }} onClick={() => setActive(c.id)}>
                <CreatorAvatar name={cr?.name ?? "?"} className="avatar-sm nn-avatar-initials" size={36} />
                <span style={{ minWidth: 0, flex: 1 }}><b style={{ display: "block", fontSize: ".9rem" }}>{cr?.name}</b><span className="muted" style={{ fontSize: ".8rem", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{last?.body}</span></span>
              </button>
            ); })}
          </div>
        </div>
        <div className="chat">
          <div className="chat-head" id="chat-head">
            {active === "naanobot" ? (
              <div className="nn-support-head"><span className="nn-support-head-logo"><img src="/logo.svg" alt="" /></span><span className="nn-support-head-copy"><b>Naano help center</b><span><i className="nn-support-live" />Instant assistant · team when needed</span></span></div>
            ) : (
              <div className="nn-support-head"><CreatorAvatar name={currentCreator?.name ?? "?"} className="nn-support-head-logo nn-avatar-initials" size={40} /><span className="nn-support-head-copy"><b>{currentCreator?.name}</b><span>{currentBooking?.posts} post{(currentBooking?.posts ?? 1) > 1 ? "s" : ""} · {currentBooking?.status.replace(/_/g, " ")}</span></span></div>
            )}
          </div>
          <div className={`chat-body${active === "naanobot" ? " is-support" : ""}`} id="chat-body" ref={feed}>
            {active === "naanobot" ? (
              <div className="nn-support-feed">
                <div className="nn-support-start">
                  <section className="nn-support-welcome">
                    <div className="nn-support-hero">
                      <div className="nn-support-hero-copy"><span className="nn-support-kicker"><svg viewBox="0 0 24 24"><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /></svg>Your Naano space</span><h2>How can we help?</h2><p>Product question, bug or performance concern: everything stays here and the team steps in when needed.</p></div>
                      <div className="nn-support-hero-mark"><span className="nn-support-orbit" role="button" tabIndex={0}><i className="nn-support-orbit-dot" /><span className="nn-support-logo-orb"><img src="/logo.svg" alt="" /></span></span><span className="nn-support-availability"><i />Available now</span></div>
                    </div>
                    <div className="nn-support-actions">
                      {[["Understand my performance", "Review your analytics", "M3 3v18h18M8 17v-3M13 17V9M18 17V5", "How do I read my results and improve performance?"], ["Get product help", "Get an instant answer", "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z", "How does booking and payment work on Naano?"], ["Report a bug", "Escalated when needed", "M8 8a4 4 0 0 1 8 0v6a4 4 0 0 1-8 0V8Z", "I want to report a bug."], ["Suggest an idea", "Share product feedback", "M20 15a4 4 0 0 1-4 4H8l-5 3V8a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4v7Z", "I have a product idea to suggest."]].map(([t, s, d, msg]) => (
                        <button key={t} className="nn-support-action" type="button" onClick={() => send(msg)}><span className="nn-support-action-icon"><svg className="nn-support-action-glyph" viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg></span><span className="nn-support-action-copy"><b>{t}</b><small>{s}</small></span><iconify-icon className="nn-support-action-arrow" icon="ph:arrow-up-right" /></button>
                      ))}
                    </div>
                  </section>
                </div>
                <div className="nn-support-thread">
                  <div className="nn-support-message "><span className="nn-support-avatar"><img src="/logo.svg" alt="" /></span><div><div className="nn-support-message-bubble">Hi, I’m the Naano assistant. Ask me a question or choose an option above — the team can step in if needed.</div><div className="nn-support-message-meta">Naano</div></div></div>
                  {(bot?.messages ?? []).map((m) => (
                    <div key={m.id} className={`nn-support-message${m.sender === "brand" ? " is-me" : ""}`} style={m.sender === "brand" ? { flexDirection: "row-reverse" } : undefined}>
                      <span className="nn-support-avatar">{m.sender === "brand" ? <span className="avatar-sm" style={{ background: "#0F1220", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", borderRadius: 999 }}>{initials(fullName)}</span> : <img src="/logo.svg" alt="" />}</span>
                      <div><div className="nn-support-message-bubble" style={m.sender === "brand" ? { background: "var(--blue)", color: "#fff" } : undefined}>{m.body}</div><div className="nn-support-message-meta" style={m.sender === "brand" ? { textAlign: "right" } : undefined}>{m.sender === "brand" ? "You" : "Naano"} · {new Date(m.created_at + "Z").toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</div></div>
                    </div>
                  ))}
                  {busy && <div className="nn-support-message"><span className="nn-support-avatar"><img src="/logo.svg" alt="" /></span><div><div className="nn-support-message-bubble muted">Thinking…</div></div></div>}
                </div>
              </div>
            ) : current ? (
              <div className="nn-support-thread" style={{ padding: 18 }}>
                {current.messages.map((m) => (
                  <div key={m.id} className="nn-support-message" style={m.sender === "brand" ? { flexDirection: "row-reverse" } : undefined}>
                    <span className="nn-support-avatar">{m.sender === "brand" ? <span className="avatar-sm" style={{ background: "#0F1220", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", borderRadius: 999 }}>{initials(fullName)}</span> : m.sender === "system" ? <img src="/logo.svg" alt="" /> : <CreatorAvatar name={currentCreator?.name ?? "?"} className="nn-avatar-initials" size={32} />}</span>
                    <div><div className="nn-support-message-bubble" style={m.sender === "brand" ? { background: "var(--blue)", color: "#fff" } : undefined}>{m.body}</div><div className="nn-support-message-meta">{m.sender === "brand" ? "You" : m.sender === "system" ? "Naano" : currentCreator?.first}</div></div>
                  </div>
                ))}
                {currentBooking?.status === "invited" && <p className="muted" style={{ fontSize: ".82rem", textAlign: "center" }}>The thread opens fully once {currentCreator?.first} accepts the invitation.</p>}
              </div>
            ) : null}
          </div>
          <div className={`chat-compose${active === "naanobot" ? " is-support" : ""}`} id="chat-compose">
            <div className="chat-input">
              <button className="msg-compose-add" type="button" aria-label="Add an image, video or PDF" title="Add an image, video or PDF" onClick={() => ctx.toast("Attachments are available once the creator accepts")}>+</button>
              <div className="msg-compose-field" style={{ position: "relative" }}>
                <input id="chat-text" aria-label="Write a message…" placeholder={active === "naanobot" ? "Ask Naano a question…" : "Write a message…"} value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") send(); }} />
                <button className="msg-compose-emoji" type="button" aria-label="Add an emoji" onClick={() => setEmoji((v) => !v)}><svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></svg></button>
                {emoji && <div className="msg-emoji-popover" role="dialog" aria-label="Choose an emoji"><div className="msg-emoji-popover-title"><span>Quick reactions</span><span>12 emojis</span></div><div className="msg-emoji-grid">{EMOJI.map((e) => <button key={e} type="button" onClick={() => { setText((t) => t + e); setEmoji(false); }}>{e}</button>)}</div></div>}
              </div>
              <button className="btn btn-primary msg-send" type="button" onClick={() => send()} disabled={busy}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
