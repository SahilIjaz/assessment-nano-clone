/* generated from for__devtools.html */
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";

export default function P_for__devtools() {
  return (
    <>
      <div hidden>
      </div>
      <div className="bg-noise" />
      <main className="min-h-screen bg-white text-[#111827]" style={{fontFamily: "var(--font-jakarta)"}}>
        <nav className="fixed top-0 left-0 right-0 z-[1000] px-4 sm:px-6 pt-2 sm:pt-3 transition-all duration-300 opacity-100">
          <div className="flex items-center justify-between max-w-6xl mx-auto relative transition-all duration-200 bg-white backdrop-blur-md border border-[var(--lp-border)] rounded-full shadow-sm px-4 py-1.5 sm:px-6 sm:py-2" style={{fontFamily: "var(--font-jakarta)"}}>
            <div className="flex items-center gap-6 lg:gap-8">
              <a className="navbar-brand flex items-center gap-2 cursor-pointer transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98]" href="/">
                <img src="/logo.svg" alt="naano" className="h-5 w-5 sm:h-6 sm:w-6 object-contain" />
                <span className="font-bold text-base sm:text-lg text-[var(--lp-ink)]">
                  naano
                </span>
              </a>
              <div className="hidden md:flex items-center gap-6 lg:gap-8" style={{opacity: "0"}}>
                <a className="text-[14px] font-medium text-[var(--lp-ink-soft)] hover:text-[var(--lp-ink)] transition-colors duration-150 whitespace-nowrap" href="/#how-it-works">
                  How it works
                </a>
                <a className="text-[14px] font-medium text-[var(--lp-ink-soft)] hover:text-[var(--lp-ink)] transition-colors duration-150 whitespace-nowrap" href="/#pricing">
                  Pricing
                </a>
                <a className="text-[14px] font-medium text-[var(--lp-ink-soft)] hover:text-[var(--lp-ink)] transition-colors duration-150 whitespace-nowrap" href="/#faq">
                  FAQs
                </a>
                <div className="relative">
                  <button type="button" aria-expanded="false" aria-haspopup="true" className="flex items-center gap-1 text-[14px] font-medium text-[var(--lp-ink-soft)] hover:text-[var(--lp-ink)] transition-colors duration-150 whitespace-nowrap">
                    Resources
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 256 256" className="transition-transform duration-150 ">
                      <path d="M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z" />
                    </svg>
                  </button>
                </div>
                <a className="text-[14px] font-medium text-[var(--lp-ink-soft)] hover:text-[var(--lp-ink)] transition-colors duration-150 whitespace-nowrap" href="/about">
                  About us
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3" style={{opacity: "0"}}>
              <a className="hidden md:inline-flex items-center gap-1 font-semibold text-[14px] text-[var(--lp-ink-soft)] hover:text-[var(--lp-ink)] transition-colors whitespace-nowrap" href="/creators">
                I'm a creator
              </a>
              <a href="/login?reauth=1" className="hidden md:inline-flex items-center h-9 px-4 rounded-lg text-[13px] font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer whitespace-nowrap" style={{background: "var(--lp-brand)", fontFamily: "var(--font-jakarta)"}}>
                Sign in
              </a>
              <button type="button" aria-label="Switch language" style={{display: "flex", alignItems: "center", gap: "6px", height: "32px", padding: "0 10px", borderRadius: "8px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", transition: "background 0.1s ease", opacity: "1"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe" aria-hidden="true" style={{color: "var(--v3-text-tertiary, #6B6D74)", flexShrink: "0"}}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                <span style={{display: "inline-block", width: "20px", height: "18px", position: "relative", overflow: "hidden"}}>
                  <span style={{display: "block", position: "absolute", inset: "0", fontSize: "13px", fontWeight: "600", textTransform: "uppercase", color: "var(--v3-text-secondary, #17181C)", letterSpacing: "0.02em", lineHeight: "18px", textAlign: "center", animation: "localeIn 0.3s cubic-bezier(0.2, 0, 0, 1) forwards"}}>
                    EN
                  </span>
                </span>
              </button>
              <style dangerouslySetInnerHTML={{__html: "\n      @keyframes localeIn {\n        from {\n          transform: translateY(100%);\n          opacity: 0;\n        }\n        to {\n          transform: translateY(0);\n          opacity: 1;\n        }\n      }\n    "}} />
              <a href="/register" data-slot="button" data-variant="default" data-size="default" className="shrink-0 items-center justify-center gap-2 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 py-2 has-[>svg]:px-3 hidden md:inline-flex h-8 rounded-full px-4 bg-[var(--lp-ink)] text-white text-[13px] font-medium hover:bg-[var(--lp-footer)] transition-colors duration-150 whitespace-nowrap">
                Get started
              </a>
              <button aria-label="Open menu" className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[var(--lp-surface-3)] transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#787774" viewBox="0 0 256 256">
                  <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
        <section className="relative pt-28 pb-20 sm:pt-32 sm:pb-24 overflow-hidden text-white" style={{background: "linear-gradient(135deg, #111827 0%, #1652F0 100%)"}}>
          <div aria-hidden="true" className="absolute inset-0 opacity-[0.14] pointer-events-none" style={{backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "26px 26px"}} />
          <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="mb-10">
              <a className="text-xs uppercase tracking-[0.14em] text-white/80 hover:text-white transition-colors duration-200 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm" href="/">
                ← Naano
              </a>
            </div>
            <div className="max-w-[840px]">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/85 font-semibold mb-6">
                {"Naano for "}
                Devtools
              </p>
              <h1 className="text-[clamp(32px,5vw,54px)] font-light leading-[1.06] tracking-[-0.025em] mb-7">
                LinkedIn creator marketing for devtools
              </h1>
              <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl">
                Developers are famously ad-resistant — and famously receptive to practitioners showing real workflows. Naano's devtools creators are engineers and DevRel voices whose audiences click deliberately: raw CTR runs slightly lower, but click-to-demo conversion is the highest of any vertical on the platform.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="/register" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#111827] text-sm font-medium hover:bg-white/90 transition-colors duration-200 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
                  {"Start a "}
                  devtools
                  {" campaign"}
                  <span aria-hidden="true">
                    →
                  </span>
                </a>
                <a className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/40 text-white text-sm font-medium hover:bg-white/10 transition-colors duration-200 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60" href="/pricing">
                  See pricing
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className="px-4 sm:px-6 pt-12 sm:pt-16 pb-24">
          <div className="max-w-[840px] mx-auto">
            <div className="text-[17px] text-[#1F2937] leading-[1.75]">
              <h2 className="text-[clamp(22px,2.6vw,30px)] font-light tracking-[-0.02em] text-[#111827] mt-16 mb-5 pt-4 border-t border-[#F3F4F6] mt-4 border-t-0 pt-0">
                Devtools
                {" benchmarks on Naano (Q1 2026)"}
              </h2>
              <p className="my-5">
                First-party cost-per-qualified-click data from the
                {" "}
                <a className="text-[#1652F0] underline underline-offset-4 decoration-[#1652F0]/30 hover:decoration-[#1652F0] transition-colors duration-150 motion-reduce:transition-none" href="/benchmarks/q2-2026">
                  Q2 2026 benchmark report
                </a>
                {", measured across "}
                47
                {" "}
                devtools
                {" "}
                campaigns:
              </p>
              <div className="my-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-5 text-center">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[#6B7280] font-semibold mb-1.5">
                    CPL p10
                  </p>
                  <p className="text-2xl font-light tracking-[-0.02em] text-[#111827] tabular-nums">
                    €13
                  </p>
                </div>
                <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-5 text-center">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[#6B7280] font-semibold mb-1.5">
                    CPL median
                  </p>
                  <p className="text-2xl font-light tracking-[-0.02em] text-[#111827] tabular-nums">
                    €19
                  </p>
                </div>
                <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-5 text-center">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[#6B7280] font-semibold mb-1.5">
                    CPL p90
                  </p>
                  <p className="text-2xl font-light tracking-[-0.02em] text-[#111827] tabular-nums">
                    €26
                  </p>
                </div>
                <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-5 text-center">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[#6B7280] font-semibold mb-1.5">
                    Campaigns
                  </p>
                  <p className="text-2xl font-light tracking-[-0.02em] text-[#111827] tabular-nums">
                    n=47
                  </p>
                </div>
              </div>
              <p className="my-5">
                Devtools trends slightly above the €18 platform mean: technical content takes longer to draft (raising creator pricing) and engineering audiences click more deliberately. The offset is downstream — conversion-to-demo on devtools clicks is the best on the platform.
              </p>
              <p className="my-5 text-sm text-[#6B7280]">
                Reference: platform-wide average CPL was €18 vs €55–90 typical for LinkedIn Ads in B2B SaaS. CPL = cost per qualified click (UTM-tracked, ≥30s on-site engagement). Cite as: Naano marketplace data, Q1 2026, n=
                47
                {" "}
                Devtools
                {" campaigns ("}
                https://naano.com/for/devtools
                ).
              </p>
              <h2 className="text-[clamp(22px,2.6vw,30px)] font-light tracking-[-0.02em] text-[#111827] mt-16 mb-5 pt-4 border-t border-[#F3F4F6]">
                {"Who the "}
                devtools
                {" creators are"}
              </h2>
              <p className="my-5">
                Staff engineers, DevRel practitioners, and technical founders with 1k–10k followers posting about infrastructure, tooling, and developer workflows — audiences that are largely working engineers.
              </p>
              <p className="my-5">
                Every creator publishes a fixed offer price — from €20 per post, median ~€150 — and briefs stay one page so posts read native to the creator's feed. Why small vertical creators beat big generalist ones is covered in
                {" "}
                <a className="text-[#1652F0] underline underline-offset-4 decoration-[#1652F0]/30 hover:decoration-[#1652F0] transition-colors duration-150 motion-reduce:transition-none" href="/blog/nano-vs-macro-creators-b2b-ctr">
                  nano vs macro creators in B2B
                </a>
                .
              </p>
              <h2 className="text-[clamp(22px,2.6vw,30px)] font-light tracking-[-0.02em] text-[#111827] mt-16 mb-5 pt-4 border-t border-[#F3F4F6]">
                {"What "}
                devtools
                {" teams use Naano for"}
              </h2>
              <ul className="my-5 list-disc pl-6 marker:text-[#9CA3AF] space-y-2">
                <li>
                  Launch an API, SDK, or infrastructure product through engineers who show it in a real workflow
                </li>
                <li>
                  Build credibility in a category where developer audiences discount anything that reads as marketing
                </li>
                <li>
                  Drive qualified sign-ups for a self-serve developer product without burning budget on broad ads
                </li>
              </ul>
              <p className="my-5">
                The mechanics are the same in every vertical: book vetted creators at a fixed price, review drafts, track qualified clicks per post. The full playbook is in
                {" "}
                <a className="text-[#1652F0] underline underline-offset-4 decoration-[#1652F0]/30 hover:decoration-[#1652F0] transition-colors duration-150 motion-reduce:transition-none" href="/blog/launch-b2b-linkedin-creator-campaign">
                  how to launch a B2B LinkedIn creator campaign in 30 days
                </a>
                , and the strategic case in
                {" "}
                <a className="text-[#1652F0] underline underline-offset-4 decoration-[#1652F0]/30 hover:decoration-[#1652F0] transition-colors duration-150 motion-reduce:transition-none" href="/blog/creator-led-growth-b2b">
                  the complete creator-led growth guide
                </a>
                .
              </p>
              <h2 className="text-[clamp(22px,2.6vw,30px)] font-light tracking-[-0.02em] text-[#111827] mt-16 mb-5 pt-4 border-t border-[#F3F4F6]">
                FAQ
              </h2>
              <div className="my-8 space-y-8">
                <div>
                  <h3 className="text-[clamp(18px,2vw,22px)] font-medium tracking-[-0.01em] text-[#111827] mb-3">
                    Do developer audiences accept sponsored posts?
                  </h3>
                  <p className="text-[#374151] leading-[1.7]">
                    Yes, when the post is written by a practitioner in their own voice about a real workflow. Naano briefs are one page — context, constraints, link — and creators draft in their own words, which is why devtools CTR holds up.
                  </p>
                </div>
                <div>
                  <h3 className="text-[clamp(18px,2vw,22px)] font-medium tracking-[-0.01em] text-[#111827] mb-3">
                    What does a devtools campaign cost?
                  </h3>
                  <p className="text-[#374151] leading-[1.7]">
                    Fixed pricing from €20/post. Q1 2026 median CPL was €19 across 47 devtools campaigns — slightly above the platform mean, offset by the highest click-to-demo conversion of any vertical.
                  </p>
                </div>
                <div>
                  <h3 className="text-[clamp(18px,2vw,22px)] font-medium tracking-[-0.01em] text-[#111827] mb-3">
                    Can technical accuracy be enforced in the brief?
                  </h3>
                  <p className="text-[#374151] leading-[1.7]">
                    The brief carries your constraints and proof points, and you review the draft before it publishes. Edits stay light to keep the post native, but factual corrections are always in scope.
                  </p>
                </div>
              </div>
              <h2 className="text-[clamp(22px,2.6vw,30px)] font-light tracking-[-0.02em] text-[#111827] mt-16 mb-5 pt-4 border-t border-[#F3F4F6]">
                Naano in other verticals
              </h2>
              <div className="my-6 flex flex-wrap gap-2">
                <a className="text-sm px-3.5 py-1.5 rounded-full border border-[#E5E7EB] text-[#374151] hover:border-[#9CA3AF] hover:text-[#111827] transition-colors duration-150 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111827] focus-visible:ring-offset-2" href="/for/sales-tech">
                  Sales-tech
                </a>
                <a className="text-sm px-3.5 py-1.5 rounded-full border border-[#E5E7EB] text-[#374151] hover:border-[#9CA3AF] hover:text-[#111827] transition-colors duration-150 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111827] focus-visible:ring-offset-2" href="/for/revops">
                  RevOps
                </a>
                <a className="text-sm px-3.5 py-1.5 rounded-full border border-[#E5E7EB] text-[#374151] hover:border-[#9CA3AF] hover:text-[#111827] transition-colors duration-150 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111827] focus-visible:ring-offset-2" href="/for/product">
                  Product
                </a>
                <a className="text-sm px-3.5 py-1.5 rounded-full border border-[#E5E7EB] text-[#374151] hover:border-[#9CA3AF] hover:text-[#111827] transition-colors duration-150 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111827] focus-visible:ring-offset-2" href="/for/hr-tech">
                  HR-tech
                </a>
                <a className="text-sm px-3.5 py-1.5 rounded-full border border-[#E5E7EB] text-[#374151] hover:border-[#9CA3AF] hover:text-[#111827] transition-colors duration-150 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111827] focus-visible:ring-offset-2" href="/for/fintech">
                  Fintech
                </a>
                <a className="text-sm px-3.5 py-1.5 rounded-full border border-[#E5E7EB] text-[#374151] hover:border-[#9CA3AF] hover:text-[#111827] transition-colors duration-150 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111827] focus-visible:ring-offset-2" href="/for/marketing-ops">
                  Marketing-ops
                </a>
                <a className="text-sm px-3.5 py-1.5 rounded-full border border-[#E5E7EB] text-[#374151] hover:border-[#9CA3AF] hover:text-[#111827] transition-colors duration-150 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111827] focus-visible:ring-offset-2" href="/for/vertical-saas">
                  Vertical SaaS
                </a>
              </div>
              <p className="my-5 text-sm text-[#6B7280]">
                Comparing tools instead? See the
                {" "}
                <a className="text-[#1652F0] underline underline-offset-4 decoration-[#1652F0]/30 hover:decoration-[#1652F0] transition-colors duration-150 motion-reduce:transition-none" href="/best-b2b-influencer-marketing-platforms-2026">
                  best B2B influencer marketing platforms in 2026
                </a>
                .
              </p>
            </div>
            <div className="mt-14 p-7 sm:p-9 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB]">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#6B7280] mb-3">
                Get started
              </p>
              <h2 className="text-2xl sm:text-3xl font-light tracking-[-0.02em] text-[#111827] mb-4">
                {"Book vetted "}
                devtools
                {" creators at a fixed price."}
              </h2>
              <p className="text-[#4B5563] leading-relaxed mb-6 max-w-xl">
                2,000+ vetted LinkedIn micro-creators across B2B verticals. Fixed per-post pricing from €20, no platform subscription on Self-Serve, qualified clicks tracked on every post.
              </p>
              <a href="/register" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111827] text-white text-sm font-medium hover:bg-[#1F2937] transition-colors duration-200 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111827] focus-visible:ring-offset-2">
                Start a campaign
                <span aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
        <SiteFooter variant="8b5888" />
      </main>
    </>
  );
}
