export type UserRole =
  | 'admin'
  | 'teacher'
  | 'student'
  | 'parent'
  | 'accountant'
  | 'admission_officer'
  | 'academic_coordinator'
  | 'librarian'
  | 'transport_manager'
  | 'hostel_warden'
  | 'exam_controller';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  avatar: string;
  institution: string;
  campus: string;
  notificationsCount: number;
  phone?: string;
}

export interface MetricCard {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  timeframe: string;
  iconName: string;
  accentColor: string;
  bgColor: string;
  subtext?: string;
  sparkline?: number[];
}

export interface AttendanceRecord {
  grade: string;
  section: string;
  totalStudents: number;
  present: number;
  absent: number;
  percentage: number;
  teacher: string;
  room: string;
}

export interface FeeChallanSummary {
  id: string;
  studentName: string;
  rollNo: string;
  grade: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  method?: 'JazzCash' | 'EasyPaisa' | 'Bank Transfer' | 'Cash';
  paidOn?: string;
  challanBarcode?: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  category: 'Urgent' | 'Academic' | 'Finance' | 'General';
  targetAudience: string;
  date: string;
  author: string;
  read?: boolean;
}

export interface ScheduleEvent {
  id: string;
  time: string;
  subject: string;
  grade: string;
  room: string;
  teacher: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  topic?: string;
}

/* Enrollment & Admission Module Types */
export type ApplicationStatus =
  | 'Under Review'
  | 'Test Scheduled'
  | 'Merit Approved'
  | 'Challan Issued'
  | 'Enrolled'
  | 'Rejected';

export interface ApplicantDocument {
  id: string;
  name: string;
  category: 'B-Form / Birth Cert' | 'Leaving Certificate' | 'Guardian CNIC' | 'Medical Fitness' | 'Character Certificate';
  verified: boolean;
  uploadedAt: string;
  fileSize?: string;
}

export interface TestScoreBreakdown {
  english: number;
  mathematics: number;
  science: number;
  interview: number;
}

export interface FeeBreakdown {
  admissionFee: number;
  tuitionFee: number;
  securityDeposit: number;
  discount: number;
  total: number;
}

export interface ApplicationTimelineEvent {
  title: string;
  date: string;
  status: 'completed' | 'current' | 'upcoming';
  description: string;
}

export interface Applicant {
  id: string;
  studentName: string;
  avatar?: string;
  gender: 'Male' | 'Female';
  dob: string;
  bloodGroup?: string;
  grade: string;
  stream?: string;
  guardianName: string;
  guardianRelation: string;
  guardianOccupation?: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianCnic: string;
  residentialAddress?: string;
  previousSchool: string;
  previousPercentage: number;
  entranceTestScore?: number;
  testStatus: 'Scheduled' | 'Completed' | 'Exempted' | 'Pending';
  testDate?: string;
  testTime?: string;
  testVenue?: string;
  testBreakdown?: TestScoreBreakdown;
  meritRank?: number;
  meritScore?: number;
  quota?: 'Open Merit' | 'Sibling Quota' | 'Sports / Talent' | 'Need-Based Scholarship' | 'Staff Ward';
  interviewerNotes?: string;
  interviewerRecommendation?: 'Strong Admit' | 'Admit' | 'Waitlist' | 'Decline';
  status: ApplicationStatus;
  submittedAt: string;
  documents: ApplicantDocument[];
  feeBreakdown?: FeeBreakdown;
  challanAmount: number;
  challanStatus: 'Paid' | 'Unpaid' | 'Generated';
  paidOn?: string;
  paymentGateway?: 'JazzCash' | 'EasyPaisa' | '1Link Bank' | 'Cash Deposit';
  assignedRollNo?: string;
  assignedSection?: string;
  transportRequired: boolean;
  busStop?: string;
  hostelRequired: boolean;
  roomPreference?: string;
  timeline?: ApplicationTimelineEvent[];
}

export interface SectionCapacity {
  sectionName: string;
  totalSeats: number;
  enrolled: number;
  room: string;
  classTeacher: string;
}

export interface SeatCapacity {
  grade: string;
  totalSeats: number;
  enrolled: number;
  shortlisted: number;
  available: number;
  sections?: SectionCapacity[];
}
