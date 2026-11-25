import type { TransportState } from '../types/transportTypes';

const STORAGE_KEY = 'vlearnings.transport.state.v1';

const seed: TransportState = {
  vehicles: [
    { id: 'VEH-001', type: 'Bus', registration: 'LEA-2026', makeModel: 'Hino School Bus', capacity: 40, status: 'Active' },
    { id: 'VEH-002', type: 'Coaster', registration: 'LEB-2026', makeModel: 'Toyota Coaster', capacity: 25, status: 'Active' },
  ],
  staff: [
    { id: 'DRV-001', name: 'Ahmed Raza', role: 'Driver', phone: '0300-0000001', licenseNumber: 'LTV-10001', licenseExpiry: '2027-06-30' },
  ],
  routes: [
    { id: 'RTE-001', code: 'RT-01', name: 'Main City Route', description: 'Main residential pickup route', vehicleId: 'VEH-001', driverId: 'DRV-001', status: 'Active', stops: [
      { id: 'STP-001', name: 'Model Town', landmark: 'Main Market', morningTime: '07:10', afternoonTime: '14:30', monthlyFee: 3000, order: 1 },
      { id: 'STP-002', name: 'Garden Town', landmark: 'Barkat Market', morningTime: '07:25', afternoonTime: '14:15', monthlyFee: 2500, order: 2 },
    ] },
  ],
  allocations: [],
  logs: [],
};

function read(): TransportState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) { localStorage.setItem(STORAGE_KEY, JSON.stringify(seed)); return seed; }
    const parsed = JSON.parse(raw) as Partial<TransportState>;
    return { ...seed, ...parsed, routes: parsed.routes ?? seed.routes, vehicles: parsed.vehicles ?? seed.vehicles,
      staff: parsed.staff ?? seed.staff, allocations: parsed.allocations ?? [], logs: parsed.logs ?? [] };
  } catch { return seed; }
}
function write(state: TransportState) { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
export const transportService = {
  getState: read,
  saveState: write,
  createId(prefix: string, items: { id: string }[]) {
    const next = Math.max(0, ...items.map(item => Number(item.id.split('-').at(-1)) || 0)) + 1;
    return `${prefix}-${String(next).padStart(3, '0')}`;
  },
};
