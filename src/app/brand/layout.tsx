import IconifySetup from "@/components/app/IconifySetup";
import AppStyles from "@/components/app/AppStyles";

export const metadata = { title: "Naano - Multi-network creator platform", icons: { icon: "/favicon.ico" } };

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ ["--ci-content-left" as string]: "264px" }}>
      <head><AppStyles kind="brand" /></head>
      <body><IconifySetup />{children}</body>
    </html>
  );
}
