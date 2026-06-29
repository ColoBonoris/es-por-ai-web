"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

import { BrandLogo } from "@/components/app/brand-logo";
import { TextField } from "@/components/forms/text-field";
import { resolvePostLoginRoute } from "@/lib/auth/routes";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";

export function LoginScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("demo@esporai.dev");
  const [password, setPassword] = useState("Acceso123!");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const redirectTo = searchParams.get("redirectTo");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await signIn({ email, password });

    if (result.error) {
      setError(result.error);
      setIsSubmitting(false);
      return;
    }

    router.push(result.user ? resolvePostLoginRoute(result.user, redirectTo) : "/home");
    router.refresh();
  }

  return (
    <main id="main-content" className="auth-page" tabIndex={-1}>
      <section className="auth-panel" aria-labelledby="login-title">
        <BrandLogo className="auth-logo" showWordmark />
        <div className="page-header">
          <h1 id="login-title">Bienvenido</h1>
          <p>Ingresá a tu cuenta para continuar explorando lugares.</p>
        </div>

        <form className="auth-card" onSubmit={handleSubmit} noValidate>
          <TextField
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <TextField
            id="password"
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <div className="auth-links">
            <Link className="text-link" href="/forgot-password">
              ¿Olvidaste tu contraseña?
            </Link>
            <Link className="text-link" href="/register">
              Crear cuenta
            </Link>
          </div>

          <Button
            type="submit"
            fullWidth
            isLoading={isSubmitting}
            loadingLabel="Ingresando"
          >
            Iniciar sesión
          </Button>
          <p className="field-helper">
            Cleinte demo: <strong>demo@esporai.dev</strong> / <strong>Acceso123!</strong>
          </p>
          <p className="field-helper">
            Admin demo: <strong>admin@esporai.dev</strong> / <strong>Acceso123!</strong>
          </p>
          <p className="field-error" role="alert">
            {error}
          </p>
        </form>
      </section>
    </main>
  );
}
