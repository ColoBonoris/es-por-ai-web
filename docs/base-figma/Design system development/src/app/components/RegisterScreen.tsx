import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { useState } from "react";

export function RegisterScreen({ onRegister, onLogin }: {
  onRegister: () => void;
  onLogin: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);

  const availablePreferences = [
    "Accesible en silla de ruedas",
    "Sin TACC",
    "Vegetariano",
    "Vegano",
    "Kosher",
    "Acepta mascotas",
    "Accesibilidad visual"
  ];

  const togglePreference = (pref: string) => {
    setPreferences(prev =>
      prev.includes(pref)
        ? prev.filter(p => p !== pref)
        : [...prev, pref]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister();
  };

  return (
    <div className="min-h-screen bg-background p-[var(--spacing-mobile-padding)] py-8">
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="space-y-2">
          <h1>Crear cuenta</h1>
          <p className="text-muted-foreground">Unite a la comunidad de Es por AI</p>
        </div>

        <Card className="rounded-[var(--radius-card)] border-border">
          <CardHeader>
            <CardTitle>Información básica</CardTitle>
            <CardDescription>Completá tus datos para crear tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  className="rounded-[var(--radius-button)]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="rounded-[var(--radius-button)]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="rounded-[var(--radius-button)]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="pt-4 space-y-3">
                <div>
                  <h4>Preferencias de recomendación</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Opcional. Estas preferencias nos ayudan a brindarte mejores recomendaciones.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {availablePreferences.map((pref) => (
                    <Badge
                      key={pref}
                      variant={preferences.includes(pref) ? "default" : "secondary"}
                      className="rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => togglePreference(pref)}
                      style={
                        preferences.includes(pref)
                          ? {
                              backgroundColor: "var(--warm-accent)",
                              color: "white"
                            }
                          : undefined
                      }
                    >
                      {pref}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full rounded-[var(--radius-button)] mt-6"
              >
                Crear cuenta
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            ¿Ya tenés cuenta?{" "}
            <button
              onClick={onLogin}
              className="text-[var(--warm-accent)] hover:underline"
            >
              Iniciar sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
