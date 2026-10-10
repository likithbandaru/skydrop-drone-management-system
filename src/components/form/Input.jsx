import React from 'react';
import { cn } from '../../lib/utils';

export const Input = React.forwardRef(({
  className,
  type = 'text',
  error,
  icon: Icon,
  rightIcon: RightIcon,
  onRightIconClick,
  ...props
}, ref) => {
  return (
    <div className="relative flex items-center w-full">
      {Icon && (
        <div className="absolute left-3.5 pointer-events-none text-slate-400 flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </div>
      )}
      <input
        type={type}
        ref={ref}
        className={cn(
          'flex h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-900 placeholder:text-slate-400 transition-all focus-visible:outline-none focus-visible:border-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900/20 disabled:cursor-not-allowed disabled:opacity-50 shadow-2xs',
          Icon && 'pl-10',
          RightIcon && 'pr-10',
          error && 'border-rose-500 focus-visible:border-rose-500 focus-visible:ring-rose-500/20',
          className
        )}
        {...props}
      />
      {RightIcon && (
        <button
          type="button"
          onClick={onRightIconClick}
          className="absolute right-3.5 text-slate-400 hover:text-slate-700 transition-colors p-0.5 cursor-pointer"
        >
          <RightIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export function Select({
  className,
  options = [],
  placeholder = 'Select an option',
  error,
  ...props
}) {
  return (
    <select
      className={cn(
        'flex h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-900 transition-all focus-visible:outline-none focus-visible:border-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900/20 disabled:cursor-not-allowed disabled:opacity-50 shadow-2xs',
        error && 'border-rose-500 focus-visible:border-rose-500 focus-visible:ring-rose-500/20',
        className
      )}
      {...props}
    >
      {placeholder && <option value="" className="text-slate-400">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="text-slate-900">
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function Checkbox({ id, label, description, checked, onChange, disabled, className }) {
  return (
    <div className={cn('flex items-start space-x-2.5', className)}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
        className="h-4 w-4 rounded border-slate-300 bg-white text-slate-900 focus:ring-slate-900 focus:ring-offset-white mt-0.5"
      />
      {(label || description) && (
        <label htmlFor={id} className="text-xs select-none cursor-pointer">
          {label && <span className="font-semibold text-slate-800 block">{label}</span>}
          {description && <span className="text-slate-500 block mt-0.5">{description}</span>}
        </label>
      )}
    </div>
  );
}

