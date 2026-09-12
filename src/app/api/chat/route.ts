import { NextRequest, NextResponse } from "next/server";
import { siteAssistant } from "@/lib/ai";

export const runtime = "nodejs";

type Msg = { role: "user" | "assistant"; content: string };

/** POST { messages: [{ role, content }] } → { reply }. Public: no session required. */
export async function POST(req: NextRequest) {
  let body: { messages?: unknown } = {};
  try { body = await req.json(); } catch { /* no body */ }
  const raw = Array.isArray(body.messages) ? (body.messages as unknown[]) : [];
  const messages: Msg[] = raw
    .filter((m): m is Msg => !!m && typeof m === "object" && ((m as Msg).role === "user" || (m as Msg).role === "assistant") && typeof (m as Msg).content === "string")
    .map((m) => ({ role: m.role, content: m.content.trim() }))
    .filter((m) => m.content.length > 0)
    .slice(-12);
  if (!messages.length || messages[messages.length - 1]!.role !== "user") return NextResponse.json({ error: "Missing message" }, { status: 400 });
  const reply = await siteAssistant(messages);
  return NextResponse.json({ reply });
}
