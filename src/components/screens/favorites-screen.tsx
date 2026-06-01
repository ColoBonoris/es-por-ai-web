"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { PlaceCard } from "@/components/places/place-card";
import { EmptyState } from "@/components/ui/empty-state";
import { placeService } from "@/services/place-service";
import type { Place } from "@/types/domain";

export function FavoritesScreen() {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    void placeService.getFavoritePlaces().then(setPlaces);
  }, []);

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="badge badge--accent">Favoritos</p>
        <h1>Mis favoritos</h1>
        <p>Lugares guardados para volver más tarde.</p>
      </header>

      <section className="place-list" aria-label="Lugares favoritos">
        {places.length > 0 ? (
          places.map((place) => <PlaceCard key={place.id} place={place} />)
        ) : (
          <EmptyState
            title="Todavía no guardaste lugares"
            description="Abrí un detalle y usá Guardar para construir tu lista."
            action={
              <Link href="/map" className="button button--primary">
                Explorar mapa
              </Link>
            }
          />
        )}
      </section>
    </div>
  );
}
