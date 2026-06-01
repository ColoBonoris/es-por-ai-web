export const STORAGE_KEYS = {
  favorites: "esporai:favorites",
  reviews: "esporai:reviews",
  placeSubmissions: "esporai:place-submissions",
  profile: "esporai:profile",
  settings: "esporai:settings",
  permissions: "esporai:permissions"
} as const;

const MOCK_DELAY_MS = 120;

export function waitForMock() {
  return new Promise((resolve) => {
    setTimeout(resolve, MOCK_DELAY_MS);
  });
}

export function createMockId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}
