import { redirect } from "next/navigation";

import { ForgotPasswordScreen } from "@/components/screens/forgot-password-screen";
import { getDefaultRouteForUser } from "@/lib/auth/routes";
import { getSessionUser } from "@/lib/auth/session";

export default async function ForgotPasswordPage() {
  const user = await getSessionUser();

  if (user) {
    redirect(getDefaultRouteForUser(user));
  }

  return <ForgotPasswordScreen />;
}
