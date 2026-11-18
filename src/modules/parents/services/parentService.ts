import type { ParentData, ParentRecord } from '../types/parentTypes';

const STORAGE_KEY = 'vlearnings.parents.module.v1';

const demoData: ParentData = {
  parents: [
    { id:'p1', parentCode:'PAR-2026-0001', firstName:'Ahmed', lastName:'Khan', relationship:'Father', gender:'Male', dateOfBirth:'1982-04-12', nationalId:'35202-1234567-1', primaryPhone:'0300-1234567', secondaryPhone:'', email:'ahmed.khan@example.com', whatsappNumber:'0300-1234567', preferredContactMethod:'WhatsApp', address:'Model Town, Lahore', occupation:'Business', status:'Active', portalStatus:'Active', lastLoginAt:'2026-11-17T09:30:00', createdAt:'2026-10-10T09:00:00', updatedAt:'2026-11-12T10:00:00' },
    { id:'p2', parentCode:'PAR-2026-0002', firstName:'Ali', lastName:'Raza', relationship:'Father', gender:'Male', dateOfBirth:'1984-08-20', nationalId:'35202-7654321-2', primaryPhone:'0301-7654321', secondaryPhone:'', email:'ali.raza@example.com', whatsappNumber:'', preferredContactMethod:'Phone', address:'Cantt, Lahore', occupation:'Teacher', status:'Active', portalStatus:'Invitation Pending', invitationSentAt:'2026-11-15T11:00:00', createdAt:'2026-10-12T09:00:00', updatedAt:'2026-11-15T11:00:00' },
    { id:'p3', parentCode:'PAR-2026-0003', firstName:'Noor', lastName:'Ahmed', relationship:'Father', gender:'Male', dateOfBirth:'1979-02-14', nationalId:'36302-1122334-5', primaryPhone:'0321-9876543', secondaryPhone:'', email:'noor.ahmed@example.com', whatsappNumber:'', preferredContactMethod:'SMS', address:'Bosan Road, Lahore', occupation:'Engineer', status:'Active', portalStatus:'Not Created', createdAt:'2026-10-14T09:00:00', updatedAt:'2026-10-14T09:00:00' },
    { id:'p4', parentCode:'PAR-2026-0004', firstName:'Raza', lastName:'Ahmed', relationship:'Father', gender:'Male', dateOfBirth:'1980-06-03', nationalId:'35202-9988776-4', primaryPhone:'0333-1112223', secondaryPhone:'', email:'raza.ahmed@example.com', whatsappNumber:'', preferredContactMethod:'Phone', address:'Johar Town, Lahore', occupation:'Accountant', status:'Inactive', portalStatus:'Suspended', createdAt:'2026-10-18T09:00:00', updatedAt:'2026-11-01T09:00:00' },
    { id:'p5', parentCode:'PAR-2026-0005', firstName:'Iqbal', lastName:'Hussain', relationship:'Father', gender:'Male', dateOfBirth:'1988-01-09', nationalId:'36302-4455667-8', primaryPhone:'0345-5556667', secondaryPhone:'', email:'iqbal.hussain@example.com', whatsappNumber:'', preferredContactMethod:'Email', address:'DHA, Lahore', occupation:'Doctor', status:'Active', portalStatus:'Not Created', createdAt:'2026-11-02T09:00:00', updatedAt:'2026-11-02T09:00:00' },
  ],
  relationships: [
    { id:'r1', parentId:'p1', studentId:'1', studentName:'Ayesha Khan', rollNumber:'VL-101', className:'Class 10-A', relationship:'Father', isPrimaryContact:true, isEmergencyContact:true, portalAccessEnabled:true, status:'Active' },
    { id:'r2', parentId:'p2', studentId:'2', studentName:'Muhammad Ali', rollNumber:'VL-102', className:'Class 9-B', relationship:'Father', isPrimaryContact:true, isEmergencyContact:true, portalAccessEnabled:true, status:'Active' },
    { id:'r3', parentId:'p3', studentId:'3', studentName:'Fatima Noor', rollNumber:'VL-103', className:'Class 10-A', relationship:'Father', isPrimaryContact:true, isEmergencyContact:true, portalAccessEnabled:true, status:'Active' },
    { id:'r4', parentId:'p4', studentId:'4', studentName:'Hassan Raza', rollNumber:'VL-104', className:'Class 8-C', relationship:'Father', isPrimaryContact:true, isEmergencyContact:false, portalAccessEnabled:false, status:'Active' },
    { id:'r5', parentId:'p5', studentId:'5', studentName:'Sana Iqbal', rollNumber:'VL-105', className:'Class 9-B', relationship:'Father', isPrimaryContact:true, isEmergencyContact:true, portalAccessEnabled:false, status:'Active' },
  ],
  communications: [
    { id:'c1', parentId:'p1', studentId:'1', subject:'Monthly attendance update', message:'Attendance summary for November is available.', channel:'In-app', sender:'School Administration', sentAt:'2026-11-16T10:30:00', deliveryStatus:'Delivered' },
    { id:'c2', parentId:'p3', studentId:'3', subject:'Parent-teacher meeting', message:'Please confirm your availability for the scheduled meeting.', channel:'SMS', sender:'School Administration', sentAt:'2026-11-15T12:00:00', deliveryStatus:'Sent' },
  ],
  documents: [],
};

function readData(): ParentData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) { localStorage.setItem(STORAGE_KEY, JSON.stringify(demoData)); return demoData; }
    const parsed = JSON.parse(raw) as ParentData;
    return { ...demoData, ...parsed };
  } catch { return demoData; }
}
function writeData(data: ParentData): ParentData {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}
export const parentService = {
  getData: readData,
  saveData: writeData,
  nextParentCode(parents: ParentRecord[]) {
    const year = new Date().getFullYear();
    const highest = parents.reduce((max, p) => Math.max(max, Number(p.parentCode.split('-').at(-1)) || 0), 0);
    return `PAR-${year}-${String(highest + 1).padStart(4, '0')}`;
  },
};
