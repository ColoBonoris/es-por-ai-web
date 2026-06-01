import { redirect } from "next/navigation";

import { OnboardingScreen } from "@/components/screens/onboarding-screen";
import { getSessionUser } from "@/lib/auth/session";

export default async function OnboardingPage() {
  const user = await getSessionUser();

  if (user) {
    redirect("/home");
  }

  return <OnboardingScreen />;
}
