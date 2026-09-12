"use client";
import { useEffect } from "react";

/** Registers the <iconify-icon> web component with offline icon collections. */
export default function IconifySetup() {
  useEffect(() => {
    (async () => {
      const mod = await import("iconify-icon");
      const [ph, lucide, si] = await Promise.all([
        import("@iconify-json/ph/icons.json"),
        import("@iconify-json/lucide/icons.json"),
        import("@iconify-json/simple-icons/icons.json"),
      ]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const add = (mod as any).addCollection as (c: unknown) => void;
      add(ph.default ?? ph);
      add(lucide.default ?? lucide);
      add(si.default ?? si);
    })();
  }, []);
  return null;
}
