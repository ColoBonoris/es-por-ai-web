import { Suspense } from "react";
import { redirect } from "next/navigation";

import { LoginScreen } from "@/components/screens/login-screen";
import { getDefaultRouteForUser } from "@/lib/auth/routes";
import { getSessionUser } from "@/lib/auth/session";

export default async function LoginPage() {
  const user = await getSessionUser();

  if (user) {
    redirect(getDefaultRouteForUser(user));
  }

  return (
    <Suspense fallback={<main id="main-content" className="auth-page" tabIndex={-1}>Cargando...</main>}>
      <LoginScreen />
    </Suspense>
  );
}
