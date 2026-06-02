"use client";

import { Bell, ChevronRight, Palette, Shield, Smartphone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { FilterChip } from "@/components/ui/filter-chip";
import { getFeatureLabel } from "@/mocks/app-data";
import { placeService } from "@/services/place-service";
import { userService } from "@/services/user-service";
import type {
  AccessibilityFeature,
  PermissionPreference,
  ThemePreference,
  UserProfile,
  UserSettings
} from "@/types/domain";

const themeOptions: Array<{
  value: ThemePreference;
  label: string;
  description: string;
  colors: {
    background: string;
    card: string;
    accent: string;
  };
}> = [
  {
    value: "light",
    label: "Claro",
    description: "Tema cálido y minimalista con fondo beige.",
    colors: { background: "#F7F4EF", card: "#FFFFFF", accent: "#D97706" }
  },
  {
    value: "dark",
    label: "Oscuro",
    description: "Tema oscuro con acentos cálidos.",
    colors: { background: "#1F1F1F", card: "#2F2F2F", accent: "#D97706" }
  },
  {
    value: "high-contrast",
    label: "Alto contraste",
    description: "Máximo contraste para mejorar la lectura.",
    colors: { background: "#000000", card: "#1A1A1A", accent: "#FFAA00" }
  }
];

const permissionRows: Array<{
  key: keyof PermissionPreference;
  label: string;
  description: string;
}> = [
  {
    key: "location",
    label: "Ubicación",
    description: "Para ordenar lugares cercanos cuando lo habilites."
  },
  {
    key: "camera",
    label: "Cámara y fotos",
    description: "Para sumar fotos a reseñas o lugares nuevos."
  },
  {
    key: "notifications",
    label: "Notificaciones",
    description: "Para recibir avisos relevantes de la app."
  }
];

export function SettingsScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [message, setMessage] = useState("");
  const [toastMessage, setToastMessage] = useState("");
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

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage("");
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  async function updateSettings(
    settings: UserSettings,
    successMessage = "Configuración guardada."
  ) {
    const nextProfile = await userService.updateSettings(settings);
    setProfile(nextProfile);
    setMessage(successMessage);
  }

  async function changeTheme(theme: (typeof themeOptions)[number]) {
    if (!profile || profile.settings.theme === theme.value) {
      return;
    }

    const successMessage = `Modo ${theme.label.toLowerCase()} activado.`;

    await updateSettings(
      {
        ...profile.settings,
        theme: theme.value
      },
      successMessage
    );
    setToastMessage(successMessage);
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
    <div className="page-stack settings-page">
      <h1 className="sr-only">Configuración</h1>

      <section className="settings-section" aria-labelledby="theme-title">
        <div className="settings-section__header">
          <Palette aria-hidden="true" />
          <h2 id="theme-title">Apariencia</h2>
        </div>
        <fieldset className="settings-card theme-picker">
          <legend className="sr-only">Elegí el tema visual</legend>
          {themeOptions.map((theme) => (
            <label
              key={theme.value}
              className={`theme-choice ${
                profile.settings.theme === theme.value ? "is-selected" : ""
              }`}
            >
              <input
                className="sr-only"
                type="radio"
                name="theme"
                value={theme.value}
                checked={profile.settings.theme === theme.value}
                onChange={() => void changeTheme(theme)}
              />
              <span className="theme-choice__control" aria-hidden="true" />
              <span className="theme-choice__swatches" aria-hidden="true">
                <span
                  className="theme-choice__swatch"
                  style={{ backgroundColor: theme.colors.background }}
                />
                <span
                  className="theme-choice__swatch"
                  style={{ backgroundColor: theme.colors.card }}
                />
                <span
                  className="theme-choice__swatch"
                  style={{ backgroundColor: theme.colors.accent }}
                />
              </span>
              <span className="theme-choice__copy">
                <strong>{theme.label}</strong>
                <span>{theme.description}</span>
              </span>
            </label>
          ))}
        </fieldset>
      </section>

      <section className="settings-section" aria-labelledby="notifications-title">
        <div className="settings-section__header">
          <Bell aria-hidden="true" />
          <h2 id="notifications-title">Notificaciones</h2>
        </div>
        <div className="settings-card settings-card--list">
          <div className="settings-row">
            <div>
              <strong>Nuevas reseñas</strong>
              <p>Recibí novedades de los lugares que seguís o marcaste.</p>
            </div>
            <SettingsSwitch
              checked={profile.settings.notifications.reviews}
              label="Activar notificaciones de nuevas reseñas"
              onToggle={() =>
                void updateSettings({
                  ...profile.settings,
                  notifications: {
                    ...profile.settings.notifications,
                    reviews: !profile.settings.notifications.reviews
                  }
                })
              }
            />
          </div>
          <div className="settings-row">
            <div>
              <strong>Recomendaciones personalizadas</strong>
              <p>Sugerencias mockeadas según tus preferencias guardadas.</p>
            </div>
            <SettingsSwitch
              checked={profile.settings.notifications.recommendations}
              label="Activar recomendaciones personalizadas"
              onToggle={() =>
                void updateSettings({
                  ...profile.settings,
                  notifications: {
                    ...profile.settings.notifications,
                    recommendations: !profile.settings.notifications.recommendations
                  }
                })
              }
            />
          </div>
        </div>
      </section>

      <section className="settings-section" aria-labelledby="preferences-title">
        <div className="settings-section__header">
          <Shield aria-hidden="true" />
          <h2 id="preferences-title">Preferencias de recomendación</h2>
        </div>
        <div className="settings-card">
          <p className="settings-card__intro">
            Estas preferencias ayudan a ordenar resultados y recomendaciones sin
            ocultar el resto de los lugares.
          </p>
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
        </div>
      </section>

      <section className="settings-section" aria-labelledby="permissions-title">
        <div className="settings-section__header">
          <Smartphone aria-hidden="true" />
          <h2 id="permissions-title">Permisos</h2>
        </div>
        <div className="settings-card settings-card--list">
          {permissionRows.map((permission) => (
            <Link
              key={permission.key}
              href="/permissions"
              className="permission-row"
              aria-label={`${permission.label}: ${
                profile.settings.permissions[permission.key] ? "permitido" : "pendiente"
              }. Revisar permisos`}
            >
              <span>
                <strong>{permission.label}</strong>
                <small>{permission.description}</small>
              </span>
              <span className="permission-row__meta">
                <span
                  className={`permission-status ${
                    profile.settings.permissions[permission.key] ? "is-enabled" : ""
                  }`}
                >
                  {profile.settings.permissions[permission.key] ? "Permitido" : "Pendiente"}
                </span>
                <ChevronRight aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <p className="status-message" role="status" aria-live="polite">
        {message}
      </p>

      {toastMessage ? (
        <div className="toast" role="status" aria-live="polite" aria-atomic="true">
          <Palette aria-hidden="true" />
          <span>{toastMessage}</span>
        </div>
      ) : null}
    </div>
  );
}

interface SettingsSwitchProps {
  checked: boolean;
  label: string;
  onToggle: () => void;
}

function SettingsSwitch({ checked, label, onToggle }: SettingsSwitchProps) {
  return (
    <button
      type="button"
      className="settings-switch"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onToggle}
    >
      <span className="settings-switch__thumb" aria-hidden="true" />
      <span className="sr-only">{checked ? "Activado" : "Desactivado"}</span>
    </button>
  );
}
