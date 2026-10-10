import React from 'react';
import { cn } from '../../lib/utils';
import { PackageOpen, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';

export function EmptyState({
  icon: Icon = PackageOpen,
  title = 'No records found',
  description = 'There are currently no items matching your criteria.',
  actionLabel,
  onAction,
  className,
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-slate-800 bg-slate-900/40', className)}>
      <div className="rounded-full bg-slate-800/80 p-3 text-slate-400 mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-sm font-semibold text-slate-200">{title}</h4>
      <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4">{description}</p>
      {actionLabel && onAction && (
        <Button size="sm" variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function LoadingState({
  message = 'Loading operational telemetry...',
  className,
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-12 text-center', className)}>
      <Loader2 className="w-7 h-7 animate-spin text-brand-400 mb-3" />
      <p className="text-xs font-medium text-slate-400 animate-pulse">{message}</p>
    </div>
  );
}

export function ErrorState({
  title = 'Failed to load telemetry',
  message = 'An unexpected error occurred while communicating with the SkyDrop network.',
  onRetry,
  className,
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center rounded-xl border border-rose-900/40 bg-rose-950/10', className)}>
      <div className="rounded-full bg-rose-900/30 p-3 text-rose-400 mb-3">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h4 className="text-sm font-semibold text-rose-200">{title}</h4>
      <p className="text-xs text-rose-300/80 max-w-sm mt-1 mb-4">{message}</p>
      {onRetry && (
        <Button size="sm" variant="outline" onClick={onRetry} className="border-rose-800 text-rose-200 hover:bg-rose-900/30">
          Retry Operation
        </Button>
      )}
    </div>
  );
}
