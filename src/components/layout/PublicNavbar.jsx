import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plane, ArrowUpRight, ShieldCheck, User } from 'lucide-react';
import { cn } from '../../lib/utils';

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 flex justify-between items-center px-6 sm:px-10 py-3.5 border-b border-slate-200/60 shadow-2xs">
      {/* Left: SkyDrop Logo */}
      <Link to="/" className="flex items-center gap-2.5 group">
        <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold tracking-tighter text-sm transition-transform duration-200 group-hover:scale-105 shadow-xs">
          <Plane className="w-4 h-4 text-sky-400 transform -rotate-12" />
        </div>
        <span className="text-xl font-black tracking-tight text-slate-900 font-sans">
          SKYDROP
        </span>
      </Link>

      {/* Right: Distinct Buttons: [How it Works] [Use Cases] [Customer Login] [Admin Access] */}
      <div className="hidden md:flex items-center gap-4">
        <Link
          to="/how-it-works"
          className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100/60 transition-colors"
        >
          How it Works
        </Link>
        <Link
          to="/solutions"
          className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100/60 transition-colors"
        >
          Use Cases
        </Link>
        <Link
          to="/login"
          className="text-xs font-bold text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
        >
          <User className="w-3.5 h-3.5 text-sky-600" />
          <span>Customer Login</span>
        </Link>
        <Link
          to="/admin"
          className="text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
          <span>Admin Access</span>
        </Link>
      </div>


      {/* Mobile Menu Toggle */}
      <div className="flex md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-700 hover:text-sky-900"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full border-b border-border bg-white px-8 pt-4 pb-6 space-y-3 shadow-xl md:hidden">
          <Link
            to="/how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-800 hover:text-sky-900 py-1.5"
          >
            How it Works
          </Link>
          <Link
            to="/solutions"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-800 hover:text-sky-900 py-1.5"
          >
            Use Cases
          </Link>
          <div className="pt-3 border-t border-border flex flex-col gap-2.5">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-sky-50 text-sm font-semibold text-sky-900 border border-sky-200"
            >
              Customer Login
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-sky-900 text-sm font-semibold text-white"
            >
              Admin Access
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
