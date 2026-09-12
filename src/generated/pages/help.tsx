/* generated from help.html */
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";

export default function P_help() {
  return (
    <>
      <div hidden>
      </div>
      <div className="bg-noise" />
      <main className="min-h-screen bg-white" style={{fontFamily: "var(--font-jakarta), sans-serif"}}>
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
        <section className="pt-32 sm:pt-36 md:pt-44 pb-16 sm:pb-20 px-4 sm:px-6 bg-gradient-to-b from-blue-50/50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-[32px] sm:text-[40px] md:text-[52px] font-bold text-[#111827] tracking-[-0.03em] leading-[1.1] mb-4" style={{opacity: "0", transform: "translateY(20px)"}}>
              Help Center
            </h1>
            <p className="text-lg sm:text-xl text-[#64748B] max-w-2xl mx-auto" style={{opacity: "0", transform: "translateY(20px)"}}>
              Have a question or feedback? We're here to help.
            </p>
          </div>
        </section>
        <section className="pt-4 sm:pt-6 pb-24 sm:pb-36 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="py-4" style={{opacity: "0", transform: "translateY(24px)"}}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-blue-50 text-[#3B82F6]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail w-6 h-6" aria-hidden="true">
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                  Contact us
                </h2>
              </div>
              <p className="text-[#4B5563] leading-relaxed text-lg">
                {"Send an email to "}
                <a href="mailto:info@naano.com" className="text-[#3B82F6] hover:text-[#2563EB] font-medium underline">
                  info@naano.com
                </a>
                {", or reach out to one of us on "}
                <a href="https://www.linkedin.com/company/naanooo/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#3B82F6] hover:text-[#2563EB] font-medium underline">
                  LinkedIn
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin w-4 h-4" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </p>
            </div>
            <div className="mt-8 text-center" style={{opacity: "0", transform: "translateY(24px)"}}>
              <a className="text-sm text-[#3B82F6] hover:text-[#2563EB] font-medium" href="/">
                {"← "}
                Back to home
              </a>
            </div>
          </div>
        </section>
        <SiteFooter variant="14774f" />
      </main>
    </>
  );
}
