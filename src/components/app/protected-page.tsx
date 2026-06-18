import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { AppShell } from "@/components/app/app-shell";
import { AdminShell } from "@/components/app/admin-shell";
import { getSessionUser } from "@/lib/auth/session";

export async function ProtectedPage({ children }: { children: ReactNode }) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role === "ADMIN") {
    redirect("/admin");
  }

  return <AppShell>{children}</AppShell>;
}

export async function AdminProtectedPage({ children }: { children: ReactNode }) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login?redirectTo=/admin");
  }

  if (user.role !== "ADMIN") {
    return (
      <AdminShell userName={user.name}>
        <div className="admin-empty-state" role="alert">
          <h1>Acceso restringido</h1>
          <p>Tu usuario no tiene permisos para entrar al sitio admin.</p>
        </div>
      </AdminShell>
    );
  }

  return <AdminShell userName={user.name}>{children}</AdminShell>;
}
