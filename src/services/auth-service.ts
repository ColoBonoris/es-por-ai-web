import { mockUsers, toAuthUser } from "@/mocks/users";
import type { AuthUser } from "@/types/auth";
import type { UserPreferences } from "@/types/domain";

interface AuthResponse {
  user: AuthUser | null;
}

interface AuthErrorResponse {
  message?: string;
}

export async function validateMockCredentials(
  email: string,
  password: string
): Promise<AuthUser | null> {
  const normalizedEmail = email.trim().toLowerCase();
  const user = mockUsers.find(
    (record) =>
      record.email.toLowerCase() === normalizedEmail &&
      record.password === password
  );

  return user ? toAuthUser(user) : null;
}

async function parseAuthResponse(response: Response): Promise<AuthResponse> {
  if (!response.ok) {
    const payload = (await response.json()) as AuthErrorResponse;
    throw new Error(payload.message ?? "No se pudo completar la acción.");
  }

  return (await response.json()) as AuthResponse;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthUser> {
    const payload = await parseAuthResponse(
      await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
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
    const payload = await parseAuthResponse(
      await fetch("/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
      })
    );

    if (!payload.user) {
      throw new Error("No se pudo crear la cuenta.");
    }

    return payload.user;
  },

  async forgotPassword(email: string): Promise<void> {
    await parseAuthResponse(
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      })
    );
  },

  async logout(): Promise<void> {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include"
    });
  },

  async getSession(): Promise<AuthUser | null> {
    const response = await fetch("/api/auth/session", {
      method: "GET",
      credentials: "include",
      cache: "no-store"
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as AuthResponse;
    return payload.user;
  }
};
