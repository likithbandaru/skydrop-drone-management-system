import React from 'react';
import { Card } from '../ui/Card';
import { cn } from '../../lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendType = 'up', // 'up' | 'down' | 'neutral'
  badge,
  className,
}) {
  return (
    <Card className={cn('p-5 flex flex-col justify-between hover:border-slate-300 shadow-xs transition-all bg-white border-slate-200', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
          {title}
        </span>
        {Icon && (
          <div className="rounded-xl bg-sky-50 p-2.5 text-sky-600 border border-sky-100">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className="text-2xl font-black tracking-tight text-slate-900 font-mono">
          {value}
        </div>
        {badge}
      </div>

      {(subtitle || trend) && (
        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-600">
          {trend && (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 font-bold',
                trendType === 'up' && 'text-emerald-700',
                trendType === 'down' && 'text-rose-700',
                trendType === 'neutral' && 'text-slate-600'
              )}
            >
              {trendType === 'up' ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : trendType === 'down' ? (
                <TrendingDown className="w-3.5 h-3.5" />
              ) : null}
              {trend}
            </span>
          )}
          {subtitle && <span>{subtitle}</span>}
        </div>
      )}
    </Card>
  );
}



