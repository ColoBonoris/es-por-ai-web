"use client";

import L from "leaflet";
import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap
} from "react-leaflet";

import type { Place } from "@/types/domain";

const DEFAULT_CENTER: [number, number] = [-34.92145, -57.95453];

interface LeafletMapProps {
  places: Place[];
  selectedPlaceId?: string;
  compact?: boolean;
  onSelectPlace?: (placeId: string) => void;
}

export function LeafletMap({
  places,
  selectedPlaceId,
  compact,
  onSelectPlace
}: LeafletMapProps) {
  const center = places[0]
    ? ([places[0].coordinates.lat, places[0].coordinates.lng] as [number, number])
    : DEFAULT_CENTER;

  return (
    <section
      className={compact ? "leaflet-map leaflet-map--compact" : "leaflet-map"}
      aria-label="Mapa interactivo de lugares"
    >
      <p className="sr-only">
        El mapa muestra marcadores de lugares. La lista de resultados al lado del mapa ofrece la
        misma información para navegación accesible.
      </p>
      <MapContainer
        center={center}
        zoom={compact ? 15 : 14}
        scrollWheelZoom={!compact}
        className="leaflet-map__canvas"
        keyboard
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitMapToPlaces places={places} compact={compact} />
        {places.map((place) => {
          const isSelected = selectedPlaceId === place.id;

          return (
            <Marker
              key={place.id}
              position={[place.coordinates.lat, place.coordinates.lng]}
              icon={createMarkerIcon(isSelected)}
              title={place.name}
              alt={`Marcador de ${place.name}`}
              eventHandlers={{
                click: () => onSelectPlace?.(place.id)
              }}
            >
              <Popup>
                <strong>{place.name}</strong>
                <br />
                {place.category} · {place.rating} estrellas
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </section>
  );
}

function FitMapToPlaces({
  places,
  compact
}: {
  places: Place[];
  compact?: boolean;
}) {
  const map = useMap();

  useEffect(() => {
    if (places.length === 0) {
      map.setView(DEFAULT_CENTER, compact ? 15 : 14);
      return;
    }

    if (places.length === 1) {
      const [place] = places;
      map.setView([place.coordinates.lat, place.coordinates.lng], compact ? 15 : 14);
      return;
    }

    const bounds = L.latLngBounds(
      places.map((place) => [place.coordinates.lat, place.coordinates.lng])
    );
    map.fitBounds(bounds, { padding: compact ? [24, 24] : [42, 42] });
  }, [compact, map, places]);

  return null;
}

function createMarkerIcon(isSelected: boolean) {
  return L.divIcon({
    className: isSelected
      ? "leaflet-place-marker leaflet-place-marker--selected"
      : "leaflet-place-marker",
    html: `<span aria-hidden="true"></span>`,
    iconSize: [34, 42],
    iconAnchor: [17, 42],
    popupAnchor: [0, -38]
  });
}
