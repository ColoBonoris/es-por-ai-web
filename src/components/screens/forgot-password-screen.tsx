"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { TextField } from "@/components/forms/text-field";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";

export function ForgotPasswordScreen() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSubmitting(true);

    const result = await forgotPassword(email);

    if (result.error) {
      setError(result.error);
      setIsSubmitting(false);
      return;
    }

    setMessage("Listo. Si el correo existe, te enviamos instrucciones mockeadas.");
    setIsSubmitting(false);
  }

  return (
    <main id="main-content" className="auth-page" tabIndex={-1}>
      <section className="auth-panel" aria-labelledby="forgot-title">
        <div className="page-header">
          <h1 id="forgot-title">Recuperar contraseña</h1>
          <p>Ingresá tu email y simulamos el envío de instrucciones.</p>
        </div>

        <form className="auth-card" onSubmit={handleSubmit} noValidate>
          <TextField
            id="forgot-email"
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            isLoading={isSubmitting}
            loadingLabel="Enviando"
          >
            Enviar instrucciones
          </Button>
          <p className="status-message" role="status" aria-live="polite">
            {message}
          </p>
          <p className="field-error" role="alert">
            {error}
          </p>
        </form>

        <Link className="text-link" href="/login">
          Volver a iniciar sesión
        </Link>
      </section>
    </main>
  );
}
