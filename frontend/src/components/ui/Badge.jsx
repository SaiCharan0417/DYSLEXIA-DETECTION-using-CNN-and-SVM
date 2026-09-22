import React from 'react';
import { cn } from '../../utils/cn';

export function Badge({ children, variant = 'neutral', className, showDot = false }) {
  const variants = {
    normal: "bg-secondary-container/40 text-secondary border border-secondary/20",
    corrected: "bg-surface-container-highest text-on-surface border border-outline/20",
    reversal: "bg-error-container/60 text-error border border-error/20",
    ml: "bg-tertiary-fixed text-tertiary-container border border-tertiary-container/20",
    neutral: "bg-surface-container-low text-on-surface-variant border border-outline-variant/40"
  };

  const dotColors = {
    normal: "bg-secondary",
    corrected: "bg-outline",
    reversal: "bg-error",
    ml: "bg-tertiary-container",
    neutral: "bg-outline-variant"
  };

  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-mono", variants[variant], className)}>
      {showDot && <span className={cn("w-1.5 h-1.5 rounded-full", dotColors[variant])} />}
      {children}
    </span>
  );
}
