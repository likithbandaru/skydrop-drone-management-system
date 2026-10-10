import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/layout/PageHeader';
import { MetricCard } from '../../components/data/MetricCard';
import { DeliveryCard } from '../../components/domain/DeliveryCard';
import { TelemetryPanel } from '../../components/domain/TelemetryPanel';
import { DeliveryTimeline } from '../../components/domain/DeliveryTimeline';
import { MapView } from '../../components/map/MapView';
import { WaypointTable } from '../../components/domain/DeliveryCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/data/StatusBadge';
import { DataTable } from '../../components/data/DataTable';
import { useAuth } from '../../context/AuthContext';
import { orderService } from '../../services/orderService';
import { droneService } from '../../services/droneService';
import { hubService } from '../../services/hubService';
import { corridorService } from '../../services/corridorService';
import { 
  Package, 
  Send, 
  Navigation, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Plus,
  Plane,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { CustomerTracking } from './CustomerTracking';
import { CustomerPortalApp } from './CustomerPortalApp';
import { ALL_HUBS, generateFlightRoute } from '../../lib/routeUtils';
import { formatDate } from '../../lib/utils';


export function CustomerDashboardPage() {
  const { user } = useAuth();
  const [activeOrder, setActiveOrder] = useState(null);
  const [activeDrone, setActiveDrone] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [hubs, setHubs] = useState([]);
  const [corridors, setCorridors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const order = await orderService.getActiveOrder();
        const orders = await orderService.getAll();
        const h = await hubService.getAll();
        const c = await corridorService.getAll();
        
        setActiveOrder(order);
        setRecentOrders(orders);
        setHubs(h && h.length > 0 ? h : ALL_HUBS);
        setCorridors(c);

        if (order?.drone_id) {
          const drone = await droneService.getById(order.drone_id);
          setActiveDrone(drone);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const routeData = useMemo(() => {
    const hub = activeOrder?.pickup_label || 'Central Metro Hub';
    const dest = activeOrder?.destination_label || '12.9010° N, 80.2279° E · OMR Cyber Vale, Sholinganallur';
    return generateFlightRoute(hub, dest);
  }, [activeOrder]);

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-sky-900 tracking-tight font-sans">
            Good morning, {user?.name || 'Customer'}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Active aerial shipment monitoring & real-time delivery telemetry.
          </p>
        </div>
        <Link to="/customer/book">
          <Button size="sm" variant="primary" icon={Plus} className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-5">
            Book New Delivery
          </Button>
        </Link>
      </div>

      {/* ========================================================================= */}
      {/* Top Section: Active Delivery (The Map)                                    */}
      {/* ========================================================================= */}
      <div className="w-full h-96 bg-gray-200 rounded-xl overflow-hidden relative border border-border shadow-sm">
        {/* React-Leaflet Container: Takes up 100% of this box */}
        <div className="w-full h-full">
          <MapView
            center={routeData.center}
            zoom={12}
            shouldRecenter={true}
            hubs={ALL_HUBS}
            corridors={corridors}
            destination={{
              lat: routeData.dest.lat,
              lng: routeData.dest.lng,
              label: `Drop: ${routeData.dest.label}`
            }}
            activeRoute={routeData.path}
            drones={[
              {
                drone_id: activeOrder?.drone_id || 'SD-D204',
                model: activeOrder?.cargo_type?.includes('MED') ? 'AeroViper M3' : 'Pelican X1 Heavy Cargo',
                lat: routeData.waypoints[2].lat,
                lng: routeData.waypoints[2].lng,
                battery_level: 82,
              }
            ]}
          />
        </div>


        {/* Overlay Card (Top Right): absolute top-4 right-4 bg-white/90 backdrop-blur p-4 rounded-lg shadow-lg */}
        <div className="absolute top-4 right-4 z-[500] bg-white/90 backdrop-blur-md p-4 rounded-lg shadow-lg border border-border/80 min-w-[240px] space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-status-delivered animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                ACTIVE DELIVERY
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-sky-900 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
              #{activeOrder?.order_id || 'SKD-2847'}
            </span>
          </div>

          <div className="border-t border-border pt-2 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-mono block uppercase">Status</span>
              <span className="font-semibold text-status-in_transit">
                {activeOrder?.delivery_status || 'IN_TRANSIT'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-mono block uppercase">ETA</span>
              <span className="font-mono font-bold text-status-delivered">
                12 min
              </span>
            </div>
            <div className="col-span-2 pt-1 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">Assigned Drone:</span>
              <span className="font-mono font-bold text-sky-900">{activeOrder?.drone_id || 'SD-D204'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Middle Section: Telemetry Highlights                                      */}
      {/* grid grid-cols-4 gap-4 mt-6 [Speed] [Altitude] [Battery %] [Current Status]*/}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {/* Speed */}
        <div className="bg-surface rounded-xl border border-border p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Speed</span>
            <Navigation className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-extrabold text-sky-900 font-mono">41 <span className="text-sm font-normal text-slate-500">kts</span></div>
          <p className="text-[11px] text-slate-500">Cruising corridor speed</p>
        </div>

        {/* Altitude */}
        <div className="bg-surface rounded-xl border border-border p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Altitude</span>
            <Zap className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-extrabold text-sky-900 font-mono">82 <span className="text-sm font-normal text-slate-500">m</span></div>
          <p className="text-[11px] text-slate-500">Corridor limit: 60m–120m</p>
        </div>

        {/* Battery % */}
        <div className="bg-surface rounded-xl border border-border p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Battery</span>
            <span className="w-2 h-2 rounded-full bg-status-delivered" />
          </div>
          <div className="text-2xl font-extrabold text-status-delivered font-mono">
            {activeDrone?.battery_level || 76}%
          </div>
          <p className="text-[11px] text-slate-500">Healthy discharge rate</p>
        </div>

        {/* Current Status */}
        <div className="bg-surface rounded-xl border border-border p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Status</span>
            <CheckCircle2 className="w-4 h-4 text-status-in_transit" />
          </div>
          <div className="text-xl font-bold text-sky-900 truncate">
            {activeOrder?.delivery_status || 'In Transit'}
          </div>
          <p className="text-[11px] text-slate-500">Airway Sector #4 active</p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Bottom Section: Order History                                             */}
      {/* mt-8 bg-surface rounded-xl border border-border p-6                       */}
      {/* Previous DeliveryOrder items (Date, Destination, Weight, Status)          */}
      {/* ========================================================================= */}
      <div className="mt-8 bg-surface rounded-xl border border-border p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-sky-900 font-sans">Order History</h2>
            <p className="text-xs text-slate-500 mt-0.5">Previous DeliveryOrder manifests and arrival records</p>
          </div>
          <Link to="/customer/orders" className="text-xs font-semibold text-sky-500 hover:text-sky-600 transition-colors">
            View All History →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-base border-b border-border text-xs font-mono text-slate-500 uppercase">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Weight</th>
                <th className="py-3 px-4">Drone</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentOrders.map((r) => (
                <tr key={r.order_id} className="hover:bg-base/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-sky-900">#{r.order_id}</td>
                  <td className="py-3.5 px-4 text-slate-600 text-xs">{formatDate(r.order_time)}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-900">{r.destination_label}</td>
                  <td className="py-3.5 px-4 font-mono text-xs">{r.total_weight_kg} kg</td>
                  <td className="py-3.5 px-4 font-mono text-xs text-sky-600">{r.drone_id}</td>
                  <td className="py-3.5 px-4 text-right">
                    <StatusBadge status={r.delivery_status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export function BookDeliveryPage() {
  return <CustomerPortalApp />;
}


export function LiveTrackingPage() {
  return <CustomerTracking />;
}

export function CustomerOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderService.getAll().then(setOrders);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Delivery Orders"
        subtitle="Full history of requested drone deliveries and airway manifests."
        breadcrumbs={[{ label: 'Dashboard', path: '/customer' }, { label: 'My Orders' }]}
      />
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
              <span className="font-semibold text-slate-900 text-xs">
                {r.product_name || 'Medical Consignment'}
              </span>
            ) 
          },
          { header: 'Order Time', accessor: 'order_time', render: (r) => <span className="text-slate-600 font-medium text-xs">{formatDate(r.order_time)}</span> },
          { header: 'Pickup Location', accessor: 'pickup_label', render: (r) => <span className="text-slate-900 font-medium text-xs">{r.pickup_label}</span> },
          { header: 'Destination', accessor: 'destination_label', render: (r) => <span className="text-slate-900 font-medium text-xs">{r.destination_label}</span> },
          { header: 'Drone ID', accessor: 'drone_id', render: (r) => <span className="font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">{r.drone_id}</span> },
          { header: 'Weight', accessor: 'total_weight_kg', render: (r) => <span className="font-mono font-semibold text-slate-800">{r.total_weight_kg} kg</span> },
          { header: 'Status', accessor: 'delivery_status', render: (r) => <StatusBadge status={r.delivery_status} /> },
        ]}
      />
    </div>
  );
}


export function CustomerProfilePage() {
  const { user, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+91 98401 23456');
  const [defaultLat, setDefaultLat] = useState(String(user?.default_lat || '12.9010'));
  const [defaultLong, setDefaultLong] = useState(String(user?.default_long || '80.2279'));
  const [selectedArea, setSelectedArea] = useState(user?.address_label || 'OMR Cyber Vale, Sholinganallur');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const areaPresets = [
    { name: 'OMR Cyber Vale, Sholinganallur', lat: '12.9010', long: '80.2279' },
    { name: 'Chennai Central Station Deck', lat: '13.0827', long: '80.2707' },
    { name: 'Guindy Industrial & Tech Hub', lat: '13.0067', long: '80.2025' },
    { name: 'Porur West Diagnostic Zone', lat: '13.0336', long: '80.1585' },
    { name: 'Anna Nagar West Residential Pad', lat: '13.0850', long: '80.2100' },
    { name: 'Adyar Coastal Tech Corridor', lat: '13.0033', long: '80.2550' },
  ];

  const handleAreaChange = (areaName) => {
    setSelectedArea(areaName);
    const found = areaPresets.find(a => a.name === areaName);
    if (found) {
      setDefaultLat(found.lat);
      setDefaultLong(found.long);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      phone,
      default_lat: parseFloat(defaultLat) || 12.9010,
      default_long: parseFloat(defaultLong) || 80.2279,
      address_label: selectedArea,
    });
    setSaveSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  const handleCancel = () => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setPhone(user?.phone || '+91 98401 23456');
    setDefaultLat(String(user?.default_lat || '12.9010'));
    setDefaultLong(String(user?.default_long || '80.2279'));
    setSelectedArea(user?.address_label || 'OMR Cyber Vale, Sholinganallur');
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Customer Profile & Address"
          subtitle="Manage default pickup coordinates and contact information."
          breadcrumbs={[{ label: 'Dashboard', path: '/customer' }, { label: 'Profile' }]}
        />
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="self-start sm:self-auto bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Edit Details</span>
          </button>
        )}
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Profile details and coordinates have been updated successfully!</span>
        </div>
      )}

      {isEditing ? (
        <Card className="p-8 bg-white border border-slate-200 shadow-md rounded-2xl">
          <form onSubmit={handleSave} className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Edit Profile & Coordinates</h3>
              <span className="text-xs text-slate-500 font-mono">Customer ID: {user?.id || 'CUST-001'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700 uppercase">Customer Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700 uppercase">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700 uppercase">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700 uppercase">Primary Drop Zone Preset</label>
                <select
                  value={selectedArea}
                  onChange={(e) => handleAreaChange(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  {areaPresets.map((a) => (
                    <option key={a.name} value={a.name}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800 block">Default GPS Coordinates</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-slate-500 block">LATITUDE (° N)</label>
                  <input
                    type="text"
                    value={defaultLat}
                    onChange={(e) => setDefaultLat(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs font-mono font-bold mt-1"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-500 block">LONGITUDE (° E)</label>
                  <input
                    type="text"
                    value={defaultLong}
                    onChange={(e) => setDefaultLong(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs font-mono font-bold mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition cursor-pointer"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        </Card>
      ) : (
        <Card className="p-8 space-y-6 bg-white border border-slate-200 shadow-sm rounded-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 font-mono font-bold uppercase block text-[10px]">Customer Name</span>
              <span className="text-sm font-bold text-slate-900 mt-1 block">{user?.name || 'Customer'}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 font-mono font-bold uppercase block text-[10px]">Email Address</span>
              <span className="text-sm font-bold text-slate-900 mt-1 block">{user?.email || '—'}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 font-mono font-bold uppercase block text-[10px]">Phone</span>
              <span className="text-sm font-bold font-mono text-slate-900 mt-1 block">{user?.phone || '+91 98401 23456'}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 font-mono font-bold uppercase block text-[10px]">Default Coordinates</span>
              <span className="text-sm font-mono font-bold text-sky-700 mt-1 block">
                {user?.default_lat || '12.9010'}, {user?.default_long || '80.2279'}
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs text-slate-500">
            <span>Primary Zone: <strong className="text-slate-800">{user?.address_label || 'OMR Cyber Vale, Sholinganallur'}</strong></span>
            <button
              onClick={() => setIsEditing(true)}
              className="text-slate-900 font-bold hover:underline cursor-pointer"
            >
              Edit Coordinates &amp; Details →
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}

export { CustomerTracking } from './CustomerTracking';
export { CustomerPortalApp } from './CustomerPortalApp';

