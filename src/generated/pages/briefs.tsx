/* generated from briefs.html */
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";

export default function P_briefs() {
  return (
    <>
      <div hidden>
      </div>
      <div className="bg-noise" />
      <main style={{minHeight: "100vh", background: "#FAFAF9", fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif", color: "#37352F"}}>
        <div style={{maxWidth: "860px", margin: "0 auto", padding: "28px 20px 64px"}}>
          <header style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid #E9E9E7"}}>
            <a style={{display: "flex", alignItems: "center", gap: "10px", textDecoration: "none"}} href="/">
              <img src="/logo.svg" alt="naano" style={{width: "28px", height: "28px", objectFit: "contain", flexShrink: "0"}} />
              <div>
                <div style={{fontSize: "18px", fontWeight: "800", color: "#1652F0", letterSpacing: "-0.02em", lineHeight: "1.05"}}>
                  naano
                </div>
                <div style={{fontSize: "11.5px", color: "#787774", marginTop: "1px"}}>
                  Creator-led growth for B2B
                </div>
              </div>
            </a>
            <a href="/register?role=influencer" style={{fontSize: "12.5px", fontWeight: "600", color: "#1652F0", textDecoration: "none", whiteSpace: "nowrap"}}>
              Apply as a creator →
            </a>
          </header>
          <h1 style={{margin: "0", fontSize: "27px", fontWeight: "800", letterSpacing: "-0.02em", lineHeight: "1.25"}}>
            Open LinkedIn creator campaigns
          </h1>
          <p style={{margin: "10px 0 0", fontSize: "14.5px", color: "#787774", lineHeight: "1.65", maxWidth: "640px"}}>
            B2B brands publish campaign briefs on Naano to find vetted LinkedIn creators for flat-fee sponsored posts. Each brief describes the brand's context, tone, content angles and targeting — pick a campaign that fits your audience and apply, or
            {" "}
            <a href="/register?role=saas" style={{color: "#1652F0", textDecoration: "none", fontWeight: "600"}}>
              launch your own creator search
            </a>
            .
          </p>
          <section style={{marginTop: "28px", background: "#FFFFFF", border: "1px solid #E9E9E7", borderRadius: "16px", padding: "28px 26px"}}>
            <p style={{margin: "0", fontSize: "14px", color: "#787774", lineHeight: "1.6"}}>
              No open campaigns right now — check back soon, or
              {" "}
              <a href="/register?role=influencer" style={{color: "#1652F0", textDecoration: "none", fontWeight: "600"}}>
                join Naano as a creator
              </a>
              {" "}
              to get matched as soon as new campaigns open.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
