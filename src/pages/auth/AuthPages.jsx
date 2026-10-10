import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FormField } from '../../components/form/FormField';
import { Input } from '../../components/form/Input';
import { Plane, Lock, Mail, ShieldAlert, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function LoginPage() {
  const [role, setRole] = useState('customer'); // 'customer' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setError('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password, role);
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/customer');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-4 bg-slate-50 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md">
              <Plane className="h-5 w-5 text-sky-400 transform -rotate-12" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 font-sans">
              SKY<span className="text-sky-600">DROP</span>
            </span>
          </Link>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {role === 'admin' ? 'Flight Operations Sign In' : 'Customer Portal Sign In'}
          </h1>
          <p className="text-xs text-slate-600 font-medium">
            {role === 'admin' 
              ? 'Enter your ATC credentials to manage autonomous airspace' 
              : 'Sign in to schedule, track and manage your aerial deliveries'}
          </p>
        </div>

        {/* Role Toggle Selector */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-200/80 border border-slate-300 text-xs">
          <button
            type="button"
            onClick={() => handleRoleChange('customer')}
            className={`py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
              role === 'customer'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Customer Portal
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('admin')}
            className={`py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
              role === 'admin'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Flight Ops Controller
          </button>
        </div>

        {/* Login Card */}
        <Card className="p-8 bg-white border border-slate-200 shadow-xl rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
                <span className="font-semibold">{error}</span>
              </div>
            )}

            <FormField 
              label={role === 'admin' ? "Official Operations Email" : "Email Address"} 
              required
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
                placeholder={role === 'admin' ? "ops.control@skydrop.aero" : "Enter your email (e.g. name@gmail.com)"}
                required
              />
            </FormField>

            <FormField 
              label={role === 'admin' ? "Security Access Key" : "Password"} 
              required
            >
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={Lock}
                rightIcon={showPassword ? EyeOff : Eye}
                onRightIconClick={() => setShowPassword(!showPassword)}
                placeholder="••••••••"
                required
              />
            </FormField>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>
                  {loading 
                    ? 'Authenticating...' 
                    : role === 'admin' 
                      ? 'Sign In to Operations Control Panel →' 
                      : 'Sign In to Customer Dashboard →'
                  }
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500 font-medium">
            <span>Don't have an account? </span>
            <Link to="/register" className="text-slate-900 font-bold hover:underline">
              Create an account here →
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}


export function RegisterPage() {
  const [role, setRole] = useState('customer'); // 'customer' | 'admin'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedArea, setSelectedArea] = useState('OMR Cyber Vale, Sholinganallur');
  const [defaultLat, setDefaultLat] = useState('12.9010');
  const [defaultLong, setDefaultLong] = useState('80.2279');
  
  // Controller / Admin specific state
  const [stationHub, setStationHub] = useState('HUB-001 · Central Metro Operations Control Center (Chennai Central)');
  const [controllerLicense, setControllerLicense] = useState('');
  const [clearanceTier, setClearanceTier] = useState('Class B/C Urban Airway Supervisor');

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const areaPresets = [
    { name: 'OMR Cyber Vale, Sholinganallur', lat: '12.9010', long: '80.2279' },
    { name: 'Chennai Central Station Deck', lat: '13.0827', long: '80.2707' },
    { name: 'Guindy Industrial & Tech Hub', lat: '13.0067', long: '80.2025' },
    { name: 'Porur West Diagnostic Zone', lat: '13.0336', long: '80.1585' },
    { name: 'Anna Nagar West Residential Pad', lat: '13.0850', long: '80.2100' },
    { name: 'Adyar Coastal Tech Corridor', lat: '13.0033', long: '80.2550' },
  ];

  const stationPresets = [
    'HUB-001 · Central Metro Operations Control Center (Chennai Central)',
    'HUB-002 · Northside Emergency Medical Dispatch Station (Stanley Medical)',
    'HUB-003 · South Guindy Industrial Airway Terminal',
    'HUB-004 · OMR Regional Cyber UTM Control Tower',
    'SYS-HQ · DGCA Central Airspace Network Management HQ',
  ];

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setError('');
  };

  const handleAreaChange = (areaName) => {
    setSelectedArea(areaName);
    const found = areaPresets.find(a => a.name === areaName);
    if (found) {
      setDefaultLat(found.lat);
      setDefaultLong(found.long);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError(role === 'admin' ? 'Please enter the controller/officer name' : 'Please enter your full name');
      return;
    }
    if (!email.trim()) {
      setError(role === 'admin' ? 'Please enter your official operations email' : 'Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      if (role === 'admin') {
        await register({
          name: name.trim(),
          email: email.trim(),
          phone: phone || '+91 98409 88100',
          station_hub: stationHub,
          controller_license: controllerLicense.trim() || 'DGCA-UTM-IND-8842',
          clearance_tier: clearanceTier,
          address_label: stationHub,
          default_lat: 13.0827,
          default_long: 80.2707,
          password: password || 'admin123',
          role: 'admin',
        });
        navigate('/admin');
      } else {
        await register({
          name: name.trim(),
          email: email.trim(),
          phone: phone || '+91 98401 23456',
          default_lat: parseFloat(defaultLat) || 12.9010,
          default_long: parseFloat(defaultLong) || 80.2279,
          address_label: selectedArea,
          password: password || 'password123',
          role: 'customer',
        });
        navigate('/customer');
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-50 py-12">
      <div className="w-full max-w-lg space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md">
              <Plane className="h-5 w-5 text-sky-400 transform -rotate-12" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 font-sans">
              SKY<span className="text-sky-600">DROP</span>
            </span>
          </Link>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {role === 'admin' ? 'Create Flight Controller Credential' : 'Create Customer Account'}
          </h1>
          <p className="text-xs text-slate-600 font-medium">
            {role === 'admin'
              ? 'Air traffic dispatch, fleet deconfliction & DGCA airspace management'
              : 'Join the autonomous urban airspace logistics network'}
          </p>
        </div>

        {/* Role Toggle Selector */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-200/80 border border-slate-300 text-xs">
          <button
            type="button"
            onClick={() => handleRoleChange('customer')}
            className={`py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
              role === 'customer'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Customer Account
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('admin')}
            className={`py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
              role === 'admin'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Flight Ops Controller
          </button>
        </div>

        {/* Register Card */}
        <Card className="p-8 bg-white border border-slate-200 shadow-xl rounded-3xl">
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
                <span className="font-semibold">{error}</span>
              </div>
            )}

            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField 
                label={role === 'admin' ? "Controller / Officer Name" : "Full Name"} 
                required
              >
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={role === 'admin' ? "e.g. Capt. Rajesh Varma" : "Enter your full name"}
                  required
                />
              </FormField>

              <FormField 
                label={role === 'admin' ? "Official Operations Email" : "Email Address"} 
                required
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={Mail}
                  placeholder={role === 'admin' ? "ops.controller@skydrop.aero" : "name@gmail.com"}
                  required
                />
              </FormField>
            </div>

            {/* Row 2: Phone & Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField 
                label={role === 'admin' ? "Dispatch Direct Line" : "Phone Number"}
              >
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={role === 'admin' ? "+91 98409 88100" : "+91 98401 23456"}
                />
              </FormField>

              <FormField 
                label={role === 'admin' ? "Access Security Key" : "Password"} 
                required
              >
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={Lock}
                  rightIcon={showPassword ? EyeOff : Eye}
                  onRightIconClick={() => setShowPassword(!showPassword)}
                  placeholder="••••••••"
                  required
                />
              </FormField>
            </div>

            {/* ================================================================= */}
            {/* ROLE-SPECIFIC SECTION: CUSTOMER DELIVERY ZONE vs CONTROLLER STATION */}
            {/* ================================================================= */}
            {role === 'customer' ? (
              /* CUSTOMER SECTION: Primary Delivery Zone & Coordinates */
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Primary Delivery Zone & Coordinates</span>
                  <span className="text-[10px] font-mono text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                    Sub-meter GPS
                  </span>
                </div>

                <select
                  value={selectedArea}
                  onChange={(e) => handleAreaChange(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-2xs cursor-pointer"
                >
                  {areaPresets.map((a) => (
                    <option key={a.name} value={a.name}>
                      {a.name} ({a.lat}° N, {a.long}° E)
                    </option>
                  ))}
                </select>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">LATITUDE</span>
                    <span className="font-bold text-slate-900">{defaultLat}° N</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">LONGITUDE</span>
                    <span className="font-bold text-slate-900">{defaultLong}° E</span>
                  </div>
                </div>
              </div>
            ) : (
              /* FLIGHT OPS CONTROLLER SECTION: Assigned Station & DGCA License */
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Assigned ATC Station &amp; UTM Authorization</span>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    DGCA UTM Certified
                  </span>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-600 block mb-1">
                    Assigned Air Traffic Control Station / Hub
                  </label>
                  <select
                    value={stationHub}
                    onChange={(e) => setStationHub(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-2xs cursor-pointer"
                  >
                    {stationPresets.map((station) => (
                      <option key={station} value={station}>
                        {station}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 block mb-1">
                      DGCA UTM License / Badge ID
                    </label>
                    <input
                      type="text"
                      value={controllerLicense}
                      onChange={(e) => setControllerLicense(e.target.value)}
                      placeholder="e.g. DGCA-UTM-IND-8842"
                      className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-2xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 block mb-1">
                      Airspace Authorization Tier
                    </label>
                    <select
                      value={clearanceTier}
                      onChange={(e) => setClearanceTier(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-2xs cursor-pointer"
                    >
                      <option value="Class B/C Urban Airway Supervisor">Class B/C Urban Airway Supervisor</option>
                      <option value="Emergency Medical Rapid Dispatcher">Emergency Medical Rapid Dispatcher</option>
                      <option value="Senior Fleet Operations Director">Senior Fleet Operations Director</option>
                      <option value="Airspace Safety & Deconfliction Officer">Airspace Safety &amp; Deconfliction Officer</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>
                  {loading 
                    ? 'Creating Account...' 
                    : role === 'admin' 
                      ? 'Initialize Controller Clearance & Dashboard →' 
                      : 'Complete Customer Registration & Sign In →'
                  }
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500 font-medium">
            <span>Already have an account? </span>
            <Link to="/login" className="text-slate-900 font-bold hover:underline">
              Sign in here
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}



