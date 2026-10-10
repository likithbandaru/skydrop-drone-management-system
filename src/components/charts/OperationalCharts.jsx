import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

const CUSTOM_COLORS = {
  emerald: '#10B981',
  sky: '#0EA5E9',
  amber: '#F59E0B',
  rose: '#EF4444',
  slate: '#64748B',
  darkSlate: '#1E293B',
};

// 1. Drone Status Distribution Donut Chart
export function DroneStatusChart({ drones = [] }) {
  const statusCounts = drones.reduce((acc, d) => {
    acc[d.operational_status] = (acc[d.operational_status] || 0) + 1;
    return acc;
  }, {});

  const data = [
    { name: 'Available', value: statusCounts['AVAILABLE'] || 2, color: CUSTOM_COLORS.emerald },
    { name: 'In Flight', value: statusCounts['IN_FLIGHT'] || 1, color: CUSTOM_COLORS.sky },
    { name: 'Charging', value: statusCounts['CHARGING'] || 1, color: CUSTOM_COLORS.amber },
    { name: 'Maintenance', value: statusCounts['MAINTENANCE'] || 1, color: CUSTOM_COLORS.rose },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Drone Fleet Availability</CardTitle>
      </CardHeader>
      <CardContent className="h-64 flex flex-col items-center justify-center">
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
              stroke="#0F172A"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                borderColor: '#334155',
                borderRadius: '8px',
                color: '#F8FAFC',
                fontSize: '12px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span>{item.name} ({item.value})</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// 2. Battery Health Distribution Chart
export function BatteryHealthChart({ cycles = [] }) {
  const data = [
    { range: '90-100%', count: 3, label: 'Optimal' },
    { range: '80-89%', count: 1, label: 'Good' },
    { range: '70-79%', count: 1, label: 'Attention' },
    { range: '<70%', count: 0, label: 'Critical' },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Battery Cell Health Tiers</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis dataKey="range" stroke="#64748B" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748B" fontSize={11} tickLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                borderColor: '#334155',
                borderRadius: '8px',
                color: '#F8FAFC',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="count" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// 3. Order Activity Timeline Area Chart
export function OrderActivityChart() {
  const data = [
    { time: '08:00', orders: 1 },
    { time: '09:00', orders: 3 },
    { time: '10:00', orders: 5 },
    { time: '11:00', orders: 8 },
    { time: '12:00', orders: 12 },
    { time: '13:00', orders: 9 },
    { time: '14:00', orders: 6 },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Daily Airway Flight Throughput</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis dataKey="time" stroke="#64748B" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                borderColor: '#334155',
                borderRadius: '8px',
                color: '#F8FAFC',
                fontSize: '12px',
              }}
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#38BDF8"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#orderGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
