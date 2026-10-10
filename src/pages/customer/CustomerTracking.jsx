import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Navigation, 
  Plane, 
  MapPin, 
  CheckCircle2, 
  ArrowLeft,
  Gauge,
  ArrowUp,
  Battery,
  Clock,
  ShieldCheck,
  Building2,
  Activity,
  Layers,
  Radio,
  User,
  LogOut,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Zap,
  Check,
  Target
} from 'lucide-react';
import { MapView } from '../../components/map/MapView';
import { orderService } from '../../services/orderService';
import { ALL_HUBS, generateFlightRoute } from '../../lib/routeUtils';

export function CustomerTracking() {
  const [activeOrder, setActiveOrder] = useState(null);
  const [progress, setProgress] = useState(0.35); // 0 to 1
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1); // 1x, 2x, 5x
  const [isDelivered, setIsDelivered] = useState(false);
  const [shouldFocusDrone, setShouldFocusDrone] = useState(false);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(null);

  // Load active order on mount
  useEffect(() => {
    orderService.getActiveOrder().then((o) => {
      if (o) setActiveOrder(o);
    });
  }, []);

  // Dynamically compute the exact flight route based on the booked order's pickup and destination
  const routeData = useMemo(() => {
    const hub = activeOrder?.pickup_label || 'Central Metro Hub';
    const dest = activeOrder?.destination_label || '12.9010° N, 80.2279° E · OMR Cyber Vale, Sholinganallur';
    return generateFlightRoute(hub, dest);
  }, [activeOrder]);

  const activeWaypoints = routeData.waypoints;
  const fullRoutePath = routeData.path;

  // Flight simulation loop
  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      return;
    }

    const durationSeconds = 30; // 30s to complete flight at 1x
    const step = (now) => {
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const deltaTime = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      setProgress((prev) => {
        const next = prev + (deltaTime / durationSeconds) * speedMultiplier;
        if (next >= 1) {
          setIsPlaying(false);
          setIsDelivered(true);
          // Persist order status as DELIVERED in storage
          if (activeOrder?.order_id) {
            orderService.updateStatus(activeOrder.order_id, 'DELIVERED').catch(() => {});
          }
          return 1;
        }
        return next;
      });

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying, speedMultiplier, activeOrder]);

  // Handler to restart flight simulation
  const handleRestartFlight = () => {
    setProgress(0);
    setIsDelivered(false);
    setIsPlaying(true);
    if (activeOrder?.order_id) {
      orderService.updateStatus(activeOrder.order_id, 'IN_TRANSIT').catch(() => {});
    }
  };

  // Compute interpolated GPS coordinates & telemetry along the dynamic route
  const { currentPosition, currentAlt, currentSpeed, currentBattery, currentEta, currentSector, currentStage } = useMemo(() => {
    const totalSegments = activeWaypoints.length - 1;
    const scaled = Math.min(progress, 0.999) * totalSegments;
    const segIndex = Math.min(Math.floor(scaled), totalSegments - 1);
    const segFraction = scaled - segIndex;

    const p0 = activeWaypoints[segIndex];
    const p1 = activeWaypoints[segIndex + 1];

    const lat = progress >= 1 ? activeWaypoints[totalSegments].lat : p0.lat + (p1.lat - p0.lat) * segFraction;
    const lng = progress >= 1 ? activeWaypoints[totalSegments].lng : p0.lng + (p1.lng - p0.lng) * segFraction;
    const alt = progress >= 1 ? 0 : Math.round(p0.alt + (p1.alt - p0.alt) * segFraction);
    const spd = progress >= 1 ? 0 : Math.round(p0.speed + (p1.speed - p0.speed) * segFraction);
    const bat = Math.max(50, Math.round(88 - progress * 22));
    const eta = progress >= 1 ? 0 : Math.max(1, Math.round((1 - progress) * 14));

    let stage = 4; // 'In Transit'
    if (progress < 0.08) stage = 3; // 'Departed Hub'
    else if (progress >= 0.98 || isDelivered) stage = 5; // 'Delivered'

    return {
      currentPosition: [lat, lng],
      currentAlt: alt,
      currentSpeed: spd,
      currentBattery: bat,
      currentEta: eta,
      currentSector: progress >= 1 ? `Destination Drop Pad · ${routeData.dest.label}` : p0.sector,
      currentStage: stage,
    };
  }, [progress, isDelivered, activeWaypoints, routeData]);


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Customer Header */}
      <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-8 shadow-xs z-20">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2.5 text-slate-900 font-black text-xl tracking-tight group">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <Plane className="w-5 h-5 text-sky-400 transform -rotate-12" />
            </div>
            <span>SKYDROP</span>
          </Link>
          <span className="hidden sm:inline-block text-xs font-mono text-slate-300">|</span>
          <span className="hidden sm:inline-block text-xs font-mono text-slate-600 font-semibold uppercase tracking-wider">
            Live Airspace Flight Tracker
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200">
            Airframe: <span className="text-slate-900 font-black">{activeOrder?.drone_id || 'SD-D204'}</span>
          </div>
          <Link to="/customer">
            <button className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-full shadow-xs transition cursor-pointer">
              + New Order
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content Area: 2-Column (Left 65% width, Right 35% width) */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: REAL-TIME INTERACTIVE UNLOCKED ZOOM GPS TRACKING MAP          */}
          {/* ========================================================================= */}
          <div className="lg:col-span-8 relative min-h-[580px] sm:min-h-[660px] rounded-3xl overflow-hidden border border-slate-200 shadow-md flex flex-col justify-between p-4 sm:p-6 bg-slate-100">
            
            {/* Real Interactive Map Component (Independent Zoom / Pan) */}
            <div className="absolute inset-0 w-full h-full">
              <MapView
                center={routeData.center}
                zoom={12}
                shouldRecenter={shouldFocusDrone}
                hubs={ALL_HUBS}
                destination={{
                  lat: routeData.dest.lat,
                  lng: routeData.dest.lng,
                  label: `Drop: ${routeData.dest.label}`,
                }}
                activeRoute={fullRoutePath}
                drones={[
                  {
                    drone_id: activeOrder?.drone_id || 'SD-D204',
                    model: activeOrder?.cargo_type?.includes('MED') ? 'AeroViper M3' : 'Pelican X1 Heavy Cargo',
                    lat: currentPosition[0],
                    lng: currentPosition[1],
                    battery_level: currentBattery,
                  }
                ]}
                className="w-full h-full rounded-3xl min-h-full border-0"
              />
            </div>

            {/* TOP OVERLAYS */}
            <div className="relative z-20 flex flex-wrap items-start justify-between gap-3 pointer-events-none">
              {/* Left Top Badge: Corridor Info & Live Progress */}
              <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-md border border-slate-200 space-y-1 pointer-events-auto max-w-sm">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isDelivered ? 'bg-emerald-500' : 'bg-sky-500 animate-pulse'}`} />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                    {isDelivered ? 'DELIVERY COMPLETE' : 'AIRWAY CORRIDOR · LIVE GPS'}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-900 font-mono truncate">
                  {activeOrder?.corridor_id || 'COR-01'} · {routeData.origin.hub_name} → {routeData.dest.label}
                </div>
                <div className="w-48 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 rounded-full ${isDelivered ? 'bg-emerald-500' : 'bg-sky-500'}`}
                    style={{ width: `${Math.round(progress * 100)}%` }}
                  />
                </div>
              </div>

              {/* Right Top Badge: Status & Controls */}
              <div className="bg-slate-900/95 backdrop-blur-md p-3 rounded-2xl shadow-md border border-slate-700 text-white space-y-2 text-right pointer-events-auto">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">STATUS</span>
                  <span className={`text-xs font-bold font-mono flex items-center gap-1.5 ${isDelivered ? 'text-emerald-400' : 'text-sky-400'}`}>
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    {isDelivered ? 'DELIVERED · SAFE DROP' : 'IN TRANSIT · CRUISE'}
                  </span>
                </div>

                {/* Simulation Control Buttons */}
                <div className="flex items-center gap-1.5 pt-1 border-t border-slate-800">
                  {!isDelivered ? (
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono flex items-center gap-1 cursor-pointer transition"
                      title={isPlaying ? 'Pause simulation' : 'Play simulation'}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                      <span>{isPlaying ? 'Pause' : 'Resume'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleRestartFlight}
                      className="p-1.5 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition shadow-xs"
                      title="Replay Flight from Hub"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Replay Flight</span>
                    </button>
                  )}

                  {!isDelivered && (
                    <>
                      <button
                        onClick={handleRestartFlight}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono cursor-pointer transition"
                        title="Restart flight from Hub"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center rounded-lg bg-slate-800 p-0.5 text-[10px] font-mono">
                        {[1, 2, 5].map((spd) => (
                          <button
                            key={spd}
                            onClick={() => setSpeedMultiplier(spd)}
                            className={`px-1.5 py-0.5 rounded cursor-pointer ${
                              speedMultiplier === spd ? 'bg-sky-500 text-white font-bold' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {spd}x
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* CELEBRATORY DELIVERED BANNER (Appears when drone reaches drop point) */}
            {isDelivered && (
              <div className="relative z-20 my-auto bg-emerald-950/90 backdrop-blur-md border-2 border-emerald-500/80 p-5 rounded-2xl text-white shadow-2xl space-y-2 pointer-events-auto animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">
                      Package Successfully Delivered!
                    </h3>
                    <p className="text-xs text-emerald-200">
                      Autonomous tether lowering verified at <strong>{routeData.dest.label} Drop Pad</strong>.
                    </p>
                  </div>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-emerald-800/80 text-xs font-mono">
                  <span className="text-emerald-300">Order #{activeOrder?.order_id || 'SKD-2847'} · Status: DELIVERED</span>
                  <button
                    onClick={handleRestartFlight}
                    className="text-white underline font-bold hover:text-emerald-300 cursor-pointer"
                  >
                    Replay Flight Simulation ↺
                  </button>
                </div>
              </div>
            )}

            {/* BOTTOM INFO BAR */}
            <div className="relative z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 shadow-lg text-xs font-mono mt-auto pointer-events-auto">
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <span className="text-slate-400 block text-[10px]">LIVE GPS COORDINATES</span>
                  <span className="font-bold text-slate-900">
                    {currentPosition[0].toFixed(4)}° N, {currentPosition[1].toFixed(4)}° E
                  </span>
                </div>
                <div className="hidden sm:block h-6 w-px bg-slate-200" />
                <div>
                  <span className="text-slate-400 block text-[10px]">CURRENT AIRWAY SECTOR</span>
                  <span className={`font-bold ${isDelivered ? 'text-emerald-700' : 'text-sky-700'}`}>
                    {currentSector}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-[11px] hidden sm:inline">
                  Interactive Map: Pan &amp; Zoom freely
                </span>
                <span className={`font-bold px-2.5 py-1 rounded-md border flex items-center gap-1.5 ${
                  isDelivered 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-sky-50 text-sky-700 border-sky-200'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isDelivered ? 'bg-emerald-500' : 'bg-sky-500 animate-ping'}`} />
                  {isDelivered ? 'Delivered · 0 kts' : `Live GPS · ${speedMultiplier * 10}Hz`}
                </span>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: REAL-TIME TELEMETRY FEED (Clean Light UI)                   */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 flex flex-col justify-between space-y-6">
            
            {/* Section 1: Active Telemetry Feed Title */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold block">
                    Active Airframe Telemetry
                  </span>
                  <h2 className="text-2xl font-black font-mono tracking-tight text-slate-900 mt-0.5">
                    {activeOrder?.drone_id || 'SD-D204'}
                  </h2>
                  <p className="text-xs text-slate-500 font-mono truncate max-w-xs">
                    {activeOrder?.product_name || 'SkyDrop Pelican X1 · Hexacopter'}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full border text-xs font-mono font-bold flex items-center gap-1.5 ${
                  isDelivered
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-sky-50 text-sky-700 border-sky-200'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isDelivered ? 'bg-emerald-500' : 'bg-sky-500 animate-pulse'}`} />
                  {isDelivered ? 'Delivered' : 'Live Feed'}
                </span>
              </div>

              {/* 4-Grid of Telemetry Metric Cards */}
              <div className="grid grid-cols-2 gap-3">

                
                {/* 1. Altitude */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-[11px] font-mono uppercase font-bold tracking-wider">Altitude</span>
                    <ArrowUp className="w-4 h-4 text-slate-700" />
                  </div>
                  <div className="text-2xl font-black font-mono text-slate-900">
                    {currentAlt} <span className="text-xs font-normal text-slate-500">m</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono">
                    {isDelivered ? 'At Ground Landing Pad' : 'Floor: 60m–120m'}
                  </p>
                </div>

                {/* 2. Air Speed */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-[11px] font-mono uppercase font-bold tracking-wider">Air Speed</span>
                    <Gauge className="w-4 h-4 text-sky-700" />
                  </div>
                  <div className="text-2xl font-black font-mono text-slate-900">
                    {currentSpeed} <span className="text-xs font-normal text-slate-500">kts</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono">
                    {isDelivered ? 'Touchdown verified' : `~${Math.round(currentSpeed * 1.852)} km/h`}
                  </p>
                </div>

                {/* 3. Battery Power */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-[11px] font-mono uppercase font-bold tracking-wider">Battery</span>
                    <Battery className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-black font-mono text-emerald-700">
                    {currentBattery}%
                  </div>
                  <p className="text-[10px] text-emerald-700 font-mono">
                    {isDelivered ? 'Standby Mode' : 'Healthy discharge'}
                  </p>
                </div>

                {/* 4. Target ETA */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-[11px] font-mono uppercase font-bold tracking-wider">Target ETA</span>
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-2xl font-black font-mono text-slate-900">
                    {isDelivered ? '0' : currentEta} <span className="text-xs font-normal text-slate-500">{isDelivered ? 'min' : 'min'}</span>
                  </div>
                  <p className={`text-[10px] font-mono ${isDelivered ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
                    {isDelivered ? 'Arrived & Handed Over' : 'On schedule'}
                  </p>
                </div>

              </div>
            </div>

            {/* Section 2: Flight Timeline (Vertical Step List with Live Highlighting) */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600">
                  Flight Sequence
                </h3>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  isDelivered 
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200' 
                    : 'text-sky-700 bg-sky-50 border-sky-200'
                }`}>
                  {isDelivered ? 'Step 5 of 5 · Completed' : `Step ${currentStage} of 5 (${Math.round(progress * 100)}%)`}
                </span>
              </div>

              {/* Vertical Step List */}
              <div className="space-y-4 relative pl-1">
                
                {/* Step 1: Order Confirmed */}
                <div className="flex items-start gap-3 relative">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-900">Order Confirmed</p>
                    <p className="text-[10px] text-slate-500 font-mono">12:15 PM · Manifest validated</p>
                  </div>
                </div>

                {/* Step 2: Drone Assigned */}
                <div className="flex items-start gap-3 relative">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-900">Drone Assigned</p>
                    <p className="text-[10px] text-slate-500 font-mono">12:16 PM · SD-D204 linked</p>
                  </div>
                </div>

                {/* Step 3: Departed Hub */}
                <div className="flex items-start gap-3 relative">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    progress >= 0.05 
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' 
                      : 'bg-slate-100 text-slate-400 border border-slate-300'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-900">Departed Central Hub</p>
                    <p className="text-[10px] text-slate-500 font-mono">12:18 PM · Clearance granted</p>
                  </div>
                </div>

                {/* Step 4: In Transit / Arrived */}
                <div className="flex items-start gap-3 relative">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    isDelivered 
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' 
                      : 'bg-sky-100 text-sky-700 border border-sky-300'
                  }`}>
                    {isDelivered ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                    ) : (
                      <Plane className="w-3.5 h-3.5 text-sky-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs font-bold flex items-center gap-1.5 ${isDelivered ? 'text-emerald-700' : 'text-sky-700'}`}>
                      {isDelivered ? 'Package Safely Delivered' : 'Cruising in Airway Corridor'}
                      {!isDelivered && <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse" />}
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">
                      {isDelivered ? 'Winch tether retracted · Complete' : `${currentSector} (${currentAlt}m alt)`}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link to="/customer" className="text-slate-600 hover:text-slate-900 font-mono font-semibold flex items-center gap-1 transition">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
              </Link>
              <Link to="/customer/book" className="text-slate-900 hover:underline font-bold">
                Book Another Delivery →
              </Link>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

export default CustomerTracking;
