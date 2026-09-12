import { currentUser } from "@/lib/auth";
import { companyForUser, parseIcps } from "@/lib/brand-data";
import RegisterChooser from "@/components/auth/RegisterChooser";
import BrandRegister from "@/components/auth/BrandRegister";
import CreatorRegister from "@/components/auth/CreatorRegister";

export const metadata = { title: "Create your account | Naano" };
export const dynamic = "force-dynamic";

export default async function Register({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const role = sp.role;
  const u = await currentUser();
  if (role === "saas") {
    let step: "signup" | "website" | "icp" = "signup";
    let analysis = null;
    if (u && u.role === "saas" && u.email_verified) {
      if (u.onboarding_step === "done") { return <meta httpEquiv="refresh" content="0;url=/brand" />; }
      step = u.onboarding_step === "icp" ? "icp" : "website";
      const c = await companyForUser(u);
      if (step === "icp" && c) analysis = { name: c.name, tagline: c.tagline ?? "", valueProp: c.value_prop ?? "", description: c.description ?? "", icps: parseIcps(c), features: [], differentiators: [], industry: c.industry };
      if (step === "icp" && !analysis) step = "website";
    }
    return <BrandRegister initialStep={step} presetEmail={sp.verify} initialAnalysis={analysis} />;
  }
  if (role === "influencer") {
    let step: "signup" | "linkedin" | "card" | "price" | "pro" = "signup";
    if (u && u.role === "influencer" && u.email_verified) {
      if (u.onboarding_step === "done") { return <meta httpEquiv="refresh" content="0;url=/creator" />; }
      step = (["linkedin", "card", "price", "pro"].includes(u.onboarding_step) ? u.onboarding_step : "linkedin") as typeof step;
    }
    return <CreatorRegister initialStep={step} presetEmail={sp.verify} name={u ? `${u.first_name} ${u.last_name}` : ""} />;
  }
  return <RegisterChooser social={sp.social === "1"} />;
}
