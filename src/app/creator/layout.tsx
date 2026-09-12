import IconifySetup from "@/components/app/IconifySetup";
import AppStyles from "@/components/app/AppStyles";

export const metadata = { title: "Naano - Creator workspace", icons: { icon: "/favicon.ico" } };

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><AppStyles kind="creator" /></head>
      <body><IconifySetup />{children}</body>
    </html>
  );
}
