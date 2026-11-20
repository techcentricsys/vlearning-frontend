export type RecordStatus = 'Active' | 'Inactive';
export type VehicleStatus = 'Active' | 'Under Maintenance' | 'Out of Service';
export type TripShift = 'Morning Pickup' | 'Afternoon Drop-off';
export type PickupDropStatus = 'Boarded' | 'Dropped Off' | 'Absent';

export interface TransportStop {
  id: string; name: string; landmark: string; morningTime: string; afternoonTime: string;
  monthlyFee: number; order: number;
}
export interface TransportRoute {
  id: string; code: string; name: string; description: string; vehicleId: string;
  driverId: string; status: RecordStatus; stops: TransportStop[];
}
export interface TransportVehicle {
  id: string; type: string; registration: string; makeModel: string; capacity: number;
  status: VehicleStatus;
}
export interface TransportStaff {
  id: string; name: string; role: 'Driver'; phone: string;
  licenseNumber: string; licenseExpiry: string;
}
export interface StudentAllocation {
  id: string; studentId: string; studentName: string; className: string; routeId: string; pickupStopId: string; dropStopId: string;
  monthlyFee: number; startDate: string; status: RecordStatus;
}
export interface TransportLog {
  id: string; date: string; shift: TripShift; allocationId: string; routeId: string;
  status: PickupDropStatus; time: string;
}
export interface TransportState {
  routes: TransportRoute[]; vehicles: TransportVehicle[]; staff: TransportStaff[];
  allocations: StudentAllocation[]; logs: TransportLog[];
}
