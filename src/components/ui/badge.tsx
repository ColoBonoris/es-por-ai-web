import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type BadgeVariant = "neutral" | "accent" | "success" | "danger";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = "neutral", className }: BadgeProps) {
  return (
    <span className={cn("badge", `badge--${variant}`, className)}>
      {children}
    </span>
  );
}
