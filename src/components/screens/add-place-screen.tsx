"use client";

import { FormEvent, useState } from "react";

import { PhotoUploadField } from "@/components/forms/photo-upload-field";
import { TextField } from "@/components/forms/text-field";
import { TextareaField } from "@/components/forms/textarea-field";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FilterChip } from "@/components/ui/filter-chip";
import { placeService } from "@/services/place-service";
import type { AccessibilityFeature } from "@/types/domain";

export function AddPlaceScreen() {
  const categories = placeService.getCategories();
  const features = placeService.getAccessibilityFeatures();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<AccessibilityFeature[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function toggleFeature(feature: AccessibilityFeature) {
    setSelectedFeatures((current) =>
      current.includes(feature)
        ? current.filter((item) => item !== feature)
        : [...current, feature]
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setHasTriedSubmit(true);

    if (!name.trim() || !address.trim() || !category) {
      setError("Completá nombre, dirección y categoría para enviar el lugar.");
      return;
    }

    setIsSubmitting(true);

    try {
      const submission = await placeService.submitPlace({
        name,
        address,
        category,
        description,
        badges: selectedFeatures,
        images
      });
      setMessage(`"${submission.name}" quedó pendiente de aprobación.`);
      setName("");
      setAddress("");
      setCategory("");
      setDescription("");
      setSelectedFeatures([]);
      setImages([]);
      setHasTriedSubmit(false);
    } catch {
      setError("No se pudo enviar el lugar. Probá nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const nameError = hasTriedSubmit && !name.trim()
    ? "Ingresá el nombre del lugar."
    : undefined;
  const addressError = hasTriedSubmit && !address.trim()
    ? "Ingresá la dirección."
    : undefined;
  const categoryError = hasTriedSubmit && !category
    ? "Elegí una categoría."
    : undefined;

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="badge badge--accent">Comunidad</p>
        <h1>Agregar lugar</h1>
        <p>Los lugares nuevos se guardan como pendientes de aprobación.</p>
      </header>

      <Badge variant="accent">
        Verificado solo puede ser asignado por administración.
      </Badge>

      <form className="form-page" onSubmit={handleSubmit} noValidate>
        <section className="form-section" aria-labelledby="place-basic-title">
          <h2 id="place-basic-title">Información básica</h2>
          <div className="form-grid">
            <TextField
              id="place-name"
              label="Nombre del lugar"
              error={nameError}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <TextField
              id="place-address"
              label="Dirección"
              error={addressError}
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
            />
          </div>
          <fieldset
            className="photo-field"
            aria-describedby={categoryError ? "place-category-error" : undefined}
            aria-invalid={categoryError ? true : undefined}
          >
            <legend>Categoría</legend>
            <div className="chip-row">
              {categories.map((item) => (
                <label
                  key={item}
                  className={`filter-chip choice-chip ${
                    category === item ? "filter-chip--selected" : ""
                  }`}
                >
                  <input
                    className="choice-chip__input sr-only"
                    type="radio"
                    name="place-category"
                    value={item}
                    checked={category === item}
                    onChange={() => setCategory(item)}
                    required
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
            {categoryError ? (
              <p id="place-category-error" className="field-error" role="alert">
                {categoryError}
              </p>
            ) : null}
          </fieldset>
        </section>

        <section className="form-section" aria-labelledby="place-description-title">
          <h2 id="place-description-title">Descripción</h2>
          <TextareaField
            id="place-description"
            label="Descripción breve"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </section>

        <section className="form-section" aria-labelledby="place-accessibility-title">
          <h2 id="place-accessibility-title">Características</h2>
          <div className="chip-row">
            {features.map((feature) => (
              <FilterChip
                key={feature.id}
                label={feature.label}
                selected={selectedFeatures.includes(feature.id)}
                onToggle={() => toggleFeature(feature.id)}
              />
            ))}
          </div>
        </section>

        <section className="form-section" aria-labelledby="place-photos-title">
          <h2 id="place-photos-title">Fotos</h2>
          <PhotoUploadField label="Fotos del lugar" images={images} onChange={setImages} />
        </section>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar para aprobación"}
        </Button>
        <p className="status-message" role="status" aria-live="polite">
          {message}
        </p>
        <p className="field-error" role="alert">
          {error}
        </p>
      </form>
    </div>
  );
}
