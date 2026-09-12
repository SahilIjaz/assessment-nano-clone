import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { brandSnapshot } from "@/lib/brand-data";
import BrandApp from "@/components/brand/BrandApp";

export const dynamic = "force-dynamic";

export default async function BrandPage() {
  const u = await currentUser();
  if (!u) redirect("/login?reauth=1");
  if (u.role !== "saas") redirect("/creator");
  if (!u.email_verified || u.onboarding_step !== "done") redirect("/register?role=saas");
  const snap = await brandSnapshot(u);
  if (!snap) redirect("/register?role=saas");
  return <BrandApp initial={snap} />;
}
