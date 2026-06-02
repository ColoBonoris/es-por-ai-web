export type AccessibilityFeature =
  | "wheelchair"
  | "gluten_free"
  | "vegetarian"
  | "vegan"
  | "kosher"
  | "pet_friendly"
  | "visual_accessibility";

export type ThemePreference = "light" | "dark" | "high-contrast";

export interface FeatureDefinition {
  id: AccessibilityFeature;
  label: string;
  shortLabel: string;
}

export interface Place {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  hours: string;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  badges: AccessibilityFeature[];
  verified: boolean;
  distance?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  isFavorite?: boolean;
}

export interface Review {
  id: string;
  placeId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  dateLabel: string;
  text: string;
  images: string[];
  accessibilityFeedback?: AccessibilityFeature[];
}

export interface UserPreferences {
  accessibilityFeatures: AccessibilityFeature[];
}

export interface PermissionPreference {
  location: boolean;
  camera: boolean;
  notifications: boolean;
}

export interface UserSettings {
  theme: ThemePreference;
  notifications: {
    reviews: boolean;
    recommendations: boolean;
  };
  permissions: PermissionPreference;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  stats: {
    reviews: number;
    favorites: number;
    submittedPlaces: number;
  };
  preferences: UserPreferences;
  settings: UserSettings;
}

export interface ReviewSubmission {
  placeId: string;
  rating: number;
  text: string;
  images: string[];
  accessibilityFeedback: AccessibilityFeature[];
}

export interface PlaceSubmission {
  name: string;
  address: string;
  category: string;
  description: string;
  badges: AccessibilityFeature[];
  images: string[];
  menuText?: string;
}

export interface SavedPlaceSubmission extends PlaceSubmission {
  id: string;
  status: "pending";
  submittedAt: string;
}

export interface AiRecommendedPlace {
  place: Place;
  reason: string;
}

export interface AiMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  recommendations?: AiRecommendedPlace[];
  createdAt: string;
}
