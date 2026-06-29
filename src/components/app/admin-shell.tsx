"use client";

import { ClipboardList, LogOut, Users } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

import { BrandLogo } from "@/components/app/brand-logo";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/cn";
import { useAuth } from "@/providers/auth-provider";

const adminNavItems = [
  {
    href: "/admin?tab=users",
    tab: "users",
    label: "Usuarios",
    icon: Users
  },
  {
    href: "/admin?tab=places",
    tab: "places",
    label: "Lugares",
    icon: ClipboardList
  }
] as const;

export function AdminShell({
  children,
  userName
}: {
  children: ReactNode;
  userName: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signOut } = useAuth();
  const activeTab = searchParams.get("tab") === "places" ? "places" : "users";

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
        <nav className="admin-navigation" aria-label="Navegación admin">
          {adminNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.tab}
                href={item.href}
                className={cn(
                  "admin-navigation__link",
                  activeTab === item.tab && "is-active"
                )}
                aria-current={activeTab === item.tab ? "page" : undefined}
              >
                <Icon aria-hidden="true" size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="app-sidebar__footer">
          <p>{userName}</p>
          <IconButton label="Cerrar sesión" onClick={handleSignOut}>
            <LogOut aria-hidden="true" size={18} />
          </IconButton>
        </div>
      </aside>
      <div className="admin-shell__content">
        <header className="app-topbar">
          <div className="app-brand app-brand--compact">
            <BrandLogo decorative />
            <strong>Admin</strong>
          </div>
          <IconButton label="Cerrar sesión" onClick={handleSignOut}>
            <LogOut aria-hidden="true" size={18} />
          </IconButton>
        </header>
        <nav className="admin-mobile-nav" aria-label="Navegación admin móvil">
          {adminNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.tab}
                href={item.href}
                className={cn(
                  "admin-mobile-nav__link",
                  activeTab === item.tab && "is-active"
                )}
                aria-current={activeTab === item.tab ? "page" : undefined}
              >
                <Icon aria-hidden="true" size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <main id="main-content" className="admin-main" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
