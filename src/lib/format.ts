export const fmtEur = (cents: number, digits = 2) =>
  "€" + (cents / 100).toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
export const fmtEur0 = (cents: number) => "€" + Math.round(cents / 100).toLocaleString("en-US");
export const fmtK = (n: number) => (n >= 1_000_000 ? (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M" : n >= 1000 ? (n / 1000).toFixed(n >= 100_000 ? 0 : 1).replace(/\.0$/, "") + "K" : String(n));
export const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
export const initials = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((s) => s[0]!.toUpperCase()).join("");
