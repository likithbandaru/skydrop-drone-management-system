/**
 * SKYDROP CENTRALIZED EER MOCK DATA
 * Strictly aligned with approved EER / Relational Schema
 * Demonstration City: Chennai Urban Air Corridor Network
 */

// 1. CUSTOMER ENTITY
export const mockCustomers = [
  {
    customer_id: 'CUST-101',
    name: 'Kavitha Ramachandran',
    email: 'kavitha.r@chennailogistics.in',
    phone: '+91 98401 23456',
    default_lat: 12.9010, // OMR, Sholinganallur
    default_long: 80.2279,
    address_label: 'OMR Cyber Vale, Sholinganallur, Chennai',
    created_at: '2026-01-15T09:30:00Z',
  },
  {
    customer_id: 'CUST-102',
    name: 'Dr. Arvind Swaminathan',
    email: 'arvind.s@apollohealth.org',
    phone: '+91 94440 98765',
    default_lat: 13.0067, // Guindy Medical Cluster
    default_long: 80.2025,
    address_label: 'Guindy Tech Park Block 4, Chennai',
    created_at: '2026-01-20T14:15:00Z',
  },
  {
    customer_id: 'CUST-103',
    name: 'Meera Sundaram',
    email: 'meera.sundaram@gmail.com',
    phone: '+91 98840 55432',
    default_lat: 13.0850, // Anna Nagar
    default_long: 80.2101,
    address_label: '2nd Avenue, Anna Nagar West, Chennai',
    created_at: '2026-02-01T11:00:00Z',
  },
  {
    customer_id: 'CUST-104',
    name: 'Rajesh Subramanian',
    email: 'rajesh.subbu@fintechcorp.io',
    phone: '+91 97910 11223',
    default_lat: 13.0012, // Adyar
    default_long: 80.2565,
    address_label: 'Gandhi Nagar, Adyar, Chennai',
    created_at: '2026-02-10T16:45:00Z',
  },
  {
    customer_id: 'CUST-105',
    name: 'Pooja Narayanan',
    email: 'pooja.n@ecoretail.co',
    phone: '+91 99620 44556',
    default_lat: 13.0382, // Porur
    default_long: 80.1565,
    address_label: 'Mount-Poonamallee Rd, Porur, Chennai',
    created_at: '2026-02-18T10:20:00Z',
  },
];

// 2. HUB ENTITY
export const mockHubs = [
  {
    hub_id: 'HUB-001',
    hub_name: 'Chennai Central Distribution Hub',
    location_lat: 13.0827,
    location_long: 80.2707,
    docking_capacity: 12,
    current_drone_count: 5,
    is_active: true,
    address: 'Central Railway Logistics Annex, Park Town, Chennai',
  },
  {
    hub_id: 'HUB-002',
    hub_name: 'Guindy Industrial & Medical Hub',
    location_lat: 13.0067,
    location_long: 80.2025,
    docking_capacity: 8,
    current_drone_count: 3,
    is_active: true,
    address: 'Guindy Industrial Estate Road 2, Chennai',
  },
  {
    hub_id: 'HUB-003',
    hub_name: 'OMR Sholinganallur Tech Corridor Hub',
    location_lat: 12.9010,
    location_long: 80.2279,
    docking_capacity: 10,
    current_drone_count: 4,
    is_active: true,
    address: 'ELCOT SEZ, Sholinganallur, OMR, Chennai',
  },
  {
    hub_id: 'HUB-004',
    hub_name: 'Porur West Transit Hub',
    location_lat: 13.0382,
    location_long: 80.1565,
    docking_capacity: 6,
    current_drone_count: 2,
    is_active: true,
    address: 'Porur Junction Airfield Station, Chennai',
  },
  {
    hub_id: 'HUB-005',
    hub_name: 'Red Hills North Gateway Hub',
    location_lat: 13.1970,
    location_long: 80.1980,
    docking_capacity: 6,
    current_drone_count: 0,
    is_active: false, // Inactive maintenance demo
    address: 'GNT Road Logistics Depot, Red Hills, Chennai',
  },
];

// 3. FLIGHT CORRIDOR ENTITY
export const mockCorridors = [
  {
    corridor_id: 'COR-01',
    corridor_name: 'Central to OMR Primary Airway',
    min_altitude_m: 60,
    max_altitude_m: 120,
    is_no_fly_zone: false,
    description: 'High-throughput aerial conduit connecting Central Hub down the eastern transport spine to OMR.',
    waypoints_geojson: [
      [13.0827, 80.2707], // Central
      [13.0400, 80.2600], // Marina / Santhome bypass
      [13.0012, 80.2565], // Adyar air gate
      [12.9500, 80.2400], // Thoraipakkam
      [12.9010, 80.2279], // OMR Sholinganallur
    ],
  },
  {
    corridor_id: 'COR-02',
    corridor_name: 'Central to Anna Nagar Urban Corridor',
    min_altitude_m: 70,
    max_altitude_m: 110,
    is_no_fly_zone: false,
    description: 'Direct urban transport pathway over arterial avenues.',
    waypoints_geojson: [
      [13.0827, 80.2707],
      [13.0800, 80.2400],
      [13.0850, 80.2101],
    ],
  },
  {
    corridor_id: 'COR-03',
    corridor_name: 'Guindy to Porur Cross-Link Corridor',
    min_altitude_m: 50,
    max_altitude_m: 90,
    is_no_fly_zone: false,
    description: 'Rapid medical and lightweight parcel connector between South-West logistics zones.',
    waypoints_geojson: [
      [13.0067, 80.2025],
      [13.0200, 80.1800],
      [13.0382, 80.1565],
    ],
  },
  {
    corridor_id: 'COR-04',
    corridor_name: 'Airport Perimeter Buffer Zone',
    min_altitude_m: 0,
    max_altitude_m: 500,
    is_no_fly_zone: true, // Restricted No-Fly Zone demo
    description: 'Mandatory civil aviation exclusion boundary around Meenambakkam Airport.',
    waypoints_geojson: [
      [12.9941, 80.1709],
      [12.9800, 80.1850],
      [12.9700, 80.1600],
      [12.9900, 80.1500],
    ],
  },
  {
    corridor_id: 'COR-05',
    corridor_name: 'OMR to Adyar Coastal Relief Route',
    min_altitude_m: 60,
    max_altitude_m: 100,
    is_no_fly_zone: false,
    description: 'Scenic bypass route used during high atmospheric density periods.',
    waypoints_geojson: [
      [12.9010, 80.2279],
      [12.9500, 80.2550],
      [13.0012, 80.2565],
    ],
  },
];

// 4. DRONE ENTITY (Superclass)
export const mockDrones = [
  {
    drone_id: 'SD-D204',
    serial_number: 'SN-PEL-2026-0847',
    model: 'SkyDrop Pelican X1 Cargo',
    payload_capacity_kg: 5.0,
    battery_level: 76,
    operational_status: 'IN_FLIGHT', // IN_FLIGHT, AVAILABLE, CHARGING, MAINTENANCE
    current_hub_id: 'HUB-001',
    drone_type: 'CARGO',
    total_flight_hours: 342.5,
    last_serviced: '2026-02-15',
  },
  {
    drone_id: 'SD-M301',
    serial_number: 'SN-VIP-2026-0112',
    model: 'AeroViper M3 Rapid Medical',
    payload_capacity_kg: 3.5,
    battery_level: 95,
    operational_status: 'AVAILABLE',
    current_hub_id: 'HUB-002',
    drone_type: 'MEDICAL_RAPID',
    total_flight_hours: 188.0,
    last_serviced: '2026-02-20',
  },
  {
    drone_id: 'SD-D205',
    serial_number: 'SN-PEL-2026-0848',
    model: 'SkyDrop Pelican X1 Cargo',
    payload_capacity_kg: 5.0,
    battery_level: 32,
    operational_status: 'CHARGING',
    current_hub_id: 'HUB-003',
    drone_type: 'CARGO',
    total_flight_hours: 412.0,
    last_serviced: '2026-01-28',
  },
  {
    drone_id: 'SD-M302',
    serial_number: 'SN-VIP-2026-0115',
    model: 'AeroViper M3 Rapid Medical',
    payload_capacity_kg: 3.5,
    battery_level: 18,
    operational_status: 'MAINTENANCE',
    current_hub_id: 'HUB-001',
    drone_type: 'MEDICAL_RAPID',
    total_flight_hours: 520.4,
    last_serviced: '2026-01-10',
  },
  {
    drone_id: 'SD-D206',
    serial_number: 'SN-PEL-2026-0901',
    model: 'SkyDrop Pelican X1 Cargo',
    payload_capacity_kg: 5.0,
    battery_level: 88,
    operational_status: 'AVAILABLE',
    current_hub_id: 'HUB-004',
    drone_type: 'CARGO',
    total_flight_hours: 96.2,
    last_serviced: '2026-02-22',
  },
];

// 5. CARGO DRONE SPECIALIZATION
export const mockCargoDrones = [
  {
    drone_id: 'SD-D204',
    max_volume_liters: 28.5,
    winch_equipped: true,
    tether_length_m: 15,
  },
  {
    drone_id: 'SD-D205',
    max_volume_liters: 28.5,
    winch_equipped: true,
    tether_length_m: 15,
  },
  {
    drone_id: 'SD-D206',
    max_volume_liters: 30.0,
    winch_equipped: false,
    tether_length_m: 0,
  },
];

// 6. MEDICAL RAPID DRONE SPECIALIZATION
export const mockMedicalRapidDrones = [
  {
    drone_id: 'SD-M301',
    temp_control_min_c: 2.0,
    temp_control_max_c: 8.0,
    max_speed_kmh: 110.0,
    cold_chain_certified: true,
  },
  {
    drone_id: 'SD-M302',
    temp_control_min_c: -20.0,
    temp_control_max_c: 4.0,
    max_speed_kmh: 125.0,
    cold_chain_certified: true,
  },
];

// 7. DELIVERY ORDER ENTITY
export const mockOrders = [
  {
    order_id: 'SKD-2847',
    customer_id: 'CUST-101',
    hub_id: 'HUB-001',
    drone_id: 'SD-D204',
    corridor_id: 'COR-01',
    order_time: '2026-08-27T12:15:00Z',
    total_weight_kg: 2.3,
    delivery_status: 'IN_TRANSIT', // PENDING, ASSIGNED, IN_TRANSIT, DELIVERED, FAILED
    target_lat: 12.9010,
    target_long: 80.2279,
    pickup_label: 'Chennai Central Distribution Hub',
    destination_label: 'OMR Cyber Vale, Sholinganallur',
    parcel_description: 'Precision Optic Sensor Kit (Fragile)',
    eta_minutes: 12,
    current_altitude_m: 82,
    current_speed_knots: 41,
  },
  {
    order_id: 'SKD-2846',
    customer_id: 'CUST-102',
    hub_id: 'HUB-002',
    drone_id: 'SD-M301',
    corridor_id: 'COR-03',
    order_time: '2026-08-27T11:30:00Z',
    total_weight_kg: 1.4,
    delivery_status: 'DELIVERED',
    target_lat: 13.0382,
    target_long: 80.1565,
    pickup_label: 'Guindy Industrial & Medical Hub',
    destination_label: 'Porur West Diagnostic Center',
    parcel_description: 'Cold-chain Blood Platelet Units (2°C - 6°C)',
    eta_minutes: 0,
    current_altitude_m: 0,
    current_speed_knots: 0,
  },
  {
    order_id: 'SKD-2845',
    customer_id: 'CUST-103',
    hub_id: 'HUB-001',
    drone_id: 'SD-D206',
    corridor_id: 'COR-02',
    order_time: '2026-08-27T10:45:00Z',
    total_weight_kg: 3.8,
    delivery_status: 'DELIVERED',
    target_lat: 13.0850,
    target_long: 80.2101,
    pickup_label: 'Chennai Central Distribution Hub',
    destination_label: 'Anna Nagar West Residence',
    parcel_description: 'Priority Architectural Document Portfolio',
    eta_minutes: 0,
    current_altitude_m: 0,
    current_speed_knots: 0,
  },
  {
    order_id: 'SKD-2848',
    customer_id: 'CUST-104',
    hub_id: 'HUB-003',
    drone_id: 'SD-D205',
    corridor_id: 'COR-05',
    order_time: '2026-08-27T12:40:00Z',
    total_weight_kg: 4.1,
    delivery_status: 'PENDING',
    target_lat: 13.0012,
    target_long: 80.2565,
    pickup_label: 'OMR Sholinganallur Tech Hub',
    destination_label: 'Gandhi Nagar, Adyar',
    parcel_description: 'Automotive Sub-Assembly Telemetry Unit',
    eta_minutes: 25,
    current_altitude_m: 0,
    current_speed_knots: 0,
  },
];

// 8. DRONE BATTERY CYCLE (Weak Entity)
export const mockBatteryCycles = [
  {
    drone_id: 'SD-D204',
    cycle_number: 124,
    charge_start_time: '2026-08-26T22:00:00Z',
    charge_end_time: '2026-08-26T23:15:00Z',
    discharge_rate_pct_per_hr: 18.5,
    battery_health_percentage: 94,
    cell_temp_celsius: 29.4,
  },
  {
    drone_id: 'SD-D204',
    cycle_number: 123,
    charge_start_time: '2026-08-26T14:30:00Z',
    charge_end_time: '2026-08-26T15:45:00Z',
    discharge_rate_pct_per_hr: 19.1,
    battery_health_percentage: 94,
    cell_temp_celsius: 31.0,
  },
  {
    drone_id: 'SD-M301',
    cycle_number: 89,
    charge_start_time: '2026-08-27T08:00:00Z',
    charge_end_time: '2026-08-27T09:05:00Z',
    discharge_rate_pct_per_hr: 15.2,
    battery_health_percentage: 98,
    cell_temp_celsius: 27.8,
  },
  {
    drone_id: 'SD-D205',
    cycle_number: 210,
    charge_start_time: '2026-08-27T12:00:00Z',
    charge_end_time: '2026-08-27T13:20:00Z',
    discharge_rate_pct_per_hr: 22.4,
    battery_health_percentage: 86,
    cell_temp_celsius: 34.2,
  },
  {
    drone_id: 'SD-M302',
    cycle_number: 315,
    charge_start_time: '2026-08-25T18:00:00Z',
    charge_end_time: '2026-08-25T19:40:00Z',
    discharge_rate_pct_per_hr: 28.0,
    battery_health_percentage: 74, // Requires maintenance
    cell_temp_celsius: 38.6,
  },
];

// 9. FLIGHT WAYPOINT LOG (Weak Entity)
// Real-time telemetry log specifically for active order #SKD-2847
export const mockWaypoints = [
  {
    order_id: 'SKD-2847',
    sequence_no: 1,
    logged_time: '2026-08-27T12:18:10Z',
    current_lat: 13.0827,
    current_long: 80.2707,
    current_altitude_m: 10,
    speed_knots: 8,
    status_note: 'Takeoff clearance confirmed at Central Hub',
  },
  {
    order_id: 'SKD-2847',
    sequence_no: 2,
    logged_time: '2026-08-27T12:21:40Z',
    current_lat: 13.0610,
    current_long: 80.2650,
    current_altitude_m: 75,
    speed_knots: 38,
    status_note: 'Ascended to assigned corridor floor (75m)',
  },
  {
    order_id: 'SKD-2847',
    sequence_no: 3,
    logged_time: '2026-08-27T12:26:00Z',
    current_lat: 13.0300,
    current_long: 80.2580,
    current_altitude_m: 82,
    speed_knots: 42,
    status_note: 'Entering Adyar Air Gate waypoint',
  },
  {
    order_id: 'SKD-2847',
    sequence_no: 4,
    logged_time: '2026-08-27T12:31:15Z',
    current_lat: 12.9800,
    current_long: 80.2450,
    current_altitude_m: 82,
    speed_knots: 41,
    status_note: 'Cruising over Thoraipakkam mid-vector',
  },
  {
    order_id: 'SKD-2847',
    sequence_no: 5,
    logged_time: '2026-08-27T12:35:00Z',
    current_lat: 12.9350,
    current_long: 80.2330,
    current_altitude_m: 80,
    speed_knots: 41,
    status_note: 'Approaching Sholinganallur perimeter; telemetry stable',
  },
];

// 10. ACTIVE DELIVERY SINGLETON (EER-Aligned Live Telemetry)
export const mockActiveDelivery = {
  orderId: "ORD-9932-B",
  status: "In Transit",
  eta: "4 mins",
  targetLocation: { lat: 12.8406, lng: 80.1534 }, 
  hubLocation: { lat: 12.8230, lng: 80.0450 },
  drone: {
    droneId: "DRN-MED-042",
    model: "SkyDrop Medical Rapid v2",
    type: "MedicalRapidDrone",
    batteryLevel: 68, // Maps to Drone entity
  },
  // The latest log from the FlightWaypointLog weak entity
  currentTelemetry: {
    latitude: 12.8315,
    longitude: 80.0980,
    altitude: 120, // meters
    speed: 65, // km/h
    loggedTime: "2026-08-27T13:18:00Z"
  },
  // Represents the Flight Corridor / Planned Route
  flightRoute: [
    [12.8230, 80.0450],
    [12.8315, 80.0980],
    [12.8406, 80.1534]
  ]
};

