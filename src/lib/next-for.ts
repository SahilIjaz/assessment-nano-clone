import type { User } from "./auth";
/** Where a signed-in user should land, depending on verification and onboarding progress. */
export function nextFor(u: User) {
  if (!u.email_verified) return `/register?role=${u.role}`;
  if (u.role === "saas") return u.onboarding_step === "done" ? "/brand" : "/register?role=saas";
  return u.onboarding_step === "done" ? "/creator" : "/register?role=influencer";
}
