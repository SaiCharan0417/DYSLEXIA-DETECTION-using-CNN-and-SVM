import React from 'react';

export function Button({ children, onClick, type = "button", disabled, className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}