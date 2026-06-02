import { Star } from "lucide-react";
import { useId } from "react";

import { cn } from "@/lib/cn";

interface StarRatingProps {
  value: number;
  label?: string;
  name?: string;
  interactive?: boolean;
  onChange?: (value: number) => void;
}

export function StarRating({
  value,
  label,
  name,
  interactive = false,
  onChange
}: StarRatingProps) {
  const generatedName = useId();
  const groupName = name ?? generatedName;
  const roundedValue = Math.round(value);

  if (interactive) {
    return (
      <fieldset className="star-rating star-rating--interactive">
        <legend className="sr-only">{label ?? "Calificación"}</legend>
        {[1, 2, 3, 4, 5].map((star) => (
          <label
            key={star}
            className="star-rating__option"
          >
            <input
              className="star-rating__input sr-only"
              type="radio"
              name={groupName}
              value={star}
              checked={value === star}
              onChange={() => onChange?.(star)}
            />
            <Star
              aria-hidden="true"
              className={cn(
                "star-rating__icon",
                star <= value && "star-rating__icon--filled"
              )}
            />
            <span className="sr-only">{star} estrellas</span>
          </label>
        ))}
      </fieldset>
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
