/* generated from free-tools__creator-campaign-budget-planner.html */
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";

export default function P_free_tools__creator_campaign_budget_planner() {
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
        <section className="relative overflow-hidden pt-28 pb-10 sm:pt-36 sm:pb-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{background: "radial-gradient(640px 320px at 50% -120px, rgba(22,82,240,0.08), transparent 70%)"}} />
          <div className="relative mx-auto max-w-[900px] px-4 sm:px-6 text-center">
            <a className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#E4E1DC] bg-white px-4 py-2 text-[13px] font-medium text-[#55575E] shadow-[0_1px_2px_rgba(23,24,28,0.04)] transition-colors duration-200 hover:border-[#D8D4CE] hover:text-[#17181C] motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1652F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFCFB]" href="/free-tools">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left text-[#1652F0]" aria-hidden="true">
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Free Tools
            </a>
            <h1 className="mt-8 text-4xl sm:text-5xl lg:text-[56px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#17181C]">
              Creator Campaign Budget Planner
              <span className="text-[#1652F0]">
                .
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-[680px] text-lg sm:text-[19px] leading-relaxed text-[#55575E]">
              Enter a budget and see how many sponsored LinkedIn posts it books at real transacted medians — and, more usefully, how many of those historically ended in a published post. Built on 300 real bookings. Free, no account, nothing leaves your browser.
            </p>
          </div>
        </section>
        <section className="pt-6 pb-16 sm:pb-20">
          <div className="max-w-[820px] mx-auto px-4 sm:px-6">
            <div className="rounded-2xl border border-[#ECEAE6] bg-white p-6 sm:p-8 shadow-[0_18px_44px_rgba(23,24,28,0.08)]">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="budget" className="text-[15px] font-semibold text-[#17181C]">
                    Your campaign budget (€)
                  </label>
                  <input id="budget" type="number" inputMode="decimal" min="1" placeholder="e.g. 5000" className="mt-2 w-full min-h-11 rounded-xl border border-[#E4E1DC] bg-white px-4 py-3 text-[15px] text-[#17181C] placeholder:text-[#B4B4B0] shadow-[0_1px_2px_rgba(23,24,28,0.03)] focus:outline-none focus:ring-2 focus:ring-[#1652F0] focus:border-transparent" defaultValue="" />
                </div>
                <div>
                  <label htmlFor="customPrice" className="text-[15px] font-semibold text-[#17181C]">
                    Your own price per post (€)
                    {" "}
                    <span className="font-normal text-[#6B6D74]">
                      — optional
                    </span>
                  </label>
                  <input id="customPrice" type="number" inputMode="decimal" min="1" placeholder="e.g. 250" className="mt-2 w-full min-h-11 rounded-xl border border-[#E4E1DC] bg-white px-4 py-3 text-[15px] text-[#17181C] placeholder:text-[#B4B4B0] shadow-[0_1px_2px_rgba(23,24,28,0.03)] focus:outline-none focus:ring-2 focus:ring-[#1652F0] focus:border-transparent" defaultValue="" />
                </div>
              </div>
              <div className="mt-8 border-t border-[#ECEAE6] pt-8">
                <p className="text-[16px] leading-relaxed text-[#55575E]">
                  Enter a budget to see how many sponsored posts it books at real transacted medians — and how many of those historically ended in a published post.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="border-t border-[#ECEAE6] py-16 sm:py-20">
          <div className="max-w-[820px] mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-[38px] font-semibold tracking-[-0.03em] text-[#17181C]">
              The three allocations, and where they come from
              <span className="text-[#1652F0]">
                .
              </span>
            </h2>
            <p className="mt-4 text-[16px] leading-[1.65] text-[#55575E]">
              Each allocation uses the transacted median price for a real follower tier, then applies the historical settled delivery rate for the price band that median falls into. The band is derived from the price, so a preset always agrees with what the custom-price input returns for the same number. Bookings still awaiting a decision are excluded from the delivery-rate denominator.
            </p>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-[#ECEAE6] bg-white shadow-[0_2px_10px_rgba(23,24,28,0.05)]">
              <table className="w-full min-w-[640px] text-left text-[15px]">
                <thead>
                  <tr className="border-b border-[#ECEAE6] bg-[#FAFAF9]">
                    <th scope="col" className="px-5 py-3.5 font-semibold text-[#17181C]">
                      Allocation
                    </th>
                    <th scope="col" className="px-5 py-3.5 font-semibold text-[#17181C]">
                      Median price
                    </th>
                    <th scope="col" className="px-5 py-3.5 font-semibold text-[#17181C]">
                      Band
                    </th>
                    <th scope="col" className="px-5 py-3.5 font-semibold text-[#17181C]">
                      Published
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#ECEAE6] last:border-b-0">
                    <td className="px-5 py-4 align-top font-semibold text-[#17181C]">
                      Spread
                      <span className="mt-1 block text-[13px] font-normal leading-snug text-[#6B6D74]">
                        Under 5,000 followers
                        {". "}
                        Most posts per euro, lowest delivery rate. 66 bookings set this median.
                      </span>
                    </td>
                    <td className="px-5 py-4 align-top text-[#55575E] whitespace-nowrap">
                      €84
                    </td>
                    <td className="px-5 py-4 align-top text-[#55575E] whitespace-nowrap">
                      Under €200
                    </td>
                    <td className="px-5 py-4 align-top font-semibold text-[#1652F0]">
                      30.4%
                    </td>
                  </tr>
                  <tr className="border-b border-[#ECEAE6] last:border-b-0">
                    <td className="px-5 py-4 align-top font-semibold text-[#17181C]">
                      Mid-tier
                      <span className="mt-1 block text-[13px] font-normal leading-snug text-[#6B6D74]">
                        10,000 – 25,000 followers
                        {". "}
                        40.9% of these offers went unanswered — the second-worst response rate.
                      </span>
                    </td>
                    <td className="px-5 py-4 align-top text-[#55575E] whitespace-nowrap">
                      €300
                    </td>
                    <td className="px-5 py-4 align-top text-[#55575E] whitespace-nowrap">
                      €200 – €399
                    </td>
                    <td className="px-5 py-4 align-top font-semibold text-[#1652F0]">
                      25.9%
                    </td>
                  </tr>
                  <tr className="border-b border-[#ECEAE6] last:border-b-0">
                    <td className="px-5 py-4 align-top font-semibold text-[#17181C]">
                      Concentrated
                      <span className="mt-1 block text-[13px] font-normal leading-snug text-[#6B6D74]">
                        50,000+ followers
                        {". "}
                        Fewest posts, strongest observed delivery. Thin tier: 16 bookings set this median.
                      </span>
                    </td>
                    <td className="px-5 py-4 align-top text-[#55575E] whitespace-nowrap">
                      €720
                    </td>
                    <td className="px-5 py-4 align-top text-[#55575E] whitespace-nowrap">
                      €600 and above
                    </td>
                    <td className="px-5 py-4 align-top font-semibold text-[#1652F0]">
                      64.6%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[14px] text-[#6B6D74]">
              {"[Naano Index, n=300 bookings, 14 June – 11 August 2026]. The timing side of the same dataset is in "}
              <a className="font-semibold text-[#1652F0] hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1652F0] rounded-sm" href="/blog/how-long-b2b-creator-campaign-takes">
                how long a B2B creator campaign takes
              </a>
              {", and the full price distribution is in the "}
              <a className="font-semibold text-[#1652F0] hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1652F0] rounded-sm" href="/blog/linkedin-sponsored-post-price-index-2026">
                LinkedIn sponsored post price index 2026
              </a>
              .
            </p>
          </div>
        </section>
        <section className="border-t border-[#ECEAE6] py-16 sm:py-20">
          <div className="max-w-[820px] mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-[38px] font-semibold tracking-[-0.03em] text-[#17181C]">
              Method, and what this planner does not claim
              <span className="text-[#1652F0]">
                .
              </span>
            </h2>
            <div className="mt-8 space-y-5 text-[16px] leading-[1.65] text-[#6B6D74]">
              <p>
                <span className="font-semibold text-[#17181C]">
                  Source.
                </span>
                {" "}
                Naano's own marketplace database, queried read-only on 11 August 2026 at 19:05 UTC. Every sponsored-post booking created between 14 June and 11 August 2026, normalised to price per post (n=300), plus the 89 of those that reached a published post for the timing figures. Bookings placed by Naano itself as a buyer are excluded. No cell below ten observations is published, and no individual creator, brand or amount appears anywhere.
              </p>
              <p>
                <span className="font-semibold text-[#17181C]">
                  This is a correlation, not a causal claim.
                </span>
                {" "}
                Paying €600 does not make a post appear. A brand paying €600 usually also has a real budget, a written brief, and someone internally who chases the campaign — any of which could be doing the work. The planner applies observed historical rates to a budget; it does not model what would happen if you changed a price.
              </p>
              <p>
                <span className="font-semibold text-[#17181C]">
                  Expected published posts are an average, not a guarantee.
                </span>
                {" "}
                A 30.4% delivery rate applied to ten bookings gives an expectation of about three published posts, but the actual outcome for any single campaign varies widely — especially at small booking counts. Treat the third column as a planning correction, not a forecast for one campaign.
              </p>
              <p>
                <span className="font-semibold text-[#17181C]">
                  Sample caveats, and how much these rates move.
                </span>
                {" "}
                The €400–€599 band rests on 36 bookings from only 9 distinct buying brands and should be read as directional. More importantly, these rates are not stable yet: between the 3 August and 11 August snapshots the €600+ delivery rate fell from 80.6% to 64.6% on 11 additional bookings, and the unanswered-offer rate in that band rose from 8.1% to 19.2%. The direction of the effect has held in every cut so far; its size has not. Re-read this page against the snapshot date rather than assuming the numbers are settled.
              </p>
              <p>
                <span className="font-semibold text-[#17181C]">
                  What is deliberately absent.
                </span>
                {" "}
                No impressions, reach, cost-per-lead or cost-per-click figure appears on this page. LinkedIn does not expose post impressions for third-party posts, and our tracked-link coverage is currently too partial to publish a clicks-per-post benchmark honestly. Naano charges a flat fee per sponsored post set by each creator, and does not sell per click.
              </p>
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
                  How many sponsored LinkedIn posts can I get for my budget?
                </h3>
                <p className="mt-3 max-w-[680px] text-[16px] leading-[1.65] text-[#6B6D74]">
                  Divide the budget by the transacted median for the audience size you are buying, then multiply by the historical delivery rate for that price band. On Naano, the transacted medians were €84 per post under 5,000 followers, €300 at 10,000–25,000, and €720 above 50,000, while settled delivery rates ranged from 25.9% to 64.6% depending on the band [Naano Index snapshot, n=300 bookings, 11 August 2026 at 19:05 UTC]. A €5,000 budget books 59 posts at €84 but historically produced around 18 published ones.
                </p>
              </div>
              <div className="border-t border-[#ECEAE6] py-7 first:border-t-0 first:pt-2">
                <h3 className="text-[18px] font-medium tracking-[-0.015em] text-[#17181C]">
                  Why should I plan on published posts instead of booked posts?
                </h3>
                <p className="mt-3 max-w-[680px] text-[16px] leading-[1.65] text-[#6B6D74]">
                  Because the two differ by a factor of three to five. Of the bookings that reached a final state on Naano, 30.4% priced under €200 ended in a published post against 64.6% priced at €600 or more, and 41.6% of sub-€200 offers expired without the creator ever answering [Naano Index snapshot, n=300 created bookings, 11 August 2026 at 19:05 UTC]. A forecast built on posts booked has been systematically optimistic at the low end.
                </p>
              </div>
              <div className="border-t border-[#ECEAE6] py-7 first:border-t-0 first:pt-2">
                <h3 className="text-[18px] font-medium tracking-[-0.015em] text-[#17181C]">
                  Is it cheaper per published post to book many small creators or a few large ones?
                </h3>
                <p className="mt-3 max-w-[680px] text-[16px] leading-[1.65] text-[#6B6D74]">
                  Many small creators, by a wide margin. On these historical rates the lowest band costs roughly €280 per published post, against roughly €1,100–€1,300 for both the mid-tier and concentrated allocations — the cheap band's weak delivery rate is more than offset by how many more posts the same budget buys. The two upper allocations land close enough to each other that which one comes out ahead depends on your exact budget, so the tool computes it rather than asserting it. This is an observed association across a nine-week dataset, not a rule, and it is the opposite of the usual advice — the tool reports it because it is what the data says, not because it is convenient.
                </p>
              </div>
              <div className="border-t border-[#ECEAE6] py-7 first:border-t-0 first:pt-2">
                <h3 className="text-[18px] font-medium tracking-[-0.015em] text-[#17181C]">
                  How long should I allow between booking a creator and the post going live?
                </h3>
                <p className="mt-3 max-w-[680px] text-[16px] leading-[1.65] text-[#6B6D74]">
                  Plan on 14 days rather than 8. Delivered bookings took a median of 8.0 days from booking to published post, with a 90th percentile of 14.1 days, and the creator accepted the offer in a median of 35 minutes [Naano Index snapshot, n=89 delivered bookings, 11 August 2026 at 19:05 UTC]. Almost all the elapsed time sits after acceptance, in drafting and approval.
                </p>
              </div>
              <div className="border-t border-[#ECEAE6] py-7 first:border-t-0 first:pt-2">
                <h3 className="text-[18px] font-medium tracking-[-0.015em] text-[#17181C]">
                  Does this planner assume that paying more causes a post to be delivered?
                </h3>
                <p className="mt-3 max-w-[680px] text-[16px] leading-[1.65] text-[#6B6D74]">
                  No. The delivery rates are correlations across a young and visibly volatile dataset — the €600+ rate moved from 80.6% to 64.6% between the 3 August and 11 August snapshots on 11 additional bookings. A brand paying €600 typically also has a real budget, a written brief and an internal owner who follows up, and any of those could be doing the work. The planner applies observed historical rates to a budget; it does not claim that raising a price changes an outcome.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="border-t border-[#ECEAE6] py-16 sm:py-20">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[#17181C]">
              More free tools
              <span className="text-[#1652F0]">
                .
              </span>
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <a className="group flex flex-col rounded-2xl border border-[#ECEAE6] bg-white p-6 shadow-[0_2px_10px_rgba(23,24,28,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1652F0]/40 hover:shadow-[0_14px_32px_rgba(23,24,28,0.10)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1652F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFCFB]" href="/free-tools/sponsored-post-delivery-odds-estimator">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F0FE] text-[#1652F0]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </span>
                <h3 className="mt-4 text-[17px] font-semibold leading-snug tracking-[-0.02em] text-[#17181C]">
                  Sponsored Post Delivery Odds Estimator
                </h3>
                <p className="mt-1.5 flex-1 text-[14px] leading-relaxed text-[#55575E]">
                  See how often offers at your price actually get published.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#17181C] transition-colors group-hover:text-[#1652F0] motion-reduce:transition-none">
                  Open
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </a>
              <a className="group flex flex-col rounded-2xl border border-[#ECEAE6] bg-white p-6 shadow-[0_2px_10px_rgba(23,24,28,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1652F0]/40 hover:shadow-[0_14px_32px_rgba(23,24,28,0.10)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1652F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFCFB]" href="/free-tools/linkedin-creator-worth-calculator">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F0FE] text-[#1652F0]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calculator" aria-hidden="true">
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
                <h3 className="mt-4 text-[17px] font-semibold leading-snug tracking-[-0.02em] text-[#17181C]">
                  LinkedIn Creator Worth Calculator
                </h3>
                <p className="mt-1.5 flex-1 text-[14px] leading-relaxed text-[#55575E]">
                  Find out what a sponsored post from any creator should cost.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#17181C] transition-colors group-hover:text-[#1652F0] motion-reduce:transition-none">
                  Open
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </a>
              <a className="group flex flex-col rounded-2xl border border-[#ECEAE6] bg-white p-6 shadow-[0_2px_10px_rgba(23,24,28,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1652F0]/40 hover:shadow-[0_14px_32px_rgba(23,24,28,0.10)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1652F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFCFB]" href="/free-tools">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F0FE] text-[#1652F0]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles" aria-hidden="true">
                    <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                    <path d="M20 2v4" />
                    <path d="M22 4h-4" />
                    <circle cx="4" cy="20" r="2" />
                  </svg>
                </span>
                <h3 className="mt-4 text-[17px] font-semibold leading-snug tracking-[-0.02em] text-[#17181C]">
                  All free tools
                </h3>
                <p className="mt-1.5 flex-1 text-[14px] leading-relaxed text-[#55575E]">
                  Every free Naano tool for B2B creator marketing, in one place.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#17181C] transition-colors group-hover:text-[#1652F0] motion-reduce:transition-none">
                  Open
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </section>
        <section className="border-t border-[#ECEAE6] py-16 sm:py-20">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col rounded-2xl bg-[#17181C] p-8 text-white shadow-[0_18px_44px_rgba(23,24,28,0.18)]">
                <h2 className="text-2xl font-semibold tracking-[-0.02em]">
                  See the real prices before you commit a budget
                </h2>
                <p className="mt-3 text-[16px] leading-relaxed text-white/80 flex-1">
                  Every creator on Naano publishes their own flat fee per post, so you can build the plan against actual numbers instead of estimates. Contracts, escrow and invoicing handled — no monthly platform fee.
                </p>
                <a href="https://naano.com/register" className="mt-6 inline-flex min-h-11 self-start items-center gap-2 rounded-xl bg-white px-6 py-3 text-[15px] font-semibold text-[#17181C] transition-opacity duration-200 hover:opacity-90 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
                  Book a creator on Naano
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
              <div className="flex flex-col rounded-2xl border border-[#ECEAE6] bg-white p-8 shadow-[0_2px_10px_rgba(23,24,28,0.05)]">
                <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#17181C]">
                  Want the shortlist before the spreadsheet?
                </h2>
                <p className="mt-3 text-[16px] leading-relaxed text-[#55575E] flex-1">
                  Describe your campaign and a real person at Naano builds you a hand-picked shortlist of relevant B2B creators, with their rates and audience fit, within 48 hours. Free, no account.
                </p>
                <a href="https://naano.com/selection" className="mt-6 inline-flex min-h-11 self-start items-center gap-2 rounded-xl bg-[#1652F0] px-6 py-3 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#1240D0] motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1652F0] focus-visible:ring-offset-2">
                  Get a free shortlist
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
        <SiteFooter variant="8b5888" />
      </main>
    </>
  );
}
