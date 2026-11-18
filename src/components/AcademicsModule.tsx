import React, { useEffect, useState } from 'react';
import {
  BookOpen, CalendarDays, Clock, Users, GraduationCap,
  Plus, Search, Pencil, Trash2, X, ChevronRight,
  ClipboardList, UserRound, CalendarCheck, BookMarked
} from 'lucide-react';

export type AcademicTab =
  | 'Overview'
  | 'Class Scheduling & Timetable'
  | 'Subject & Teacher Assignment'
  | 'Course Outlines & Syllabi'
  | 'Substitute Teachers'
  | 'Academic Calendar';

type Schedule = {
  id: number;
  className: string;
  subject: string;
  teacher: string;
  day: string;
  start: string;
  end: string;
  room: string;
};

type Assignment = {
  id: number;
  className: string;
  subject: string;
  teacher: string;
};

type Syllabus = {
  id: number;
  className: string;
  subject: string;
  teacher: string;
  term: string;
  progress: number;
};

type Substitute = {
  id: number;
  absentTeacher: string;
  substituteTeacher: string;
  className: string;
  date: string;
  subject: string;
};

type AcademicEvent = {
  id: number;
  title: string;
  type: string;
  date: string;
  description: string;
};

const initialSchedules: Schedule[] = [
  { id: 1, className: 'Class 8-A', subject: 'Mathematics', teacher: 'Mr. Ahmed', day: 'Monday', start: '08:00', end: '08:45', room: 'Room 101' },
  { id: 2, className: 'Class 8-A', subject: 'English', teacher: 'Ms. Sara', day: 'Monday', start: '08:45', end: '09:30', room: 'Room 102' },
  { id: 3, className: 'Class 9-B', subject: 'Science', teacher: 'Mr. Hassan', day: 'Tuesday', start: '09:30', end: '10:15', room: 'Lab 1' },
  { id: 4, className: 'Class 10-A', subject: 'Computer', teacher: 'Ms. Ayesha', day: 'Wednesday', start: '10:15', end: '11:00', room: 'Computer Lab' },
];

const initialAssignments: Assignment[] = [
  { id: 1, className: 'Class 8-A', subject: 'Mathematics', teacher: 'Mr. Ahmed' },
  { id: 2, className: 'Class 8-A', subject: 'English', teacher: 'Ms. Sara' },
  { id: 3, className: 'Class 9-B', subject: 'Science', teacher: 'Mr. Hassan' },
  { id: 4, className: 'Class 10-A', subject: 'Computer', teacher: 'Ms. Ayesha' },
];

const initialSyllabi: Syllabus[] = [
  { id: 1, className: 'Class 8-A', subject: 'Mathematics', teacher: 'Mr. Ahmed', term: 'Term 1', progress: 75 },
  { id: 2, className: 'Class 9-B', subject: 'Science', teacher: 'Mr. Hassan', term: 'Term 1', progress: 60 },
  { id: 3, className: 'Class 10-A', subject: 'English', teacher: 'Ms. Sara', term: 'Term 2', progress: 90 },
];

const initialSubstitutes: Substitute[] = [
  { id: 1, absentTeacher: 'Mr. Ahmed', substituteTeacher: 'Mr. Hassan', className: 'Class 8-A', date: '2026-11-18', subject: 'Mathematics' },
];

const initialEvents: AcademicEvent[] = [
  { id: 1, title: 'Mid-Term Examinations', type: 'Examination', date: '2026-11-24', description: 'Mid-term examination schedule' },
  { id: 2, title: 'Annual Sports Day', type: 'Event', date: '2026-12-05', description: 'School annual sports activities' },
  { id: 3, title: 'Winter Holidays', type: 'Holiday', date: '2026-12-20', description: 'Winter vacation begins' },
];

function loadData<T,>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved) as T;
      if (Array.isArray(parsed) && parsed.length === 0) return fallback;
      return parsed;
    }
    return fallback;
  } catch {
    return fallback;
  }
}

const cardClass = 'bg-white rounded-2xl border border-slate-200 shadow-[0_2px_12px_rgba(15,23,42,0.04)]';
const inputClass = 'w-full rounded-xl border border-slate-200 bg-white px-5 py-4 text-slate-600 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10';
const labelClass = 'mb-2 block text-xs font-semibold tracking-wide text-slate-600';

interface Props {
  initialTab?: AcademicTab;
  onNavigate?: (tab: AcademicTab) => void;
}

const tabs: AcademicTab[] = [
  'Overview',
  'Class Scheduling & Timetable',
  'Subject & Teacher Assignment',
  'Course Outlines & Syllabi',
  'Substitute Teachers',
  'Academic Calendar',
];

const AcademicsModule: React.FC<Props> = ({ initialTab = 'Overview', onNavigate }) => {
  const [activeTab, setActiveTab] = useState<AcademicTab>(initialTab);
  const [schedules, setSchedules] = useState(() => loadData('vlearning-academic-schedules', initialSchedules));
  const [assignments, setAssignments] = useState(() => loadData('vlearning-academic-assignments', initialAssignments));
  const [syllabi, setSyllabi] = useState(() => loadData('vlearning-academic-syllabi', initialSyllabi));
  const [substitutes, setSubstitutes] = useState(() => loadData('vlearning-academic-substitutes', initialSubstitutes));
  const [events, setEvents] = useState(() => loadData('vlearning-academic-events', initialEvents));
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    className: 'Class 8-A',
    subject: '',
    teacher: '',
    day: 'Monday',
    start: '08:00',
    end: '08:45',
    room: '',
    term: 'Term 1',
    absentTeacher: '',
    substituteTeacher: '',
    date: '',
    title: '',
    type: 'Event',
    description: '',
    progress: '0',
  });

  useEffect(() => setActiveTab(initialTab), [initialTab]);

  useEffect(() => { localStorage.setItem('vlearning-academic-schedules', JSON.stringify(schedules)); }, [schedules]);
  useEffect(() => { localStorage.setItem('vlearning-academic-assignments', JSON.stringify(assignments)); }, [assignments]);
  useEffect(() => { localStorage.setItem('vlearning-academic-syllabi', JSON.stringify(syllabi)); }, [syllabi]);
  useEffect(() => { localStorage.setItem('vlearning-academic-substitutes', JSON.stringify(substitutes)); }, [substitutes]);
  useEffect(() => { localStorage.setItem('vlearning-academic-events', JSON.stringify(events)); }, [events]);

  const navigate = (tab: AcademicTab) => {
    setActiveTab(tab);
    setSearch('');
    onNavigate?.(tab);
  };

  const openModal = (id?: number) => {
    setEditingId(id ?? null);
    setMessage('');

    const schedule = schedules.find(item => item.id === id);
    const assignment = assignments.find(item => item.id === id);
    const syllabus = syllabi.find(item => item.id === id);
    const substitute = substitutes.find(item => item.id === id);
    const event = events.find(item => item.id === id);

    const record = schedule ?? assignment ?? syllabus ?? substitute ?? event;
    const recordClass = record && 'className' in record ? record.className : 'Class 8-A';
    const recordSubject = record && 'subject' in record ? record.subject : '';
    const recordTeacher = record && 'teacher' in record ? record.teacher : '';

    setForm({
      className: recordClass,
      subject: recordSubject,
      teacher: recordTeacher,
      day: schedule?.day ?? 'Monday',
      start: schedule?.start ?? '08:00',
      end: schedule?.end ?? '08:45',
      room: schedule?.room ?? '',
      term: syllabus?.term ?? 'Term 1',
      absentTeacher: substitute?.absentTeacher ?? '',
      substituteTeacher: substitute?.substituteTeacher ?? '',
      date: substitute?.date ?? event?.date ?? '',
      title: event?.title ?? '',
      type: event?.type ?? 'Event',
      description: event?.description ?? '',
      progress: String(syllabus?.progress ?? 0),
    });

    setShowModal(true);
  };

  const saveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const nextId = (list: { id: number }[]) => Math.max(0, ...list.map(x => x.id)) + 1;

    if (activeTab === 'Class Scheduling & Timetable') {
      if (!form.subject.trim() || !form.teacher.trim() || !form.room.trim() || !form.start || !form.end || form.start >= form.end) {
        setMessage('Enter valid subject, teacher, room and time details.');
        return;
      }

      const record: Schedule = {
        id: editingId ?? nextId(schedules),
        className: form.className,
        subject: form.subject.trim(),
        teacher: form.teacher.trim(),
        day: form.day,
        start: form.start,
        end: form.end,
        room: form.room.trim(),
      };

      setSchedules(prev => editingId ? prev.map(x => x.id === editingId ? record : x) : [...prev, record]);
    }

    if (activeTab === 'Subject & Teacher Assignment') {
      if (!form.subject.trim() || !form.teacher.trim()) {
        setMessage('Enter both subject and teacher.');
        return;
      }

      const record: Assignment = {
        id: editingId ?? nextId(assignments),
        className: form.className,
        subject: form.subject.trim(),
        teacher: form.teacher.trim(),
      };

      setAssignments(prev => editingId ? prev.map(x => x.id === editingId ? record : x) : [...prev, record]);
    }

    if (activeTab === 'Course Outlines & Syllabi') {
      if (!form.subject.trim() || !form.teacher.trim()) {
        setMessage('Enter subject and teacher.');
        return;
      }

      const record: Syllabus = {
        id: editingId ?? nextId(syllabi),
        className: form.className,
        subject: form.subject.trim(),
        teacher: form.teacher.trim(),
        term: form.term,
        progress: Math.min(100, Math.max(0, Number(form.progress))),
      };

      setSyllabi(prev => editingId ? prev.map(x => x.id === editingId ? record : x) : [...prev, record]);
    }

    if (activeTab === 'Substitute Teachers') {
      if (!form.absentTeacher.trim() || !form.substituteTeacher.trim() || !form.date || !form.subject.trim()) {
        setMessage('Complete all required substitution details.');
        return;
      }

      const record: Substitute = {
        id: editingId ?? nextId(substitutes),
        absentTeacher: form.absentTeacher.trim(),
        substituteTeacher: form.substituteTeacher.trim(),
        className: form.className,
        date: form.date,
        subject: form.subject.trim(),
      };

      setSubstitutes(prev => editingId ? prev.map(x => x.id === editingId ? record : x) : [...prev, record]);
    }

    if (activeTab === 'Academic Calendar') {
      if (!form.title.trim() || !form.date) {
        setMessage('Enter an event title and date.');
        return;
      }

      const record: AcademicEvent = {
        id: editingId ?? nextId(events),
        title: form.title.trim(),
        type: form.type,
        date: form.date,
        description: form.description.trim(),
      };

      setEvents(prev => editingId ? prev.map(x => x.id === editingId ? record : x) : [...prev, record]);
    }

    setShowModal(false);
  };

  const removeRecord = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    if (activeTab === 'Class Scheduling & Timetable') setSchedules(prev => prev.filter(x => x.id !== id));
    if (activeTab === 'Subject & Teacher Assignment') setAssignments(prev => prev.filter(x => x.id !== id));
    if (activeTab === 'Course Outlines & Syllabi') setSyllabi(prev => prev.filter(x => x.id !== id));
    if (activeTab === 'Substitute Teachers') setSubstitutes(prev => prev.filter(x => x.id !== id));
    if (activeTab === 'Academic Calendar') setEvents(prev => prev.filter(x => x.id !== id));
  };

  const heading = (title: string, description: string, action = 'Add New') => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      </div>
      {activeTab !== 'Overview' && (
        <button onClick={() => openModal()} className="inline-flex items-center justify-center gap-0 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 active:scale-[0.98]">
          <Plus size={17} /> {action}
        </button>
      )}
    </div>
  );

  const filtered = <T extends object>(items: T[], fields: (keyof T)[]) =>
    items.filter(item => fields.some(field => String(item[field]).toLowerCase().includes(search.toLowerCase())));

  const actions = (id: number) => (
    <div className="flex items-center justify-center gap-0">
      <button onClick={() => openModal(id)} title="Edit" className="p-1.5 rounded-lg text-slate-500 transition hover:bg-blue-50 hover:text-blue-700"><Pencil size={16} /></button>
      <button onClick={() => removeRecord(id)} title="Delete" className="p-1.5 rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button>
    </div>
  );

  const table = (headers: string[], rows: React.ReactNode[]) => (
    <div className={`${cardClass} overflow-hidden`}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-600">
            <tr>{headers.map(h => <th key={h} className={`px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap ${h === "Actions" ? "text-center" : ""}`}>{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-slate-100">{rows}</tbody>
        </table>
        {rows.length === 0 && <div className="p-10 text-center text-sm text-on-surface-variant">No records found.</div>}
      </div>
    </div>
  );

  const statCards = [
    { label: 'Class Schedules', value: schedules.length, icon: CalendarDays },
    { label: 'Subject Assignments', value: assignments.length, icon: BookOpen },
    { label: 'Course Outlines', value: syllabi.length, icon: ClipboardList },
    { label: 'Academic Events', value: events.length, icon: CalendarCheck },
  ];

  const eventColor = (type: string) =>
    type === 'Examination' ? 'bg-amber-50 text-amber-700' :
    type === 'Holiday' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700';

  const modalTitle = editingId ? 'Edit Record' : 'Add New Record';

  return (
    <div className="space-y-6">
      {activeTab === 'Overview' && <>
        {heading('Academics & Timetable Management', 'Manage class schedules, teaching assignments, course outlines and academic events.')}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {statCards.map(({ label, value, icon: Icon }) => (
            <div key={label} className={`${cardClass} p-5 sm:p-6`}>
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700"><Icon size={20} /></div>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800">{value}</span>
              </div>
              <p className="mt-4 text-sm font-medium text-slate-500">{label}</p>
            </div>
          ))}
        </div>

        <div className={`${cardClass} p-5 sm:p-6`}>
          <h2 className="text-base font-bold text-slate-800 mb-5">Academic Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {tabs.slice(1).map((tab, i) => {
              const icons = [CalendarDays, Users, BookMarked, UserRound, CalendarCheck];
              const Icon = icons[i];
              return (
                <button key={tab} onClick={() => navigate(tab)} className="group flex items-center gap-4 p-4 sm:p-5 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-md text-left transition-all duration-200">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 shrink-0 group-hover:bg-blue-100"><Icon size={20} /></div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm text-slate-800">{tab}</p>
                    <p className="text-xs text-slate-500 mt-1.5">Manage and view records</p>
                  </div>
                  <ChevronRight size={17} className="text-slate-400" />
                </button>
              );
            })}
          </div>
        </div>

        <div className={`${cardClass} p-5 sm:p-6`}>
          <h2 className="text-base font-bold text-slate-800 mb-5">Upcoming Academic Events</h2>
          <div className="space-y-3">
            {[...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4).map(event => (
              <div key={event.id} className="flex flex-wrap items-center justify-between gap-3 py-2 border-b border-outline-variant/30 last:border-0">
                <div><p className="font-medium text-sm text-on-surface">{event.title}</p><p className="text-xs text-slate-500 mt-1.5">{event.date}</p></div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${eventColor(event.type)}`}>{event.type}</span>
              </div>
            ))}
            {events.length === 0 && <p className="text-sm text-on-surface-variant">No academic events added yet.</p>}
          </div>
        </div>
      </>}

      {activeTab === 'Class Scheduling & Timetable' && <>
        {heading('Class Scheduling & Timetable', 'Create and manage class-wise daily schedules.')}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1"><Search size={17} className="absolute left-3 top-3 text-slate-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search class, subject or teacher..." className={`${inputClass} pl-10`} /></div>
        </div>
        {table(['Class', 'Subject', 'Teacher', 'Day', 'Time', 'Room', 'Actions'], filtered(schedules, ['className', 'subject', 'teacher', 'day']).map(item => (
          <tr key={item.id}><td className="px-5 py-4 text-slate-600 font-medium">{item.className}</td><td className="px-5 py-4 text-slate-600">{item.subject}</td><td className="px-5 py-4 text-slate-600">{item.teacher}</td><td className="px-5 py-4 text-slate-600">{item.day}</td><td className="px-5 py-4 text-slate-600 whitespace-nowrap">{item.start} - {item.end}</td><td className="px-5 py-4 text-slate-600">{item.room}</td><td className="px-5 py-4 text-slate-600">{actions(item.id)}</td></tr>
        )))}
      </>}

      {activeTab === 'Subject & Teacher Assignment' && <>
        {heading('Subject & Teacher Assignment', 'Assign teaching staff and subjects to classes.')}
        <div className="relative mb-4"><Search size={17} className="absolute left-3 top-3 text-slate-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search assignments..." className={`${inputClass} pl-10`} /></div>
        {table(['Class', 'Subject', 'Assigned Teacher', 'Actions'], filtered(assignments, ['className', 'subject', 'teacher']).map(item => (
          <tr key={item.id}><td className="px-5 py-4 text-slate-600 font-medium">{item.className}</td><td className="px-5 py-4 text-slate-600">{item.subject}</td><td className="px-5 py-4 text-slate-600">{item.teacher}</td><td className="px-5 py-4 text-slate-600">{actions(item.id)}</td></tr>
        )))}
      </>}

      {activeTab === 'Course Outlines & Syllabi' && <>
        {heading('Course Outlines & Syllabi', 'Maintain course outlines, terms and syllabus completion.')}
        <div className="relative mb-4"><Search size={17} className="absolute left-3 top-3 text-slate-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search course outlines..." className={`${inputClass} pl-10`} /></div>
        {table(['Class', 'Subject', 'Teacher', 'Term', 'Completion', 'Actions'], filtered(syllabi, ['className', 'subject', 'teacher', 'term']).map(item => (
          <tr key={item.id}><td className="px-5 py-4 text-slate-600 font-medium">{item.className}</td><td className="px-5 py-4 text-slate-600">{item.subject}</td><td className="px-5 py-4 text-slate-600">{item.teacher}</td><td className="px-5 py-4 text-slate-600">{item.term}</td><td className="px-5 py-4 text-slate-600 min-w-36"><div className="flex items-center gap-2"><div className="h-2 flex-1 rounded-full bg-surface-container-low overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${item.progress}%` }} /></div><span className="text-xs">{item.progress}%</span></div></td><td className="px-5 py-4 text-slate-600">{actions(item.id)}</td></tr>
        )))}
      </>}

      {activeTab === 'Substitute Teachers' && <>
        {heading('Substitute Teacher Management', 'Record and manage replacement teacher assignments.')}
        <div className="relative mb-4"><Search size={17} className="absolute left-3 top-3 text-slate-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search substitute assignments..." className={`${inputClass} pl-10`} /></div>
        {table(['Absent Teacher', 'Substitute Teacher', 'Class', 'Subject', 'Date', 'Actions'], filtered(substitutes, ['absentTeacher', 'substituteTeacher', 'className', 'subject']).map(item => (
          <tr key={item.id}><td className="px-5 py-4 text-slate-600">{item.absentTeacher}</td><td className="px-5 py-4 text-slate-600 font-medium">{item.substituteTeacher}</td><td className="px-5 py-4 text-slate-600">{item.className}</td><td className="px-5 py-4 text-slate-600">{item.subject}</td><td className="px-5 py-4 text-slate-600">{item.date}</td><td className="px-5 py-4 text-slate-600">{actions(item.id)}</td></tr>
        )))}
      </>}

      {activeTab === 'Academic Calendar' && <>
        {heading('Academic Calendar', 'Manage academic events, examinations and holidays.', 'Add Event')}
        <div className="relative mb-4"><Search size={17} className="absolute left-3 top-3 text-slate-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search calendar events..." className={`${inputClass} pl-10`} /></div>
        {table(['Event', 'Category', 'Date', 'Description', 'Actions'], filtered(events, ['title', 'type', 'description']).map(item => (
          <tr key={item.id}><td className="px-5 py-4 text-slate-600 font-medium">{item.title}</td><td className="px-5 py-4 text-slate-600"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${eventColor(item.type)}`}>{item.type}</span></td><td className="px-5 py-4 text-slate-600 whitespace-nowrap">{item.date}</td><td className="px-5 py-4 text-slate-600">{item.description || '-'}</td><td className="px-5 py-4 text-slate-600">{actions(item.id)}</td></tr>
        )))}
      </>}

      {showModal && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4" onMouseDown={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
        <section role="dialog" aria-modal="true" className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white">
            <div><h2 className="font-bold text-lg text-slate-800">{modalTitle}</h2><p className="text-xs text-slate-500 mt-1.5">{activeTab}</p></div>
            <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-surface-container-low"><X size={19} /></button>
          </div>
          <form onSubmit={saveRecord} className="p-6 space-y-5">
            {['Class Scheduling & Timetable', 'Subject & Teacher Assignment', 'Course Outlines & Syllabi'].includes(activeTab) && <>
              <div><label className={labelClass}>Class</label><select className={inputClass} value={form.className} onChange={e => setForm({...form, className: e.target.value})}>{['Class 8-A', 'Class 8-B', 'Class 9-A', 'Class 9-B', 'Class 10-A', 'Class 10-B'].map(x => <option key={x}>{x}</option>)}</select></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label className={labelClass}>Subject</label><input required className={inputClass} value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="Enter subject" /></div>
                <div><label className={labelClass}>Teacher</label><input required className={inputClass} value={form.teacher} onChange={e => setForm({...form, teacher: e.target.value})} placeholder="Enter teacher name" /></div>
              </div>
            </>}

            {activeTab === 'Class Scheduling & Timetable' && <>
              <div><label className={labelClass}>Day</label><select className={inputClass} value={form.day} onChange={e => setForm({...form, day: e.target.value})}>{['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(x => <option key={x}>{x}</option>)}</select></div>
              <div className="grid grid-cols-2 gap-3"><div><label className={labelClass}>Start Time</label><input required type="time" className={inputClass} value={form.start} onChange={e => setForm({...form, start: e.target.value})} /></div><div><label className={labelClass}>End Time</label><input required type="time" className={inputClass} value={form.end} onChange={e => setForm({...form, end: e.target.value})} /></div></div>
              <div><label className={labelClass}>Room</label><input required className={inputClass} value={form.room} onChange={e => setForm({...form, room: e.target.value})} placeholder="Enter room" /></div>
            </>}

            {activeTab === 'Course Outlines & Syllabi' && <>
              <div><label className={labelClass}>Term</label><select className={inputClass} value={form.term} onChange={e => setForm({...form, term: e.target.value})}><option>Term 1</option><option>Term 2</option><option>Term 3</option><option>Annual</option></select></div>
              <div><label className={labelClass}>Syllabus Completion (%)</label><input type="number" min="0" max="100" className={inputClass} value={form.progress} onChange={e => setForm({...form, progress: e.target.value})} /></div>
            </>}

            {activeTab === 'Substitute Teachers' && <>
              <div><label className={labelClass}>Class</label><select className={inputClass} value={form.className} onChange={e => setForm({...form, className: e.target.value})}>{['Class 8-A', 'Class 8-B', 'Class 9-A', 'Class 9-B', 'Class 10-A'].map(x => <option key={x}>{x}</option>)}</select></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label className={labelClass}>Absent Teacher</label><input required className={inputClass} value={form.absentTeacher} onChange={e => setForm({...form, absentTeacher: e.target.value})} /></div>
                <div><label className={labelClass}>Substitute Teacher</label><input required className={inputClass} value={form.substituteTeacher} onChange={e => setForm({...form, substituteTeacher: e.target.value})} /></div>
              </div>
              <div><label className={labelClass}>Subject</label><input required className={inputClass} value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} /></div>
              <div><label className={labelClass}>Date</label><input required type="date" className={inputClass} value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div>
            </>}

            {activeTab === 'Academic Calendar' && <>
              <div><label className={labelClass}>Event Title</label><input required className={inputClass} value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Enter event name" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label className={labelClass}>Category</label><select className={inputClass} value={form.type} onChange={e => setForm({...form, type: e.target.value})}><option>Event</option><option>Examination</option><option>Holiday</option></select></div>
                <div><label className={labelClass}>Date</label><input required type="date" className={inputClass} value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div>
              </div>
              <div><label className={labelClass}>Description</label><textarea rows={3} className={inputClass} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Enter details (optional)" /></div>
            </>}

            {message && <p className="text-sm text-red-600">{message}</p>}
            <div className="flex justify-end gap-2 pt-3 border-t border-outline-variant/30">
              <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold shadow-sm hover:bg-blue-800 transition">Save Record</button>
            </div>
          </form>
        </section>
      </div>}
    </div>
  );
};

export default AcademicsModule;











