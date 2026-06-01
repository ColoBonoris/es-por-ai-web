"use client";

import { Upload, X } from "lucide-react";

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
  function addMockPhoto() {
    if (images.length >= 6) {
      return;
    }

    onChange([...images, `${mockPhoto}&mock=${images.length + 1}`]);
  }

  return (
    <fieldset className="photo-field">
      <legend>{label}</legend>
      <div className="photo-grid">
        {images.map((image, index) => (
          <div key={image} className="photo-preview">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={`Foto cargada ${index + 1}`} />
            <IconButton
              label={`Quitar foto ${index + 1}`}
              className="photo-preview__remove"
              onClick={() => onChange(images.filter((_, itemIndex) => itemIndex !== index))}
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
    </fieldset>
  );
}
