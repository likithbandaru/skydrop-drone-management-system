import React from 'react';
import { cn } from '../../lib/utils';

export function Progress({ value = 0, max = 100, variant = 'brand', className, showLabel = false }) {
  const percentage = Math.min(Math.max(0, Math.round((value / max) * 100)), 100);

  const variants = {
    brand: 'bg-brand-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-rose-500',
    battery: percentage > 50 ? 'bg-emerald-500' : percentage > 25 ? 'bg-amber-500' : 'bg-rose-500',
  };

  return (
    <div className={cn('w-full flex flex-col gap-1.5', className)}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
          <span>Progress</span>
          <span className="font-semibold text-slate-200">{percentage}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800 border border-slate-800/80">
        <div
          className={cn('h-full transition-all duration-500 ease-out rounded-full', variants[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function Separator({ orientation = 'horizontal', className }) {
  return (
    <div
      className={cn(
        'shrink-0 bg-slate-800',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
    />
  );
}
