import { mockWaypoints } from '../data/mockData';

export const waypointService = {
  async getAll() {
    return Promise.resolve([...mockWaypoints]);
  },

  async getByOrderId(orderId) {
    const waypoints = mockWaypoints
      .filter(w => w.order_id === orderId)
      .sort((a, b) => a.sequence_no - b.sequence_no);
    return Promise.resolve(waypoints);
  },

  async getLatestByOrderId(orderId) {
    const waypoints = await this.getByOrderId(orderId);
    return waypoints.length > 0 ? waypoints[waypoints.length - 1] : null;
  }
};
