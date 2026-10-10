import React, { useState } from 'react';
import { 
  LayoutDashboard, Plane, MapPin, Route, Battery, 
  Settings, Activity, AlertCircle, CheckCircle2, Box, Thermometer 
} from 'lucide-react';
import { mockDrones, mockHubs, mockWaypointLogs } from '../../data/adminMockData';
import { useAuth } from '../../context/AuthContext';

export function AdminPortal() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white text-slate-800 flex flex-col z-20 shadow-xs border-r border-slate-200">
        <div className="h-16 flex items-center px-6 border-b border-slate-100 bg-white">
          <Plane className="mr-3 text-sky-600" />
          <span className="font-bold text-lg tracking-tight text-slate-900 font-sans">SkyDrop Ops</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1.5">
          <NavItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard size={18}/>} label="Command Center" />
          <NavItem active={activeTab === 'drones'} onClick={() => setActiveTab('drones')} icon={<Plane size={18}/>} label="Drone Fleet" />
          <NavItem active={activeTab === 'hubs'} onClick={() => setActiveTab('hubs')} icon={<MapPin size={18}/>} label="Hub Infrastructure" />
          <NavItem active={activeTab === 'corridors'} onClick={() => setActiveTab('corridors')} icon={<Route size={18}/>} label="Flight Corridors" />
        </nav>
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'AD'}
          </div>
          <div className="text-xs overflow-hidden">
            <p className="font-bold text-slate-900 truncate">{user?.name || 'Flight Controller'}</p>
            <p className="text-sky-600 font-mono text-[10px] font-semibold truncate">{user?.email || 'Airspace Admin'}</p>
          </div>
        </div>
      </aside>


      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
          <h1 className="text-xl font-bold text-slate-800 capitalize">
            {activeTab.replace('-', ' ')}
          </h1>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              <Activity size={16} /> System Operational
            </span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'dashboard' && <CommandCenter />}
          {activeTab === 'drones' && <DronesTable />}
          {activeTab === 'hubs' && <HubsTable />}
          {activeTab === 'corridors' && <CorridorsPlaceholder />}
        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function CommandCenter() {
  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-4 gap-6">
        <KpiCard title="Active Flights" value="12" subtext="4 Medical, 8 Cargo" color="text-sky-600" />
        <KpiCard title="Fleet Readiness" value="84%" subtext="42/50 Drones Available" color="text-emerald-600" />
        <KpiCard title="Total Hub Capacity" value="78%" subtext="14 slots remaining" color="text-indigo-600" />
        <KpiCard title="System Alerts" value="1" subtext="1 Drone in Maintenance" color="text-amber-500" />
      </div>

      <div className="grid grid-cols-3 gap-6 h-[500px]">
        {/* Map Placeholder */}
        <div className="col-span-2 bg-slate-200 rounded-xl border border-slate-300 flex items-center justify-center relative overflow-hidden shadow-sm">
          <MapPin size={48} className="text-slate-400 opacity-50" />
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-3 rounded-lg text-sm shadow-md">
            <p className="font-bold text-slate-800 mb-1">Live Airspace Map</p>
            <p className="text-slate-500">Showing Hubs and Active Flight Corridors</p>
          </div>
        </div>

        {/* Live Waypoint Log Feed (Demonstrating Weak Entity) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Live Waypoint Logs</h3>
            <Activity size={18} className="text-sky-500 animate-pulse" />
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockWaypointLogs.map((log, i) => (
              <div key={i} className="flex gap-3 text-sm border-b border-slate-100 pb-3 last:border-0">
                <div className="text-slate-400 font-mono mt-0.5">{log.time}</div>
                <div>
                  <p className="font-medium text-slate-800 font-mono">{log.orderId}</p>
                  <p className="text-slate-500 text-xs mt-1">
                    Alt: {log.alt}m | Spd: {log.speed}km/h | Seq: #{log.seq}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DronesTable() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Flight': return 'text-sky-600 bg-sky-50';
      case 'Charging': return 'text-amber-600 bg-amber-50';
      case 'Maintenance': return 'text-red-600 bg-red-50';
      default: return 'text-emerald-600 bg-emerald-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center">
        <h2 className="font-bold text-lg text-slate-800">Fleet Management</h2>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 font-medium">Drone ID</th>
            <th className="px-6 py-4 font-medium">Specialization</th>
            <th className="px-6 py-4 font-medium">Hub</th>
            <th className="px-6 py-4 font-medium">Battery</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {mockDrones.map((drone) => (
            <tr key={drone.droneId} className="hover:bg-slate-50">
              <td className="px-6 py-4">
                <p className="font-bold text-slate-800 font-mono">{drone.droneId}</p>
                <p className="text-xs text-slate-500">{drone.model}</p>
              </td>
              <td className="px-6 py-4">
                {drone.type === 'MedicalRapidDrone' ? (
                  <div className="flex items-center gap-1.5 text-rose-600 font-medium">
                    <Thermometer size={14} /> <span>Medical</span> ({drone.tempControlRange})
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-sky-700 font-medium">
                    <Box size={14} /> <span>Cargo</span> ({drone.maxVolume})
                  </div>
                )}
              </td>
              <td className="px-6 py-4 font-medium text-slate-600 font-mono">{drone.currentHub}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Battery size={16} className={drone.batteryLevel < 20 ? "text-red-500" : "text-emerald-500"} />
                  <span className="font-medium font-mono">{drone.batteryLevel}%</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full font-medium text-xs ${getStatusColor(drone.status)}`}>
                  {drone.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                {/* Clicking this opens the DroneBatteryCycle weak entity modal */}
                <button className="text-sky-600 hover:text-sky-800 font-medium text-xs">
                  View Cycles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HubsTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 font-medium">Hub ID / Name</th>
            <th className="px-6 py-4 font-medium">Location</th>
            <th className="px-6 py-4 font-medium">Capacity Utilized</th>
            <th className="px-6 py-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {mockHubs.map((hub) => (
            <tr key={hub.hubId} className="hover:bg-slate-50">
              <td className="px-6 py-4">
                <p className="font-bold text-slate-800 font-mono">{hub.hubId}</p>
                <p className="text-xs text-slate-500">{hub.name}</p>
              </td>
              <td className="px-6 py-4 font-medium text-slate-600">{hub.location}</td>
              <td className="px-6 py-4">
                <div className="w-full bg-slate-200 rounded-full h-2.5 max-w-[150px] mb-1">
                  <div className="bg-sky-500 h-2.5 rounded-full" style={{ width: `${(hub.activeDrones / hub.capacity) * 100}%` }}></div>
                </div>
                <span className="text-xs text-slate-500">{hub.activeDrones} of {hub.capacity} docks active</span>
              </td>
              <td className="px-6 py-4">
                <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                  <CheckCircle2 size={14} /> {hub.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CorridorsPlaceholder() {
  return (
    <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm text-center">
      <Route size={40} className="text-sky-500 mx-auto mb-3" />
      <h3 className="font-bold text-slate-800 text-lg">Flight Corridors Management</h3>
      <p className="text-slate-500 text-sm mt-1">
        Corridor entity management with altitude restrictions and geofenced exclusion buffer zones.
      </p>
    </div>
  );
}

function NavItem({ active, icon, label, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-xs font-semibold ${
        active ? 'bg-sky-50 text-sky-700 font-bold border border-sky-200/80 shadow-2xs' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <span className={active ? 'text-sky-600' : 'text-slate-400'}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}


function KpiCard({ title, value, subtext, color }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-slate-500 text-sm font-medium mb-2">{title}</h3>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      <p className="text-slate-400 text-xs mt-2">{subtext}</p>
    </div>
  );
}

export default AdminPortal;
