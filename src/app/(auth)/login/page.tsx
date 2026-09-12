import LoginForm from "@/components/auth/LoginForm";
export const metadata = { title: "Sign in | Naano" };
const ERRORS: Record<string, string> = { oauth_state: "The sign-in session expired. Please try again.", oauth_failed: "Social sign-in failed. Please try again or use your e-mail.", oauth_code: "The provider did not return an authorization code.", access_denied: "You cancelled the sign-in.", unknown_provider: "Unknown sign-in provider." };
export default async function Login({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  return <LoginForm initialError={sp.error ? ERRORS[sp.error] ?? "Sign-in failed. Please try again." : null} />;
}
