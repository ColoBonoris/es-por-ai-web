import type { AuthUser } from "@/types/auth";

export function getDefaultRouteForUser(user: AuthUser | null) {
  return user?.role === "ADMIN" ? "/admin" : "/home";
}

export function resolvePostLoginRoute(user: AuthUser, redirectTo: string | null) {
  const safeRedirect =
    redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
      ? redirectTo
      : null;

  if (user.role === "ADMIN") {
    return safeRedirect?.startsWith("/admin") ? safeRedirect : "/admin";
  }

  if (safeRedirect?.startsWith("/admin")) {
    return "/home";
  }

  return safeRedirect ?? "/home";
}
