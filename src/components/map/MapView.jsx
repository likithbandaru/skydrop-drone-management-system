import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon, useMap } from 'react-leaflet';
import { createDroneIcon, createHubIcon, createDestinationIcon, createWaypointIcon } from './MapMarkers';
import { cn } from '../../lib/utils';
import { StatusBadge } from '../data/StatusBadge';

// Helper component to smoothly re-center map only when explicitly requested
function MapRecenter({ center, zoom, shouldRecenter = false }) {
  const map = useMap();
  useEffect(() => {
    if (shouldRecenter && center && center.length === 2 && !isNaN(center[0]) && !isNaN(center[1])) {
      map.setView(center, zoom || map.getZoom(), { animate: true });
    }
  }, [center, zoom, shouldRecenter, map]);
  return null;
}

export function MapView({
  center = [13.0010, 80.2450], // Default Chennai Central to OMR corridor overview
  zoom = 12,
  shouldRecenter = false,
  drones = [],
  hubs = [],
  destination = null,
  activeRoute = null, // Array of [lat, lng]
  corridors = [],
  waypoints = [],
  onSelectMarker,
  className,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn('w-full h-80 rounded-xl bg-slate-900 animate-pulse flex items-center justify-center border border-slate-800', className)}>
        <span className="text-xs text-slate-500 font-mono">Initializing SkyDrop Cartography...</span>
      </div>
    );
  }

  return (
    <div className={cn('relative w-full h-full min-h-[350px] rounded-xl overflow-hidden border border-slate-800 shadow-elevated', className)}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full dark-tiles"
        attributionControl={false}
      >
        <MapRecenter center={center} zoom={zoom} shouldRecenter={shouldRecenter} />


        {/* Free, official OpenStreetMap Cartography without API Key requirements */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />


        {/* Flight Corridors Overlay */}
        {corridors.map((corridor) => (
          <React.Fragment key={corridor.corridor_id}>
            <Polyline
              positions={corridor.waypoints_geojson}
              pathOptions={{
                color: corridor.is_no_fly_zone ? '#EF4444' : '#0EA5E9',
                weight: corridor.is_no_fly_zone ? 4 : 3,
                opacity: 0.7,
                dashArray: corridor.is_no_fly_zone ? '6, 6' : '3, 6',
              }}
            />
          </React.Fragment>
        ))}

        {/* Active Flight Route */}
        {activeRoute && activeRoute.length > 0 && (
          <Polyline
            positions={activeRoute}
            pathOptions={{
              color: '#38BDF8',
              weight: 4,
              opacity: 0.9,
            }}
          />
        )}

        {/* Hub Markers */}
        {hubs.map((hub) => (
          <Marker
            key={hub.hub_id}
            position={[hub.location_lat, hub.location_long]}
            icon={createHubIcon(hub.hub_name?.split(' ')[0])}
            eventHandlers={{
              click: () => onSelectMarker?.({ type: 'hub', data: hub }),
            }}
          >
            <Popup className="skydrop-popup">
              <div className="p-1 text-slate-900">
                <h4 className="font-bold text-xs">{hub.hub_name}</h4>
                <p className="text-[11px] text-slate-600 mt-1">
                  Docking: {hub.current_drone_count || 0} / {hub.docking_capacity} Drones
                </p>
                <div className="mt-2">
                  <StatusBadge status={hub.is_active ? 'ACTIVE' : 'INACTIVE'} />
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Waypoints Sequence Markers */}
        {waypoints.map((wp) => (
          <Marker
            key={`wp-${wp.sequence_no}`}
            position={[wp.current_lat, wp.current_long]}
            icon={createWaypointIcon(wp.sequence_no)}
          >
            <Popup>
              <div className="p-1 text-slate-900 text-xs font-mono">
                <strong>Waypoint #{wp.sequence_no}</strong>
                <div>Alt: {wp.current_altitude_m}m | Speed: {wp.speed_knots} kts</div>
                <div className="text-[10px] text-slate-500 font-sans">{wp.status_note}</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Drone Markers */}
        {drones.map((drone) => {
          // If drone is in flight or has location
          const lat = drone.lat || 13.0400;
          const lng = drone.lng || 80.2600;
          return (
            <Marker
              key={drone.drone_id}
              position={[lat, lng]}
              icon={createDroneIcon(drone.drone_id)}
              eventHandlers={{
                click: () => onSelectMarker?.({ type: 'drone', data: drone }),
              }}
            >
              <Popup>
                <div className="p-1 text-slate-900 text-xs">
                  <h4 className="font-bold font-mono">{drone.drone_id}</h4>
                  <p className="text-[11px] text-slate-600">{drone.model}</p>
                  <p className="font-semibold text-emerald-600 mt-1">Battery: {drone.battery_level}%</p>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Destination Marker */}
        {destination && (
          <Marker
            position={[destination.lat, destination.lng]}
            icon={createDestinationIcon()}
          >
            <Popup>
              <div className="p-1 text-slate-900 text-xs">
                <strong className="text-emerald-700">Delivery Drop Target</strong>
                <p className="text-[11px] text-slate-600">{destination.label || 'Target Location'}</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
