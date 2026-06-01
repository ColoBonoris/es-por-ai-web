import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
}

export function IconButton({
  className,
  label,
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn("icon-button", className)}
      type="button"
      aria-label={label}
      title={label}
      {...props}
    >
      {children}
    </button>
  );
}
