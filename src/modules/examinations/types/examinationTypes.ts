export type ExamStatus = 'Draft' | 'Scheduled' | 'Active' | 'Completed' | 'Cancelled' | 'Archived';
export type WorkflowStatus = 'Draft' | 'Submitted' | 'Under Review' | 'Returned' | 'Approved' | 'Finalized' | 'Published';
export type ExamAttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Medical Leave' | 'Exempted';
export interface ExamSubject { id: string; className: string; section: string; subject: string; maxMarks: number; passingMarks: number; theoryMarks: number; practicalMarks: number; date: string; startTime: string; endTime: string; room: string; invigilator: string; teacher: string; }
export interface Examination { id: string; name: string; academicYear: string; term: string; type: string; startDate: string; endDate: string; instructions: string; status: ExamStatus; subjects: ExamSubject[]; createdAt: string; }
export interface ExamStudent { id: string; name: string; rollNo: string; className: string; section: string; }
export interface MarkRecord { id: string; examId: string; subjectId: string; studentId: string; obtained: number | null; attendance: ExamAttendanceStatus; teacherRemark: string; }
export interface MarksSubmission { id: string; examId: string; subjectId: string; status: WorkflowStatus; submittedAt?: string; reviewComment?: string; approvedBy?: string; }
export interface GradeBand { id: string; min: number; max: number; grade: string; points: number; }
export interface ExamSettings { grading: GradeBand[]; positionScope: 'Class' | 'Section' | 'Both' | 'None'; gpaEnabled: boolean; passAllSubjects: boolean; graceMarks: number; approvalWorkflow: 'Teacher → HOD → Controller' | 'HOD → Controller' | 'Controller only'; }
export interface ExamState { exams: Examination[]; students: ExamStudent[]; marks: MarkRecord[]; submissions: MarksSubmission[]; settings: ExamSettings; publishedAt: Record<string,string>; }
