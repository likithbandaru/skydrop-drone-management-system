
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

let currentUser = null;

export const authService = {
  async register({
    name,
    email,
    phone,
    default_lat,
    default_long,
    address_label,
    password,
    role = 'customer'
  }) {
    if (role !== 'customer') {
      throw new Error('Only database-backed customer registration is enabled');
    }

    const response = await fetch(`${API_URL}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone,
        default_lat: Number(default_lat) || 12.9010,
        default_long: Number(default_long) || 80.2279,
        password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    currentUser = {
      ...data.customer,
      address_label: address_label || 'OMR Cyber Vale, Chennai'
    };

    return currentUser;
  },

  async login(email, password, role = 'customer') {
    if (role !== 'customer') {
      throw new Error('Admin database authentication is not configured');
    }

    const response = await fetch(`${API_URL}/customers/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    currentUser = {
      ...data.customer,
      address_label: 'OMR Cyber Vale, Chennai'
    };

    return currentUser;
  },

  getCurrentUser() {
    return currentUser;
  },

  logout() {
    currentUser = null;
    return Promise.resolve(true);
  },

  switchRole() {
    throw new Error('Role switching is disabled until database authentication is configured');
  }
};
