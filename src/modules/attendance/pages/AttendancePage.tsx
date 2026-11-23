import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity, CalendarDays, Users, UserCheck, UserX, Clock3, Percent, ClipboardList,
  Fingerprint, FileBarChart, Search, Save, Plus, Trash2, Download, RefreshCw,
  AlertCircle, Bell
} from 'lucide-react';
import { attendanceService } from '../services/attendanceService';
import type {
  AttendanceDevice, AttendanceRecord, AttendanceSource, AttendanceStatus,
  AttendanceStudent, StaffAttendanceRecord, StudentAttendanceRecord
} from '../types/attendanceTypes';

type Section = 'Overview' | 'Student Attendance' | 'Staff Attendance' | 'Attendance Records' | 'Biometric / RFID' | 'Reports';
const sections: { name: Section; icon: React.ElementType }[] = [
  { name: 'Overview', icon: Activity }, { name: 'Student Attendance', icon: Users },
  { name: 'Staff Attendance', icon: UserCheck }, { name: 'Attendance Records', icon: ClipboardList },
  { name: 'Biometric / RFID', icon: Fingerprint }, { name: 'Reports', icon: FileBarChart },
];
const today = () => new Date().toISOString().slice(0, 10);
const input = 'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100';
const label = 'mb-1.5 block text-xs font-semibold text-slate-600';
const card = 'rounded-2xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)]';
const button = 'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50';
const primary = `${button} bg-indigo-700 text-white hover:bg-indigo-800`;
const secondary = `${button} border border-slate-200 bg-white text-slate-700 hover:bg-slate-50`;
const statusStyle = (status: string) => status === 'Present' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : status === 'Absent' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-amber-50 text-amber-700 border-amber-200';
const makeId = () => typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;

export default function AttendancePage({ initialSection = 'Overview' }: { initialSection?: Section }) {
  const [section, setSection] = useState<Section>(initialSection);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [students, setStudents] = useState<AttendanceStudent[]>([]);
  const [employees, setEmployees] = useState(() => attendanceService.getEmployees());
  const [devices, setDevices] = useState<AttendanceDevice[]>([]);
  const [notifications, setNotifications] = useState(() => attendanceService.getNotifications());
  const [date, setDate] = useState(today());
  const [kind, setKind] = useState<'Daily' | 'Subject-wise'>('Daily');
  const [subject, setSubject] = useState('Mathematics');
  const [className, setClassName] = useState('All');
  const [teacher, setTeacher] = useState('');
  const [source, setSource] = useState<AttendanceSource>('Manual');
  const [marks, setMarks] = useState<Record<string, AttendanceStatus>>({});
  const [staffId, setStaffId] = useState('');
  const [staffDate, setStaffDate] = useState(today());
  const [checkIn, setCheckIn] = useState('08:00');
  const [checkOut, setCheckOut] = useState('14:00');
  const [staffStatus, setStaffStatus] = useState<AttendanceStatus>('Present');
  const [staffSource, setStaffSource] = useState<AttendanceSource>('Manual');
  const [recordSearch, setRecordSearch] = useState('');
  const [recordKind, setRecordKind] = useState('All');
  const [recordDate, setRecordDate] = useState('');
  const [reportMonth, setReportMonth] = useState(today().slice(0, 7));
  const [reportDate, setReportDate] = useState(today());
  const [reportType, setReportType] = useState<'Students' | 'Staff'>('Students');
  const [deviceForm, setDeviceForm] = useState({ name: '', code: '', type: 'Biometric' as 'Biometric' | 'RFID', location: '' });
  const [message, setMessage] = useState('');

  const refresh = () => {
    setRecords(attendanceService.getRecords());
    setStudents(attendanceService.getStudents());
    setEmployees(attendanceService.getEmployees());
    setDevices(attendanceService.getDevices());
    setNotifications(attendanceService.getNotifications());
  };
  useEffect(() => { refresh(); }, []);
  useEffect(() => { setSection(initialSection); }, [initialSection]);

  const classOptions = useMemo(() => [...new Set(students.map(s => s.className).filter(Boolean))].sort(), [students]);
  const visibleStudents = useMemo(() => students.filter(s => className === 'All' || s.className === className), [students, className]);
  const keyFor = (studentId: string) => `${studentId}`;
  useEffect(() => {
    const existing = records.filter((r): r is StudentAttendanceRecord =>
      r.kind === 'Student' && r.date === date &&
      r.attendanceType === kind &&
      r.subject === (kind === 'Subject-wise' ? subject : '')
    );
    setMarks(Object.fromEntries(existing.map(r => [r.studentId, r.status])) as Record<string, AttendanceStatus>);
  }, [records, date, kind, subject, className]);

  const todayStudentRecords = records.filter((r): r is StudentAttendanceRecord =>
    r.kind === 'Student' && r.date === today() && r.attendanceType === 'Daily'
  );
  const todayStaffRecords = records.filter((r): r is StaffAttendanceRecord =>
    r.kind === 'Staff' && r.date === today()
  );
  const count = (rows: AttendanceRecord[], status: AttendanceStatus) => rows.filter(r => r.status === status).length;
  const totalStudents = students.length;
  const totalStaff = employees.length;
  const rate = (present: number, total: number) => total ? `${Math.round(present / total * 100)}%` : '0%';
  const notify = (text: string) => { setMessage(text); window.setTimeout(() => setMessage(''), 3500); };

  const saveStudentAttendance = () => {
    if (!date || !visibleStudents.length) { notify('Select a valid date and class.'); return; }
    if (!teacher.trim()) { notify('Enter the responsible teacher name.'); return; }
    if (visibleStudents.some(s => !marks[keyFor(s.id)])) { notify('Please mark attendance for every student in the selected class.'); return; }
    if (kind === 'Subject-wise' && !subject.trim()) { notify('Select a subject.'); return; }
    const now = new Date().toISOString();
    const entries: StudentAttendanceRecord[] = visibleStudents.map(s => {
      const old = records.find(r => r.kind === 'Student' && r.studentId === s.id && r.date === date && r.attendanceType === kind && r.subject === (kind === 'Subject-wise' ? subject : ''));
      return {
        id: old?.id || makeId(), kind: 'Student', studentId: s.id, studentName: s.name, roll: s.roll,
        className: s.className, section: s.section, date, attendanceType: kind,
        subject: kind === 'Subject-wise' ? subject : '', teacher: teacher.trim(), status: marks[s.id],
        source, createdAt: old?.createdAt || now, updatedAt: now,
      };
    });
    attendanceService.saveStudentRecords(entries);
    refresh();
    notify('Student attendance saved successfully.');
  };

  const saveStaffAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    const employee = employees.find(x => x.id === staffId);
    if (!employee || !staffDate) { notify('Select an employee and attendance date.'); return; }
    if (staffStatus !== 'Absent' && checkIn && checkOut && checkOut < checkIn) { notify('Check-out time cannot be earlier than check-in time.'); return; }
    const old = records.find(r => r.kind === 'Staff' && r.employeeId === employee.id && r.date === staffDate);
    const now = new Date().toISOString();
    const entry: StaffAttendanceRecord = {
      id: old?.id || makeId(), kind: 'Staff', employeeId: employee.id, employeeName: employee.name,
      department: employee.department, designation: employee.designation, date: staffDate,
      checkIn: staffStatus === 'Absent' ? '-' : checkIn, checkOut: staffStatus === 'Absent' ? '-' : checkOut,
      status: staffStatus, source: staffSource, createdAt: old?.createdAt || now, updatedAt: now,
    };
    attendanceService.saveStaffRecord(entry); refresh(); notify('Staff attendance saved successfully.');
  };

  const filteredRecords = records.filter(r => {
    const search = recordSearch.toLowerCase();
    const name = r.kind === 'Student' ? `${r.studentName} ${r.roll} ${r.className}` : `${r.employeeName} ${r.department} ${r.designation}`;
    return (!search || name.toLowerCase().includes(search)) &&
      (recordKind === 'All' || r.kind === recordKind) && (!recordDate || r.date === recordDate);
  }).sort((a,b) => b.date.localeCompare(a.date));

  const reportRows = records.filter(r => r.date.startsWith(reportMonth) && (reportType === 'Students' ? r.kind === 'Student' : r.kind === 'Staff'));
  const downloadCsv = (rows: AttendanceRecord[], filename: string) => {
    const data = rows.map(r => r.kind === 'Student'
      ? [r.date, 'Student', r.studentName, r.roll, r.className, r.attendanceType, r.subject, r.status, r.source]
      : [r.date, 'Staff', r.employeeName, r.department, r.designation, r.checkIn, r.checkOut, r.status, r.source]);
    const csv = [['Date','Type','Name','Reference / Department','Class / Designation','Attendance Type / Check-in','Subject / Check-out','Status','Source'], ...data]
      .map(row => row.map(v => `"${String(v ?? '').replaceAll('"','""')}"`).join(',')).join('\\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
  };
  const saveDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deviceForm.name.trim() || !deviceForm.code.trim()) { notify('Device name and ID are required.'); return; }
    if (devices.some(d => d.code.toLowerCase() === deviceForm.code.trim().toLowerCase())) { notify('A device with this ID already exists.'); return; }
    attendanceService.saveDevice({ id: makeId(), ...deviceForm, name: deviceForm.name.trim(), code: deviceForm.code.trim(), location: deviceForm.location.trim(), status: 'Not Connected' });
    setDeviceForm({ name: '', code: '', type: 'Biometric', location: '' }); refresh(); notify('Device details saved. Hardware connection still requires device integration.');
  };

  const heading = (title: string, description: string) => <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-slate-800">{title}</h1><p className="mt-1 text-sm text-slate-500">{description}</p></div>;
  const stat = (title: string, value: string | number, Icon: React.ElementType, tone: string) => <div className={`${card} p-5`}><div className="flex items-center justify-between"><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}><Icon size={19}/></div><span className="text-2xl font-bold text-slate-800">{value}</span></div><p className="mt-3 text-sm font-medium text-slate-500">{title}</p></div>;
  const badge = (value: string) => <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyle(value)}`}>{value}</span>;

  return <div className="space-y-6">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600"><CalendarDays size={14}/> VLearnings / Attendance</div><h1 className="mt-2 text-2xl font-bold text-slate-800">Attendance Management</h1><p className="mt-1 text-sm text-slate-500">Manage student and staff attendance records.</p></div>
      <button className={secondary} onClick={refresh}><RefreshCw size={16}/> Refresh records</button>
    </div>
    <div className="flex gap-2 overflow-x-auto border-b border-slate-200 pb-2">
      {sections.map(({name,icon:Icon}) => <button key={name} onClick={()=>setSection(name)} className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold ${section===name?'bg-indigo-50 text-indigo-700':'text-slate-500 hover:bg-slate-100'}`}><Icon size={16}/>{name}</button>)}
    </div>
    {message && <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-800">{message}</div>}

    {section === 'Overview' && <>
      {heading('Attendance Overview', 'Today’s student and staff attendance summary.')}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stat('Total Students',String(totalStudents),Users,'bg-indigo-50 text-indigo-700')}
        {stat('Students Present',count(todayStudentRecords,'Present'),UserCheck,'bg-emerald-50 text-emerald-700')}
        {stat('Students Absent',count(todayStudentRecords,'Absent'),UserX,'bg-rose-50 text-rose-700')}
        {stat('Students Late',count(todayStudentRecords,'Late'),Clock3,'bg-amber-50 text-amber-700')}
        {stat('Student Attendance Rate',rate(count(todayStudentRecords,'Present'),todayStudentRecords.length),Percent,'bg-sky-50 text-sky-700')}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className={`${card} p-5`}><h2 className="font-bold text-slate-800">Staff Attendance Today</h2><p className="mt-1 text-xs text-slate-500">Based on saved staff attendance records</p><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4"><div><p className="text-2xl font-bold text-slate-800">{totalStaff}</p><p className="text-xs text-slate-500">Active Staff</p></div><div><p className="text-2xl font-bold text-emerald-700">{count(todayStaffRecords,'Present')}</p><p className="text-xs text-slate-500">Present</p></div><div><p className="text-2xl font-bold text-rose-700">{count(todayStaffRecords,'Absent')}</p><p className="text-xs text-slate-500">Absent</p></div><div><p className="text-2xl font-bold text-amber-700">{count(todayStaffRecords,'Late')}</p><p className="text-xs text-slate-500">Late</p></div></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500" style={{width:rate(count(todayStaffRecords,'Present'),totalStaff)}}/></div><p className="mt-2 text-xs text-slate-500">Staff attendance rate: {rate(count(todayStaffRecords,'Present'),todayStaffRecords.length)}</p></div>
        <div className={`${card} p-5`}><div className="flex items-center justify-between"><h2 className="font-bold text-slate-800">Class-wise Student Attendance</h2><button className="text-xs font-semibold text-indigo-700" onClick={()=>setSection('Reports')}>View reports</button></div><div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-xs text-slate-500"><tr><th className="py-2">Class</th><th>Total</th><th>Present</th><th>Absent</th><th>Late</th></tr></thead><tbody>{classOptions.map(c=>{const rows=todayStudentRecords.filter(r=>r.className===c);return <tr key={c} className="border-t border-slate-100"><td className="py-3 font-medium text-slate-700">{c}</td><td>{students.filter(s=>s.className===c).length}</td><td className="text-emerald-700">{count(rows,'Present')}</td><td className="text-rose-700">{count(rows,'Absent')}</td><td className="text-amber-700">{count(rows,'Late')}</td></tr>})}</tbody></table></div>{!todayStudentRecords.length&&<p className="mt-3 text-xs text-slate-400">No student attendance has been submitted for today.</p>}</div>
      </div>
      <div className={`${card} p-5`}><div className="flex items-center gap-2"><Bell size={17} className="text-indigo-600"/><h2 className="font-bold text-slate-800">Parent Absence Notifications</h2></div><p className="mt-1 text-xs text-slate-500">Absence alerts are prepared after attendance is saved. SMS/email delivery requires a configured provider.</p><div className="mt-4 space-y-2">{notifications.slice(-4).reverse().map(n=><div key={n.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-50 px-3 py-3 text-sm"><div><p className="font-semibold text-slate-700">{n.studentName} · {n.guardianName}</p><p className="text-xs text-slate-500">Absent on {n.date} · {n.channel}</p></div><span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">Provider required</span></div>)}{!notifications.length&&<p className="text-sm text-slate-400">No absence alerts recorded.</p>}</div></div>
    </>}

    {section === 'Student Attendance' && <>
      {heading('Student Attendance', 'Record daily or subject-wise attendance for a class and date.')}
      <div className={`${card} p-5`}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <label><span className={label}>Attendance Date</span><input type="date" className={input} value={date} onChange={e=>setDate(e.target.value)}/></label>
          <label><span className={label}>Class</span><select className={input} value={className} onChange={e=>setClassName(e.target.value)}><option>All</option>{classOptions.map(c=><option key={c}>{c}</option>)}</select></label>
          <label><span className={label}>Attendance Type</span><select className={input} value={kind} onChange={e=>setKind(e.target.value as 'Daily'|'Subject-wise')}><option value="Daily">Daily Attendance</option><option value="Subject-wise">Subject-wise Attendance</option></select></label>
          {kind==='Subject-wise'&&<label><span className={label}>Subject</span><select className={input} value={subject} onChange={e=>setSubject(e.target.value)}>{['English','Mathematics','Science','Urdu','Computer'].map(x=><option key={x}>{x}</option>)}</select></label>}
          <label><span className={label}>Teacher</span><input required className={input} value={teacher} onChange={e=>setTeacher(e.target.value)} placeholder="Teacher name"/></label>
          <label><span className={label}>Attendance Source</span><select className={input} value={source} onChange={e=>setSource(e.target.value as AttendanceSource)}><option>Manual</option><option>Biometric</option><option>RFID</option></select></label>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-bold text-slate-800">Student List <span className="text-sm font-normal text-slate-500">({visibleStudents.length})</span></h2><p className="mt-1 text-xs text-slate-500">Existing saved attendance is loaded when date and type are selected.</p></div><div className="flex flex-wrap gap-2"><button className={secondary} onClick={()=>setMarks(Object.fromEntries(visibleStudents.map(s=>[s.id,'Present'])) as Record<string, AttendanceStatus>)}>Mark All Present</button><button className={secondary} onClick={()=>setMarks({})}>Clear</button></div></div>
        <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Student</th><th className="px-4 py-3">Roll No.</th><th className="px-4 py-3">Class / Section</th><th className="px-4 py-3">Attendance</th></tr></thead><tbody>{visibleStudents.map(s=><tr key={s.id} className="border-b border-slate-100"><td className="px-4 py-3 font-semibold text-slate-700">{s.name}</td><td className="px-4 py-3 text-slate-500">{s.roll}</td><td className="px-4 py-3 text-slate-500">{s.className} / {s.section}</td><td className="px-4 py-3"><div className="flex gap-2">{(['Present','Absent','Late'] as AttendanceStatus[]).map(v=><button key={v} onClick={()=>setMarks(p=>({...p,[s.id]:v}))} className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${marks[s.id]===v?statusStyle(v):'border-slate-200 text-slate-500 hover:bg-slate-50'}`}>{v}</button>)}</div></td></tr>)}</tbody></table></div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-slate-500">{Object.keys(marks).filter(k=>visibleStudents.some(s=>s.id===k)).length} of {visibleStudents.length} marked</p><button className={primary} onClick={saveStudentAttendance} disabled={!visibleStudents.length}><Save size={16}/> Save Attendance</button></div>
      </div>
    </>}

    {section === 'Staff Attendance' && <>
      {heading('Staff Attendance', 'Record employee attendance and check-in/check-out times.')}
      {!employees.length&&<div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">No active employees were found. Add employees in HR & Payroll first.</div>}
      <form onSubmit={saveStaffAttendance} className={`${card} p-5`}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <label><span className={label}>Employee</span><select required className={input} value={staffId} onChange={e=>setStaffId(e.target.value)}><option value="">Select employee</option>{employees.map(e=><option key={e.id} value={e.id}>{e.name} · {e.designation}</option>)}</select></label>
          <label><span className={label}>Attendance Date</span><input required type="date" className={input} value={staffDate} onChange={e=>setStaffDate(e.target.value)}/></label>
          <label><span className={label}>Status</span><select className={input} value={staffStatus} onChange={e=>setStaffStatus(e.target.value as AttendanceStatus)}><option>Present</option><option>Late</option><option>Absent</option></select></label>
          <label><span className={label}>Check-in</span><input type="time" className={input} value={checkIn} disabled={staffStatus==='Absent'} onChange={e=>setCheckIn(e.target.value)}/></label>
          <label><span className={label}>Check-out</span><input type="time" className={input} value={checkOut} disabled={staffStatus==='Absent'} onChange={e=>setCheckOut(e.target.value)}/></label>
          <label><span className={label}>Attendance Source</span><select className={input} value={staffSource} onChange={e=>setStaffSource(e.target.value as AttendanceSource)}><option>Manual</option><option>Biometric</option><option>RFID</option></select></label>
        </div>
        <div className="mt-5 flex justify-end"><button className={primary} type="submit" disabled={!employees.length}><Save size={16}/> Save Staff Attendance</button></div>
      </form>
      <div className={`${card} mt-5 p-5`}><h2 className="font-bold text-slate-800">Recent Staff Attendance</h2><div className="mt-3 overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="text-xs text-slate-500"><tr><th className="py-3">Employee</th><th>Date</th><th>Department</th><th>Check-in</th><th>Check-out</th><th>Status</th></tr></thead><tbody>{records.filter((r):r is StaffAttendanceRecord=>r.kind==='Staff').sort((a,b)=>b.date.localeCompare(a.date)).slice(0,8).map(r=><tr key={r.id} className="border-t border-slate-100"><td className="py-3 font-medium">{r.employeeName}</td><td>{r.date}</td><td>{r.department}</td><td>{r.checkIn}</td><td>{r.checkOut}</td><td>{badge(r.status)}</td></tr>)}</tbody></table></div></div>
    </>}

    {section === 'Attendance Records' && <>
      {heading('Attendance Records', 'Search and review saved student and staff attendance.')}
      <div className={`${card} p-5`}>
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3"><label><span className={label}>Search</span><div className="relative"><Search size={16} className="absolute left-3 top-3 text-slate-400"/><input className={`${input} pl-9`} placeholder="Name, roll no, class or department" value={recordSearch} onChange={e=>setRecordSearch(e.target.value)}/></div></label><label><span className={label}>Record Type</span><select className={input} value={recordKind} onChange={e=>setRecordKind(e.target.value)}><option>All</option><option>Student</option><option>Staff</option></select></label><label><span className={label}>Date</span><input type="date" className={input} value={recordDate} onChange={e=>setRecordDate(e.target.value)}/></label></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-3 py-3">Date</th><th className="px-3 py-3">Type</th><th className="px-3 py-3">Name</th><th className="px-3 py-3">Class / Department</th><th className="px-3 py-3">Details</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">Source</th><th className="px-3 py-3">Action</th></tr></thead><tbody>{filteredRecords.map(r=><tr key={r.id} className="border-b border-slate-100"><td className="px-3 py-3">{r.date}</td><td className="px-3 py-3">{r.kind}</td><td className="px-3 py-3 font-semibold">{r.kind==='Student'?r.studentName:r.employeeName}</td><td className="px-3 py-3">{r.kind==='Student'?r.className:r.department}</td><td className="px-3 py-3">{r.kind==='Student'?(r.attendanceType==='Daily'?'Daily':r.subject):`${r.checkIn} - ${r.checkOut}`}</td><td className="px-3 py-3">{badge(r.status)}</td><td className="px-3 py-3">{r.source}</td><td className="px-3 py-3"><button aria-label="Delete attendance record" className="rounded-lg p-2 text-rose-600 hover:bg-rose-50" onClick={()=>{if(confirm('Delete this attendance record?')){attendanceService.deleteRecord(r.id);refresh();}}}><Trash2 size={15}/></button></td></tr>)}</tbody></table>{!filteredRecords.length&&<p className="py-8 text-center text-sm text-slate-400">No attendance records found.</p>}</div>
        <div className="mt-4 flex justify-end"><button className={secondary} onClick={()=>downloadCsv(filteredRecords,'attendance-records.csv')} disabled={!filteredRecords.length}><Download size={16}/> Export CSV</button></div>
      </div>
    </>}

    {section === 'Biometric / RFID' && <>
      {heading('Biometric / RFID Devices', 'Register compatible devices for future attendance synchronization.')}
      <div className="mb-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><AlertCircle size={18} className="mt-0.5 shrink-0"/><p>Device registration is available, but live biometric/RFID communication is not configured in this frontend. A compatible device API, SDK or synchronization service is required before devices can send attendance automatically.</p></div>
      <form onSubmit={saveDevice} className={`${card} p-5`}><h2 className="font-bold text-slate-800">Register Device</h2><div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"><label><span className={label}>Device Name</span><input className={input} value={deviceForm.name} onChange={e=>setDeviceForm(p=>({...p,name:e.target.value}))} placeholder="Main Gate Device"/></label><label><span className={label}>Device ID</span><input className={input} value={deviceForm.code} onChange={e=>setDeviceForm(p=>({...p,code:e.target.value}))} placeholder="DEV-001"/></label><label><span className={label}>Device Type</span><select className={input} value={deviceForm.type} onChange={e=>setDeviceForm(p=>({...p,type:e.target.value as 'Biometric'|'RFID'}))}><option>Biometric</option><option>RFID</option></select></label><label><span className={label}>Location</span><input className={input} value={deviceForm.location} onChange={e=>setDeviceForm(p=>({...p,location:e.target.value}))} placeholder="Main entrance"/></label></div><div className="mt-4 flex justify-end"><button className={primary} type="submit"><Plus size={16}/> Save Device</button></div></form>
      <div className={`${card} mt-5 p-5`}><h2 className="font-bold text-slate-800">Registered Devices</h2><div className="mt-3 overflow-x-auto"><table className="w-full min-w-[600px] text-left text-sm"><thead className="text-xs text-slate-500"><tr><th className="py-3">Device</th><th>Device ID</th><th>Type</th><th>Location</th><th>Connection</th><th>Action</th></tr></thead><tbody>{devices.map(d=><tr key={d.id} className="border-t border-slate-100"><td className="py-3 font-semibold">{d.name}</td><td>{d.code}</td><td>{d.type}</td><td>{d.location||'—'}</td><td><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{d.status}</span></td><td><button className="rounded-lg p-2 text-rose-600 hover:bg-rose-50" onClick={()=>{if(confirm('Remove this device?')){attendanceService.deleteDevice(d.id);refresh();}}}><Trash2 size={15}/></button></td></tr>)}</tbody></table>{!devices.length&&<p className="py-8 text-center text-sm text-slate-400">No devices registered.</p>}</div></div>
    </>}

    {section === 'Reports' && <>
      {heading('Attendance Reports', 'Generate daily, monthly and class-wise attendance summaries.')}
      <div className={`${card} p-5`}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3"><label><span className={label}>Report Month</span><input type="month" className={input} value={reportMonth} onChange={e=>setReportMonth(e.target.value)}/></label><label><span className={label}>Report Date</span><input type="date" className={input} value={reportDate} onChange={e=>setReportDate(e.target.value)}/></label><label><span className={label}>Attendance Group</span><select className={input} value={reportType} onChange={e=>setReportType(e.target.value as 'Students'|'Staff')}><option>Students</option><option>Staff</option></select></label><div className="flex items-end"><button className={secondary} onClick={()=>downloadCsv(reportRows,`attendance-${reportType.toLowerCase()}-${reportMonth}.csv`)} disabled={!reportRows.length}><Download size={16}/> Export CSV</button></div></div>
        {reportType==='Students'?<><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-3 py-3">Class</th><th className="px-3 py-3">Student</th><th className="px-3 py-3">Present</th><th className="px-3 py-3">Absent</th><th className="px-3 py-3">Late</th><th className="px-3 py-3">Attendance Rate</th></tr></thead><tbody>{students.map(s=>{const rows=reportRows.filter((r):r is StudentAttendanceRecord=>r.kind==='Student'&&r.studentId===s.id&&r.attendanceType==='Daily');const p=count(rows,'Present'),a=count(rows,'Absent'),l=count(rows,'Late');return <tr key={s.id} className="border-b border-slate-100"><td className="px-3 py-3">{s.className}</td><td className="px-3 py-3 font-semibold">{s.name}</td><td className="px-3 py-3 text-emerald-700">{p}</td><td className="px-3 py-3 text-rose-700">{a}</td><td className="px-3 py-3 text-amber-700">{l}</td><td className="px-3 py-3">{rate(p,rows.length)}</td></tr>})}</tbody></table></div><div className="mt-6"><h3 className="font-bold text-slate-800">Class-wise Summary</h3><div className="mt-2 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-xs text-slate-500"><tr><th className="py-2">Class</th><th>Present</th><th>Absent</th><th>Late</th><th>Total Records</th></tr></thead><tbody>{classOptions.map(c=>{const rows=reportRows.filter((r):r is StudentAttendanceRecord=>r.kind==='Student'&&r.className===c&&r.attendanceType==='Daily');return <tr key={c} className="border-t border-slate-100"><td className="py-3 font-medium">{c}</td><td>{count(rows,'Present')}</td><td>{count(rows,'Absent')}</td><td>{count(rows,'Late')}</td><td>{rows.length}</td></tr>})}</tbody></table></div></div></>:<div className="mt-5 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-xs text-slate-500"><tr><th className="py-3">Employee</th><th>Department</th><th>Present</th><th>Absent</th><th>Late</th><th>Attendance Rate</th></tr></thead><tbody>{employees.map(emp=>{const rows=reportRows.filter((r):r is StaffAttendanceRecord=>r.kind==='Staff'&&r.employeeId===emp.id);const p=count(rows,'Present');return <tr key={emp.id} className="border-t border-slate-100"><td className="py-3 font-medium">{emp.name}</td><td>{emp.department}</td><td>{p}</td><td>{count(rows,'Absent')}</td><td>{count(rows,'Late')}</td><td>{rate(p,rows.length)}</td></tr>})}</tbody></table></div>}
        <div className="mt-7">
          <h3 className="font-bold text-slate-800">Daily Attendance Summary · {reportDate}</h3>
          {reportType==='Students' ? <div className="mt-2 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-xs text-slate-500"><tr><th className="py-2">Class</th><th>Total Students</th><th>Present</th><th>Absent</th><th>Late</th></tr></thead><tbody>{classOptions.map(c=>{const rows=records.filter((r):r is StudentAttendanceRecord=>r.kind==='Student'&&r.date===reportDate&&r.attendanceType==='Daily'&&r.className===c);return <tr key={c} className="border-t border-slate-100"><td className="py-3 font-medium">{c}</td><td>{students.filter(s=>s.className===c).length}</td><td>{count(rows,'Present')}</td><td>{count(rows,'Absent')}</td><td>{count(rows,'Late')}</td></tr>})}</tbody></table></div> : <div className="mt-2 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-xs text-slate-500"><tr><th className="py-2">Employee</th><th>Department</th><th>Status</th><th>Check-in</th><th>Check-out</th></tr></thead><tbody>{records.filter((r):r is StaffAttendanceRecord=>r.kind==='Staff'&&r.date===reportDate).map(r=><tr key={r.id} className="border-t border-slate-100"><td className="py-3 font-medium">{r.employeeName}</td><td>{r.department}</td><td>{r.status}</td><td>{r.checkIn}</td><td>{r.checkOut}</td></tr>)}</tbody></table></div>}
        </div>
        <p className="mt-4 text-xs text-slate-500">Attendance rates are calculated from saved attendance entries in the selected month. School holidays and eligible school days are not inferred by this frontend.</p>
      </div>
    </>}
  </div>;
}
