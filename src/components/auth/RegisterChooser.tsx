"use client";
import { AuthLayout, BlueSide, postJson } from "./AuthShell";
export default function RegisterChooser({ social }: { social?: boolean }) {
  const pick = async (role: "saas" | "influencer", e: React.MouseEvent) => {
    if (!social) return;
    e.preventDefault();
    const r = await postJson("/api/auth/social-complete", { role });
    window.location.href = r.ok ? (r.next as string) : `/register?role=${role}`;
  };
  return (
    <AuthLayout side={<BlueSide title="One platform. Two sides." body="Creators get paid to post. B2B brands get real pipeline. Pick where you fit and we'll set the rest up in a couple of minutes." />}>
      <h1 className="text-2xl font-bold text-[#111827]">Create your account</h1>
      <p className="text-sm text-[#6B7280] mt-1 mb-6">{social ? "Almost there — who are you here as?" : "First, who are you here as?"}</p>
      <div className="space-y-3">
        <a href="/register?role=influencer" onClick={(e) => pick("influencer", e)} className="block rounded-xl border border-[#D1D5DB] p-5 transition-colors hover:border-[#2563eb] hover:bg-[#F5F8FF]"><div className="text-base font-semibold text-[#111827]">I&apos;m a creator</div><p className="text-sm text-[#6B7280] mt-1">Get paid to create LinkedIn content for B2B brands you actually use.</p></a>
        <a href="/register?role=saas" onClick={(e) => pick("saas", e)} className="block rounded-xl border border-[#D1D5DB] p-5 transition-colors hover:border-[#2563eb] hover:bg-[#F5F8FF]"><div className="text-base font-semibold text-[#111827]">I&apos;m a brand</div><p className="text-sm text-[#6B7280] mt-1">Find creators, launch campaigns, and trace real pipeline back to each post.</p></a>
      </div>
      <p className="text-xs text-center text-[#6B7280] mt-6">Already have an account? <a href="/login?reauth=1" className="text-[#2563eb] font-medium">Sign in</a></p>
    </AuthLayout>
  );
}
