import type { Metadata } from "next";

import { AuthProvider } from "@/providers/auth-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Es por AI",
  description: "MVP accesible para descubrir y reseñar lugares de la ciudad."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
