"use client";

import { Upload, X } from "lucide-react";
import { useId, useState } from "react";

import { IconButton } from "@/components/ui/icon-button";

interface PhotoUploadFieldProps {
  label: string;
  images: string[];
  onChange: (images: string[]) => void;
}

const mockPhoto =
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop";

export function PhotoUploadField({
  label,
  images,
  onChange
}: PhotoUploadFieldProps) {
  const helperId = useId();
  const [announcement, setAnnouncement] = useState("");

  function addMockPhoto() {
    if (images.length >= 6) {
      setAnnouncement("Ya cargaste el máximo de 6 fotos.");
      return;
    }

    const nextImages = [...images, `${mockPhoto}&mock=${images.length + 1}`];
    onChange(nextImages);
    setAnnouncement(`Foto agregada. Hay ${nextImages.length} de 6 fotos cargadas.`);
  }

  function removePhoto(index: number) {
    const nextImages = images.filter((_, itemIndex) => itemIndex !== index);
    onChange(nextImages);
    setAnnouncement(`Foto ${index + 1} quitada. Hay ${nextImages.length} de 6 fotos cargadas.`);
  }

  return (
    <fieldset className="photo-field" aria-describedby={helperId}>
      <legend>{label}</legend>
      <p id={helperId} className="field-helper">
        Podés cargar hasta 6 fotos. En esta v1 se agregan imágenes mockeadas.
      </p>
      <div className="photo-grid">
        {images.map((image, index) => (
          <div key={image} className="photo-preview">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={`${label}, foto cargada ${index + 1}`} />
            <IconButton
              label={`Quitar foto ${index + 1}`}
              className="photo-preview__remove"
              onClick={() => removePhoto(index)}
            >
              <X aria-hidden="true" size={16} />
            </IconButton>
          </div>
        ))}

        {images.length < 6 ? (
          <button type="button" className="photo-add" onClick={addMockPhoto}>
            <Upload aria-hidden="true" size={22} />
            <span>Subir foto</span>
          </button>
        ) : null}
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </fieldset>
  );
}
