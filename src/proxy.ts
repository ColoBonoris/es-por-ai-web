import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";

export function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
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
