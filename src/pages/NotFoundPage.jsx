import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Compass } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="rounded-full bg-slate-900 border border-slate-800 p-4 text-brand-400 mb-4">
        <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '10s' }} />
      </div>
      <h1 className="text-4xl font-extrabold text-white font-mono">404</h1>
      <h2 className="text-base font-semibold text-slate-200 mt-2">Flight Waypoint Not Found</h2>
      <p className="text-xs text-slate-400 max-w-sm mt-1 mb-6">
        The requested airway sector or page does not exist in the SkyDrop flight corridor directory.
      </p>
      <Link to="/">
        <Button variant="primary" size="sm">
          Return to Navigation Base
        </Button>
      </Link>
    </div>
  );
}
