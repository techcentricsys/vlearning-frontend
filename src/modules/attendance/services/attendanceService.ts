import type { AbsenceNotification, AttendanceDevice, AttendanceEmployee, AttendanceRecord, AttendanceStudent, StaffAttendanceRecord, StudentAttendanceRecord } from '../types/attendanceTypes';
const RECORDS_KEY = 'vlearnings.attendance.records.v1';
const DEVICES_KEY = 'vlearnings.attendance.devices.v1';
const NOTIFICATIONS_KEY = 'vlearnings.attendance.notifications.v1';
const demoStudents: AttendanceStudent[] = [
 { id:'1',name:'Ayesha Khan',roll:'VL-101',className:'Class 10-A',section:'A',guardian:'Ahmed Khan',phone:'0300-1234567' },
 { id:'2',name:'Muhammad Ali',roll:'VL-102',className:'Class 9-B',section:'B',guardian:'Ali Raza',phone:'0301-7654321' },
 { id:'3',name:'Fatima Noor',roll:'VL-103',className:'Class 10-A',section:'A',guardian:'Noor Ahmed',phone:'0321-9876543' },
 { id:'4',name:'Hassan Raza',roll:'VL-104',className:'Class 8-C',section:'C',guardian:'Raza Ahmed',phone:'0333-1112223' },
 { id:'5',name:'Sana Iqbal',roll:'VL-105',className:'Class 9-B',section:'B',guardian:'Iqbal Hussain',phone:'0345-5556667' },
];
function read<T>(key:string,fallback:T):T { try { const value=localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; } }
function write<T>(key:string,value:T):T { localStorage.setItem(key,JSON.stringify(value)); return value; }
export const attendanceService = {
 getStudents():AttendanceStudent[] {
  const rows=read<any[]>('vlearning-students',[]);
  return rows.length ? rows.map(s=>({id:String(s.id),name:s.name,roll:s.roll,className:s.className,section:s.section || String(s.className||'').split('-').at(-1)||'',guardian:s.guardian||'',phone:s.phone||''})) : demoStudents;
 },
 getEmployees():AttendanceEmployee[] {
  const rows=read<any[]>('vlearning-hr-employees',[]);
  const source=rows.length?rows:[
   {id:1,name:'Ahmed Hassan',department:'Academics',designation:'Mathematics Teacher',status:'Active'},
   {id:2,name:'Sara Ahmed',department:'Administration',designation:'Office Administrator',status:'Active'},
   {id:3,name:'Hassan Ali',department:'Academics',designation:'Science Teacher',status:'Active'}
  ];
  return source.filter(e=>e.status!=='Inactive').map(e=>({id:String(e.id),name:e.name,department:e.department||'',designation:e.designation||''}));
 },
 getRecords():AttendanceRecord[] { return read<AttendanceRecord[]>(RECORDS_KEY,[]); },
 saveStudentRecords(records:StudentAttendanceRecord[]):AttendanceRecord[] {
  const current=this.getRecords();
  const next=[...current.filter(r=>r.kind!=='Student'||!records.some(n=>n.studentId===r.studentId&&n.date===r.date&&n.attendanceType===r.attendanceType&&n.subject===r.subject)),...records];
  write(RECORDS_KEY,next); this.createAbsenceNotifications(records); return next;
 },
 saveStaffRecord(record:StaffAttendanceRecord):AttendanceRecord[] {
  return write(RECORDS_KEY,[...this.getRecords().filter(r=>!(r.kind==='Staff'&&r.employeeId===record.employeeId&&r.date===record.date)),record]);
 },
 deleteRecord(id:string):AttendanceRecord[] { return write(RECORDS_KEY,this.getRecords().filter(r=>r.id!==id)); },
 getDevices():AttendanceDevice[] { return read<AttendanceDevice[]>(DEVICES_KEY,[]); },
 saveDevice(device:AttendanceDevice):AttendanceDevice[] { return write(DEVICES_KEY,[...this.getDevices().filter(d=>d.id!==device.id&&d.code!==device.code),device]); },
 deleteDevice(id:string):AttendanceDevice[] { return write(DEVICES_KEY,this.getDevices().filter(d=>d.id!==id)); },
 getNotifications():AbsenceNotification[] { return read<AbsenceNotification[]>(NOTIFICATIONS_KEY,[]); },
 createAbsenceNotifications(records:StudentAttendanceRecord[]) {
  const existing=this.getNotifications();
  const additions:AbsenceNotification[]=records.filter(r=>r.status==='Absent').flatMap(r=>{
   const student=this.getStudents().find(s=>s.id===r.studentId);
   if(!student?.guardian||existing.some(n=>n.attendanceId===r.id)) return [];
   return [{id:crypto.randomUUID(),attendanceId:r.id,studentName:r.studentName,guardianName:student.guardian,date:r.date,channel:'In-app' as const,status:'Integration Required' as const,createdAt:new Date().toISOString()}];
  });
  if(additions.length) write(NOTIFICATIONS_KEY,[...existing,...additions]);
 },
};
