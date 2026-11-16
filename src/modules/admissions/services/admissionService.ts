import type { AdmissionApplication, AdmissionChallan } from '../types/admissionTypes';

const APPLICATIONS_KEY = 'vlearnings.admissions.applications.v1';
const CHALLANS_KEY = 'vlearnings.admissions.challans.v1';
const defaultDocuments = () => [
  { id: 'transcript', name: 'Previous Academic Transcript', status: 'Pending' as const },
  { id: 'birth', name: 'Birth Certificate', status: 'Pending' as const },
  { id: 'guardian', name: 'Guardian ID Proof', status: 'Pending' as const },
  { id: 'transfer', name: 'Transfer Certificate', status: 'Pending' as const },
];
const seed: AdmissionApplication[] = [
  { id:'ADM-2026-0001', applicantName:'Ayesha Khan', dob:'2012-05-14', gender:'Female', classApplied:'Grade 9', guardianName:'Ahmed Khan', relationship:'Father', phone:'+92 300 1234567', email:'ahmed@example.com', address:'Lahore, Pakistan', applicationDate:'2026-11-02', type:'Merit Scholarship', status:'Under Review', documents:defaultDocuments().map(d=>({...d,status:'Verified' as const})), testRequired:true, testDate:'2026-11-20', testScore:92, testTotal:100, interviewNotes:'Strong academic profile and communication skills.', previousSchool:'City Public School' },
  { id:'ADM-2026-0002', applicantName:'Hamza Ali', dob:'2014-09-02', gender:'Male', classApplied:'Grade 7', guardianName:'Tariq Ali', relationship:'Father', phone:'+92 321 7654321', email:'tariq@example.com', address:'Multan, Pakistan', applicationDate:'2026-11-04', type:'Regular Intake', status:'Test Scheduled', documents:defaultDocuments().map(d=>({...d,status:'Verified' as const})), testRequired:true, testDate:'2026-11-22', previousSchool:'The Learning School' },
  { id:'ADM-2026-0003', applicantName:'Zara Ahmed', dob:'2015-01-18', gender:'Female', classApplied:'Grade 6', guardianName:'Sana Ahmed', relationship:'Mother', phone:'+92 333 5551212', email:'sana@example.com', address:'Multan, Pakistan', applicationDate:'2026-11-06', type:'Sibling Quota', status:'Applied', documents:defaultDocuments(), testRequired:false, previousSchool:'Beacon Academy' },
  { id:'ADM-2026-0004', applicantName:'Usman Raza', dob:'2011-03-23', gender:'Male', classApplied:'Grade 10', guardianName:'Raza Hussain', relationship:'Father', phone:'+92 301 9988776', email:'raza@example.com', address:'Lahore, Pakistan', applicationDate:'2026-10-28', type:'Transfer', status:'Approved', documents:defaultDocuments().map(d=>({...d,status:'Verified' as const})), testRequired:false, studentId:'STU-2026-0001' },
  { id:'ADM-2026-0005', applicantName:'Maham Siddiqui', dob:'2021-08-11', gender:'Female', classApplied:'Playgroup', guardianName:'Bilal Siddiqui', relationship:'Father', phone:'+92 300 4441122', email:'bilal.siddiqui@example.com', address:'Multan, Pakistan', applicationDate:'2026-11-08', type:'Regular Intake', status:'Applied', documents:defaultDocuments(), testRequired:false, previousSchool:'', notes:'Early-years admission enquiry.' },
  { id:'ADM-2026-0006', applicantName:'Rayyan Malik', dob:'2019-02-16', gender:'Male', classApplied:'Grade 1', guardianName:'Hira Malik', relationship:'Mother', phone:'+92 321 4400789', email:'hira.malik@example.com', address:'Multan, Pakistan', applicationDate:'2026-11-09', type:'Sibling Quota', status:'Under Review', documents:defaultDocuments().map(d=>({...d,status:'Verified' as const})), testRequired:true, testScore:78, testTotal:100, testDate:'2026-11-12', previousSchool:'Little Scholars School' },
  { id:'ADM-2026-0007', applicantName:'Fatima Noor', dob:'2016-06-27', gender:'Female', classApplied:'Grade 5', guardianName:'Omar Noor', relationship:'Father', phone:'+92 333 6012450', email:'omar.noor@example.com', address:'Lahore, Pakistan', applicationDate:'2026-11-10', type:'Merit Scholarship', status:'Test Scheduled', documents:defaultDocuments().map(d=>({...d,status:'Verified' as const})), testRequired:true, testDate:'2026-11-24', previousSchool:'The City School' },
  { id:'ADM-2026-0008', applicantName:'Daniyal Shah', dob:'2013-10-05', gender:'Male', classApplied:'Grade 8', guardianName:'Nadia Shah', relationship:'Mother', phone:'+92 301 8877665', email:'nadia.shah@example.com', address:'Lahore, Pakistan', applicationDate:'2026-11-11', type:'Transfer', status:'Approved', documents:defaultDocuments().map(d=>({...d,status:'Verified' as const})), testRequired:true, testDate:'2026-11-13', testScore:88, testTotal:100, previousSchool:'Beaconhouse School System' },
  { id:'ADM-2026-0009', applicantName:'Eman Qureshi', dob:'2009-04-19', gender:'Female', classApplied:'Grade 12', guardianName:'Farhan Qureshi', relationship:'Father', phone:'+92 322 7733110', email:'farhan.qureshi@example.com', address:'Multan, Pakistan', applicationDate:'2026-11-12', type:'Regular Intake', status:'Enrolled', documents:defaultDocuments().map(d=>({...d,status:'Verified' as const})), testRequired:false, studentId:'STU-2026-0002', previousSchool:'Multan Public School' },
];
const seedChallans: AdmissionChallan[] = [];
function read<T>(key: string, fallback: T): T { try { const raw=localStorage.getItem(key); return raw ? JSON.parse(raw) as T : fallback; } catch { return fallback; } }

// Keep demo records current when a user already has an earlier admissions list saved.
function getApplicationsWithDemoUpdates(): AdmissionApplication[] {
  const stored = read<AdmissionApplication[]>(APPLICATIONS_KEY, []);
  if (!stored.length) { write(APPLICATIONS_KEY, seed); return seed; }
  let changed = false;
  const migrated = stored.map((app) => {
    if (app.guardianName === 'Imran Khan' || app.email === 'imran@example.com') {
      changed = true;
      return { ...app, guardianName: 'Ahmed Khan', email: app.email === 'imran@example.com' ? 'ahmed@example.com' : app.email };
    }
    return app;
  });
  const knownIds = new Set(migrated.map((app) => app.id));
  const additions = seed.filter((app) => !knownIds.has(app.id) && Number(app.id.split('-').at(-1)) >= 5);
  if (additions.length) { migrated.push(...additions); changed = true; }
  if (changed) write(APPLICATIONS_KEY, migrated);
  return migrated;
}
function write<T>(key:string,value:T) { localStorage.setItem(key,JSON.stringify(value)); }
export const admissionService = {
  getApplications: (): AdmissionApplication[] => getApplicationsWithDemoUpdates(),
  saveApplications: (items: AdmissionApplication[]) => write(APPLICATIONS_KEY, items),
  getChallans: (): AdmissionChallan[] => read(CHALLANS_KEY, seedChallans),
  saveChallans: (items: AdmissionChallan[]) => write(CHALLANS_KEY, items),
  nextApplicationId: (items: AdmissionApplication[]) => `ADM-${new Date().getFullYear()}-${String(Math.max(0,...items.map(x=>Number(x.id.split('-').at(-1))||0))+1).padStart(4,'0')}`,
  nextStudentId: (items: AdmissionApplication[]) => `STU-${new Date().getFullYear()}-${String(items.filter(x=>x.studentId).length+1).padStart(4,'0')}`,
};
