import { redirect } from "next/navigation";

import { OnboardingScreen } from "@/components/screens/onboarding-screen";
import { getDefaultRouteForUser } from "@/lib/auth/routes";
import { getSessionUser } from "@/lib/auth/session";

export default async function OnboardingPage() {
  const user = await getSessionUser();

  if (user) {
    redirect(getDefaultRouteForUser(user));
  }

  return <OnboardingScreen />;
}
