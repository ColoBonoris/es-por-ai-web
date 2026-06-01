"use client";

import { MapPin } from "lucide-react";

import type { Place } from "@/types/domain";

interface MockMapProps {
  places: Place[];
  selectedPlaceId?: string;
  onSelectPlace?: (placeId: string) => void;
}

export function MockMap({
  places,
  selectedPlaceId,
  onSelectPlace
}: MockMapProps) {
  return (
    <section className="mock-map" aria-label="Mapa de lugares">
      <div className="mock-map__grid" aria-hidden="true" />
      <div className="mock-map__streets" aria-hidden="true" />
      {places.map((place) => (
        <button
          key={place.id}
          type="button"
          className={
            selectedPlaceId === place.id
              ? "mock-map__pin mock-map__pin--selected"
              : "mock-map__pin"
          }
          style={place.mapPosition}
          aria-label={`Ver ${place.name} en el mapa`}
          onClick={() => onSelectPlace?.(place.id)}
        >
          <MapPin aria-hidden="true" />
        </button>
      ))}
      <div className="mock-map__user" aria-label="Tu ubicación aproximada" />
    </section>
  );
}
