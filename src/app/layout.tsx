import type { Metadata } from "next";

import { RouteFocus } from "@/components/app/route-focus";
import { AuthProvider } from "@/providers/auth-provider";

import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "leaflet/dist/leaflet.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Es por AI",
  description: "Una aplicación accesible para descubrir y reseñar lugares en tu ciudad."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <RouteFocus />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
