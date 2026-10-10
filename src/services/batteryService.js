import { mockBatteryCycles } from '../data/mockData';

export const batteryService = {
  async getAll() {
    return Promise.resolve([...mockBatteryCycles]);
  },

  async getByDroneId(droneId) {
    const cycles = mockBatteryCycles.filter(b => b.drone_id === droneId);
    return Promise.resolve(cycles);
  },

  async getHealthMetrics() {
    const totalCycles = mockBatteryCycles.length;
    const avgHealth = Math.round(
      mockBatteryCycles.reduce((acc, curr) => acc + curr.battery_health_percentage, 0) / totalCycles
    );
    const lowHealthCount = mockBatteryCycles.filter(b => b.battery_health_percentage < 80).length;
    
    return Promise.resolve({
      totalCycles,
      avgHealth,
      lowHealthCount,
    });
  }
};
