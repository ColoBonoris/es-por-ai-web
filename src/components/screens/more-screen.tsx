"use client";

import Link from "next/link";
import { ChevronRight, FileText, LogOut, Plus, Settings, Shield, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { userService } from "@/services/user-service";
import type { UserProfile } from "@/types/domain";

const menuItems = [
  { href: "/profile", label: "Mi perfil", icon: User },
  { href: "/settings", label: "Configuración", icon: Settings },
  { href: "/places/new", label: "Agregar lugar", icon: Plus },
  { href: "/permissions", label: "Permisos", icon: Shield }
];

const legalItems = [
  { href: "/more#privacy", label: "Política de privacidad", icon: Shield },
  { href: "/more#terms", label: "Términos y condiciones", icon: FileText }
];

export function MoreScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    void userService.getProfile().then(setProfile);
  }, []);

  async function handleLogout() {
    await signOut();
    router.push("/login");
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="badge badge--accent">Más</p>
        <h1>Menú</h1>
        <p>Opciones secundarias, configuración y cuenta.</p>
      </header>

      {profile ? (
        <section className="profile-card" aria-label="Perfil resumido">
          <div className="profile-avatar" aria-hidden="true">
            {profile.avatar}
          </div>
          <div>
            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
          </div>
        </section>
      ) : null}

      <section className="more-grid" aria-label="Opciones principales">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="menu-link">
              <span>
                <Icon aria-hidden="true" color="var(--accent)" />
                {item.label}
              </span>
              <ChevronRight aria-hidden="true" />
            </Link>
          );
        })}
      </section>

      <section className="more-grid" aria-label="Legal">
        {legalItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="menu-link">
              <span>
                <Icon aria-hidden="true" />
                {item.label}
              </span>
              <ChevronRight aria-hidden="true" />
            </Link>
          );
        })}
      </section>

      <section id="privacy" className="form-section" aria-labelledby="privacy-title">
        <h2 id="privacy-title">Política de privacidad</h2>
        <p>
          Esta versión usa datos mockeados y almacenamiento local para simular el flujo.
        </p>
      </section>

      <section id="terms" className="form-section" aria-labelledby="terms-title">
        <h2 id="terms-title">Términos y condiciones</h2>
        <p>
          MVP educativo sin backend real. El contenido puede reemplazarse por textos legales finales.
        </p>
      </section>

      <Button
        type="button"
        variant="danger"
        icon={<LogOut aria-hidden="true" size={18} />}
        onClick={handleLogout}
      >
        Cerrar sesión
      </Button>
    </div>
  );
}
