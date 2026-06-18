"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { TextField } from "@/components/forms/text-field";
import { Button } from "@/components/ui/button";
import { FilterChip } from "@/components/ui/filter-chip";
import { metadataService } from "@/services/metadata-service";
import { useAuth } from "@/providers/auth-provider";
import type { AccessibilityFeature, FeatureDefinition } from "@/types/domain";

export function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const [features, setFeatures] = useState<FeatureDefinition[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preferences, setPreferences] = useState<AccessibilityFeature[]>([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    void metadataService.getAccessibilityFeatures().then(setFeatures);
  }, []);

  function togglePreference(feature: AccessibilityFeature) {
    setPreferences((current) =>
      current.includes(feature)
        ? current.filter((item) => item !== feature)
        : [...current, feature]
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await register({
      name,
      email,
      password,
      preferences: {
        accessibilityFeatures: preferences
      }
    });

    if (result.error) {
      setError(result.error);
      setIsSubmitting(false);
      return;
    }

    router.push("/permissions");
    router.refresh();
  }

  return (
    <main id="main-content" className="auth-page" tabIndex={-1}>
      <section className="auth-panel" aria-labelledby="register-title">
        <div className="page-header">
          <h1 id="register-title">Crear cuenta</h1>
          <p>Sumate a la comunidad y marcá preferencias para mejorar recomendaciones.</p>
        </div>

        <form className="auth-card" onSubmit={handleSubmit} noValidate>
          <TextField
            id="name"
            label="Nombre completo"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <TextField
            id="register-email"
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <TextField
            id="register-password"
            label="Contraseña"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <fieldset className="photo-field">
            <legend>Preferencias de recomendación</legend>
            <p className="field-helper">
              Opcional. Nos ayuda a ordenar recomendaciones útiles.
            </p>
            <div className="chip-row">
              {features.map((feature) => (
                <FilterChip
                  key={feature.id}
                  label={feature.label}
                  selected={preferences.includes(feature.id)}
                  onToggle={() => togglePreference(feature.id)}
                />
              ))}
            </div>
          </fieldset>

          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
          </Button>
          <p className="field-error" role="alert">
            {error}
          </p>
        </form>

        <p>
          ¿Ya tenés cuenta?{" "}
          <Link className="text-link" href="/login">
            Iniciar sesión
          </Link>
        </p>
      </section>
    </main>
  );
}
