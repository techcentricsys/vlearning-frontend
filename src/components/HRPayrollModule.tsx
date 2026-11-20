import React, { useEffect, useState } from 'react';
import {
  Users, UserPlus, CalendarCheck, Wallet, ClipboardList,
  FileBarChart, Search, Plus, Pencil, Trash2, X, Check,
  XCircle, ChevronRight, Clock, Banknote, Briefcase
} from 'lucide-react';

export type HRTab =
  | 'Overview'
  | 'Employee Records'
  | 'Attendance & Biometrics'
  | 'Payroll Processing'
  | 'Leave Management'
  | 'HR Reports & Compliance';

type Employee = {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  employmentType: string;
  joiningDate: string;
  salary: number;
  status: string;
};

type Attendance = {
  id: number;
  employee: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: string;
};

type Payroll = {
  id: number;
  employee: string;
  month: string;
  basicSalary: number;
  bonus: number;
  deductions: number;
  netSalary: number;
  status: string;
};

type Leave = {
  id: number;
  employee: string;
  leaveType: string;
  from: string;
  to: string;
  reason: string;
  status: string;
};

const initialEmployees: Employee[] = [
  { id: 1, name: 'Ahmed Hassan', email: 'ahmed@school.edu', phone: '03001234567', department: 'Academics', designation: 'Mathematics Teacher', employmentType: 'Permanent', joiningDate: '2023-08-01', salary: 65000, status: 'Active' },
  { id: 2, name: 'Sara Ahmed', email: 'sara@school.edu', phone: '03011234567', department: 'Administration', designation: 'Office Administrator', employmentType: 'Permanent', joiningDate: '2022-04-15', salary: 55000, status: 'Active' },
  { id: 3, name: 'Hassan Ali', email: 'hassan@school.edu', phone: '03021234567', department: 'Academics', designation: 'Science Teacher', employmentType: 'Contract', joiningDate: '2024-01-10', salary: 60000, status: 'Active' },
];

const initialAttendance: Attendance[] = [
  { id: 1, employee: 'Ahmed Hassan', date: '2026-11-20', checkIn: '08:00', checkOut: '14:00', status: 'Present' },
  { id: 2, employee: 'Sara Ahmed', date: '2026-11-20', checkIn: '08:15', checkOut: '14:00', status: 'Late' },
  { id: 3, employee: 'Hassan Ali', date: '2026-11-20', checkIn: '-', checkOut: '-', status: 'Absent' },
];

const initialPayroll: Payroll[] = [
  { id: 1, employee: 'Ahmed Hassan', month: 'November 2026', basicSalary: 65000, bonus: 5000, deductions: 2000, netSalary: 68000, status: 'Processed' },
  { id: 2, employee: 'Sara Ahmed', month: 'November 2026', basicSalary: 55000, bonus: 0, deductions: 1500, netSalary: 53500, status: 'Pending' },
];

const initialLeaves: Leave[] = [
  { id: 1, employee: 'Ahmed Hassan', leaveType: 'Casual Leave', from: '2026-11-23', to: '2026-11-24', reason: 'Personal work', status: 'Pending' },
  { id: 2, employee: 'Sara Ahmed', leaveType: 'Sick Leave', from: '2026-11-18', to: '2026-11-18', reason: 'Medical appointment', status: 'Approved' },
];

function loadData<T,>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) as T : fallback;
  } catch {
    return fallback;
  }
}

const cardClass = 'bg-white rounded-2xl border border-slate-200 shadow-[0_2px_12px_rgba(15,23,42,0.04)]';
const inputClass = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10';
const labelClass = 'mb-2 block text-xs font-semibold text-slate-600';

interface Props {
  initialTab?: HRTab;
  onNavigate?: (tab: HRTab) => void;
}

const tabs: HRTab[] = [
  'Overview',
  'Employee Records',
  'Attendance & Biometrics',
  'Payroll Processing',
  'Leave Management',
  'HR Reports & Compliance',
];

const HRPayrollModule: React.FC<Props> = ({ initialTab = 'Overview', onNavigate }) => {
  const [activeTab, setActiveTab] = useState<HRTab>(initialTab);
  const [employees, setEmployees] = useState(() => loadData('vlearning-hr-employees', initialEmployees));
  const [attendance, setAttendance] = useState(() => loadData('vlearning-hr-attendance', initialAttendance));
  const [payroll, setPayroll] = useState(() => loadData('vlearning-hr-payroll', initialPayroll));
  const [leaves, setLeaves] = useState(() => loadData('vlearning-hr-leaves', initialLeaves));
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const emptyForm = {
    name: '', email: '', phone: '', department: 'Academics',
    designation: '', employmentType: 'Permanent',
    joiningDate: '', salary: '0', status: 'Active',
    employee: '', date: '', checkIn: '08:00', checkOut: '14:00',
    attendanceStatus: 'Present', month: 'November 2026',
    bonus: '0', deductions: '0', leaveType: 'Casual Leave',
    from: '', to: '', reason: '',
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => setActiveTab(initialTab), [initialTab]);
  useEffect(() => { localStorage.setItem('vlearning-hr-employees', JSON.stringify(employees)); }, [employees]);
  useEffect(() => { localStorage.setItem('vlearning-hr-attendance', JSON.stringify(attendance)); }, [attendance]);
  useEffect(() => { localStorage.setItem('vlearning-hr-payroll', JSON.stringify(payroll)); }, [payroll]);
  useEffect(() => { localStorage.setItem('vlearning-hr-leaves', JSON.stringify(leaves)); }, [leaves]);

  const navigate = (tab: HRTab) => {
    setActiveTab(tab);
    setSearch('');
    onNavigate?.(tab);
  };

  const nextId = (items: { id: number }[]) => Math.max(0, ...items.map(x => x.id)) + 1;

  const openModal = (id?: number) => {
    setEditingId(id ?? null);
    setMessage('');
    setForm(emptyForm);

    if (id !== undefined) {
      if (activeTab === 'Employee Records') {
        const item = employees.find(x => x.id === id);
        if (item) setForm({ ...emptyForm, ...item, salary: String(item.salary) });
      } else if (activeTab === 'Attendance & Biometrics') {
        const item = attendance.find(x => x.id === id);
        if (item) setForm({ ...emptyForm, employee: item.employee, date: item.date, checkIn: item.checkIn, checkOut: item.checkOut, attendanceStatus: item.status });
      } else if (activeTab === 'Leave Management') {
        const item = leaves.find(x => x.id === id);
        if (item) setForm({ ...emptyForm, employee: item.employee, leaveType: item.leaveType, from: item.from, to: item.to, reason: item.reason });
      }
    }
    setShowModal(true);
  };

  const saveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (activeTab === 'Employee Records') {
      if (!form.name.trim() || !form.email.trim() || !form.designation.trim()) {
        setMessage('Please complete the required employee details.');
        return;
      }
      const record: Employee = {
        id: editingId ?? nextId(employees),
        name: form.name.trim(), email: form.email.trim(),
        phone: form.phone.trim(), department: form.department,
        designation: form.designation.trim(), employmentType: form.employmentType,
        joiningDate: form.joiningDate, salary: Math.max(0, Number(form.salary)),
        status: form.status,
      };
      setEmployees(prev => editingId ? prev.map(x => x.id === editingId ? record : x) : [...prev, record]);
    }

    if (activeTab === 'Attendance & Biometrics') {
      if (!form.employee || !form.date) {
        setMessage('Select an employee and attendance date.');
        return;
      }
      const record: Attendance = {
        id: editingId ?? nextId(attendance), employee: form.employee,
        date: form.date, checkIn: form.checkIn, checkOut: form.checkOut,
        status: form.attendanceStatus,
      };
      setAttendance(prev => editingId ? prev.map(x => x.id === editingId ? record : x) : [...prev, record]);
    }

    if (activeTab === 'Payroll Processing') {
      if (!form.employee || !form.month) {
        setMessage('Select an employee and payroll month.');
        return;
      }
      const employee = employees.find(x => x.name === form.employee);
      if (!employee) {
        setMessage('Selected employee was not found.');
        return;
      }
      const bonus = Math.max(0, Number(form.bonus));
      const deductions = Math.max(0, Number(form.deductions));
      const record: Payroll = {
        id: nextId(payroll), employee: employee.name, month: form.month,
        basicSalary: employee.salary, bonus, deductions,
        netSalary: employee.salary + bonus - deductions, status: 'Pending',
      };
      setPayroll(prev => [...prev, record]);
    }

    if (activeTab === 'Leave Management') {
      if (!form.employee || !form.from || !form.to || !form.reason.trim() || form.from > form.to) {
        setMessage('Enter an employee, valid leave dates and reason.');
        return;
      }
      const record: Leave = {
        id: editingId ?? nextId(leaves), employee: form.employee,
        leaveType: form.leaveType, from: form.from, to: form.to,
        reason: form.reason.trim(), status: 'Pending',
      };
      setLeaves(prev => editingId ? prev.map(x => x.id === editingId ? record : x) : [...prev, record]);
    }

    setShowModal(false);
  };

  const removeRecord = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    if (activeTab === 'Employee Records') setEmployees(prev => prev.filter(x => x.id !== id));
    if (activeTab === 'Attendance & Biometrics') setAttendance(prev => prev.filter(x => x.id !== id));
    if (activeTab === 'Payroll Processing') setPayroll(prev => prev.filter(x => x.id !== id));
    if (activeTab === 'Leave Management') setLeaves(prev => prev.filter(x => x.id !== id));
  };

  const filtered = <T extends object>(items: T[], fields: (keyof T)[]) =>
    items.filter(item => fields.some(field => String(item[field]).toLowerCase().includes(search.toLowerCase())));

  const heading = (title: string, description: string, action = 'Add New') => (
    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      </div>
      {activeTab !== 'Overview' && activeTab !== 'HR Reports & Compliance' && (
        <button onClick={() => openModal()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800">
          <Plus size={17} /> {action}
        </button>
      )}
    </div>
  );

  const actions = (id: number) => (
    <div className="flex items-center justify-center gap-0">
      <button onClick={() => openModal(id)} title="Edit" className="rounded-lg p-1.5 text-slate-500 transition hover:bg-blue-50 hover:text-blue-700"><Pencil size={16} /></button>
      <button onClick={() => removeRecord(id)} title="Delete" className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button>
    </div>
  );

  const table = (headers: string[], rows: React.ReactNode[]) => (
    <div className={`${cardClass} overflow-hidden`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>{headers.map(h => <th key={h} className={`whitespace-nowrap px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 ${h === 'Actions' ? 'text-center' : ''}`}>{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-slate-100">{rows}</tbody>
        </table>
        {rows.length === 0 && <div className="p-10 text-center text-sm text-slate-500">No records found.</div>}
      </div>
    </div>
  );

  const badge = (status: string) => {
    const styles: Record<string, string> = {
      Active: 'bg-green-50 text-green-700',
      Present: 'bg-green-50 text-green-700',
      Approved: 'bg-green-50 text-green-700',
      Processed: 'bg-green-50 text-green-700',
      Late: 'bg-amber-50 text-amber-700',
      Pending: 'bg-amber-50 text-amber-700',
      Absent: 'bg-red-50 text-red-700',
      Rejected: 'bg-red-50 text-red-700',
      Inactive: 'bg-slate-100 text-slate-600',
    };
    return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status] ?? 'bg-slate-100 text-slate-600'}`}>{status}</span>;
  };

  const statCards = [
    { label: 'Total Employees', value: employees.length, icon: Users },
    { label: 'Present Today', value: attendance.filter(x => x.date === new Date().toISOString().slice(0, 10) && x.status === 'Present').length, icon: CalendarCheck },
    { label: 'Pending Leaves', value: leaves.filter(x => x.status === 'Pending').length, icon: ClipboardList },
    { label: 'Monthly Payroll', value: `Rs. ${payroll.filter(x => x.month === 'November 2026').reduce((sum, x) => sum + x.netSalary, 0).toLocaleString()}`, icon: Wallet },
  ];

  const modalFields = () => {
    const employeeSelect = (
      <label className={labelClass}>Employee
        <select required value={form.employee} onChange={e => setForm({ ...form, employee: e.target.value })} className={inputClass}>
          <option value="">Select employee</option>
          {employees.map(x => <option key={x.id} value={x.name}>{x.name}</option>)}
        </select>
      </label>
    );
    const field = (label: string, key: keyof typeof emptyForm, type = 'text', required = true) => (
      <label className={labelClass}>{label}
        <input required={required} type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} className={inputClass} />
      </label>
    );
    const select = (label: string, key: keyof typeof emptyForm, options: string[]) => (
      <label className={labelClass}>{label}
        <select value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} className={inputClass}>
          {options.map(x => <option key={x}>{x}</option>)}
        </select>
      </label>
    );

    if (activeTab === 'Employee Records') return <>
      {field('Full Name', 'name')}
      {field('Email Address', 'email', 'email')}
      {field('Phone Number', 'phone', 'tel', false)}
      {field('Designation', 'designation')}
      {select('Department', 'department', ['Academics', 'Administration', 'Finance', 'IT', 'Support'])}
      {select('Employment Type', 'employmentType', ['Permanent', 'Contract', 'Part-time', 'Intern'])}
      {field('Joining Date', 'joiningDate', 'date', false)}
      {field('Monthly Salary (Rs.)', 'salary', 'number')}
      {select('Status', 'status', ['Active', 'Inactive'])}
    </>;

    if (activeTab === 'Attendance & Biometrics') return <>
      {employeeSelect}
      {field('Attendance Date', 'date', 'date')}
      {field('Check In', 'checkIn', 'time', false)}
      {field('Check Out', 'checkOut', 'time', false)}
      {select('Attendance Status', 'attendanceStatus', ['Present', 'Late', 'Absent', 'Half Day', 'On Leave'])}
    </>;

    if (activeTab === 'Payroll Processing') return <>
      {employeeSelect}
      {field('Payroll Month', 'month')}
      {field('Bonus (Rs.)', 'bonus', 'number')}
      {field('Deductions (Rs.)', 'deductions', 'number')}
      <p className="text-xs text-slate-500 sm:col-span-2">Basic salary is taken from the selected employee record. Net salary is calculated automatically.</p>
    </>;

    if (activeTab === 'Leave Management') return <>
      {employeeSelect}
      {select('Leave Type', 'leaveType', ['Casual Leave', 'Sick Leave', 'Annual Leave', 'Unpaid Leave'])}
      {field('From Date', 'from', 'date')}
      {field('To Date', 'to', 'date')}
      <label className={`${labelClass} sm:col-span-2`}>Reason
        <textarea required rows={3} value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} className={inputClass} />
      </label>
    </>;

    return null;
  };

  const modalTitle = editingId ? 'Edit Record' : 'Add New Record';

  return (
    <div className="space-y-6">
      {activeTab === 'Overview' && <>
        {heading('HR & Payroll Management', 'Manage employee records, attendance, payroll processing and staff leave requests.')}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map(({ label, value, icon: Icon }) => (
            <div key={label} className={`${cardClass} p-5 sm:p-6`}>
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><Icon size={20} /></div>
                <span className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">{value}</span>
              </div>
              <p className="mt-4 text-sm font-medium text-slate-500">{label}</p>
            </div>
          ))}
        </div>
        <div className={`${cardClass} p-5 sm:p-6`}>
          <h2 className="mb-5 text-base font-bold text-slate-800">HR Management</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tabs.slice(1).map((tab, i) => {
              const icons = [Users, CalendarCheck, Wallet, ClipboardList, FileBarChart];
              const Icon = icons[i];
              return <button key={tab} onClick={() => navigate(tab)} className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-md sm:p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-100"><Icon size={20} /></div>
                <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-slate-800">{tab}</p><p className="mt-1.5 text-xs text-slate-500">Manage and view records</p></div>
                <ChevronRight size={17} className="text-slate-400" />
              </button>;
            })}
          </div>
        </div>
        <div className={`${cardClass} p-5 sm:p-6`}>
          <h2 className="mb-4 text-base font-bold text-slate-800">Recent Leave Requests</h2>
          {leaves.slice(0, 4).map(x => <div key={x.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 py-3 last:border-0">
            <div><p className="text-sm font-medium text-slate-700">{x.employee}</p><p className="mt-1 text-xs text-slate-500">{x.leaveType} · {x.from} to {x.to}</p></div>{badge(x.status)}
          </div>)}
          {leaves.length === 0 && <p className="text-sm text-slate-500">No leave requests available.</p>}
        </div>
      </>}

      {activeTab === 'Employee Records' && <>
        {heading('Employee Records', 'Maintain personal and employment information for school staff.', 'Add Employee')}
        <div className="relative mb-4"><Search size={17} className="absolute left-3 top-3.5 text-slate-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employee, department or designation..." className={`${inputClass} pl-10`} /></div>
        {table(['Employee', 'Department', 'Designation', 'Employment', 'Joining Date', 'Salary', 'Status', 'Actions'], filtered(employees, ['name', 'email', 'department', 'designation']).map(x => <tr key={x.id}>
          <td className="px-5 py-4"><p className="font-semibold text-slate-700">{x.name}</p><p className="mt-1 text-xs text-slate-400">{x.email}</p></td>
          <td className="px-5 py-4 text-slate-600">{x.department}</td><td className="px-5 py-4 text-slate-600">{x.designation}</td>
          <td className="px-5 py-4 text-slate-600">{x.employmentType}</td><td className="whitespace-nowrap px-5 py-4 text-slate-600">{x.joiningDate || '-'}</td>
          <td className="whitespace-nowrap px-5 py-4 text-slate-600">Rs. {x.salary.toLocaleString()}</td><td className="px-5 py-4">{badge(x.status)}</td><td className="px-5 py-4">{actions(x.id)}</td>
        </tr>))}
      </>}

      {activeTab === 'Attendance & Biometrics' && <>
        {heading('Attendance & Biometrics', 'Record and review staff attendance. Biometric device integration is not connected.', 'Record Attendance')}
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">Demo attendance records only. Live biometric data requires device and backend integration.</div>
        <div className="relative mb-4"><Search size={17} className="absolute left-3 top-3.5 text-slate-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employee or date..." className={`${inputClass} pl-10`} /></div>
        {table(['Employee', 'Date', 'Check In', 'Check Out', 'Status', 'Actions'], filtered(attendance, ['employee', 'date', 'status']).map(x => <tr key={x.id}>
          <td className="px-5 py-4 font-medium text-slate-700">{x.employee}</td><td className="px-5 py-4 text-slate-600">{x.date}</td><td className="px-5 py-4 text-slate-600">{x.checkIn}</td><td className="px-5 py-4 text-slate-600">{x.checkOut}</td><td className="px-5 py-4">{badge(x.status)}</td><td className="px-5 py-4">{actions(x.id)}</td>
        </tr>))}
      </>}

      {activeTab === 'Payroll Processing' && <>
        {heading('Payroll Processing', 'Calculate monthly salary, bonuses and deductions.', 'Create Payroll')}
        <div className="mb-4 rounded-xl border border-blue-100 bg-blue-50 p-3 text-xs text-blue-800">Payroll entries are saved as pending demo records. No bank transfer or actual payroll execution is performed.</div>
        <div className="relative mb-4"><Search size={17} className="absolute left-3 top-3.5 text-slate-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employee or payroll month..." className={`${inputClass} pl-10`} /></div>
        {table(['Employee', 'Month', 'Basic Salary', 'Bonus', 'Deductions', 'Net Salary', 'Status', 'Actions'], filtered(payroll, ['employee', 'month', 'status']).map(x => <tr key={x.id}>
          <td className="px-5 py-4 font-medium text-slate-700">{x.employee}</td><td className="whitespace-nowrap px-5 py-4 text-slate-600">{x.month}</td>
          <td className="whitespace-nowrap px-5 py-4 text-slate-600">Rs. {x.basicSalary.toLocaleString()}</td><td className="px-5 py-4 text-slate-600">Rs. {x.bonus.toLocaleString()}</td>
          <td className="px-5 py-4 text-slate-600">Rs. {x.deductions.toLocaleString()}</td><td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-700">Rs. {x.netSalary.toLocaleString()}</td>
          <td className="px-5 py-4">{badge(x.status)}</td><td className="px-5 py-4"><div className="flex items-center justify-center"><button title="Delete" onClick={() => removeRecord(x.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button></div></td>
        </tr>))}
      </>}

      {activeTab === 'Leave Management' && <>
        {heading('Leave Management', 'Review employee leave requests and manage approvals.', 'New Leave Request')}
        <div className="relative mb-4"><Search size={17} className="absolute left-3 top-3.5 text-slate-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employee, leave type or status..." className={`${inputClass} pl-10`} /></div>
        {table(['Employee', 'Leave Type', 'From', 'To', 'Reason', 'Status', 'Actions'], filtered(leaves, ['employee', 'leaveType', 'reason', 'status']).map(x => <tr key={x.id}>
          <td className="px-5 py-4 font-medium text-slate-700">{x.employee}</td><td className="px-5 py-4 text-slate-600">{x.leaveType}</td><td className="px-5 py-4 text-slate-600">{x.from}</td><td className="px-5 py-4 text-slate-600">{x.to}</td>
          <td className="px-5 py-4 text-slate-600">{x.reason}</td><td className="px-5 py-4">{badge(x.status)}</td>
          <td className="px-5 py-4"><div className="flex items-center justify-center gap-1">
            {x.status === 'Pending' && <>
              <button title="Approve" onClick={() => setLeaves(prev => prev.map(y => y.id === x.id ? { ...y, status: 'Approved' } : y))} className="rounded-lg p-1.5 text-green-600 hover:bg-green-50"><Check size={16} /></button>
              <button title="Reject" onClick={() => setLeaves(prev => prev.map(y => y.id === x.id ? { ...y, status: 'Rejected' } : y))} className="rounded-lg p-1.5 text-red-500 hover:bg-red-50"><XCircle size={16} /></button>
            </>}
            <button title="Delete" onClick={() => removeRecord(x.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button>
          </div></td>
        </tr>))}
      </>}

      {activeTab === 'HR Reports & Compliance' && <>
        {heading('HR Reports & Compliance', 'Review workforce, attendance, leave and payroll summaries.')}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[
            { label: 'Total Employees', value: employees.length },
            { label: 'Active Employees', value: employees.filter(x => x.status === 'Active').length },
            { label: 'Attendance Records', value: attendance.length },
            { label: 'Pending Leave Requests', value: leaves.filter(x => x.status === 'Pending').length },
            { label: 'Approved Leaves', value: leaves.filter(x => x.status === 'Approved').length },
            { label: 'Payroll Entries', value: payroll.length },
          ].map(x => <div key={x.label} className={`${cardClass} p-5`}><p className="text-sm text-slate-500">{x.label}</p><p className="mt-3 text-2xl font-bold text-slate-800">{x.value}</p></div>)}
        </div>
        <div className={`${cardClass} p-5 sm:p-6`}>
          <h2 className="mb-4 text-base font-bold text-slate-800">Payroll Summary</h2>
          <p className="text-sm text-slate-500">Total recorded net payroll</p>
          <p className="mt-2 text-2xl font-bold text-slate-800">Rs. {payroll.reduce((sum, x) => sum + x.netSalary, 0).toLocaleString()}</p>
          <p className="mt-2 text-xs text-slate-400">Based on saved demo payroll entries.</p>
        </div>
        <div className={`${cardClass} p-5 sm:p-6`}>
          <h2 className="mb-4 text-base font-bold text-slate-800">Department-wise Employees</h2>
          {Array.from(new Set(employees.map(x => x.department))).map(department => <div key={department} className="flex justify-between border-b border-slate-100 py-3 text-sm last:border-0"><span className="text-slate-600">{department}</span><span className="font-semibold text-slate-800">{employees.filter(x => x.department === department).length}</span></div>)}
        </div>
      </>}
      
      {showModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/40 p-4" onMouseDown={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <section role="dialog" aria-modal="true" className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div><h2 className="text-lg font-bold text-slate-800">{modalTitle}</h2><p className="mt-1 text-xs text-slate-500">{activeTab}</p></div>
              <button onClick={() => setShowModal(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={19} /></button>
            </div>
            <form onSubmit={saveRecord}>
              <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">{modalFields()}</div>
              {message && <p className="mx-5 mb-3 text-sm text-red-600">{message}</p>}
              <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4">
                <button type="button" onClick={() => setShowModal(false)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-white">Cancel</button>
                <button type="submit" className="rounded-lg bg-blue-700 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800">Save Record</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default HRPayrollModule;
