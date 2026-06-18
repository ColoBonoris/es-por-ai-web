"use client";

import { Eye, EyeOff } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import { useId, useState } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
}

export function TextField({
  id,
  label,
  helperText,
  error,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const fieldId = id ?? generatedId;
  const helperId = helperText ? `${fieldId}-helper` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [ariaDescribedBy, helperId, errorId]
    .filter(Boolean)
    .join(" ") || undefined;
  const isPasswordField = props.type === "password";
  const inputType =
    isPasswordField && isPasswordVisible ? "text" : props.type;

  return (
    <div className="field">
      <label htmlFor={fieldId}>{label}</label>
      <div className={isPasswordField ? "field__input-wrap" : undefined}>
        <input
          id={fieldId}
          aria-describedby={describedBy}
          aria-invalid={error ? true : ariaInvalid}
          {...props}
          type={inputType}
        />
        {isPasswordField ? (
          <button
            className="field__visibility-toggle"
            type="button"
            aria-label={
              isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña"
            }
            onClick={() => setIsPasswordVisible((current) => !current)}
          >
            {isPasswordVisible ? (
              <EyeOff aria-hidden="true" size={18} />
            ) : (
              <Eye aria-hidden="true" size={18} />
            )}
          </button>
        ) : null}
      </div>
      {helperText ? (
        <p id={helperId} className="field-helper">
          {helperText}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
