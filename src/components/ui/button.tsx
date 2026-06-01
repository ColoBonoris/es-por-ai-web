import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  icon?: ReactNode;
}

export function Button({
  className,
  variant = "primary",
  fullWidth,
  icon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "button",
        `button--${variant}`,
        fullWidth && "button--full",
        className
      )}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}
