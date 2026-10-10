import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Plane, ArrowRight, ShieldCheck, Zap, Compass, CheckCircle2 } from 'lucide-react';

export function HomePage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-mono mb-8">
        <Plane className="w-3.5 h-3.5" /> SkyDrop Phase 1 Architecture Active
      </div>

      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
        Delivery, above the city.
      </h1>

      <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
        Fast and reliable drone delivery for lightweight parcels in certified urban flight corridors.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link to="/customer/book">
          <Button size="lg" variant="primary" icon={ArrowRight}>
            Book a Delivery
          </Button>
        </Link>
        <Link to="/customer/track">
          <Button size="lg" variant="outline">
            Track a Delivery
          </Button>
        </Link>
        <Link to="/admin">
          <Button size="lg" variant="secondary">
            Operations Center →
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full text-left">
        <Card className="p-6">
          <Zap className="w-6 h-6 text-brand-400 mb-3" />
          <h3 className="text-base font-semibold text-white">Smart Drone Assignment</h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Automatic matching of parcel weight, cold-chain criteria, and battery cycle health.
          </p>
        </Card>

        <Card className="p-6">
          <Compass className="w-6 h-6 text-brand-400 mb-3" />
          <h3 className="text-base font-semibold text-white">Controlled Air Corridors</h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Strict vertical corridor limits (60m - 120m) with automatic no-fly zone avoidance.
          </p>
        </Card>

        <Card className="p-6">
          <ShieldCheck className="w-6 h-6 text-brand-400 mb-3" />
          <h3 className="text-base font-semibold text-white">Live Telemetry & Logs</h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Real-time altitude, airspeed, waypoint logging, and end-to-end auditability.
          </p>
        </Card>
      </div>
    </div>
  );
}

export function HowItWorksPage() {
  return (
    <div className="py-16 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white">How SkyDrop Works</h1>
        <p className="text-xs text-slate-400 mt-2">Editorial multi-step logistics overview</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { num: '01', title: 'Book', desc: 'Choose your destination and parcel specifications.' },
          { num: '02', title: 'Assign', desc: 'SkyDrop matches a compatible Cargo or Medical drone.' },
          { num: '03', title: 'Fly', desc: 'Drone navigates via certified altitude flight corridors.' },
          { num: '04', title: 'Deliver', desc: 'Tethered winch or drop pad precision delivery.' },
        ].map(step => (
          <Card key={step.num} className="p-6">
            <span className="font-mono text-2xl font-bold text-brand-400">{step.num}</span>
            <h3 className="text-base font-semibold text-white mt-2">{step.title}</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function TechnologyPage() {
  return (
    <div className="py-16 px-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-white text-center">Built for Intelligent Delivery</h1>
      <p className="text-xs text-slate-400 text-center mt-2 mb-12">
        Aviation-grade hardware, battery health analytics, and telemetry routing.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-white text-base">Pelican X1 Cargo Drone</h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Heavy-lift 5.0 kg payload with 28.5L volume enclosure and automated winch deployment.
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-white text-base">AeroViper M3 Rapid Medical</h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            High-speed 125 km/h transit with active cold-chain climate chamber (2°C to 8°C).
          </p>
        </Card>
      </div>
    </div>
  );
}

export function SolutionsPage() {
  return (
    <div className="py-16 px-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-white text-center">Logistics Solutions</h1>
      <p className="text-xs text-slate-400 text-center mt-2 mb-12">
        Serving e-commerce, healthcare emergency transit, and critical enterprise logistics.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-white text-sm">E-Commerce & Retail</h3>
          <p className="text-xs text-slate-400 mt-2">Sub-30 minute delivery for everyday consumer goods.</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-white text-sm">Healthcare & Cold-Chain</h3>
          <p className="text-xs text-slate-400 mt-2">Emergency blood, vaccine, and diagnostic specimen transport.</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-white text-sm">High-Value Enterprise</h3>
          <p className="text-xs text-slate-400 mt-2">Secure point-to-point transfer of mission-critical components.</p>
        </Card>
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="py-16 px-4 max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-white">About SkyDrop</h1>
      <p className="text-xs text-slate-400 mt-3 max-w-xl mx-auto leading-relaxed">
        SkyDrop is an intelligent drone-based last-mile logistics management system designed for 
        efficient, low-altitude urban aerial cargo routing in Chennai.
      </p>
    </div>
  );
}
