import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../utils/cn';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  isLoading,
  icon: Icon,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-lg font-medium shadow-sm disabled:opacity-70 disabled:pointer-events-none cursor-pointer select-none transition-colors duration-150";

  const variants = {
    primary: "bg-primary text-on-primary hover:bg-primary-container",
    secondary: "bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container-low",
    accent: "bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container",
    ghost: "bg-transparent text-on-surface-variant hover:bg-surface-container hover:text-on-surface shadow-none"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <motion.button
      whileHover={shouldReduceMotion ? {} : { transform: "translateY(-1px)" }}
      whileTap={shouldReduceMotion ? {} : { transform: "scale(0.98)" }}
      transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!isLoading && Icon && <Icon size={18} />}
      {children}
    </motion.button>
  );
}