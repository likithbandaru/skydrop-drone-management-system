// adminMockData.js

export const mockHubs = [
  { hubId: "HUB-01", name: "Central Metro Hub", location: "Downtown Roof", capacity: 12, status: "Active", activeDrones: 8 },
  { hubId: "HUB-02", name: "Northside Medical", location: "General Hospital", capacity: 6, status: "Active", activeDrones: 4 },
];

export const mockDrones = [
  {
    droneId: "DRN-MED-042",
    serialNumber: "SN-993-M-2025",
    model: "SkyDrop Medical v2",
    type: "MedicalRapidDrone", // Specialization
    payloadCapacity: "2 kg",
    batteryLevel: 68,
    status: "In Flight",
    currentHub: "HUB-02",
    // Medical Specific
    tempControlRange: "2°C to 8°C",
    maxSpeed: "110 km/h"
  },
  {
    droneId: "DRN-CGO-105",
    serialNumber: "SN-441-C-2024",
    model: "SkyDrop Hauler v1",
    type: "CargoDrone", // Specialization
    payloadCapacity: "5 kg",
    batteryLevel: 100,
    status: "Charging",
    currentHub: "HUB-01",
    // Cargo Specific
    maxVolume: "15 Liters",
    winchAvailable: true
  },
  {
    droneId: "DRN-CGO-108",
    serialNumber: "SN-444-C-2024",
    model: "SkyDrop Hauler v1",
    type: "CargoDrone",
    payloadCapacity: "5 kg",
    batteryLevel: 12,
    status: "Maintenance",
    currentHub: "HUB-01",
    maxVolume: "15 Liters",
    winchAvailable: true
  }
];

export const mockWaypointLogs = [
  { orderId: "ORD-9932-B", seq: 42, time: "13:24:10", lat: 12.8315, lng: 80.0980, alt: 120, speed: 65 },
  { orderId: "ORD-9932-B", seq: 43, time: "13:24:15", lat: 12.8320, lng: 80.0985, alt: 120, speed: 66 },
  { orderId: "ORD-8811-C", seq: 12, time: "13:25:01", lat: 12.8400, lng: 80.1100, alt: 80, speed: 45 },
];
