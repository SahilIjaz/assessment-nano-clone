"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Site assistant: the prompt bar pinned to the bottom of every public page. A resting 340px pill grows to 680px when
 * engaged; the transcript floats above it; the small handle minimises everything to a bubble in the corner.
 * Replies come from /api/chat (Gemini/Claude grounded in llms.txt + pricing.md, with deterministic fallbacks).
 */
type Msg = { id: string; role: "user" | "assistant"; content: string; enter?: boolean; reveal?: boolean };

const STORAGE = "nn-chat";
const PLACEHOLDERS = ["What would you like to see?", "What would you like to do?", "What can I help you find?"];
const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

/** Splits text into word/char spans so the newest reply fades in character by character. */
function Reveal({ text }: { text: string }) {
  const words = text.split(/(\s+)/);
  let w = 0;
  return (
    <>
      {words.map((part, i) => {
        if (!part) return null;
        if (/^\s+$/.test(part)) return <span key={i}>{part}</span>;
        const idx = w++;
        return (
          <span key={i} className="nnc-gw" style={{ ["--w" as string]: idx }}>
            {[...part].map((ch, c) => (
              <span key={c} className="nnc-gc" style={{ ["--c" as string]: c }}>{ch}</span>
            ))}
          </span>
        );
      })}
    </>
  );
}

/** Six-dot ring mark that slowly rotates while idle and turns blue while a reply is generated. */
const Mark = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <ellipse cx="12" cy="4" rx="2.7" ry="1.9" />
    <ellipse cx="18.9" cy="8" rx="2.7" ry="1.9" transform="rotate(60 18.9 8)" />
    <ellipse cx="18.9" cy="16" rx="2.7" ry="1.9" transform="rotate(120 18.9 16)" />
    <ellipse cx="12" cy="20" rx="2.7" ry="1.9" />
    <ellipse cx="5.1" cy="16" rx="2.7" ry="1.9" transform="rotate(60 5.1 16)" />
    <ellipse cx="5.1" cy="8" rx="2.7" ry="1.9" transform="rotate(120 5.1 8)" />
  </svg>
);

export default function ChatWidget() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [lift, setLift] = useState(48);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const convRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Restore the conversation for this tab.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE);
      if (raw) {
        const saved = JSON.parse(raw) as { messages?: Msg[]; collapsed?: boolean };
        if (Array.isArray(saved.messages)) setMessages(saved.messages.map((m) => ({ ...m, enter: false, reveal: false })));
        if (saved.collapsed) setCollapsed(true);
      }
    } catch { /* storage unavailable */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { sessionStorage.setItem(STORAGE, JSON.stringify({ messages: messages.map(({ id, role, content }) => ({ id, role, content })), collapsed })); } catch { /* ignore */ }
  }, [messages, collapsed, ready]);

  const hasMessages = messages.length > 0;
  const engaged = focused || input.length > 0 || open;
  const rootRef = useRef<HTMLDivElement>(null);

  // The transcript closes on Escape or a click anywhere outside the widget, and comes back when the bar is used again.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); inputRef.current?.blur(); } };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);
  useEffect(() => { if (collapsed) setOpen(false); }, [collapsed]);

  // Keep the handle riding on the top edge of whatever is showing (transcript or pill).
  useLayoutEffect(() => {
    const el = convRef.current;
    if (!el) return;
    const measure = () => setLift(open ? Math.round(el.getBoundingClientRect().height / (open ? 1 : 0.985)) + 36 : 48);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, messages.length]);

  // Auto-grow the textarea and keep the transcript scrolled to the newest entry.
  useLayoutEffect(() => {
    const t = inputRef.current;
    if (!t) return;
    t.style.height = "0px";
    t.style.height = Math.min(96, Math.max(22, t.scrollHeight)) + "px";
  }, [input, generating]);
  useEffect(() => {
    const s = scrollRef.current;
    if (s) s.scrollTop = s.scrollHeight;
  }, [messages, open]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || generating) return;
    const user: Msg = { id: uid(), role: "user", content: text, enter: true };
    const history = [...messages, user];
    setMessages(history);
    setInput("");
    setCollapsed(false);
    setOpen(true);
    setGenerating(true);
    const ac = new AbortController();
    abortRef.current = ac;
    let reply = "";
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-12).map(({ role, content }) => ({ role, content })) }),
        signal: ac.signal,
      });
      const j = (await r.json()) as { reply?: string; error?: string };
      reply = j.reply || j.error || "Sorry, I couldn't answer that. Try again or write to info@naano.com.";
    } catch (e) {
      if ((e as Error).name === "AbortError") { setGenerating(false); return; }
      reply = "I couldn't reach the assistant. Please try again in a moment.";
    }
    abortRef.current = null;
    setGenerating(false);
    setMessages((m) => [...m, { id: uid(), role: "assistant", content: reply, enter: true, reveal: true }]);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [input, generating, messages]);

  const stop = () => { abortRef.current?.abort(); abortRef.current = null; setGenerating(false); };

  // Toggled on click (after the browser has finished dispatching the tap) so the handle can move away without the
  // synthesised click landing on whatever sits underneath it. pointerdown is cancelled only to keep the input focus.
  const toggleCollapsed = () => {
    if (collapsed) { setCollapsed(false); requestAnimationFrame(() => inputRef.current?.focus()); }
    else { inputRef.current?.blur(); setOpen(false); setCollapsed(true); }
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); void send(); }
    if (e.key === "Escape") { setOpen(false); inputRef.current?.blur(); }
  };

  const empty = input.trim().length === 0;
  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");

  return (
    <div ref={rootRef} className="nnc" style={{ ["--nnc-lift" as string]: `${lift}px` }} data-ready={ready ? "true" : "false"}>
      <aside ref={convRef} className="nnc-conv" data-open={open ? "true" : "false"} data-engaged={engaged ? "true" : "false"} aria-hidden={!open} aria-label="Conversation">
        <div className="nnc-conv-surface">
          <div ref={scrollRef} className="nnc-conv-scroll">
            <ol className="nnc-conv-list">
              {messages.map((m) => (
                <li key={m.id} className={`nnc-msg nnc-msg--${m.role}`} data-enter={m.enter ? "true" : "false"}>
                  <p className="nnc-msg-text">{m.reveal && m.id === lastAssistant?.id ? <Reveal text={m.content} /> : m.content}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </aside>

      <button
        type="button"
        className="nnc-handle"
        data-collapsed={collapsed ? "true" : "false"}
        aria-expanded={!collapsed}
        aria-label={collapsed ? "Open Naano assistant" : "Minimize Naano assistant"}
        title={collapsed ? "Open assistant" : "Minimize"}
        onPointerDown={(e) => e.preventDefault()}
        onClick={toggleCollapsed}
      >
        <svg className="nnc-handle-chevron" width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 7.25 6 3.75l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <svg className="nnc-handle-bubble" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.937 1.25 22.75 6.06293 22.75 12C22.75 17.937 17.937 22.75 12 22.75C10.1437 22.75 8.39536 22.2788 6.87016 21.4493L2.63727 22.2373C2.39422 22.2826 2.14448 22.2051 1.96967 22.0303C1.79485 21.8555 1.71742 21.6058 1.76267 21.3627L2.55076 17.1298C1.72113 15.6046 1.25 13.8563 1.25 12Z" fill="currentColor" /></svg>
      </button>

      <aside className="nnc-panel" data-engaged={engaged ? "true" : "false"} data-has-messages={hasMessages ? "true" : "false"} data-generating={generating ? "true" : "false"} data-collapsed={collapsed ? "true" : "false"} aria-hidden={collapsed} aria-label="Naano assistant">
        <span className="nnc-mark" aria-hidden="true"><Mark /></span>
        <div className="nnc-island">
          <form className="nnc-entry" data-empty={empty ? "true" : "false"} onSubmit={(e) => { e.preventDefault(); void send(); }}>
            <label className="nnc-sr" htmlFor="nn-chat-input">Chat message</label>
            <span className="nnc-attach" aria-hidden="true" />
            {generating ? (
              <div className="nnc-thinking" aria-live="polite">
                <span className="nnc-thinking-text" data-text="Thinking"><span className="nnc-thinking-word" style={{ ["--w" as string]: 0 }}>Thinking</span></span>
              </div>
            ) : (
              <div className="nnc-body">
                <span className="nnc-ph" aria-hidden="true">
                  {PLACEHOLDERS.map((p) => <span key={p}>{p}</span>)}
                </span>
                <textarea
                  id="nn-chat-input"
                  ref={inputRef}
                  className="nnc-input"
                  rows={1}
                  autoComplete="off"
                  enterKeyHint="send"
                  placeholder={PLACEHOLDERS[0]}
                  aria-label="Ask Naano anything"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  onFocus={() => { setFocused(true); if (hasMessages) setOpen(true); }}
                  onBlur={() => setFocused(false)}
                />
              </div>
            )}
            <div className="nnc-actions">
              <button
                type="button"
                className="nnc-send"
                data-empty={empty ? "true" : "false"}
                data-generating={generating ? "true" : "false"}
                aria-label={generating ? "Stop" : empty ? "Ask a question" : "Send"}
                title={generating ? "Stop" : empty ? "Ask a question" : "Send"}
                onClick={() => { if (generating) stop(); else if (empty) inputRef.current?.focus(); else void send(); }}
              >
                <svg className="nnc-send-icon" viewBox="0 0 19 19" fill="none" aria-hidden="true"><path d="M9.5 16.5V3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M3.96094 8.54167L9.5026 3L15.0443 8.54167" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <svg className="nnc-voice-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 10v4M9.7 6.5v11M14.3 8.8v6.4M19 10v4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
                <span className="nnc-stop-icon" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </aside>
    </div>
  );
}
