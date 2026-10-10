import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Breadcrumb({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-2 font-medium">
      <Link to="/" className="hover:text-slate-800 transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5 text-slate-400" />
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={item.label || idx}>
          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
          {item.path ? (
            <Link to={item.path} className="hover:text-slate-800 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-800 font-semibold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export function PageHeader({
  title,
  subtitle,
  badge,
  actions,
  breadcrumbs,
  className,
}) {
  return (
    <div className={cn('flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200', className)}>
      <div>
        {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">{title}</h1>
          {badge}
        </div>
        {subtitle && <p className="text-xs text-slate-600 mt-1 font-normal">{subtitle}</p>}
      </div>

      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  );
}



