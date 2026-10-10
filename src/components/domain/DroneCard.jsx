import React from 'react';
import { Card } from '../ui/Card';
import { StatusBadge } from '../data/StatusBadge';
import { BatteryIndicator, DroneTypeBadge } from './BatteryIndicator';
import { Plane, Weight, Navigation, Gauge, Thermometer, Wind } from 'lucide-react';
import { Button } from '../ui/Button';

export function DroneCard({
  drone,
  onSelect,
  isSelected,
  showActions = true,
}) {
  if (!drone) return null;

  return (
    <Card
      className={`p-5 transition-all ${
        isSelected ? 'ring-2 ring-brand-500 border-brand-500 bg-slate-900' : 'hover:border-slate-700'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-white">{drone.drone_id}</span>
            <DroneTypeBadge
              type={drone.drone_type}
              winchEquipped={drone.winch_equipped}
              tempControlled={drone.temp_control_min_c !== undefined}
            />
          </div>
          <h4 className="text-xs text-slate-400 mt-1">{drone.model}</h4>
        </div>
        <StatusBadge status={drone.operational_status} />
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-800/80 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Weight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span>Payload: <strong className="text-white font-mono">{drone.payload_capacity_kg} kg</strong></span>
        </div>

        <div className="flex items-center gap-2 text-slate-300">
          <Navigation className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span>Hub: <strong className="text-white font-mono">{drone.current_hub_id}</strong></span>
        </div>

        {drone.drone_type === 'MEDICAL_RAPID' ? (
          <div className="flex items-center gap-2 text-rose-300 col-span-2">
            <Thermometer className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span>Temp: <strong className="text-white font-mono">{drone.temp_control_min_c}°C to {drone.temp_control_max_c}°C</strong> ({drone.max_speed_kmh} km/h)</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sky-300 col-span-2">
            <Wind className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>Volume: <strong className="text-white font-mono">{drone.max_volume_liters || 28.5} L</strong> {drone.winch_equipped ? '· Winch Active' : ''}</span>
          </div>
        )}
      </div>

      {/* Battery & Action Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/80">
        <BatteryIndicator
          level={drone.battery_level}
          isCharging={drone.operational_status === 'CHARGING'}
        />
        {showActions && onSelect && (
          <Button
            size="xs"
            variant={isSelected ? 'primary' : 'outline'}
            onClick={() => onSelect(drone)}
          >
            {isSelected ? 'Selected' : 'Select Drone'}
          </Button>
        )}
      </div>
    </Card>
  );
}
