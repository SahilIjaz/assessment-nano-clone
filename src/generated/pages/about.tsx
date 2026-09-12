/* generated from about.html */
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";

export default function P_about() {
  return (
    <>
      <div hidden>
      </div>
      <div className="bg-noise" />
      <main className="min-h-screen bg-white" style={{fontFamily: "var(--font-jakarta)"}}>
        <nav className="fixed top-0 left-0 right-0 z-[1000] px-4 sm:px-6 pt-3 sm:pt-4 md:pt-6 transition-all duration-300 opacity-100">
          <div className="flex items-center justify-between max-w-7xl mx-auto relative transition-all duration-200 px-0 py-0" style={{fontFamily: "var(--font-jakarta)"}}>
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
        <section className="bg-white pt-28 sm:pt-32 pb-20 px-4 sm:px-6">
          <div className="max-w-[1100px] mx-auto text-center">
            <div className="mb-16" style={{opacity: "0", transform: "translateY(16px)"}}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-5" style={{color: "#1652F0"}}>
                Our story
              </p>
              <h1 className="text-[clamp(32px,5vw,60px)] font-light leading-[1.1] tracking-[-0.025em] text-foreground mb-5">
                Built by founders,
                <br />
                for founders.
              </h1>
              <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
                The B2B LinkedIn creator marketplace connecting companies with vetted creators.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-12 sm:gap-20" style={{opacity: "0", transform: "translateY(20px)"}}>
              <div className="flex flex-col items-center gap-3">
                <a href="https://www.linkedin.com/in/alexis-jarre/" target="_blank" rel="noopener noreferrer" className="relative group block">
                  <img alt="Alexis" loading="lazy" width="112" height="112" decoding="async" data-nimg="1" className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-md" style={{color: "transparent", objectPosition: "center 0.2%"}} src="/alex.png" />
                  <div className="absolute bottom-0.5 right-0.5 w-8 h-8 rounded-full bg-[#0A66C2] flex items-center justify-center ring-2 ring-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin w-4 h-4 text-white" aria-hidden="true">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                </a>
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">
                    Alexis
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    CMO & Co-founder
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <a href="https://www.linkedin.com/in/justine-namour-709951388/" target="_blank" rel="noopener noreferrer" className="relative group block">
                  <img alt="Justine" loading="lazy" width="112" height="112" decoding="async" data-nimg="1" className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-md" style={{color: "transparent", objectPosition: "center 10%"}} src="/ju.jpeg" />
                  <div className="absolute bottom-0.5 right-0.5 w-8 h-8 rounded-full bg-[#0A66C2] flex items-center justify-center ring-2 ring-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin w-4 h-4 text-white" aria-hidden="true">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                </a>
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">
                    Justine
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    CTO & Co-founder
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <a href="https://www.linkedin.com/in/thomas-marcelle/" target="_blank" rel="noopener noreferrer" className="relative group block">
                  <img alt="Thomas" loading="lazy" width="112" height="112" decoding="async" data-nimg="1" className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-md" style={{color: "transparent", objectPosition: "center 10%"}} src="/tom.png" />
                  <div className="absolute bottom-0.5 right-0.5 w-8 h-8 rounded-full bg-[#0A66C2] flex items-center justify-center ring-2 ring-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin w-4 h-4 text-white" aria-hidden="true">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                </a>
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">
                    Thomas
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    CEO & Co-founder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#F3F4F6] py-20 px-4 sm:px-6">
          <div className="max-w-[760px] mx-auto">
            <div style={{opacity: "0", transform: "translateY(16px)"}}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-5 text-muted-foreground">
                How we started
              </p>
              <h2 className="text-[clamp(24px,3vw,36px)] font-light leading-[1.15] tracking-[-0.02em] text-foreground mb-8">
                Built on Proven Results
              </h2>
              <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  Naano connects companies that want to grow with LinkedIn creators who want to monetize their audience.
                </p>
                <p>
                  We believe growth works better when it's driven by people, not ads.
                </p>
                <p>
                  That's why we help businesses scale through Creator-Led Growth: real professionals talking to real audiences.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white py-20 px-4 sm:px-6">
          <div className="max-w-[760px] mx-auto">
            <div style={{opacity: "0", transform: "translateY(16px)"}}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-5" style={{color: "#1652F0"}}>
                Our mission
              </p>
              <h2 className="text-[clamp(24px,3vw,36px)] font-light leading-[1.15] tracking-[-0.02em] text-foreground mb-6">
                Make creator marketing your most effective revenue channel.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                We connect B2B companies with LinkedIn micro-creators who deliver:
              </p>
              <div className="space-y-3 mt-6">
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check mt-0.5 flex-shrink-0" aria-hidden="true" style={{color: "#1652F0"}}>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-base text-foreground">
                    Strong credibility in their industry
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check mt-0.5 flex-shrink-0" aria-hidden="true" style={{color: "#1652F0"}}>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-base text-foreground">
                    Trust that converts into growth
                  </span>
                </div>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed mt-6">
                Real professionals talking to real audiences-at scale.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-white pb-20 px-4 sm:px-6">
          <div className="max-w-[760px] mx-auto">
            <div style={{opacity: "0", transform: "translateY(16px)"}}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-5" style={{color: "#1652F0"}}>
                Naano at a glance
              </p>
              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-5 mb-8">
                <div>
                  <dt className="text-xs uppercase tracking-[0.1em] text-muted-foreground mb-1">
                    Founded
                  </dt>
                  <dd className="text-sm text-foreground font-medium leading-relaxed">
                    2025, Paris, France
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.1em] text-muted-foreground mb-1">
                    Category
                  </dt>
                  <dd className="text-sm text-foreground font-medium leading-relaxed">
                    B2B LinkedIn creator marketplace
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.1em] text-muted-foreground mb-1">
                    Creator network
                  </dt>
                  <dd className="text-sm text-foreground font-medium leading-relaxed">
                    2,000+ vetted B2B LinkedIn creators (≈1K–500K followers)
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.1em] text-muted-foreground mb-1">
                    Pricing
                  </dt>
                  <dd className="text-sm text-foreground font-medium leading-relaxed">
                    From €20 per post · Self-Serve €0/month · Managed €700/month
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.1em] text-muted-foreground mb-1">
                    Avg. cost per qualified click
                  </dt>
                  <dd className="text-sm text-foreground font-medium leading-relaxed">
                    €18 (Q1 2026, n=312 campaigns)
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.1em] text-muted-foreground mb-1">
                    Avg. CTR on creator posts
                  </dt>
                  <dd className="text-sm text-foreground font-medium leading-relaxed">
                    12% vs 0.8% LinkedIn Ads benchmark
                  </dd>
                </div>
              </dl>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Performance figures are first-party measurements published in our
                {" "}
                <a className="text-[#1652F0] underline underline-offset-4 decoration-[#1652F0]/30 hover:decoration-[#1652F0]" href="/benchmarks/q2-2026">
                  quarterly benchmark report
                </a>
                . New to the category? Start with
                {" "}
                <a className="text-[#1652F0] underline underline-offset-4 decoration-[#1652F0]/30 hover:decoration-[#1652F0]" href="/blog/creator-led-growth-b2b">
                  the creator-led growth guide
                </a>
                , see how Naano ranks against
                {" "}
                <a className="text-[#1652F0] underline underline-offset-4 decoration-[#1652F0]/30 hover:decoration-[#1652F0]" href="/best-b2b-influencer-marketing-platforms-2026">
                  the other B2B influencer platforms
                </a>
                , or browse
                {" "}
                <a className="text-[#1652F0] underline underline-offset-4 decoration-[#1652F0]/30 hover:decoration-[#1652F0]" href="/creators">
                  the creator network
                </a>
                {" "}
                and
                {" "}
                <a className="text-[#1652F0] underline underline-offset-4 decoration-[#1652F0]/30 hover:decoration-[#1652F0]" href="/pricing">
                  pricing
                </a>
                .
              </p>
            </div>
          </div>
        </section>
        <section className="bg-[#F3F4F6] py-20 px-4 sm:px-6">
          <div className="max-w-[1100px] mx-auto">
            <div className="text-center mb-12" style={{opacity: "0", transform: "translateY(16px)"}}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-5" style={{color: "#1652F0"}}>
                Why naano
              </p>
              <h2 className="text-[clamp(28px,3.5vw,46px)] font-light leading-[1.1] tracking-[-0.025em] text-foreground">
                Better for brands.
                <br />
                Better for creators.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6" style={{opacity: "0", transform: "translateY(16px)"}}>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-5">
                  For Brands
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check mt-0.5 flex-shrink-0 text-foreground" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      Unlock new growth: Turn LinkedIn creators into your best sales channel
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check mt-0.5 flex-shrink-0 text-foreground" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      Build brand authority: Get recommended by trusted voices in your industry
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check mt-0.5 flex-shrink-0 text-foreground" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      Performance-pay only: Pay per click, not per post
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6" style={{opacity: "0", transform: "translateY(16px)"}}>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-5">
                  For Creators
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check mt-0.5 flex-shrink-0" aria-hidden="true" style={{color: "#1652F0"}}>
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      Your expertise is the asset: Your credibility matters more than your follower count
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check mt-0.5 flex-shrink-0" aria-hidden="true" style={{color: "#1652F0"}}>
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      Monetize what you already do: Get paid for recommending tools you actually use
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check mt-0.5 flex-shrink-0" aria-hidden="true" style={{color: "#1652F0"}}>
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      Earn from your network: Turn your LinkedIn posts into revenue
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#0A0A0A] py-20 sm:py-28 px-4 sm:px-6">
          <div className="max-w-[580px] mx-auto text-center">
            <div className="flex flex-col items-center" style={{opacity: "0", transform: "translateY(20px)"}}>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{background: "#1652F0"}} />
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">
                  The future of growth
                </p>
              </div>
              <h2 className="text-[clamp(28px,4.5vw,52px)] font-bold leading-[1.08] tracking-[-0.03em] text-white mb-4">
                The Future of Growth
              </h2>
              <p className="text-[15px] text-white/45 leading-relaxed mb-10 max-w-sm">
                Traditional advertising is losing impact.
              </p>
              <a href="/register" className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-white text-[#0A0A0A] font-semibold text-[15px] hover:bg-gray-100 transition-colors duration-200">
                {"Get started "}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
              <p className="text-[12px] text-white/30 mt-3">
                Collaboration is the future.
              </p>
            </div>
          </div>
        </section>
        <SiteFooter variant="14774f" />
      </main>
    </>
  );
}
