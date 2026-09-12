"use client";
import { useState } from "react";
import type { CCtx } from "../CreatorApp";

const PROVIDERS = [["claude", "Claude", "Use Naano from Claude or Cowork.", "Connect Claude"], ["chatgpt", "ChatGPT", "Use Naano from a custom ChatGPT app.", "Connect ChatGPT"], ["gemini", "Gemini CLI", "Use Naano from Google Gemini CLI.", "Connect Gemini"], ["cursor", "Cursor", "Use Naano from Cursor agents.", "Connect Cursor"], ["copilot", "GitHub Copilot", "Use Naano from Copilot Chat in VS Code.", "Connect Copilot"], ["other", "Other MCP client", "Use any remote MCP client that supports OAuth.", "Connect another app"]];

export default function CIntegrations({ ctx }: { ctx: CCtx }) {
  const [open, setOpen] = useState<string | null>(null);
  const endpoint = `${typeof window !== "undefined" ? window.location.origin : ""}/api/mcp`;
  return (
    <section className="page visible" id="page-integrations" data-screen-label="Integrations">
      <div className="crmcp-shell">
        <header className="crmcp-hero"><div><span className="crmcp-eyebrow">Integrations</span><h1>Connect your AI assistant</h1><p>Connect Claude, ChatGPT, Gemini, Cursor, Copilot or another compatible MCP assistant to your own Naano account.</p></div><span className="crmcp-access available"><iconify-icon icon="ph:check-circle" aria-hidden="true" /><span>Available</span></span></header>
        <div className="crmcp-panel">
          <div className="crmcp-intro"><iconify-icon icon="ph:magic-wand" aria-hidden="true" /><div><b>Stay focused on the collaboration, not the admin</b><span>Review briefs and conversations, then prepare the next step from the AI tool you already use.</span></div></div>
          <div className="crmcp-provider-grid">
            {PROVIDERS.map(([k, t, s, cta]) => <article className="crmcp-provider" key={k}><span className={`crmcp-provider-mark ${k}`} aria-hidden="true" /><div className="crmcp-provider-copy"><b>{t}</b><span>{s}</span></div><div className="crmcp-provider-action"><span className="crmcp-status available">Available</span><button type="button" className="crmcp-connect" aria-expanded={open === k} onClick={() => setOpen(open === k ? null : k)}>{cta}</button></div></article>)}
          </div>
          {open && <div className="card" style={{ padding: 18, marginTop: 14 }}><b>Set up {PROVIDERS.find((p) => p[0] === open)![1]}</b><ol style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: ".9rem", lineHeight: 1.7 }}><li>Add a remote MCP server with transport “Streamable HTTP”.</li><li>Endpoint: <code>{endpoint}</code> · Auth: OAuth 2.1 (no API key).</li><li>Approve the consent screen for your creator account.</li><li>Every action is confirmed inside the client before it runs.</li></ol><button className="btn btn-primary" style={{ marginTop: 10 }} onClick={() => { navigator.clipboard?.writeText(endpoint); ctx.toast("MCP URL copied"); }}>Copy MCP URL</button></div>}
          <div className="crmcp-capabilities" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 18 }}>
            <section className="card" style={{ padding: 16 }}><b><iconify-icon icon="ph:eye" /> What it can review</b> <span className="crmcp-status available">Read access</span><ul style={{ paddingLeft: 18, fontSize: ".88rem" }}><li>Your collaboration briefs and deadlines</li><li>Your draft history and post status</li><li>Your conversations and messages</li></ul></section>
            <section className="card" style={{ padding: 16 }}><b><iconify-icon icon="ph:check-square-offset" /> Actions it can prepare</b> <span className="crmcp-status">Confirmed actions</span><ul style={{ paddingLeft: 18, fontSize: ".88rem" }}><li>Submit a draft to the brand for review</li><li>Ask whether you want to attach an image before submitting a draft</li><li>Reply in an existing collaboration conversation</li></ul></section>
          </div>
          <p className="muted" style={{ fontSize: ".82rem", marginTop: 12 }}>Every action requires explicit confirmation. The assistant only receives access to your own creator account after OAuth consent. Naano rechecks ownership, collaboration access, rate limits and duplicate actions on the server.</p>
        </div>
      </div>
    </section>
  );
}
