import React from 'react';

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white border border-gray-200 p-4 rounded shadow-sm ${className}`}>
      {children}
    </div>
  );
}