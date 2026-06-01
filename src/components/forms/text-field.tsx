import type { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function TextField({ id, label, error, ...props }: TextFieldProps) {
  const errorId = error && id ? `${id}-error` : undefined;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} aria-describedby={errorId} aria-invalid={!!error} {...props} />
      {error ? (
        <p id={errorId} className="field-error" aria-live="polite">
          {error}
        </p>
      ) : null}
    </div>
  );
}
