"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { ReactNode } from "react";

import { AppNavigation } from "@/components/app/app-navigation";
import { BrandLogo } from "@/components/app/brand-logo";
import { MobileBottomNav } from "@/components/app/mobile-bottom-nav";
import { IconButton } from "@/components/ui/icon-button";
import { useAuth } from "@/providers/auth-provider";
import { userService } from "@/services/user-service";

export function AppShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    router.push("/login");
    router.refresh();
  }

  useEffect(() => {
    void userService.getProfile().then((profile) => {
      document.documentElement.dataset.theme = profile.settings.theme;
    });
  }, []);

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="app-brand">
          <BrandLogo decorative />
          <div>
            <strong>Es por AI</strong>
            <small>Descubrir lugares</small>
          </div>
        </div>
        <AppNavigation />
        <div className="app-sidebar__footer">
          <p>{user?.name ?? "Usuario demo"}</p>
          <IconButton label="Cerrar sesión" onClick={handleSignOut}>
            <LogOut aria-hidden="true" size={18} />
          </IconButton>
        </div>
      </aside>

      <div className="app-shell__content">
        <header className="app-topbar">
          <div className="app-brand app-brand--compact">
            <BrandLogo decorative />
            <strong>Es por AI</strong>
          </div>
          <IconButton label="Cerrar sesión" onClick={handleSignOut}>
            <LogOut aria-hidden="true" size={18} />
          </IconButton>
        </header>

        <main id="main-content" className="app-main" tabIndex={-1}>
          {children}
        </main>
        <MobileBottomNav />
      </div>
    </div>
  );
}
