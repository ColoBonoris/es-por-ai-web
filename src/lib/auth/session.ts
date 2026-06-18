import { cookies } from "next/headers";

import { getServerApiBaseUrl, joinApiUrl } from "@/lib/api-url";
import type { AuthUser } from "@/types/auth";

interface AuthResponse {
  user: AuthUser | null;
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  if (!cookieHeader) {
    return null;
  }

  try {
    const response = await fetch(joinApiUrl(getServerApiBaseUrl(), "/auth/me"), {
      headers: {
        cookie: cookieHeader
      },
      cache: "no-store"
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as AuthResponse;
    return payload.user;
  } catch {
    return null;
  }
}
