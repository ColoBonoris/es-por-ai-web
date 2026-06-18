import { redirect } from "next/navigation";

import { getDefaultRouteForUser } from "@/lib/auth/routes";
import { getSessionUser } from "@/lib/auth/session";

export default async function RootPage() {
  const user = await getSessionUser();
  redirect(user ? getDefaultRouteForUser(user) : "/onboarding");
}
