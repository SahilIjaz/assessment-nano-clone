import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";

export const metadata = { title: "Page not found | Naano" };

/** Branded 404 for anything outside the sitemap; every real link on the site resolves, so this is a safety net. */
export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "140px 24px 80px", background: "#F7F8FA", color: "#0B1220", fontFamily: "var(--font-inter), Inter, system-ui, sans-serif", textAlign: "center" }}>
        <div style={{ maxWidth: 560 }}>
          <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#6B7280", margin: 0 }}>404</p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.05, letterSpacing: "-.03em", fontWeight: 800, margin: "14px 0 16px" }}>This page moved on.</h1>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: "#4B5563", margin: "0 0 32px" }}>The link you followed doesn&apos;t exist anymore. Head back to the marketplace or start a campaign in a couple of minutes.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/" style={{ display: "inline-flex", alignItems: "center", height: 46, padding: "0 22px", borderRadius: 999, background: "#0B1220", color: "#fff", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>Back to home</a>
            <a href="/creators" style={{ display: "inline-flex", alignItems: "center", height: 46, padding: "0 22px", borderRadius: 999, background: "#fff", color: "#0B1220", border: "1px solid #E5E7EB", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>Browse creators</a>
          </div>
        </div>
      </main>
      <SiteFooter variant="14774f" />
    </>
  );
}
