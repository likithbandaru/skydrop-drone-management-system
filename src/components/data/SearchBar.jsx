import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../form/Input';
import { cn } from '../../lib/utils';

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search by ID, serial, or name...',
  className,
}) {
  return (
    <div className={cn('relative w-full max-w-sm', className)}>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        icon={Search}
        rightIcon={value ? X : null}
        onRightIconClick={() => onChange('')}
      />
    </div>
  );
}

export function FilterBar({
  filters = [],
  activeFilter,
  onFilterChange,
  className,
}) {
  return (
    <div className={cn('flex flex-wrap items-center gap-1.5', className)}>
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;
        return (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all select-none',
              isActive
                ? 'bg-slate-800 text-brand-400 border border-brand-500/30 shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850 border border-transparent'
            )}
          >
            <span>{filter.label}</span>
            {filter.count !== undefined && (
              <span
                className={cn(
                  'px-1.5 py-0.2 rounded-full text-[10px] font-mono',
                  isActive ? 'bg-brand-500/20 text-brand-300' : 'bg-slate-800 text-slate-400'
                )}
              >
                {filter.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
