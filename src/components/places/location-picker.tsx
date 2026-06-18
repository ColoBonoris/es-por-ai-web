"use client";

import L from "leaflet";
import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents
} from "react-leaflet";

const DEFAULT_CENTER = {
  lat: -34.92145,
  lng: -57.95453
};

interface Coordinates {
  lat: number;
  lng: number;
}

interface LocationPickerProps {
  value: Coordinates | null;
  onChange: (coordinates: Coordinates) => void;
}

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  const center = value ?? DEFAULT_CENTER;

  return (
    <div className="location-picker">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={15}
        scrollWheelZoom={false}
        className="leaflet-map__canvas"
        keyboard={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onChange={onChange} />
        <SyncMapView coordinates={value} />
        {value ? (
          <Marker
            position={[value.lat, value.lng]}
            icon={createMarkerIcon()}
            alt="Ubicación seleccionada"
          />
        ) : null}
      </MapContainer>
      <p className="location-picker__meta" aria-live="polite">
        {value
          ? `${value.lat.toFixed(6)}, ${value.lng.toFixed(6)}`
          : "Sin ubicación seleccionada"}
      </p>
    </div>
  );
}

function MapClickHandler({
  onChange
}: {
  onChange: (coordinates: Coordinates) => void;
}) {
  useMapEvents({
    click(event) {
      onChange({
        lat: event.latlng.lat,
        lng: event.latlng.lng
      });
    }
  });

  return null;
}

function SyncMapView({ coordinates }: { coordinates: Coordinates | null }) {
  const map = useMap();

  useEffect(() => {
    if (coordinates) {
      map.setView([coordinates.lat, coordinates.lng], 15);
    }
  }, [coordinates, map]);

  return null;
}

function createMarkerIcon() {
  return L.divIcon({
    className: "leaflet-place-marker leaflet-place-marker--selected",
    html: `<span aria-hidden="true"></span>`,
    iconSize: [34, 42],
    iconAnchor: [17, 42],
    popupAnchor: [0, -38]
  });
}
