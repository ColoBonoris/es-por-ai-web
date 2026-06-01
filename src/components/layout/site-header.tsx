"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/providers/auth-provider";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { status, user, signOut } = useAuth();

  const isAuthenticated = status === "authenticated" && user;

  async function handleSignOut() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="site-brand">
          Es Por AI
        </Link>

        <nav aria-label="Navegación principal">
          <ul className="nav-list">
            <li>
              <Link
                href="/"
                className={pathname === "/" ? "nav-link nav-link--active" : "nav-link"}
              >
                Inicio
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard"
                className={
                  pathname?.startsWith("/dashboard")
                    ? "nav-link nav-link--active"
                    : "nav-link"
                }
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>

        <div className="site-header__actions" aria-live="polite">
          {status === "loading" ? (
            <span className="status-chip">Validando sesión…</span>
          ) : null}

          {isAuthenticated ? (
            <>
              <span className="status-chip">Hola, {user.name}</span>
              <button type="button" className="button button--ghost" onClick={handleSignOut}>
                Cerrar sesión
              </button>
            </>
          ) : null}

          {status === "unauthenticated" ? (
            <Link href="/login" className="button button--primary">
              Ingresar
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
