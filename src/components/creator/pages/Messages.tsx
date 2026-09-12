"use client";
import { useEffect, useRef, useState } from "react";
import type { CCtx } from "../CreatorApp";
import { initials } from "@/lib/format";

export default function CMessages({ ctx }: { ctx: CCtx }) {
  const { snap } = ctx;
  const [active, setActive] = useState("naanobot"); const [text, setText] = useState(""); const [busy, setBusy] = useState(false); const [q, setQ] = useState("");
  const feed = useRef<HTMLDivElement>(null);
  const bot = snap.conversations.find((c) => c.kind === "assistant");
  const threads = snap.conversations.filter((c) => c.kind === "booking" && (!q || (c.company?.name ?? "").toLowerCase().includes(q.toLowerCase())));
  const cur = active === "naanobot" ? bot : snap.conversations.find((c) => c.id === active);
  useEffect(() => { feed.current?.scrollTo({ top: 1e6 }); }, [cur?.messages.length, active, busy]);
  const send = async () => { const t = text.trim(); if (!t || busy) return; setText(""); setBusy(true); await ctx.api("message", { conversationId: active, body: t }); setBusy(false); };
  const me = initials(`${snap.user.firstName} ${snap.user.lastName}`);
  const Bubble = ({ m }: { m: { id: number; sender: string; body: string } }) => { const mine = m.sender === "creator"; return <div className="nn-support-message" style={mine ? { flexDirection: "row-reverse" } : undefined}><span className="nn-support-avatar">{mine ? <span style={{ display: "inline-flex", width: "100%", height: "100%", borderRadius: 999, background: "#0F1220", color: "#fff", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{me}</span> : m.sender === "brand" ? <span style={{ display: "inline-flex", width: "100%", height: "100%", borderRadius: 999, background: "#E6EDFF", color: "#1D5BF5", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{initials(cur?.company?.name ?? "B")}</span> : <img src="/logo.svg" alt="" />}</span><div><div className="nn-support-message-bubble" style={mine ? { background: "var(--blue,#1D5BF5)", color: "#fff" } : undefined}>{m.body}</div><div className="nn-support-message-meta">{mine ? "You" : m.sender === "brand" ? cur?.company?.name : "Naano"}</div></div></div>; };
  return (
    <section className="page visible" id="page-messages" data-screen-label="Messages">
      <div className="msg-app cr-msgs card">
        <div className="msg-list cr-msg-list-col">
          <div className="msg-inbox-head"><h1>Messages</h1></div>
          <div className="msg-search-wrap"><label className="msg-search"><input type="search" placeholder="Search conversations" value={q} onChange={(e) => setQ(e.target.value)} /></label></div>
          <button className={`msg-pin-card cr-msg-pin-card${active === "naanobot" ? " is-active" : ""}`} type="button" aria-pressed={active === "naanobot"} onClick={() => setActive("naanobot")}><span className="msg-pin-logo cr-msg-pin-logo"><img src="/logo.svg" alt="" /></span><span className="msg-pin-copy cr-msg-pin-copy"><span><b>NaanoBot</b></span><p>A question or need help? Start here.</p></span><span className="msg-pin-side cr-msg-pin-side"><span>Now</span><span className="msg-pin-count">1</span></span></button>
          <div id="conv-list">{threads.length === 0 ? <div className="muted" style={{ padding: 18, fontSize: ".88rem" }}>No conversations yet - the thread opens with your first Booking.</div> : threads.map((c) => <button key={c.id} type="button" style={{ display: "flex", gap: 10, width: "100%", textAlign: "left", padding: "12px 14px", border: 0, borderBottom: "1px solid var(--border,#E7EAF1)", background: active === c.id ? "var(--blue-soft,#EAF0FF)" : "transparent", cursor: "pointer" }} onClick={() => setActive(c.id)}><span style={{ display: "inline-flex", width: 36, height: 36, borderRadius: 999, background: "#E6EDFF", color: "#1D5BF5", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12 }}>{initials(c.company?.name ?? "B")}</span><span style={{ minWidth: 0, flex: 1 }}><b style={{ display: "block", fontSize: ".9rem" }}>{c.company?.name}</b><span className="muted" style={{ fontSize: ".8rem", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.messages[c.messages.length - 1]?.body}</span></span></button>)}</div>
        </div>
        <div className="chat">
          <div className="chat-head"><div><b>{active === "naanobot" ? "Naano help center" : cur?.company?.name ?? "Messages"}</b><span className="muted" style={{ fontSize: ".82rem", display: "block" }}>{active === "naanobot" ? "Instant assistant · team when needed" : cur ? "Booking thread" : "Select a conversation"}</span></div></div>
          <div className="chat-body" ref={feed} style={{ padding: 18 }}>
            <div className="nn-support-thread">
              {active === "naanobot" && <div className="nn-support-message"><span className="nn-support-avatar"><img src="/logo.svg" alt="" /></span><div><div className="nn-support-message-bubble">Hi {snap.user.firstName}, I’m the Naano assistant. Ask about your card, opportunities, drafts or payouts — the team steps in when needed.</div><div className="nn-support-message-meta">Naano</div></div></div>}
              {(cur?.messages ?? []).map((m) => <Bubble key={m.id} m={m} />)}
              {busy && <div className="nn-support-message"><span className="nn-support-avatar"><img src="/logo.svg" alt="" /></span><div><div className="nn-support-message-bubble muted">Thinking…</div></div></div>}
            </div>
          </div>
          <div className="chat-compose"><div className="chat-input"><div className="msg-compose-field"><input placeholder="Write a message…" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") send(); }} /></div><button className="btn btn-primary" type="button" disabled={busy} onClick={send}>Send</button></div></div>
        </div>
      </div>
    </section>
  );
}
