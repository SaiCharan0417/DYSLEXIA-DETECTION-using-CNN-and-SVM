import React from 'react';
import { cn } from '../../utils/cn';

export function Card({ children, className, elevation = 1, ...props }) {
  const elevations = {
    0: "bg-surface shadow-none",
    1: "bg-surface-container-lowest shadow-sm border border-surface-container-highest",
    2: "bg-surface-container-lowest shadow-md",
  };
  
  return (
    <div className={cn("rounded-xl overflow-hidden", elevations[elevation], className)} {...props}>
      {children}
    </div>
  );
}
