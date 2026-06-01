"use client";

import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

import { SearchBar } from "@/components/forms/search-bar";
import { MockMap } from "@/components/places/mock-map";
import { PlaceCard } from "@/components/places/place-card";
import { FilterChip } from "@/components/ui/filter-chip";
import { placeService } from "@/services/place-service";
import type { AccessibilityFeature, Place } from "@/types/domain";

export function MapScreen() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [query, setQuery] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<AccessibilityFeature[]>([]);
  const categories = placeService.getCategories();
  const features = placeService.getAccessibilityFeatures();

  useEffect(() => {
    void placeService.getPlaces().then(setPlaces);
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

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="badge badge--accent">Mapa</p>
        <h1>Explorar lugares</h1>
        <p>Mapa mockeado con filtros accesibles y lista equivalente de resultados.</p>
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

          <MockMap
            places={filteredPlaces}
            selectedPlaceId={selectedPlaceId}
            onSelectPlace={setSelectedPlaceId}
          />
        </div>

        <aside className="map-panel" aria-labelledby="map-results-title">
          <div className="section-header">
            <div>
              <h2 id="map-results-title">{filteredPlaces.length} lugares</h2>
              <p>Resultados disponibles también fuera del mapa.</p>
            </div>
          </div>
          <div className="place-list">
            {filteredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} compact />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
