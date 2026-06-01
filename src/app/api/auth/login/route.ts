import { NextResponse } from "next/server";

import { createSession } from "@/lib/auth/session";
import { validateMockCredentials } from "@/services/auth-service";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    password?: string;
  };

  if (!body.email || !body.password) {
    return NextResponse.json(
      { message: "Completá correo y contraseña para continuar." },
      { status: 400 }
    );
  }

  const user = await validateMockCredentials(body.email, body.password);

  if (!user) {
    return NextResponse.json(
      { message: "Las credenciales mock no coinciden." },
      { status: 401 }
    );
  }

  await createSession(user);

  return NextResponse.json({ user });
}
