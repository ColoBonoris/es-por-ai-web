"use client";

import Link from "next/link";
import { Heart, Map, MessageSquare, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { SearchBar } from "@/components/forms/search-bar";
import { PlaceCard } from "@/components/places/place-card";
import { ReviewCard } from "@/components/places/review-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingState } from "@/components/ui/loading-state";
import { placeService } from "@/services/place-service";
import { reviewService } from "@/services/review-service";
import { userService } from "@/services/user-service";
import type { Place, Review, UserProfile } from "@/types/domain";

export function HomeScreen() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadHome() {
      try {
        const [nextPlaces, nextReviews, nextProfile] = await Promise.all([
          placeService.getRecommendedPlaces(),
          reviewService.getRecentReviews(),
          userService.getProfile()
        ]);
        setPlaces(nextPlaces);
        setReviews(nextReviews);
        setProfile(nextProfile);
      } finally {
        setIsLoading(false);
      }
    }

    void loadHome();
  }, []);

  const filteredPlaces = places.filter((place) =>
    [place.name, place.category, place.description]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="badge badge--accent">Inicio</p>
        <h1>Hola{profile ? `, ${profile.name.split(" ")[0]}` : ""}</h1>
        <p>Buscá lugares, revisá recomendaciones y guardá opciones útiles.</p>
      </header>

      <div className="home-layout">
        <div className="home-main">
          <SearchBar value={query} onChange={setQuery} />

          <section aria-labelledby="quick-actions-title">
            <div className="section-header">
              <div>
                <h2 id="quick-actions-title">Acciones rápidas</h2>
                <p>Atajos principales para moverte por la app.</p>
              </div>
            </div>
            <div className="quick-actions">
              <Link href="/map" className="quick-action">
                <Map aria-hidden="true" />
                <strong>Explorar mapa</strong>
                <span>Ver lugares cercanos y filtros.</span>
              </Link>
              <Link href="/ai" className="quick-action">
                <MessageSquare aria-hidden="true" />
                <strong>Preguntarle a IAn</strong>
                <span>Pedí recomendaciones simples.</span>
              </Link>
              <Link href="/favorites" className="quick-action">
                <Heart aria-hidden="true" />
                <strong>Mis favoritos</strong>
                <span>Volvé a lugares guardados.</span>
              </Link>
            </div>
          </section>

          <section className="place-list" aria-labelledby="recommendations-title">
            <div className="section-header">
              <div>
                <h2 id="recommendations-title">Recomendaciones para vos</h2>
                <p>Lugares sugeridos según tus preferencias y actividad.</p>
              </div>
              <Link href="/places/new" className="button button--ghost">
                <Plus aria-hidden="true" size={18} />
                Agregar lugar
              </Link>
            </div>

            {isLoading ? (
              <LoadingState
                label="Cargando recomendaciones"
                description="Estamos preparando lugares y reseñas recientes."
              />
            ) : filteredPlaces.length > 0 ? (
              filteredPlaces.slice(0, 4).map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))
            ) : (
              <EmptyState
                title="No encontramos lugares"
                description="Probá con otro término o explorá el mapa."
                action={
                  <Button type="button" variant="ghost" onClick={() => setQuery("")}>
                    Limpiar búsqueda
                  </Button>
                }
              />
            )}
          </section>
        </div>

        <aside className="home-aside" aria-labelledby="recent-reviews-title">
          <section className="review-list">
            <div className="section-header">
              <div>
                <h2 id="recent-reviews-title">Reseñas recientes</h2>
                <p>Actividad de la comunidad.</p>
              </div>
            </div>
            {isLoading ? (
              <LoadingState label="Cargando reseñas" size="compact" />
            ) : (
              reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  placeName={places.find((place) => place.id === review.placeId)?.name}
                />
              ))
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
