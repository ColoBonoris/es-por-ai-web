"use client";

import { Search } from "lucide-react";
import { useId } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Buscar lugares...",
  label = "Buscar"
}: SearchBarProps) {
  const inputId = useId();

  return (
    <div className="search-bar">
      <Search aria-hidden="true" className="search-bar__icon" />
      <label className="sr-only" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
