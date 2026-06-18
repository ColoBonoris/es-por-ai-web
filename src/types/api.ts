import type { AuthUser } from "@/types/auth";
import type {
  AccessibilityFeature,
  FeatureDefinition,
  PermissionPreference,
  Place,
  PlaceSubmission,
  Review,
  ReviewSubmission,
  SavedPlaceSubmission,
  UserPreferences,
  UserProfile,
  UserSettings
} from "@/types/domain";

export type ApiErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "CONFLICT"
  | "INTERNAL_ERROR";

export interface ApiError {
  code: ApiErrorCode;
  message: string;
  fieldErrors?: Record<string, string[]>;
}

export interface ApiErrorResponse {
  error: ApiError;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

export interface AuthResponse {
  user: AuthUser | null;
}

export interface AdminUserListItem {
  id: string;
  name: string;
  email: string;
  role: AuthUser["role"];
  avatar: string;
  createdAt?: string;
}

export type AdminPlaceSubmissionListItem = SavedPlaceSubmission & {
  submittedBy: string;
};

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
  preferences: UserPreferences;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface UserProfileResponse {
  user: UserProfile;
}

export interface UpdatePreferencesRequest {
  preferences: UserPreferences;
}

export interface UpdateSettingsRequest {
  settings: UserSettings;
}

export interface UpdatePermissionsRequest {
  permissions: PermissionPreference;
}

export interface PlaceListQuery {
  query?: string;
  category?: string;
  features?: AccessibilityFeature[];
  page?: number;
  pageSize?: number;
  lat?: number;
  lng?: number;
}

export interface PlaceResponse {
  place: Place;
}

export type CreatePlaceRequest = PlaceSubmission;

export interface FavoriteStatusResponse {
  placeId: string;
  isFavorite: boolean;
}

export interface ReviewListResponse {
  reviews: Review[];
}

export type CreateReviewRequest = ReviewSubmission;

export interface MetadataResponse {
  categories: string[];
  accessibilityFeatures: FeatureDefinition[];
}

export interface AssistantRecommendationRequest {
  question: string;
}

export interface AssistantRecommendationResponse {
  message: string;
  recommendations: Array<{
    place: Place;
    reason: string;
  }>;
}
