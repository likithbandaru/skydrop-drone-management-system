import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Package, 
  Users, 
  Plane, 
  Building2, 
  Compass, 
  Zap, 
  Route, 
  LogOut, 
  ChevronRight, 
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

export function AdminSidebar({ onCloseMobile }) {
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: Activity, exact: true },
    { name: 'Orders', path: '/admin/orders', icon: Package },
    { name: 'Fleet', path: '/admin/drones', icon: Plane },
    { name: 'Hubs', path: '/admin/hubs', icon: Building2 },
    { name: 'Corridors', path: '/admin/corridors', icon: Compass },
    { name: 'Battery Cycles', path: '/admin/battery-cycles', icon: Zap },
    { name: 'Waypoints', path: '/admin/waypoints', icon: Route },
  ];

  return (
    <aside className="w-64 bg-white text-slate-800 flex flex-col h-full shrink-0 border-r border-slate-200 shadow-xs">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100 bg-white">
        <NavLink to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs">
            <Plane className="h-4.5 w-4.5 text-sky-400 transform -rotate-12" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-slate-900 font-sans">SKYDROP</span>
            <span className="text-[10px] font-mono text-sky-600 font-semibold uppercase tracking-wider">Operations Control</span>
          </div>
        </NavLink>
      </div>

      {/* Main Nav Links: Dashboard, Orders, Fleet, Hubs, Corridors */}
      <div className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
          Command Portals
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group',
                isActive
                  ? 'bg-sky-50 text-sky-700 font-bold border border-sky-200/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={cn(
                    'w-4 h-4 transition-colors',
                    isActive ? 'text-sky-600' : 'text-slate-400 group-hover:text-slate-700'
                  )}
                />
                <span className="flex-1">{item.name}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-sky-600" />}
              </>
            )}
          </NavLink>
        ))}

        {/* Switch to Customer Portal */}
        <div className="pt-6 px-2">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <UserCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>Customer Portal</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
              Switch to Customer view to book parcels and monitor live tracking.
            </p>
            <button
              onClick={() => {
                switchRole('customer');
                navigate('/customer');
              }}
              className="w-full py-2 px-3 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Open Customer Portal →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin Controller Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'AD'}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Flight Operations Admin'}</p>
            <p className="text-[10px] text-sky-700 font-mono truncate font-semibold">{user?.email || 'Airspace Command Hub'}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          title="Logout"
          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}

