import type {
  PermissionPreference,
  UserPreferences,
  UserProfile,
  UserSettings
} from "@/types/domain";
import { apiFetch, jsonHeaders } from "@/services/api-client";

export const userService = {
  async getProfile(): Promise<UserProfile> {
    const payload = await apiFetch<{ user: UserProfile }>("/users/me");
    return payload.user;
  },

  async updatePreferences(
    preferences: UserPreferences
  ): Promise<UserProfile> {
    const payload = await apiFetch<{ user: UserProfile }>(
      "/users/me/preferences",
      {
        method: "PATCH",
        headers: jsonHeaders(),
        body: JSON.stringify({ preferences })
      }
    );
    return payload.user;
  },

  async updateSettings(settings: UserSettings): Promise<UserProfile> {
    const payload = await apiFetch<{ user: UserProfile }>("/users/me/settings", {
      method: "PATCH",
      headers: jsonHeaders(),
      body: JSON.stringify({ settings })
    });
    return payload.user;
  },

  async updatePermissions(
    permissions: PermissionPreference
  ): Promise<UserProfile> {
    const payload = await apiFetch<{ user: UserProfile }>(
      "/users/me/permissions",
      {
        method: "PATCH",
        headers: jsonHeaders(),
        body: JSON.stringify({ permissions })
      }
    );
    return payload.user;
  }
};
