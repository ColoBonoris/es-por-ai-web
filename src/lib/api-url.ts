const DEFAULT_BROWSER_API_BASE_URL = "/api/v1";
const DEFAULT_SERVER_API_BASE_URL = "http://localhost:3002/api/v1";

export function getBrowserApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_BROWSER_API_BASE_URL;
}

export function getServerApiBaseUrl() {
  const publicApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    process.env.API_BASE_URL ??
    (publicApiBaseUrl?.startsWith("http") ? publicApiBaseUrl : undefined) ??
    DEFAULT_SERVER_API_BASE_URL
  );
}

export function joinApiUrl(baseUrl: string, path: string) {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${normalizedBaseUrl}${normalizedPath}`;
}
