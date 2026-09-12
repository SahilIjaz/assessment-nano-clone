import type { Metadata } from "next";
import "../globals.css";
import SiteEnhancer from "@/components/site/SiteEnhancer";
import CookieBanner from "@/components/site/CookieBanner";
import ChatWidget from "@/components/site/ChatWidget";

export const metadata: Metadata = {
  title: "Naano: B2B LinkedIn Creator Marketplace",
  description: "Naano helps B2B SaaS brands run fixed-price LinkedIn creator campaigns and trace attributed clicks and leads back to each post.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/favicon.ico", apple: "/apple-icon.png" },
};

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="plus_jakarta_sans_1f33e763-module__929Nyq__variable">
      <body className="inter_c15e96cb-module__0bjUvq__variable gfs_didot_e5540785-module__WvMuDa__variable plus_jakarta_sans_1f33e763-module__929Nyq__variable antialiased bg-[#020408] text-slate-300 font-sans selection:bg-blue-500/30 selection:text-blue-200">
        {children}
        <SiteEnhancer />
        <CookieBanner />
        <ChatWidget />
      </body>
    </html>
  );
}
