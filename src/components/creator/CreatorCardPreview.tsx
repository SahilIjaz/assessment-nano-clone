"use client";
import { useState } from "react";
import { fmtK, initials } from "@/lib/format";

export type CardData = { name: string; headline?: string | null; bio?: string | null; industries: string[]; flag?: string | null; country?: string | null; followers: number; medianViews: number; priceCents: number; bundles?: { posts: number; totalCents: number }[]; linkedinUrl?: string | null; reactions?: number; comments?: number; engagement?: number; audience?: string | null };

const ROUND = (n: number) => `€${Math.round(n / 100).toLocaleString("en-US")}`;
const F = "var(--font-jakarta), 'Plus Jakarta Sans', Inter, -apple-system, sans-serif";
const chip: React.CSSProperties = { display: "inline-flex", height: 40, width: 40, alignItems: "center", justifyContent: "center", borderRadius: 14, border: "1px solid rgba(255,255,255,.8)", background: "rgba(255,255,255,.88)", boxShadow: "0 5px 16px rgba(15,23,42,.08)", backdropFilter: "blur(4px)", fontSize: 19, cursor: "pointer" };

/** The creator's Marketplace card (front = profile, back = performance & ICP). Click to flip. Self-contained styling so it renders identically on every surface. */
export default function CreatorCardPreview({ d, compact, flippable = true }: { d: CardData; compact?: boolean; flippable?: boolean }) {
  const [side, setSide] = useState<"profile" | "stats">("profile");
  const hasData = d.followers > 0;
  const flip = (e?: React.MouseEvent) => { e?.stopPropagation(); if (flippable) setSide(side === "profile" ? "stats" : "profile"); };
  const Header = (
    <div style={{ position: "relative", aspectRatio: "4 / 1", padding: "16px 20px" }}>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", overflow: "hidden", background: "radial-gradient(circle at 12% 8%,rgba(255,255,255,.25),transparent 28%),radial-gradient(circle at 88% 86%,rgba(137,174,255,.42),transparent 36%),linear-gradient(135deg,#4F86F4 0%,#2E63E6 48%,#5B8DF7 100%)" }}>
        <span style={{ position: "absolute", right: -64, top: -80, height: 128, width: 128, borderRadius: "50%", border: "1px solid rgba(255,255,255,.15)", boxShadow: "0 0 0 20px rgba(255,255,255,.045),0 0 0 40px rgba(255,255,255,.025)" }} />
        <span style={{ position: "absolute", bottom: -48, left: -48, height: 80, width: 80, borderRadius: "50%", border: "1px solid rgba(255,255,255,.15)", boxShadow: "0 0 0 16px rgba(255,255,255,.035)" }} />
        <img alt="" src="/lp/naano-logo-footer.png" style={{ position: "relative", zIndex: 10, marginBottom: 12, height: "auto", width: "min(32%,112px)", maxHeight: 30, filter: "brightness(0) invert(1)" }} />
      </div>
      <a href={d.linkedinUrl || "#"} target="_blank" rel="noopener noreferrer" aria-label="Open my LinkedIn profile" onClick={(e) => e.stopPropagation()} style={{ ...chip, height: 44, width: 44, borderRadius: 15, position: "absolute", left: 20, top: 16, zIndex: 20 }}>
        <span aria-hidden="true" style={{ display: "inline-flex", height: 28, width: 28, borderRadius: 8, alignItems: "center", justifyContent: "center", background: "#0A66C2", color: "#fff", boxShadow: "0 4px 10px rgba(10,102,194,.24)" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45Z" /></svg></span>
      </a>
      <div style={{ position: "absolute", right: 20, top: 16, zIndex: 20, display: "flex", alignItems: "center", gap: 8 }}>
        {d.flag && <span aria-label={d.country ?? ""} title={d.country ?? ""} style={chip}>{d.flag}</span>}
        {flippable && <button type="button" aria-label="Flip the card" onClick={flip} style={{ ...chip, color: "#2563eb" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" /></svg></button>}
      </div>
      <div style={{ position: "absolute", left: "50%", top: "100%", zIndex: 20, transform: "translate(-50%,-50%)" }}><span style={{ display: "grid", height: 84, width: 84, placeItems: "center", borderRadius: "50%", border: "4px solid #fff", background: "#EEF2F7", fontSize: 34, fontWeight: 600, color: "#64748B", boxShadow: "0 12px 30px rgba(15,23,42,.14)" }}>{initials(d.name || "Y")}</span></div>
    </div>
  );
  const cell = (v: string, l: string, last?: boolean) => <div key={l} style={{ padding: "16px 12px", textAlign: "center", borderLeft: last === undefined ? undefined : "1px solid #EEF1F6" }}><dd style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#0F172A" }}>{v}</dd><dt style={{ marginTop: 4, fontSize: 11, color: "#64748B" }}>{l}</dt></div>;
  return (
    <div data-card-side={side} onClick={() => flip()} style={{ position: "relative", isolation: "isolate", width: "100%", maxWidth: 500, margin: "0 auto", fontFamily: F }}>
      <span aria-hidden="true" style={{ pointerEvents: "none", position: "absolute", bottom: 40, left: 4, zIndex: 0, height: 56, width: "42%", transform: "rotate(-8deg)", borderRadius: "50%", background: "rgba(59,90,154,.14)", opacity: .7, filter: "blur(24px)" }} />
      <span aria-hidden="true" style={{ pointerEvents: "none", position: "absolute", bottom: 40, right: 4, zIndex: 0, height: 56, width: "42%", transform: "rotate(8deg)", borderRadius: "50%", background: "rgba(59,90,154,.14)", opacity: .7, filter: "blur(24px)" }} />
      <section aria-label={`Preview of ${d.name}'s Marketplace card`} style={{ position: "relative", zIndex: 10, width: "100%", cursor: flippable ? "pointer" : "default", paddingBottom: 36 }}>
        <div style={{ position: "relative", overflow: "hidden", borderRadius: 34, border: "1px solid #E4E5E7", background: "rgba(255,255,255,.9)", boxShadow: "0 20px 55px rgba(15,23,42,.10),0 2px 8px rgba(15,23,42,.05),inset 0 1px 0 rgba(255,255,255,.95)" }}>
          {Header}
          {side === "profile" ? (
            <>
              <div style={{ padding: "56px 24px 20px", textAlign: "center" }}>
                <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: "-.02em", color: "#0F172A" }}>{d.name || "Your name"}</h2>
                {d.industries.length > 0 && <p style={{ margin: "4px 0 0", fontSize: 15, color: "#64748B" }}>{d.industries.join(" · ")}</p>}
                <p style={{ margin: "12px 0 0", fontSize: 15, lineHeight: 1.6, color: "#475569" }}>{d.headline || "Your LinkedIn headline and topics will appear here."}</p>
                {!compact && <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}><span style={{ display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, border: "1px solid #E2E8F0", background: "#F8FAFC", padding: "6px 12px", fontSize: 12, fontWeight: 500, color: "#475569" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>{hasData ? `${fmtK(d.medianViews)} typical reach` : "No post data available"}</span></div>}
                <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "#94A3B8" }}><span>Data</span><span style={{ height: 4, flex: 1, borderRadius: 999, background: "#E2E8F0" }}><span style={{ display: "block", height: "100%", borderRadius: 999, background: "#2563eb", width: hasData ? "100%" : "0%" }} /></span><span style={{ fontWeight: 600, color: "#334155" }}>{hasData ? "Verified" : "Pending"}</span></div>
              </div>
              <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid #EEF1F6", background: "#FAFBFD" }}>
                {cell(hasData ? fmtK(d.followers) : "—", "Followers")}{cell(hasData ? fmtK(d.medianViews) : "—", "Est. impressions", true)}{cell(d.priceCents ? ROUND(d.priceCents) : "—", "Cost / post", true)}
              </dl>
              {d.bundles && d.bundles.length > 0 && <div style={{ borderTop: "1px solid #EEF1F6", padding: "12px 24px", textAlign: "center", fontSize: 12, fontWeight: 600, color: "#2563eb" }}>{d.bundles.map((b) => `${b.posts}-post bundle · ${ROUND(b.totalCents)}`).join(" · ")}</div>}
            </>
          ) : (
            <div style={{ padding: "56px 24px 24px" }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#0F172A" }}>Performance & ICP</h2>
              <p style={{ margin: "2px 0 0", fontSize: 13, color: "#64748B" }}>Public LinkedIn profile data (Basic card).</p>
              <dl style={{ margin: "16px 0 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 13 }}>
                {[["Followers", hasData ? fmtK(d.followers) : "—"], ["Reactions per post", d.reactions ? String(d.reactions) : "—"], ["Typical impressions per post", hasData ? fmtK(d.medianViews) : "—"], ["Comments per post", d.comments ? String(d.comments) : "—"], ["Engagement rate", d.engagement ? `${d.engagement}%` : "—"]].map(([k, v]) => <div key={k} style={{ borderRadius: 12, border: "1px solid #EEF1F6", background: "#FAFBFD", padding: 12 }}><dt style={{ color: "#64748B" }}>{k}</dt><dd style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#0F172A" }}>{v}</dd></div>)}
              </dl>
              <p style={{ margin: "12px 0 0", fontSize: 11, color: "#94A3B8" }}>Public LinkedIn data estimated by Naano</p>
              <div style={{ marginTop: 16 }}><h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0F172A" }}>About</h3><p style={{ margin: "4px 0 0", fontSize: 13, color: "#475569" }}>{d.bio || "No LinkedIn bio yet."}</p></div>
              <div style={{ marginTop: 16, borderRadius: 12, border: "1px solid #EEF1F6", padding: 12 }}><h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0F172A" }}>Who you target (est.)</h3><p style={{ margin: "2px 0 0", fontSize: 12, color: "#64748B" }}>Estimated from your public posts + bio (dominant themes).</p><p style={{ margin: "8px 0 0", fontSize: 13, fontWeight: 600, color: "#334155" }}>{d.audience || "Target pending"}</p>{!d.audience && <p style={{ margin: "2px 0 0", fontSize: 12, color: "#64748B" }}>Re-import LinkedIn to estimate your target from public posts.</p>}</div>
            </div>
          )}
        </div>
        {flippable && <button type="button" onClick={flip} style={{ margin: "16px auto 0", display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#64748B", background: "none", border: 0, cursor: "pointer", fontFamily: "inherit" }}><span>{side === "profile" ? "More details" : "Back to card"}</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="m6 9 6 6 6-6" /></svg></button>}
      </section>
    </div>
  );
}
