import { apiFetch, jsonHeaders } from "@/services/api-client";
import type { AuthUser } from "@/types/auth";
import type { UserPreferences } from "@/types/domain";

interface AuthResponse {
  user: AuthUser | null;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthUser> {
    const payload = await apiFetch<AuthResponse>(
      "/auth/login",
      {
        method: "POST",
        headers: jsonHeaders(),
        body: JSON.stringify({ email, password })
      },
      { skipRefresh: true }
    );

    if (!payload.user) {
      throw new Error("No se pudo iniciar sesión.");
    }

    return payload.user;
  },

  async register(input: {
    name: string;
    email: string;
    password: string;
    preferences: UserPreferences;
  }): Promise<AuthUser> {
    const payload = await apiFetch<AuthResponse>(
      "/auth/register",
      {
        method: "POST",
        headers: jsonHeaders(),
        body: JSON.stringify(input)
      },
      { skipRefresh: true }
    );

    if (!payload.user) {
      throw new Error("No se pudo crear la cuenta.");
    }

    return payload.user;
  },

  async forgotPassword(email: string): Promise<void> {
    await apiFetch<AuthResponse>(
      "/auth/forgot-password",
      {
        method: "POST",
        headers: jsonHeaders(),
        body: JSON.stringify({ email })
      },
      { skipRefresh: true }
    );
  },

  async logout(): Promise<void> {
    await apiFetch<{ ok: boolean }>(
      "/auth/logout",
      {
        method: "POST"
      },
      { skipRefresh: true }
    ).catch(() => undefined);
  },

  async getSession(): Promise<AuthUser | null> {
    try {
      const payload = await apiFetch<AuthResponse>("/auth/me", {
        method: "GET",
        cache: "no-store"
      });
      return payload.user;
    } catch {
      return null;
    }
  }
};
