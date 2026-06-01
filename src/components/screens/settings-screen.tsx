"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { FilterChip } from "@/components/ui/filter-chip";
import { getFeatureLabel } from "@/mocks/app-data";
import { placeService } from "@/services/place-service";
import { userService } from "@/services/user-service";
import type {
  AccessibilityFeature,
  ThemePreference,
  UserProfile,
  UserSettings
} from "@/types/domain";

const themeOptions: Array<{ value: ThemePreference; label: string }> = [
  { value: "light", label: "Claro" },
  { value: "dark", label: "Oscuro" },
  { value: "high-contrast", label: "Alto contraste" }
];

export function SettingsScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [message, setMessage] = useState("");
  const features = placeService.getAccessibilityFeatures();

  useEffect(() => {
    async function loadSettings() {
      const nextProfile = await userService.getProfile();
      setProfile(nextProfile);
    }

    void loadSettings();
  }, []);

  useEffect(() => {
    if (profile) {
      document.documentElement.dataset.theme = profile.settings.theme;
    }
  }, [profile]);

  async function updateSettings(settings: UserSettings) {
    const nextProfile = await userService.updateSettings(settings);
    setProfile(nextProfile);
    setMessage("Configuración guardada.");
  }

  async function togglePreference(feature: AccessibilityFeature) {
    if (!profile) {
      return;
    }

    const current = profile.preferences.accessibilityFeatures;
    const accessibilityFeatures = current.includes(feature)
      ? current.filter((item) => item !== feature)
      : [...current, feature];

    const nextProfile = await userService.updatePreferences({
      accessibilityFeatures
    });
    setProfile(nextProfile);
    setMessage("Preferencias guardadas.");
  }

  if (!profile) {
    return <p>Cargando configuración...</p>;
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="badge badge--accent">Configuración</p>
        <h1>Preferencias</h1>
        <p>Personalizá tema, notificaciones y recomendaciones.</p>
      </header>

      <section className="form-section" aria-labelledby="theme-title">
        <h2 id="theme-title">Tema</h2>
        <div className="theme-options">
          {themeOptions.map((theme) => (
            <FilterChip
              key={theme.value}
              label={theme.label}
              selected={profile.settings.theme === theme.value}
              onToggle={() =>
                void updateSettings({
                  ...profile.settings,
                  theme: theme.value
                })
              }
            />
          ))}
        </div>
      </section>

      <section className="settings-list" aria-labelledby="notifications-title">
        <h2 id="notifications-title">Notificaciones</h2>
        <div className="setting-row">
          <div>
            <strong>Reseñas</strong>
            <p>Recibir novedades sobre lugares reseñados.</p>
          </div>
          <Button
            type="button"
            variant={profile.settings.notifications.reviews ? "secondary" : "ghost"}
            onClick={() =>
              void updateSettings({
                ...profile.settings,
                notifications: {
                  ...profile.settings.notifications,
                  reviews: !profile.settings.notifications.reviews
                }
              })
            }
          >
            {profile.settings.notifications.reviews ? "Activado" : "Desactivado"}
          </Button>
        </div>
        <div className="setting-row">
          <div>
            <strong>Recomendaciones</strong>
            <p>Recibir sugerencias mockeadas de lugares.</p>
          </div>
          <Button
            type="button"
            variant={profile.settings.notifications.recommendations ? "secondary" : "ghost"}
            onClick={() =>
              void updateSettings({
                ...profile.settings,
                notifications: {
                  ...profile.settings.notifications,
                  recommendations: !profile.settings.notifications.recommendations
                }
              })
            }
          >
            {profile.settings.notifications.recommendations ? "Activado" : "Desactivado"}
          </Button>
        </div>
      </section>

      <section className="form-section" aria-labelledby="preferences-title">
        <h2 id="preferences-title">Preferencias de recomendación</h2>
        <div className="chip-row">
          {features.map((feature) => (
            <FilterChip
              key={feature.id}
              label={getFeatureLabel(feature.id)}
              selected={profile.preferences.accessibilityFeatures.includes(feature.id)}
              onToggle={() => void togglePreference(feature.id)}
            />
          ))}
        </div>
      </section>

      <p className="status-message" aria-live="polite">
        {message}
      </p>
    </div>
  );
}
