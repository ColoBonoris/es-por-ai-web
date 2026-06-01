import { defaultProfile } from "@/mocks/app-data";
import type {
  PermissionPreference,
  UserPreferences,
  UserProfile,
  UserSettings
} from "@/types/domain";
import {
  readStorage,
  STORAGE_KEYS,
  waitForMock,
  writeStorage
} from "@/services/mock-storage";

function countStoredItems(key: string) {
  return readStorage<unknown[]>(key, []).length;
}

function getStoredProfile(): UserProfile {
  const profile = readStorage<UserProfile>(STORAGE_KEYS.profile, defaultProfile);
  const favorites = countStoredItems(STORAGE_KEYS.favorites);
  const reviews = countStoredItems(STORAGE_KEYS.reviews);
  const submittedPlaces = countStoredItems(STORAGE_KEYS.placeSubmissions);

  return {
    ...profile,
    stats: {
      reviews: defaultProfile.stats.reviews + reviews,
      favorites,
      submittedPlaces: defaultProfile.stats.submittedPlaces + submittedPlaces
    }
  };
}

export const userService = {
  async getProfile(): Promise<UserProfile> {
    await waitForMock();
    return getStoredProfile();
  },

  async updatePreferences(
    preferences: UserPreferences
  ): Promise<UserProfile> {
    await waitForMock();
    const profile = getStoredProfile();
    const nextProfile = {
      ...profile,
      preferences
    };

    writeStorage(STORAGE_KEYS.profile, nextProfile);
    return nextProfile;
  },

  async updateSettings(settings: UserSettings): Promise<UserProfile> {
    await waitForMock();
    const profile = getStoredProfile();
    const nextProfile = {
      ...profile,
      settings
    };

    writeStorage(STORAGE_KEYS.profile, nextProfile);
    return nextProfile;
  },

  async updatePermissions(
    permissions: PermissionPreference
  ): Promise<UserProfile> {
    await waitForMock();
    const profile = getStoredProfile();
    const nextProfile = {
      ...profile,
      settings: {
        ...profile.settings,
        permissions
      }
    };

    writeStorage(STORAGE_KEYS.profile, nextProfile);
    return nextProfile;
  }
};
