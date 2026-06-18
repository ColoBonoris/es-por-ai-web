import { cn } from "@/lib/cn";

type LoadingStateSize = "default" | "compact";

interface LoadingStateProps {
  label: string;
  description?: string;
  size?: LoadingStateSize;
  className?: string;
}

export function LoadingState({
  label,
  description,
  size = "default",
  className
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "loading-state",
        size === "compact" && "loading-state--compact",
        className
      )}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="spinner" aria-hidden="true" />
      <span className="loading-state__copy">
        <strong>{label}</strong>
        {description ? <span>{description}</span> : null}
      </span>
    </div>
  );
}
