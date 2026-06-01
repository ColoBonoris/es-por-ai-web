import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export function ForgotPasswordScreen({ onBack, onSubmit }: {
  onBack: () => void;
  onSubmit: () => void;
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-[var(--spacing-mobile-padding)]">
      <div className="w-full max-w-md space-y-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        <div className="space-y-2">
          <h1>Recuperar contraseña</h1>
          <p className="text-muted-foreground">
            Te enviaremos un link para restablecer tu contraseña
          </p>
        </div>

        <Card className="rounded-[var(--radius-card)] border-border">
          <CardHeader>
            <CardTitle>Ingresá tu email</CardTitle>
            <CardDescription>
              Recibirás instrucciones para crear una nueva contraseña
            </CardDescription>
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

              <Button
                type="submit"
                className="w-full rounded-[var(--radius-button)]"
              >
                Enviar instrucciones
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
