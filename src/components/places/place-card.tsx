import Link from "next/link";
import { Check, Heart, MapPin, Star } from "lucide-react";

import {
  getFeatureLabel,
  getFeatureShortLabel
} from "@/services/metadata-service";
import type { Place } from "@/types/domain";
import { Badge } from "@/components/ui/badge";

interface PlaceCardProps {
  place: Place;
  compact?: boolean;
  reason?: string;
}

export function PlaceCard({ place, compact, reason }: PlaceCardProps) {
  return (
    <article className={compact ? "place-card place-card--compact" : "place-card"}>
      <Link href={`/places/${place.id}`} className="place-card__link">
        <div className="place-card__image">
          <img
            src={place.image}
            alt={`Foto de ${place.name}`}
          />
        </div>
        <div className="place-card__body">
          <div className="place-card__title-row">
            <div>
              <h3>{place.name}</h3>
              <p>{place.category}</p>
            </div>
            {place.verified ? (
              <Badge variant="success" className="place-card__verified">
                <Check aria-hidden="true" size={14} />
                <span>Verificado</span>
              </Badge>
            ) : null}
          </div>

          <div className="place-card__meta">
            <span>
              <Star aria-hidden="true" size={16} />
              {place.rating}
            </span>
            <span>({place.reviewCount})</span>
            {place.distance ? (
              <span>
                <MapPin aria-hidden="true" size={16} />
                {place.distance}
              </span>
            ) : null}
          </div>

          <div className="badge-row" aria-label="Características">
            {place.badges.slice(0, compact ? 2 : 3).map((badge) => (
              <Badge key={badge}>
                {compact ? getFeatureShortLabel(badge) : getFeatureLabel(badge)}
              </Badge>
            ))}
          </div>

          {reason ? <p className="place-card__reason">{reason}</p> : null}
        </div>
      </Link>

      {place.isFavorite ? (
        <div className="place-card__favorite" role="img" aria-label="Guardado en favoritos">
          <Heart aria-hidden="true" size={16} />
        </div>
      ) : null}
    </article>
  );
}
