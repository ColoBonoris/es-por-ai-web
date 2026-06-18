"use client";

import dynamic from "next/dynamic";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

import { SearchBar } from "@/components/forms/search-bar";
import { PlaceCard } from "@/components/places/place-card";
import { EmptyState } from "@/components/ui/empty-state";
import { FilterChip } from "@/components/ui/filter-chip";
import { metadataService } from "@/services/metadata-service";
import { placeService } from "@/services/place-service";
import type { AccessibilityFeature, FeatureDefinition, Place } from "@/types/domain";

const LeafletMap = dynamic(
  () => import("@/components/places/leaflet-map").then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => <div className="leaflet-map leaflet-map--loading">Cargando mapa...</div>
  }
);

export function MapScreen() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [query, setQuery] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<AccessibilityFeature[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [features, setFeatures] = useState<FeatureDefinition[]>([]);

  useEffect(() => {
    void Promise.all([
      placeService.getPlaces(),
      metadataService.getCategories(),
      metadataService.getAccessibilityFeatures()
    ]).then(([nextPlaces, nextCategories, nextFeatures]) => {
      setPlaces(nextPlaces);
      setCategories(nextCategories);
      setFeatures(nextFeatures);
    });
  }, []);

  function toggleCategory(category: string) {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category]
    );
  }

  function toggleFeature(feature: AccessibilityFeature) {
    setSelectedFeatures((current) =>
      current.includes(feature)
        ? current.filter((item) => item !== feature)
        : [...current, feature]
    );
  }

  const filteredPlaces = places.filter((place) => {
    const matchesQuery = [place.name, place.category, place.description]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(place.category);
    const matchesFeatures =
      selectedFeatures.length === 0 ||
      selectedFeatures.every((feature) => place.badges.includes(feature));

    return matchesQuery && matchesCategory && matchesFeatures;
  });
  const selectedPlace = filteredPlaces.find((place) => place.id === selectedPlaceId);

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="badge badge--accent">Mapa</p>
        <h1>Explorar lugares</h1>
        <p>Mapa Leaflet con filtros accesibles y lista equivalente de resultados.</p>
      </header>

      <div className="map-layout">
        <div className="home-main">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Buscar lugares en el mapa..."
          />

          <section className="form-section" aria-labelledby="filters-title">
            <div className="section-header">
              <div>
                <h2 id="filters-title">Filtros</h2>
                <p>Refiná por categoría o características.</p>
              </div>
              <SlidersHorizontal aria-hidden="true" color="var(--accent)" />
            </div>

            <div className="chip-row" aria-label="Categorías">
              {categories.map((category) => (
                <FilterChip
                  key={category}
                  label={category}
                  selected={selectedCategories.includes(category)}
                  onToggle={() => toggleCategory(category)}
                />
              ))}
            </div>

            <div className="chip-row" aria-label="Accesibilidad">
              {features.map((feature) => (
                <FilterChip
                  key={feature.id}
                  label={feature.label}
                  selected={selectedFeatures.includes(feature.id)}
                  onToggle={() => toggleFeature(feature.id)}
                />
              ))}
            </div>
          </section>

          <LeafletMap
            places={filteredPlaces}
            selectedPlaceId={selectedPlaceId}
            onSelectPlace={setSelectedPlaceId}
          />
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {selectedPlace
              ? `${selectedPlace.name} seleccionado en el mapa. También está disponible en la lista de resultados.`
              : ""}
          </p>
        </div>

        <aside className="map-panel" aria-labelledby="map-results-title">
          <div className="section-header">
            <div>
              <h2 id="map-results-title">{filteredPlaces.length} lugares</h2>
              <p>Resultados disponibles también fuera del mapa.</p>
            </div>
          </div>
          <div className="place-list">
            {filteredPlaces.length > 0 ? (
              filteredPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} compact />
              ))
            ) : (
              <EmptyState
                title="No hay resultados"
                description="Probá quitando filtros o usando otra búsqueda."
              />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
