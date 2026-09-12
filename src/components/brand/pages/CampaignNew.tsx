"use client";
import { useEffect, useRef, useState } from "react";
import type { Ctx } from "../BrandApp";

const Clouds = () => (
  <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute", overflow: "hidden" }}><defs><symbol id="cg-creator-clouds" viewBox="0 0 360 130"><path fill="none" stroke="rgba(255,255,255,.24)" strokeWidth="5" strokeLinecap="round" d="M24 26c35-14 72-15 105-4M275 24c23-8 45-7 66 2" /><path fill="rgba(255,255,255,.22)" d="M-30 91c18-14 39-15 56-5 4-20 25-31 44-24 11-24 45-29 63-9 17-11 40-3 46 17 18-7 40 4 44 21H-30Z" /><path fill="rgba(255,255,255,.22)" d="M205 78c11-14 30-18 45-8 7-21 36-28 53-10 15-12 40-5 45 16 13-3 28 3 38 17H205Z" /><path fill="rgba(255,255,255,.5)" d="M-28 108c16-19 43-24 64-12 7-25 33-40 56-31 14-26 52-31 73-8 19-12 44-3 50 20 18-5 39 7 44 29v24H-28Z" /><path fill="rgba(255,255,255,.5)" d="M190 102c12-16 35-20 52-8 8-25 39-35 61-18 18-14 48-4 54 21 14-3 30 4 40 19v14H190Z" /><path fill="rgba(255,255,255,.82)" d="M-26 126c17-22 49-28 72-13 14-25 49-31 72-12 19-17 50-13 64 8 21-10 50-2 60 20H-26Z" /><path fill="rgba(255,255,255,.82)" d="M237 129c14-18 40-23 59-11 14-23 48-28 68-7 12-5 27-2 38 9v10H237Z" /></symbol></defs></svg>
);

export function LaunchChooser({ ctx, onAi }: { ctx: Ctx; onAi: () => void }) {
  const [showLink, setShowLink] = useState(false);
  const [link, setLink] = useState("");
  const fromLink = async () => { const r = await ctx.api("campaign-from-link", { link }); if (r.ok) { ctx.toast("Brief imported — review it before launch"); ctx.nav(`campaigns/${r.id}/brief`); } };
  return (
    <section className="cg-launch" aria-label="Launch a campaign">
      <Clouds />
      <header className="cg-launch-head"><div className="cg-launch-title"><img className="cg-launch-mark" src="/lp/naano-logomark.png" alt="" width="36" height="36" aria-hidden="true" /><h2>How do you want to launch your campaign?</h2></div><p>Choose your method. You can change everything before launch.</p></header>
      <div className="cg-launch-grid">
        <article className="cg-launch-card">
          <div className="lc-visual lc-visual-team"><svg className="lc-clouds" viewBox="0 0 360 130" preserveAspectRatio="none" aria-hidden="true"><use href="#cg-creator-clouds" /></svg><div className="lc-team-avatars"><span className="lc-face" style={{ backgroundImage: "url('/lp/naano-team-face.jpg')" }} /></div><div className="lc-slot"><i /><span>Today · 14:30 · 15 min</span></div></div>
          <div className="lc-body"><h3>Launch free with the Naano team</h3><p>A campaign manager turns your selection into a ready-to-launch campaign. You validate, they handle the rest.</p><button type="button" className="lc-cta primary" onClick={() => window.open("/book", "_blank")}>Book my onboarding →</button></div>
        </article>
        <article className="cg-launch-card featured">
          <div className="lc-visual lc-visual-ai"><svg className="lc-clouds" viewBox="0 0 360 130" preserveAspectRatio="none" aria-hidden="true"><use href="#cg-creator-clouds" /></svg><div className="lc-orb" aria-hidden="true"><img src="/lp/naano-logomark.png" alt="" width="26" height="26" /></div><div className="lc-bubble">I want to reach VP Sales in B2B SaaS in France.</div></div>
          <div className="lc-body"><span className="lc-time">5 min</span><h3>Create with AI</h3><p>AI asks the right questions and prepares a fully editable brief.</p><button type="button" className="lc-cta" onClick={onAi}>Create with AI</button></div>
        </article>
        <article className="cg-launch-card">
          <div className="lc-visual lc-visual-link"><svg className="lc-clouds" viewBox="0 0 360 130" preserveAspectRatio="none" aria-hidden="true"><use href="#cg-creator-clouds" /></svg><div className="lc-url"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></svg>notion.site/brief…</div><div className="lc-arrow">↓</div><div className="lc-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "12px", height: "12px" }}><path d="M20 6 9 17l-5-5" /></svg><span>Brief recovered</span></div></div>
          <div className="lc-body">
            <span className="lc-time green">1 min</span><h3>Start from your link</h3><p>Paste an influence campaign you already ran: Naano reuses the brief and structure.</p>
            <div className={`link-panel${showLink ? " is-open" : ""}`} style={showLink ? { display: "flex" } : undefined}><input className="url-input" type="url" inputMode="url" placeholder="https://notion.site/brief…" value={link} onChange={(e) => setLink(e.target.value)} /><button type="button" className="url-submit" onClick={fromLink}>Create →</button></div>
            {!showLink && <button type="button" className="lc-cta" onClick={() => setShowLink(true)}>Start from my link</button>}
          </div>
        </article>
      </div>
    </section>
  );
}

export default function CampaignNew({ ctx }: { ctx: Ctx }) {
  const [mode, setMode] = useState<"choice" | "ai">(ctx.route.parts[0] === "ai" ? "ai" : "choice");
  const [chatId, setChatId] = useState<string | null>(null);
  const [msgs, setMsgs] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [created, setCreated] = useState<string | null>(null);
  const feed = useRef<HTMLDivElement>(null);
  useEffect(() => { feed.current?.scrollTo({ top: 1e6, behavior: "smooth" }); }, [msgs, busy]);
  const send = async () => {
    const text = input.trim(); if (!text || busy) return;
    setMsgs((m) => [...m, { role: "user", content: text }]); setInput(""); setBusy(true);
    const r = await ctx.api("campaign-ai", { chatId, message: text });
    setBusy(false);
    if (r.ok) { setChatId(r.chatId as string); setMsgs((m) => [...m, { role: "assistant", content: r.reply as string }]); if (r.campaignId) setCreated(r.campaignId as string); }
  };
  const history = ctx.snap.chats;
  return (
    <section className="page visible" id="page-campaign-new">
      <div className="cg-wrap">
        <div id="cg-topbar" className="cg-topbar is-on" aria-label="Campaign navigation" style={{ display: "grid" }}>
          <button type="button" id="cg-back" className="cg-back-ico" aria-label="Back" title="Back" onClick={() => (mode === "ai" ? setMode("choice") : ctx.nav("campaigns"))}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg></button>
          <div className="cg-title-wrap"><span className="cg-chat-title-text" style={{ fontWeight: 600 }}>{mode === "ai" ? "Create with AI" : "New campaign"}</span></div>
          <span className="cg-topbar-end" aria-hidden="true" />
        </div>
        {mode === "choice" ? (
          <div id="cg-choice" className="cg-launch-choice" style={{ display: "block" }}><LaunchChooser ctx={ctx} onAi={() => setMode("ai")} /></div>
        ) : (
          <>
            <div id="cg-chat" style={{ display: "block" }}>
              {msgs.length === 0 && (
                <div id="cg-hello" style={{ display: "block" }}><div className="cg-hero-block"><div className="cg-hero"><img className="cg-hero-mark" src="/lp/naano-logomark.png" alt="" width="38" height="38" aria-hidden="true" /><h1 className="cg-hero-t">Generate your campaign in one click</h1><svg className="ink-line" viewBox="0 0 120 12" aria-hidden="true"><path d="M3 7C26 2 46 10 68 6S104 4 117 6" /></svg></div></div></div>
              )}
              <div className="cg-msgs" id="cg-msgs" ref={feed}>
                {msgs.map((m, i) => <div key={i} className={`cg-msg ${m.role === "user" ? "me" : "ai"}`} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", margin: "8px 0" }}><div className="cg-bubble" style={{ maxWidth: "78%", padding: "12px 16px", borderRadius: 16, background: m.role === "user" ? "var(--blue)" : "#fff", color: m.role === "user" ? "#fff" : "var(--text)", border: m.role === "user" ? 0 : "1px solid var(--border)", whiteSpace: "pre-wrap", fontSize: ".92rem", lineHeight: 1.5 }}>{m.content}</div></div>)}
                {busy && <div className="cg-msg ai" style={{ margin: "8px 0" }}><div className="cg-bubble muted" style={{ display: "inline-block", padding: "10px 16px", borderRadius: 16, background: "#fff", border: "1px solid var(--border)" }}>Naano is writing…</div></div>}
                {created && <div className="card" style={{ padding: 16, marginTop: 10, display: "flex", alignItems: "center", gap: 12 }}><iconify-icon icon="ph:check-circle" style={{ fontSize: 22, color: "var(--green)" }} /><div style={{ flex: 1 }}><b>Your campaign draft is ready</b><div className="muted" style={{ fontSize: ".84rem" }}>Review the brief, then invite creators from the marketplace.</div></div><button className="btn btn-primary" onClick={() => ctx.nav(`campaigns/${created}/brief`)}>Open the brief →</button></div>}
              </div>
              <div className="cg-composer">
                <textarea id="cg-input" rows={2} placeholder="Let’s build this campaign together…" style={{ height: "52px" }} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} />
                <div className="cg-bar"><button type="button" className="cg-send" aria-label="Send" disabled={busy} onClick={send}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 19V5" /><path d="m5 12 7-7 7 7" /></svg></button></div>
              </div>
            </div>
            <div id="cg-history-panel" className="cg-history-panel" style={{ display: "block" }}>
              <section className="cg-history" aria-labelledby="cg-history-label">
                <div className="cg-history-label" id="cg-history-label">History</div>
                <div className="cg-history-list" id="cg-history-list" aria-live="polite">
                  {history.length === 0 ? (
                    <div className="cg-history-empty"><iconify-icon icon="ph:chat-circle-dots" /><b>No discussion yet.</b><br />Your next AI-generated campaign will appear here.</div>
                  ) : history.map((h) => <button key={h.id} type="button" className="cg-history-item" style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 12px", border: "1px solid var(--border)", borderRadius: 12, background: "#fff", marginBottom: 8, cursor: "pointer" }} onClick={() => { setChatId(h.id); setMsgs(h.messages); }}><b style={{ display: "block", fontSize: ".86rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.messages[0]?.content ?? "Conversation"}</b><small className="muted">{new Date(h.created_at).toLocaleDateString("en-GB")}</small></button>)}
                </div>
              </section>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
