import { Star } from "lucide-react";

import { cn } from "@/lib/cn";

interface StarRatingProps {
  value: number;
  label?: string;
  interactive?: boolean;
  onChange?: (value: number) => void;
}

export function StarRating({
  value,
  label,
  interactive = false,
  onChange
}: StarRatingProps) {
  const roundedValue = Math.round(value);

  if (interactive) {
    return (
      <div className="star-rating" role="radiogroup" aria-label={label ?? "Calificación"}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="star-rating__button"
            aria-checked={value === star}
            role="radio"
            onClick={() => onChange?.(star)}
          >
            <Star
              aria-hidden="true"
              className={cn(
                "star-rating__icon",
                star <= value && "star-rating__icon--filled"
              )}
            />
            <span className="sr-only">{star} estrellas</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="star-rating" aria-label={label ?? `${value} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          aria-hidden="true"
          className={cn(
            "star-rating__icon",
            star <= roundedValue && "star-rating__icon--filled"
          )}
        />
      ))}
    </div>
  );
}
