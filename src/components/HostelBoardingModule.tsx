import React, { useEffect, useMemo, useState } from 'react';
import {
  BedDouble, Users, Wallet, Utensils, ShieldCheck, Plus, Search,
  Pencil, Trash2, X, Building2, DoorOpen, CheckCircle, ArrowLeft
} from 'lucide-react';

export type HostelTab =
  | 'Overview'
  | 'Rooms & Buildings'
  | 'Room Allocation'
  | 'Occupancy Tracking'
  | 'Hostel Fees & Payments'
  | 'Meal Plans & Menus'
  | 'Visitor Management'
  | 'Security Logs';

type RecordItem = { id: string; [key: string]: string };

const tabs: HostelTab[] = [
  'Overview', 'Rooms & Buildings', 'Room Allocation', 'Occupancy Tracking',
  'Hostel Fees & Payments', 'Meal Plans & Menus',
  'Visitor Management', 'Security Logs'
];

const fields: Record<string, string[]> = {
  'Rooms & Buildings': ['Building', 'Room Number', 'Room Type', 'Capacity', 'Floor', 'Status'],
  'Room Allocation': ['Student Name', 'Student ID', 'Room Number', 'Building', 'Allocation Date', 'Status'],
  'Occupancy Tracking': ['Room Number', 'Building', 'Capacity', 'Occupied Beds', 'Available Beds', 'Status'],
  'Hostel Fees & Payments': ['Student Name', 'Student ID', 'Billing Month', 'Amount', 'Paid Amount', 'Due Date', 'Status'],
  'Meal Plans & Menus': ['Plan Name', 'Meal Type', 'Menu', 'Schedule Date', 'Meal Time', 'Status'],
  'Visitor Management': ['Visitor Name', 'Visitor ID', 'Student Name', 'Relationship', 'Visit Date', 'Check In', 'Check Out', 'Status'],
  'Security Logs': ['Log Type', 'Person Name', 'Location', 'Date', 'Time', 'Description', 'Status']
};

const seeds: Record<string, RecordItem[]> = {
  'Rooms & Buildings': [
    { id: 'RM-001', Building: 'Boys Hostel A', 'Room Number': 'A-101', 'Room Type': 'Double Sharing', Capacity: '2', Floor: '1', Status: 'Available' },
    { id: 'RM-002', Building: 'Boys Hostel A', 'Room Number': 'A-102', 'Room Type': 'Triple Sharing', Capacity: '3', Floor: '1', Status: 'Occupied' },
    { id: 'RM-003', Building: 'Girls Hostel B', 'Room Number': 'B-201', 'Room Type': 'Single', Capacity: '1', Floor: '2', Status: 'Available' },
    { id: 'RM-004', Building: 'Girls Hostel B', 'Room Number': 'B-202', 'Room Type': 'Double Sharing', Capacity: '2', Floor: '2', Status: 'Maintenance' }
  ],
  'Room Allocation': [
    { id: 'AL-001', 'Student Name': 'Ali Ahmed', 'Student ID': 'ST-1001', 'Room Number': 'A-102', Building: 'Boys Hostel A', 'Allocation Date': '2026-11-01', Status: 'Active' },
    { id: 'AL-002', 'Student Name': 'Sara Khan', 'Student ID': 'ST-1002', 'Room Number': 'B-201', Building: 'Girls Hostel B', 'Allocation Date': '2026-11-03', Status: 'Active' }
  ],
  'Occupancy Tracking': [
    { id: 'OC-001', 'Room Number': 'A-101', Building: 'Boys Hostel A', Capacity: '2', 'Occupied Beds': '0', 'Available Beds': '2', Status: 'Available' },
    { id: 'OC-002', 'Room Number': 'A-102', Building: 'Boys Hostel A', Capacity: '3', 'Occupied Beds': '2', 'Available Beds': '1', Status: 'Partially Occupied' },
    { id: 'OC-003', 'Room Number': 'B-201', Building: 'Girls Hostel B', Capacity: '1', 'Occupied Beds': '1', 'Available Beds': '0', Status: 'Full' }
  ],
  'Hostel Fees & Payments': [
    { id: 'HF-001', 'Student Name': 'Ali Ahmed', 'Student ID': 'ST-1001', 'Billing Month': 'November 2026', Amount: '18000', 'Paid Amount': '18000', 'Due Date': '2026-11-10', Status: 'Paid' },
    { id: 'HF-002', 'Student Name': 'Sara Khan', 'Student ID': 'ST-1002', 'Billing Month': 'November 2026', Amount: '20000', 'Paid Amount': '10000', 'Due Date': '2026-11-25', Status: 'Partially Paid' },
    { id: 'HF-003', 'Student Name': 'Ahmed Raza', 'Student ID': 'ST-1003', 'Billing Month': 'November 2026', Amount: '18000', 'Paid Amount': '0', 'Due Date': '2026-11-15', Status: 'Pending' }
  ],
  'Meal Plans & Menus': [
    { id: 'ML-001', 'Plan Name': 'Standard Plan', 'Meal Type': 'Breakfast', Menu: 'Egg, Bread, Tea', 'Schedule Date': '2026-11-23', 'Meal Time': '07:30 AM', Status: 'Scheduled' },
    { id: 'ML-002', 'Plan Name': 'Standard Plan', 'Meal Type': 'Lunch', Menu: 'Rice, Chicken, Salad', 'Schedule Date': '2026-11-23', 'Meal Time': '01:00 PM', Status: 'Scheduled' },
    { id: 'ML-003', 'Plan Name': 'Standard Plan', 'Meal Type': 'Dinner', Menu: 'Roti, Daal, Vegetables', 'Schedule Date': '2026-11-23', 'Meal Time': '08:00 PM', Status: 'Scheduled' }
  ],
  'Visitor Management': [
    { id: 'VS-001', 'Visitor Name': 'Muhammad Aslam', 'Visitor ID': 'V-1001', 'Student Name': 'Ali Ahmed', Relationship: 'Father', 'Visit Date': '2026-11-23', 'Check In': '10:30 AM', 'Check Out': '11:15 AM', Status: 'Checked Out' },
    { id: 'VS-002', 'Visitor Name': 'Ayesha Malik', 'Visitor ID': 'V-1002', 'Student Name': 'Sara Khan', Relationship: 'Mother', 'Visit Date': '2026-11-23', 'Check In': '12:00 PM', 'Check Out': '-', Status: 'Checked In' }
  ],
  'Security Logs': [
    { id: 'SL-001', 'Log Type': 'Entry', 'Person Name': 'Muhammad Aslam', Location: 'Main Gate', Date: '2026-11-23', Time: '10:30 AM', Description: 'Visitor entry recorded', Status: 'Resolved' },
    { id: 'SL-002', 'Log Type': 'Inspection', 'Person Name': 'Security Officer', Location: 'Boys Hostel A', Date: '2026-11-23', Time: '09:00 AM', Description: 'Routine security inspection', Status: 'Completed' }
  ]
};

const storageKey = (tab: string) => 'vlearning-hostel-' + tab.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const loadRecords = (tab: string): RecordItem[] => {
  try {
    const value = localStorage.getItem(storageKey(tab));
    return value ? JSON.parse(value) : seeds[tab] ?? [];
  } catch { return seeds[tab] ?? []; }
};

const card = 'bg-white rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_12px_28px_rgba(37,99,235,0.12)]';
const input = 'w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100';
const money = (value: string | undefined) => `Rs. ${Number(value || 0).toLocaleString('en-PK')}`;

export default function HostelBoardingModule({ initialTab = 'Overview', onTabChange }: { initialTab?: HostelTab; onTabChange?: (tab: HostelTab) => void }) {
  const [tab, setTab] = useState<HostelTab>(initialTab);
  const [data, setData] = useState<Record<string, RecordItem[]>>(() =>
    Object.fromEntries(Object.keys(fields).map(key => [key, loadRecords(key)]))
  );
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');

  const changeTab = (nextTab: HostelTab) => {
    setTab(nextTab);
    onTabChange?.(nextTab);
  };

  useEffect(() => setTab(initialTab), [initialTab]);
  useEffect(() => {
    Object.keys(fields).forEach(key => localStorage.setItem(storageKey(key), JSON.stringify(data[key] ?? [])));
  }, [data]);

  const records = data[tab] ?? [];
  const visible = useMemo(() => records.filter(row =>
    Object.values(row).join(' ').toLowerCase().includes(search.toLowerCase()) &&
    (filter === 'All' || row.Status === filter)
  ), [records, search, filter]);

  const openForm = (record?: RecordItem) => {
    setEditing(record?.id ?? null);
    setForm(Object.fromEntries((fields[tab] ?? []).map(field => [field, record?.[field] ?? ''])));
    setMessage('');
    setModal(true);
  };

  const save = (event: React.FormEvent) => {
    event.preventDefault();
    const required = fields[tab].slice(0, 2);
    if (required.some(field => !form[field]?.trim())) {
      setMessage('Please complete the required fields.');
      return;
    }
    const prefix: Record<string, string> = {
      'Rooms & Buildings': 'RM', 'Room Allocation': 'AL', 'Occupancy Tracking': 'OC',
      'Hostel Fees & Payments': 'HF', 'Meal Plans & Menus': 'ML',
      'Visitor Management': 'VS', 'Security Logs': 'SL'
    };
    const updated: RecordItem = {
      ...form,
      id: editing ?? `${prefix[tab]}-${String(Date.now()).slice(-6)}`
    };
    setData(previous => ({
      ...previous,
      [tab]: editing
        ? previous[tab].map(item => item.id === editing ? updated : item)
        : [updated, ...(previous[tab] ?? [])]
    }));
    setModal(false);
  };

  const remove = (id: string) => {
    if (!window.confirm('Delete this record? This action cannot be undone.')) return;
    setData(previous => ({ ...previous, [tab]: previous[tab].filter(item => item.id !== id) }));
  };

  const updateStatus = (record: RecordItem, status: string) => {
    setData(previous => ({
      ...previous,
      [tab]: previous[tab].map(item => item.id === record.id ? { ...item, Status: status } : item)
    }));
  };

  const all = Object.values(data).flat();
  const totalBeds = (data['Occupancy Tracking'] ?? []).reduce((sum, r) => sum + Number(r.Capacity || 0), 0);
  const occupiedBeds = (data['Occupancy Tracking'] ?? []).reduce((sum, r) => sum + Number(r['Occupied Beds'] || 0), 0);
  const feeTotal = (data['Hostel Fees & Payments'] ?? []).reduce((sum, r) => sum + Number(r.Amount || 0), 0);
  const feePaid = (data['Hostel Fees & Payments'] ?? []).reduce((sum, r) => sum + Number(r['Paid Amount'] || 0), 0);
  const activeVisitors = (data['Visitor Management'] ?? []).filter(r => r.Status === 'Checked In').length;

  const statCards = [
    { label: 'Total Rooms', value: String((data['Rooms & Buildings'] ?? []).length), icon: BedDouble, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Occupied Beds', value: `${occupiedBeds} / ${totalBeds}`, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Hostel Fee Received', value: money(String(feePaid)), icon: Wallet, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Visitors Inside', value: String(activeVisitors), icon: ShieldCheck, color: 'text-violet-600', bg: 'bg-violet-50' }
  ];

  const columns = fields[tab] ?? [];
  const statuses = Array.from(new Set(records.map(row => row.Status).filter(Boolean)));

  return <div className="space-y-6 w-full">
    <section className={`${card} p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
      <div>
        <p className="text-xs text-slate-500 mb-2">Dashboard / Hostel / <span className="text-blue-700 font-semibold">{tab}</span></p>
        <h1 className="text-2xl font-bold text-slate-900">Hostel / Boarding Management</h1>
        <p className="text-sm text-slate-500 mt-1">Manage hostel rooms, student accommodation, fees, meals and security.</p>
      </div>
      {tab !== 'Overview' && <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => { changeTab("Overview"); setSearch(""); setFilter("All"); }} className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 hover:border-blue-400"><ArrowLeft size={17}/> Back to Overview</button>
        <button onClick={() => openForm()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 hover:shadow-lg"><Plus size={17}/> Add New Record</button>
      </div>}
    </section>


    {tab === 'Overview' ? <>
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map(stat => <div key={stat.label} className={`${card} p-5`}>
          <div className="flex items-center justify-between"><span className="text-sm text-slate-500">{stat.label}</span><span className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}><stat.icon size={21}/></span></div>
          <p className="text-2xl font-bold text-slate-900 mt-4">{stat.value}</p>
          <p className="text-xs text-slate-400 mt-1">Current hostel records</p>
        </div>)}
      </section>
      <section className={`${card} p-5`}>
        <div className="flex items-center gap-2 mb-4"><Building2 className="text-blue-700"/><h2 className="font-bold text-slate-900">Hostel Management</h2></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {tabs.slice(1).map((item, index) => {
            const icons = [BedDouble, Users, DoorOpen, Wallet, Utensils, Users, ShieldCheck];
            const Icon = icons[index];
            return <button key={item} onClick={() => changeTab(item)} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left hover:border-blue-300 hover:bg-blue-50/40 transition">
              <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center"><Icon size={20}/></span>
              <span className="flex-1"><span className="block text-sm font-semibold text-slate-800">{item}</span><span className="text-xs text-slate-500">{(data[item] ?? []).length} records</span></span>
              <span className="text-slate-400">→</span>
            </button>;
          })}
        </div>
      </section>
      <section className={`${card} p-5`}>
        <h2 className="font-bold text-slate-900 mb-4">Fee Collection Summary</h2>
        <div className="flex justify-between text-sm mb-2"><span className="text-slate-500">Received</span><strong>{money(String(feePaid))}</strong></div>
        <div className="h-3 rounded-full bg-slate-100 overflow-hidden"><div className="h-full bg-emerald-500 rounded-full" style={{ width: `${feeTotal ? Math.min(100, feePaid / feeTotal * 100) : 0}%` }}/></div>
        <div className="flex justify-between text-xs text-slate-500 mt-2"><span>{feeTotal ? Math.round(feePaid / feeTotal * 100) : 0}% collected</span><span>Outstanding: {money(String(Math.max(0, feeTotal - feePaid)))}</span></div>
      </section>
    </> : <>
      <section className={`${card} p-4 flex flex-col sm:flex-row gap-3`}>
        <div className="relative flex-1"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${tab.toLowerCase()}...`} className={`${input} pl-10`}/></div>
        <select value={filter} onChange={e => setFilter(e.target.value)} className={`${input} sm:w-52`}><option value="All">All Statuses</option>{statuses.map(status => <option key={status}>{status}</option>)}</select>
      </section>
      <section className={`${card} overflow-hidden`}>
        <div className="p-5 border-b border-slate-100 flex items-center justify-between"><div><h2 className="font-bold text-slate-900">{tab}</h2><p className="text-xs text-slate-500 mt-1">{visible.length} records found</p></div><span className="text-xs text-slate-500">Manage records and actions</span></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-sm text-left">
            <thead className="bg-slate-50 text-xs text-slate-500"><tr><th className="px-4 py-3">Record ID</th>{columns.map(col => <th key={col} className="px-4 py-3">{col}</th>)}<th className="px-4 py-3">Actions</th></tr></thead>
            <tbody>{visible.map(record => <tr key={record.id} className="border-t border-slate-100 hover:bg-slate-50/60">
              <td className="px-4 py-3 font-semibold text-blue-700">{record.id}</td>
              {columns.map(col => <td key={col} className="px-4 py-3 text-slate-700">{col === 'Amount' || col === 'Paid Amount' ? money(record[col]) : col === 'Status' ? <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${['Paid','Active','Available','Checked Out','Resolved','Completed'].includes(record[col]) ? 'bg-emerald-50 text-emerald-700' : ['Pending','Maintenance','Checked In'].includes(record[col]) ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`}>{record[col]}</span> : record[col]}</td>)}
              <td className="px-4 py-3"><div className="flex items-center gap-1">
                {tab === 'Visitor Management' && record.Status === 'Checked In' && <button title="Check out visitor" onClick={() => updateStatus(record, 'Checked Out')} className="p-2 rounded-lg text-emerald-700 hover:bg-emerald-50"><CheckCircle size={16}/></button>}
                <button title="Edit" onClick={() => openForm(record)} className="p-2 rounded-lg text-blue-700 hover:bg-blue-50"><Pencil size={16}/></button>
                <button title="Delete" onClick={() => remove(record.id)} className="p-2 rounded-lg text-red-600 hover:bg-red-50"><Trash2 size={16}/></button>
              </div></td>
            </tr>)}
            {!visible.length && <tr><td colSpan={columns.length + 2} className="p-10 text-center text-slate-500">No records found. Add a new record to get started.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
      {tab === 'Hostel Fees & Payments' && <section className={`${card} p-5 grid grid-cols-1 sm:grid-cols-3 gap-4`}>
        <div><p className="text-xs text-slate-500">Total Billed</p><p className="text-xl font-bold">{money(String(feeTotal))}</p></div>
        <div><p className="text-xs text-slate-500">Total Received</p><p className="text-xl font-bold text-emerald-700">{money(String(feePaid))}</p></div>
        <div><p className="text-xs text-slate-500">Outstanding</p><p className="text-xl font-bold text-amber-700">{money(String(Math.max(0, feeTotal - feePaid)))}</p></div>
      </section>}
      {tab === 'Occupancy Tracking' && <section className={`${card} p-5`}>
        <h3 className="font-semibold mb-3">Overall Bed Occupancy</h3>
        <div className="h-3 rounded-full bg-slate-100 overflow-hidden"><div className="h-full bg-blue-600 rounded-full" style={{ width: `${totalBeds ? occupiedBeds / totalBeds * 100 : 0}%` }}/></div>
        <p className="text-sm text-slate-500 mt-2">{occupiedBeds} occupied of {totalBeds} total beds · {Math.max(0, totalBeds - occupiedBeds)} available</p>
      </section>}
    </>}

    {modal && <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/40 p-4 overflow-y-auto" onMouseDown={e => { if (e.target === e.currentTarget) setModal(false); }}>
      <form onSubmit={save} className="my-auto w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between"><div><h2 className="text-lg font-bold text-slate-900">{editing ? 'Edit Record' : 'Add New Record'}</h2><p className="text-xs text-slate-500 mt-1">{tab}</p></div><button type="button" onClick={() => setModal(false)} className="rounded-lg p-2 hover:bg-slate-100"><X size={20}/></button></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields[tab].map(field => <label key={field} className="block text-xs font-semibold text-slate-600">{field}{['Capacity','Occupied Beds','Available Beds','Amount','Paid Amount'].includes(field) ? <input required type="number" min="0" value={form[field] ?? ''} onChange={e => setForm(previous => ({ ...previous, [field]: e.target.value }))} className={`${input} mt-1.5`}/> : field === 'Status' ? <select value={form[field] ?? (tab === 'Visitor Management' ? 'Checked In' : 'Active')} onChange={e => setForm(previous => ({ ...previous, [field]: e.target.value }))} className={`${input} mt-1.5`}>{(tab === 'Visitor Management' ? ['Checked In','Checked Out'] : tab === 'Rooms & Buildings' ? ['Available','Occupied','Maintenance'] : tab === 'Hostel Fees & Payments' ? ['Pending','Partially Paid','Paid','Overdue'] : tab === 'Security Logs' ? ['Open','Resolved','Completed'] : ['Active','Inactive','Scheduled','Completed']).map(status => <option key={status}>{status}</option>)}</select> : field.toLowerCase().includes('date') ? <input type="date" value={form[field] ?? ''} onChange={e => setForm(previous => ({ ...previous, [field]: e.target.value }))} className={`${input} mt-1.5`}/> : <input required={fields[tab].indexOf(field) < 2} value={form[field] ?? ''} onChange={e => setForm(previous => ({ ...previous, [field]: e.target.value }))} className={`${input} mt-1.5`} placeholder={`Enter ${field.toLowerCase()}`}/>}</label>)}
        </div>
        <div className="flex justify-end gap-2 border-t border-slate-100 pt-4"><button type="button" onClick={() => setModal(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold">Cancel</button><button type="submit" className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800">Save Record</button></div>
        {message && <p className="text-sm text-red-600">{message}</p>}
      </form>
    </div>}
  </div>;
}


