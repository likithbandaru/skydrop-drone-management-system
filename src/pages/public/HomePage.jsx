import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plane, 
  ArrowRight, 
  ArrowUpRight, 
  Navigation, 
  Zap, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Thermometer, 
  Box, 
  Activity, 
  MapPin, 
  Compass, 
  Cpu, 
  Wind,
  Layers,
  Sparkles,
  Package,
  Battery
} from 'lucide-react';

export function HomePage() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900 selection:bg-sky-500 selection:text-white font-sans">

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Exact Reference Target Layout & Background)                */}
      {/* ========================================================================= */}
      <section 
        className="relative w-full min-h-screen flex flex-col justify-between bg-cover bg-no-repeat pt-20 sm:pt-24 pb-6 sm:pb-8 px-6 sm:px-12 lg:px-16"
        style={{ 
          backgroundImage: "url('/assets/images/hero-drone-bg.jpg')", 
          backgroundPosition: "center right",
          backgroundSize: "cover"
        }}
      >
        {/* Hero Left Content Container */}
        <div className="relative z-10 max-w-2xl space-y-4 sm:space-y-5 my-auto pt-2 sm:pt-4">
          
          {/* Eyebrow Badge: "● SKYDROP LOGISTICS · Autonomous Urban Airspace Network" */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm text-xs font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-600 animate-pulse" />
            <span className="font-extrabold tracking-wide text-slate-900" style={{ color: '#090d16' }}>SKYDROP LOGISTICS</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600" style={{ color: '#475569' }}>Autonomous Urban Airspace Network</span>
          </div>

          {/* Main Headline: "Precision Delivery, From Above." */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05]" style={{ color: '#090d16' }}>
            Precision Delivery, <br />
            From <span style={{ color: '#0284c7' }}>Above.</span>
          </h1>

          {/* Subtitle / Description - Crisp White Typography with Subtle Shadow */}
          <p 
            className="text-white text-base sm:text-lg font-medium leading-relaxed max-w-xl" 
            style={{ color: '#ffffff', textShadow: '0 2px 6px rgba(0,0,0,0.7)' }}
          >
            Fast, sustainable, and reliable autonomous drone delivery for lightweight payloads. Bypassing road congestion through certified airspace corridors.
          </p>

          {/* Action Buttons: [Book a Delivery ↗] and [Track Shipment] */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <Link to="/customer/book">
              <button 
                className="w-full sm:w-auto bg-[#0369a1] hover:bg-[#025a8b] active:scale-95 text-white px-8 py-3.5 rounded-full font-bold text-sm sm:text-base shadow-lg shadow-sky-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                style={{ backgroundColor: '#0369a1', color: '#ffffff' }}
              >
                <span style={{ color: '#ffffff' }}>Book a Delivery</span>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" style={{ color: '#ffffff' }} />
              </button>
            </Link>
            <Link to="/customer/tracking">
              <button 
                className="w-full sm:w-auto bg-white hover:bg-slate-100 active:scale-95 px-8 py-3.5 rounded-full border border-slate-200 shadow-md transition-all text-sm sm:text-base cursor-pointer text-center"
                style={{ backgroundColor: '#ffffff', color: '#090d16' }}
              >
                <span className="font-extrabold" style={{ color: '#090d16' }}>
                  Track Shipment
                </span>
              </button>
            </Link>
          </div>


        </div>

        {/* Floating Bottom Stats Capsule Bar */}
        <div className="relative z-10 w-full pt-4 sm:pt-6">
          <div className="max-w-4xl bg-slate-950/70 backdrop-blur-md border border-white/20 text-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-0 md:divide-x md:divide-white/15">
            
            {/* Stat 1: FAA / DGCA Certified */}
            <div className="flex items-center gap-3 px-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-400/30">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-white font-mono">FAA / DGCA</div>
                <div className="text-[10px] sm:text-[11px] text-slate-300 font-medium">Certified Corridors</div>
              </div>
            </div>

            {/* Stat 2: < 15 Min Urban Radius */}
            <div className="flex items-center gap-3 px-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-400/30">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-white font-mono">&lt; 15 Min</div>
                <div className="text-[10px] sm:text-[11px] text-slate-300 font-medium">Urban Radius</div>
              </div>
            </div>

            {/* Stat 3: 100% Zero Emissions */}
            <div className="flex items-center gap-3 px-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30">
                <Zap className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-white font-mono">100%</div>
                <div className="text-[10px] sm:text-[11px] text-slate-300 font-medium">Zero Direct Emissions</div>
              </div>
            </div>

            {/* Stat 4: 99.9% Delivery Precision */}
            <div className="flex items-center gap-3 px-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-400/30">
                <Compass className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-white font-mono">99.9%</div>
                <div className="text-[10px] sm:text-[11px] text-slate-300 font-medium">Delivery Precision</div>
              </div>
            </div>

          </div>
        </div>

      </section>






      {/* ========================================================================= */}
      {/* 2. FLEET SPECIALIZATION (2-Column Grid with Custom Generated Images)      */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-600">
            Fleet Specialization
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
            Engineered For Precision
          </h2>
          <p className="text-base text-slate-600">
            Dedicated airframe architectures tailored for emergency medical biologicals and high-capacity cargo payloads.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1 (Medical) */}
          <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            {/* Image Container */}
            <div className="h-72 overflow-hidden relative bg-slate-900">
              <img
                src="/assets/images/medical-drone.jpg"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80';
                }}
                alt="Medical Rapid Drone in lab"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Gradient overlay at the bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              
              {/* Tag: "MEDICAL RAPID DRONE" (red) */}
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-full bg-rose-600 text-white text-xs font-black tracking-wider font-mono shadow-sm">
                  MEDICAL RAPID DRONE
                </span>
              </div>
              
              {/* Title inside bottom overlay */}
              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <div className="text-xs font-mono text-rose-300 font-bold uppercase tracking-wider">High Velocity Emergency Tier</div>
                <h3 className="text-2xl font-bold">Cold-Chain Emergency Transport</h3>
              </div>
            </div>

            {/* Description & 3 Small Stat Boxes */}
            <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Active thermal regulation chamber designed for rapid point-to-point transit of blood platelets, vaccines, anti-venom, and critical diagnostic pathology specimens.
              </p>

              {/* 3 Small Stat Boxes at the bottom with Bold High-Contrast Text */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-200 text-center">
                <div className="p-3 rounded-2xl bg-slate-100 border border-slate-200 shadow-2xs">
                  <span className="text-[10px] font-mono text-slate-500 font-bold block uppercase">Max Speed</span>
                  <span className="text-base font-bold text-slate-900 font-mono block mt-0.5">120 km/h</span>
                </div>
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 shadow-2xs">
                  <span className="text-[10px] font-mono text-rose-600 font-bold block uppercase">Temp Control</span>
                  <span className="text-base font-bold text-rose-700 font-mono block mt-0.5">2°C – 8°C</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-100 border border-slate-200 shadow-2xs">
                  <span className="text-[10px] font-mono text-slate-500 font-bold block uppercase">Payload</span>
                  <span className="text-base font-bold text-slate-900 font-mono block mt-0.5">2.5 kg</span>
                </div>
              </div>

              <Link to="/customer/book" className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors">
                <span>Book Medical Dispatch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2 (Cargo) */}
          <div className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            {/* Image Container */}
            <div className="h-72 overflow-hidden relative bg-slate-900">
              <img
                src="/assets/images/cargo-drone.jpg"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80';
                }}
                alt="Cargo Heavy Drone"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Gradient overlay at the bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              
              {/* Tag: "CARGO HEAVY DRONE" */}
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-full bg-slate-800 text-white text-xs font-black tracking-wider font-mono shadow-sm">
                  CARGO HEAVY DRONE
                </span>
              </div>

              {/* Title inside bottom overlay */}
              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <div className="text-xs font-mono text-sky-300 font-bold uppercase tracking-wider">Heavy Payload Tier</div>
                <h3 className="text-2xl font-bold">High-Capacity Urban Winch Delivery</h3>
              </div>
            </div>

            {/* Description & 3 Small Stat Boxes */}
            <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Optimized for multi-package consumer routing with motorized tether winch lowering, enabling contactless drop-offs without landing.
              </p>

              {/* 3 Small Stat Boxes at the bottom with Bold High-Contrast Text */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-200 text-center">
                <div className="p-3 rounded-2xl bg-slate-100 border border-slate-200 shadow-2xs">
                  <span className="text-[10px] font-mono text-slate-500 font-bold block uppercase">Payload</span>
                  <span className="text-base font-bold text-slate-900 font-mono block mt-0.5">5.0 kg</span>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-2xs">
                  <span className="text-[10px] font-mono text-emerald-700 font-bold block uppercase">Winch Lowering</span>
                  <span className="text-base font-bold text-emerald-800 font-mono block mt-0.5">15 m</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-100 border border-slate-200 shadow-2xs">
                  <span className="text-[10px] font-mono text-slate-500 font-bold block uppercase">Max Volume</span>
                  <span className="text-base font-bold text-slate-900 font-mono block mt-0.5">18,000 cm³</span>
                </div>
              </div>

              <Link to="/customer/book" className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors">
                <span>Book Cargo Delivery</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. HOW IT WORKS (4-Column Layout: 01 to 04 BOOK, ASSIGN, FLY, DELIVER)    */}
      {/* ========================================================================= */}
      <section className="py-24 bg-slate-50 border-y border-slate-200" id="how-it-works">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-sky-600 font-bold block mb-2">
                Automated Pipeline
              </span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950">
                How it Works
              </h2>
            </div>
            <p className="text-base text-slate-600 max-w-md mt-4 md:mt-0">
              Every parcel moves smoothly through our certified autonomous corridor network.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 01: BOOK */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6 group">
              <div>
                <div className="text-4xl font-black font-mono text-slate-300 group-hover:text-sky-600 transition-colors mb-4">
                  01
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">
                  BOOK
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Enter pickup hub and destination coordinates. Select payload category and cold-chain temperature profile.
                </p>
              </div>
              <div className="text-[11px] font-mono text-slate-500 pt-4 border-t border-slate-100 font-medium">
                Entity: DeliveryOrder
              </div>
            </div>

            {/* Step 02: ASSIGN */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6 group">
              <div>
                <div className="text-4xl font-black font-mono text-slate-300 group-hover:text-sky-600 transition-colors mb-4">
                  02
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">
                  ASSIGN
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  SkyDrop assigns an optimal airframe, validating battery cycle health, winch gear, and payload volume limits.
                </p>
              </div>
              <div className="text-[11px] font-mono text-slate-500 pt-4 border-t border-slate-100 font-medium">
                Entity: Drone Specialization
              </div>
            </div>

            {/* Step 03: FLY */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6 group">
              <div>
                <div className="text-4xl font-black font-mono text-slate-300 group-hover:text-sky-600 transition-colors mb-4">
                  03
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">
                  FLY
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The drone cruises within designated flight corridors at 60m–120m altitude, broadcasting continuous waypoint telemetry.
                </p>
              </div>
              <div className="text-[11px] font-mono text-slate-500 pt-4 border-t border-slate-100 font-medium">
                Entity: FlightCorridor
              </div>
            </div>

            {/* Step 04: DELIVER */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6 group">
              <div>
                <div className="text-4xl font-black font-mono text-slate-300 group-hover:text-sky-600 transition-colors mb-4">
                  04
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">
                  DELIVER
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The drone hovers safely above the drop zone. An automated tethered winch lowers your package with millimeter precision.
                </p>
              </div>
              <div className="text-[11px] font-mono text-slate-500 pt-4 border-t border-slate-100 font-medium">
                Entity: FlightWaypointLog
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FEATURE SPLIT SECTION (Left: Text & Checkmarks, Right: AI Generated)   */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-600 font-bold">
              Urban Air Mobility
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950 leading-[1.1]">
              Delivery without the road
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              SkyDrop bypasses traditional terrestrial logistics, slashing delivery times from hours to minutes while eliminating vehicle emissions.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Zero Traffic Interference</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Airways operate at 85–125 km/h unobstructed by surface congestion.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Sub-Meter Pinpoint Accuracy</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Automated hover winch system lowers parcels safely to backyards or pads.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Guaranteed Cold-Chain Integrity</h4>
                  <p className="text-xs text-slate-600 mt-0.5">MedicalRapidDrone models maintain active 2°C–8°C temperature control.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link to="/customer/tracking">
                <button className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors cursor-pointer">
                  <span>Explore Live Telemetry Map</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Image Container with High-Res AI Generated Drone Flight */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900">
              <img
                src="/assets/images/urban-flight.jpg"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80';
                }}
                alt="Drone in Flight over Urban Landscape"
                className="w-full h-[450px] sm:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Glassmorphic White Card on Bottom Right Corner */}
              <div className="absolute bottom-6 right-6 left-6 sm:left-auto sm:w-80 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-slate-200 text-slate-900 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700">
                      LIVE DELIVERY
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-md border border-sky-300">
                    IN TRANSIT
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 font-medium">Drone ID:</span>
                  <span className="font-bold text-slate-900">SD-D204</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-500 font-bold block font-mono">ETA</span>
                    <span className="text-sm font-bold text-slate-900 font-mono">12 min</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                    <span className="text-[10px] text-emerald-700 font-bold block font-mono">BATTERY</span>
                    <span className="text-sm font-bold text-emerald-800 font-mono">76%</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SOLUTIONS GRID (3-Column with High-Res AI Images)                      */}
      {/* ========================================================================= */}
      <section className="py-24 bg-slate-50 border-t border-slate-200" id="solutions">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-600 font-bold">
              Industries Served
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950">
              Logistics Solutions
            </h2>
            <p className="text-base text-slate-600">
              Engineered for commercial retailers, healthcare networks, and enterprise campuses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* 1. E-Commerce */}
            <div className="flex flex-col rounded-3xl border border-slate-200 overflow-hidden bg-white shadow-xs hover:shadow-lg transition-all">
              <div className="h-56 overflow-hidden relative bg-slate-900">
                <img
                  src="/assets/images/ecommerce-drone.jpg"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80';
                  }}
                  alt="E-Commerce Retail Parcel"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-slate-900 shadow-xs font-mono">
                    E-COMMERCE
                  </span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Everyday Purchases</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    Rapid dispatch for consumer electronics, retail items, accessories, and same-day priority purchases across city hubs.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <Link to="/customer/book" className="text-sm font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1.5">
                    <span>Book Retail Delivery</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* 2. Healthcare */}
            <div className="flex flex-col rounded-3xl border border-slate-200 overflow-hidden bg-white shadow-xs hover:shadow-lg transition-all">
              <div className="h-56 overflow-hidden relative bg-slate-900">
                <img
                  src="/assets/images/medical-drone.jpg"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d59b298f07?auto=format&fit=crop&w=600&q=80';
                  }}
                  alt="Healthcare Emergency Medical Supplies"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-rose-600 text-white text-xs font-bold shadow-xs font-mono">
                    HEALTHCARE
                  </span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Emergency Medical Transit</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    Cold-chain transportation of blood units, vaccines, anti-venom, and pathology lab diagnostics between hospitals and clinics.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <Link to="/customer/book" className="text-sm font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1.5">
                    <span>Book Medical Dispatch</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* 3. Business */}
            <div className="flex flex-col rounded-3xl border border-slate-200 overflow-hidden bg-white shadow-xs hover:shadow-lg transition-all">
              <div className="h-56 overflow-hidden relative bg-slate-900">
                <img
                  src="/assets/images/corporate-drone.jpg"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80';
                  }}
                  alt="Business Corporate Skyscraper Campus"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-slate-900 shadow-xs font-mono">
                    BUSINESS
                  </span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Corporate &amp; Document Courier</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    Confidential intra-city courier for contracts, legal deeds, blueprints, and critical spare parts between corporate campuses.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <Link to="/customer/book" className="text-sm font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1.5">
                    <span>Book Enterprise Courier</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CALL TO ACTION FOOTER BANNER (Clean Light Background & Dark Slate Button) */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-50 border-t border-slate-200 text-slate-900 text-center px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-4xl sm:text-5xl font-black font-sans text-slate-950 tracking-tight">
            Ready to send your delivery skyward?
          </h2>
          <p className="text-base text-slate-600 max-w-xl mx-auto font-normal">
            Access certified urban flight corridors in seconds with SkyDrop's autonomous delivery network.
          </p>
          <div className="pt-4 flex items-center justify-center gap-4">
            <Link to="/customer/book">
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold text-base shadow-md transition-all flex items-center gap-2 cursor-pointer">
                <span>Book a Delivery Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
}


