import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CREATORS, type Creator } from "@/data/creators";
import { db } from "@/lib/db";
import { fmtK, initials } from "@/lib/format";
import { avatarGradient } from "@/components/brand/Avatar";

export const dynamic = "force-dynamic";

const card: React.CSSProperties = { background: "#FFFFFF", border: "1px solid #E5E9F0", borderRadius: "16px", padding: "22px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" };
const h2: React.CSSProperties = { fontSize: "13.5px", fontWeight: 700, color: "#0F172A", margin: "0 0 14px", letterSpacing: "-0.01em" };
const pill: React.CSSProperties = { fontSize: "11.5px", fontWeight: 600, color: "#1652F0", background: "#EAF0FF", padding: "3px 10px", borderRadius: "999px" };
const stat: React.CSSProperties = { background: "#F8FAFC", border: "1px solid #E5E9F0", borderRadius: "12px", padding: "13px 15px", minWidth: 0 };
const statV: React.CSSProperties = { fontSize: "22px", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", lineHeight: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
const statL: React.CSSProperties = { fontSize: "11px", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginTop: "7px", whiteSpace: "nowrap" };

async function load(slug: string): Promise<Creator | null> {
  const c = CREATORS.find((x) => x.slug === slug);
  if (c) return c;
  const row = await (await db()).prepare("SELECT p.*, u.first_name, u.last_name FROM creator_profiles p JOIN users u ON u.id=p.user_id WHERE p.slug=?").get(slug) as (Record<string, string | number | null> & { first_name: string; last_name: string }) | undefined;
  if (!row) return null;
  const name = (row.display_name as string) || `${row.first_name} ${row.last_name}`;
  const cc = (row.country_code as string) || "";
  const flag = cc ? String.fromCodePoint(...[...cc].map((ch) => 0x1f1e6 + ch.charCodeAt(0) - 65)) : "";
  const inds = JSON.parse((row.industries_json as string) || "[]") as string[];
  const followers = Number(row.followers || 0), medianViews = Number(row.median_views || 0);
  const bundles = JSON.parse((row.bundles_json as string) || "[]") as { posts: number; totalCents: number }[];
  return { slug, name, first: row.first_name, last: row.last_name, headline: (row.headline as string) || "", bio: (row.bio as string) || "", industries: inds, country: (row.country as string) || "", cc, flag, city: "", followers, medianViews, reactions: 0, comments: 0, engagement: Number(row.engagement_rate || 0), priceCents: Number(row.price_cents || 0), bundle: bundles[0] ? { posts: bundles[0].posts, totalCents: bundles[0].totalCents } : undefined, cpmCents: medianViews ? Math.round((Number(row.price_cents || 0) / medianViews) * 1000) : 0, network: "linkedin", audience: { jobTitles: [], seniority: [] }, posts: [], icpFit: 0, level: "Nano", joined: String(row.created_at), languages: [], postsAnalyzed: 0 };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const c = await load(slug);
  return c ? { title: `${c.name}: ${c.headline || "B2B creator"} | Naano`, description: `Book ${c.name} for a sponsored LinkedIn post on Naano, the B2B creator marketplace.` } : {};
}

export default async function CreatorProfile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await load(slug);
  if (!c) redirect("/creators");
  const has = c.followers > 0;
  const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  return (
    <>
      <div className="bg-noise" />
      <main style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: "#F7F8FA", minHeight: "100vh" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "28px 20px 64px" }}>
          <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #E5E9F0" }}>
            <a style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }} href="/creators"><img src="/logo.svg" alt="naano" style={{ width: "28px", height: "28px", objectFit: "contain", flexShrink: 0 }} /><div><div style={{ fontSize: "18px", fontWeight: 800, color: "#1652F0", letterSpacing: "-0.02em", lineHeight: 1.05 }}>naano</div><div style={{ fontSize: "11.5px", color: "#64748B", marginTop: "1px" }}>The B2B LinkedIn creator marketplace</div></div></a>
            <a style={{ fontSize: "12.5px", fontWeight: 600, color: "#1652F0", textDecoration: "none", whiteSpace: "nowrap" }} href="/creators">Browse all creators →</a>
          </header>
          <header style={{ position: "relative", overflow: "visible", background: "linear-gradient(180deg, #FFFFFF 0%, #FBFCFF 100%)", border: "1px solid #E5E9F0", borderRadius: "16px", padding: "26px 24px 22px", marginBottom: "14px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ position: "absolute", top: "-1px", left: 0, right: 0, height: "2px", borderRadius: "16px 16px 0 0", background: "#CBD5E1" }} />
            <div style={{ display: "flex", alignItems: "flex-start", gap: "18px", flexWrap: "wrap" }}>
              <span aria-label={c.name} style={{ width: "88px", height: "88px", borderRadius: "50%", border: "3px solid #FFFFFF", boxShadow: "0 4px 14px rgba(15,23,42,0.1)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "30px", fontWeight: 700, color: "#fff", background: avatarGradient(c.name), flexShrink: 0 }}>{initials(c.name)}</span>
              <div style={{ flex: "1 1 200px", minWidth: "200px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", minWidth: 0 }}><h1 style={{ fontSize: "27px", fontWeight: 800, color: "#0F172A", margin: 0, lineHeight: 1.1, letterSpacing: "-0.025em", wordBreak: "break-word" }}>{c.name}</h1></div>
                <p style={{ fontSize: "14px", color: "#64748B", margin: "6px 0 0", lineHeight: 1.45 }}>{c.headline || "B2B creator on Naano"}</p>
                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px", marginTop: "10px" }}>
                  {c.cc && <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12.5px", color: "#64748B" }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>{c.cc}</span>}
                  {c.industries.map((i) => <span key={i} style={pill}>{i}</span>)}
                </div>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "12px", fontWeight: 600, color: "#12A150", background: "#E4F7EC", padding: "6px 12px", borderRadius: "999px", whiteSpace: "nowrap" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#12A150" }} />Available to book</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", marginTop: "22px", paddingTop: "20px", borderTop: "1px solid #EEF1F6" }}>
              {[[has ? fmtK(c.followers) : "—", "Followers"], [has ? fmtK(c.medianViews) : "—", "Est. median reach"], [has ? `${c.engagement}%` : "—", "Engagement"]].map(([v, l], i) => (
                <div key={l} style={{ flex: "1 1 0", minWidth: "92px", padding: i === 0 ? "0 20px 0 0" : "0 20px", borderLeft: i === 0 ? "none" : "1px solid #EEF1F6" }}><div style={{ fontSize: "23px", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", lineHeight: 1 }}>{v}</div><div style={{ fontSize: "11px", fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "7px", whiteSpace: "nowrap" }}>{l}</div></div>
              ))}
            </div>
          </header>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <section style={card}>
              <h2 style={h2}>About</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {c.headline && <div style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>{c.headline}</div>}
                <p style={{ fontSize: "13.5px", color: "#64748B", margin: 0, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{c.bio || "No LinkedIn bio yet."}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>{c.industries.map((i) => <span key={i} style={{ fontSize: "12px", fontWeight: 500, color: "#1652F0", background: "#EAF0FF", padding: "4px 11px", borderRadius: "999px" }}>{i}</span>)}</div>
              </div>
            </section>
            <section style={card}>
              <h2 style={h2}>Audience & average metrics</h2>
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(132px, 1fr))", gap: "10px" }}>
                  {[[has ? fmtK(c.followers) : "—", "Followers"], [has ? fmtK(c.medianViews) : "—", "Est. median reach"], [has ? String(c.reactions) : "—", "Avg reactions"], [has ? String(c.comments) : "—", "Avg comments"], [has ? `${c.engagement}%` : "—", "Engagement"], [c.cc || "—", "Based in"]].map(([v, l]) => <div key={l} style={stat}><div style={statV}>{v}</div><div style={statL}>{l}</div></div>)}
                </div>
                <p style={{ margin: "10px 0 0", fontSize: "11.5px", color: "#94A3B8" }}>{has ? "Stats updated 2 d ago" : "Public LinkedIn data is being prepared."}</p>
              </div>
            </section>
            {c.posts.length > 0 && (
              <section style={card}>
                <h2 style={h2}>Recent posts</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
                  {c.posts.map((p, i) => (
                    <div key={i} style={{ border: "1px solid #E5E9F0", borderRadius: "12px", padding: "14px", background: "#F8FAFC", display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>{i === 1 && <span style={{ fontSize: "9px", fontWeight: 700, color: "#1652F0", background: "#EAF0FF", padding: "2px 6px", borderRadius: "4px", textTransform: "uppercase" }}>Naano</span>}<span style={{ fontSize: "10px", color: "#94A3B8", textTransform: "capitalize" }}>{fmtDate(p.date)} · text</span></div>
                      <p style={{ fontSize: "12.5px", color: "#0F172A", margin: 0, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.text}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "13px", fontSize: "12px", color: "#64748B", marginTop: "auto" }}><span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>👍 {p.reactions}</span><span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>💬 {p.comments}</span><span style={{ marginLeft: "auto", color: "#94A3B8" }}>{fmtK(p.views)} est. reach</span></div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {c.audience.jobTitles.length > 0 && (
              <section style={card}>
                <h2 style={h2}>Who engages with {c.first}</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  <p style={{ fontSize: "12.5px", color: "#64748B", margin: 0, lineHeight: 1.5 }}>Estimated from the people who reacted to and commented on recent public posts.</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}><div style={statL}>Job title</div>{c.audience.jobTitles.map(([k, v]) => <div key={k}><div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", color: "#0F172A", marginBottom: "4px" }}><span>{k}</span><span style={{ fontWeight: 600 }}>{v}%</span></div><div style={{ width: "100%", height: "6px", background: "#EEF1F6", borderRadius: "99px", overflow: "hidden" }}><div style={{ width: `${v}%`, height: "100%", background: "#1652F0", borderRadius: "99px" }} /></div></div>)}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}><div style={statL}>Seniority</div><div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>{c.audience.seniority.map(([k, v]) => <span key={k} style={{ fontSize: "12.5px", color: "#0F172A", background: "#F8FAFC", border: "1px solid #E5E9F0", borderRadius: "8px", padding: "5px 12px" }}>{k} <span style={{ color: "#94A3B8", fontWeight: 600 }}>{v}%</span></span>)}</div></div>
                </div>
              </section>
            )}
            <section style={{ ...card, background: "#0F172A", color: "#fff", border: 0, display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 240px" }}><div style={{ fontSize: "15px", fontWeight: 700 }}>Book {c.first} for a sponsored post</div><div style={{ fontSize: "12.5px", color: "#CBD5E1", marginTop: "4px" }}>{c.priceCents ? `From €${Math.round(c.priceCents / 100).toLocaleString("en-US")} per post` : "Price on request"}{c.bundle ? ` · ${c.bundle.posts}-post bundle €${Math.round(c.bundle.totalCents / 100).toLocaleString("en-US")}` : ""} · fixed price, paid on delivery.</div></div>
              <a href="/register?role=saas" style={{ background: "#1652F0", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: "13px", padding: "11px 18px", borderRadius: "10px", whiteSpace: "nowrap" }}>Book on Naano →</a>
            </section>
            <p style={{ fontSize: "11.5px", color: "#94A3B8", textAlign: "center", margin: "6px 0 0" }}>Creator card generated by Naano from public LinkedIn data · <a href="/creators" style={{ color: "#64748B" }}>Get your own card</a></p>
          </div>
        </div>
      </main>
    </>
  );
}
