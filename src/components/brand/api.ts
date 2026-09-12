"use client";
import type { BrandSnapshot } from "@/lib/brand-data";

export async function brandApi<T = { ok: boolean; state?: BrandSnapshot; error?: string }>(action: string, body: Record<string, unknown> = {}): Promise<T & { ok: boolean; state?: BrandSnapshot; error?: string }> {
  const r = await fetch(`/api/brand/${action}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  return r.json();
}
