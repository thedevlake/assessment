import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <input
        className="w-full p-3 rounded-md border shadow-sm"
        placeholder="Search images (e.g., thank you, flowers, sunset)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
