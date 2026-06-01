import { Suspense } from "react";
import { redirect } from "next/navigation";

import { LoginScreen } from "@/components/screens/login-screen";
import { getSessionUser } from "@/lib/auth/session";

export default async function LoginPage() {
  const user = await getSessionUser();

  if (user) {
    redirect("/home");
  }

  return (
    <Suspense fallback={<main id="main-content" className="auth-page">Cargando...</main>}>
      <LoginScreen />
    </Suspense>
  );
}
