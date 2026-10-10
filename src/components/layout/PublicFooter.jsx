import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, ArrowUpRight, ShieldCheck } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-900 py-12 px-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Left: Brand info */}
        <div className="space-y-2.5 max-w-md">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs transition-transform group-hover:scale-105">
              <Plane className="w-4 h-4 text-sky-400" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900 font-sans">
              SKYDROP
            </span>
          </Link>
          <p className="text-slate-600 text-xs leading-relaxed">
            Autonomous urban airspace drone delivery network for precision last-mile cargo and healthcare logistics.
          </p>
          <div className="text-[11px] text-slate-400 font-mono">
            © 2026 SkyDrop Logistics. All rights reserved.
          </div>
        </div>

        {/* Right: Quick Links */}
        <div className="flex flex-wrap gap-12 text-sm">
          <div className="space-y-2.5">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">Navigation</p>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li><Link to="/how-it-works" className="hover:text-slate-900 font-medium transition-colors">How it Works</Link></li>
              <li><Link to="/solutions" className="hover:text-slate-900 font-medium transition-colors">Use Cases</Link></li>
              <li><Link to="/technology" className="hover:text-slate-900 font-medium transition-colors">Technology</Link></li>
              <li><Link to="/about" className="hover:text-slate-900 font-medium transition-colors">About System</Link></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">Portals</p>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li><Link to="/login" className="hover:text-slate-900 font-medium transition-colors">Customer Login</Link></li>
              <li><Link to="/customer/book" className="hover:text-slate-900 font-medium transition-colors">Book Delivery</Link></li>
              <li><Link to="/customer" className="hover:text-slate-900 font-medium transition-colors">Active Tracking</Link></li>
              <li><Link to="/admin" className="hover:text-slate-900 font-medium transition-colors">Admin Operations</Link></li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
}

