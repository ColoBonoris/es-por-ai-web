import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { joinApiUrl } from "@/lib/api-url";
import type { AuthUser } from "@/types/auth";

const DEFAULT_API_BASE_URL = "http://localhost:3002/api/v1";

interface AuthResponse {
  user: AuthUser | null;
}

export async function proxy(request: NextRequest) {
  const user = await getSessionUser(request);

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  if (user.role === "ADMIN" && !isAdminRoute) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

async function getSessionUser(request: NextRequest) {
  try {
    const response = await fetch(joinApiUrl(getApiBaseUrl(), "/auth/me"), {
      headers: {
        cookie: request.headers.get("cookie") ?? ""
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

function getApiBaseUrl() {
  const publicApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    process.env.API_BASE_URL ??
    (publicApiBaseUrl?.startsWith("http") ? publicApiBaseUrl : undefined) ??
    DEFAULT_API_BASE_URL
  );
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/home/:path*",
    "/map/:path*",
    "/ai/:path*",
    "/favorites/:path*",
    "/more/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/permissions/:path*",
    "/places/:path*"
  ]
};
