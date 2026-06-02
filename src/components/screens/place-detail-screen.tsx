"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Heart, MapPin, Navigation, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

import { ReviewCard } from "@/components/places/review-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { StarRating } from "@/components/ui/star-rating";
import { getFeatureLabel } from "@/mocks/app-data";
import { placeService } from "@/services/place-service";
import { reviewService } from "@/services/review-service";
import type { Place, Review } from "@/types/domain";

const LeafletMap = dynamic(
  () => import("@/components/places/leaflet-map").then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="leaflet-map leaflet-map--compact leaflet-map--loading">
        Cargando mapa...
      </div>
    )
  }
);

export function PlaceDetailScreen({ placeId }: { placeId: string }) {
  const [place, setPlace] = useState<Place | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    async function loadDetail() {
      const [nextPlace, nextReviews] = await Promise.all([
        placeService.getPlaceById(placeId),
        reviewService.getReviewsForPlace(placeId)
      ]);
      setPlace(nextPlace);
      setReviews(nextReviews);
      setIsLoading(false);
    }

    void loadDetail();
  }, [placeId]);

  async function toggleFavorite() {
    if (!place) {
      return;
    }

    const isFavorite = await placeService.toggleFavorite(place.id);
    setPlace({
      ...place,
      isFavorite
    });
  }

  async function sharePlace() {
    if (!place) {
      return;
    }

    const shareUrl = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: place.name,
        text: `Mirá ${place.name} en Es por AI.`,
        url: shareUrl
      });
      setShareMessage("Lugar compartido.");
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
    setShareMessage("Link copiado al portapapeles.");
  }

  if (!isLoading && !place) {
    return (
      <EmptyState
        title="No encontramos este lugar"
        description="Puede que el enlace sea incorrecto o que el lugar ya no esté disponible."
        action={
          <Link href="/home" className="button button--primary">
            Volver al inicio
          </Link>
        }
      />
    );
  }

  if (!place) {
    return (
      <div className="page-stack">
        <p>Cargando lugar...</p>
      </div>
    );
  }

  return (
    <div className="page-stack">
      <div className="detail-layout">
        <article className="detail-main">
          <header className="page-header">
            <p className="badge badge--accent">{place.category}</p>
            <h1>{place.name}</h1>
            <div className="place-card__meta">
              <StarRating value={place.rating} />
              <strong>{place.rating}</strong>
              <span>({place.reviewCount} reseñas)</span>
            </div>
          </header>

          <section className="gallery" aria-label="Galería de fotos">
            <Image src={place.images[0]} alt={place.name} width={720} height={520} priority />
            <div className="gallery__stack">
              {place.images.slice(1, 3).map((image, index) => (
                <Image
                  key={image}
                  src={image}
                  alt={`${place.name}, foto ${index + 2}`}
                  width={420}
                  height={250}
                />
              ))}
            </div>
          </section>

          <section className="form-section" aria-labelledby="about-place-title">
            <div className="section-header">
              <div>
                <h2 id="about-place-title">Acerca de este lugar</h2>
                <p>{place.description}</p>
              </div>
            </div>
            <div className="badge-row">
              {place.verified ? <Badge variant="success">Verificado</Badge> : null}
              {place.badges.map((badge) => (
                <Badge key={badge}>{getFeatureLabel(badge)}</Badge>
              ))}
            </div>
          </section>

          <section className="review-list" aria-labelledby="reviews-title">
            <div className="section-header">
              <div>
                <h2 id="reviews-title">Reseñas</h2>
                <p>Experiencias compartidas por la comunidad.</p>
              </div>
              <Link href={`/places/${place.id}/review`} className="button button--primary">
                Escribir reseña
              </Link>
            </div>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </section>
        </article>

        <aside className="detail-side-panel" aria-labelledby="place-actions-title">
          <h2 id="place-actions-title">Información útil</h2>
          <div className="place-card__meta">
            <MapPin aria-hidden="true" size={18} />
            <span>{place.address}</span>
          </div>
          <p>{place.hours}</p>
          <div className="button-row">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${place.coordinates.lat},${place.coordinates.lng}`}
              target="_blank"
              rel="noreferrer"
              className="button button--ghost"
              aria-label={`Cómo ir a ${place.name}. Abre Google Maps en una pestaña nueva.`}
            >
              <Navigation aria-hidden="true" size={18} />
              <span>Cómo ir</span>
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${place.coordinates.lat},${place.coordinates.lng}`}
              target="_blank"
              rel="noreferrer"
              className="button button--ghost"
              aria-label={`Abrir ${place.name} en Google Maps en una pestaña nueva.`}
            >
              <ExternalLink aria-hidden="true" size={18} />
              <span>Abrir en Maps</span>
            </a>
            <Button
              type="button"
              variant={place.isFavorite ? "secondary" : "ghost"}
              icon={<Heart aria-hidden="true" size={18} />}
              aria-pressed={place.isFavorite}
              onClick={toggleFavorite}
            >
              {place.isFavorite ? "Guardado" : "Guardar"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              icon={<Share2 aria-hidden="true" size={18} />}
              onClick={() => void sharePlace()}
            >
              Compartir
            </Button>
          </div>
          <p className="status-message" role="status" aria-live="polite">
            {shareMessage}
          </p>
          <LeafletMap places={[place]} selectedPlaceId={place.id} compact />
        </aside>
      </div>
    </div>
  );
}
