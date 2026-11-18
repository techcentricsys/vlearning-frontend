import type { ExamSettings, MarkRecord, ExamStudent, ExamSubject } from '../types/examinationTypes';
export interface SubjectResult { obtained: number; max: number; percentage: number; grade: string; points: number; passed: boolean; }
export const getSubjectResult = (mark: MarkRecord | undefined, subject: ExamSubject, settings: ExamSettings): SubjectResult | null => {
  if (!mark || mark.attendance === 'Absent' || mark.attendance === 'Medical Leave' || mark.attendance === 'Exempted' || mark.obtained === null) return null;
  const obtained = Math.min(subject.maxMarks, Math.max(0, mark.obtained + settings.graceMarks));
  const percentage = subject.maxMarks ? obtained / subject.maxMarks * 100 : 0;
  const band = settings.grading.find(g => percentage >= g.min && percentage <= g.max);
  return { obtained, max: subject.maxMarks, percentage, grade: band?.grade ?? '-', points: band?.points ?? 0, passed: obtained >= subject.passingMarks };
};
export const getStudentSummary = (student: ExamStudent, subjects: ExamSubject[], marks: MarkRecord[], examId: string, settings: ExamSettings) => {
  const results = subjects.map(subject => ({ subject, result: getSubjectResult(marks.find(m => m.examId === examId && m.subjectId === subject.id && m.studentId === student.id), subject, settings) }));
  const valid = results.filter(x => x.result);
  const obtained = valid.reduce((sum, x) => sum + (x.result?.obtained ?? 0), 0);
  const max = valid.reduce((sum, x) => sum + (x.result?.max ?? 0), 0);
  const percentage = max ? obtained / max * 100 : 0;
  const grade = settings.grading.find(g => percentage >= g.min && percentage <= g.max)?.grade ?? '-';
  const gpa = valid.length ? valid.reduce((sum, x) => sum + (x.result?.points ?? 0), 0) / valid.length : 0;
  const passed = valid.length > 0 && (settings.passAllSubjects ? valid.every(x => x.result?.passed) : valid.some(x => x.result?.passed));
  return { results, obtained, max, percentage, grade, gpa, passed, completed: valid.length, total: subjects.length };
};
export const assignPositions = <T extends { percentage: number }>(items: T[]): Map<T, number> => {
  const sorted = [...items].sort((a,b) => b.percentage - a.percentage); const positions = new Map<T,number>(); let rank = 0;
  sorted.forEach((item,index) => { if (index === 0 || item.percentage < sorted[index-1].percentage) rank = index + 1; positions.set(item, rank); }); return positions;
};
