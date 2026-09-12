/* generated from reports.html */
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";

export default function P_reports() {
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
        <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden text-white" style={{background: "linear-gradient(135deg, #111827 0%, #1652F0 100%)"}}>
          <div aria-hidden="true" className="absolute inset-0 opacity-[0.14] pointer-events-none" style={{backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "26px 26px"}} />
          <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6">
            <a className="text-xs uppercase tracking-[0.14em] text-white/80 hover:text-white transition-colors duration-200 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm" href="/">
              ← Naano
            </a>
            <h1 className="mt-8 text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] max-w-[900px]">
              B2B LinkedIn creator marketing, measured
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/85 max-w-[680px] leading-relaxed">
              First-party data from the Naano marketplace: what sponsored LinkedIn posts really cost, and what B2B creator campaigns really deliver. Every number ships with its sample size, time period and methodology — built to be cited.
            </p>
          </div>
        </section>
        <section className="py-16 sm:py-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <a className="group flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-[0_1px_3px_rgba(17,24,39,0.05)] transition-all duration-200 hover:border-[#1652F0]/40 hover:shadow-[0_12px_32px_rgba(22,82,240,0.10)] motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1652F0]" href="/blog/linkedin-sponsored-post-price-index-2026">
                <span className="inline-flex self-start items-center rounded-full bg-[#1652F0]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#1652F0]">
                  First-party data
                </span>
                <h2 className="mt-5 text-xl font-bold tracking-[-0.02em] text-[#111827]">
                  LinkedIn Sponsored Post Price Index 2026
                </h2>
                <p className="mt-2 text-[15px] font-semibold text-[#1652F0]">
                  What sponsored LinkedIn posts actually cost, from real bookings
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-[#4B5563] flex-1">
                  Transacted prices from 239 sponsored-post bookings on the Naano marketplace between June and August 2026: median €84 per post for creators under 5K followers, €180 at 5–10K, €312 at 10–25K — against rate-card guides quoting $500–$2,500 for the same tiers. Includes price-spread analysis (a 25x spread inside a single follower tier), how much follower count actually explains price (~29%), and delivery odds by price level.
                </p>
                <span className="mt-5 text-[13px] text-[#6B7280]">
                  n=239 bookings · June–August 2026 · First-party transaction data
                </span>
                <span className="mt-4 text-[15px] font-bold text-[#111827] group-hover:text-[#1652F0] transition-colors motion-reduce:transition-none">
                  Read the report →
                </span>
              </a>
              <a className="group flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-[0_1px_3px_rgba(17,24,39,0.05)] transition-all duration-200 hover:border-[#1652F0]/40 hover:shadow-[0_12px_32px_rgba(22,82,240,0.10)] motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1652F0]" href="/benchmarks/q2-2026">
                <span className="inline-flex self-start items-center rounded-full bg-[#1652F0]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#1652F0]">
                  First-party data
                </span>
                <h2 className="mt-5 text-xl font-bold tracking-[-0.02em] text-[#111827]">
                  Q2 2026 B2B Creator-Led Growth Benchmarks
                </h2>
                <p className="mt-2 text-[15px] font-semibold text-[#1652F0]">
                  CPL, CTR and conversion benchmarks from 312 B2B creator campaigns
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-[#4B5563] flex-1">
                  First-party benchmark dataset covering cost per qualified click, CTR, time-to-launch and conversion rates for B2B creator campaigns: 312 campaigns and 1,847 sponsored posts measured in Q1 2026, with per-vertical medians, full methodology, sample sizes and limitations. Historical dataset — measured under Naano's earlier pricing model and labeled as such; performance benchmarks remain valid as reference points.
                </p>
                <span className="mt-5 text-[13px] text-[#6B7280]">
                  n=312 campaigns · 1,847 posts · Q1 2026 data · Dataset schema
                </span>
                <span className="mt-4 text-[15px] font-bold text-[#111827] group-hover:text-[#1652F0] transition-colors motion-reduce:transition-none">
                  Read the report →
                </span>
              </a>
              <div className="flex flex-col justify-center rounded-2xl border border-dashed border-[#E5E7EB] bg-[#FAFAFA] p-7">
                <h2 className="text-xl font-bold tracking-[-0.02em] text-[#111827]">
                  LinkedIn Creator Marketing Benchmarks 2026
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-[#4B5563]">
                  {"The annual edition — prices, engagement and delivery data across every follower tier of the marketplace — ships once the underlying samples are large enough to publish. Until then, the two reports above carry the current data, and the "}
                  <a className="font-semibold text-[#1652F0] underline underline-offset-2" href="/free-tools">
                    free tools
                  </a>
                  {" are built on the same dataset."}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 sm:py-20 bg-[#FAFAFA] border-y border-[#E5E7EB]">
          <div className="max-w-[820px] mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[#111827]">
              Using this data
            </h2>
            <div className="mt-10 space-y-8">
              <div>
                <h3 className="text-lg font-bold text-[#111827]">
                  Can I cite Naano's data in an article or report?
                </h3>
                <p className="mt-2 text-[16px] leading-relaxed text-[#4B5563]">
                  Yes — that is what these reports are for. Cite the specific report with a link, e.g. "Naano Index, n=239 sponsored-post bookings, June–August 2026 (naano.com/reports)". Every number is published with its sample size and time period; please carry both in the citation. Claims we attribute to third parties (Edelman, LinkedIn benchmarks) should be attributed to the original source, not to Naano.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#111827]">
                  Where does the data come from?
                </h3>
                <p className="mt-2 text-[16px] leading-relaxed text-[#4B5563]">
                  From anonymized, aggregated transactions and campaigns on the Naano marketplace — the B2B LinkedIn creator marketplace. No customer or creator is identifiable in any published number. Each report states its own sample, time window and known limitations; we publish the caveats alongside the findings.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#111827]">
                  How often are the reports updated?
                </h3>
                <p className="mt-2 text-[16px] leading-relaxed text-[#4B5563]">
                  Each report shows its publication date, and a visible dateModified when it is genuinely refreshed with new data — we do not bump dates for freshness. New editions ship when the underlying marketplace data reaches a sample size worth publishing.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 sm:py-20">
          <div className="max-w-[820px] mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#111827]">
              Built on the same data
            </h2>
            <ul className="mt-6 space-y-3">
              <li>
                <a className="text-[16px] font-medium text-[#1652F0] hover:underline underline-offset-2" href="/free-tools/sponsored-post-delivery-odds-estimator">
                  Sponsored Post Delivery Odds Estimator (free tool)
                </a>
              </li>
              <li>
                <a className="text-[16px] font-medium text-[#1652F0] hover:underline underline-offset-2" href="/free-tools/linkedin-creator-worth-calculator">
                  LinkedIn Creator Worth Calculator (free tool)
                </a>
              </li>
              <li>
                <a className="text-[16px] font-medium text-[#1652F0] hover:underline underline-offset-2" href="/blog/b2b-influencer-marketing-cost">
                  How much does B2B influencer marketing cost in 2026?
                </a>
              </li>
              <li>
                <a className="text-[16px] font-medium text-[#1652F0] hover:underline underline-offset-2" href="/blog/how-much-charge-sponsored-linkedin-post">
                  How much should you charge for a sponsored LinkedIn post?
                </a>
              </li>
              <li>
                <a className="text-[16px] font-medium text-[#1652F0] hover:underline underline-offset-2" href="/best-b2b-influencer-marketing-platforms-2026">
                  Best B2B influencer marketing platforms 2026 (ranked)
                </a>
              </li>
            </ul>
          </div>
        </section>
        <SiteFooter variant="8b5888" />
      </main>
    </>
  );
}
