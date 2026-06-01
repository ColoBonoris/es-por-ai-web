import { cookies } from "next/headers";

import type { AuthUser } from "@/types/auth";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";

interface SessionPayload {
  user: AuthUser;
}

function serializeSession(user: AuthUser) {
  return Buffer.from(JSON.stringify({ user } satisfies SessionPayload), "utf-8")
    .toString("base64url");
}

function parseSession(value?: string): AuthUser | null {
  if (!value) {
    return null;
  }

  try {
    const raw = Buffer.from(value, "base64url").toString("utf-8");
    const payload = JSON.parse(raw) as SessionPayload;
    return payload.user;
  } catch {
    return null;
  }
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  return parseSession(cookieStore.get(SESSION_COOKIE_NAME)?.value);
}

export async function createSession(user: AuthUser) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, serializeSession(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
