import {
  accessibilityFeatures,
  placeCategories,
  seedPlaces
} from "@/mocks/app-data";
import type {
  Place,
  PlaceSubmission,
  SavedPlaceSubmission
} from "@/types/domain";
import {
  createMockId,
  readStorage,
  STORAGE_KEYS,
  waitForMock,
  writeStorage
} from "@/services/mock-storage";

function getFavoriteIds() {
  return readStorage<string[]>(STORAGE_KEYS.favorites, []);
}

function withFavoriteState(place: Place): Place {
  return {
    ...place,
    isFavorite: getFavoriteIds().includes(place.id)
  };
}

export const placeService = {
  async getPlaces(): Promise<Place[]> {
    await waitForMock();
    return seedPlaces.map(withFavoriteState);
  },

  async getPlaceById(placeId: string): Promise<Place | null> {
    await waitForMock();
    const place = seedPlaces.find((item) => item.id === placeId);
    return place ? withFavoriteState(place) : null;
  },

  async getFavoritePlaces(): Promise<Place[]> {
    await waitForMock();
    const favoriteIds = getFavoriteIds();
    return seedPlaces
      .filter((place) => favoriteIds.includes(place.id))
      .map(withFavoriteState);
  },

  async toggleFavorite(placeId: string): Promise<boolean> {
    await waitForMock();
    const favoriteIds = getFavoriteIds();
    const nextFavoriteIds = favoriteIds.includes(placeId)
      ? favoriteIds.filter((id) => id !== placeId)
      : [...favoriteIds, placeId];

    writeStorage(STORAGE_KEYS.favorites, nextFavoriteIds);
    return nextFavoriteIds.includes(placeId);
  },

  async submitPlace(
    submission: PlaceSubmission
  ): Promise<SavedPlaceSubmission> {
    await waitForMock();
    const submissions = readStorage<SavedPlaceSubmission[]>(
      STORAGE_KEYS.placeSubmissions,
      []
    );
    const savedSubmission: SavedPlaceSubmission = {
      ...submission,
      id: createMockId("place"),
      status: "pending",
      submittedAt: new Date().toISOString()
    };

    writeStorage(STORAGE_KEYS.placeSubmissions, [
      savedSubmission,
      ...submissions
    ]);
    return savedSubmission;
  },

  async getSubmissions(): Promise<SavedPlaceSubmission[]> {
    await waitForMock();
    return readStorage<SavedPlaceSubmission[]>(
      STORAGE_KEYS.placeSubmissions,
      []
    );
  },

  getCategories() {
    return placeCategories;
  },

  getAccessibilityFeatures() {
    return accessibilityFeatures;
  }
};
