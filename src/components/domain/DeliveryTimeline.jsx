import React from 'react';
import { cn } from '../../lib/utils';
import { Check, Circle, Navigation, Clock, PackageCheck } from 'lucide-react';

export function DeliveryTimeline({ currentStatus = 'IN_TRANSIT', className }) {
  const steps = [
    { key: 'CONFIRMED', label: 'Order Confirmed', description: 'Manifest validated' },
    { key: 'ASSIGNED', label: 'Drone Assigned', description: 'Pre-flight check passed' },
    { key: 'DEPARTED', label: 'Departed Hub', description: 'Corridor clearance granted' },
    { key: 'IN_TRANSIT', label: 'In Transit', description: 'Cruising in designated airway' },
    { key: 'APPROACHING', label: 'Approaching Destination', description: 'Descent vector initiated' },
    { key: 'DELIVERED', label: 'Delivered', description: 'Package successfully dropped' },
  ];

  const getStepIndex = (status) => {
    switch (String(status).toUpperCase()) {
      case 'PENDING': return 0;
      case 'ASSIGNED': return 1;
      case 'DEPARTED': return 2;
      case 'IN_TRANSIT':
      case 'IN TRANSIT': return 3;
      case 'APPROACHING': return 4;
      case 'DELIVERED': return 5;
      default: return 3;
    }
  };

  const currentIndex = getStepIndex(currentStatus);

  return (
    <div className={cn('w-full py-2', className)}>
      <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
        {steps.map((step, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isPending = idx > currentIndex;

          return (
            <div key={step.key} className="relative flex items-start group">
              {/* Dot / Indicator */}
              <div
                className={cn(
                  'absolute -left-6 top-0.5 flex h-6 w-6 items-center justify-center rounded-full text-xs transition-all z-10',
                  isDone && 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40',
                  isCurrent && 'bg-brand-500 text-white shadow-glow-cyan ring-4 ring-brand-500/20',
                  isPending && 'bg-slate-900 text-slate-600 border border-slate-800'
                )}
              >
                {isDone ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : isCurrent ? (
                  <Navigation className="w-3.5 h-3.5 animate-pulse" />
                ) : (
                  <Circle className="w-2 h-2 fill-current" />
                )}
              </div>

              {/* Text */}
              <div className="ml-3">
                <p
                  className={cn(
                    'text-xs font-semibold',
                    isCurrent && 'text-brand-300 font-bold',
                    isDone && 'text-slate-200',
                    isPending && 'text-slate-500'
                  )}
                >
                  {step.label}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
