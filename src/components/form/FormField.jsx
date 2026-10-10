import React from 'react';
import { cn } from '../../lib/utils';

export function FormField({
  label,
  error,
  helperText,
  required,
  children,
  className,
  id,
}) {
  return (
    <div className={cn('flex flex-col space-y-1.5 text-left', className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-bold text-slate-700 flex items-center justify-between"
        >
          <span>
            {label}
            {required && <span className="text-rose-500 ml-1 font-bold">*</span>}
          </span>
        </label>
      )}
      {children}
      {error ? (
        <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-slate-500 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
}

