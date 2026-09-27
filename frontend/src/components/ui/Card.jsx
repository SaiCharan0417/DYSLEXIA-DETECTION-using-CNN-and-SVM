import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../utils/cn';

export function Card({ children, className, elevation = 1, hoverable = false, ...props }) {
  const shouldReduceMotion = useReducedMotion();

  const elevations = {
    0: "bg-surface shadow-none",
    1: "bg-surface-container-lowest shadow-sm border border-surface-container-highest",
    2: "bg-surface-container-lowest shadow-md border border-surface-container-high",
  };

  const hoverMotion = hoverable && !shouldReduceMotion ? {
    whileHover: { transform: "translateY(-2px)" },
    transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] }
  } : {};

  return (
    <motion.div
      {...hoverMotion}
      className={cn(
        "rounded-xl overflow-hidden",
        elevations[elevation],
        hoverable && "transition-shadow hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}