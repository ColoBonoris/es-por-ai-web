import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  icon?: ReactNode;
  isLoading?: boolean;
  loadingLabel?: string;
}

export function Button({
  className,
  variant = "primary",
  fullWidth,
  icon,
  isLoading = false,
  loadingLabel = "Cargando",
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "button",
        `button--${variant}`,
        fullWidth && "button--full",
        isLoading && "button--loading",
        className
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="spinner spinner--button" aria-hidden="true" />
      ) : (
        icon
      )}
      <span>{isLoading ? loadingLabel : children}</span>
    </button>
  );
}
