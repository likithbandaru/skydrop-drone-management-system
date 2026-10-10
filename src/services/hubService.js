import { mockHubs } from '../data/mockData';

export const hubService = {
  async getAll() {
    return Promise.resolve([...mockHubs]);
  },

  async getById(hubId) {
    const hub = mockHubs.find(h => h.hub_id === hubId);
    return Promise.resolve(hub || null);
  },

  async getActiveHubs() {
    return Promise.resolve(mockHubs.filter(h => h.is_active));
  }
};
