import { redirect } from "next/navigation";

import { RegisterScreen } from "@/components/screens/register-screen";
import { getSessionUser } from "@/lib/auth/session";

export default async function RegisterPage() {
  const user = await getSessionUser();

  if (user) {
    redirect("/home");
  }

  return <RegisterScreen />;
}
