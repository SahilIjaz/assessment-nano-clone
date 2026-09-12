"use client";
import { useState } from "react";
import type { Ctx } from "../BrandApp";

const SETUP: Record<string, { title: string; steps: string[] }> = {
  claude: { title: "Connect Naano to Claude", steps: ["Open Claude → Settings → Connectors → Add custom connector.", "Paste the remote MCP endpoint and confirm.", "Sign in with your Naano account when prompted (OAuth 2.1).", "Ask Claude: “Find 5 creators for my next campaign on Naano.”"] },
  chatgpt: { title: "Connect Naano to ChatGPT", steps: ["Open ChatGPT → Settings → Apps & connectors → Create.", "Choose “MCP server” and paste the endpoint.", "Authorise with your Naano workspace.", "Start a chat with the Naano app enabled."] },
  other: { title: "Any MCP client", steps: ["Add a remote MCP server with transport “Streamable HTTP”.", "Endpoint: the URL above. Auth: OAuth 2.1 (no API key).", "Approve the consent screen for your Naano workspace.", "Every write action is confirmed inside the client before it runs."] },
};

export default function Integrations({ ctx }: { ctx: Ctx }) {
  const [setup, setSetup] = useState<string | null>(null);
  const [pixelOpen, setPixelOpen] = useState(false);
  const endpoint = `${typeof window !== "undefined" ? window.location.origin : "https://naano.com"}/api/mcp`;
  const key = ctx.snap.company.pixel_key ?? "nn_pixel";
  const snippet = `<script async src="${typeof window !== "undefined" ? window.location.origin : ""}/pixel.js" data-naano-key="${key}"></script>`;
  const copy = (t: string, msg: string) => { navigator.clipboard?.writeText(t); ctx.toast(msg); };
  return (
    <section className="page nn-integrations visible" id="page-integrations" data-screen-label="Integrations">
      <div className="in-shell">
        <div className="in-settings-layout">
          <nav className="in-settings-nav" aria-label="Settings navigation">
            <div className="in-settings-nav-title">Settings</div>
            <a href="#settings"><iconify-icon icon="ph:user-circle" /><span>Profile</span></a>
            <a href="#settings/audience"><iconify-icon icon="ph:brain" /><span>Audience</span></a>
            <a href="#settings/team"><iconify-icon icon="ph:users-three" /><span>Team & access</span></a>
            <a className="is-active" href="#integrations" aria-current="page"><iconify-icon icon="ph:plugs-connected" /><span>Integrations</span></a>
          </nav>
          <div className="in-settings-main">
            <header className="in-hero"><span className="in-eyebrow">Integrations</span><h1>Use Naano from your AI assistant</h1><p>Search creators, build campaigns and manage collaborations from Claude, ChatGPT or any compatible MCP client.</p></header>
            <div className="in-panel" id="st-card-mcp">
              <div className="st-mcp-intro"><iconify-icon icon="ph:sparkle" aria-hidden="true" /><div><b>Keep campaigns moving without another dashboard workflow</b><span>Connect once, then ask your AI assistant to find creators, review campaign activity or prepare the next action in plain language.</span></div></div>
              <section className="st-mcp-console" aria-labelledby="st-mcp-console-title">
                <div className="st-mcp-console-bar"><span className="st-mcp-console-dots" aria-hidden="true"><i /><i /><i /></span><span className="st-mcp-console-label" id="st-mcp-console-title">naano://mcp</span><span className="st-mcp-online">Online</span></div>
                <div className="st-mcp-console-body"><div className="st-mcp-endpoint-main"><small>Remote MCP endpoint</small><code>{endpoint}</code></div><button type="button" className="st-mcp-console-copy" onClick={() => copy(endpoint, "MCP URL copied")}><iconify-icon icon="ph:copy" aria-hidden="true" /><span>Copy MCP URL</span></button></div>
                <div className="st-mcp-console-meta" aria-label="Connection details"><span>STREAMABLE HTTP</span><span>OAUTH 2.1</span><span>No API key</span></div>
              </section>
              <div className="st-mcp-section-head"><h2>Choose your client</h2><p>One endpoint, any compatible MCP client.</p></div>
              <div className="st-mcp-grid">
                {[["claude", "Claude", "Use Naano from Claude and Cowork."], ["chatgpt", "ChatGPT", "Use Naano from a custom ChatGPT app."], ["other", "Any MCP client", "Connect another OAuth-compatible client."]].map(([k, t, s]) => (
                  <article className="st-mcp-provider" data-mcp-provider={k} key={k}>
                    <span className={`st-mcp-logo ${k === "claude" ? "claude" : ""}`} aria-hidden="true">{k === "other" ? <iconify-icon icon="ph:plugs-connected" style={{ fontSize: "21px", color: "#1D5BF5" }} /> : k === "chatgpt" ? <iconify-icon icon="simple-icons:openai" style={{ fontSize: "21px" }} /> : null}</span>
                    <div className="st-mcp-copy"><b>{t}</b><span>{s}</span></div>
                    <div className="st-mcp-action"><span className="st-mcp-status access">Available</span><button type="button" className="st-mcp-connect" aria-expanded={setup === k} onClick={() => setSetup(setup === k ? null : k)}><span>View setup</span><iconify-icon icon="ph:arrow-right" aria-hidden="true" /></button></div>
                  </article>
                ))}
              </div>
              {setup && (
                <div className="st-mcp-setup card" id="st-mcp-setup" style={{ padding: 18, marginTop: 14 }}>
                  <div className="row" style={{ justifyContent: "space-between" }}><h3 style={{ margin: 0 }}>{SETUP[setup]!.title}</h3><button type="button" className="modal-close" aria-label="Close" onClick={() => setSetup(null)}>×</button></div>
                  <ol style={{ margin: "10px 0 0", paddingLeft: 18, lineHeight: 1.7, fontSize: ".9rem" }}>{SETUP[setup]!.steps.map((s) => <li key={s}>{s}</li>)}</ol>
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}><button type="button" className="btn btn-primary" onClick={() => copy(endpoint, "MCP URL copied")}>Copy MCP URL</button><a className="btn btn-ghost" href={setup === "chatgpt" ? "https://chatgpt.com/" : "https://claude.ai/"} target="_blank" rel="noopener">Open provider settings</a></div>
                </div>
              )}
              <div className="st-mcp-capabilities">
                <section className="st-mcp-capability"><div className="st-mcp-capability-head"><b><iconify-icon icon="ph:eye" aria-hidden="true" /><span>What it can review</span></b><span className="st-mcp-status access">Read access</span></div><ul><li>Your active workspace, wallet and campaigns</li><li>Available creators, posts and campaign fit</li><li>Applications, bookings and content status</li></ul></section>
                <section className="st-mcp-capability"><div className="st-mcp-capability-head"><b><iconify-icon icon="ph:check-square-offset" aria-hidden="true" /><span>Actions it can prepare</span></b><span className="st-mcp-status">Confirmation required</span></div><ul><li>Draft and launch campaigns</li><li>Invite creators and manage applications</li><li>Review submitted content and campaign status</li></ul></section>
              </div>
              <p className="st-mcp-footnote muted" style={{ fontSize: ".82rem" }}>The assistant only sees the active Naano workspace your account can access. Naano rechecks identity, workspace permissions, rate limits and every write confirmation on the server.</p>
            </div>
            <div className="in-panel" id="st-card-pixel" style={{ marginTop: 18 }}>
              <div className="st-mcp-intro"><iconify-icon icon="ph:cursor-click" aria-hidden="true" /><div><b>Pixel Naano</b> <span className="st-mcp-status">Not installed yet</span><span>Track visits and conversions from your creators' posts.</span></div></div>
              <button type="button" className="btn" onClick={() => setPixelOpen((v) => !v)}>Installation instructions</button>
              {pixelOpen && (
                <div className="card" style={{ padding: 16, marginTop: 12 }}>
                  <p className="muted" style={{ marginTop: 0, fontSize: ".86rem" }}>Paste this snippet before the closing <code>&lt;/head&gt;</code> tag of your site. Events appear in Results within minutes.</p>
                  <pre style={{ background: "#0F1220", color: "#E7EAF1", padding: 14, borderRadius: 12, overflowX: "auto", fontSize: ".8rem" }}>{snippet}</pre>
                  <div style={{ display: "flex", gap: 8 }}><button type="button" className="btn btn-primary" onClick={() => copy(snippet, "Snippet copied")}>Copy the snippet</button><button type="button" className="btn btn-ghost" onClick={() => copy(key, "Key copied")}>Copy the key</button><button type="button" className="btn btn-ghost" onClick={() => ctx.nav("results")}>See received events →</button></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
