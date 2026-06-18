"use client";

import { useEffect, useState } from "react";

import { PlaceCard } from "@/components/places/place-card";
import { ReviewCard } from "@/components/places/review-card";
import { Badge } from "@/components/ui/badge";
import { LoadingState } from "@/components/ui/loading-state";
import { getFeatureLabel } from "@/services/metadata-service";
import { placeService } from "@/services/place-service";
import { reviewService } from "@/services/review-service";
import { userService } from "@/services/user-service";
import type { Place, Review, UserProfile } from "@/types/domain";

export function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [favorites, setFavorites] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const [nextProfile, nextReviews, nextFavorites] = await Promise.all([
          userService.getProfile(),
          reviewService.getRecentReviews(),
          placeService.getFavoritePlaces()
        ]);
        setProfile(nextProfile);
        setReviews(nextReviews);
        setFavorites(nextFavorites);
      } finally {
        setIsLoading(false);
      }
    }

    void loadProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="page-stack">
        <LoadingState
          label="Cargando perfil"
          description="Estamos preparando tu actividad y preferencias."
        />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="page-stack">
        <p className="field-error" role="alert">
          No se pudo cargar el perfil.
        </p>
      </div>
    );
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="badge badge--accent">Perfil</p>
        <h1>Mi perfil</h1>
        <p>Resumen de actividad, preferencias y contenido guardado.</p>
      </header>

      <div className="profile-grid">
        <aside className="profile-card" aria-label="Datos del perfil">
          <div className="profile-avatar" aria-hidden="true">
            {profile.avatar}
          </div>
          <div>
            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
          </div>
          <div className="badge-row">
            {profile.preferences.accessibilityFeatures.map((feature) => (
              <Badge key={feature}>{getFeatureLabel(feature)}</Badge>
            ))}
          </div>
        </aside>

        <div className="home-main">
          <section className="stats-grid" aria-label="Estadísticas">
            <div className="stat-card">
              <strong>{profile.stats.reviews}</strong>
              <span>Reseñas</span>
            </div>
            <div className="stat-card">
              <strong>{profile.stats.favorites}</strong>
              <span>Favoritos</span>
            </div>
            <div className="stat-card">
              <strong>{profile.stats.submittedPlaces}</strong>
              <span>Lugares cargados</span>
            </div>
          </section>

          <section className="review-list" aria-labelledby="profile-reviews-title">
            <h2 id="profile-reviews-title">Últimas reseñas</h2>
            {reviews.slice(0, 3).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </section>

          <section className="place-list" aria-labelledby="profile-favorites-title">
            <h2 id="profile-favorites-title">Guardados</h2>
            {favorites.map((place) => (
              <PlaceCard key={place.id} place={place} compact />
            ))}
            {favorites.length === 0 ? <p>Todavía no hay favoritos guardados.</p> : null}
          </section>
        </div>
      </div>
    </div>
  );
}
