import { NextResponse } from "next/server";

import { createSession } from "@/lib/auth/session";
import type { AuthUser } from "@/types/auth";
import type { UserPreferences } from "@/types/domain";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    password?: string;
    preferences?: UserPreferences;
  };

  if (!body.name || !body.email || !body.password) {
    return NextResponse.json(
      { message: "Completá nombre, correo y contraseña para crear tu cuenta." },
      { status: 400 }
    );
  }

  const user: AuthUser = {
    id: `mock-${Date.now()}`,
    name: body.name.trim(),
    email: body.email.trim().toLowerCase(),
    role: "student",
    preferences: body.preferences ?? {
      accessibilityFeatures: []
    }
  };

  await createSession(user);

  return NextResponse.json({ user });
}
