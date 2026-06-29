import type {
  Place,
  PlaceSubmission,
  SavedPlaceSubmission
} from "@/types/domain";
import { apiFetch, jsonHeaders } from "@/services/api-client";
import type { FavoriteStatusResponse, PaginatedResponse, PlaceResponse } from "@/types/api";

export const placeService = {
  async getPlaces(): Promise<Place[]> {
    const payload = await apiFetch<PaginatedResponse<Place>>("/places");
    return payload.data;
  },

  async getRecommendedPlaces(): Promise<Place[]> {
    try {
      const payload = await apiFetch<PaginatedResponse<Place>>(
        "/places?filter=recommended"
      );
      return payload.data;
    } catch {
      return this.getPlaces();
    }
  },

  async getPlaceById(placeId: string): Promise<Place | null> {
    try {
      const payload = await apiFetch<PlaceResponse>(`/places/${placeId}`);
      return payload.place;
    } catch {
      return null;
    }
  },

  async getFavoritePlaces(): Promise<Place[]> {
    const payload = await apiFetch<PaginatedResponse<Place>>("/favorites");
    return payload.data;
  },

  async toggleFavorite(placeId: string, nextState = true): Promise<boolean> {
    const payload = await apiFetch<FavoriteStatusResponse>(
      `/favorites/${placeId}`,
      {
        method: nextState ? "POST" : "DELETE"
      }
    );
    return payload.isFavorite;
  },

  async submitPlace(
    submission: PlaceSubmission
  ): Promise<SavedPlaceSubmission> {
    const payload = await apiFetch<{ place: SavedPlaceSubmission }>("/places", {
      method: "POST",
      headers: jsonHeaders(),
      body: JSON.stringify(submission)
    });
    return payload.place;
  },

  async getSubmissions(): Promise<SavedPlaceSubmission[]> {
    return [];
  }
};
