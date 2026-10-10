import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { useAuth } from '../../context/AuthContext';
import { Plane, Plus, User, LogOut, ShieldCheck } from 'lucide-react';

export function CustomerLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="bg-base min-h-screen flex flex-col text-slate-900 font-sans">
      {/* Customer Top Nav: bg-surface border-b border-border h-16 flex items-center px-6 */}
      <header className="bg-surface border-b border-border h-16 flex items-center justify-between px-6 sticky top-0 z-40 shadow-xs">
        {/* Left: Brand Logo & Navigation */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-sky-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <Plane className="w-4 h-4 text-sky-400" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-sky-900 font-sans">
              SKYDROP
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-4 text-xs font-semibold">
            <Link
              to="/customer"
              className="px-3 py-1.5 rounded-lg bg-sky-50 text-sky-900 border border-sky-200 transition-colors"
            >
              Active Tracking & Dashboard
            </Link>
            <Link
              to="/customer/orders"
              className="px-3 py-1.5 text-slate-600 hover:text-sky-900 transition-colors"
            >
              Order History
            </Link>
            <Link
              to="/customer/track"
              className="px-3 py-1.5 text-slate-600 hover:text-sky-900 transition-colors"
            >
              Airway Cartography
            </Link>
          </nav>
        </div>

        {/* Right: Actions (Profile, New Order button, Logout) */}
        <div className="flex items-center gap-3">
          <Link
            to="/customer/book"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sky-500 text-white text-xs font-semibold hover:bg-sky-600 transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Order</span>
          </Link>

          <Link
            to="/customer/profile"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-base hover:bg-slate-100 text-xs font-medium text-slate-700 transition"
          >
            <User className="w-3.5 h-3.5 text-sky-500" />
            <span className="hidden sm:inline">{user?.name || 'Customer'}</span>
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-rose-600 transition"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

export function AdminLayout() {
  return (
    <div className="flex h-screen bg-base overflow-hidden text-slate-900 font-sans">
      {/* Sidebar (Left): w-64 bg-sky-900 text-white flex flex-col */}
      <AdminSidebar />

      {/* Main Content Area (Right): flex-1 flex flex-col overflow-y-auto p-8 */}
      <main className="flex-1 flex flex-col overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
