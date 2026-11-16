import React, { useEffect, useMemo, useState } from 'react';
import {
  Wallet, TrendingUp, Clock, AlertCircle, Plus, Search,
  Download, Receipt, CreditCard, GraduationCap, FileText,
  CheckCircle, X, Pencil, Trash2, Printer, Eye
} from 'lucide-react';

export type Tab =
  | 'Overview'
  | 'Fee Structures'
  | 'Fee Challans'
  | 'Collect Fees'
  | 'Discounts & Scholarships'
  | 'Financial Reports';

type Status = 'Paid' | 'Pending' | 'Overdue';

type Challan = {
  id: string;
  student: string;
  roll: string;
  className: string;
  month: string;
  amount: number;
  status: Status;
  createdAt: string;
};

type FeeStructure = {
  id: string;
  name: string;
  className: string;
  period: string;
  amount: number;
  description: string;
};

type Discount = {
  id: string;
  name: string;
  percentage: number;
  description: string;
  student: string;
};

type Payment = {
  id: string;
  student: string;
  amount: number;
  method: string;
  reference: string;
  date: string;
};

const initialChallans: Challan[] = [
  { id: 'CH-1001', student: 'Ali Ahmed', roll: 'VL-001', className: 'Grade 5', month: 'November 2026', amount: 12000, status: 'Paid', createdAt: '2026-11-01' },
  { id: 'CH-1002', student: 'Sara Khan', roll: 'VL-002', className: 'Grade 8', month: 'November 2026', amount: 15000, status: 'Pending', createdAt: '2026-11-01' },
  { id: 'CH-1003', student: 'Ahmed Raza', roll: 'VL-003', className: 'Grade 6', month: 'November 2026', amount: 13500, status: 'Overdue', createdAt: '2026-11-01' },
  { id: 'CH-1004', student: 'Ayesha Malik', roll: 'VL-004', className: 'Grade 4', month: 'November 2026', amount: 10000, status: 'Paid', createdAt: '2026-11-01' },
  { id: 'CH-1005', student: 'Usman Tariq', roll: 'VL-005', className: 'Grade 9', month: 'November 2026', amount: 18000, status: 'Pending', createdAt: '2026-11-01' },
];

const initialStructures: FeeStructure[] = [
  { id: 'FS-001', name: 'Monthly Plan', className: 'All Classes', period: 'Monthly', amount: 12000, description: 'Standard monthly tuition' },
  { id: 'FS-002', name: 'Quarterly Plan', className: 'All Classes', period: 'Quarterly', amount: 34000, description: 'Three-month fee package' },
  { id: 'FS-003', name: 'Annual Plan', className: 'All Classes', period: 'Annual', amount: 125000, description: 'Full academic year package' },
];

const initialDiscounts: Discount[] = [
  { id: 'DS-001', name: 'Sibling Discount', percentage: 10, description: 'For eligible siblings', student: 'All eligible students' },
  { id: 'DS-002', name: 'Merit Scholarship', percentage: 25, description: 'Academic performance', student: 'All eligible students' },
  { id: 'DS-003', name: 'Need-Based Support', percentage: 50, description: 'Financial assistance', student: 'All eligible students' },
];

const money = (amount: number) => `Rs. ${amount.toLocaleString('en-PK')}`;
const today = () => new Date().toISOString().slice(0, 10);
const currentMonth = () => new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });

function loadData<T,>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) as T : fallback;
  } catch {
    return fallback;
  }
}

const cardClass = 'bg-white rounded-xl border border-outline-variant/40 shadow-sm';
const inputClass = 'w-full rounded-lg border border-outline-variant/60 px-3 py-2.5 text-sm text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/10';

interface FeesModuleProps {
  initialTab?: Tab;
}

const FeesModule: React.FC<FeesModuleProps> = ({ initialTab = 'Overview' }) => {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [challans, setChallans] = useState<Challan[]>(() => loadData('vlearning-fee-challans', initialChallans));
  const [structures, setStructures] = useState<FeeStructure[]>(() => loadData('vlearning-fee-structures', initialStructures));
  const [discounts, setDiscounts] = useState<Discount[]>(() => loadData('vlearning-fee-discounts', initialDiscounts));
  const [payments, setPayments] = useState<Payment[]>(() => loadData('vlearning-fee-payments', []));
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'challan' | 'payment' | 'structure' | 'discount'>('challan');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewChallan, setViewChallan] = useState<Challan | null>(null);
  const [reportStart, setReportStart] = useState('');
  const [reportEnd, setReportEnd] = useState('');
  const [reportStatus, setReportStatus] = useState('All');

  const [form, setForm] = useState({
    student: '',
    amount: '',
    className: '',
    plan: 'Monthly',
    method: 'Cash',
    reference: '',
    name: '',
    description: '',
    percentage: '10',
    period: 'Monthly',
  });

  useEffect(() => setActiveTab(initialTab), [initialTab]);
  useEffect(() => { localStorage.setItem('vlearning-fee-challans', JSON.stringify(challans)); }, [challans]);
  useEffect(() => { localStorage.setItem('vlearning-fee-structures', JSON.stringify(structures)); }, [structures]);
  useEffect(() => { localStorage.setItem('vlearning-fee-discounts', JSON.stringify(discounts)); }, [discounts]);
  useEffect(() => { localStorage.setItem('vlearning-fee-payments', JSON.stringify(payments)); }, [payments]);

  const openModal = (type: typeof modalType, record?: FeeStructure | Discount) => {
    setMessage('');
    setModalType(type);
    setEditingId(record?.id ?? null);

    if (type === 'structure' && record && 'period' in record) {
      setForm({
        student: '', amount: String(record.amount), className: record.className,
        plan: record.period, method: 'Cash', reference: '',
        name: record.name, description: record.description, percentage: '10', period: record.period,
      });
    } else if (type === 'discount' && record && 'percentage' in record) {
      setForm({
        student: record.student, amount: '', className: '', plan: 'Monthly',
        method: 'Cash', reference: '', name: record.name,
        description: record.description, percentage: String(record.percentage), period: 'Monthly',
      });
    } else {
      setForm({
        student: '', amount: '', className: '', plan: 'Monthly',
        method: 'Cash', reference: '', name: '', description: '',
        percentage: '10', period: 'Monthly',
      });
    }

    setShowModal(true);
  };

  const nextId = (prefix: string, list: { id: string }[]) => {
    const numbers = list.map(item => Number(item.id.split('-')[1])).filter(Number.isFinite);
    return `${prefix}-${String(Math.max(0, ...numbers) + 1).padStart(3, '0')}`;
  };

  const saveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (modalType === 'structure') {
      if (!form.name.trim() || !form.className.trim() || Number(form.amount) <= 0) {
        setMessage('Enter a plan name, class and valid amount.');
        return;
      }

      const record: FeeStructure = {
        id: editingId ?? nextId('FS', structures),
        name: form.name.trim(),
        className: form.className.trim(),
        period: form.period,
        amount: Number(form.amount),
        description: form.description.trim(),
      };

      setStructures(prev => editingId
        ? prev.map(item => item.id === editingId ? record : item)
        : [...prev, record]);
    }

    if (modalType === 'discount') {
      const percentage = Number(form.percentage);
      if (!form.name.trim() || percentage <= 0 || percentage > 100) {
        setMessage('Enter a name and a percentage between 1 and 100.');
        return;
      }

      const record: Discount = {
        id: editingId ?? nextId('DS', discounts),
        name: form.name.trim(),
        percentage,
        description: form.description.trim(),
        student: form.student.trim() || 'All eligible students',
      };

      setDiscounts(prev => editingId
        ? prev.map(item => item.id === editingId ? record : item)
        : [...prev, record]);
    }

    if (modalType === 'challan') {
      if (!form.student.trim() || Number(form.amount) <= 0) {
        setMessage('Enter a student name and valid amount.');
        return;
      }

      const record: Challan = {
        id: nextId('CH', challans),
        student: form.student.trim(),
        roll: 'New',
        className: form.className.trim() || 'Not specified',
        month: currentMonth(),
        amount: Number(form.amount),
        status: 'Pending',
        createdAt: today(),
      };

      setChallans(prev => [record, ...prev]);
      setActiveTab('Fee Challans');
    }

    if (modalType === 'payment') {
      if (!form.student.trim() || Number(form.amount) <= 0) {
        setMessage('Enter a student name and valid payment amount.');
        return;
      }

      const payment: Payment = {
        id: nextId('RC', payments),
        student: form.student.trim(),
        amount: Number(form.amount),
        method: form.method,
        reference: form.reference.trim(),
        date: today(),
      };

      setPayments(prev => [payment, ...prev]);

      setChallans(prev => {
        const match = prev.find(item =>
          item.student.toLowerCase() === form.student.trim().toLowerCase()
          && item.status !== 'Paid'
        );

        if (match) {
          return prev.map(item => item.id === match.id
            ? { ...item, status: 'Paid' as Status }
            : item);
        }

        return [{
          id: payment.id,
          student: payment.student,
          roll: 'New',
          className: form.className.trim() || 'Not specified',
          month: currentMonth(),
          amount: payment.amount,
          status: 'Paid' as Status,
          createdAt: today(),
        }, ...prev];
      });

      setMessage(`Payment saved. Receipt: ${payment.id}`);
      setShowModal(false);
      setActiveTab('Collect Fees');
      return;
    }

    setShowModal(false);
  };

  const removeChallan = (id: string) => {
    if (window.confirm('Delete this fee record?')) {
      setChallans(prev => prev.filter(item => item.id !== id));
    }
  };

  const updateStatus = (id: string, status: Status) => {
    setChallans(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  const filtered = useMemo(() => challans.filter(item => {
    const matchesSearch = `${item.student} ${item.id} ${item.roll}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filter === 'All' || item.status === filter;
    return matchesSearch && matchesStatus;
  }), [challans, search, filter]);

  const paid = challans.filter(item => item.status === 'Paid').reduce((sum, item) => sum + item.amount, 0);
  const pending = challans.filter(item => item.status === 'Pending').reduce((sum, item) => sum + item.amount, 0);
  const overdue = challans.filter(item => item.status === 'Overdue').reduce((sum, item) => sum + item.amount, 0);
  const total = paid + pending + overdue;

  const reportRows = challans.filter(item => {
    const dateOk = (!reportStart || item.createdAt >= reportStart) && (!reportEnd || item.createdAt <= reportEnd);
    const statusOk = reportStatus === 'All' || item.status === reportStatus;
    return dateOk && statusOk;
  });

  const reportPaid = reportRows.filter(item => item.status === 'Paid').reduce((sum, item) => sum + item.amount, 0);
  const reportPending = reportRows.filter(item => item.status === 'Pending').reduce((sum, item) => sum + item.amount, 0);
  const reportOverdue = reportRows.filter(item => item.status === 'Overdue').reduce((sum, item) => sum + item.amount, 0);

  const stats = [
    { label: 'Total Fee Amount', value: money(total), icon: Wallet, color: 'text-primary', bg: 'bg-primary-fixed' },
    { label: 'Received Amount', value: money(paid), icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pending Dues', value: money(pending), icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Overdue Amount', value: money(overdue), icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  const statusStyle = (status: string) =>
    status === 'Paid' ? 'bg-emerald-50 text-emerald-700' :
    status === 'Overdue' ? 'bg-red-50 text-red-700' :
    'bg-amber-50 text-amber-700';

  const exportCsv = () => {
    const rows = [
      ['ID', 'Student', 'Class', 'Month', 'Amount', 'Status', 'Created'],
      ...reportRows.map(item => [item.id, item.student, item.className, item.month, String(item.amount), item.status, item.createdAt]),
    ];
    const csv = rows.map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fees-financial-report.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const printChallan = (record: Challan) => {
    const win = window.open('', '_blank', 'width=750,height=650');
    if (!win) {
      alert('Please allow pop-ups to print the challan.');
      return;
    }
    win.document.write(`
      <html><head><title>Fee Challan ${record.id}</title>
      <style>body{font-family:Arial;padding:40px;color:#222}h1{margin-bottom:4px}table{width:100%;border-collapse:collapse;margin-top:25px}td{padding:12px;border:1px solid #ddd}.muted{color:#666}</style>
      </head><body><h1>VLearnings</h1><p class="muted">Fee Challan</p>
      <h2>${record.id}</h2><table>
      <tr><td>Student</td><td>${record.student}</td></tr>
      <tr><td>Class</td><td>${record.className}</td></tr>
      <tr><td>Billing Month</td><td>${record.month}</td></tr>
      <tr><td>Amount</td><td>${money(record.amount)}</td></tr>
      <tr><td>Status</td><td>${record.status}</td></tr>
      </table><p style="margin-top:40px">Please keep this challan for your records.</p>
      <script>window.onload=()=>window.print();</script></body></html>
    `);
    win.document.close();
  };

  const printReceipt = (payment: Payment) => {
    const win = window.open('', '_blank', 'width=750,height=650');
    if (!win) {
      alert('Please allow pop-ups to print the receipt.');
      return;
    }
    win.document.write(`
      <html><head><title>Payment Receipt ${payment.id}</title>
      <style>body{font-family:Arial;padding:40px;color:#222}h1{margin-bottom:4px}table{width:100%;border-collapse:collapse;margin-top:25px}td{padding:12px;border:1px solid #ddd}</style>
      </head><body><h1>VLearnings</h1><p>Fee Payment Receipt</p>
      <h2>${payment.id}</h2><table>
      <tr><td>Student</td><td>${payment.student}</td></tr>
      <tr><td>Payment Date</td><td>${payment.date}</td></tr>
      <tr><td>Amount Received</td><td>${money(payment.amount)}</td></tr>
      <tr><td>Payment Method</td><td>${payment.method}</td></tr>
      <tr><td>Reference</td><td>${payment.reference || '-'}</td></tr>
      </table><p style="margin-top:40px">Thank you for your payment.</p>
      <script>window.onload=()=>window.print();</script></body></html>
    `);
    win.document.close();
  };

  return (
    <div className="w-full space-y-6">
      <section className={`${cardClass} p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
        <div>
          <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-2">
            <span>Dashboard</span><span>/</span><span className="text-primary font-semibold">Fees & Accounts</span>
          </div>
          <h1 className="text-2xl font-bold text-on-surface">Fees & Accounts</h1>
          <p className="text-sm text-on-surface-variant mt-1">Manage fee structures, challans and student payments.</p>
        </div>
        <button onClick={() => openModal('challan')} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary-container text-white text-sm font-semibold hover:bg-primary transition-colors">
          <Plus size={17} /> Generate Challan
        </button>
      </section>

      {activeTab === 'Overview' && <>
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map(stat => {
            const Icon = stat.icon;
            return <div key={stat.label} className={`${cardClass} p-5`}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-on-surface-variant">{stat.label}</span>
                <span className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}><Icon size={20}/></span>
              </div>
              <p className="text-xl font-bold text-on-surface mt-4">{stat.value}</p>
              <p className="text-xs text-on-surface-variant mt-1">Calculated from fee records</p>
            </div>;
          })}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className={`${cardClass} p-5 lg:col-span-2`}>
            <div className="flex items-center justify-between mb-5">
              <div><h2 className="font-semibold text-on-surface">Collection Overview</h2><p className="text-xs text-on-surface-variant mt-1">Current collection status</p></div>
              <TrendingUp className="text-primary" size={21}/>
            </div>
            <div className="h-3 rounded-full bg-surface-container-low overflow-hidden flex">
              <div className="bg-emerald-500" style={{ width: `${total ? paid / total * 100 : 0}%` }}/>
              <div className="bg-amber-400" style={{ width: `${total ? pending / total * 100 : 0}%` }}/>
              <div className="bg-red-400" style={{ width: `${total ? overdue / total * 100 : 0}%` }}/>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[['Received', paid, 'bg-emerald-500'], ['Pending', pending, 'bg-amber-400'], ['Overdue', overdue, 'bg-red-400']].map(([label, amount, color]) =>
                <div key={String(label)}><div className="flex items-center gap-2 text-xs text-on-surface-variant"><span className={`w-2 h-2 rounded-full ${color}`}/>{label}</div><p className="font-semibold text-sm mt-2">{money(Number(amount))}</p></div>
              )}
            </div>
          </div>
          <div className={`${cardClass} p-5`}>
            <h2 className="font-semibold text-on-surface">Quick Actions</h2>
            <div className="space-y-2 mt-4">
              <button onClick={() => openModal('payment')} className="w-full flex items-center gap-3 p-3 rounded-lg bg-surface-container-low hover:bg-primary-fixed/50 text-sm text-on-surface"><CreditCard size={18} className="text-primary"/> Collect Fee</button>
              <button onClick={() => openModal('challan')} className="w-full flex items-center gap-3 p-3 rounded-lg bg-surface-container-low hover:bg-primary-fixed/50 text-sm text-on-surface"><Receipt size={18} className="text-primary"/> Generate Challan</button>
              <button onClick={() => setActiveTab('Financial Reports')} className="w-full flex items-center gap-3 p-3 rounded-lg bg-surface-container-low hover:bg-primary-fixed/50 text-sm text-on-surface"><FileText size={18} className="text-primary"/> View Reports</button>
            </div>
          </div>
        </section>
        <ChallanTable rows={challans.slice(0, 5)} statusStyle={statusStyle} onView={() => setActiveTab('Fee Challans')} onPrint={printChallan} onDelete={removeChallan} onStatus={updateStatus}/>
      </>}

      {activeTab === 'Fee Structures' && <section className={`${cardClass} p-5`}>
        <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
          <div><h2 className="font-semibold text-on-surface">Fee Structures</h2><p className="text-xs text-on-surface-variant mt-1">Configure class-wise fee plans</p></div>
          <button onClick={() => openModal('structure')} className="px-4 py-2 rounded-lg bg-primary-container text-white text-sm flex items-center gap-2"><Plus size={16}/> Add Structure</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {structures.map(plan => <div key={plan.id} className="rounded-xl border border-outline-variant/50 p-5">
            <div className="flex justify-between items-start"><div className="w-10 h-10 rounded-lg bg-primary-fixed text-primary flex items-center justify-center"><Receipt size={20}/></div>
              <div className="flex gap-2"><button title="Edit" onClick={() => openModal('structure', plan)} className="p-2 rounded-lg hover:bg-slate-100"><Pencil size={15}/></button><button title="Delete" onClick={() => window.confirm('Delete this fee structure?') && setStructures(prev => prev.filter(item => item.id !== plan.id))} className="p-2 rounded-lg hover:bg-red-50 text-red-600"><Trash2 size={15}/></button></div>
            </div>
            <h3 className="font-semibold mt-4">{plan.name}</h3><p className="text-xs text-on-surface-variant mt-1">{plan.description}</p>
            <p className="text-xl font-bold text-primary mt-4">{money(plan.amount)}</p>
            <span className="text-xs text-on-surface-variant">{plan.period} billing · {plan.className}</span>
          </div>)}
          {!structures.length && <p className="text-sm text-slate-500">No fee structures added yet.</p>}
        </div>
      </section>}

      {activeTab === 'Fee Challans' && <>
        <section className={`${cardClass} p-4 flex flex-col sm:flex-row gap-3 justify-between`}>
          <div className="relative flex-1"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search student or challan..." className={`${inputClass} pl-10`}/></div>
          <select value={filter} onChange={e => setFilter(e.target.value)} className={`${inputClass} sm:w-44`}><option>All</option><option>Paid</option><option>Pending</option><option>Overdue</option></select>
        </section>
        <ChallanTable rows={filtered} statusStyle={statusStyle} onPrint={printChallan} onDelete={removeChallan} onStatus={updateStatus} onViewRecord={setViewChallan}/>
      </>}

      {activeTab === 'Collect Fees' && <div className="space-y-5">
        <section className={`${cardClass} p-6`}>
          <div className="max-w-xl mx-auto">
            <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center text-primary mb-4"><CreditCard size={24}/></div>
            <h2 className="text-lg font-bold">Record Fee Payment</h2>
            <p className="text-sm text-on-surface-variant mt-1 mb-5">Record a student's payment and generate a receipt.</p>
            <button onClick={() => openModal('payment')} className="px-5 py-3 bg-primary-container text-white rounded-lg text-sm font-semibold">+ Record New Payment</button>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              {['Cash', 'Bank Transfer', 'JazzCash / EasyPaisa'].map(method => <div key={method} className="p-4 border border-outline-variant/50 rounded-xl text-sm text-center"><CreditCard className="mx-auto mb-2 text-primary" size={21}/>{method}</div>)}
            </div>
          </div>
        </section>
        <section className={`${cardClass} p-5 overflow-x-auto`}>
          <h2 className="font-semibold mb-4">Payment History</h2>
          <table className="w-full min-w-[650px] text-sm text-left">
            <thead className="bg-slate-50 text-xs text-slate-500"><tr>{['Receipt','Student','Date','Method','Amount','Action'].map(item => <th key={item} className="p-3">{item}</th>)}</tr></thead>
            <tbody>{payments.map(payment => <tr key={payment.id} className="border-t border-slate-100"><td className="p-3 font-semibold text-primary">{payment.id}</td><td className="p-3">{payment.student}</td><td className="p-3">{payment.date}</td><td className="p-3">{payment.method}</td><td className="p-3 font-semibold">{money(payment.amount)}</td><td className="p-3"><button onClick={() => printReceipt(payment)} className="flex items-center gap-1 text-primary text-xs font-semibold"><Printer size={14}/> Receipt</button></td></tr>)}</tbody>
          </table>
          {!payments.length && <p className="text-sm text-slate-500 py-5">No payments recorded yet.</p>}
        </section>
        {message && <p className="text-sm text-emerald-700">{message}</p>}
      </div>}

      {activeTab === 'Discounts & Scholarships' && <section className={`${cardClass} p-5`}>
        <div className="flex justify-between items-center gap-3 mb-5">
          <div><h2 className="font-semibold">Discounts & Scholarships</h2><p className="text-xs text-on-surface-variant mt-1">Manage fee concessions and student support</p></div>
          <button onClick={() => openModal('discount')} className="px-3 py-2 bg-primary-container text-white rounded-lg text-sm">+ Add Discount</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {discounts.map(item => <div key={item.id} className="p-5 border border-outline-variant/50 rounded-xl">
            <div className="flex justify-between"><GraduationCap className="text-primary" size={23}/><div className="flex gap-1"><button onClick={() => openModal('discount', item)} className="p-2 rounded-lg hover:bg-slate-100"><Pencil size={15}/></button><button onClick={() => window.confirm('Delete this discount?') && setDiscounts(prev => prev.filter(discount => discount.id !== item.id))} className="p-2 rounded-lg hover:bg-red-50 text-red-600"><Trash2 size={15}/></button></div></div>
            <h3 className="font-semibold mt-3">{item.name}</h3><p className="text-2xl font-bold text-primary mt-2">{item.percentage}%</p>
            <p className="text-xs text-on-surface-variant mt-1">{item.description}</p><p className="text-xs mt-3">Student: {item.student}</p>
          </div>)}
          {!discounts.length && <p className="text-sm text-slate-500">No discounts added yet.</p>}
        </div>
      </section>}

      {activeTab === 'Financial Reports' && <section className={`${cardClass} p-5`}>
        <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
          <div><h2 className="font-semibold">Financial Reports</h2><p className="text-xs text-on-surface-variant mt-1">Fee collection and outstanding balances</p></div>
          <div className="flex gap-2"><button onClick={exportCsv} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-outline-variant text-sm"><Download size={16}/> Export CSV</button><button onClick={() => window.print()} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-outline-variant text-sm"><Printer size={16}/> Print</button></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          <label className="text-xs font-semibold">From<input type="date" value={reportStart} onChange={e => setReportStart(e.target.value)} className={`${inputClass} mt-1`}/></label>
          <label className="text-xs font-semibold">To<input type="date" value={reportEnd} onChange={e => setReportEnd(e.target.value)} className={`${inputClass} mt-1`}/></label>
          <label className="text-xs font-semibold">Status<select value={reportStatus} onChange={e => setReportStatus(e.target.value)} className={`${inputClass} mt-1`}><option>All</option><option>Paid</option><option>Pending</option><option>Overdue</option></select></label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[['Total Fees', reportPaid + reportPending + reportOverdue], ['Received', reportPaid], ['Outstanding', reportPending + reportOverdue]].map(item => <div key={item[0]} className="p-4 bg-surface-container-low rounded-xl"><p className="text-xs text-on-surface-variant">{item[0]}</p><p className="text-xl font-bold mt-2">{money(Number(item[1]))}</p></div>)}
        </div>
        <div className="mt-6"><h3 className="font-semibold text-sm mb-3">Collection Summary</h3><ChallanTable rows={reportRows} statusStyle={statusStyle} onPrint={printChallan} onDelete={removeChallan} onStatus={updateStatus}/></div>
      </section>}

      {showModal && <div className="fixed inset-0 z-[100] bg-slate-950/40 flex items-center justify-center p-4 overflow-y-auto" onMouseDown={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
        <form onSubmit={saveRecord} className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 space-y-4 my-auto">
          <div className="flex justify-between items-center"><h2 className="font-bold text-lg">{modalType === 'challan' ? 'Generate Fee Challan' : modalType === 'structure' ? (editingId ? 'Edit Fee Structure' : 'Add Fee Structure') : modalType === 'discount' ? (editingId ? 'Edit Discount' : 'Add Discount') : 'Collect Fee Payment'}</h2><button type="button" onClick={() => setShowModal(false)}><X size={20}/></button></div>

          {(modalType === 'challan' || modalType === 'payment') && <>
            <label className="block text-xs font-semibold">Student Name<input required value={form.student} onChange={e => setForm({...form, student: e.target.value})} className={`${inputClass} mt-1`} placeholder="Enter student name"/></label>
            <label className="block text-xs font-semibold">Class<input value={form.className} onChange={e => setForm({...form, className: e.target.value})} className={`${inputClass} mt-1`} placeholder="e.g. Grade 5"/></label>
            <label className="block text-xs font-semibold">Amount (PKR)<input required type="number" min="1" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} className={`${inputClass} mt-1`} placeholder="Enter amount"/></label>
          </>}

          {modalType === 'structure' && <>
            <label className="block text-xs font-semibold">Structure Name<input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={`${inputClass} mt-1`} placeholder="e.g. Monthly Tuition"/></label>
            <label className="block text-xs font-semibold">Class<input required value={form.className} onChange={e => setForm({...form, className: e.target.value})} className={`${inputClass} mt-1`} placeholder="e.g. Grade 5 or All Classes"/></label>
            <label className="block text-xs font-semibold">Amount (PKR)<input required type="number" min="1" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} className={`${inputClass} mt-1`}/></label>
            <label className="block text-xs font-semibold">Billing Period<select value={form.period} onChange={e => setForm({...form, period: e.target.value})} className={`${inputClass} mt-1`}><option>Monthly</option><option>Quarterly</option><option>Annual</option></select></label>
            <label className="block text-xs font-semibold">Description<input value={form.description} onChange={e => setForm({...form, description: e.target.value})} className={`${inputClass} mt-1`} placeholder="Optional description"/></label>
          </>}

          {modalType === 'discount' && <>
            <label className="block text-xs font-semibold">Discount Name<input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={`${inputClass} mt-1`} placeholder="e.g. Sibling Discount"/></label>
            <label className="block text-xs font-semibold">Percentage (%)<input required type="number" min="1" max="100" value={form.percentage} onChange={e => setForm({...form, percentage: e.target.value})} className={`${inputClass} mt-1`}/></label>
            <label className="block text-xs font-semibold">Student Name<input value={form.student} onChange={e => setForm({...form, student: e.target.value})} className={`${inputClass} mt-1`} placeholder="Optional student name"/></label>
            <label className="block text-xs font-semibold">Description<input value={form.description} onChange={e => setForm({...form, description: e.target.value})} className={`${inputClass} mt-1`}/></label>
          </>}

          {modalType === 'payment' && <>
            <label className="block text-xs font-semibold">Payment Method<select value={form.method} onChange={e => setForm({...form, method: e.target.value})} className={`${inputClass} mt-1`}><option>Cash</option><option>Bank Transfer</option><option>JazzCash</option><option>EasyPaisa</option></select></label>
            <label className="block text-xs font-semibold">Transaction Reference<input value={form.reference} onChange={e => setForm({...form, reference: e.target.value})} className={`${inputClass} mt-1`} placeholder="Optional reference number"/></label>
          </>}

          {message && <p className="text-xs text-red-600">{message}</p>}
          <div className="flex justify-end gap-2 pt-2"><button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg border text-sm">Cancel</button><button type="submit" className="px-4 py-2 rounded-lg bg-primary-container text-white text-sm font-semibold">Save</button></div>
        </form>
      </div>}

      {viewChallan && <div className="fixed inset-0 z-[100] bg-slate-950/40 flex items-center justify-center p-4" onMouseDown={e => { if (e.target === e.currentTarget) setViewChallan(null); }}>
        <section className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl space-y-3">
          <div className="flex justify-between"><h2 className="font-bold text-lg">Challan Details</h2><button onClick={() => setViewChallan(null)}><X size={20}/></button></div>
          <p><span className="text-slate-500">Challan:</span> {viewChallan.id}</p>
          <p><span className="text-slate-500">Student:</span> {viewChallan.student}</p>
          <p><span className="text-slate-500">Class:</span> {viewChallan.className}</p>
          <p><span className="text-slate-500">Month:</span> {viewChallan.month}</p>
          <p><span className="text-slate-500">Amount:</span> {money(viewChallan.amount)}</p>
          <p><span className="text-slate-500">Status:</span> {viewChallan.status}</p>
          <button onClick={() => printChallan(viewChallan)} className="px-4 py-2 bg-primary-container text-white rounded-lg text-sm">Print Challan</button>
        </section>
      </div>}
    </div>
  );
};

const ChallanTable: React.FC<{
  rows: Challan[];
  statusStyle: (status: string) => string;
  onView?: () => void;
  onViewRecord?: (record: Challan) => void;
  onPrint?: (record: Challan) => void;
  onDelete?: (id: string) => void;
  onStatus?: (id: string, status: Status) => void;
}> = ({ rows, statusStyle, onView, onViewRecord, onPrint, onDelete, onStatus }) => (
  <section className="bg-white rounded-xl border border-outline-variant/40 shadow-sm overflow-hidden">
    <div className="p-5 flex justify-between items-center"><div><h2 className="font-semibold text-on-surface">Fee Records</h2><p className="text-xs text-on-surface-variant mt-1">Student challans and payment status</p></div>{onView && <button onClick={onView} className="text-xs font-semibold text-primary">View All</button>}</div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm min-w-[950px]">
        <thead className="bg-surface-container-low text-xs text-on-surface-variant"><tr>{['Challan ID','Student','Class','Billing Month','Amount','Status','Actions'].map(h => <th key={h} className="px-5 py-3 font-semibold">{h}</th>)}</tr></thead>
        <tbody>{rows.length ? rows.map(row => <tr key={row.id} className="border-t border-outline-variant/30">
          <td className="px-5 py-4 font-semibold text-primary">{row.id}</td>
          <td className="px-5 py-4"><p className="font-medium">{row.student}</p><p className="text-xs text-on-surface-variant">{row.roll}</p></td>
          <td className="px-5 py-4">{row.className}</td>
          <td className="px-5 py-4">{row.month}</td>
          <td className="px-5 py-4 font-semibold">{money(row.amount)}</td>
          <td className="px-5 py-4"><select value={row.status} onChange={e => onStatus?.(row.id, e.target.value as Status)} className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyle(row.status)}`}><option>Paid</option><option>Pending</option><option>Overdue</option></select></td>
          <td className="px-5 py-4"><div className="flex gap-2">
            <button title="View" onClick={() => onViewRecord?.(row)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"><Eye size={15}/></button>
            <button title="Print" onClick={() => onPrint?.(row)} className="p-2 rounded-lg hover:bg-slate-100 text-primary"><Printer size={15}/></button>
            <button title="Delete" onClick={() => onDelete?.(row.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-600"><Trash2 size={15}/></button>
          </div></td>
        </tr>) : <tr><td colSpan={7} className="p-8 text-center text-on-surface-variant">No fee records found.</td></tr>}</tbody>
      </table>
    </div>
  </section>
);

export default FeesModule;
