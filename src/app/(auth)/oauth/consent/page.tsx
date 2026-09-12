import { isProvider, PROVIDERS } from "@/lib/oauth";
import { GoogleIcon, LinkedInBadge } from "@/components/auth/AuthShell";

export const metadata = { title: "Sign in" };
export const dynamic = "force-dynamic";

/**
 * Local stand-in for the provider's consent screen, shown when GOOGLE_/LINKEDIN_ client credentials are not configured.
 * It completes the same callback the real provider would, so the whole social sign-in flow can be exercised locally.
 */
export default async function Consent({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const provider = sp.provider && isProvider(sp.provider) ? sp.provider : "google";
  const cfg = PROVIDERS[provider];
  const google = provider === "google";
  const accent = google ? "#0B57D0" : "#0A66C2";
  const input: React.CSSProperties = { width: "100%", border: "1px solid #747775", borderRadius: 6, padding: "12px", fontSize: 14, color: "#1F1F1F", background: "#fff", fontFamily: "inherit" };
  const label: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 500, color: "#444746", marginBottom: 4 };
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: google ? "#F0F4F9" : "#F3F2EF", color: "#1F1F1F", fontFamily: google ? "Roboto, Arial, sans-serif" : "-apple-system, 'Segoe UI', Roboto, sans-serif" }}>
      <form method="GET" action="/api/auth/oauth/callback" style={{ width: "100%", maxWidth: 440, background: "#fff", borderRadius: google ? 28 : 8, padding: 36, boxShadow: "0 1px 3px rgba(0,0,0,.08)", border: google ? "1px solid #DADCE0" : "1px solid #E0DFDC" }}>
        <input type="hidden" name="state" value={sp.state || ""} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>{google ? <GoogleIcon /> : <LinkedInBadge />}<span style={{ fontSize: 15, fontWeight: 600 }}>{google ? "Sign in with Google" : "Sign in to LinkedIn"}</span></div>
        <h1 style={{ fontSize: 24, fontWeight: 400, margin: "0 0 4px" }}>{google ? "Choose an account" : "Welcome back"}</h1>
        <p style={{ fontSize: 14, color: "#444746", margin: "0 0 24px" }}>to continue to <b>naano.com</b></p>
        <p style={{ fontSize: 12, color: "#5F6368", background: "#F8F9FA", border: "1px solid #E0E0E0", borderRadius: 8, padding: 12, margin: "0 0 20px", lineHeight: 1.5 }}>Local mode: {cfg.name} credentials are not configured on this server ({cfg.idEnv} / {cfg.secretEnv}), so this screen simulates the provider. The account you enter below is what Naano receives from {cfg.name}.</p>
        {sp.error === "email" && <p style={{ fontSize: 12, color: "#B3261E", margin: "0 0 12px" }}>Enter a valid e-mail address.</p>}
        <label style={label}>Name</label>
        <input name="name" required placeholder="Ada Lovelace" style={{ ...input, marginBottom: 16 }} />
        <label style={label}>E-mail</label>
        <input name="email" type="email" required placeholder="ada@company.com" style={{ ...input, marginBottom: 24 }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/login" style={{ fontSize: 14, fontWeight: 500, color: accent, textDecoration: "none" }}>Cancel</a>
          <button type="submit" style={{ fontSize: 14, fontWeight: 600, color: "#fff", borderRadius: 999, padding: "10px 24px", border: 0, background: accent, cursor: "pointer", fontFamily: "inherit" }}>Continue</button>
        </div>
      </form>
    </div>
  );
}
