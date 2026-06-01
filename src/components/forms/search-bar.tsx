"use client";

import { Search } from "lucide-react";

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
  return (
    <div className="search-bar">
      <Search aria-hidden="true" className="search-bar__icon" />
      <label className="sr-only" htmlFor="global-search">
        {label}
      </label>
      <input
        id="global-search"
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
