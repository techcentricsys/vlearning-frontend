export type AdmissionStatus = 'Applied' | 'Under Review' | 'Test Scheduled' | 'Approved' | 'Rejected' | 'Enrolled';
export type AdmissionType = 'Regular Intake' | 'Transfer' | 'Merit Scholarship' | 'Sibling Quota';
export type DocumentStatus = 'Pending' | 'Verified' | 'Rejected';
export interface AdmissionDocument { id: string; name: string; status: DocumentStatus; note?: string }
export interface AdmissionApplication {
  id: string; applicantName: string; dob: string; gender: string; classApplied: string;
  guardianName: string; relationship: string; phone: string; email: string; address: string;
  applicationDate: string; type: AdmissionType; status: AdmissionStatus;
  documents: AdmissionDocument[]; testRequired: boolean; testDate?: string; testScore?: number;
  testTotal?: number; interviewNotes?: string; previousSchool?: string; notes?: string;
  meritRank?: number; studentId?: string; challanId?: string;
}
export interface AdmissionChallan { id: string; applicationId: string; studentName: string; studentId: string; amount: number; issueDate: string; dueDate: string; status: 'Unpaid' | 'Paid' }
