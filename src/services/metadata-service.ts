import type { FeatureDefinition } from "@/types/domain";
import { apiFetch } from "@/services/api-client";

export const fallbackAccessibilityFeatures: FeatureDefinition[] = [
  {
    id: "wheelchair",
    label: "Accesible en silla de ruedas",
    shortLabel: "Silla de ruedas"
  },
  {
    id: "gluten_free",
    label: "Sin TACC",
    shortLabel: "Sin TACC"
  },
  {
    id: "vegetarian",
    label: "Vegetariano",
    shortLabel: "Vegetariano"
  },
  {
    id: "vegan",
    label: "Vegano",
    shortLabel: "Vegano"
  },
  {
    id: "kosher",
    label: "Kosher",
    shortLabel: "Kosher"
  },
  {
    id: "pet_friendly",
    label: "Acepta mascotas",
    shortLabel: "Mascotas"
  },
  {
    id: "visual_accessibility",
    label: "Accesibilidad visual",
    shortLabel: "Acc. visual"
  }
];

export const fallbackPlaceCategories = [
  "Cafetería",
  "Restaurante",
  "Bar",
  "Panadería",
  "Heladería",
  "Comida saludable",
  "Librería",
  "Otro"
];

export function getFeatureLabel(featureId: FeatureDefinition["id"]) {
  return (
    fallbackAccessibilityFeatures.find((feature) => feature.id === featureId)?.label ??
    featureId
  );
}

export function getFeatureShortLabel(featureId: FeatureDefinition["id"]) {
  return (
    fallbackAccessibilityFeatures.find((feature) => feature.id === featureId)?.shortLabel ??
    getFeatureLabel(featureId)
  );
}

export const metadataService = {
  async getCategories() {
    try {
      const payload = await apiFetch<{ categories: string[] }>("/metadata/categories");
      return payload.categories;
    } catch {
      return fallbackPlaceCategories;
    }
  },

  async getAccessibilityFeatures() {
    try {
      const payload = await apiFetch<{ accessibilityFeatures: FeatureDefinition[] }>(
        "/metadata/accessibility-features"
      );
      return payload.accessibilityFeatures;
    } catch {
      return fallbackAccessibilityFeatures;
    }
  }
};
