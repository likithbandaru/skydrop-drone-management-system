import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plane, 
  User, 
  LogOut, 
  Thermometer, 
  Box, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Navigation, 
  Radio, 
  ShieldCheck, 
  Zap, 
  Clock, 
  MapPin, 
  Layers, 
  Check, 
  Sparkles,
  AlertCircle,
  Wind,
  Compass,
  Building2,
  Bell,
  X,
  FileText,
  ExternalLink,
  CreditCard,
  Smartphone,
  Banknote,
  Lock,
  Loader2
} from 'lucide-react';

import { formatDate } from '../../lib/utils';
import { mockActiveDelivery, mockHubs, mockCorridors, mockDrones } from '../../data/mockData';
import { MapView } from '../../components/map/MapView';
import { orderService } from '../../services/orderService';
import { ALL_HUBS, generateFlightRoute, parseDestination, getHubData } from '../../lib/routeUtils';
import { useAuth } from '../../context/AuthContext';



// Hub Configuration & Destination Coordinates Map
const HUB_CONFIG = {
  'Central Metro Hub': {
    hubId: 'HUB-001',
    location: 'Chennai Central Station Heli-Deck (13.0827° N, 80.2707° E)',
    dockingSlots: '8 / 12',
    defaultDest: '12.9010° N, 80.2279° E · OMR Cyber Vale, Sholinganallur',
    defaultCorridor: 'COR-01',
    destinations: [
      '12.9010° N, 80.2279° E · OMR Cyber Vale, Sholinganallur',
      '13.0405° N, 80.2503° E · T. Nagar Commercial Corridor',
      '13.0850° N, 80.2100° E · Anna Nagar West Residence Pad',
      '12.9800° N, 80.2450° E · Adyar Coastal Hub LZ',
    ],
    corridors: [
      { id: 'COR-01', name: 'COR-01 · Central-OMR Airway Expressway', badge: 'Optimal', details: 'Altitude: 82m | Cruise Speed: 41 kts | Turbulence: Zero | ETA: 12 min' },
      { id: 'COR-02', name: 'COR-02 · Central-Adyar Vector', badge: 'Alternate', details: 'Altitude: 95m | Cruise Speed: 38 kts | Wind: 8 kts W | ETA: 15 min' },
    ]
  },
  'Northside Medical Hub': {
    hubId: 'HUB-002',
    location: 'Stanley Medical College Complex (13.1075° N, 80.2870° E)',
    dockingSlots: '5 / 8',
    defaultDest: '13.0336° N, 80.1585° E · Porur Diagnostic Center & Multi-Specialty',
    defaultCorridor: 'COR-03',
    destinations: [
      '13.0336° N, 80.1585° E · Porur Diagnostic Center & Multi-Specialty',
      '13.0110° N, 80.2210° E · Apollo Speciality Hospital OMR',
      '12.9915° N, 80.2170° E · Guindy Emergency Trauma Clinic',
      '13.1190° N, 80.2800° E · Royapuram Coastal Health Center',
    ],
    corridors: [
      { id: 'COR-03', name: 'COR-03 · Northside-Porur Medical Express', badge: 'Optimal (Priority)', details: 'Altitude: 75m | Cruise Speed: 52 kts | Cold-Chain Active | ETA: 8 min' },
      { id: 'COR-06', name: 'COR-06 · Northside-Guindy Vector', badge: 'Alternate', details: 'Altitude: 88m | Cruise Speed: 45 kts | Wind: 6 kts E | ETA: 11 min' },
    ]
  },
  'Guindy Industrial Hub': {
    hubId: 'HUB-003',
    location: 'Guindy Industrial Estate Sector 4 (13.0067° N, 80.2025° E)',
    dockingSlots: '6 / 10',
    defaultDest: '13.0033° N, 80.2550° E · Gandhi Nagar, Adyar Airway Node',
    defaultCorridor: 'COR-02',
    destinations: [
      '13.0033° N, 80.2550° E · Gandhi Nagar, Adyar Airway Node',
      '12.9750° N, 80.2200° E · Velachery Transit Zone 2',
      '13.0500° N, 80.2120° E · Vadapalani Tech Hub Pad',
      '12.9240° N, 80.1270° E · Tambaram Industrial Gateway',
    ],
    corridors: [
      { id: 'COR-02', name: 'COR-02 · Guindy-Adyar Coastal Vector', badge: 'Optimal', details: 'Altitude: 80m | Cruise Speed: 40 kts | Turbulence: Zero | ETA: 6 min' },
      { id: 'COR-05', name: 'COR-05 · Guindy-Vadapalani Corridor', badge: 'Alternate', details: 'Altitude: 90m | Cruise Speed: 36 kts | Wind: 7 kts SW | ETA: 9 min' },
    ]
  },
  'OMR Cyber Tech Hub': {
    hubId: 'HUB-004',
    location: 'Sholinganallur IT Expressway (12.9010° N, 80.2279° E)',
    dockingSlots: '9 / 14',
    defaultDest: '12.8340° N, 80.2200° E · Siruseri SIPCOT Tech Park Hub',
    defaultCorridor: 'COR-04',
    destinations: [
      '12.8340° N, 80.2200° E · Siruseri SIPCOT Tech Park Hub',
      '12.9200° N, 80.2300° E · Thoraipakkam Innovation Hub',
      '12.9700° N, 80.2500° E · Perungudi Data Center Landing LZ',
      '12.8700° N, 80.2180° E · Navalur Residential High-Rise Rooftop',
    ],
    corridors: [
      { id: 'COR-04', name: 'COR-04 · OMR-Siruseri High-Speed Airway', badge: 'Optimal', details: 'Altitude: 85m | Cruise Speed: 44 kts | Clear Airspace | ETA: 7 min' },
      { id: 'COR-01', name: 'COR-01 · OMR-Central Airway Vector', badge: 'Alternate', details: 'Altitude: 82m | Cruise Speed: 41 kts | Wind: 5 kts NE | ETA: 12 min' },
    ]
  }
};

export function CustomerPortalApp() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'history' | 'cartography'
  
  // Booking Stepper State
  const [currentStep, setCurrentStep] = useState(1);
  const [productCategory, setProductCategory] = useState('Emergency Blood Units & Plasma (O-Negative)');
  const [customProductName, setCustomProductName] = useState('');
  const [pickupHub, setPickupHub] = useState('Central Metro Hub');
  const [destination, setDestination] = useState(HUB_CONFIG['Central Metro Hub'].defaultDest);
  const [weight, setWeight] = useState(2.4);
  const [cargoType, setCargoType] = useState('medical'); // 'medical' | 'cargo'
  const [selectedCorridor, setSelectedCorridor] = useState('COR-01');
  const [orderDispatched, setOrderDispatched] = useState(false);
  const [dispatchedOrder, setDispatchedOrder] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // Simulated Payment Gateway State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' | 'CARD' | 'COD'
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccessData, setPaymentSuccessData] = useState(null);
  const [pendingCreatedOrder, setPendingCreatedOrder] = useState(null);

  const baseDeliveryCharge = cargoType === 'medical' ? 121 : 85;
  const weightServiceCharge = Math.round(weight * 20);
  const totalPaymentAmount = baseDeliveryCharge + weightServiceCharge;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Persistent Orders list for Order History tab
  const [ordersList, setOrdersList] = useState([]);

  // Load persistent orders on mount
  useEffect(() => {
    orderService.getAll().then((res) => {
      setOrdersList(
        res.map((o) => ({
          id: o.order_id,
          time: o.order_time ? formatDate(o.order_time) : 'Just now',
          pickup: o.pickup_label,
          dest: o.destination_label,
          product: o.product_name || 'Medical Supply',
          drone: o.drone_id,
          weight: `${o.total_weight_kg} kg`,
          status: o.delivery_status === 'DELIVERED' ? 'Delivered' : 'In Transit',
        }))
      );
    });
  }, []);

  const previewOrderId = useMemo(() => {
    if (pendingCreatedOrder?.order_id) return pendingCreatedOrder.order_id;
    if (ordersList.length > 0) {
      const maxId = Math.max(...ordersList.map((o) => Number(o.id) || 1000));
      return maxId + 1;
    }
    return 1001;
  }, [pendingCreatedOrder, ordersList]);

  const activeHubInfo = HUB_CONFIG[pickupHub] || HUB_CONFIG['Central Metro Hub'];

  // Dynamically compute the exact flight corridor, waypoints, and midpoint between the selected pickup hub and destination
  const activeFlightRoute = useMemo(() => {
    return generateFlightRoute(pickupHub, destination);
  }, [pickupHub, destination]);

  const handleHubChange = (newHub) => {
    setPickupHub(newHub);
    const config = HUB_CONFIG[newHub];
    if (config) {
      setDestination(config.defaultDest);
      setSelectedCorridor(config.defaultCorridor);
    }
  };

  const finalizeOrderDispatch = async (createdOrder) => {
    const finalProductName = customProductName.trim() || productCategory;
    setShowPaymentModal(false);
    setDispatchedOrder(createdOrder);
    setOrderDispatched(true);
    setShowToast(true);

    const allOrders = await orderService.getAll();
    setOrdersList(
      allOrders.map((o) => ({
        id: o.order_id,
        time: o.order_time ? formatDate(o.order_time) : 'Just now',
        pickup: o.pickup_label,
        dest: o.destination_label,
        product: o.product_name || finalProductName,
        drone: o.drone_id,
        weight: `${o.total_weight_kg} kg`,
        status: o.delivery_status === 'DELIVERED' ? 'Delivered' : 'In Transit',
      }))
    );
  };

  const handleProcessPayment = async (e) => {
    e.preventDefault();
    setPaymentError('');

    if (paymentMethod === 'UPI' && !upiId.trim()) {
      setPaymentError('Please enter a valid UPI ID (e.g. name@upi)');
      return;
    }
    if (paymentMethod === 'CARD') {
      if (!cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim() || !cardHolder.trim()) {
        setPaymentError('Please fill in all card details');
        return;
      }
    }

    setIsProcessingPayment(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      // 1. Create the order using existing order creation logic
      const finalProductName = customProductName.trim() || productCategory;
      const newOrderPayload = {
        order_id: `SKD-${Math.floor(1000 + Math.random() * 9000)}`,
        customer_id: user?.id || (user?.customer_id ? `CUST-${user.customer_id}` : 'CUST-101'),
        order_time: new Date().toISOString(),
        pickup_label: pickupHub,
        pickup_lat: activeFlightRoute.origin.lat,
        pickup_lng: activeFlightRoute.origin.lng,
        destination_label: activeFlightRoute.dest.label,
        destination_lat: activeFlightRoute.dest.lat,
        destination_lng: activeFlightRoute.dest.lng,
        product_name: finalProductName,
        drone_id: cargoType === 'medical' ? 'SD-VIP-042' : 'SD-D204',
        total_weight_kg: weight,
        cargo_type: cargoType === 'medical' ? 'MEDICAL_RAPID' : 'STANDARD_CARGO',
        corridor_id: selectedCorridor,
        delivery_status: 'IN_TRANSIT',
      };

      const created = pendingCreatedOrder || await orderService.create(newOrderPayload);
      if (!pendingCreatedOrder) {
        setPendingCreatedOrder(created);
      }

      // 2. Record payment in Oracle PAYMENT_TRANSACTION table
      const paymentRes = await orderService.createPayment({
        order_id: created.order_id,
        amount: totalPaymentAmount,
        payment_method: paymentMethod,
      });

      setPaymentSuccessData(paymentRes.payment);
    } catch (err) {
      setPaymentError(err.message || 'Payment processing failed');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleNextStep = async () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Open simulated payment checkout before dispatching drone
      setPaymentError('');
      setPaymentSuccessData(null);
      setPendingCreatedOrder(null);
      setShowPaymentModal(true);
    }
  };


  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };



  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 flex flex-col selection:bg-sky-500 selection:text-white">
      
      {/* ========================================================================= */}
      {/* GLOBAL SHELL: NAVBAR (Fixed, 64px Height, Styled Exactly as Specified)   */}
      {/* ========================================================================= */}
      <nav className="fixed top-0 left-0 w-full h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-50 shadow-xs">
        
        {/* Left: Dark blue drone icon + "SKYDROP" in bold */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
            <Plane className="w-5 h-5 text-sky-400 transform -rotate-12" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900 font-sans">
            SKYDROP
          </span>
        </Link>

        {/* Center: Tabs (text-sm font-medium) */}
        <div className="hidden md:flex items-center gap-2 text-sm font-medium">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-sky-50 text-sky-700 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Active Tracking &amp; Dashboard
          </button>
          
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
              activeTab === 'history'
                ? 'bg-sky-50 text-sky-700 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Order History
          </button>
          
          <button
            onClick={() => setActiveTab('cartography')}
            className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
              activeTab === 'cartography'
                ? 'bg-sky-50 text-sky-700 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Airway Cartography
          </button>
        </div>

        {/* Right: Flex gap. [+ New Order] + [User Profile] + [Logout Icon] */}
        <div className="flex items-center gap-3">
          {/* Solid button "+ New Order" */}
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setCurrentStep(1);
              setOrderDispatched(false);
            }}
            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span>+ New Order</span>
          </button>

          {/* User profile button */}
          <div className="border border-slate-200 bg-white px-4 py-2 rounded-full flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 shadow-2xs">
            <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
              <User className="w-3.5 h-3.5 text-sky-600" />
            </div>
            <Link
              to="/customer/profile"
              title={user?.email || 'View Profile'}
              className="hidden sm:inline font-semibold text-slate-800 hover:text-sky-700 transition-colors"
            >
              {user?.name || 'Customer'}
            </Link>
            
            {/* Logout icon */}
            <button
              type="button"
              onClick={handleLogout}
              title="Logout"
              className="ml-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </nav>

      {/* ========================================================================= */}
      {/* FLOATING BOOKING NOTIFICATION TOAST (User Request: Booking Alert)        */}
      {/* ========================================================================= */}
      {showToast && dispatchedOrder && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 max-w-md w-[calc(100%-2rem)] sm:w-96 bg-white border-2 border-emerald-500 rounded-2xl p-4 shadow-2xl animate-in slide-in-from-top-4 duration-300 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
            <Bell className="w-5 h-5 text-emerald-600 animate-bounce" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Order Booked &amp; Dispatched!
              </span>
              <button 
                onClick={() => setShowToast(false)} 
                className="text-slate-400 hover:text-slate-700 p-0.5 rounded-md hover:bg-slate-100 transition cursor-pointer"
                title="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs font-black text-slate-900 leading-snug">
              #{dispatchedOrder.order_id} · {dispatchedOrder.product_name}
            </p>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Airframe <strong>{dispatchedOrder.drone_id}</strong> cleared for autonomous departure to {dispatchedOrder.destination_label}.
            </p>
            <div className="pt-2 flex items-center gap-3 border-t border-slate-100 text-xs">
              <Link 
                to="/customer/tracking" 
                className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1 font-mono"
              >
                <span>Track Live Telemetry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MAIN LAYOUT (Grid underneath navbar: pt-24 px-8 max-w-[1600px] mx-auto)  */}
      {/* ========================================================================= */}

      <main className="flex-1 pt-24 px-4 sm:px-8 pb-12 max-w-[1600px] mx-auto w-full">
        
        {/* ======================================================================= */}
        {/* TAB 1: MAIN DASHBOARD & 5-STEP BOOKING ENGINE (Default)                 */}
        {/* ======================================================================= */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* =================================================================== */}
            {/* COLUMN 1 & 2: THE 5-STEP BOOKING ENGINE (Fully coded, no blanks)    */}
            {/* =================================================================== */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 flex flex-col justify-between">
              
              {/* Header */}
              <div>
                {/* Breadcrumb */}
                <div className="text-slate-400 text-sm font-medium flex items-center gap-1.5">
                  <Link to="/" className="hover:text-slate-700">Home</Link>
                  <span>&gt;</span>
                  <span className="hover:text-slate-700">Dashboard</span>
                  <span>&gt;</span>
                  <span className="text-slate-600 font-semibold">Book Delivery</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">
                  Book Drone Delivery
                </h1>

                {/* Subtitle */}
                <p className="text-slate-500 text-sm mb-8 mt-1 font-normal">
                  Multi-step parcel booking with automated drone assignment &amp; corridor routing.
                </p>

                {/* Stepper UI: Horizontal flex row of 4 steps */}
                <div className="flex items-center justify-between w-full max-w-2xl py-2">
                  
                  {/* Step 1 */}
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-xs ${
                      currentStep === 1 
                        ? 'bg-slate-900 text-white ring-4 ring-slate-100' 
                        : currentStep > 1 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      {currentStep > 1 ? <Check className="w-4 h-4 stroke-[3]" /> : '1'}
                    </div>
                    <span className={`text-sm font-semibold ${currentStep === 1 ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                      Parcel Details
                    </span>
                  </div>

                  {/* Line Divider 1 */}
                  <div className={`flex-1 h-0.5 mx-3 ${currentStep > 1 ? 'bg-emerald-400' : 'bg-slate-200'}`} />

                  {/* Step 2 */}
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-xs ${
                      currentStep === 2 
                        ? 'bg-slate-900 text-white ring-4 ring-slate-100' 
                        : currentStep > 2 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      {currentStep > 2 ? <Check className="w-4 h-4 stroke-[3]" /> : '2'}
                    </div>
                    <span className={`text-sm font-semibold ${currentStep === 2 ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                      Routing
                    </span>
                  </div>

                  {/* Line Divider 2 */}
                  <div className={`flex-1 h-0.5 mx-3 ${currentStep > 2 ? 'bg-emerald-400' : 'bg-slate-200'}`} />

                  {/* Step 3 */}
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-xs ${
                      currentStep === 3 
                        ? 'bg-slate-900 text-white ring-4 ring-slate-100' 
                        : currentStep > 3 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      {currentStep > 3 ? <Check className="w-4 h-4 stroke-[3]" /> : '3'}
                    </div>
                    <span className={`text-sm font-semibold ${currentStep === 3 ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                      Drone Assign
                    </span>
                  </div>

                  {/* Line Divider 3 */}
                  <div className={`flex-1 h-0.5 mx-3 ${currentStep > 3 ? 'bg-emerald-400' : 'bg-slate-200'}`} />

                  {/* Step 4 */}
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-xs ${
                      currentStep === 4 
                        ? 'bg-slate-900 text-white ring-4 ring-slate-100' 
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      4
                    </div>
                    <span className={`text-sm font-semibold ${currentStep === 4 ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                      Confirm
                    </span>
                  </div>

                </div>

                {/* =============================================================== */}
                {/* STEP 1: PARCEL DETAILS (Product Name, Hubs, Coords, Weight, Cargo)*/}
                {/* =============================================================== */}
                {currentStep === 1 && (
                  <div className="mt-8 space-y-6">
                    
                    {/* SECTION A: PRODUCT & PARCEL DESCRIPTION (User Request) */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-slate-700" />
                          <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                            Product &amp; Parcel Specification
                          </label>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                          Manifest Required
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Product Category Preset Dropdown */}
                        <div className="flex flex-col gap-1.5">
                          <span className="text-xs font-semibold text-slate-700">Product Preset Category</span>
                          <select
                            value={productCategory}
                            onChange={(e) => {
                              setProductCategory(e.target.value);
                              if (e.target.value.toLowerCase().includes('medical') || e.target.value.toLowerCase().includes('blood') || e.target.value.toLowerCase().includes('vaccine')) {
                                setCargoType('medical');
                              } else {
                                setCargoType('cargo');
                              }
                            }}
                            className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all shadow-2xs"
                          >
                            <option value="Emergency Blood Units & Plasma (O-Negative)">Emergency Blood Units &amp; Plasma (O-Negative)</option>
                            <option value="Pathology Diagnostic Lab Biopsy Sample">Pathology Diagnostic Lab Biopsy Sample</option>
                            <option value="Cardiac ECG Sensor Diagnostic Kit">Cardiac ECG Sensor Diagnostic Kit</option>
                            <option value="Anti-Venom & Pediatric Cold-Chain Vaccines">Anti-Venom &amp; Pediatric Cold-Chain Vaccines</option>
                            <option value="Critical Server Microchip & Industrial Hardware">Critical Server Microchip &amp; Industrial Hardware</option>
                            <option value="Confidential Legal Contracts & Blueprints">Confidential Legal Contracts &amp; Blueprints</option>
                            <option value="Custom Parcel Item">Custom Parcel Item...</option>
                          </select>
                        </div>

                        {/* Custom Product Title / Name Input */}
                        <div className="flex flex-col gap-1.5">
                          <span className="text-xs font-semibold text-slate-700">Custom Item Name / Notes</span>
                          <input
                            type="text"
                            placeholder="e.g., 2x Packed Red Blood Cells (Unit #B-902)"
                            value={customProductName}
                            onChange={(e) => setCustomProductName(e.target.value)}
                            className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all shadow-2xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION B: PICKUP & DESTINATION COORDINATES */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Field 1: Pickup Hub (Select dropdown) */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                          <span>Pickup Hub</span>
                          <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                            {activeHubInfo.hubId}
                          </span>
                        </label>
                        <select
                          value={pickupHub}
                          onChange={(e) => handleHubChange(e.target.value)}
                          className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all shadow-2xs"
                        >
                          {Object.keys(HUB_CONFIG).map((hub) => (
                            <option key={hub} value={hub}>{hub}</option>
                          ))}
                        </select>
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                          <span>Slots available: <strong className="text-slate-900">{activeHubInfo.dockingSlots}</strong></span>
                          <span className="text-emerald-700 font-semibold">Active Heli-Deck</span>
                        </div>
                      </div>

                      {/* Field 2: Destination Coordinates / Address */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                          <span>Destination Coordinates / Address</span>
                          <span className="text-[10px] text-emerald-700 font-bold font-mono">Sub-meter GPS</span>
                        </label>

                        <select
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all shadow-2xs"
                        >
                          {activeHubInfo.destinations.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                        
                        <span className="text-[11px] text-emerald-700 font-mono font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> 
                          Geocoded with active corridor vector separation
                        </span>
                      </div>

                    </div>

                    {/* SECTION C: WEIGHT & CARGO TIER */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      
                      {/* Total Weight (kg) */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                            Total Weight (kg)
                          </label>
                          <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                            {weight} kg / max 5.0 kg
                          </span>
                        </div>
                        
                        <input
                          type="number"
                          min="0.1"
                          max="5.0"
                          step="0.1"
                          value={weight}
                          onChange={(e) => setWeight(parseFloat(e.target.value) || 0.1)}
                          className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-bold font-mono focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all shadow-2xs"
                        />

                        <input
                          type="range"
                          min="0.1"
                          max="5.0"
                          step="0.1"
                          value={weight}
                          onChange={(e) => setWeight(parseFloat(e.target.value))}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900 mt-1"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                          <span>0.1 kg</span>
                          <span>2.5 kg (Medical Tier)</span>
                          <span>5.0 kg (Heavy Max)</span>
                        </div>
                      </div>

                      {/* Cargo Type */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                          Cargo Classification
                        </label>

                        <div className="grid grid-cols-2 gap-3 h-auto">
                          {/* Button A: Medical Rapid (Cold-Chain) */}
                          <button
                            type="button"
                            onClick={() => setCargoType('medical')}
                            className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                              cargoType === 'medical'
                                ? 'border-slate-900 bg-slate-50 ring-2 ring-slate-900/10 shadow-xs'
                                : 'border-slate-200 bg-white hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                                <Thermometer className="w-4 h-4" />
                              </div>
                              {cargoType === 'medical' && (
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                              )}
                            </div>
                            <div className="mt-2">
                              <p className="text-xs font-bold text-slate-900 leading-tight">Medical Rapid</p>
                              <p className="text-[10px] text-rose-700 font-mono font-semibold">Cold-Chain (2°C-8°C)</p>
                            </div>
                          </button>

                          {/* Button B: Standard Cargo (Winch) */}
                          <button
                            type="button"
                            onClick={() => setCargoType('cargo')}
                            className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                              cargoType === 'cargo'
                                ? 'border-slate-900 bg-slate-50 ring-2 ring-slate-900/10 shadow-xs'
                                : 'border-slate-200 bg-white hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                                <Box className="w-4 h-4" />
                              </div>
                              {cargoType === 'cargo' && (
                                <span className="w-2.5 h-2.5 rounded-full bg-slate-900 animate-pulse" />
                              )}
                            </div>
                            <div className="mt-2">
                              <p className="text-xs font-bold text-slate-900 leading-tight">Standard Cargo</p>
                              <p className="text-[10px] text-slate-600 font-mono">Winch Lowering (15m)</p>
                            </div>
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                )}

                {/* =============================================================== */}
                {/* STEP 2: ROUTING & AIRWAY CORRIDOR SELECTION                     */}
                {/* =============================================================== */}
                {currentStep === 2 && (
                  <div className="mt-8 space-y-4">
                    <h3 className="text-base font-bold text-slate-900">Select Designated Flight Corridor for {pickupHub}</h3>
                    <p className="text-xs text-slate-500">Autonomous flight corridors maintain strict separation from civil aviation airspace.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {activeHubInfo.corridors.map((c) => (
                        <div 
                          key={c.id}
                          onClick={() => setSelectedCorridor(c.id)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            selectedCorridor === c.id 
                              ? 'border-slate-900 bg-slate-50 ring-2 ring-slate-900/15 shadow-xs' 
                              : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono font-bold text-xs text-slate-900">{c.name}</span>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                              c.badge.includes('Optimal') 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-slate-200 text-slate-700'
                            }`}>
                              {c.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">{c.details}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* =============================================================== */}
                {/* STEP 3: DRONE ASSIGNMENT                                        */}
                {/* =============================================================== */}
                {currentStep === 3 && (
                  <div className="mt-8 space-y-4">
                    <h3 className="text-base font-bold text-slate-900">Airframe Assignment &amp; Telemetry Validation</h3>
                    
                    <div className="p-5 rounded-xl border border-sky-200 bg-sky-50/70 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md">
                          <Plane className="w-7 h-7 text-sky-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-base text-slate-900">
                              {cargoType === 'medical' ? 'SkyDrop AeroViper M3 (SD-VIP-042)' : 'SkyDrop Pelican X1 (SD-D204)'}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">Ready</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">
                            {cargoType === 'medical' 
                              ? 'Medical Rapid Drone · Active thermal regulation chamber active' 
                              : 'Cargo Heavy Drone · Motorized 15m tether winch lowered'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono">
                        <div className="text-center p-2.5 rounded-lg bg-white border border-slate-200">
                          <span className="text-slate-400 block text-[10px]">BATTERY</span>
                          <span className="font-bold text-emerald-600">98% (Healthy)</span>
                        </div>
                        <div className="text-center p-2.5 rounded-lg bg-white border border-slate-200">
                          <span className="text-slate-400 block text-[10px]">PAYLOAD MAX</span>
                          <span className="font-bold text-slate-900">{cargoType === 'medical' ? '2.5 kg' : '5.0 kg'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* =============================================================== */}
                {/* STEP 4: CONFIRM & DISPATCH (With Full Manifest Details)          */}
                {/* =============================================================== */}
                {currentStep === 4 && (
                  <div className="mt-8 space-y-4">
                    <h3 className="text-base font-bold text-slate-900">Review Delivery Manifest &amp; Clearance</h3>
                    
                    {/* Manifest Card Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-slate-400 block text-[10px] font-mono">PRODUCT / PARCEL</span>
                        <span className="font-bold text-slate-900 truncate block">
                          {customProductName.trim() || productCategory}
                        </span>
                      </div>
                      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-slate-400 block text-[10px] font-mono">ORIGIN HUB</span>
                        <span className="font-bold text-slate-900">{pickupHub}</span>
                      </div>
                      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-slate-400 block text-[10px] font-mono">DESTINATION</span>
                        <span className="font-bold text-slate-900 truncate block">{destination.split('·')[0]}</span>
                      </div>
                      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-slate-400 block text-[10px] font-mono">WEIGHT &amp; AIRFRAME</span>
                        <span className="font-bold text-slate-900 font-mono">
                          {weight} kg · {cargoType === 'medical' ? 'SD-VIP-042' : 'SD-D204'}
                        </span>
                      </div>
                    </div>

                    {/* Celebratory Dispatched State */}
                    {orderDispatched && dispatchedOrder && (
                      <div className="p-6 rounded-2xl bg-emerald-950 text-white border-2 border-emerald-500/80 shadow-xl space-y-3 animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                              <Check className="w-6 h-6 stroke-[3]" />
                            </div>
                            <div>
                              <h4 className="text-base font-black text-white">
                                Order Successfully Booked &amp; Dispatched!
                              </h4>
                              <p className="text-xs text-emerald-200">
                                Order #{dispatchedOrder.order_id} · {dispatchedOrder.product_name}
                              </p>
                            </div>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-mono font-bold">
                            EN ROUTE
                          </span>
                        </div>

                        <div className="pt-2 border-t border-emerald-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <span className="text-emerald-300 font-mono">
                            Drone {dispatchedOrder.drone_id} entered Corridor COR-01 · ETA ~12 mins
                            {paymentSuccessData ? ` · Ref: ${paymentSuccessData.reference_no}` : ''}
                          </span>
                          <div className="flex items-center gap-3">
                            <Link to="/customer/tracking">
                              <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-md">
                                <span>Track Live Flight</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                            </Link>
                            <button
                              onClick={() => {
                                setActiveTab('history');
                              }}
                              className="text-white hover:text-emerald-200 underline font-semibold cursor-pointer"
                            >
                              View in History
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* Footer: Action Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                {currentStep > 1 && !orderDispatched ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {/* Submit button */}
                {!orderDispatched ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-slate-800 active:scale-95 transition-all shadow-xs flex items-center gap-2 ml-auto cursor-pointer"
                  >
                    <span>
                      {currentStep === 1 
                        ? 'Proceed to Routing →' 
                        : currentStep === 2 
                        ? 'Assign Airframe →' 
                        : currentStep === 3 
                        ? 'Review Manifest →' 
                        : `Proceed to Payment (₹${totalPaymentAmount}) →`}
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(1);
                      setOrderDispatched(false);
                      setDispatchedOrder(null);
                      setPaymentSuccessData(null);
                      setPendingCreatedOrder(null);
                    }}
                    className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-slate-800 transition-all ml-auto cursor-pointer"
                  >
                    + Book Another Parcel
                  </button>
                )}
              </div>

              {/* ================================================================= */}
              {/* SIMULATED PAYMENT GATEWAY / CHECKOUT MODAL                        */}
              {/* ================================================================= */}
              {showPaymentModal && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {/* Gateway Header */}
                    <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center">
                          <Lock className="w-4 h-4 text-sky-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-sm tracking-tight">SKYDROP CHECKOUT</span>
                            <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold">
                              256-Bit Simulated
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-mono">
                            Autonomous Aerial Dispatch Settlement
                          </p>
                        </div>
                      </div>
                      {!isProcessingPayment && !paymentSuccessData && (
                        <button
                          type="button"
                          onClick={() => setShowPaymentModal(false)}
                          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    <div className="p-6 space-y-5">
                      {/* 1. Order Summary */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <span className="font-mono font-bold text-slate-500 uppercase">Order ID</span>
                          <span className="font-mono font-black text-slate-900 text-sm">
                            #{paymentSuccessData?.order_id || previewOrderId}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-slate-600">
                          <span>Base Aerial Dispatch ({cargoType === 'medical' ? 'Medical Rapid' : 'Standard Cargo'})</span>
                          <span className="font-mono font-semibold text-slate-900">₹{baseDeliveryCharge}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-600">
                          <span>Payload &amp; Corridor Service Charge ({weight} kg)</span>
                          <span className="font-mono font-semibold text-slate-900">₹{weightServiceCharge}</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-200 pt-2.5 text-sm">
                          <span className="font-bold text-slate-900">Total Payable Amount</span>
                          <span className="font-mono font-black text-sky-700 text-lg">₹{totalPaymentAmount}</span>
                        </div>
                      </div>

                      {!paymentSuccessData ? (
                        <form onSubmit={handleProcessPayment} className="space-y-5">
                          {paymentError && (
                            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                              <span>{paymentError}</span>
                            </div>
                          )}

                          {/* 2. Payment Method Selection */}
                          <div className="space-y-2">
                            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 block">
                              Select Payment Method
                            </label>
                            <div className="grid grid-cols-3 gap-2.5 text-xs">
                              <button
                                type="button"
                                onClick={() => { setPaymentMethod('UPI'); setPaymentError(''); }}
                                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 font-bold transition cursor-pointer ${
                                  paymentMethod === 'UPI'
                                    ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <Smartphone className="w-4 h-4" />
                                <span>UPI</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => { setPaymentMethod('CARD'); setPaymentError(''); }}
                                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 font-bold transition cursor-pointer ${
                                  paymentMethod === 'CARD'
                                    ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <CreditCard className="w-4 h-4" />
                                <span>Card</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => { setPaymentMethod('COD'); setPaymentError(''); }}
                                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 font-bold transition cursor-pointer ${
                                  paymentMethod === 'COD'
                                    ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <Banknote className="w-4 h-4" />
                                <span>Cash on Delivery</span>
                              </button>
                            </div>
                          </div>

                          {/* 3. For UPI */}
                          {paymentMethod === 'UPI' && (
                            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                              <label className="text-xs font-semibold text-slate-700 block">
                                Virtual Payment Address (UPI ID)
                              </label>
                              <input
                                type="text"
                                placeholder="name@upi"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-slate-900"
                              />
                              <p className="text-[11px] text-slate-500">
                                Instant simulated UPI verification for autonomous drone dispatch.
                              </p>
                            </div>
                          )}

                          {/* 4. For Card */}
                          {paymentMethod === 'CARD' && (
                            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                              <div>
                                <label className="font-semibold text-slate-700 block mb-1">Card Number</label>
                                <input
                                  type="text"
                                  placeholder="4532 •••• •••• 8891"
                                  maxLength={19}
                                  value={cardNumber}
                                  onChange={(e) => setCardNumber(e.target.value)}
                                  className="w-full h-10 px-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-slate-900"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="font-semibold text-slate-700 block mb-1">Expiry Date</label>
                                  <input
                                    type="text"
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    value={cardExpiry}
                                    onChange={(e) => setCardExpiry(e.target.value)}
                                    className="w-full h-10 px-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-slate-900"
                                  />
                                </div>
                                <div>
                                  <label className="font-semibold text-slate-700 block mb-1">CVV</label>
                                  <input
                                    type="password"
                                    placeholder="•••"
                                    maxLength={4}
                                    value={cardCvv}
                                    onChange={(e) => setCardCvv(e.target.value)}
                                    className="w-full h-10 px-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-slate-900"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="font-semibold text-slate-700 block mb-1">Card Holder Name</label>
                                <input
                                  type="text"
                                  placeholder="Name on Card"
                                  value={cardHolder}
                                  onChange={(e) => setCardHolder(e.target.value)}
                                  className="w-full h-10 px-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900"
                                />
                              </div>
                            </div>
                          )}

                          {/* 5. For Cash on Delivery */}
                          {paymentMethod === 'COD' && (
                            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
                              <p className="font-bold">Pay on Drone Touchdown Confirmed</p>
                              <p className="text-amber-800 leading-relaxed">
                                You will settle ₹{totalPaymentAmount} at the destination landing pad upon package handover. Click below to confirm and authorize dispatch.
                              </p>
                            </div>
                          )}

                          {/* 6 & 7. Prominent Pay Button + Loading State */}
                          <button
                            type="submit"
                            disabled={isProcessingPayment}
                            className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-70 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            {isProcessingPayment ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
                                <span>Processing Payment...</span>
                              </>
                            ) : (
                              <>
                                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                <span>Pay ₹{totalPaymentAmount}</span>
                              </>
                            )}
                          </button>
                        </form>
                      ) : (
                        /* 8. On Success: Payment Successful Confirmation */
                        <div className="space-y-5 text-center py-2 animate-in fade-in zoom-in-95 duration-200">
                          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs border border-emerald-200">
                            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                          </div>
                          <div>
                            <h4 className="text-lg font-black text-slate-900">Payment Successful</h4>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Transaction recorded in Oracle DBMS &amp; airframe cleared for takeoff.
                            </p>
                          </div>

                          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-left space-y-2 text-xs font-mono">
                            <div className="flex justify-between">
                              <span className="text-slate-500">ORDER ID</span>
                              <span className="font-bold text-slate-900">#{paymentSuccessData.order_id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">TRANSACTION ID</span>
                              <span className="font-bold text-emerald-800">{paymentSuccessData.transaction_id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">REFERENCE NO</span>
                              <span className="font-bold text-slate-900">{paymentSuccessData.reference_no}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">METHOD / STATUS</span>
                              <span className="font-bold text-emerald-700">
                                {paymentSuccessData.payment_method} · {paymentSuccessData.payment_status}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => finalizeOrderDispatch(pendingCreatedOrder)}
                            className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <span>Continue to Drone Dispatch 🚀</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* =================================================================== */}
            {/* COLUMN 3: ACTIVE TRACKING & REAL INTERACTIVE MINI MAP RADAR         */}
            {/* =================================================================== */}
            <div className="col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              
              {/* Top Section: Real Leaflet Mini Map Radar (Dynamic to Pickup & Destination) */}
              <div className="relative h-56 w-full bg-slate-900 overflow-hidden">
                <MapView
                  center={activeFlightRoute.center}
                  zoom={11}
                  shouldRecenter={true}
                  hubs={ALL_HUBS}
                  destination={{
                    lat: activeFlightRoute.dest.lat,
                    lng: activeFlightRoute.dest.lng,
                    label: `Drop: ${activeFlightRoute.dest.label}`,
                  }}
                  activeRoute={activeFlightRoute.path}
                  drones={[
                    {
                      drone_id: cargoType === 'medical' ? 'SD-VIP-042' : 'SD-D204',
                      model: cargoType === 'medical' ? 'AeroViper M3' : 'Pelican X1',
                      lat: activeFlightRoute.waypoints[2].lat,
                      lng: activeFlightRoute.waypoints[2].lng,
                      battery_level: 84,
                    }
                  ]}
                  className="w-full h-full border-0 rounded-none min-h-[220px]"
                />

                {/* Pill tag at top right */}
                <div className="absolute top-3 right-3 z-400 bg-emerald-500 text-white font-mono px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>In Transit</span>
                </div>

                {/* Overlay live flight tag */}
                <div className="absolute left-3 bottom-3 z-400 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-white text-xs font-mono font-bold shadow-lg pointer-events-none">
                  <Plane className="w-4 h-4 text-sky-400 transform -rotate-12 animate-pulse" />
                  <span>{cargoType === 'medical' ? 'SD-VIP-042' : 'SD-D204'} · {selectedCorridor}</span>
                </div>
              </div>

              {/* Middle Section (Telemetry) */}
              <div className="p-6 border-b border-slate-100 space-y-4">
                
                {/* Title & Subtitle */}
                <div>
                  <div className="text-slate-900 font-bold text-lg flex items-center justify-between">
                    <span className="font-mono">{cargoType === 'medical' ? 'SD-VIP-042' : 'SD-D204'}</span>
                    <span className="text-xs font-mono font-bold bg-sky-50 text-sky-700 px-2.5 py-0.5 rounded-full border border-sky-200">
                      {cargoType === 'medical' ? 'AeroViper M3' : 'Pelican X1'}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs mt-0.5 font-medium truncate">
                    {pickupHub} → {activeFlightRoute.dest.label}
                  </p>
                </div>


                {/* Grid: 4 Telemetry Metrics */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  
                  {/* Box 1: Altitude */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                    <p className="text-slate-500 text-[10px] font-mono font-bold uppercase tracking-wider">Altitude</p>
                    <p className="text-slate-900 text-xl font-bold font-mono mt-0.5">82 m</p>
                  </div>

                  {/* Box 2: Air Speed */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                    <p className="text-slate-500 text-[10px] font-mono font-bold uppercase tracking-wider">Air Speed</p>
                    <p className="text-slate-900 text-xl font-bold font-mono mt-0.5">41 kts</p>
                  </div>

                  {/* Box 3: Power Level */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                    <p className="text-slate-500 text-[10px] font-mono font-bold uppercase tracking-wider">Battery Power</p>
                    <p className="text-emerald-700 text-xl font-bold font-mono mt-0.5">76%</p>
                  </div>

                  {/* Box 4: Target ETA */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                    <p className="text-slate-500 text-[10px] font-mono font-bold uppercase tracking-wider">Target ETA</p>
                    <p className="text-slate-900 text-xl font-bold font-mono mt-0.5">12 min</p>
                  </div>

                </div>

              </div>

              {/* Bottom Section (Timeline) */}
              <div className="p-6 bg-slate-50/50 space-y-4">

                
                {/* Title */}
                <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider font-mono">
                  Live Dispatch Sequence
                </h4>

                {/* Vertical list with 3 steps */}
                <div className="space-y-3.5 relative pl-1">
                  
                  {/* Step 1: Order Confirmed */}
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-slate-800 text-sm font-semibold">Order Confirmed</span>
                  </div>

                  {/* Step 2: Departed Hub */}
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-slate-800 text-sm font-semibold">Departed Central Hub</span>
                  </div>

                  {/* Step 3: Cruising in designated airway */}
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 border border-sky-300 flex items-center justify-center shrink-0">
                      <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse" />
                    </div>
                    <span className="text-sky-700 text-sm font-bold">Cruising in designated airway</span>
                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* ======================================================================= */}
        {/* TAB 2: ORDER HISTORY VIEW                                               */}
        {/* ======================================================================= */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Delivery Order History</h2>
                <p className="text-sm text-slate-500">Full record of autonomous airway consignments &amp; drop receipts.</p>
              </div>
              <button 
                onClick={() => setActiveTab('dashboard')} 
                className="bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-slate-800 transition cursor-pointer"
              >
                + Book Another
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-800">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-mono text-slate-600 uppercase">
                  <tr>
                    <th className="py-3.5 px-4 font-bold">Order ID</th>
                    <th className="py-3.5 px-4 font-bold">Product Manifest</th>
                    <th className="py-3.5 px-4 font-bold">Date / Time</th>
                    <th className="py-3.5 px-4 font-bold">Pickup Location</th>
                    <th className="py-3.5 px-4 font-bold">Destination</th>
                    <th className="py-3.5 px-4 font-bold">Airframe</th>
                    <th className="py-3.5 px-4 font-bold">Weight</th>
                    <th className="py-3.5 px-4 font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {ordersList.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">#{ord.id}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900 text-xs">{ord.product || 'Standard Parcel'}</td>
                      <td className="py-3.5 px-4 text-slate-600 text-xs">{ord.time}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-800 text-xs">{ord.pickup}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-800 text-xs">{ord.dest}</td>
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-700">{ord.drone}</td>
                      <td className="py-3.5 px-4 font-mono text-xs">{ord.weight}</td>
                      <td className="py-3.5 px-4 text-right">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono ${
                          ord.status === 'In Transit'
                            ? 'bg-sky-50 text-sky-700 border border-sky-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${ord.status === 'In Transit' ? 'bg-sky-500 animate-pulse' : 'bg-emerald-500'}`} />
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* TAB 3: AIRWAY CARTOGRAPHY VIEW                                          */}
        {/* ======================================================================= */}
        {activeTab === 'cartography' && (
          <div className="space-y-6">
            
            {/* Header & Explanatory Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                      Urban Air Mobility GIS Network
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                    Regional Airway Cartography
                  </h2>
                  <p className="text-sm text-slate-600 max-w-3xl mt-1">
                    Airway Cartography maps certified 3D digital flight corridors across Chennai Metro. It ensures autonomous drones navigate pre-approved low-altitude airspaces (60m–120m), safely deconflict with passenger aircraft, bypass high-density obstacles, and connect active docking hubs with zero ground traffic delays.
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-slate-800 font-bold">DGCA / FAA Approved</span>
                </div>
              </div>

              {/* 3 Core Pillars of Airway Cartography */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-2 text-sky-700 font-bold text-xs font-mono">
                    <Navigation className="w-4 h-4" />
                    <span>60m–120m Safe Corridor Floor</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Operates strictly between ground infrastructure and commercial aviation, preventing civilian interference.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs font-mono">
                    <Radio className="w-4 h-4" />
                    <span>Real-Time Radar Deconfliction</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Automated sub-second separation algorithms maintain safe flight buffers between concurrent delivery drones.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-2 text-amber-700 font-bold text-xs font-mono">
                    <AlertCircle className="w-4 h-4" />
                    <span>Dynamic No-Fly Zone Avoidance</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Automatic geometric geofencing avoids Chennai International Airport radii, hospitals, and high-security zones.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Live Interactive Map */}
            <div className="relative rounded-2xl overflow-hidden h-[560px] border border-slate-200 shadow-md bg-slate-100">
              <MapView
                center={[13.0300, 80.2350]}
                zoom={12}
                hubs={mockHubs}
                corridors={mockCorridors}
                drones={mockDrones}
                className="w-full h-full border-0"
              />
              
              <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200 max-w-md text-xs font-mono space-y-1.5 pointer-events-auto">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-slate-900 text-sm block">ACTIVE SECTOR: CHENNAI AIRWAY NETWORK</span>
                </div>
                <p className="text-slate-600">Operating altitude floor: 60m | Ceiling: 120m</p>
                <p className="text-emerald-700 font-bold">100% Civil Aviation Separation Verified</p>
              </div>
            </div>

            {/* Hubs Status & Diagnostics Grid */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Active Regional Hubs &amp; Docking Telemetry
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockHubs.map((hub) => (
                  <div key={hub.hub_id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                        {hub.hub_id}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{hub.hub_name}</h4>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                        Docked: <strong className="text-slate-900">{hub.current_drone_count || 6} / {hub.docking_capacity}</strong> Drones
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-600">
                      <span>Status: <strong className="text-emerald-700">ONLINE</strong></span>
                      <span>Wind: ~8 kts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}




      </main>

    </div>
  );
}

export default CustomerPortalApp;
