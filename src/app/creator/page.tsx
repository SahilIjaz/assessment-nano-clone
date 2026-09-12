import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { creatorSnapshot } from "@/lib/creator-data";
import CreatorApp from "@/components/creator/CreatorApp";
export const dynamic = "force-dynamic";
export default async function CreatorPage() {
  const u = await currentUser();
  if (!u) redirect("/login?reauth=1");
  if (u.role !== "influencer") redirect("/brand");
  if (!u.email_verified || u.onboarding_step !== "done") redirect("/register?role=influencer");
  return <CreatorApp initial={await creatorSnapshot(u)} />;
}
