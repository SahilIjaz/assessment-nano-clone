import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/** Local outbox viewer: every e-mail the app "sends" (verification codes, recovery codes) lands here. */
export default async function Inbox() {
  const rows = await (await db()).prepare("SELECT * FROM outbox ORDER BY id DESC LIMIT 50").all() as { id: number; to_email: string; subject: string; body: string; created_at: string }[];
  return (
    <main style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#F3F5F9", minHeight: "100vh", padding: 32, color: "#0F1220" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h1 style={{ fontSize: 24, margin: "0 0 4px" }}>Local mail outbox</h1>
        <p style={{ color: "#747B90", margin: "0 0 20px" }}>No mail provider is configured, so verification and recovery e-mails are stored here. Newest first.</p>
        {rows.length === 0 && <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #E7EAF1" }}>Nothing sent yet. Sign up on <a href="/register">/register</a> to receive your first code.</div>}
        {rows.map((r) => {
          const code = r.body.match(/\b(\d{6})\b/)?.[1];
          return (
            <article key={r.id} style={{ background: "#fff", borderRadius: 14, padding: 20, border: "1px solid #E7EAF1", marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}><b>{r.subject}</b><span style={{ color: "#747B90", fontSize: 13 }}>{r.created_at} UTC</span></div>
              <div style={{ color: "#747B90", fontSize: 13, margin: "4px 0 10px" }}>to {r.to_email}</div>
              {code && <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: 6, margin: "6px 0 12px" }}>{code}</div>}
              <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", fontSize: 13, color: "#444", margin: 0 }}>{r.body}</pre>
            </article>
          );
        })}
      </div>
    </main>
  );
}
