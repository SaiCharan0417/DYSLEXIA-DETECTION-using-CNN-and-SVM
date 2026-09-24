import React from 'react';
import { cn } from '../../utils/cn';

export function ProgressBar({ progress, variant = 'primary', className }) {
  const variants = {
    primary: "bg-secondary",
    error: "bg-error",
    tertiary: "bg-tertiary-container"
  };

  return (
    <div className={cn("w-full h-1.5 rounded-full bg-surface-container overflow-hidden", className)}>
      <div 
        className={cn("h-full rounded-full transition-all duration-500", variants[variant])} 
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }} 
      />
    </div>
  );
}
