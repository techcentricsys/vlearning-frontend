import React, { useEffect, useState } from 'react';
import { Pencil, Printer, Trash2, X } from 'lucide-react';

export type TeacherStaffTab =
  | 'Teacher Profiles'
  | 'Class & Subject Allocation'
  | 'Payroll Management'
  | 'Attendance & Leave'
  | 'Performance Evaluation';

type Field = { key: string; label: string; type?: string };
type StaffRecord = { id: number; [key: string]: string | number };

const tabs: TeacherStaffTab[] = [
  'Teacher Profiles',
  'Class & Subject Allocation',
  'Payroll Management',
  'Attendance & Leave',
  'Performance Evaluation',
];

const storageKeys: Record<TeacherStaffTab, string> = {
  'Teacher Profiles': 'vlearning-teacher-profiles',
  'Class & Subject Allocation': 'vlearning-teacher-allocations',
  'Payroll Management': 'vlearning-teacher-payroll',
  'Attendance & Leave': 'vlearning-teacher-attendance-leaves',
  'Performance Evaluation': 'vlearning-teacher-performance',
};

const fields: Record<TeacherStaffTab, Field[]> = {
  'Teacher Profiles': [
    { key: 'name', label: 'Full Name' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'phone', label: 'Phone Number' },
    { key: 'designation', label: 'Designation' },
    { key: 'qualifications', label: 'Qualifications' },
    { key: 'experience', label: 'Experience (Years)', type: 'number' },
    { key: 'subjects', label: 'Subjects' },
    { key: 'joiningDate', label: 'Joining Date', type: 'date' },
    { key: 'status', label: 'Status' },
  ],
  'Class & Subject Allocation': [
    { key: 'teacher', label: 'Teacher Name' },
    { key: 'className', label: 'Class' },
    { key: 'section', label: 'Section' },
    { key: 'subject', label: 'Subject' },
    { key: 'academicYear', label: 'Academic Year' },
    { key: 'status', label: 'Status' },
  ],
  'Payroll Management': [
    { key: 'teacher', label: 'Teacher Name' },
    { key: 'month', label: 'Salary Month' },
    { key: 'basicSalary', label: 'Basic Salary', type: 'number' },
    { key: 'bonus', label: 'Bonus', type: 'number' },
    { key: 'deductions', label: 'Deductions', type: 'number' },
    { key: 'netSalary', label: 'Net Salary', type: 'number' },
    { key: 'paymentDate', label: 'Payment Date', type: 'date' },
    { key: 'status', label: 'Payment Status' },
  ],
  'Attendance & Leave': [
    { key: 'recordType', label: 'Record Type' },
    { key: 'teacher', label: 'Teacher Name' },
    { key: 'date', label: 'Date', type: 'date' },
    { key: 'status', label: 'Attendance / Leave Status' },
    { key: 'leaveType', label: 'Leave Type' },
    { key: 'from', label: 'Leave From', type: 'date' },
    { key: 'to', label: 'Leave To', type: 'date' },
    { key: 'reason', label: 'Reason' },
  ],
  'Performance Evaluation': [
    { key: 'teacher', label: 'Teacher Name' },
    { key: 'reviewDate', label: 'Review Date', type: 'date' },
    { key: 'reviewer', label: 'Reviewer' },
    { key: 'rating', label: 'Rating (1-5)', type: 'number' },
    { key: 'strengths', label: 'Strengths' },
    { key: 'improvements', label: 'Areas for Improvement' },
    { key: 'comments', label: 'Comments' },
  ],
};

const columns: Record<TeacherStaffTab, string[]> = {
  'Teacher Profiles': ['name', 'designation', 'qualifications', 'experience', 'subjects', 'status'],
  'Class & Subject Allocation': ['teacher', 'className', 'section', 'subject', 'academicYear', 'status'],
  'Payroll Management': ['teacher', 'month', 'basicSalary', 'bonus', 'deductions', 'netSalary', 'status'],
  'Attendance & Leave': ['recordType', 'teacher', 'date', 'status', 'leaveType', 'from', 'to'],
  'Performance Evaluation': ['teacher', 'reviewDate', 'reviewer', 'rating', 'strengths', 'improvements'],
};

const emptyRecords = (): Record<TeacherStaffTab, StaffRecord[]> => ({
  'Teacher Profiles': [],
  'Class & Subject Allocation': [],
  'Payroll Management': [],
  'Attendance & Leave': [],
  'Performance Evaluation': [],
});

const loadRecords = (): Record<TeacherStaffTab, StaffRecord[]> => {
  const result = emptyRecords();
  tabs.forEach(tab => {
    try {
      const saved = localStorage.getItem(storageKeys[tab]);
      const parsed: unknown = saved ? JSON.parse(saved) : [];
      result[tab] = Array.isArray(parsed) ? parsed as StaffRecord[] : [];
    } catch {
      result[tab] = [];
    }
  });

  const demoData: Record<TeacherStaffTab, StaffRecord[]> = {
    'Teacher Profiles': [
      { id: 1, name: 'Ayesha Khan', email: 'ayesha@school.edu', phone: '03001234567', designation: 'Senior Teacher', qualifications: 'M.Ed', experience: 8, subjects: 'English, Urdu', joiningDate: '2021-03-15', status: 'Active' },
      { id: 2, name: 'Ahmed Raza', email: 'ahmed@school.edu', phone: '03007654321', designation: 'Science Teacher', qualifications: 'M.Sc Physics', experience: 5, subjects: 'Physics, Mathematics', joiningDate: '2022-08-01', status: 'Active' }
    ],
    'Class & Subject Allocation': [
      { id: 1, teacher: 'Ayesha Khan', className: 'Class 8', section: 'A', subject: 'English', academicYear: '2026-2027', status: 'Assigned' },
      { id: 2, teacher: 'Ahmed Raza', className: 'Class 9', section: 'B', subject: 'Physics', academicYear: '2026-2027', status: 'Assigned' }
    ],
    'Payroll Management': [
      { id: 1, teacher: 'Ayesha Khan', month: 'November 2026', basicSalary: 65000, bonus: 5000, deductions: 2000, netSalary: 68000, paymentDate: '2026-11-05', status: 'Paid' },
      { id: 2, teacher: 'Ahmed Raza', month: 'November 2026', basicSalary: 55000, bonus: 3000, deductions: 1500, netSalary: 56500, paymentDate: '2026-11-05', status: 'Paid' }
    ],
    'Attendance & Leave': [
      { id: 1, recordType: 'Attendance', teacher: 'Ayesha Khan', date: '2026-11-23', status: 'Present', leaveType: '-', from: '-', to: '-', reason: '-' },
      { id: 2, recordType: 'Leave', teacher: 'Ahmed Raza', date: '2026-11-23', status: 'Approved', leaveType: 'Casual Leave', from: '2026-11-24', to: '2026-11-25', reason: 'Personal work' }
    ],
    'Performance Evaluation': [
      { id: 1, teacher: 'Ayesha Khan', reviewDate: '2026-11-15', reviewer: 'Principal', rating: 5, strengths: 'Classroom management, communication', improvements: 'More digital activities', comments: 'Excellent performance' },
      { id: 2, teacher: 'Ahmed Raza', reviewDate: '2026-11-15', reviewer: 'Vice Principal', rating: 4, strengths: 'Subject knowledge, punctuality', improvements: 'Student engagement', comments: 'Very good performance' }
    ]
  };

  tabs.forEach(tab => {
    if (result[tab].length === 0) {
      result[tab] = demoData[tab];
    }
  });
  return result;
};

interface Props {
  initialTab: TeacherStaffTab;
  onNavigate: (tab: TeacherStaffTab) => void;
}

const TeacherStaffModuleContent: React.FC<Props> = ({ initialTab, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<TeacherStaffTab>(initialTab);
  const [records, setRecords] = useState(loadRecords);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    tabs.forEach(tab => {
      localStorage.setItem(storageKeys[tab], JSON.stringify(records[tab]));
    });
  }, [records]);

  const currentRecords = Array.isArray(records?.[activeTab]) ? records[activeTab] : [];
  const currentFields = fields[activeTab] ?? fields['Teacher Profiles'];
  const currentColumns = columns[activeTab] ?? columns['Teacher Profiles'];

  const openForm = (record?: StaffRecord) => {
    const values: Record<string, string> = {};
    currentFields.forEach(field => {
      values[field.key] = record ? String(record[field.key] ?? '') : '';
    });
    setForm(values);
    setEditingId(record ? record.id : null);
    setShowForm(true);
  };

  const saveRecord = (event: React.FormEvent) => {
    event.preventDefault();
    const requiredKey = activeTab === 'Teacher Profiles' ? 'name' : 'teacher';
    if (!form[requiredKey]?.trim()) {
      alert(`Please enter teacher name.`);
      return;
    }
    const record: StaffRecord = {
      ...form,
      id: editingId ?? Math.max(0, ...currentRecords.map(item => item.id)) + 1,
    };
    setRecords(previous => ({
      ...previous,
      [activeTab]: editingId === null
        ? [...(previous[activeTab] ?? []), record]
        : (previous[activeTab] ?? []).map(item => item.id === editingId ? record : item),
    }));
    setShowForm(false);
    setEditingId(null);
  };

  const deleteRecord = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    setRecords(previous => ({
      ...previous,
      [activeTab]: (previous[activeTab] ?? []).filter(item => item.id !== id),
    }));
  };

  const filteredRecords = currentRecords.filter(record =>
    currentColumns.some(key =>
      String(record[key] ?? '').toLowerCase().includes(search.toLowerCase())
    )
  );

  const titles: Record<TeacherStaffTab, string> = {
    'Teacher Profiles': 'Teacher Profiles',
    'Class & Subject Allocation': 'Class & Subject Allocation',
    'Payroll Management': 'Payroll Management',
    'Attendance & Leave': 'Attendance & Leave Management',
    'Performance Evaluation': 'Performance Evaluation',
  };

  const descriptions: Record<TeacherStaffTab, string> = {
    'Teacher Profiles': 'Manage teacher information, qualifications, experience and subjects.',
    'Class & Subject Allocation': 'Assign teachers to classes, sections and subjects.',
    'Payroll Management': 'Manage salaries, bonuses, deductions and salary payment records.',
    'Attendance & Leave': 'Maintain staff attendance and leave records.',
    'Performance Evaluation': 'Record teacher reviews, ratings and improvement feedback.',
  };

  return (
    <div className="space-y-6 [animation:teacherStaffFadeIn_0.45s_ease-out]">
      <style>{`
        @keyframes teacherStaffFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes teacherStaffModalIn {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
      <div className="rounded-2xl bg-gradient-to-r from-[#173B70] via-[#245A99] to-[#4389C9] p-6 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-200/40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-blue-100">VLearnings / Management</p>
            <h1 className="mt-2 text-2xl font-bold">Teacher & Staff Management</h1>
            <p className="mt-1 text-sm text-blue-100">Manage teaching staff and their daily operations</p>
          </div>
          <div className="rounded-xl border border-white/20 bg-white/10 px-5 py-3">
            <p className="text-xs text-blue-100">Total teacher profiles</p>
            <p className="text-2xl font-bold">{(records['Teacher Profiles'] ?? []).length}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm transition-all duration-300 hover:shadow-md">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); onNavigate(tab); setSearch(''); setShowForm(false); }}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 ${
              activeTab === tab
                ? 'bg-[#193F73] text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/60">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{titles[activeTab]}</h2>
            <p className="mt-1 text-sm text-slate-500">{descriptions[activeTab]}</p>
          </div>
          <button
            onClick={() => openForm()}
            className="rounded-lg bg-[#193F73] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#245A99] hover:shadow-lg active:scale-95"
          >
            + Add New Record
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <input
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search records..."
            className="w-full max-w-sm rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <span className="text-sm text-slate-500">{filteredRecords.length} records</span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                {currentColumns.map(key => (
                  <th key={key} className="px-4 py-3 font-semibold">
                    {currentFields.find(field => field.key === key)?.label ?? key}
                  </th>
                ))}
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map(record => (
                <tr key={record.id} className="transition-colors duration-200 hover:bg-blue-50/60">
                  {currentColumns.map(key => (
                    <td key={key} className="max-w-[220px] truncate px-4 py-3 text-slate-700">
                      {String(record[key] ?? '-')}
                    </td>
                  ))}
                  <td className="whitespace-nowrap px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button title="Edit" onClick={() => openForm(record)} className="rounded-lg p-2 text-blue-700 hover:bg-blue-50"><Pencil size={16} /></button>
                      {activeTab === 'Payroll Management' && (
                        <button title="Print Slip" onClick={() => window.print()} className="rounded-lg p-2 text-emerald-700 hover:bg-emerald-50"><Printer size={16} /></button>
                      )}
                      <button title="Delete" onClick={() => deleteRecord(record.id)} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan={currentColumns.length + 1} className="px-4 py-14 text-center">
                    <p className="font-semibold text-slate-600">No records found</p>
                    <p className="mt-1 text-sm text-slate-400">Add your first record to get started.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <form onSubmit={saveRecord} className="my-6 w-full max-w-2xl rounded-2xl bg-white shadow-2xl [animation:teacherStaffModalIn_0.25s_ease-out]">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{editingId === null ? 'Add' : 'Edit'} {titles[activeTab]}</h3>
                <p className="text-xs text-slate-500">Enter the required information below</p>
              </div>
              {/* FIXED: Pehle yahan garbled text tha, ab X icon hai */}
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800" aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
              {currentFields.map(field => (
                <label key={field.key} className="text-sm font-medium text-slate-700">
                  {field.label}
                  <input
                    type={field.type ?? 'text'}
                    value={form[field.key] ?? ''}
                    onChange={event => setForm(previous => ({ ...previous, [field.key]: event.target.value }))}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-normal outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600">Cancel</button>
              <button type="submit" className="rounded-lg bg-[#193F73] px-5 py-2 text-sm font-semibold text-white hover:bg-[#245A99]">Save Record</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

class TeacherStaffErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: string | null }
> {
  state = { error: null as string | null };
  static getDerivedStateFromError(error: Error) {
    return { error: error.message };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="m-6 rounded-xl border border-red-300 bg-red-50 p-6 text-red-800">
          <h2 className="text-lg font-bold">Teacher & Staff Module Error</h2>
          <pre className="mt-3 whitespace-pre-wrap text-sm">{this.state.error}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const TeacherStaffModule: React.FC<Props> = (props) => (
  <TeacherStaffErrorBoundary>
    <TeacherStaffModuleContent {...props} />
  </TeacherStaffErrorBoundary>
);

export default TeacherStaffModule;