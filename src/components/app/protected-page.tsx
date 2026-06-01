import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { AppShell } from "@/components/app/app-shell";
import { getSessionUser } from "@/lib/auth/session";

export async function ProtectedPage({ children }: { children: ReactNode }) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  return <AppShell>{children}</AppShell>;
}
