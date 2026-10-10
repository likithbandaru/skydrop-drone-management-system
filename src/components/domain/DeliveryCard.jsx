import React from 'react';
import { Card } from '../ui/Card';
import { StatusBadge } from '../data/StatusBadge';
import { BatteryIndicator } from './BatteryIndicator';
import { Button } from '../ui/Button';
import { MapPin, Navigation, ArrowRight, Clock, Weight, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../lib/utils';

export function DeliveryCard({ order, drone, onTrack }) {
  if (!order) return null;

  return (
    <Card className="p-5 hover:border-slate-700 transition-all">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-slate-400">ORDER</span>
            <span className="font-mono text-sm font-bold text-white">#{order.order_id}</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">
            {formatDate(order.order_time)}
          </span>
        </div>
        <StatusBadge status={order.delivery_status} />
      </div>

      {/* Transit Route */}
      <div className="mt-4 p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
        <div className="flex items-start gap-2 text-xs">
          <div className="w-2 h-2 rounded-full bg-slate-400 mt-1.5 shrink-0"></div>
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">From</span>
            <span className="text-slate-200 font-medium">{order.pickup_label}</span>
          </div>
        </div>

        <div className="pl-1 border-l border-dashed border-slate-700 ml-1 h-3"></div>

        <div className="flex items-start gap-2 text-xs">
          <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] uppercase font-mono text-brand-400 block">To Destination</span>
            <span className="text-white font-medium">{order.destination_label}</span>
          </div>
        </div>
      </div>

      {/* Quick Specs */}
      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <Box className="w-3.5 h-3.5 text-slate-500" />
          <span>Drone: <strong className="text-slate-200 font-mono">{order.drone_id}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <Weight className="w-3.5 h-3.5 text-slate-500" />
          <span>Weight: <strong className="text-slate-200 font-mono">{order.total_weight_kg} kg</strong></span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
        {order.delivery_status === 'IN_TRANSIT' ? (
          <div className="flex items-center gap-1.5 text-xs text-brand-400 font-mono font-medium">
            <Navigation className="w-3 h-3 animate-spin" />
            <span>ETA {order.eta_minutes} min</span>
          </div>
        ) : (
          <span className="text-xs text-slate-500">Status updated</span>
        )}

        <Link to={`/customer/track?orderId=${order.order_id}`}>
          <Button size="xs" variant="outline" icon={ArrowRight}>
            Track Flight
          </Button>
        </Link>
      </div>
    </Card>
  );
}

export function WaypointTable({ waypoints = [] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-800">
      <table className="w-full text-left text-xs text-slate-200">
        <thead className="bg-slate-950/80 text-[11px] font-mono uppercase text-slate-400 border-b border-slate-800">
          <tr>
            <th className="py-2.5 px-3">#</th>
            <th className="py-2.5 px-3">Time</th>
            <th className="py-2.5 px-3">Coordinates (Lat, Long)</th>
            <th className="py-2.5 px-3">Altitude</th>
            <th className="py-2.5 px-3">Speed</th>
            <th className="py-2.5 px-3">Telemetry Note</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50 font-mono text-[11px]">
          {waypoints.map((wp) => (
            <tr key={wp.sequence_no} className="hover:bg-slate-800/30">
              <td className="py-2.5 px-3 font-bold text-brand-400">{wp.sequence_no}</td>
              <td className="py-2.5 px-3 text-slate-400">{wp.logged_time.split('T')[1].replace('Z', '')}</td>
              <td className="py-2.5 px-3 text-slate-300">{wp.current_lat.toFixed(4)}, {wp.current_long.toFixed(4)}</td>
              <td className="py-2.5 px-3 text-slate-200">{wp.current_altitude_m} m</td>
              <td className="py-2.5 px-3 text-slate-200">{wp.speed_knots} kts</td>
              <td className="py-2.5 px-3 font-sans text-slate-400">{wp.status_note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
