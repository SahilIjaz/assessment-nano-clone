/* generated from pricing.html */
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";

export default function P_pricing() {
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
        <section className="bg-white pt-28 sm:pt-32 pb-16 px-4 sm:px-6">
          <div className="max-w-[820px] mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-5" style={{color: "#1652F0"}}>
              Pricing
            </p>
            <h1 className="text-[clamp(32px,5vw,56px)] font-light leading-[1.1] tracking-[-0.025em] text-foreground mb-6">
              Naano pricing
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Naano offers two ways to run LinkedIn creator campaigns. Self-Serve costs €0 per month: you get full platform access and pay creators at the fixed price shown on their offer. Managed Campaigns costs €700 per month and adds a Naano team that sources creators, writes briefs and runs your campaigns end to end.
            </p>
          </div>
        </section>
        <section className="bg-white pb-20 px-4 sm:px-6">
          <div className="max-w-[900px] mx-auto">
            <div className="overflow-x-auto rounded-2xl border border-[#E5E7EB]">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#F3F4F6]">
                    <th className="p-5 text-sm font-semibold text-muted-foreground uppercase tracking-[0.08em] w-[22%]">
                      {" "}
                    </th>
                    <th className="p-5 text-base font-bold text-foreground">
                      Self-Serve
                    </th>
                    <th className="p-5 text-base font-bold text-foreground">
                      Managed Campaigns
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[#E5E7EB]">
                    <th scope="row" className="p-5 text-sm font-semibold text-muted-foreground align-top">
                      Price
                    </th>
                    <td className="p-5 text-sm text-foreground leading-relaxed align-top">
                      €0 / month
                    </td>
                    <td className="p-5 text-sm text-foreground leading-relaxed align-top">
                      €700 / month
                    </td>
                  </tr>
                  <tr className="border-t border-[#E5E7EB]">
                    <th scope="row" className="p-5 text-sm font-semibold text-muted-foreground align-top">
                      What's included
                    </th>
                    <td className="p-5 text-sm text-foreground leading-relaxed align-top">
                      Creator marketplace access, AI-powered brief creation, click/lead/pipeline tracking, automatic creator payouts
                    </td>
                    <td className="p-5 text-sm text-foreground leading-relaxed align-top">
                      Campaign strategy & positioning, creator sourcing & coordination, brief creation & launch, reporting & optimisation
                    </td>
                  </tr>
                  <tr className="border-t border-[#E5E7EB]">
                    <th scope="row" className="p-5 text-sm font-semibold text-muted-foreground align-top">
                      Creator payment
                    </th>
                    <td className="p-5 text-sm text-foreground leading-relaxed align-top">
                      You book the creator's published fixed-price offer
                    </td>
                    <td className="p-5 text-sm text-foreground leading-relaxed align-top">
                      Naano manages creator payments on your behalf
                    </td>
                  </tr>
                  <tr className="border-t border-[#E5E7EB]">
                    <th scope="row" className="p-5 text-sm font-semibold text-muted-foreground align-top">
                      Support
                    </th>
                    <td className="p-5 text-sm text-foreground leading-relaxed align-top">
                      Self-serve platform, help center + email
                    </td>
                    <td className="p-5 text-sm text-foreground leading-relaxed align-top">
                      Dedicated Naano team, book a campaign call
                    </td>
                  </tr>
                  <tr className="border-t border-[#E5E7EB]">
                    <th scope="row" className="p-5 align-top" />
                    <td className="p-5 align-top">
                      <a href="/register" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground border-b-[1.5px] border-foreground pb-0.5">
                        Start for free
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right" aria-hidden="true">
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </a>
                    </td>
                    <td className="p-5 align-top">
                      <a href="/book" className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-[#17181C] text-white text-sm font-semibold hover:bg-black transition-colors duration-200">
                        Book a campaign call
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right" aria-hidden="true">
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-6">
              Campaign spend is separate from the plan fee. No lock-in, cancel anytime.
            </p>
          </div>
        </section>
        <section className="bg-[#F3F4F6] py-16 px-4 sm:px-6">
          <div className="max-w-[760px] mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-5" style={{color: "#1652F0"}}>
              How it works
            </p>
            <h2 className="text-[clamp(24px,3vw,36px)] font-light leading-[1.15] tracking-[-0.02em] text-foreground mb-6">
              How per-post pricing works
            </h2>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>
                Marketplace offers use a fixed price chosen by the creator. The amount and included deliverables are visible before you book; there is no cost per click, impression, or lead.
              </p>
              <p>
                You review and approve the content a creator submits. Once approved, the post goes live and payment is released to the creator automatically through Stripe Connect, invoices and approvals are handled for you inside the platform.
              </p>
              <p>
                On Self-Serve there is no platform retainer; you fund the offers you choose. On Managed Campaigns, creator spend remains separate and the €700 monthly fee covers the Naano team running the campaign for you.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-white py-20 px-4 sm:px-6">
          <div className="max-w-[820px] mx-auto">
            <h2 className="text-[clamp(24px,3vw,36px)] font-light leading-[1.15] tracking-[-0.02em] text-foreground mb-10 text-center">
              Pricing FAQ
            </h2>
            <div className="divide-y divide-[#E5E7EB]">
              <div className="py-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  What's the minimum budget to start on Naano?
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Self-Serve is €0 per month. Creator spend depends on the offers you book, and the exact fixed price is shown before you commit.
                </p>
              </div>
              <div className="py-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  How much does a single post cost?
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Each creator sets a fixed price for their offer. You see the amount and included deliverables before booking; there is no cost per click or impression.
                </p>
              </div>
              <div className="py-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Can I upgrade to Managed Campaigns or cancel anytime?
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Yes. Both plans are month-to-month with no lock-in. You can move from Self-Serve to Managed Campaigns, downgrade, or cancel whenever you like. Campaign spend is always separate from the plan fee.
                </p>
              </div>
              <div className="py-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  How do creator payouts work?
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Creators are paid automatically through Stripe Connect once you approve their content. Invoices, approvals and payment records are handled inside the platform on both Self-Serve and Managed Campaigns.
                </p>
              </div>
              <div className="py-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  What exactly is included in the €700/month Managed plan?
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Managed Campaigns adds a dedicated Naano team that handles campaign strategy, creator sourcing and coordination, brief creation, campaign launch, and reporting and optimisation, on top of everything in Self-Serve.
                </p>
              </div>
              <div className="py-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Do you still charge per click?
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  No. Marketplace offers use a fixed price shown before booking, with no cost per click, impression, or lead.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#F3F4F6] py-16 px-4 sm:px-6">
          <div className="max-w-[760px] mx-auto">
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-5">
                Both plans include
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check mt-0.5 flex-shrink-0" aria-hidden="true" style={{color: "#1652F0"}}>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    Browse eligible LinkedIn creator profiles and fixed-price offers
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check mt-0.5 flex-shrink-0" aria-hidden="true" style={{color: "#1652F0"}}>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    Tracking from click to lead to pipeline for every post
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check mt-0.5 flex-shrink-0" aria-hidden="true" style={{color: "#1652F0"}}>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    Automatic creator payouts via Stripe Connect
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check mt-0.5 flex-shrink-0" aria-hidden="true" style={{color: "#1652F0"}}>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    Month-to-month billing, no lock-in
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#0A0A0A] py-20 sm:py-28 px-4 sm:px-6">
          <div className="max-w-[580px] mx-auto text-center">
            <div className="flex flex-col items-center">
              <h2 className="text-[clamp(28px,4.5vw,52px)] font-bold leading-[1.08] tracking-[-0.03em] text-white mb-4">
                Start free, upgrade when you're ready.
              </h2>
              <p className="text-[15px] text-white/45 leading-relaxed mb-10 max-w-sm">
                Self-Serve is €0 per month. Managed Campaigns is €700 per month. Creator spend is separate and shown before every booking.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a href="/register" className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-white text-[#0A0A0A] font-semibold text-[15px] hover:bg-gray-100 transition-colors duration-200">
                  Start for free
                  {" "}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
                <a href="/book" className="inline-flex items-center gap-2 h-12 px-8 rounded-xl border border-white/20 text-white font-semibold text-[15px] hover:bg-white/5 transition-colors duration-200">
                  Book a campaign call
                  {" "}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
        <SiteFooter variant="14774f" />
      </main>
    </>
  );
}
