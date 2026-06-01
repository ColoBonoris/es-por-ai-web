"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, Map, Menu, MessageSquare, Plus, Settings, User } from "lucide-react";

import { cn } from "@/lib/cn";

const primaryItems = [
  { href: "/home", label: "Inicio", icon: Home },
  { href: "/map", label: "Mapa", icon: Map },
  { href: "/ai", label: "IAn", icon: MessageSquare },
  { href: "/favorites", label: "Favoritos", icon: Heart },
  { href: "/more", label: "Más", icon: Menu }
];

const secondaryItems = [
  { href: "/places/new", label: "Agregar lugar", icon: Plus },
  { href: "/profile", label: "Perfil", icon: User },
  { href: "/settings", label: "Configuración", icon: Settings }
];

export function AppNavigation() {
  const pathname = usePathname();

  return (
    <nav className="app-navigation" aria-label="Navegación principal">
      <div className="app-navigation__group">
        {primaryItems.map((item) => (
          <NavigationLink key={item.href} item={item} pathname={pathname} />
        ))}
      </div>
      <div className="app-navigation__group">
        {secondaryItems.map((item) => (
          <NavigationLink key={item.href} item={item} pathname={pathname} />
        ))}
      </div>
    </nav>
  );
}

function NavigationLink({
  item,
  pathname
}: {
  item: (typeof primaryItems)[number];
  pathname: string | null;
}) {
  const Icon = item.icon;
  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      className={cn("app-navigation__link", isActive && "is-active")}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon aria-hidden="true" size={20} />
      <span>{item.label}</span>
    </Link>
  );
}
