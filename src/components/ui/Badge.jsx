import React from 'react';
import { cn } from '../../lib/utils';

export function Badge({
  className,
  variant = 'default',
  children,
  ...props
}) {
  const variants = {
    default: 'bg-slate-100 text-slate-800 border-slate-200 font-semibold',
    secondary: 'bg-slate-50 text-slate-600 border-slate-200 font-medium',
    outline: 'border border-slate-300 text-slate-700 bg-white font-medium',
    brand: 'bg-sky-50 text-sky-700 border-sky-200 font-bold font-mono',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold font-mono',
    warning: 'bg-amber-50 text-amber-800 border-amber-200 font-bold font-mono',
    error: 'bg-rose-50 text-rose-700 border-rose-200 font-bold font-mono',
    info: 'bg-sky-50 text-sky-700 border-sky-200 font-bold font-mono',
  };


  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors select-none',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}


