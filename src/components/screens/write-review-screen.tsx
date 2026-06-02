"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { PhotoUploadField } from "@/components/forms/photo-upload-field";
import { TextareaField } from "@/components/forms/textarea-field";
import { Button } from "@/components/ui/button";
import { FilterChip } from "@/components/ui/filter-chip";
import { StarRating } from "@/components/ui/star-rating";
import { placeService } from "@/services/place-service";
import { reviewService } from "@/services/review-service";
import type { AccessibilityFeature, Place } from "@/types/domain";

const requiredReviewError = "Escribí una reseña breve antes de publicarla.";

export function WriteReviewScreen({ placeId }: { placeId: string }) {
  const router = useRouter();
  const [place, setPlace] = useState<Place | null>(null);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [features, setFeatures] = useState<AccessibilityFeature[]>([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const accessibilityFeatures = placeService.getAccessibilityFeatures();

  useEffect(() => {
    void placeService.getPlaceById(placeId).then(setPlace);
  }, [placeId]);

  function toggleFeature(feature: AccessibilityFeature) {
    setFeatures((current) =>
      current.includes(feature)
        ? current.filter((item) => item !== feature)
        : [...current, feature]
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!text.trim()) {
      setError(requiredReviewError);
      return;
    }

    setIsSubmitting(true);

    try {
      await reviewService.submitReview({
        placeId,
        rating,
        text,
        images,
        accessibilityFeedback: features
      });
      router.push(`/places/${placeId}`);
      router.refresh();
    } catch {
      setError("No se pudo publicar la reseña. Probá nuevamente.");
      setIsSubmitting(false);
    }
  }

  const reviewTextError = error === requiredReviewError ? error : undefined;
  const formError = reviewTextError ? "" : error;

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="badge badge--accent">Reseña</p>
        <h1>Escribir reseña</h1>
        <p>{place ? `Contanos cómo fue tu experiencia en ${place.name}.` : "Cargando lugar..."}</p>
      </header>

      <form className="form-page" onSubmit={handleSubmit} noValidate>
        <section className="form-section" aria-labelledby="rating-title">
          <h2 id="rating-title">Calificación</h2>
          <StarRating
            value={rating}
            interactive
            onChange={setRating}
            label="Elegí una calificación"
          />
        </section>

        <section className="form-section" aria-labelledby="review-text-title">
          <h2 id="review-text-title">Tu experiencia</h2>
          <TextareaField
            id="review-text"
            label="Reseña"
            helperText="Mínimo sugerido: una o dos frases útiles."
            error={reviewTextError}
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              if (error === requiredReviewError) {
                setError("");
              }
            }}
            required
          />
        </section>

        <section className="form-section" aria-labelledby="accessibility-feedback-title">
          <h2 id="accessibility-feedback-title">Información útil</h2>
          <div className="chip-row">
            {accessibilityFeatures.map((feature) => (
              <FilterChip
                key={feature.id}
                label={feature.label}
                selected={features.includes(feature.id)}
                onToggle={() => toggleFeature(feature.id)}
              />
            ))}
          </div>
        </section>

        <section className="form-section" aria-labelledby="review-photos-title">
          <h2 id="review-photos-title">Fotos</h2>
          <PhotoUploadField label="Fotos de la reseña" images={images} onChange={setImages} />
        </section>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Publicando..." : "Publicar reseña"}
        </Button>
        <p className="field-error" role="alert">
          {formError}
        </p>
      </form>
    </div>
  );
}
