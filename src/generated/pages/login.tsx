/* generated from login.html */
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";

export default function P_login() {
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
              Welcome back
            </h1>
            <p className="text-sm text-[#6B7280] mt-1 mb-6">
              Sign in to your account
            </p>
            <form className="space-y-5" noValidate action="/api/auth/login" method="post">
              <div className="space-y-3">
                <a href="/api/auth/oauth/start?provider=linkedin_oidc" aria-disabled="false" className="w-full h-12 rounded-xl text-[15px] font-semibold text-[#111827] bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3" style={{boxShadow: "0 2px 6px rgba(15,23,42,0.05)"}}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="#0A66C2">
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
                  </svg>
                  <span>
                    Continue with LinkedIn
                  </span>
                </a>
                <a href="/api/auth/oauth/start?provider=google" aria-disabled="false" className="w-full h-12 rounded-xl text-[15px] font-semibold text-[#111827] bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3" style={{boxShadow: "0 2px 6px rgba(15,23,42,0.05)"}}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
                    <path fill="#FBBC05" d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.95l3.66-2.84Z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.07.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
                  </svg>
                  <span>
                    Continue with Google
                  </span>
                </a>
              </div>
              <div className="space-y-4 pt-1">
                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-[#E9E9E7]" />
                  <span className="text-[11px] text-[#9B9A97] font-medium uppercase tracking-wide">
                    Or continue with email
                  </span>
                  <span className="h-px flex-1 bg-[#E9E9E7]" />
                </div>
                <div>
                  <label htmlFor="login-email" className="block text-xs font-semibold text-[#5C5B57] uppercase tracking-wide mb-1.5 ml-1">
                    Email
                  </label>
                  <input id="login-email" type="email" required autoComplete="email" placeholder="john@company.com" className="w-full bg-white border border-[#D1D5DB] rounded-xl px-4 py-3.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 transition-all" name="email" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5 ml-1">
                    <label htmlFor="login-password" className="block text-xs font-semibold text-[#5C5B57] uppercase tracking-wide">
                      Password
                    </label>
                    <a className="text-xs text-[#2563eb] hover:text-[#1d4ed8] transition-colors cursor-pointer font-medium" href="/login/forgot-password">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <input id="login-password" type="password" required autoComplete="current-password" placeholder="••••••••" className="w-full bg-white border border-[#D1D5DB] rounded-xl px-4 py-3.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 transition-all pr-11" name="password" />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-[#9B9A97] hover:text-[#37352F] hover:bg-[#F7F6F3] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1652F0]/20" aria-label="Show password">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off w-5 h-5" aria-hidden="true">
                        <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                        <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                        <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                        <path d="m2 2 20 20" />
                      </svg>
                    </button>
                  </div>
                </div>
                <button type="submit" className="w-full h-11 bg-[#2563eb] text-white rounded-xl text-sm font-semibold hover:bg-[#1d4ed8] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2" style={{boxShadow: "0 4px 12px rgba(37,99,235,0.24)"}}>
                  Sign in
                </button>
              </div>
            </form>
            <p className="mt-6 text-center text-xs text-[#6B7280]">
              Don't have an account?
              {" "}
              <a href="/register" className="text-[#2563eb] font-medium">
                Sign up
              </a>
            </p>
          </div>
        </div>
        <div className="hidden lg:flex flex-1 items-center justify-center p-12 text-white" style={{background: "#2563eb"}}>
          <div className="max-w-sm">
            <h2 className="text-3xl font-bold mb-4">
              Welcome back.
            </h2>
            <p className="text-blue-100">
              Sign in to manage your campaigns, creators and payouts, all in one place.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
