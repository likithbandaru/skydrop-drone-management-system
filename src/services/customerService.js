import { mockCustomers } from '../data/mockData';

export const customerService = {
  async getAll() {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/customers`);
      if (response.ok) {
        const dbCustomers = await response.json();
        if (Array.isArray(dbCustomers) && dbCustomers.length > 0) {
          return dbCustomers.map(c => ({
            ...c,
            customer_id: String(c.customer_id).startsWith('CUST-') ? c.customer_id : `CUST-${c.customer_id}`,
          }));
        }
      }
    } catch {
      // Fallback to mockCustomers when backend is unreachable
    }
    return Promise.resolve([...mockCustomers]);
  },
  
  async getById(customerId) {
    const all = await this.getAll();
    const customer = all.find(c => String(c.customer_id) === String(customerId));
    return Promise.resolve(customer || null);
  },
  
  async update(customerId, updatedFields) {
    const idx = mockCustomers.findIndex(c => c.customer_id === customerId);
    if (idx !== -1) {
      mockCustomers[idx] = { ...mockCustomers[idx], ...updatedFields };
      return Promise.resolve(mockCustomers[idx]);
    }
    return Promise.reject(new Error('Customer not found'));
  }
};
