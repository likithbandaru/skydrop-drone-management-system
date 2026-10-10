import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PublicLayout } from './components/layout/PublicLayout';
import { CustomerLayout, AdminLayout } from './components/layout/PortalLayouts';

// Public Pages (Enhanced Editorial Experience)
import { HomePage } from './pages/public/HomePage';
import {
  HowItWorksPage,
  TechnologyPage,
  SolutionsPage,
  AboutPage,
} from './pages/public/PublicSubpages';

// Auth Pages
import { LoginPage, RegisterPage } from './pages/auth/AuthPages';

// Customer Pages
import {
  CustomerDashboardPage,
  BookDeliveryPage,
  LiveTrackingPage,
  CustomerTracking,
  CustomerOrdersPage,
  CustomerProfilePage,
  CustomerPortalApp,
} from './pages/customer/CustomerPages';

// Admin Pages
import {
  AdminDashboardPage,
  AdminOrdersPage,
  AdminCustomersPage,
  AdminDronesPage,
  AdminHubsPage,
  AdminCorridorsPage,
  AdminBatteryCyclesPage,
  AdminWaypointsPage,
  AdminPortal,
} from './pages/admin/AdminPages';

import { NotFoundPage } from './pages/NotFoundPage';

function RequireCustomerAuth({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* PUBLIC WEBSITE ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* CUSTOMER APPLICATION MAIN PORTAL ROUTES (Requires Sign In) */}
        <Route path="/customer" element={<RequireCustomerAuth><CustomerPortalApp /></RequireCustomerAuth>} />
        <Route path="/customer/book" element={<RequireCustomerAuth><CustomerPortalApp /></RequireCustomerAuth>} />
        <Route path="/customer/portal" element={<RequireCustomerAuth><CustomerPortalApp /></RequireCustomerAuth>} />
        <Route path="/customer-portal" element={<RequireCustomerAuth><CustomerPortalApp /></RequireCustomerAuth>} />
        <Route path="/customer/tracking" element={<RequireCustomerAuth><CustomerTracking /></RequireCustomerAuth>} />

        {/* CUSTOMER SUBPAGES (Requires Sign In) */}
        <Route path="/customer" element={<RequireCustomerAuth><CustomerLayout /></RequireCustomerAuth>}>
          <Route path="dashboard" element={<CustomerDashboardPage />} />
          <Route path="orders" element={<CustomerOrdersPage />} />
          <Route path="profile" element={<CustomerProfilePage />} />
          <Route path="track" element={<CustomerTracking />} />
        </Route>


        {/* ADMIN OPERATIONS ROUTES */}
        <Route path="/admin-portal" element={<AdminPortal />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="portal" element={<AdminPortal />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="customers" element={<AdminCustomersPage />} />
          <Route path="drones" element={<AdminDronesPage />} />
          <Route path="hubs" element={<AdminHubsPage />} />
          <Route path="corridors" element={<AdminCorridorsPage />} />
          <Route path="battery-cycles" element={<AdminBatteryCyclesPage />} />
          <Route path="waypoints" element={<AdminWaypointsPage />} />
        </Route>

        {/* 404 CATCH-ALL */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}
