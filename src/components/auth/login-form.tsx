"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useId, useState } from "react";

import { useAuth } from "@/providers/auth-provider";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailId = useId();
  const passwordId = useId();
  const errorId = useId();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("demo@esporai.dev");
  const [password, setPassword] = useState("Acceso123!");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const redirectTo = searchParams.get("redirectTo");

  const safeRedirect =
    redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
      ? redirectTo
      : "/dashboard";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const result = await signIn({ email, password });

    if (result.error) {
      setError(result.error);
      setIsSubmitting(false);
      return;
    }

    router.push(safeRedirect);
    router.refresh();
  }

  return (
    <form className="panel form-stack" onSubmit={handleSubmit} noValidate>
      <div className="form-intro">
        <p className="eyebrow">Acceso mock</p>
        <h1 className="section-title">Ingresar</h1>
        <p className="section-copy">
          El flujo usa una cookie de sesión mockeada, para que luego podamos cambiar la fuente de
          autenticación sin rehacer la estructura.
        </p>
      </div>

      <div className="field">
        <label htmlFor={emailId}>Correo electrónico</label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          aria-describedby={error ? errorId : undefined}
        />
      </div>

      <div className="field">
        <label htmlFor={passwordId}>Contraseña</label>
        <input
          id={passwordId}
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          aria-describedby={error ? errorId : undefined}
        />
      </div>

      <button type="submit" className="button button--primary" disabled={isSubmitting}>
        {isSubmitting ? "Ingresando…" : "Entrar al dashboard"}
      </button>

      <p className="helper-text">
        Credenciales demo: <strong>demo@esporai.dev</strong> / <strong>Acceso123!</strong>
      </p>

      <p id={errorId} className="form-message" aria-live="assertive">
        {error}
      </p>
    </form>
  );
}
