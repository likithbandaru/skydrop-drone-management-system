import React from 'react';
import { Card } from '../ui/Card';
import { Compass, Gauge, Mountain, Zap, Clock, Navigation } from 'lucide-react';
import { BatteryIndicator } from './BatteryIndicator';
import { StatusBadge } from '../data/StatusBadge';

export function TelemetryPanel({ order, drone, className }) {
  const altitude = order?.current_altitude_m ?? 82;
  const speed = order?.current_speed_knots ?? 41;
  const eta = order?.eta_minutes ?? 12;
  const battery = drone?.battery_level ?? 76;
  const droneId = order?.drone_id ?? drone?.drone_id ?? 'SD-D204';
  const status = order?.delivery_status ?? 'IN_TRANSIT';

  return (
    <Card className={`p-5 bg-white border-slate-200 shadow-xs ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
            Active Telemetry Feed
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-mono text-base font-bold text-slate-900">{droneId}</span>
            <span className="text-xs text-slate-500 font-mono">({drone?.model || 'Pelican X1'})</span>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Grid of Gauges / Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
        {/* Altitude */}
        <div className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
            <Mountain className="w-3.5 h-3.5 text-slate-700" />
            <span>Altitude</span>
          </div>
          <div className="mt-2 font-mono text-xl font-bold text-slate-900">
            {altitude} <span className="text-xs font-normal text-slate-500">m</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 font-mono">Corridor: 60 - 120m</span>
        </div>

        {/* Speed */}
        <div className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
            <Gauge className="w-3.5 h-3.5 text-sky-700" />
            <span>Air Speed</span>
          </div>
          <div className="mt-2 font-mono text-xl font-bold text-slate-900">
            {speed} <span className="text-xs font-normal text-slate-500">kts</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 font-mono">~{Math.round(speed * 1.852)} km/h</span>
        </div>

        {/* Battery */}
        <div className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Power Level</span>
          </div>
          <div className="mt-2 font-mono text-xl font-bold text-emerald-700">
            {battery}%
          </div>
          <span className="text-[10px] text-slate-500 mt-1 font-mono">Discharge: 18%/hr</span>
        </div>

        {/* ETA */}
        <div className="flex flex-col p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Target ETA</span>
          </div>
          <div className="mt-2 font-mono text-xl font-bold text-slate-900">
            {eta} <span className="text-xs font-normal text-slate-500">min</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 font-mono">Direct Vector</span>
        </div>
      </div>
    </Card>
  );
}

