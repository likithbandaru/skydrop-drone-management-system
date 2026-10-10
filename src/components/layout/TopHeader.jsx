import React from 'react';
import { Menu, Bell, Radio, Shield, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../ui/Badge';

export function TopHeader({ onToggleMobileMenu, portalTitle = 'Portal' }) {
  const { user, switchRole } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left / Mobile Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="p-2 -ml-2 text-slate-400 hover:text-white lg:hidden rounded-lg hover:bg-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
            {portalTitle}
          </span>
          <span className="text-slate-600">/</span>
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-mono text-emerald-400">Network Online</span>
          </div>
        </div>
      </div>

      {/* Right / Telemetry & User status */}
      <div className="flex items-center gap-3">
        {/* City Sector Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
          <Radio className="w-3 h-3 text-brand-400" />
          <span>Sector: Chennai Urban Corridor</span>
        </div>

        {/* Role Badge */}
        <Badge variant={isAdmin ? 'brand' : 'default'} className="font-mono text-[10px] uppercase">
          {isAdmin ? 'Flight Ops Admin' : 'Customer Account'}
        </Badge>
      </div>
    </header>
  );
}
