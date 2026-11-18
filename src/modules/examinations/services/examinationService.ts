import type { ExamState, Examination, ExamStudent, MarkRecord, MarksSubmission, ExamSettings } from '../types/examinationTypes';

const STORAGE_KEY = 'vlearnings.examinations.v1';
const students: ExamStudent[] = [
  { id: 's1', name: 'Ayesha Khan', rollNo: '001', className: 'Class 9', section: 'A' },
  { id: 's2', name: 'Hamza Ali', rollNo: '002', className: 'Class 9', section: 'A' },
  { id: 's3', name: 'Fatima Noor', rollNo: '003', className: 'Class 9', section: 'A' },
  { id: 's4', name: 'Hassan Raza', rollNo: '004', className: 'Class 9', section: 'A' },
  { id: 's5', name: 'Zainab Ahmed', rollNo: '005', className: 'Class 9', section: 'B' },
  { id: 's6', name: 'Usman Tariq', rollNo: '006', className: 'Class 9', section: 'B' },
  { id: 's7', name: 'Maryam Shah', rollNo: '007', className: 'Class 8', section: 'A' },
  { id: 's8', name: 'Ali Hassan', rollNo: '008', className: 'Class 8', section: 'A' },
];
const settings: ExamSettings = { grading: [
  { id: 'g1', min: 90, max: 100, grade: 'A+', points: 4 }, { id: 'g2', min: 80, max: 89.99, grade: 'A', points: 3.7 },
  { id: 'g3', min: 70, max: 79.99, grade: 'B', points: 3 }, { id: 'g4', min: 60, max: 69.99, grade: 'C', points: 2 },
  { id: 'g5', min: 50, max: 59.99, grade: 'D', points: 1 }, { id: 'g6', min: 0, max: 49.99, grade: 'F', points: 0 },
], positionScope: 'Both', gpaEnabled: true, passAllSubjects: false, graceMarks: 0, approvalWorkflow: 'Teacher → HOD → Controller' };
const demoExam: Examination = { id: 'exam-demo', name: 'Mid-Term Examination 2026', academicYear: '2026–2027', term: 'First Term', type: 'Mid-Term Examination', startDate: '2026-11-24', endDate: '2026-11-29', instructions: 'Bring your school ID card. Reach the examination room 15 minutes before the paper.', status: 'Scheduled', createdAt: new Date().toISOString(), subjects: [
  { id: 'sub-math', className: 'Class 9', section: 'A', subject: 'Mathematics', maxMarks: 100, passingMarks: 40, theoryMarks: 80, practicalMarks: 20, date: '2026-11-24', startTime: '09:00', endTime: '11:00', room: 'Hall 1', invigilator: 'Dr. Sarah Jenkins', teacher: 'Mr. Ahmed' },
  { id: 'sub-eng', className: 'Class 9', section: 'A', subject: 'English', maxMarks: 100, passingMarks: 40, theoryMarks: 100, practicalMarks: 0, date: '2026-11-26', startTime: '09:00', endTime: '11:00', room: 'Hall 1', invigilator: 'Ms. Maria', teacher: 'Ms. Fatima' },
  { id: 'sub-sci', className: 'Class 9', section: 'B', subject: 'Science', maxMarks: 100, passingMarks: 40, theoryMarks: 70, practicalMarks: 30, date: '2026-11-25', startTime: '09:00', endTime: '11:00', room: 'Lab 1', invigilator: 'Mr. Bilal', teacher: 'Mr. Bilal' },
  { id: 'sub-math8', className: 'Class 8', section: 'A', subject: 'Mathematics', maxMarks: 100, passingMarks: 40, theoryMarks: 80, practicalMarks: 20, date: '2026-11-24', startTime: '09:00', endTime: '11:00', room: 'Room 8', invigilator: 'Ms. Maria', teacher: 'Mr. Ahmed' },
] };
const initialMarks: MarkRecord[] = students.flatMap((student, i) => demoExam.subjects.filter(s => s.className === student.className && s.section === student.section).map((subject, j) => ({ id: `${subject.id}-${student.id}`, examId: demoExam.id, subjectId: subject.id, studentId: student.id, obtained: [85,72,91,64,78,69,88,74][(i + j) % 8], attendance: 'Present' as const, teacherRemark: '' })));
const initial: ExamState = { exams: [demoExam], students, marks: initialMarks, submissions: demoExam.subjects.map(s => ({ id: `submission-${s.id}`, examId: demoExam.id, subjectId: s.id, status: 'Draft' })), settings, publishedAt: {} };
export const loadExaminationState = (): ExamState => {
  try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) return JSON.parse(raw) as ExamState; } catch { /* recover with initial demo state */ }
  return initial;
};
export const saveExaminationState = (state: ExamState): void => { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); };
export const createId = (prefix: string): string => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
