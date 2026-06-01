"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, Map, Menu, MessageSquare } from "lucide-react";

import { cn } from "@/lib/cn";

const navItems = [
  { href: "/home", label: "Inicio", icon: Home },
  { href: "/map", label: "Mapa", icon: Map },
  { href: "/ai", label: "IAn", icon: MessageSquare },
  { href: "/favorites", label: "Favoritos", icon: Heart },
  { href: "/more", label: "Más", icon: Menu }
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-bottom-nav" aria-label="Navegación principal móvil">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn("mobile-bottom-nav__item", isActive && "is-active")}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon aria-hidden="true" size={22} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
