import React from 'react';

export function Input({ label, type = "text", value, onChange, placeholder, required }) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      {label && <label className="text-sm font-semibold">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-blue-500"
      />
    </div>
  );
}