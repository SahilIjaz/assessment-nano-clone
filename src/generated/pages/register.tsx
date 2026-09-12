/* generated from register.html */
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";

export default function P_register() {
  return (
    <>
      <div hidden>
      </div>
      <div className="bg-noise" />
      <div className="min-h-screen flex" style={{fontFamily: "Inter, sans-serif"}}>
        <div className="flex-1 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-between mb-8">
              <img src="/logo.svg" alt="naano" className="h-7" />
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
            </div>
            <h1 className="text-2xl font-bold text-[#111827]">
              Create your account
            </h1>
            <p className="text-sm text-[#6B7280] mt-1 mb-6">
              First, who are you here as?
            </p>
            <div className="space-y-3">
              <a href="/register?role=influencer" className="block rounded-xl border border-[#D1D5DB] p-5 transition-colors hover:border-[#2563eb] hover:bg-[#F5F8FF]">
                <div className="text-base font-semibold text-[#111827]">
                  I'm a creator
                </div>
                <p className="text-sm text-[#6B7280] mt-1">
                  Get paid to create LinkedIn content for B2B brands you actually use.
                </p>
              </a>
              <a href="/register?role=saas" className="block rounded-xl border border-[#D1D5DB] p-5 transition-colors hover:border-[#2563eb] hover:bg-[#F5F8FF]">
                <div className="text-base font-semibold text-[#111827]">
                  I'm a brand
                </div>
                <p className="text-sm text-[#6B7280] mt-1">
                  Find creators, launch campaigns, and trace real pipeline back to each post.
                </p>
              </a>
            </div>
            <p className="text-xs text-center text-[#6B7280] mt-6">
              Already have an account?
              {" "}
              <a href="/login?reauth=1" className="text-[#2563eb] font-medium">
                Sign in
              </a>
            </p>
          </div>
        </div>
        <div className="hidden lg:flex flex-1 items-center justify-center p-12 text-white" style={{background: "#2563eb"}}>
          <div className="max-w-sm">
            <h2 className="text-3xl font-bold mb-4">
              One platform. Two sides.
            </h2>
            <p className="text-blue-100">
              Creators get paid to post. B2B brands get real pipeline. Pick where you fit and we'll set the rest up in a couple of minutes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
