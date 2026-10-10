import { mockDrones, mockCargoDrones, mockMedicalRapidDrones } from '../data/mockData';

export const droneService = {
  async getAll() {
    const combined = mockDrones.map(drone => {
      if (drone.drone_type === 'CARGO') {
        const cargoDetails = mockCargoDrones.find(c => c.drone_id === drone.drone_id) || {};
        return { ...drone, ...cargoDetails };
      } else if (drone.drone_type === 'MEDICAL_RAPID') {
        const medDetails = mockMedicalRapidDrones.find(m => m.drone_id === drone.drone_id) || {};
        return { ...drone, ...medDetails };
      }
      return drone;
    });
    return Promise.resolve(combined);
  },

  async getById(droneId) {
    const drone = mockDrones.find(d => d.drone_id === droneId);
    if (!drone) return Promise.resolve(null);
    
    if (drone.drone_type === 'CARGO') {
      const cargoDetails = mockCargoDrones.find(c => c.drone_id === drone.drone_id) || {};
      return Promise.resolve({ ...drone, ...cargoDetails });
    } else if (drone.drone_type === 'MEDICAL_RAPID') {
      const medDetails = mockMedicalRapidDrones.find(m => m.drone_id === drone.drone_id) || {};
      return Promise.resolve({ ...drone, ...medDetails });
    }
    return Promise.resolve(drone);
  },

  async getAvailableDrones(requiredWeight = 0, isMedical = false) {
    const all = await this.getAll();
    return all.filter(d => {
      const statusOk = d.operational_status === 'AVAILABLE' && d.battery_level > 25;
      const weightOk = d.payload_capacity_kg >= requiredWeight;
      const typeOk = isMedical ? d.drone_type === 'MEDICAL_RAPID' : true;
      return statusOk && weightOk && typeOk;
    });
  }
};
