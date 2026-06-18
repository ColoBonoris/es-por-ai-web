import { getBrowserApiBaseUrl, joinApiUrl } from "@/lib/api-url";
import type { ApiErrorResponse } from "@/types/api";

interface ApiFetchOptions {
  skipRefresh?: boolean;
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
  options: ApiFetchOptions = {}
): Promise<T> {
  const response = await fetchApi(path, init);

  if (response.status === 401 && !options.skipRefresh && !path.startsWith("/auth/")) {
    const refreshResponse = await fetchApi(
      "/auth/refresh",
      {
        method: "POST"
      },
      true
    );

    if (refreshResponse.ok) {
      return apiFetch<T>(path, init, { skipRefresh: true });
    }
  }

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export function jsonHeaders(headers?: HeadersInit): HeadersInit {
  return {
    "Content-Type": "application/json",
    ...headers
  };
}

function fetchApi(path: string, init: RequestInit = {}, skipCache = false) {
  return fetch(joinApiUrl(getBrowserApiBaseUrl(), path), {
    ...init,
    credentials: "include",
    cache: skipCache ? "no-store" : init.cache
  });
}

async function getApiErrorMessage(response: Response) {
  try {
    const payload = (await response.json()) as Partial<ApiErrorResponse> & {
      message?: string;
    };
    return payload.error?.message ?? payload.message ?? "No se pudo completar la acción.";
  } catch {
    return "No se pudo completar la acción.";
  }
}
