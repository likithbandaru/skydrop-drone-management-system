import React from 'react';
import { Battery, BatteryCharging, BatteryLow, BatteryMedium, BatteryWarning } from 'lucide-react';
import { cn } from '../../lib/utils';

export function BatteryIndicator({
  level = 100,
  isCharging = false,
  showValue = true,
  size = 'md',
  className,
}) {
  const normalized = Math.min(Math.max(0, level), 100);

  const getTier = () => {
    if (normalized > 60) return { color: 'text-emerald-400', bg: 'bg-emerald-500', border: 'border-emerald-500/30' };
    if (normalized > 25) return { color: 'text-amber-400', bg: 'bg-amber-500', border: 'border-amber-500/30' };
    return { color: 'text-rose-400', bg: 'bg-rose-500', border: 'border-rose-500/30' };
  };

  const tier = getTier();

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <div className="relative flex items-center">
        {isCharging ? (
          <BatteryCharging className={cn('w-4 h-4 text-amber-400 animate-pulse')} />
        ) : normalized > 75 ? (
          <Battery className={cn('w-4 h-4', tier.color)} />
        ) : normalized > 30 ? (
          <BatteryMedium className={cn('w-4 h-4', tier.color)} />
        ) : normalized > 15 ? (
          <BatteryLow className={cn('w-4 h-4', tier.color)} />
        ) : (
          <BatteryWarning className={cn('w-4 h-4 text-rose-500 animate-bounce')} />
        )}
      </div>

      <div className="w-12 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/60 flex items-center">
        <div
          className={cn('h-full transition-all duration-300 rounded-full', tier.bg)}
          style={{ width: `${normalized}%` }}
        />
      </div>

      {showValue && (
        <span className={cn('font-mono text-xs font-semibold', tier.color)}>
          {normalized}%
        </span>
      )}
    </div>
  );
}

export function DroneTypeBadge({ type, winchEquipped, tempControlled, className }) {
  if (type === 'MEDICAL_RAPID' || tempControlled) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-rose-500/10 text-rose-300 border border-rose-500/25',
          className
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
        Medical Rapid
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-sky-500/10 text-sky-300 border border-sky-500/25',
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
      Cargo Heavy
      {winchEquipped && <span className="text-[10px] text-sky-400/80 font-normal">· Winch</span>}
    </span>
  );
}
