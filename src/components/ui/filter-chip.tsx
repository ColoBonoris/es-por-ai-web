import { cn } from "@/lib/cn";

interface FilterChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
  className?: string;
}

export function FilterChip({
  label,
  selected,
  onToggle,
  className
}: FilterChipProps) {
  return (
    <button
      type="button"
      className={cn("filter-chip", selected && "filter-chip--selected", className)}
      aria-pressed={selected}
      onClick={onToggle}
    >
      {label}
    </button>
  );
}
