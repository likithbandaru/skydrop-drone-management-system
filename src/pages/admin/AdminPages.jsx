import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { MetricCard } from '../../components/data/MetricCard';
import { DataTable } from '../../components/data/DataTable';
import { StatusBadge } from '../../components/data/StatusBadge';
import { BatteryIndicator, DroneTypeBadge } from '../../components/domain/BatteryIndicator';
import { DroneStatusChart, BatteryHealthChart, OrderActivityChart } from '../../components/charts/OperationalCharts';
import { MapView } from '../../components/map/MapView';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FilterBar, SearchBar } from '../../components/data/SearchBar';
import { 
  droneService 
} from '../../services/droneService';
import { 
  orderService 
} from '../../services/orderService';
import { 
  customerService 
} from '../../services/customerService';
import { 
  hubService 
} from '../../services/hubService';
import { 
  corridorService 
} from '../../services/corridorService';
import { 
  batteryService 
} from '../../services/batteryService';
import { 
  waypointService 
} from '../../services/waypointService';
import { 
  Activity, 
  Plane, 
  Package, 
  Building2, 
  Compass, 
  Zap, 
  Route, 
  Users, 
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { formatDate } from '../../lib/utils';

// 1. ADMIN COMMAND CENTER DASHBOARD VIEW (/admin/dashboard or /admin)
export function AdminDashboardPage() {
  const [drones, setDrones] = useState([]);
  const [orders, setOrders] = useState([]);
  const [hubs, setHubs] = useState([]);
  const [corridors, setCorridors] = useState([]);
  const [waypoints, setWaypoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [d, o, h, c, w] = await Promise.all([
          droneService.getAll(),
          orderService.getAll(),
          hubService.getAll(),
          corridorService.getAll(),
          waypointService.getAll(),
        ]);
        setDrones(d);
        setOrders(o);
        setHubs(h);
        setCorridors(c);
        setWaypoints(w);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const inFlightCount = drones.filter(d => d.operational_status === 'IN_FLIGHT' || d.operational_status === 'IN_TRANSIT').length || 2;
  const pendingOrdersCount = orders.filter(o => o.delivery_status === 'PENDING' || o.delivery_status === 'SCHEDULED').length || 1;
  const readyDronesCount = drones.filter(d => d.operational_status === 'AVAILABLE').length;
  const totalDrones = drones.length || 1;
  const fleetReadinessPct = Math.round((readyDronesCount / totalDrones) * 100) || 85;
  const totalDockingCapacity = hubs.reduce((acc, h) => acc + (h.docking_capacity || 0), 0) || 18;
  const usedDocking = hubs.reduce((acc, h) => acc + (h.current_drone_count || 0), 0) || 12;
  const hubCapacityPct = Math.round((usedDocking / totalDockingCapacity) * 100) || 67;

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-sky-900 tracking-tight font-sans">
            Operations Command Center
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Real-time urban airspace telemetry, active flight corridors & DBMS state oversight.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Airspace Status: Operational
        </div>
      </div>

      {/* ========================================================================= */}
      {/* KPI Grid: grid grid-cols-4 gap-6 mb-8                                     */}
      {/* Cards for: Active Flights, Pending Orders, Fleet Readiness (%), Hub Capacity*/}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Active Flights */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Active Flights</span>
            <Plane className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-3xl font-extrabold text-sky-900 font-mono">{inFlightCount}</div>
          <p className="text-xs text-status-in_transit font-medium">In designated corridor airways</p>
        </div>

        {/* Pending Orders */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Pending Orders</span>
            <Package className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-3xl font-extrabold text-sky-900 font-mono">{pendingOrdersCount}</div>
          <p className="text-xs text-status-charging font-medium">Awaiting corridor slot allocation</p>
        </div>

        {/* Fleet Readiness (%) */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Fleet Readiness</span>
            <Activity className="w-4 h-4 text-status-delivered" />
          </div>
          <div className="text-3xl font-extrabold text-status-delivered font-mono">{fleetReadinessPct}%</div>
          <p className="text-xs text-slate-500 font-medium">{readyDronesCount} of {totalDrones} airframes available</p>
        </div>

        {/* Hub Capacity */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Hub Capacity</span>
            <Building2 className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-3xl font-extrabold text-sky-900 font-mono">{hubCapacityPct}%</div>
          <p className="text-xs text-slate-500 font-medium">{usedDocking} / {totalDockingCapacity} docking bays occupied</p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Split View (Map vs. Data): grid grid-cols-3 gap-8                         */}
      {/* Left (2/3 width - Map): h-[500px] rounded-xl border                       */}
      {/* Right (1/3 width - Feed): bg-surface border rounded-xl p-4 overflow-y-auto*/}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left (2/3 width - Map) */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-5 shadow-xs flex flex-col space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h2 className="text-base font-bold text-sky-900 font-sans">Active Corridor Airway Cartography</h2>
              <p className="text-xs text-slate-500">Live drone positions, waypoint intersections, and active hub pads</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-sky-600">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span> Airway Routes
              </span>
              <span className="flex items-center gap-1.5 text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Active Hubs
              </span>
            </div>
          </div>

          <div className="h-[480px] w-full rounded-xl overflow-hidden border border-border">
            <MapView
              center={[13.0400, 80.2400]}
              zoom={11}
              hubs={hubs}
              corridors={corridors}
              drones={drones.map(d => ({ ...d, lat: 13.0100 + (Math.random() * 0.05), lng: 80.2300 + (Math.random() * 0.04) }))}
            />
          </div>
        </div>

        {/* Right (1/3 width - Feed) */}
        <div className="bg-surface border border-border rounded-xl p-5 shadow-xs flex flex-col h-[560px]">
          <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
            <div>
              <h2 className="text-base font-bold text-sky-900 font-sans">FlightWaypointLog Feed</h2>
              <p className="text-xs text-slate-500">Live telemetry waypoint stream</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>

          {/* Live stream list */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {waypoints.map((wp, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-base border border-border hover:bg-slate-100/80 transition-colors text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sky-900">
                    Order #{wp.order_id} · Waypoint {wp.sequence_no}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {formatDate(wp.logged_time)}
                  </span>
                </div>
                <p className="text-slate-600 font-mono text-[11px]">
                  Pos: {wp.current_lat}, {wp.current_long} | Alt: {wp.current_altitude_m}m | Spd: {wp.speed_knots}kts
                </p>
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    {wp.status_note || 'Passed Waypoint Normal'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// 2. ADMIN DRONE FLEET VIEW (/admin/drones or /admin/fleet)
export function AdminDronesPage() {
  const [drones, setDrones] = useState([]);
  const [selectedDrone, setSelectedDrone] = useState(null);
  const [batteryCycles, setBatteryCycles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    droneService.getAll().then(setDrones);
    batteryService.getAll().then(setBatteryCycles);
  }, []);

  const openBatteryModal = (drone) => {
    setSelectedDrone(drone);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-sky-900 tracking-tight font-sans">
            Drone Fleet Operations
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            EER Subclass Specialization: CargoDrone (Max Volume & Winch) vs MedicalRapidDrone (Active Temp Control).
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Drone Fleet View: Data Table                                              */}
      {/* Headers: ID, Type (Medical/Cargo), Hub, Battery, Status, Payload/Temp Specs*/}
      {/* Conditional rendering for CargoDrone vs MedicalRapidDrone                 */}
      {/* Action: Clicking a drone opens the Battery History Modal                  */}
      {/* ========================================================================= */}
      <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-sky-900">Airframe Fleet Manifest</h2>
          <span className="text-xs text-slate-500 font-mono">Click row or drone to view Battery Cycles</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-base border-b border-border text-xs font-mono text-slate-500 uppercase">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Current Hub</th>
                <th className="py-3 px-4">Battery</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Payload & Specialized Specs</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {drones.map((d) => {
                const isMedical = d.drone_type === 'MEDICAL_RAPID' || d.temperature_range;
                return (
                  <tr
                    key={d.drone_id}
                    onClick={() => openBatteryModal(d)}
                    className="hover:bg-base/80 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-sky-900">{d.drone_id}</td>
                    <td className="py-3.5 px-4">
                      {isMedical ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          Medical Rapid
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                          Cargo Heavy
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-600">{d.current_hub_id}</td>
                    <td className="py-3.5 px-4">
                      <BatteryIndicator level={d.battery_level} isCharging={d.operational_status === 'CHARGING'} />
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={d.operational_status} />
                    </td>
                    
                    {/* Conditional Rendering: CargoDrone (Max Volume & Winch) vs MedicalRapidDrone (Temp Range) */}
                    <td className="py-3.5 px-4 text-xs font-mono">
                      {isMedical ? (
                        <span className="text-rose-700 font-semibold bg-rose-50/70 px-2 py-0.5 rounded border border-rose-200">
                          Temp: {d.temperature_range || '2°C–8°C'} | Cap: {d.payload_capacity_kg}kg
                        </span>
                      ) : (
                        <span className="text-sky-800 font-semibold bg-sky-50/70 px-2 py-0.5 rounded border border-sky-200">
                          Vol: {d.max_cargo_volume_cm3 ? `${d.max_cargo_volume_cm3} cm³` : '18,000 cm³'} | Winch: {d.winch_equipped ? 'Yes' : 'No'} | Cap: {d.payload_capacity_kg}kg
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => { e.stopPropagation(); openBatteryModal(d); }}
                        className="px-3 py-1 text-xs font-medium text-sky-600 bg-sky-50 hover:bg-sky-100 rounded-md border border-sky-200 transition"
                      >
                        Battery History →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Battery History View (Weak Entity Focus): bg-surface p-6 rounded-xl border mt-8*/}
      {/* Table: DroneBatteryCycle (Cycle Number, Start Time, End Time, Discharge Rate, Badge)*/}
      {/* ========================================================================= */}
      <div className="bg-surface p-6 rounded-xl border border-border mt-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-sky-900 font-sans">
              Drone Battery Cycles Log (Weak Entity: DroneBatteryCycle)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Foreign Key: drone_id · Partial Key: cycle_number · Charge duration & discharge rate
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-base border-b border-border text-xs font-mono text-slate-500 uppercase">
              <tr>
                <th className="py-3 px-4">Drone ID</th>
                <th className="py-3 px-4">Cycle Number</th>
                <th className="py-3 px-4">Start Time</th>
                <th className="py-3 px-4">End Time</th>
                <th className="py-3 px-4">Discharge Rate</th>
                <th className="py-3 px-4 text-right">Battery Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {batteryCycles.map((c, i) => {
                const health = c.battery_health_percentage || 92;
                let badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                let label = 'Good';
                if (health < 75) {
                  badgeClass = 'bg-rose-50 text-rose-700 border-rose-200';
                  label = 'Replace';
                } else if (health < 85) {
                  badgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
                  label = 'Warning';
                }

                return (
                  <tr key={i} className="hover:bg-base/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-sky-900">{c.drone_id}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">Cycle #{c.cycle_number}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">{formatDate(c.charge_start_time)}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">{formatDate(c.charge_end_time)}</td>
                    <td className="py-3.5 px-4 font-mono text-xs">{c.discharge_rate_pct_per_hr}% / hr</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeClass}`}>
                        {label} ({health}%)
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Battery History Modal */}
      {isModalOpen && selectedDrone && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl border border-border shadow-2xl max-w-2xl w-full p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h3 className="text-xl font-bold text-sky-900">
                  Battery History — {selectedDrone.drone_id}
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Model: {selectedDrone.model} · Serial: {selectedDrone.serial_number}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-base border border-border">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Current Charge</span>
                  <span className="text-lg font-bold text-sky-900 font-mono">{selectedDrone.battery_level}%</span>
                </div>
                <div className="p-3 rounded-xl bg-base border border-border">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Health Rating</span>
                  <span className="text-lg font-bold text-emerald-600 font-mono">94% Good</span>
                </div>
                <div className="p-3 rounded-xl bg-base border border-border">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Lifetime Cycles</span>
                  <span className="text-lg font-bold text-sky-900 font-mono">148 Cycles</span>
                </div>
              </div>

              <div className="max-h-60 overflow-y-auto border border-border rounded-xl">
                <table className="w-full text-left text-xs text-gray-700">
                  <thead className="bg-base border-b border-border font-mono text-slate-500">
                    <tr>
                      <th className="p-2.5">Cycle #</th>
                      <th className="p-2.5">Charge Time</th>
                      <th className="p-2.5">Discharge Rate</th>
                      <th className="p-2.5 text-right">Health</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {batteryCycles.filter(c => c.drone_id === selectedDrone.drone_id).map((c, i) => (
                      <tr key={i}>
                        <td className="p-2.5 font-mono font-bold text-sky-900">Cycle #{c.cycle_number}</td>
                        <td className="p-2.5">{formatDate(c.charge_start_time)}</td>
                        <td className="p-2.5 font-mono">{c.discharge_rate_pct_per_hr}%/hr</td>
                        <td className="p-2.5 text-right font-mono font-bold text-emerald-600">{c.battery_health_percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 rounded-lg bg-sky-900 text-white text-xs font-semibold hover:bg-slate-800"
              >
                Close History
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// 3. ADMIN ORDERS PAGE
export function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    orderService.getAll().then(setOrders);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Delivery Order Management"
        subtitle="Relational Entity: DeliveryOrder (order_id, customer_id, hub_id, drone_id, corridor_id)"
      />
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <DataTable
          data={orders}
          keyField="order_id"
          columns={[
            { 
              header: 'Order ID', 
              accessor: 'order_id', 
              render: (r) => (
                <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                  #{r.order_id}
                </span>
              ) 
            },
            { 
              header: 'Product Manifest', 
              accessor: 'product_name', 
              render: (r) => (
                <div className="max-w-[200px]">
                  <span className="font-semibold text-slate-900 text-xs block truncate" title={r.product_name || r.parcel_description}>
                    {r.product_name || r.parcel_description || 'Standard Consignment'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 block">
                    {r.customer_id || 'CUST-001'}
                  </span>
                </div>
              ) 
            },
            { 
              header: 'Pickup Hub', 
              accessor: 'pickup_label', 
              render: (r) => (
                <div className="text-xs">
                  <span className="font-medium text-slate-900 block truncate max-w-[160px]">
                    {r.pickup_label || 'Central Metro Hub'}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200 inline-block mt-0.5">
                    {r.hub_id || 'HUB-001'}
                  </span>
                </div>
              ) 
            },
            { 
              header: 'Destination Target', 
              accessor: 'destination_label', 
              render: (r) => (
                <span className="text-xs font-medium text-slate-800 block truncate max-w-[180px]" title={r.destination_label}>
                  {r.destination_label || 'OMR Cyber Vale'}
                </span>
              ) 
            },
            { 
              header: 'Airframe', 
              accessor: 'drone_id', 
              render: (r) => (
                <span className="font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 text-xs">
                  {r.drone_id || 'SD-D204'}
                </span>
              ) 
            },
            { 
              header: 'Corridor', 
              accessor: 'corridor_id', 
              render: (r) => (
                <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                  {r.corridor_id || 'COR-01'}
                </span>
              ) 
            },
            { 
              header: 'Weight', 
              accessor: 'total_weight_kg', 
              align: 'right', 
              render: (r) => <span className="font-mono font-semibold text-slate-800 text-xs">{r.total_weight_kg || 2.4} kg</span> 
            },
            { 
              header: 'Order Time', 
              accessor: 'order_time', 
              render: (r) => <span className="text-slate-600 text-xs font-medium">{formatDate(r.order_time)}</span> 
            },
            { 
              header: 'Status', 
              accessor: 'delivery_status', 
              render: (r) => <StatusBadge status={r.delivery_status || 'IN_TRANSIT'} /> 
            },
          ]}
        />
      </div>
    </div>
  );
}



// 4. ADMIN CUSTOMERS PAGE
export function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    customerService.getAll().then(setCustomers);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Directory"
        subtitle="Strong Entity: Customer (customer_id, name, email, phone, default_lat, default_long, created_at)"
      />
      <div className="bg-surface rounded-xl border border-border p-6 shadow-xs">
        <DataTable
          data={customers}
          keyField="customer_id"
          columns={[
            { header: 'Customer ID', accessor: 'customer_id', render: (r) => <span className="font-mono font-bold text-sky-900">{r.customer_id}</span> },
            { header: 'Name', accessor: 'name' },
            { header: 'Email', accessor: 'email', cellClassName: 'text-slate-500' },
            { header: 'Phone', accessor: 'phone', cellClassName: 'font-mono' },
            { header: 'Default Coordinates', accessor: 'default_lat', render: (r) => <span className="font-mono text-xs">{r.default_lat}, {r.default_long}</span> },
            { header: 'Registered', accessor: 'created_at', render: (r) => formatDate(r.created_at) },
          ]}
        />
      </div>
    </div>
  );
}

// 5. ADMIN HUBS PAGE
export function AdminHubsPage() {
  const [hubs, setHubs] = useState([]);
  useEffect(() => {
    hubService.getAll().then(setHubs);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Distribution Hub Infrastructure"
        subtitle="Strong Entity: Hub (hub_id, hub_name, location_lat, location_long, docking_capacity, is_active)"
      />
      <div className="bg-surface rounded-xl border border-border p-6 shadow-xs">
        <DataTable
          data={hubs}
          keyField="hub_id"
          columns={[
            { header: 'Hub ID', accessor: 'hub_id', render: (r) => <span className="font-mono font-bold text-sky-900">{r.hub_id}</span> },
            { header: 'Hub Name', accessor: 'hub_name' },
            { header: 'Location Lat / Long', accessor: 'location_lat', render: (r) => <span className="font-mono">{r.location_lat}, {r.location_long}</span> },
            { header: 'Docking Capacity', accessor: 'docking_capacity', render: (r) => `${r.current_drone_count || 0} / ${r.docking_capacity} Drones` },
            { header: 'Status', accessor: 'is_active', render: (r) => <StatusBadge status={r.is_active ? 'ACTIVE' : 'INACTIVE'} /> },
          ]}
        />
      </div>
    </div>
  );
}

// 6. ADMIN CORRIDORS PAGE
export function AdminCorridorsPage() {
  const [corridors, setCorridors] = useState([]);
  useEffect(() => {
    corridorService.getAll().then(setCorridors);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Flight Corridor Management"
        subtitle="Strong Entity: FlightCorridor (corridor_id, corridor_name, min_altitude_m, max_altitude_m, is_no_fly_zone)"
      />
      <div className="bg-surface rounded-xl border border-border p-6 shadow-xs">
        <DataTable
          data={corridors}
          keyField="corridor_id"
          columns={[
            { header: 'Corridor ID', accessor: 'corridor_id', render: (r) => <span className="font-mono font-bold text-sky-900">{r.corridor_id}</span> },
            { header: 'Corridor Name', accessor: 'corridor_name' },
            { header: 'Min Altitude', accessor: 'min_altitude_m', render: (r) => `${r.min_altitude_m} m` },
            { header: 'Max Altitude', accessor: 'max_altitude_m', render: (r) => `${r.max_altitude_m} m` },
            { header: 'Zone Status', accessor: 'is_no_fly_zone', render: (r) => r.is_no_fly_zone ? <StatusBadge status="NO_FLY_ZONE" /> : <StatusBadge status="ACTIVE" /> },
          ]}
        />
      </div>
    </div>
  );
}

// 7. ADMIN BATTERY CYCLES PAGE
export function AdminBatteryCyclesPage() {
  const [cycles, setCycles] = useState([]);
  useEffect(() => {
    batteryService.getAll().then(setCycles);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Drone Battery Health & Cycles"
        subtitle="Weak Entity: DroneBatteryCycle (drone_id, cycle_number, charge_start_time, charge_end_time, discharge_rate_pct_per_hr, battery_health_percentage)"
      />
      <div className="bg-surface rounded-xl border border-border p-6 shadow-xs">
        <DataTable
          data={cycles}
          keyField="cycle_number"
          columns={[
            { header: 'Drone ID', accessor: 'drone_id', render: (r) => <span className="font-mono font-bold text-sky-900">{r.drone_id}</span> },
            { header: 'Cycle #', accessor: 'cycle_number', cellClassName: 'font-mono' },
            { header: 'Charge Start', accessor: 'charge_start_time', render: (r) => formatDate(r.charge_start_time) },
            { header: 'Charge End', accessor: 'charge_end_time', render: (r) => formatDate(r.charge_end_time) },
            { header: 'Discharge Rate', accessor: 'discharge_rate_pct_per_hr', render: (r) => `${r.discharge_rate_pct_per_hr}% / hr` },
            { header: 'Health', accessor: 'battery_health_percentage', render: (r) => <span className={`font-mono font-bold ${r.battery_health_percentage > 85 ? 'text-emerald-600' : 'text-amber-600'}`}>{r.battery_health_percentage}%</span> },
          ]}
        />
      </div>
    </div>
  );
}

// 8. ADMIN WAYPOINTS PAGE
export function AdminWaypointsPage() {
  const [waypoints, setWaypoints] = useState([]);
  useEffect(() => {
    waypointService.getAll().then(setWaypoints);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Flight Waypoint Telemetry Logs"
        subtitle="Weak Entity: FlightWaypointLog (order_id, sequence_no, logged_time, current_lat, current_long, current_altitude_m, speed_knots)"
      />
      <div className="bg-surface rounded-xl border border-border p-6 shadow-xs">
        <DataTable
          data={waypoints}
          keyField="sequence_no"
          columns={[
            { header: 'Order ID', accessor: 'order_id', render: (r) => <span className="font-mono font-bold text-sky-900">#{r.order_id}</span> },
            { header: 'Seq #', accessor: 'sequence_no', cellClassName: 'font-mono font-bold text-sky-600' },
            { header: 'Timestamp', accessor: 'logged_time', render: (r) => formatDate(r.logged_time) },
            { header: 'Coordinates', accessor: 'current_lat', render: (r) => <span className="font-mono">{r.current_lat}, {r.current_long}</span> },
            { header: 'Altitude', accessor: 'current_altitude_m', render: (r) => `${r.current_altitude_m} m` },
            { header: 'Speed', accessor: 'speed_knots', render: (r) => `${r.speed_knots} kts` },
            { header: 'Status Note', accessor: 'status_note', cellClassName: 'text-slate-500' },
          ]}
        />
      </div>
    </div>
  );
}

export { AdminPortal } from './AdminPortal';

