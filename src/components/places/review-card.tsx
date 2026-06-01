import Image from "next/image";

import type { Review } from "@/types/domain";
import { StarRating } from "@/components/ui/star-rating";

interface ReviewCardProps {
  review: Review;
  placeName?: string;
}

export function ReviewCard({ review, placeName }: ReviewCardProps) {
  return (
    <article className="review-card">
      <div className="review-card__header">
        <div className="avatar" aria-hidden="true">
          {review.userAvatar}
        </div>
        <div>
          <h3>{review.userName}</h3>
          {placeName ? <p>{placeName}</p> : null}
          <p>{review.dateLabel}</p>
        </div>
        <StarRating value={review.rating} label={`${review.rating} estrellas`} />
      </div>
      <p>{review.text}</p>
      {review.images.length > 0 ? (
        <div className="review-card__images">
          {review.images.map((image, index) => (
            <Image
              key={image}
              src={image}
              alt={`Foto de la reseña ${index + 1}`}
              width={88}
              height={88}
            />
          ))}
        </div>
      ) : null}
    </article>
  );
}
