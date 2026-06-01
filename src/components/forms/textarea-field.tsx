import type { TextareaHTMLAttributes } from "react";

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
}

export function TextareaField({
  id,
  label,
  helperText,
  ...props
}: TextareaFieldProps) {
  const helperId = helperText && id ? `${id}-helper` : undefined;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} aria-describedby={helperId} {...props} />
      {helperText ? (
        <p id={helperId} className="field-helper">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
