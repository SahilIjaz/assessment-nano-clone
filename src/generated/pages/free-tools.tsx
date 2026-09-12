/* generated from free-tools.html */
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";

export default function P_free_tools() {
  return (
    <>
      <div hidden>
      </div>
      <div className="bg-noise" />
      <main className="min-h-screen bg-[#FCFCFB] text-[#17181C]" style={{fontFamily: "var(--font-jakarta)"}}>
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
        <section className="relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{background: "radial-gradient(640px 320px at 50% -120px, rgba(22,82,240,0.08), transparent 70%)"}} />
          <div className="relative mx-auto max-w-[900px] px-4 sm:px-6 text-center">
            <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#E4E1DC] bg-white px-4 py-2 text-[13px] font-medium text-[#55575E] shadow-[0_1px_2px_rgba(23,24,28,0.04)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles text-[#1652F0]" aria-hidden="true">
                <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                <path d="M20 2v4" />
                <path d="M22 4h-4" />
                <circle cx="4" cy="20" r="2" />
              </svg>
              Free tools by Naano
            </span>
            <h1 className="mt-8 text-4xl sm:text-5xl lg:text-[60px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#17181C]">
              Free tools for B2B creator marketing
              <span className="text-[#1652F0]">
                .
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-[640px] text-lg sm:text-[19px] leading-relaxed text-[#55575E]">
              Practical tools for teams running LinkedIn creator campaigns. No account, no payment method, no commitment — start with the one below.
            </p>
          </div>
        </section>
        <section className="pb-16 sm:pb-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
              <a className="group flex flex-col rounded-2xl border border-[#ECEAE6] bg-white p-7 shadow-[0_2px_10px_rgba(23,24,28,0.05)] transition-all duration-200 hover:-translate-y-1 hover:border-[#1652F0]/40 hover:shadow-[0_18px_40px_rgba(23,24,28,0.10)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1652F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFCFB]" href="/selection">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F0FE] text-[#1652F0]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-search" aria-hidden="true">
                      <circle cx="10" cy="7" r="4" />
                      <path d="M10.3 15H7a4 4 0 0 0-4 4v2" />
                      <circle cx="17" cy="17" r="3" />
                      <path d="m21 21-1.9-1.9" />
                    </svg>
                  </span>
                  <span className="inline-flex items-center rounded-full border border-[#E4E1DC] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#55575E]">
                    Free
                  </span>
                </div>
                <h2 className="mt-5 text-[20px] font-semibold leading-snug tracking-[-0.02em] text-[#17181C]">
                  Free LinkedIn creator search
                </h2>
                <p className="mt-1.5 text-[15px] font-medium text-[#1652F0]">
                  Get a hand-picked creator shortlist in 48 hours
                </p>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#55575E]">
                  Describe the campaign you want to launch and a real person at Naano finds every LinkedIn creator genuinely worth contacting — inside the Naano marketplace and across the wider LinkedIn ecosystem. You get names, pricing, and audience fit within 48 hours. Free, no account required, no commitment.
                </p>
                <span className="mt-5 inline-flex self-start items-center gap-2 rounded-full border border-[#ECEAE6] bg-[#FAFAF9] px-3 py-1.5 text-[12px] font-medium text-[#55575E]">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#1652F0]" />
                  Hand-picked by a real human, not an algorithm
                </span>
                <span className="mt-3 text-[13px] text-[#6B6D74]">
                  Free · 48h turnaround · No account needed
                </span>
                <span className="mt-5 inline-flex items-center gap-2 border-t border-[#F1EFEA] pt-5 text-[15px] font-semibold text-[#17181C] transition-colors group-hover:text-[#1652F0] motion-reduce:transition-none">
                  Open the tool
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </a>
              <a className="group flex flex-col rounded-2xl border border-[#ECEAE6] bg-white p-7 shadow-[0_2px_10px_rgba(23,24,28,0.05)] transition-all duration-200 hover:-translate-y-1 hover:border-[#1652F0]/40 hover:shadow-[0_18px_40px_rgba(23,24,28,0.10)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1652F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFCFB]" href="/free-tools/linkedin-creator-worth-calculator">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F0FE] text-[#1652F0]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calculator" aria-hidden="true">
                      <rect width="16" height="20" x="4" y="2" rx="2" />
                      <line x1="8" x2="16" y1="6" y2="6" />
                      <line x1="16" x2="16" y1="14" y2="18" />
                      <path d="M16 10h.01" />
                      <path d="M12 10h.01" />
                      <path d="M8 10h.01" />
                      <path d="M12 14h.01" />
                      <path d="M8 14h.01" />
                      <path d="M12 18h.01" />
                      <path d="M8 18h.01" />
                    </svg>
                  </span>
                  <span className="inline-flex items-center rounded-full border border-[#E4E1DC] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#55575E]">
                    Free
                  </span>
                </div>
                <h2 className="mt-5 text-[20px] font-semibold leading-snug tracking-[-0.02em] text-[#17181C]">
                  LinkedIn Creator Worth Calculator
                </h2>
                <p className="mt-1.5 text-[15px] font-medium text-[#1652F0]">
                  Find out what a sponsored post from any creator should cost
                </p>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#55575E]">
                  Enter a LinkedIn creator's follower count, average reactions and comments, and their niche, and get an instant flat-fee estimate of what one sponsored post is worth — plus their engagement rating against B2B benchmarks. Built for creators setting their rate and for companies budgeting a campaign. Free, no account required.
                </p>
                <span className="mt-5 inline-flex self-start items-center gap-2 rounded-full border border-[#ECEAE6] bg-[#FAFAF9] px-3 py-1.5 text-[12px] font-medium text-[#55575E]">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#1652F0]" />
                  Benchmarked against B2B engagement tiers
                </span>
                <span className="mt-3 text-[13px] text-[#6B6D74]">
                  Free · Instant result · No account needed
                </span>
                <span className="mt-5 inline-flex items-center gap-2 border-t border-[#F1EFEA] pt-5 text-[15px] font-semibold text-[#17181C] transition-colors group-hover:text-[#1652F0] motion-reduce:transition-none">
                  Open the tool
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </a>
              <a className="group flex flex-col rounded-2xl border border-[#ECEAE6] bg-white p-7 shadow-[0_2px_10px_rgba(23,24,28,0.05)] transition-all duration-200 hover:-translate-y-1 hover:border-[#1652F0]/40 hover:shadow-[0_18px_40px_rgba(23,24,28,0.10)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1652F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFCFB]" href="/free-tools/linkedin-engagement-rate-calculator">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F0FE] text-[#1652F0]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up" aria-hidden="true">
                      <path d="M16 7h6v6" />
                      <path d="m22 7-8.5 8.5-5-5L2 17" />
                    </svg>
                  </span>
                  <span className="inline-flex items-center rounded-full border border-[#E4E1DC] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#55575E]">
                    Free
                  </span>
                </div>
                <h2 className="mt-5 text-[20px] font-semibold leading-snug tracking-[-0.02em] text-[#17181C]">
                  LinkedIn Engagement Rate Calculator
                </h2>
                <p className="mt-1.5 text-[15px] font-medium text-[#1652F0]">
                  Calculate your engagement rate and compare it to 2026 benchmarks
                </p>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#55575E]">
                  Enter your follower count and your average reactions, comments and reposts per post, and get your LinkedIn engagement rate two ways — by followers and by impressions — rated against 2026 B2B benchmarks for your audience size, with concrete tips to improve it. Free, no account required.
                </p>
                <span className="mt-5 inline-flex self-start items-center gap-2 rounded-full border border-[#ECEAE6] bg-[#FAFAF9] px-3 py-1.5 text-[12px] font-medium text-[#55575E]">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#1652F0]" />
                  Rated against 2026 B2B benchmarks
                </span>
                <span className="mt-3 text-[13px] text-[#6B6D74]">
                  Free · Instant result · No account needed
                </span>
                <span className="mt-5 inline-flex items-center gap-2 border-t border-[#F1EFEA] pt-5 text-[15px] font-semibold text-[#17181C] transition-colors group-hover:text-[#1652F0] motion-reduce:transition-none">
                  Open the tool
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </a>
              <a className="group flex flex-col rounded-2xl border border-[#ECEAE6] bg-white p-7 shadow-[0_2px_10px_rgba(23,24,28,0.05)] transition-all duration-200 hover:-translate-y-1 hover:border-[#1652F0]/40 hover:shadow-[0_18px_40px_rgba(23,24,28,0.10)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1652F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFCFB]" href="/free-tools/sponsored-post-delivery-odds-estimator">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F0FE] text-[#1652F0]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </span>
                  <span className="inline-flex items-center rounded-full border border-[#E4E1DC] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#55575E]">
                    Free
                  </span>
                </div>
                <h2 className="mt-5 text-[20px] font-semibold leading-snug tracking-[-0.02em] text-[#17181C]">
                  Sponsored Post Delivery Odds Estimator
                </h2>
                <p className="mt-1.5 text-[15px] font-medium text-[#1652F0]">
                  See how often offers at your price actually get published
                </p>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#55575E]">
                  Enter what you plan to offer a LinkedIn creator per post and see how often real bookings at that price ended in a published post, how often creators simply never answered, and what brands actually paid at that audience size. Built on 239 real sponsored-post bookings from the Naano marketplace, not rules of thumb. Free, no account required.
                </p>
                <span className="mt-5 inline-flex self-start items-center gap-2 rounded-full border border-[#ECEAE6] bg-[#FAFAF9] px-3 py-1.5 text-[12px] font-medium text-[#55575E]">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#1652F0]" />
                  Built on 239 real bookings
                </span>
                <span className="mt-3 text-[13px] text-[#6B6D74]">
                  Free · Built on 239 real bookings · No account needed
                </span>
                <span className="mt-5 inline-flex items-center gap-2 border-t border-[#F1EFEA] pt-5 text-[15px] font-semibold text-[#17181C] transition-colors group-hover:text-[#1652F0] motion-reduce:transition-none">
                  Open the tool
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </a>
              <a className="group flex flex-col rounded-2xl border border-[#ECEAE6] bg-white p-7 shadow-[0_2px_10px_rgba(23,24,28,0.05)] transition-all duration-200 hover:-translate-y-1 hover:border-[#1652F0]/40 hover:shadow-[0_18px_40px_rgba(23,24,28,0.10)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1652F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFCFB]" href="/free-tools/creator-campaign-budget-planner">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F0FE] text-[#1652F0]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-pie" aria-hidden="true">
                      <path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z" />
                      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                    </svg>
                  </span>
                  <span className="inline-flex items-center rounded-full border border-[#E4E1DC] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#55575E]">
                    Free
                  </span>
                </div>
                <h2 className="mt-5 text-[20px] font-semibold leading-snug tracking-[-0.02em] text-[#17181C]">
                  Creator Campaign Budget Planner
                </h2>
                <p className="mt-1.5 text-[15px] font-medium text-[#1652F0]">
                  Turn a budget into published posts, not just booked ones
                </p>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#55575E]">
                  Enter your campaign budget and see how many sponsored LinkedIn posts it books at real transacted medians — then how many of those historically ended in a published post, and what that makes the true cost per published post. Built on 239 real sponsored-post bookings from the Naano marketplace. Free, no account required.
                </p>
                <span className="mt-5 inline-flex self-start items-center gap-2 rounded-full border border-[#ECEAE6] bg-[#FAFAF9] px-3 py-1.5 text-[12px] font-medium text-[#55575E]">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#1652F0]" />
                  Plans on published posts, not booked ones
                </span>
                <span className="mt-3 text-[13px] text-[#6B6D74]">
                  Free · Built on 239 real bookings · No account needed
                </span>
                <span className="mt-5 inline-flex items-center gap-2 border-t border-[#F1EFEA] pt-5 text-[15px] font-semibold text-[#17181C] transition-colors group-hover:text-[#1652F0] motion-reduce:transition-none">
                  Open the tool
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </a>
              <div className="flex flex-col justify-center rounded-2xl border border-dashed border-[#E4E1DC] bg-[#FAFAF9] p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#ECEAE6] bg-white text-[#6B6D74]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles" aria-hidden="true">
                    <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                    <path d="M20 2v4" />
                    <path d="M22 4h-4" />
                    <circle cx="4" cy="20" r="2" />
                  </svg>
                </span>
                <h2 className="mt-5 text-[20px] font-semibold tracking-[-0.02em] text-[#17181C]">
                  More tools coming
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-[#55575E]">
                  We ship a new free tool whenever we build something internally that B2B teams keep asking us for. In the meantime, the
                  {" "}
                  <a className="font-semibold text-[#1652F0] underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1652F0] rounded-sm" href="/blog">
                    blog
                  </a>
                  {" "}
                  covers the playbooks.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="border-t border-[#ECEAE6] py-16 sm:py-20">
          <div className="max-w-[820px] mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-[38px] font-semibold tracking-[-0.03em] text-[#17181C]">
              Frequently asked questions
              <span className="text-[#1652F0]">
                .
              </span>
            </h2>
            <div className="mt-8">
              <div className="border-t border-[#ECEAE6] py-7 first:border-t-0 first:pt-2">
                <h3 className="text-[18px] font-medium tracking-[-0.015em] text-[#17181C]">
                  Are Naano's free tools really free?
                </h3>
                <p className="mt-3 max-w-[680px] text-[16px] leading-[1.65] text-[#6B6D74]">
                  Yes. The free LinkedIn creator search costs nothing, requires no account and no payment method, and carries no obligation to book anything afterwards. You keep the shortlist whether or not you run a campaign with Naano.
                </p>
              </div>
              <div className="border-t border-[#ECEAE6] py-7 first:border-t-0 first:pt-2">
                <h3 className="text-[18px] font-medium tracking-[-0.015em] text-[#17181C]">
                  What is the free LinkedIn creator search?
                </h3>
                <p className="mt-3 max-w-[680px] text-[16px] leading-[1.65] text-[#6B6D74]">
                  You describe your campaign — your product, your audience, and your budget — and a member of the Naano team manually builds a shortlist of LinkedIn creators whose audience genuinely overlaps your buyer. Each profile comes with pricing, audience fit, and the reason it belongs in your campaign. It is delivered within 48 hours.
                </p>
              </div>
              <div className="border-t border-[#ECEAE6] py-7 first:border-t-0 first:pt-2">
                <h3 className="text-[18px] font-medium tracking-[-0.015em] text-[#17181C]">
                  Do I have to run my campaign on Naano to use the tools?
                </h3>
                <p className="mt-3 max-w-[680px] text-[16px] leading-[1.65] text-[#6B6D74]">
                  No. The shortlist is yours to use however you want, including contacting the creators directly yourself. Naano's bet is that booking, briefing, paying, and tracking those creators in one place is easier than doing it by hand — but that is your decision to make after you see the list.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="border-t border-[#ECEAE6] py-16 sm:py-20">
          <div className="max-w-[820px] mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[#17181C]">
              Keep reading
              <span className="text-[#1652F0]">
                .
              </span>
            </h2>
            <ul className="mt-6 divide-y divide-[#ECEAE6]">
              <li>
                <a className="group flex min-h-11 items-center justify-between gap-4 py-3.5 text-[16px] font-medium text-[#17181C] transition-colors hover:text-[#1652F0] motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1652F0] rounded-sm" href="/blog/how-to-find-b2b-creators-linkedin">
                  How to find B2B creators on LinkedIn
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right shrink-0 text-[#1652F0] transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </li>
              <li>
                <a className="group flex min-h-11 items-center justify-between gap-4 py-3.5 text-[16px] font-medium text-[#17181C] transition-colors hover:text-[#1652F0] motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1652F0] rounded-sm" href="/blog/best-b2b-creator-marketplace">
                  Best B2B creator marketplaces in 2026 (ranked)
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right shrink-0 text-[#1652F0] transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </li>
              <li>
                <a className="group flex min-h-11 items-center justify-between gap-4 py-3.5 text-[16px] font-medium text-[#17181C] transition-colors hover:text-[#1652F0] motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1652F0] rounded-sm" href="/blog/what-is-a-b2b-creator-marketplace">
                  What is a B2B creator marketplace?
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right shrink-0 text-[#1652F0] transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </li>
              <li>
                <a className="group flex min-h-11 items-center justify-between gap-4 py-3.5 text-[16px] font-medium text-[#17181C] transition-colors hover:text-[#1652F0] motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1652F0] rounded-sm" href="/blog/launch-b2b-linkedin-creator-campaign">
                  How to launch your first LinkedIn creator campaign in 30 days
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right shrink-0 text-[#1652F0] transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </li>
              <li>
                <a className="group flex min-h-11 items-center justify-between gap-4 py-3.5 text-[16px] font-medium text-[#17181C] transition-colors hover:text-[#1652F0] motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1652F0] rounded-sm" href="/blog/b2b-influencer-marketing-cost">
                  How much does B2B influencer marketing cost in 2026?
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right shrink-0 text-[#1652F0] transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
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
