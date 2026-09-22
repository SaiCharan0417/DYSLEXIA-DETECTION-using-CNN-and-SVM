import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export const Input = forwardRef(({ label, error, icon: Icon, className, containerClassName, ...props }, ref) => {
  return (
    <div className={cn("flex flex-col gap-1.5", containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-on-surface">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
            <Icon size={18} />
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full h-11 rounded-lg bg-surface-container-lowest text-on-surface text-sm placeholder:text-outline",
            "border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary",
            "outline-none shadow-sm transition-all duration-200",
            Icon ? "pl-10 pr-4" : "px-4",
            error && "border-error focus:border-error focus:ring-error",
            className
          )}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-error mt-0.5">{error}</span>}
    </div>
  );
});
Input.displayName = 'Input';
