import React, { useState } from 'react';
import { transportService } from '../services/transportService';
import type { PickupDropStatus, StudentAllocation, TransportLog, TransportRoute, TransportStaff, TransportState, TransportStop, TransportVehicle, TripShift } from '../types/transportTypes';

type Section = 'Dashboard' | 'Routes & Stops' | 'Vehicles' | 'Drivers' | 'Student Allocation' | 'Pickup & Drop Logs' | 'Transport Fees';
interface Props { section: Section; onNavigate: (section: string) => void; }
const input = 'w-full rounded-lg border border-outline-variant/70 bg-white px-3 py-2.5 text-sm text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/10';
const label = 'mb-1.5 block text-xs font-semibold text-on-surface-variant';
const button = 'inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-semibold transition-colors';
const today = () => new Date().toISOString().slice(0, 10);
const money = (amount: number) => `Rs. ${Number(amount || 0).toLocaleString('en-PK')}`;
const blankStop = (): TransportStop => ({ id: '', name: '', landmark: '', morningTime: '07:00', afternoonTime: '14:30', monthlyFee: 0, order: 1 });
const blankRoute = (): Omit<TransportRoute, 'id'> => ({ code: '', name: '', description: '', vehicleId: '', driverId: '', status: 'Active', stops: [] });
const blankVehicle = (): Omit<TransportVehicle, 'id'> => ({ type: 'Bus', registration: '', makeModel: '', capacity: 40, status: 'Active' });
const blankStaff = (): Omit<TransportStaff, 'id'> => ({ name: '', role: 'Driver', phone: '', licenseNumber: '', licenseExpiry: '' });

const Stat: React.FC<{ title: string; value: string | number; detail: string; icon: string }> = ({ title, value, detail, icon }) => (
  <div className="rounded-xl border border-outline-variant/40 bg-white p-4 shadow-sm">
    <div className="flex items-start justify-between"><p className="text-sm font-medium text-on-surface-variant">{title}</p><span className="material-symbols-outlined rounded-lg bg-primary-fixed p-2 text-primary">{icon}</span></div>
    <p className="mt-3 text-2xl font-bold text-on-surface">{value}</p><p className="mt-1 text-xs text-on-surface-variant">{detail}</p>
  </div>
);

const TransportPage: React.FC<Props> = ({ section, onNavigate }) => {
  const [state, setState] = useState<TransportState>(() => transportService.getState());
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<'route'|'vehicle'|'staff'|'allocation'|'stop'|null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [routeForm, setRouteForm] = useState(blankRoute());
  const [vehicleForm, setVehicleForm] = useState(blankVehicle());
  const [staffForm, setStaffForm] = useState(blankStaff());
  const [stopForm, setStopForm] = useState(blankStop());
  const [stopRouteId, setStopRouteId] = useState('');
  const [allocationForm, setAllocationForm] = useState<Omit<StudentAllocation, 'id'>>({
    studentId: '', studentName: '', className: '', routeId: '', pickupStopId: '', dropStopId: '', monthlyFee: 0, startDate: today(), status: 'Active',
  });
  const [logDate, setLogDate] = useState(today());
  const [logShift, setLogShift] = useState<TripShift>('Morning Pickup');
  const [logRoute, setLogRoute] = useState('All');
  const [toast, setToast] = useState('');

  const persist = (next: TransportState) => { setState(next); transportService.saveState(next); };
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 3000); };
  const routes = state.routes;
  const activeAllocations = state.allocations.filter(a => a.status === 'Active');
  const selectedRoute = routes.find(r => r.id === allocationForm.routeId);
  const routeVehicle = selectedRoute ? state.vehicles.find(v => v.id === selectedRoute.vehicleId) : undefined;
  const routeStudents = (routeId: string) => activeAllocations.filter(a => a.routeId === routeId);
  const capacityUsed = (routeId: string) => routeStudents(routeId).length;
  const filteredRoutes = routes.filter(r => [r.code, r.name, r.description].some(v => v.toLowerCase().includes(search.toLowerCase())));
  const filteredVehicles = state.vehicles.filter(v => [v.registration, v.type, v.makeModel].some(v2 => v2.toLowerCase().includes(search.toLowerCase())));
  const filteredStaff = state.staff.filter(s => [s.name, s.phone, s.role, s.licenseNumber].some(v => v.toLowerCase().includes(search.toLowerCase())));
  const filteredAllocations = state.allocations.filter(a => [a.studentId, a.studentName, a.className].some(v => v.toLowerCase().includes(search.toLowerCase())));
  const totalCapacity = state.vehicles.filter(v => v.status === 'Active').reduce((sum, v) => sum + v.capacity, 0);
  const todayLogs = state.logs.filter(l => l.date === today());
  const monthlyRevenue = activeAllocations.reduce((sum, a) => sum + a.monthlyFee, 0);

  const openRoute = (route?: TransportRoute) => {
    setEditingId(route?.id ?? null);
    setRouteForm(route ? { code: route.code, name: route.name, description: route.description, vehicleId: route.vehicleId, driverId: route.driverId, status: route.status, stops: route.stops } : blankRoute());
    setModal('route');
  };
  const saveRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!routeForm.code.trim() || !routeForm.name.trim()) { notify('Enter route code and name.'); return; }
    const duplicate = state.routes.some(r => r.code.toLowerCase() === routeForm.code.trim().toLowerCase() && r.id !== editingId);
    if (duplicate) { notify('Route code already exists.'); return; }
    const nextRoute = { ...routeForm, id: editingId || transportService.createId('RTE', state.routes) };
    persist({ ...state, routes: editingId ? state.routes.map(r => r.id === editingId ? nextRoute : r) : [nextRoute, ...state.routes] });
    setModal(null); notify(editingId ? 'Route updated.' : 'Route created.');
  };
  const openStop = (routeId: string, stop?: TransportStop) => {
    setStopRouteId(routeId); setEditingId(stop?.id ?? null);
    const route = state.routes.find(r => r.id === routeId);
    setStopForm(stop ? { ...stop } : { ...blankStop(), order: (route?.stops.length ?? 0) + 1 });
    setModal('stop');
  };
  const saveStop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stopForm.name.trim()) { notify('Enter a stop name.'); return; }
    const route = state.routes.find(r => r.id === stopRouteId); if (!route) return;
    const item = { ...stopForm, id: editingId || transportService.createId('STP', route.stops) };
    const stops = editingId ? route.stops.map(s => s.id === editingId ? item : s) : [...route.stops, item];
    persist({ ...state, routes: state.routes.map(r => r.id === route.id ? { ...r, stops: stops.sort((a,b) => a.order-b.order) } : r) });
    setModal(null); notify(editingId ? 'Stop updated.' : 'Stop added.');
  };
  const deleteStop = (routeId: string, stopId: string) => {
    if (!window.confirm('Delete this stop? Existing student allocations using it must be updated.')) return;
    if (state.allocations.some(a => a.status === 'Active' && (a.pickupStopId === stopId || a.dropStopId === stopId))) { notify('This stop is assigned to an active student.'); return; }
    persist({ ...state, routes: state.routes.map(r => r.id === routeId ? { ...r, stops: r.stops.filter(s => s.id !== stopId) } : r) });
    notify('Stop deleted.');
  };
  const saveVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleForm.registration.trim() || vehicleForm.capacity < 1) { notify('Enter a registration number and valid capacity.'); return; }
    const duplicate = state.vehicles.some(v => v.registration.toLowerCase() === vehicleForm.registration.trim().toLowerCase() && v.id !== editingId);
    if (duplicate) { notify('Vehicle registration already exists.'); return; }
    const item = { ...vehicleForm, id: editingId || transportService.createId('VEH', state.vehicles) };
    persist({ ...state, vehicles: editingId ? state.vehicles.map(v => v.id === editingId ? item : v) : [item, ...state.vehicles] });
    setModal(null); notify('Vehicle saved.');
  };
  const saveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffForm.name.trim() || !staffForm.phone.trim()) { notify('Enter staff name and phone number.'); return; }
    const item = { ...staffForm, id: editingId || transportService.createId('DRV', state.staff) };
    persist({ ...state, staff: editingId ? state.staff.map(s => s.id === editingId ? item : s) : [item, ...state.staff] });
    setModal(null); notify('Transport staff saved.');
  };
  const openVehicle = (vehicle?: TransportVehicle) => { setEditingId(vehicle?.id ?? null); setVehicleForm(vehicle ? { type: vehicle.type, registration: vehicle.registration, makeModel: vehicle.makeModel, capacity: vehicle.capacity, status: vehicle.status } : blankVehicle()); setModal('vehicle'); };
  const openStaff = (staff?: TransportStaff) => { setEditingId(staff?.id ?? null); setStaffForm(staff ? { name: staff.name, role: staff.role, phone: staff.phone, licenseNumber: staff.licenseNumber, licenseExpiry: staff.licenseExpiry } : blankStaff()); setModal('staff'); };
  const saveAllocation = (e: React.FormEvent) => {
    e.preventDefault();
    const route = state.routes.find(r => r.id === allocationForm.routeId);
    if (!allocationForm.studentId.trim() || !allocationForm.studentName.trim() || !route) { notify('Enter student details and select a route.'); return; }
    if (!route.stops.some(s => s.id === allocationForm.pickupStopId) || !route.stops.some(s => s.id === allocationForm.dropStopId)) { notify('Select valid pickup and drop stops.'); return; }
    const vehicle = state.vehicles.find(v => v.id === route.vehicleId);
    if (!vehicle || vehicle.status !== 'Active') { notify('The selected route does not have an active vehicle.'); return; }
    if (activeAllocations.filter(a => routes.find(r => r.id === a.routeId)?.vehicleId === vehicle.id).length >= vehicle.capacity) { notify('This route vehicle has reached its seating capacity.'); return; }
    if (state.allocations.some(a => a.status === 'Active' && a.studentId.toLowerCase() === allocationForm.studentId.trim().toLowerCase())) { notify('This student already has an active transport allocation.'); return; }
    const pickup = route.stops.find(s => s.id === allocationForm.pickupStopId)!;
    const fee = pickup.monthlyFee;
    const item: StudentAllocation = { ...allocationForm, studentId: allocationForm.studentId.trim(), studentName: allocationForm.studentName.trim(), monthlyFee: fee, id: transportService.createId('ALC', state.allocations) };
    persist({ ...state, allocations: [item, ...state.allocations] });
    setModal(null); setAllocationForm({ studentId:'', studentName:'', className:'', routeId:'', pickupStopId:'', dropStopId:'', monthlyFee:0, startDate:today(), status:'Active' });
    notify('Student transport allocation saved.');
  };
  const deactivateAllocation = (id: string) => {
    persist({ ...state, allocations: state.allocations.map(a => a.id === id ? { ...a, status: 'Inactive' } : a) });
    notify('Transport allocation ended and seat released.');
  };
  const saveLog = (allocation: StudentAllocation, status: PickupDropStatus) => {
    const exists = state.logs.some(l => l.date === logDate && l.shift === logShift && l.allocationId === allocation.id);
    if (exists) { notify('A log already exists for this student, date and shift.'); return; }
    const now = new Date();
    const log: TransportLog = { id: transportService.createId('LOG', state.logs), date: logDate, shift: logShift, allocationId: allocation.id, routeId: allocation.routeId, status, time: now.toTimeString().slice(0,5) };
    persist({ ...state, logs: [log, ...state.logs] });
  };
  const setLogStatus = (log: TransportLog, status: PickupDropStatus) => persist({ ...state, logs: state.logs.map(l => l.id === log.id ? { ...l, status } : l) });
  const selectedLogAllocations = activeAllocations.filter(a => logRoute === 'All' || a.routeId === logRoute);

  const heading = section === 'Dashboard' ? 'Transport Dashboard' : section;
  const subtitle: Record<Section, string> = {
    Dashboard: 'Overview of routes, fleet capacity and student transport.',
    'Routes & Stops': 'Create routes and manage their pickup and drop stops.',
    Vehicles: 'Maintain school transport vehicle records and seating capacity.',
    'Drivers': 'Maintain driver contact and licence information.',
    'Student Allocation': 'Assign students to routes, pickup points and drop-off points.',
    'Pickup & Drop Logs': 'Record daily student pickup and drop-off status.',
    'Transport Fees': 'View monthly transport charges mapped to active student allocations.',
  };

  return <div className="flex w-full flex-col space-y-6">
    <section className="flex flex-col justify-between gap-4 border-b border-outline-variant/30 pb-5 pt-1 sm:flex-row sm:items-center">
      <div><div className="flex items-center gap-2"><span className="material-symbols-outlined text-primary">directions_bus</span><h1 className="text-2xl font-bold tracking-tight text-on-surface">{heading}</h1></div><p className="mt-1 text-sm text-on-surface-variant">{subtitle[section]}</p></div>
      <div className="flex flex-wrap gap-2">
        {section === 'Routes & Stops' && <button className={`${button} bg-primary text-white hover:opacity-90`} onClick={() => openRoute()}> <span className="material-symbols-outlined text-lg">add</span> Add Route</button>}
        {section === 'Vehicles' && <button className={`${button} bg-primary text-white hover:opacity-90`} onClick={() => openVehicle()}> <span className="material-symbols-outlined text-lg">add</span> Add Vehicle</button>}
        {section === 'Drivers' && <button className={`${button} bg-primary text-white hover:opacity-90`} onClick={() => openStaff()}> <span className="material-symbols-outlined text-lg">add</span> Add Driver</button>}
        {section === 'Student Allocation' && <button className={`${button} bg-primary text-white hover:opacity-90`} onClick={() => { setEditingId(null); setModal('allocation'); }}> <span className="material-symbols-outlined text-lg">add</span> Assign Student</button>}
      </div>
    </section>

    {section !== 'Dashboard' && section !== 'Pickup & Drop Logs' && section !== 'Transport Fees' && <div className="relative max-w-md"><span className="material-symbols-outlined absolute left-3 top-2.5 text-lg text-on-surface-variant">search</span><input className={`${input} pl-10`} value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${section.toLowerCase()}...`} /></div>}

    {section === 'Dashboard' && <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total Vehicles" value={state.vehicles.length} detail={`${state.vehicles.filter(v => v.status === 'Active').length} active`} icon="directions_bus" />
        <Stat title="Active Routes" value={routes.filter(r => r.status === 'Active').length} detail="Configured transport routes" icon="route" />
        <Stat title="Transport Students" value={activeAllocations.length} detail={`${totalCapacity - activeAllocations.length} fleet seats remaining`} icon="groups" />
        <Stat title="Monthly Transport Fees" value={money(monthlyRevenue)} detail="Based on active allocations" icon="payments" />
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="rounded-xl border border-outline-variant/40 bg-white p-5"><div className="mb-4 flex items-center justify-between"><h2 className="font-bold text-on-surface">Route Occupancy</h2><button className="text-sm font-semibold text-primary" onClick={() => onNavigate('Routes & Stops')}>Manage routes</button></div>
          {routes.length ? <div className="space-y-4">{routes.map(r => { const v = state.vehicles.find(x => x.id === r.vehicleId); const used = capacityUsed(r.id); const pct = v ? Math.min(100, used / v.capacity * 100) : 0; return <div key={r.id}><div className="mb-1 flex justify-between text-sm"><span className="font-medium">{r.code} · {r.name}</span><span className="text-on-surface-variant">{used}/{v?.capacity ?? 0} seats</span></div><div className="h-2 overflow-hidden rounded-full bg-surface-container"><div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} /></div></div>; })}</div> : <p className="text-sm text-on-surface-variant">No routes have been created.</p>}
        </div>
        <div className="rounded-xl border border-outline-variant/40 bg-white p-5"><div className="mb-4 flex items-center justify-between"><h2 className="font-bold text-on-surface">Today's Pickup & Drop Logs</h2><button className="text-sm font-semibold text-primary" onClick={() => onNavigate('Pickup & Drop Logs')}>Open logs</button></div>
          <div className="grid grid-cols-2 gap-3"><div className="rounded-lg bg-surface-container-low p-4"><p className="text-xs text-on-surface-variant">Morning pickup records</p><p className="mt-1 text-xl font-bold">{todayLogs.filter(l => l.shift === 'Morning Pickup').length}</p></div><div className="rounded-lg bg-surface-container-low p-4"><p className="text-xs text-on-surface-variant">Afternoon drop records</p><p className="mt-1 text-xl font-bold">{todayLogs.filter(l => l.shift === 'Afternoon Drop-off').length}</p></div></div>
          <div className="mt-4 space-y-2">{todayLogs.slice(0,5).map(l => { const a = state.allocations.find(x => x.id === l.allocationId); return <div key={l.id} className="flex items-center justify-between border-b border-outline-variant/30 pb-2 text-sm"><span>{a?.studentName ?? 'Student'} · {l.shift}</span><span className="text-on-surface-variant">{l.status}</span></div>; })}{!todayLogs.length && <p className="text-sm text-on-surface-variant">No transport attendance has been recorded today.</p>}</div>
        </div>
      </div>
    </>}

    {section === 'Routes & Stops' && <div className="space-y-4">{filteredRoutes.map(route => <article key={route.id} className="overflow-hidden rounded-xl border border-outline-variant/40 bg-white shadow-sm">
      <div className="flex flex-col justify-between gap-3 border-b border-outline-variant/30 bg-surface-container-low/40 p-4 md:flex-row md:items-center"><div><div className="flex flex-wrap items-center gap-2"><h2 className="font-bold">{route.code} · {route.name}</h2><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${route.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{route.status}</span></div><p className="mt-1 text-xs text-on-surface-variant">{route.description || 'No description'} · {capacityUsed(route.id)} students assigned</p></div><div className="flex flex-wrap gap-2"><button className={`${button} border border-outline-variant bg-white`} onClick={() => openStop(route.id)}>Add Stop</button><button className={`${button} border border-outline-variant bg-white`} onClick={() => openRoute(route)}>Edit Route</button></div></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-white text-xs text-on-surface-variant"><tr><th className="px-4 py-3">Order</th><th className="px-4 py-3">Stop / Landmark</th><th className="px-4 py-3">Morning Pickup</th><th className="px-4 py-3">Afternoon Drop</th><th className="px-4 py-3">Monthly Fee</th><th className="px-4 py-3">Actions</th></tr></thead><tbody>{route.stops.map(stop => <tr key={stop.id} className="border-t border-outline-variant/30"><td className="px-4 py-3">{stop.order}</td><td className="px-4 py-3"><p className="font-medium">{stop.name}</p><p className="text-xs text-on-surface-variant">{stop.landmark}</p></td><td className="px-4 py-3">{stop.morningTime}</td><td className="px-4 py-3">{stop.afternoonTime}</td><td className="px-4 py-3">{money(stop.monthlyFee)}</td><td className="px-4 py-3"><button className="mr-3 text-primary" onClick={() => openStop(route.id, stop)}>Edit</button><button className="text-rose-600" onClick={() => deleteStop(route.id, stop.id)}>Delete</button></td></tr>)}{!route.stops.length && <tr><td colSpan={6} className="px-4 py-6 text-center text-on-surface-variant">No stops added to this route.</td></tr>}</tbody></table></div>
      <div className="flex flex-wrap gap-x-5 gap-y-1 px-4 py-3 text-xs text-on-surface-variant"><span>Vehicle: {state.vehicles.find(v => v.id === route.vehicleId)?.registration || 'Not assigned'}</span><span>Driver: {state.staff.find(s => s.id === route.driverId)?.name || 'Not assigned'}</span></div>
    </article>)}{!filteredRoutes.length && <Empty text="No routes found. Add a route to get started." />}</div>}

    {section === 'Vehicles' && <div className="overflow-hidden rounded-xl border border-outline-variant/40 bg-white"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-surface-container-low text-xs text-on-surface-variant"><tr>{['Vehicle','Registration','Make / Model','Capacity','Status','Actions'].map(x => <th key={x} className="px-4 py-3">{x}</th>)}</tr></thead><tbody>{filteredVehicles.map(v => <tr key={v.id} className="border-t border-outline-variant/30"><td className="px-4 py-3 font-semibold">{v.type}</td><td className="px-4 py-3">{v.registration}</td><td className="px-4 py-3">{v.makeModel}</td><td className="px-4 py-3">{v.capacity} seats</td><td className="px-4 py-3"><span className="rounded-full bg-surface-container-low px-2.5 py-1 text-xs">{v.status}</span></td><td className="px-4 py-3"><button className="text-primary" onClick={() => openVehicle(v)}>Edit</button></td></tr>)}{!filteredVehicles.length && <tr><td colSpan={6} className="p-8 text-center text-on-surface-variant">No vehicles found.</td></tr>}</tbody></table></div>}

    {section === 'Drivers' && <div className="overflow-hidden rounded-xl border border-outline-variant/40 bg-white"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-surface-container-low text-xs text-on-surface-variant"><tr>{['Name','Role','Phone','Driving Licence','Licence Expiry','Actions'].map(x => <th key={x} className="px-4 py-3">{x}</th>)}</tr></thead><tbody>{filteredStaff.map(s => <tr key={s.id} className="border-t border-outline-variant/30"><td className="px-4 py-3 font-semibold">{s.name}</td><td className="px-4 py-3">{s.role}</td><td className="px-4 py-3">{s.phone}</td><td className="px-4 py-3">{s.licenseNumber || '—'}</td><td className="px-4 py-3">{s.licenseExpiry || '—'}</td><td className="px-4 py-3"><button className="text-primary" onClick={() => openStaff(s)}>Edit</button></td></tr>)}{!filteredStaff.length && <tr><td colSpan={6} className="p-8 text-center text-on-surface-variant">No staff records found.</td></tr>}</tbody></table></div>}

    {section === 'Student Allocation' && <div className="overflow-hidden rounded-xl border border-outline-variant/40 bg-white"><table className="w-full min-w-[950px] text-left text-sm"><thead className="bg-surface-container-low text-xs text-on-surface-variant"><tr>{['Student','Class / ID','Route','Pickup → Drop','Monthly Fee','Status','Action'].map(x => <th key={x} className="px-3 py-3">{x}</th>)}</tr></thead><tbody>{filteredAllocations.map(a => { const r = routes.find(x => x.id === a.routeId); const stopName = (id:string) => r?.stops.find(s => s.id === id)?.name || '—'; return <tr key={a.id} className="border-t border-outline-variant/30"><td className="px-3 py-3"><p className="font-semibold">{a.studentName}</p></td><td className="px-3 py-3">{a.className || '—'}<p className="text-xs text-on-surface-variant">{a.studentId}</p></td><td className="px-3 py-3">{r?.code || '—'}</td><td className="px-3 py-3">{stopName(a.pickupStopId)} → {stopName(a.dropStopId)}</td><td className="px-3 py-3">{money(a.monthlyFee)}</td><td className="px-3 py-3">{a.status}</td><td className="px-3 py-3">{a.status === 'Active' && <button className="text-rose-600" onClick={() => deactivateAllocation(a.id)}>End</button>}</td></tr>; })}{!filteredAllocations.length && <tr><td colSpan={7} className="p-8 text-center text-on-surface-variant">No student transport allocations found.</td></tr>}</tbody></table></div>}

    {section === 'Pickup & Drop Logs' && <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3 rounded-xl border border-outline-variant/40 bg-white p-4"><label className="min-w-[150px] flex-1"><span className={label}>Date</span><input type="date" className={input} value={logDate} onChange={e => setLogDate(e.target.value)} /></label><label className="min-w-[180px] flex-1"><span className={label}>Shift</span><select className={input} value={logShift} onChange={e => setLogShift(e.target.value as TripShift)}><option>Morning Pickup</option><option>Afternoon Drop-off</option></select></label><label className="min-w-[180px] flex-1"><span className={label}>Route</span><select className={input} value={logRoute} onChange={e => setLogRoute(e.target.value)}><option value="All">All Routes</option>{routes.map(r => <option key={r.id} value={r.id}>{r.code} - {r.name}</option>)}</select></label></div>
      <div className="overflow-hidden rounded-xl border border-outline-variant/40 bg-white"><table className="w-full min-w-[800px] text-left text-sm"><thead className="bg-surface-container-low text-xs text-on-surface-variant"><tr>{['Student','Route','Status','Action'].map(x => <th key={x} className="px-4 py-3">{x}</th>)}</tr></thead><tbody>{selectedLogAllocations.map(a => { const existing = state.logs.find(l => l.date === logDate && l.shift === logShift && l.allocationId === a.id); const statuses: PickupDropStatus[] = ['Boarded','Dropped Off','Absent']; return <tr key={a.id} className="border-t border-outline-variant/30"><td className="px-4 py-3 font-semibold">{a.studentName}<p className="text-xs font-normal text-on-surface-variant">{a.studentId}</p></td><td className="px-4 py-3">{routes.find(r => r.id === a.routeId)?.code}</td><td className="px-4 py-3">{existing ? <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs text-emerald-700">{existing.status} · {existing.time}</span> : <span className="text-xs text-on-surface-variant">Not marked</span>}</td><td className="px-4 py-3"><div className="flex flex-wrap gap-1">{statuses.map(status => <button key={status} disabled={!!existing} className="rounded-md border border-outline-variant px-2 py-1 text-xs hover:bg-surface-container-low disabled:opacity-40" onClick={() => saveLog(a,status)}>{status}</button>)}</div></td></tr>; })}{!selectedLogAllocations.length && <tr><td colSpan={4} className="p-8 text-center text-on-surface-variant">No active students are allocated to the selected shift and route.</td></tr>}</tbody></table></div>
      <div className="rounded-xl border border-outline-variant/40 bg-white p-4"><h2 className="mb-3 font-bold">Saved Attendance Logs</h2><div className="overflow-x-auto"><table className="w-full min-w-[600px] text-left text-sm"><thead className="text-xs text-on-surface-variant"><tr><th className="py-2">Date</th><th>Shift</th><th>Student</th><th>Status</th><th>Time</th></tr></thead><tbody>{state.logs.filter(l => l.date === logDate && (logRoute === 'All' || l.routeId === logRoute)).map(l => <tr key={l.id} className="border-t border-outline-variant/30"><td className="py-2">{l.date}</td><td>{l.shift}</td><td>{state.allocations.find(a => a.id === l.allocationId)?.studentName || '—'}</td><td><select className="rounded border border-outline-variant px-2 py-1" value={l.status} onChange={e => setLogStatus(l,e.target.value as PickupDropStatus)}><option>Boarded</option><option>Dropped Off</option><option>Absent</option></select></td><td>{l.time}</td></tr>)}{!state.logs.some(l => l.date === logDate && (logRoute === 'All' || l.routeId === logRoute)) && <tr><td colSpan={5} className="py-4 text-center text-on-surface-variant">No saved logs for this date.</td></tr>}</tbody></table></div></div>
    </div>}

    {section === 'Transport Fees' && <div className="space-y-4"><div className="grid grid-cols-1 gap-4 sm:grid-cols-3"><Stat title="Active Transport Students" value={activeAllocations.length} detail="Current active allocations" icon="groups" /><Stat title="Monthly Transport Charges" value={money(monthlyRevenue)} detail="Calculated from active allocations" icon="payments" /><Stat title="Inactive Allocations" value={state.allocations.filter(a => a.status === 'Inactive').length} detail="No longer included in charges" icon="person_off" /></div><div className="overflow-hidden rounded-xl border border-outline-variant/40 bg-white"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-surface-container-low text-xs text-on-surface-variant"><tr><th className="px-4 py-3">Student</th><th className="px-4 py-3">Route / Pickup Stop</th><th className="px-4 py-3">Monthly Charge</th><th className="px-4 py-3">Start Date</th><th className="px-4 py-3">Status</th></tr></thead><tbody>{state.allocations.map(a => <tr key={a.id} className="border-t border-outline-variant/30"><td className="px-4 py-3 font-semibold">{a.studentName}<p className="text-xs font-normal text-on-surface-variant">{a.studentId}</p></td><td className="px-4 py-3">{routes.find(r => r.id === a.routeId)?.code} · {routes.find(r => r.id === a.routeId)?.stops.find(s => s.id === a.pickupStopId)?.name}</td><td className="px-4 py-3">{money(a.monthlyFee)}</td><td className="px-4 py-3">{a.startDate}</td><td className="px-4 py-3">{a.status}</td></tr>)}{!state.allocations.length && <tr><td colSpan={5} className="p-8 text-center text-on-surface-variant">No transport fees are mapped yet. Assign a student to a route to calculate their monthly charge.</td></tr>}</tbody></table></div><p className="text-xs text-on-surface-variant">Transport charges are calculated and displayed here only. The current Fees & Accounts module does not expose a shared challan integration service.</p></div>}

    {modal && <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4" onMouseDown={e => { if (e.target === e.currentTarget) setModal(null); }}>
      <section role="dialog" aria-modal="true" className="my-6 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-outline-variant/40 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-outline-variant/30 px-5 py-4"><h2 className="font-bold text-on-surface">{modal === 'route' ? (editingId ? 'Edit Route' : 'Add Route') : modal === 'stop' ? (editingId ? 'Edit Stop' : 'Add Stop') : modal === 'vehicle' ? (editingId ? 'Edit Vehicle' : 'Add Vehicle') : modal === 'staff' ? (editingId ? 'Edit Transport Staff' : 'Add Driver') : 'Assign Student to Transport'}</h2><button onClick={() => setModal(null)} className="rounded-lg p-1 text-on-surface-variant hover:bg-surface-container-low"><span className="material-symbols-outlined">close</span></button></div>
        {modal === 'route' && <form onSubmit={saveRoute} className="space-y-4 p-5"><div className="grid gap-3 sm:grid-cols-2"><Field label="Route Code" value={routeForm.code} onChange={v => setRouteForm({...routeForm,code:v})} required /><Field label="Route Name" value={routeForm.name} onChange={v => setRouteForm({...routeForm,name:v})} required /><Field label="Description" value={routeForm.description} onChange={v => setRouteForm({...routeForm,description:v})} /><SelectField label="Vehicle" value={routeForm.vehicleId} onChange={v => setRouteForm({...routeForm,vehicleId:v})} options={state.vehicles.map(v => [v.id,`${v.registration} (${v.capacity} seats)`])} /><SelectField label="Driver" value={routeForm.driverId} onChange={v => setRouteForm({...routeForm,driverId:v})} options={state.staff.filter(s => s.role === 'Driver').map(s => [s.id,s.name])} /><SelectField label="Status" value={routeForm.status} onChange={v => setRouteForm({...routeForm,status:v as 'Active'|'Inactive'})} options={[['Active','Active'],['Inactive','Inactive']]} /></div><ModalActions onCancel={() => setModal(null)} /></form>}
        {modal === 'stop' && <form onSubmit={saveStop} className="space-y-4 p-5"><div className="grid gap-3 sm:grid-cols-2"><Field label="Stop Name" value={stopForm.name} onChange={v => setStopForm({...stopForm,name:v})} required /><Field label="Landmark" value={stopForm.landmark} onChange={v => setStopForm({...stopForm,landmark:v})} /><Field label="Stop Order" type="number" value={String(stopForm.order)} onChange={v => setStopForm({...stopForm,order:Number(v)})} required /><Field label="Monthly Fee (Rs.)" type="number" value={String(stopForm.monthlyFee)} onChange={v => setStopForm({...stopForm,monthlyFee:Number(v)})} required /><Field label="Morning Pickup Time" type="time" value={stopForm.morningTime} onChange={v => setStopForm({...stopForm,morningTime:v})} /><Field label="Afternoon Drop Time" type="time" value={stopForm.afternoonTime} onChange={v => setStopForm({...stopForm,afternoonTime:v})} /></div><ModalActions onCancel={() => setModal(null)} /></form>}
        {modal === 'vehicle' && <form onSubmit={saveVehicle} className="space-y-4 p-5"><div className="grid gap-3 sm:grid-cols-2"><SelectField label="Vehicle Type" value={vehicleForm.type} onChange={v => setVehicleForm({...vehicleForm,type:v})} options={['Bus','Coaster','Van','Hiace'].map(v => [v,v])} /><Field label="Registration Number" value={vehicleForm.registration} onChange={v => setVehicleForm({...vehicleForm,registration:v})} required /><Field label="Make / Model" value={vehicleForm.makeModel} onChange={v => setVehicleForm({...vehicleForm,makeModel:v})} /><Field label="Seating Capacity" type="number" value={String(vehicleForm.capacity)} onChange={v => setVehicleForm({...vehicleForm,capacity:Number(v)})} required /><SelectField label="Operational Status" value={vehicleForm.status} onChange={v => setVehicleForm({...vehicleForm,status:v as TransportVehicle['status']})} options={['Active','Under Maintenance','Out of Service'].map(v => [v,v])} /></div><ModalActions onCancel={() => setModal(null)} /></form>}
        {modal === 'staff' && <form onSubmit={saveStaff} className="space-y-4 p-5"><div className="grid gap-3 sm:grid-cols-2"><Field label="Full Name" value={staffForm.name} onChange={v => setStaffForm({...staffForm,name:v})} required /><SelectField label="Role" value={staffForm.role} onChange={v => setStaffForm({...staffForm,role:v as 'Driver'})} options={[[ 'Driver','Driver' ]]} /><Field label="Phone Number" value={staffForm.phone} onChange={v => setStaffForm({...staffForm,phone:v})} required /><Field label="Driving Licence Number" value={staffForm.licenseNumber} onChange={v => setStaffForm({...staffForm,licenseNumber:v})} /><Field label="Licence Expiry Date" type="date" value={staffForm.licenseExpiry} onChange={v => setStaffForm({...staffForm,licenseExpiry:v})} /></div><ModalActions onCancel={() => setModal(null)} /></form>}
        {modal === 'allocation' && <form onSubmit={saveAllocation} className="space-y-4 p-5"><div className="grid gap-3 sm:grid-cols-2"><Field label="Student ID" value={allocationForm.studentId} onChange={v => setAllocationForm({...allocationForm,studentId:v})} required /><Field label="Student Name" value={allocationForm.studentName} onChange={v => setAllocationForm({...allocationForm,studentName:v})} required /><Field label="Class / Section" value={allocationForm.className} onChange={v => setAllocationForm({...allocationForm,className:v})} /><SelectField label="Route" value={allocationForm.routeId} onChange={v => { const r = routes.find(x => x.id === v); setAllocationForm({...allocationForm,routeId:v,pickupStopId:r?.stops[0]?.id || '',dropStopId:r?.stops.at(-1)?.id || ''}); }} options={routes.filter(r => r.status === 'Active').map(r => [r.id,`${r.code} - ${r.name}`])} /><SelectField label="Pickup Stop" value={allocationForm.pickupStopId} onChange={v => setAllocationForm({...allocationForm,pickupStopId:v})} options={(selectedRoute?.stops ?? []).map(s => [s.id,s.name])} /><SelectField label="Drop-off Stop" value={allocationForm.dropStopId} onChange={v => setAllocationForm({...allocationForm,dropStopId:v})} options={(selectedRoute?.stops ?? []).map(s => [s.id,s.name])} /><Field label="Start Date" type="date" value={allocationForm.startDate} onChange={v => setAllocationForm({...allocationForm,startDate:v})} /><div className="rounded-lg bg-surface-container-low p-3 text-sm"><p className="text-xs text-on-surface-variant">Estimated Monthly Transport Fee</p><p className="mt-1 font-bold">{money((selectedRoute?.stops.find(s => s.id === allocationForm.pickupStopId)?.monthlyFee ?? 0))}</p><p className="mt-1 text-xs text-on-surface-variant">Vehicle capacity: {routeVehicle ? `${capacityUsed(routeVehicle ? selectedRoute!.id : '')}/${routeVehicle.capacity}` : 'Select a route'}</p></div></div><ModalActions onCancel={() => setModal(null)} /></form>}
      </section>
    </div>}
    {toast && <div role="status" className="fixed bottom-5 right-5 z-[120] rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl">{toast}</div>}
  </div>;
};

const Field: React.FC<{ label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }> = ({ label: title, value, onChange, type = 'text', required }) => <label className="block"><span className={label}>{title}{required ? ' *' : ''}</span><input className={input} type={type} value={value} required={required} min={type === 'number' ? 0 : undefined} onChange={e => onChange(e.target.value)} /></label>;
const SelectField: React.FC<{ label: string; value: string; onChange: (value: string) => void; options: string[][] }> = ({ label: title, value, onChange, options }) => <label className="block"><span className={label}>{title}</span><select className={input} value={value} onChange={e => onChange(e.target.value)}><option value="">Select {title}</option>{options.map(([v,t]) => <option key={v} value={v}>{t}</option>)}</select></label>;
const ModalActions: React.FC<{ onCancel: () => void }> = ({ onCancel }) => <div className="flex justify-end gap-2 border-t border-outline-variant/30 pt-4"><button type="button" className={`${button} border border-outline-variant`} onClick={onCancel}>Cancel</button><button type="submit" className={`${button} bg-primary text-white`}>Save</button></div>;
const Empty: React.FC<{ text: string }> = ({ text }) => <div className="rounded-xl border border-dashed border-outline-variant bg-white p-10 text-center text-sm text-on-surface-variant">{text}</div>;

export default TransportPage;
