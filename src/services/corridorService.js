import { mockCorridors } from '../data/mockData';

export const corridorService = {
  async getAll() {
    return Promise.resolve([...mockCorridors]);
  },

  async getById(corridorId) {
    const corridor = mockCorridors.find(c => c.corridor_id === corridorId);
    return Promise.resolve(corridor || null);
  },

  async getActiveCorridors() {
    return Promise.resolve(mockCorridors.filter(c => !c.is_no_fly_zone));
  }
};
