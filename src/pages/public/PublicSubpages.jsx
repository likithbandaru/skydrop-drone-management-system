import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plane, 
  ArrowRight, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  Compass, 
  Clock, 
  CheckCircle2, 
  Thermometer, 
  Wind, 
  Navigation,
  Box,
  Cpu,
  MapPin
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

// =========================================================================
// HOW IT WORKS PAGE (Editorial Deep Dive)
// =========================================================================
export function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'BOOK & SPECIFY',
      tagline: 'Precision GPS Coordinates & Parcel Criteria',
      desc: 'Through the SkyDrop Customer Portal, choose your destination coordinates and parcel manifest. Specify package weight (up to 5.0 kg), fragile handling, or active cold-chain temperature thresholds.',
      eer: 'Mapped to: DeliveryOrder & Customer',
      image: '/assets/images/ecommerce-drone.jpg',
    },
    {
      num: '02',
      title: 'SMART ASSIGNMENT',
      tagline: 'Automated Airframe & Battery Health Check',
      desc: 'SkyDrop evaluates available fleet inventory across regional hubs (Central, Guindy, OMR, Porur). The engine assigns a heavy-lift Pelican X1 Cargo or rapid AeroViper M3 Medical drone after verifying healthy battery discharge cycles.',
      eer: 'Mapped to: Drone (Superclass) & DroneBatteryCycle',
      image: '/assets/images/drone-diagnostic.jpg',
    },
    {
      num: '03',
      title: 'CORRIDOR NAVIGATION',
      tagline: 'Controlled Altitude Bands (60m - 120m)',
      desc: 'The drone ascends into designated urban flight corridors. High-frequency telemetry streams real-time altitude, airspeed in knots, and coordinates while strictly avoiding civil aviation no-fly zones.',
      eer: 'Mapped to: FlightCorridor & FlightWaypointLog',
      image: '/assets/images/airspace-cartography.jpg',
    },
    {
      num: '04',
      title: 'PRECISION DROP',
      tagline: 'Zero-Contact Tether or Pad Delivery',
      desc: 'Upon arriving at the destination perimeter, the drone transitions into descent hold and lowers the package with sub-meter accuracy using an automated winch tether before returning to base.',
      eer: 'Mapped to: CargoDrone (Winch Mechanism) & Hub',
      image: '/assets/images/cargo-drone.jpg',
    },
  ];


  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white text-slate-900">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-xs font-mono uppercase tracking-widest text-sky-600 font-bold block mb-3">
          Autonomous Logistics Sequence
        </span>
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-950 font-sans">
          How SkyDrop works
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
          An engineering breakdown of our automated last-mile aerial logistics pipeline.
        </p>
      </div>

      {/* Step by Step Breakdown */}
      <div className="space-y-16">
        {steps.map((step, idx) => (
          <div
            key={step.num}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div className={`lg:col-span-6 space-y-4 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="flex items-center gap-4">
                <span className="text-5xl font-mono font-extrabold text-slate-950">{step.num}</span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">{step.title}</h2>
              <p className="text-xs font-mono uppercase tracking-wider text-sky-600 font-semibold">{step.tagline}</p>
              <p className="text-base text-slate-600 leading-relaxed font-normal">{step.desc}</p>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-mono border border-slate-200">
                  {step.eer}
                </span>
              </div>
            </div>

            <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl h-72 sm:h-84 relative group">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Bottom */}
      <div className="mt-24 p-12 rounded-3xl bg-slate-950 text-white text-center max-w-3xl mx-auto space-y-4">
        <h3 className="text-3xl font-extrabold text-white">Experience SkyDrop in action</h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Try booking a delivery with Chennai Central Hub to see the algorithm in action.
        </p>
        <div className="pt-2">
          <Link to="/customer/book">
            <button className="px-8 py-3.5 rounded-full bg-white text-slate-950 font-bold text-sm hover:bg-slate-100 transition-all inline-flex items-center gap-2">
              <span>Book a Demo Delivery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TECHNOLOGY PAGE (Hardware, Corridor & Telemetry Specs)
// =========================================================================
export function TechnologyPage() {
  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white text-slate-900">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-xs font-mono uppercase tracking-widest text-sky-600 font-bold block mb-3">
          Hardware & Fleet Architecture
        </span>
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-950 font-sans">
          Built for intelligent delivery
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
          Aviation-certified carbon-composite airframes, proprietary battery telemetry, and automated flight corridor management.
        </p>
      </div>

      {/* Fleet Specialization Comparison (Cargo vs Medical) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        {/* Pelican X1 Cargo Drone */}
        <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-10 space-y-6 flex flex-col justify-between hover:shadow-xl transition-all">
          <div>
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-800 font-mono text-xs font-bold">
                EER: CargoDrone Subclass
              </span>
              <span className="font-mono text-xs text-slate-500 font-semibold">MODEL SD-PEL-2026</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-950 mt-4">SkyDrop Pelican X1 Cargo</h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Engineered for high-throughput consumer package and retail logistics with automated winch lowering.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-200 text-xs">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-slate-400 font-mono block text-[10px] font-bold uppercase">PAYLOAD CAPACITY</span>
                <span className="text-xl font-extrabold font-mono text-slate-950 mt-1 block">5.0 kg</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-slate-400 font-mono block text-[10px] font-bold uppercase">INTERNAL VOLUME</span>
                <span className="text-xl font-extrabold font-mono text-slate-950 mt-1 block">28.5 Liters</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-slate-400 font-mono block text-[10px] font-bold uppercase">CRUISE AIRSPEED</span>
                <span className="text-xl font-extrabold font-mono text-slate-950 mt-1 block">85 km/h</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-slate-400 font-mono block text-[10px] font-bold uppercase">WINCH TETHER</span>
                <span className="text-xl font-extrabold font-mono text-emerald-600 mt-1 block">15m Auto-Lower</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between font-mono">
            <span>Propulsion: Hexacopter Coaxial</span>
            <span className="text-slate-900 font-bold">Carbon-Aero Airframe</span>
          </div>
        </div>

        {/* AeroViper M3 Medical Rapid Drone */}
        <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-10 space-y-6 flex flex-col justify-between hover:shadow-xl transition-all">
          <div>
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-mono text-xs font-bold">
                EER: MedicalRapidDrone Subclass
              </span>
              <span className="font-mono text-xs text-slate-500 font-semibold">MODEL SD-VIP-2026</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-950 mt-4">AeroViper M3 Rapid Medical</h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              High-speed aerodynamic airframe with active thermoelectric cold-chain chamber for vaccines and emergency blood units.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-200 text-xs">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-slate-400 font-mono block text-[10px] font-bold uppercase">CLIMATE CHAMBER</span>
                <span className="text-xl font-extrabold font-mono text-rose-600 mt-1 block">2.0°C to 8.0°C</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-slate-400 font-mono block text-[10px] font-bold uppercase">MAX DASH SPEED</span>
                <span className="text-xl font-extrabold font-mono text-slate-950 mt-1 block">125 km/h</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-slate-400 font-mono block text-[10px] font-bold uppercase">PAYLOAD CAPACITY</span>
                <span className="text-xl font-extrabold font-mono text-slate-950 mt-1 block">3.5 kg</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-slate-400 font-mono block text-[10px] font-bold uppercase">CERTIFICATION</span>
                <span className="text-xl font-extrabold font-mono text-emerald-600 mt-1 block">Cold-Chain ISO</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between font-mono">
            <span>Propulsion: Quad-Tiltrotor High-Velocity</span>
            <span className="text-rose-600 font-bold">Emergency Medical Spec</span>
          </div>
        </div>
      </div>

      {/* Airway Corridor Specs */}
      <div className="p-10 rounded-3xl bg-slate-950 text-white space-y-6">
        <h3 className="text-2xl font-bold text-white">Urban Air Corridor Architecture (EER: FlightCorridor)</h3>
        <p className="text-sm text-slate-400 leading-relaxed max-w-3xl font-light">
          SkyDrop operates exclusively in dedicated 3D altitude channels between 60m and 120m Above Ground Level (AGL).
          Automatic collision avoidance and real-time geofenced exclusion buffers ensure absolute civil safety over Chennai's urban airspace.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-sky-400 font-mono text-base font-bold block mb-1">60m Minimum</span>
            <p className="text-xs text-slate-300">Clearance over tallest residential structures and tree canopies.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-sky-400 font-mono text-base font-bold block mb-1">120m Maximum</span>
            <p className="text-xs text-slate-300">Mandatory ceiling buffer below commercial manned civil airspace.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-rose-400 font-mono text-base font-bold block mb-1">Airport Geofence</span>
            <p className="text-xs text-slate-300">Zero-flight buffer zone around Meenambakkam Aviation perimeter.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// SOLUTIONS PAGE (Use-Cases: E-Commerce, Healthcare, Business)
// =========================================================================
export function SolutionsPage() {
  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white text-slate-900">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-xs font-mono uppercase tracking-widest text-sky-600 font-bold block mb-3">
          Commercial Capabilities
        </span>
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-950 font-sans">
          Solutions for modern logistics
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
          Eliminating friction in last-mile parcel distribution across Chennai's key commercial sectors.
        </p>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
            <Box className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-950">E-Commerce & Retail</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Deliver consumer orders within 15 minutes of checkout. Eliminate warehouse-to-door ground traffic delays for smartphones, tablets, cables, and apparel items.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
            <Thermometer className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-950">Healthcare & Cold-Chain</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Rapid transfer of laboratory specimens, pathology diagnostics, blood units, and temperature-controlled medical essentials across hospitals and clinics.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-200 text-slate-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-950">High-Value Enterprise</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Point-to-point secure transfer of micro-electronics, critical engineering prototypes, legal contracts, and corporate documents between tech corridors.
          </p>
        </div>
      </div>

      <div className="text-center">
        <Link to="/customer/book">
          <button className="px-10 py-4 rounded-full bg-slate-950 text-white font-bold text-sm hover:bg-slate-800 transition-all inline-flex items-center gap-2 shadow-lg">
            <span>Start Booking with SkyDrop</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </div>
  );
}

// =========================================================================
// ABOUT PAGE (Project Vision & Indian Urban Context)
// =========================================================================
export function AboutPage() {
  return (
    <div className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-white text-slate-900">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-sky-600 font-bold block mb-3">
          About SkyDrop
        </span>
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-950 font-sans">
          Intelligent Last-Mile Logistics
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
          A full-stack, DBMS-integrated autonomous drone delivery management platform built for modern urban transit.
        </p>
      </div>

      <div className="space-y-8 text-slate-700 leading-relaxed">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
          <h2 className="text-2xl font-bold text-slate-950">Project Vision & Academic Context</h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            SkyDrop is built as a comprehensive 3rd-year Computer Science semester DBMS and full-stack project. It combines a polished, editorial public presence with an operationally realistic database model that governs customer bookings, drone flight status state machines, hub docking capacity, flight corridor safety rules, and high-frequency waypoint logging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="text-lg font-bold text-slate-950">Chennai Urban Corridor Focus</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Designed around real Chennai logistics landmarks including Chennai Central Distribution Hub, OMR Cyber Corridor, Guindy Industrial Hub, and Anna Nagar transit sectors.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="text-lg font-bold text-slate-950">EER Database Integrity</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Strict compliance with the approved EER schema: Strong entities (Customer, Hub, FlightCorridor, Drone, DeliveryOrder) and Weak entities (DroneBatteryCycle, FlightWaypointLog).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
