import { redirect } from "next/navigation";

import { ForgotPasswordScreen } from "@/components/screens/forgot-password-screen";
import { getSessionUser } from "@/lib/auth/session";

export default async function ForgotPasswordPage() {
  const user = await getSessionUser();

  if (user) {
    redirect("/home");
  }

  return <ForgotPasswordScreen />;
}
