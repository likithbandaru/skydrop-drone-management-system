// Utility for parsing pickup hubs, destination GPS coordinates, and dynamic flight vectors

export const ALL_HUBS = [
  { hub_id: 'HUB-001', hub_name: 'Central Metro Hub', location_lat: 13.0827, location_long: 80.2707, current_drone_count: 8, docking_capacity: 12, is_active: true },
  { hub_id: 'HUB-002', hub_name: 'Northside Medical Hub', location_lat: 13.1075, location_long: 80.2870, current_drone_count: 5, docking_capacity: 8, is_active: true },
  { hub_id: 'HUB-003', hub_name: 'Guindy Industrial Hub', location_lat: 13.0067, location_long: 80.2025, current_drone_count: 6, docking_capacity: 10, is_active: true },
  { hub_id: 'HUB-004', hub_name: 'OMR Cyber Tech Hub', location_lat: 12.9010, location_long: 80.2279, current_drone_count: 9, docking_capacity: 14, is_active: true },
];

export function parseDestination(destString) {
  if (!destString) return { lat: 12.9010, lng: 80.2279, label: 'OMR Cyber Vale, Sholinganallur' };
  
  // Format: "13.0336° N, 80.1585° E · Porur Diagnostic Center & Multi-Specialty"
  const match = destString.match(/([\d.]+)°?\s*N,\s*([\d.]+)°?\s*E\s*·?\s*(.*)/i);
  if (match) {
    return {
      lat: parseFloat(match[1]),
      lng: parseFloat(match[2]),
      label: match[3]?.trim() || destString,
    };
  }
  return { lat: 12.9010, lng: 80.2279, label: destString };
}

export function getHubData(hubName) {
  const found = ALL_HUBS.find(h => h.hub_name === hubName || h.hub_id === hubName);
  if (found) {
    return {
      hub_id: found.hub_id,
      hub_name: found.hub_name,
      lat: found.location_lat,
      lng: found.location_long,
      ...found,
    };
  }
  // Default to Central Metro Hub
  return {
    hub_id: 'HUB-001',
    hub_name: 'Central Metro Hub',
    lat: 13.0827,
    lng: 80.2707,
  };
}

export function generateFlightRoute(originHubName, destString) {
  const origin = getHubData(originHubName);
  const dest = parseDestination(destString);
  
  const dLat = dest.lat - origin.lat;
  const dLng = dest.lng - origin.lng;

  // Generate 7 sequential airway waypoint nodes with corridor curvature and altitude envelope
  const waypoints = [
    {
      lat: origin.lat,
      lng: origin.lng,
      sector: `Sector #1 · ${origin.hub_name} (Launchpad)`,
      alt: 10,
      speed: 12,
      name: `${origin.hub_name} Base`,
    },
    {
      lat: Number((origin.lat + dLat * 0.16 + (dLng > 0 ? 0.003 : -0.003)).toFixed(5)),
      lng: Number((origin.lng + dLng * 0.16 - (dLat > 0 ? 0.002 : -0.002)).toFixed(5)),
      sector: 'Sector #1 · Climb & Corridor Ingress',
      alt: 55,
      speed: 32,
      name: 'Climb Ingress Waypoint',
    },
    {
      lat: Number((origin.lat + dLat * 0.35 + (dLng > 0 ? 0.004 : -0.004)).toFixed(5)),
      lng: Number((origin.lng + dLng * 0.35 - (dLat > 0 ? 0.003 : -0.003)).toFixed(5)),
      sector: 'Sector #2 · Controlled Airway Cruise',
      alt: 82,
      speed: 42,
      name: 'Primary Airway Vector',
    },
    {
      lat: Number((origin.lat + dLat * 0.55 - (dLng > 0 ? 0.002 : -0.002)).toFixed(5)),
      lng: Number((origin.lng + dLng * 0.55 + (dLat > 0 ? 0.004 : -0.004)).toFixed(5)),
      sector: 'Sector #3 · Deconfliction Transit LZ',
      alt: 86,
      speed: 44,
      name: 'Mid-Corridor Vector Node',
    },
    {
      lat: Number((origin.lat + dLat * 0.75 - (dLng > 0 ? 0.003 : -0.003)).toFixed(5)),
      lng: Number((origin.lng + dLng * 0.75 + (dLat > 0 ? 0.002 : -0.002)).toFixed(5)),
      sector: 'Sector #4 · Destination Sector Ingress',
      alt: 75,
      speed: 38,
      name: 'Descent Gate Waypoint',
    },
    {
      lat: Number((origin.lat + dLat * 0.92).toFixed(5)),
      lng: Number((origin.lng + dLng * 0.92).toFixed(5)),
      sector: 'Sector #5 · Terminal Approach Vector',
      alt: 30,
      speed: 18,
      name: 'Terminal Precision Gate',
    },
    {
      lat: dest.lat,
      lng: dest.lng,
      sector: `Sector #5 · ${dest.label} (Arrival Pad)`,
      alt: 0,
      speed: 0,
      name: `${dest.label} Drop Pad`,
    },
  ];

  return {
    origin,
    dest,
    waypoints,
    path: waypoints.map(w => [w.lat, w.lng]),
    center: [(origin.lat + dest.lat) / 2, (origin.lng + dest.lng) / 2],
  };
}
