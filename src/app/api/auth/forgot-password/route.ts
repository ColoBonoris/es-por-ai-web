import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
  };

  if (!body.email) {
    return NextResponse.json(
      { message: "Ingresá tu correo para recibir las instrucciones." },
      { status: 400 }
    );
  }

  return NextResponse.json({ user: null });
}
