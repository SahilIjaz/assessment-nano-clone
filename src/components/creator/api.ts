"use client";
import type { CreatorSnapshot } from "@/lib/creator-data";
export async function creatorApi(action: string, body: Record<string, unknown> = {}) {
  const r = await fetch(`/api/creator/${action}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  return r.json() as Promise<{ ok: boolean; error?: string; state?: CreatorSnapshot; [k: string]: unknown }>;
}
