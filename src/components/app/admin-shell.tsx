"use client";

import { LogOut, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { BrandLogo } from "@/components/app/brand-logo";
import { IconButton } from "@/components/ui/icon-button";
import { useAuth } from "@/providers/auth-provider";

export function AdminShell({
  children,
  userName
}: {
  children: ReactNode;
  userName: string;
}) {
  const router = useRouter();
  const { signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="app-brand">
          <BrandLogo decorative />
          <div>
            <strong>Es por AI</strong>
            <small>Admin</small>
          </div>
        </div>
        <nav className="app-navigation" aria-label="Navegación admin">
          <a className="app-navigation__link is-active" href="/admin">
            <Users aria-hidden="true" size={20} />
            <span>Usuarios</span>
          </a>
        </nav>
        <div className="app-sidebar__footer">
          <p>{userName}</p>
          <IconButton label="Cerrar sesión" onClick={handleSignOut}>
            <LogOut aria-hidden="true" size={18} />
          </IconButton>
        </div>
      </aside>
      <div>
        <header className="app-topbar">
          <div className="app-brand app-brand--compact">
            <BrandLogo decorative />
            <strong>Admin</strong>
          </div>
          <IconButton label="Cerrar sesión" onClick={handleSignOut}>
            <LogOut aria-hidden="true" size={18} />
          </IconButton>
        </header>
        <main id="main-content" className="admin-main" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
