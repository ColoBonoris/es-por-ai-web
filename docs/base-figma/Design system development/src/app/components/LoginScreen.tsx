import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";

export function LoginScreen({ onLogin, onForgotPassword, onRegister }: {
  onLogin: () => void;
  onForgotPassword: () => void;
  onRegister: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-[var(--spacing-mobile-padding)]">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1>Bienvenido</h1>
          <p className="text-muted-foreground">Ingresá a tu cuenta para continuar</p>
        </div>

        <Card className="rounded-[var(--radius-card)] border-border">
          <CardHeader>
            <CardTitle>Iniciar sesión</CardTitle>
            <CardDescription>Ingresá con tu email y contraseña</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <button
                type="button"
                onClick={onForgotPassword}
                className="text-sm text-[var(--warm-accent)] hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>

              <Button
                type="submit"
                className="w-full rounded-[var(--radius-button)]"
              >
                Iniciar sesión
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            ¿No tenés cuenta?{" "}
            <button
              onClick={onRegister}
              className="text-[var(--warm-accent)] hover:underline"
            >
              Crear cuenta
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
