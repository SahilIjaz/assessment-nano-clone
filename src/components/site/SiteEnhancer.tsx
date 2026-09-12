"use client";
import { useEffect } from "react";
import faqData from "@/generated/faq.json";

const POPOVER_HTML = `<div class="lp-nav-popover"><div class="lp-nav-popover-panel" style="min-width:172px;background:#fff;border:1px solid #E8E6E2;border-radius:14px;box-shadow:0 18px 40px rgba(17,18,28,.1);overflow:hidden;padding:6px"><a href="/blog" style="display:block;text-decoration:none;color:#17181C;font-size:15px;font-weight:500;padding:10px 12px;border-radius:9px;white-space:nowrap">Blog</a><a href="/free-tools" style="display:block;text-decoration:none;color:#17181C;font-size:15px;font-weight:500;padding:10px 12px;border-radius:9px;white-space:nowrap">Free Tools</a><a href="/case-studies/blogseo" style="display:block;text-decoration:none;color:#17181C;font-size:15px;font-weight:500;padding:10px 12px;border-radius:9px;white-space:nowrap">Case study: BlogSEO</a></div></div>`;
const TW_POPOVER_HTML = `<div class="absolute left-0 top-full mt-3 min-w-[172px] rounded-[14px] border border-[#E8E6E2] bg-white p-1.5 shadow-[0_18px_40px_rgba(17,18,28,0.1)] z-[1001]"><a href="/blog" class="block rounded-[9px] px-3 py-2.5 text-[15px] font-medium text-[#17181C] hover:bg-[#F4F3F0] whitespace-nowrap">Blog</a><a href="/free-tools" class="block rounded-[9px] px-3 py-2.5 text-[15px] font-medium text-[#17181C] hover:bg-[#F4F3F0] whitespace-nowrap">Free Tools</a><a href="/case-studies/blogseo" class="block rounded-[9px] px-3 py-2.5 text-[15px] font-medium text-[#17181C] hover:bg-[#F4F3F0] whitespace-nowrap">Case study: BlogSEO</a></div>`;

function findAnswer(q: string): string | null {
  const norm = (s: string) => s.replace(/\s+/g, " ").trim().toLowerCase();
  const key = norm(q);
  for (const items of Object.values(faqData as Record<string, { q: string; a: string }[]>)) {
    for (const it of items) if (it.q && norm(it.q) === key) return it.a;
  }
  return null;
}

export default function SiteEnhancer() {
  useEffect(() => {
    const nav = document.getElementById("naano-nav");
    const pill = document.getElementById("naano-nav-pill");
    const logo = document.getElementById("naano-nav-logo") as HTMLImageElement | null;
    const onScroll = () => {
      const compact = window.scrollY > 24;
      if (nav) nav.setAttribute("data-compact", compact ? "true" : "false");
      if (pill) pill.style.padding = compact ? "10px 56px" : "16px 56px";
      if (logo) logo.style.height = compact ? "26px" : "30px";
      // Tailwind-styled nav (about/pricing/help…): add a frosted background once scrolled
      const twNav = document.querySelector<HTMLElement>("main > nav.fixed");
      if (twNav) {
        const inner = twNav.firstElementChild as HTMLElement | null;
        if (inner) {
          inner.style.background = compact ? "rgba(255,255,255,0.86)" : "";
          inner.style.backdropFilter = compact ? "saturate(140%) blur(14px)" : "";
          inner.style.borderRadius = compact ? "16px" : "";
          inner.style.padding = compact ? "8px 16px" : "";
          inner.style.boxShadow = compact ? "0 10px 30px rgba(17,18,28,0.06)" : "";
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const closePopovers = () => {
      document.querySelectorAll(".lp-nav-popover, [data-nn-popover]").forEach((el) => el.remove());
      document.querySelectorAll<HTMLElement>('button[aria-haspopup="true"]').forEach((b) => {
        b.setAttribute("aria-expanded", "false");
        const svg = b.querySelector("svg");
        if (svg) (svg as SVGElement).style.transform = "";
      });
    };

    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      // Resources dropdown
      const trigger = t.closest<HTMLElement>('button[aria-haspopup="true"]');
      if (trigger && /Resources/.test(trigger.textContent || "")) {
        const open = trigger.getAttribute("aria-expanded") === "true";
        closePopovers();
        if (!open) {
          trigger.setAttribute("aria-expanded", "true");
          const svg = trigger.querySelector("svg");
          if (svg) (svg as SVGElement).style.transform = "rotate(180deg)";
          const isLp = trigger.classList.contains("lp-nav-group-trigger");
          const wrap = document.createElement("div");
          wrap.innerHTML = isLp ? POPOVER_HTML : TW_POPOVER_HTML;
          const pop = wrap.firstElementChild as HTMLElement;
          pop.setAttribute("data-nn-popover", "1");
          trigger.parentElement!.appendChild(pop);
        }
        return;
      }
      // Burger menu
      const burger = t.closest<HTMLElement>(".lp-nav-burger");
      if (burger) {
        const menu = document.querySelector<HTMLElement>(".lp-nav-menu");
        if (menu) {
          const open = menu.getAttribute("data-open") === "true";
          menu.setAttribute("data-open", open ? "false" : "true");
          menu.style.display = open ? "none" : "block";
          burger.setAttribute("aria-expanded", open ? "false" : "true");
        }
        return;
      }
      // Tailwind nav mobile menu toggle (button with aria-label="Menu" / "Open menu")
      const twBurger = t.closest<HTMLElement>('nav button[aria-label="Open menu"], nav button[aria-label="Menu"], nav button[aria-label="Toggle menu"]');
      if (twBurger) {
        const navEl = twBurger.closest("nav")!;
        let menu = navEl.querySelector<HTMLElement>("[data-nn-mobile-menu]");
        if (menu) { menu.remove(); twBurger.setAttribute("aria-expanded", "false"); return; }
        menu = document.createElement("div");
        menu.setAttribute("data-nn-mobile-menu", "1");
        menu.className = "absolute left-4 right-4 top-full mt-2 rounded-[18px] border border-white/95 bg-white/95 p-2 shadow-[0_18px_44px_rgba(23,24,28,0.11)] backdrop-blur-xl md:hidden z-[1001]";
        menu.innerHTML = ["/", "For companies", "/creators", "For creators", "/agencies", "For agencies", "/#how-it-works", "How it works", "/blog", "Blog", "/free-tools", "Free Tools", "/case-studies/blogseo", "Case study: BlogSEO", "/login?reauth=1", "Sign in", "/register", "Sign up"]
          .reduce<string[]>((acc, v, i, arr) => (i % 2 === 0 ? [...acc, `<a href="${v}" class="block rounded-[10px] px-3 py-3 text-[16px] font-medium text-[#17181C] hover:bg-[#F4F3F0]">${arr[i + 1]}</a>`] : acc), [])
          .join("");
        navEl.firstElementChild!.appendChild(menu);
        twBurger.setAttribute("aria-expanded", "true");
        return;
      }
      if (!t.closest("[data-nn-popover], .lp-nav-popover")) closePopovers();

      // FAQ accordion (question button followed by optional <p> answer)
      const btn = t.closest<HTMLElement>("button");
      if (btn && !btn.closest("nav, #naano-nav, form") && btn.parentElement) {
        const q = btn.querySelector("span")?.textContent || btn.textContent || "";
        const item = btn.parentElement;
        const existing = Array.from(item.children).find((c) => c !== btn && (c.tagName === "P" || c.tagName === "DIV") && c.getAttribute("data-nn-answer") !== null || (c.tagName === "P" && c !== btn));
        const answer = findAnswer(q);
        if (answer || existing) {
          e.preventDefault();
          const icon = btn.querySelector("svg") as SVGElement | null;
          if (existing) {
            existing.remove();
            if (icon) icon.style.transform = "";
            btn.setAttribute("aria-expanded", "false");
          } else if (answer) {
            const p = document.createElement("p");
            const template = document.querySelector<HTMLElement>("[data-nn-answer], .lp-faq-shell p");
            p.setAttribute("style", template?.getAttribute("style") || "margin:0;padding:0 60px 32px 0;font-size:16.5px;line-height:1.65;color:#6B6D74;max-width:680px");
            if (template?.className) p.className = template.className;
            p.setAttribute("data-nn-answer", "1");
            p.innerHTML = answer;
            item.appendChild(p);
            if (icon) icon.style.transform = "rotate(45deg)";
            btn.setAttribute("aria-expanded", "true");
          }
        }
      }
    };
    document.addEventListener("click", onClick);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closePopovers(); };
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  return null;
}
