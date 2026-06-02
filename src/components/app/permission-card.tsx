import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface PermissionCardProps {
  title: string;
  description: string;
  enabled: boolean;
  icon: ReactNode;
  onToggle: () => void;
}

export function PermissionCard({
  title,
  description,
  enabled,
  icon,
  onToggle
}: PermissionCardProps) {
  return (
    <button
      type="button"
      className={cn("permission-card", enabled && "permission-card--enabled")}
      aria-pressed={enabled}
      aria-label={`${title}. ${description}. Estado: ${enabled ? "activado" : "desactivado"}`}
      onClick={onToggle}
    >
      <span className="permission-card__icon">{icon}</span>
      <span>
        <strong>{title}</strong>
        <small>{description}</small>
        <small className="permission-card__status" aria-hidden="true">
          {enabled ? "Activado" : "Desactivado"}
        </small>
      </span>
    </button>
  );
}
