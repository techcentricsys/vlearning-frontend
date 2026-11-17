import { 
  UserProfile, 
  MetricCard, 
  AttendanceRecord, 
  FeeChallanSummary, 
  AnnouncementItem, 
  ScheduleEvent,
  Applicant,
  SeatCapacity
} from '../types';

export const DEMO_USERS: Record<string, UserProfile> = {
  admin: {
    id: 'usr-admin-01',
    name: 'Dr. Sarah Jenkins',
    email: 'admin@vlearnings.com',
    role: 'admin',
    roleLabel: 'Super Admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    institution: 'VLearnings SMS',
    campus: 'v2.4.0 Enterprise',
    notificationsCount: 5,
    phone: '+92 300 8472910'
  },
  admission_officer: {
    id: 'usr-adm-01',
    name: 'Kamran Haider',
    email: 'admissions@vlearnings.com',
    role: 'admission_officer',
    roleLabel: 'Head Admission Officer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    institution: 'VLearnings SMS',
    campus: 'Central Enrollment Desk',
    notificationsCount: 8,
    phone: '+92 321 8847291'
  },
  teacher: {
    id: 'usr-teacher-01',
    name: 'Ayesha Khan, M.Sc',
    email: 'ayesha.khan@vlearnings.com',
    role: 'teacher',
    roleLabel: 'Senior Faculty',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    institution: 'VLearnings SMS',
    campus: 'Main Academic Wing',
    notificationsCount: 3,
    phone: '+92 321 4419082'
  },
  student: {
    id: 'usr-student-01',
    name: 'Aryan Sharma',
    email: 'aryan.s@student.vlearnings.com',
    role: 'student',
    roleLabel: 'Grade 9 - Section A (Roll #14)',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    institution: 'VLearnings SMS',
    campus: 'Main Academic Wing',
    notificationsCount: 2,
    phone: '+92 333 9821450'
  },
  parent: {
    id: 'usr-parent-01',
    name: 'Farooq Ahmed Malik',
    email: 'farooq.malik@vlearnings.com',
    role: 'parent',
    roleLabel: 'Guardian of Aryan (Gr. 9)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    institution: 'VLearnings SMS',
    campus: 'Main Academic Wing',
    notificationsCount: 4,
    phone: '+92 300 5128790'
  },
  accountant: {
    id: 'usr-acct-01',
    name: 'Zubair Raza, CA',
    email: 'accounts@vlearnings.com',
    role: 'accountant',
    roleLabel: 'Cashier Counter 2',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    institution: 'VLearnings SMS',
    campus: 'Bursar & Finance Office',
    notificationsCount: 7,
    phone: '+92 312 6543210'
  }
};

export const MOCK_METRICS: MetricCard[] = [
  {
    id: 'm-students',
    title: 'Total Students',
    value: '1,248',
    change: '↑ 3.2%',
    trend: 'up',
    timeframe: 'vs last term (1,209)',
    iconName: 'GraduationCap',
    accentColor: 'text-[#5B50E8]',
    bgColor: 'bg-[#EEF0FD]',
    subtext: '98.2% Enrolled Active',
    sparkline: [40, 48, 55, 62, 70, 78, 85]
  },
  {
    id: 'm-attendance',
    title: "Today's Attendance",
    value: '94.5%',
    change: '↑ 1.1%',
    trend: 'up',
    timeframe: '1,180 present • 68 absent',
    iconName: 'UserCheck',
    accentColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    subtext: 'Turnstile gates synced',
    sparkline: [92, 94, 91, 96, 95, 96, 94.5]
  },
  {
    id: 'm-fees',
    title: 'Fees Collected (This Term)',
    value: 'Rs. 850,000',
    change: '↑ 12%',
    trend: 'up',
    timeframe: 'Progress to Target (80.2%)',
    iconName: 'Receipt',
    accentColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    subtext: 'JazzCash / Bank transfer',
    sparkline: [60, 68, 74, 80, 84, 88.9]
  },
  {
    id: 'm-outstanding',
    title: 'Outstanding Fees',
    value: 'Rs. 210,000',
    change: '42 invoices',
    trend: 'down',
    timeframe: 'Next cycle: Due Oct 31',
    iconName: 'FileSpreadsheet',
    accentColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
    subtext: 'Due Oct 31',
    sparkline: [98, 98, 99, 97, 98, 97.6]
  }
];

export const MOCK_ATTENDANCE_CLASSES: AttendanceRecord[] = [
  { grade: 'Grade 10', section: 'Section A (Pre-Medical)', totalStudents: 38, present: 36, absent: 2, percentage: 94.7, teacher: 'Mrs. Ayesha Khan', room: 'Hall 302' },
  { grade: 'Grade 10', section: 'Section B (Pre-Engineering)', totalStudents: 36, present: 34, absent: 2, percentage: 94.4, teacher: 'Mr. Salman Qadir', room: 'Room 205' },
  { grade: 'Grade 9', section: 'Section A (General Science)', totalStudents: 42, present: 41, absent: 1, percentage: 97.6, teacher: 'Ms. Fatima Noor', room: 'Room 108' },
  { grade: 'Grade 9', section: 'Section B (Computer Science)', totalStudents: 40, present: 38, absent: 2, percentage: 95.0, teacher: 'Mr. Usman Ali', room: 'CS Lab 2' },
  { grade: 'Grade 8', section: 'Section A (Cambridge Junior)', totalStudents: 35, present: 32, absent: 3, percentage: 91.4, teacher: 'Ms. Hira Bilal', room: 'Room 201' },
  { grade: 'Grade 7', section: 'Section C (Middle Wing)', totalStudents: 34, present: 33, absent: 1, percentage: 97.0, teacher: 'Mr. Kamran Javed', room: 'Room 104' },
];

export const MOCK_RECENT_CHALLANS: FeeChallanSummary[] = [
  { id: 'CH-2026-9041', studentName: 'Hamza Farooq', rollNo: '10-A-24', grade: 'Grade 10', amount: 28500, dueDate: 'Nov 15, 2026', status: 'paid', method: 'JazzCash', paidOn: 'Nov 11, 2026', challanBarcode: '98472910384' },
  { id: 'CH-2026-9042', studentName: 'Zainab Qasim', rollNo: '09-B-12', grade: 'Grade 9', amount: 26000, dueDate: 'Nov 15, 2026', status: 'paid', method: 'EasyPaisa', paidOn: 'Nov 10, 2026', challanBarcode: '98472910385' },
  { id: 'CH-2026-9043', studentName: 'Mustafa Bilal', rollNo: '08-A-07', grade: 'Grade 8', amount: 24500, dueDate: 'Nov 12, 2026', status: 'pending', challanBarcode: '98472910386' },
  { id: 'CH-2026-9044', studentName: 'Anaya Rehman', rollNo: '10-A-03', grade: 'Grade 10', amount: 28500, dueDate: 'Nov 10, 2026', status: 'overdue', challanBarcode: '98472910387' },
  { id: 'CH-2026-9045', studentName: 'Daniyal Tahir', rollNo: '07-C-19', grade: 'Grade 7', amount: 22000, dueDate: 'Nov 15, 2026', status: 'paid', method: 'Bank Transfer', paidOn: 'Nov 09, 2026', challanBarcode: '98472910388' },
];

export const MOCK_WEEKLY_ATTENDANCE = [
  { day: 'Mon', rate: 92.5, present: 1150, absent: 98 },
  { day: 'Tue', rate: 95.2, present: 1188, absent: 60 },
  { day: 'Wed', rate: 94.1, present: 1175, absent: 73 },
  { day: 'Thu', rate: 96.2, present: 1201, absent: 47, isPeak: true },
  { day: 'Fri', rate: 94.5, present: 1180, absent: 68 },
];

export const MOCK_STUDENT_DISTRIBUTION = [
  { tier: 'Primary (Grades 1-5)', count: 420, percentage: 33.6, color: '#4F46E5' },
  { tier: 'Middle (Grades 6-8)', count: 360, percentage: 28.8, color: '#0D9488' },
  { tier: 'High School (9-10)', count: 280, percentage: 22.4, color: '#06B6D4' },
  { tier: 'Senior Secondary (11-12)', count: 188, percentage: 15.2, color: '#C7D2FE' },
];

export const MOCK_UPCOMING_EVENTS = [
  { id: 'ev-1', date: 'OCT 28', badge: 'Exam', title: 'Midterm Exams (Grade 9-12)', time: '09:00 AM - 12:30 PM', venue: 'Central Examination Hall & Block B', color: 'bg-orange-50 text-orange-700' },
  { id: 'ev-2', date: 'NOV 02', badge: 'Meeting', title: 'Parent-Teacher Meeting', time: 'All Day Session', venue: 'Term 1 Performance Review', color: 'bg-indigo-50 text-indigo-700' },
  { id: 'ev-3', date: 'NOV 11', badge: 'Event', title: 'National Education Day', time: '10:00 AM', venue: 'Main Auditorium Assembly & Exhibition', color: 'bg-teal-50 text-teal-700' },
  { id: 'ev-4', date: 'NOV 15', badge: 'Holiday', title: 'Mid-Term School Holiday', time: 'Full Day', venue: 'Institutional Break for All Classes', color: 'bg-blue-50 text-blue-700' },
];

export const MOCK_RECENT_ACTIVITIES = [
  { id: 'act-1', type: 'admission', title: 'Admission Approved', subtitle: 'Aryan Sharma (Grade 9-A)', author: 'Dr. Sarah Jenkins', time: '10:24 AM', status: 'Approved', statusColor: 'bg-emerald-50 text-emerald-700' },
  { id: 'act-2', type: 'payment', title: 'Fee Payment Received', subtitle: 'Inv #4892 (Rs. 24,500) • Online Transfer', author: 'Cashier Counter 2', time: '09:45 AM', status: 'Cleared', statusColor: 'bg-purple-50 text-purple-700' },
  { id: 'act-3', type: 'attendance', title: 'Attendance Submitted', subtitle: 'Grade 10-B (38 Present, 2 Absent)', author: 'Prof. R. Verma', time: '08:15 AM', status: 'Verified', statusColor: 'bg-blue-50 text-blue-700' },
  { id: 'act-4', type: 'exam', title: 'Exam Results Published', subtitle: 'Term 1 Physics Quiz • Grade 11', author: 'HOD Science Dept', time: 'Yesterday', status: 'Published', statusColor: 'bg-amber-50 text-amber-700' },
];

export const MOCK_SCHEDULE: ScheduleEvent[] = [
  { id: 'sch-1', time: '08:30 - 09:15 AM', subject: 'Advanced Calculus & Vectors', grade: 'Grade 10-A', room: 'Hall 302', teacher: 'Mrs. Ayesha Khan', status: 'completed', topic: 'Derivatives of Trigonometric Functions' },
  { id: 'sch-2', time: '09:20 - 10:05 AM', subject: 'Physics (Thermodynamics & Heat)', grade: 'Grade 10-A', room: 'Physics Lab 2', teacher: 'Dr. Tariq Jamil', status: 'ongoing', topic: 'First Law of Thermodynamics experiment' },
  { id: 'sch-3', time: '10:10 - 10:55 AM', subject: 'English Language & Composition', grade: 'Grade 10-A', room: 'Room 204', teacher: 'Ms. Sarah Connor', status: 'upcoming', topic: 'Persuasive Essay Drafting' },
  { id: 'sch-4', time: '11:20 - 12:05 PM', subject: 'Computer Science (Python & Data)', grade: 'Grade 10-A', room: 'CS Lab 1', teacher: 'Engr. Bilal Shah', status: 'upcoming', topic: 'Object-Oriented Programming (Classes)' },
];

/* =========================================================================
   COMPREHENSIVE ADMISSION & ENROLLMENT MODULE ENTERPRISE DATASET
   ========================================================================= */

export const MOCK_ENROLLMENT_METRICS = {
  totalApplications: 486,
  applicationsGrowth: '+18.4% vs last intake',
  underReview: 142,
  testScheduled: 84,
  meritApproved: 215,
  enrolled: 188,
  pendingChallans: 27,
  collectedAdmissionFees: 'Rs. 4,700,000',
  seatsOffered: 260,
  interviewPassRate: '86.4%',
  scholarshipAwarded: 24
};

export const MOCK_SEAT_CAPACITY: SeatCapacity[] = [
  { 
    grade: 'Grade 9 (Science / Matric)', 
    totalSeats: 80, 
    enrolled: 72, 
    shortlisted: 6, 
    available: 2,
    sections: [
      { sectionName: 'Section A (General Science)', totalSeats: 40, enrolled: 38, room: 'Room 108', classTeacher: 'Ms. Fatima Noor' },
      { sectionName: 'Section B (Computer Science)', totalSeats: 40, enrolled: 34, room: 'CS Lab 2', classTeacher: 'Mr. Usman Ali' }
    ]
  },
  { 
    grade: 'Grade 10 (Science / Matric)', 
    totalSeats: 80, 
    enrolled: 76, 
    shortlisted: 4, 
    available: 0,
    sections: [
      { sectionName: 'Section A (Pre-Medical)', totalSeats: 40, enrolled: 39, room: 'Hall 302', classTeacher: 'Mrs. Ayesha Khan' },
      { sectionName: 'Section B (Pre-Engineering)', totalSeats: 40, enrolled: 37, room: 'Room 205', classTeacher: 'Mr. Salman Qadir' }
    ]
  },
  { 
    grade: 'Grade 11 (FSc Pre-Medical & Pre-Eng)', 
    totalSeats: 90, 
    enrolled: 68, 
    shortlisted: 14, 
    available: 8,
    sections: [
      { sectionName: 'Section 11-M (Pre-Medical)', totalSeats: 45, enrolled: 36, room: 'Bio Lab 1', classTeacher: 'Dr. Tariq Jamil' },
      { sectionName: 'Section 11-E (Pre-Engineering)', totalSeats: 45, enrolled: 32, room: 'Physics Lab 3', classTeacher: 'Engr. Bilal Shah' }
    ]
  },
  { 
    grade: 'Grade 8 (Middle Wing)', 
    totalSeats: 120, 
    enrolled: 108, 
    shortlisted: 9, 
    available: 3,
    sections: [
      { sectionName: 'Section A', totalSeats: 40, enrolled: 38, room: 'Room 201', classTeacher: 'Ms. Hira Bilal' },
      { sectionName: 'Section B', totalSeats: 40, enrolled: 36, room: 'Room 202', classTeacher: 'Mr. Kamran Javed' },
      { sectionName: 'Section C', totalSeats: 40, enrolled: 34, room: 'Room 203', classTeacher: 'Mrs. Saima Rauf' }
    ]
  },
  { 
    grade: 'Grade 6 (Cambridge Junior)', 
    totalSeats: 90, 
    enrolled: 82, 
    shortlisted: 6, 
    available: 2,
    sections: [
      { sectionName: 'Section O-1', totalSeats: 45, enrolled: 42, room: 'Room 101', classTeacher: 'Ms. Sarah Connor' },
      { sectionName: 'Section O-2', totalSeats: 45, enrolled: 40, room: 'Room 102', classTeacher: 'Mr. Zafar Iqbal' }
    ]
  },
  { 
    grade: 'Pre-School / KG', 
    totalSeats: 60, 
    enrolled: 52, 
    shortlisted: 8, 
    available: 0,
    sections: [
      { sectionName: 'Montessori Juniors', totalSeats: 30, enrolled: 26, room: 'KG Wing A', classTeacher: 'Ms. Rabia Basri' },
      { sectionName: 'Kindergarten Prep', totalSeats: 30, enrolled: 26, room: 'KG Wing B', classTeacher: 'Ms. Huma Khan' }
    ]
  }
];

export const MOCK_APPLICANTS: Applicant[] = [
  {
    id: 'APP-2026-1042',
    studentName: 'Aryan Sharma',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
    gender: 'Male',
    dob: '2011-04-18',
    bloodGroup: 'B+',
    grade: 'Grade 9 (Science)',
    stream: 'General Science & Computer',
    guardianName: 'Farooq Ahmed Malik',
    guardianRelation: 'Father',
    guardianOccupation: 'Senior Chartered Accountant',
    guardianPhone: '+92 300 5128790',
    guardianEmail: 'farooq.malik@vlearnings.com',
    guardianCnic: '35201-8492019-3',
    residentialAddress: 'House 42, Street 7, Block D, DHA Phase 5, Lahore',
    previousSchool: 'Army Public School & College',
    previousPercentage: 92.4,
    entranceTestScore: 88,
    testStatus: 'Completed',
    testDate: 'Oct 15, 2024',
    testTime: '10:00 AM - 12:00 PM',
    testVenue: 'Examination Hall A (Desk 14)',
    testBreakdown: {
      english: 90,
      mathematics: 88,
      science: 86,
      interview: 92
    },
    meritRank: 4,
    meritScore: 89.8,
    quota: 'Open Merit',
    interviewerNotes: 'Candidate demonstrates strong mathematical aptitude and clear articulation. Recommended for Section A.',
    interviewerRecommendation: 'Strong Admit',
    status: 'Enrolled',
    submittedAt: 'Oct 08, 2024',
    documents: [
      { id: 'doc-1', name: 'NADRA B-Form / Birth Certificate', category: 'B-Form / Birth Cert', verified: true, uploadedAt: 'Oct 08, 2024', fileSize: '1.2 MB' },
      { id: 'doc-2', name: 'School Leaving Certificate (SLC)', category: 'Leaving Certificate', verified: true, uploadedAt: 'Oct 08, 2024', fileSize: '850 KB' },
      { id: 'doc-3', name: 'Father CNIC Scanned Copy', category: 'Guardian CNIC', verified: true, uploadedAt: 'Oct 08, 2024', fileSize: '980 KB' },
      { id: 'doc-4', name: 'Certified Medical Health Fitness', category: 'Medical Fitness', verified: true, uploadedAt: 'Oct 10, 2024', fileSize: '650 KB' }
    ],
    feeBreakdown: {
      admissionFee: 15000,
      tuitionFee: 15000,
      securityDeposit: 5000,
      discount: 0,
      total: 35000
    },
    challanAmount: 35000,
    challanStatus: 'Paid',
    paidOn: 'Oct 22, 2024',
    paymentGateway: 'JazzCash',
    assignedRollNo: '09-A-14',
    assignedSection: 'Section A (General Science)',
    transportRequired: true,
    busStop: 'DHA Phase 5 Roundabout',
    hostelRequired: false,
    timeline: [
      { title: 'Online Admission Application Submitted', date: 'Oct 08, 2024 • 11:30 AM', status: 'completed', description: 'Application received via online registration portal.' },
      { title: 'Documents Verified by Desk', date: 'Oct 10, 2024 • 03:15 PM', status: 'completed', description: 'B-Form and SLC verified by Admission Officer Kamran Haider.' },
      { title: 'Entrance Test & Interview Held', date: 'Oct 15, 2024 • 10:00 AM', status: 'completed', description: 'Secured 88% overall with 92% in Oral Panel Interview.' },
      { title: 'Official Merit List Published', date: 'Oct 18, 2024 • 09:00 AM', status: 'completed', description: 'Ranked #4 on 1st Open Merit Intake List.' },
      { title: 'Admission Fee Challan Paid', date: 'Oct 22, 2024 • 02:40 PM', status: 'completed', description: 'Rs. 35,000 reconciled via JazzCash Mobile QR.' },
      { title: 'Formally Enrolled in Grade 9-A', date: 'Oct 24, 2024 • 10:24 AM', status: 'completed', description: 'Roll # 09-A-14 assigned. Welcome pack dispatched via WhatsApp.' }
    ]
  },
  {
    id: 'APP-2026-1043',
    studentName: 'Zainab Qasim',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    gender: 'Female',
    dob: '2010-09-12',
    bloodGroup: 'O+',
    grade: 'Grade 10 (Matric / Pre-Med)',
    stream: 'Pre-Medical (Biology & Chemistry)',
    guardianName: 'Muhammad Qasim',
    guardianRelation: 'Father',
    guardianOccupation: 'Civil Engineer',
    guardianPhone: '+92 321 4481029',
    guardianEmail: 'qasim.m@gmail.com',
    guardianCnic: '35202-1940294-1',
    residentialAddress: 'House 18, Street 3, Johar Town, Lahore',
    previousSchool: 'Lahore Grammar School',
    previousPercentage: 89.0,
    entranceTestScore: 85,
    testStatus: 'Completed',
    testDate: 'Oct 18, 2024',
    testTime: '09:00 AM - 11:30 AM',
    testVenue: 'Examination Hall B (Desk 08)',
    testBreakdown: {
      english: 88,
      mathematics: 82,
      science: 87,
      interview: 85
    },
    meritRank: 9,
    meritScore: 86.6,
    quota: 'Open Merit',
    interviewerNotes: 'Excellent grasp on Biology concepts. Clear desire for Pre-Med section.',
    interviewerRecommendation: 'Admit',
    status: 'Challan Issued',
    submittedAt: 'Oct 10, 2024',
    documents: [
      { id: 'doc-1', name: 'NADRA B-Form / Birth Certificate', category: 'B-Form / Birth Cert', verified: true, uploadedAt: 'Oct 10, 2024', fileSize: '1.4 MB' },
      { id: 'doc-2', name: 'School Leaving Certificate (SLC)', category: 'Leaving Certificate', verified: true, uploadedAt: 'Oct 10, 2024', fileSize: '780 KB' },
      { id: 'doc-3', name: 'Father CNIC Scanned Copy', category: 'Guardian CNIC', verified: true, uploadedAt: 'Oct 10, 2024', fileSize: '920 KB' },
      { id: 'doc-4', name: 'Certified Medical Health Fitness', category: 'Medical Fitness', verified: false, uploadedAt: 'Oct 10, 2024', fileSize: 'Pending' }
    ],
    feeBreakdown: {
      admissionFee: 15000,
      tuitionFee: 18000,
      securityDeposit: 5000,
      discount: 0,
      total: 38000
    },
    challanAmount: 38000,
    challanStatus: 'Generated',
    assignedRollNo: '10-B-12',
    assignedSection: 'Section B (Pre-Med)',
    transportRequired: false,
    hostelRequired: false,
    timeline: [
      { title: 'Application Submitted', date: 'Oct 10, 2024', status: 'completed', description: 'Online intake form filed.' },
      { title: 'Entrance Examination Passed', date: 'Oct 18, 2024', status: 'completed', description: 'Score: 85/100 composite.' },
      { title: 'Merit Approved', date: 'Oct 20, 2024', status: 'completed', description: 'Rank #9 on Grade 10 Pre-Med merit.' },
      { title: 'Admission Fee Challan Issued', date: 'Oct 21, 2024', status: 'current', description: 'Challan due on Oct 30 via 1Link/EasyPaisa.' },
      { title: 'Final Section Allocation', date: 'Pending', status: 'upcoming', description: 'Awaiting fee settlement.' }
    ]
  },
  {
    id: 'APP-2026-1044',
    studentName: 'Muhammad Zayan Bilal',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    gender: 'Male',
    dob: '2012-01-22',
    bloodGroup: 'A+',
    grade: 'Grade 8 (Middle)',
    stream: 'Cambridge Lower Secondary',
    guardianName: 'Bilal Javed',
    guardianRelation: 'Father',
    guardianOccupation: 'General Manager, Nestle Pakistan',
    guardianPhone: '+92 333 4819020',
    guardianEmail: 'bilal.javed@yahoo.com',
    guardianCnic: '35201-9301948-5',
    residentialAddress: 'House 88, Sector Y, Phase 3, DHA, Lahore',
    previousSchool: 'The City School Ravi Campus',
    previousPercentage: 94.2,
    entranceTestScore: 92,
    testStatus: 'Completed',
    testDate: 'Oct 20, 2024',
    testTime: '11:00 AM - 01:00 PM',
    testVenue: 'Examination Hall A (Desk 02)',
    testBreakdown: {
      english: 94,
      mathematics: 95,
      science: 90,
      interview: 90
    },
    meritRank: 2,
    meritScore: 92.9,
    quota: 'Open Merit',
    interviewerNotes: 'Exceptional candidate. Top tier logical thinking and mathematics skills.',
    interviewerRecommendation: 'Strong Admit',
    status: 'Merit Approved',
    submittedAt: 'Oct 12, 2024',
    documents: [
      { id: 'doc-1', name: 'NADRA B-Form / Birth Certificate', category: 'B-Form / Birth Cert', verified: true, uploadedAt: 'Oct 12, 2024', fileSize: '1.1 MB' },
      { id: 'doc-2', name: 'School Leaving Certificate (SLC)', category: 'Leaving Certificate', verified: true, uploadedAt: 'Oct 12, 2024', fileSize: '820 KB' },
      { id: 'doc-3', name: 'Father CNIC Scanned Copy', category: 'Guardian CNIC', verified: true, uploadedAt: 'Oct 12, 2024', fileSize: '950 KB' },
      { id: 'doc-4', name: 'Certified Medical Health Fitness', category: 'Medical Fitness', verified: true, uploadedAt: 'Oct 13, 2024', fileSize: '700 KB' }
    ],
    feeBreakdown: {
      admissionFee: 12000,
      tuitionFee: 14000,
      securityDeposit: 4000,
      discount: 0,
      total: 30000
    },
    challanAmount: 30000,
    challanStatus: 'Generated',
    transportRequired: true,
    busStop: 'Y-Block Market, DHA Phase 3',
    hostelRequired: false,
    timeline: [
      { title: 'Application Submitted', date: 'Oct 12, 2024', status: 'completed', description: 'Online intake registration.' },
      { title: 'All Documents Verified', date: 'Oct 14, 2024', status: 'completed', description: '4 of 4 verification approved.' },
      { title: 'Entrance Examination Passed', date: 'Oct 20, 2024', status: 'completed', description: 'High scorer: 92% composite.' },
      { title: 'Merit List Approved', date: 'Oct 22, 2024', status: 'current', description: 'Rank #2. Ready for fee challan issuance.' }
    ]
  },
  {
    id: 'APP-2026-1045',
    studentName: 'Fatima Zahra',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    gender: 'Female',
    dob: '2011-11-05',
    bloodGroup: 'AB+',
    grade: 'Grade 9 (Science)',
    stream: 'Science & Biology',
    guardianName: 'Tariq Mehmood',
    guardianRelation: 'Father',
    guardianOccupation: 'Business Executive',
    guardianPhone: '+92 301 8492019',
    guardianEmail: 'tariq.m@hotmail.com',
    guardianCnic: '35202-4910294-7',
    residentialAddress: 'House 14, Model Town, Block C, Lahore',
    previousSchool: 'Convent of Jesus and Mary',
    previousPercentage: 86.5,
    testStatus: 'Scheduled',
    testDate: 'Oct 29, 2024',
    testTime: '10:00 AM - 12:00 PM',
    testVenue: 'Main Academic Wing, Room 204',
    quota: 'Sibling Quota',
    status: 'Test Scheduled',
    submittedAt: 'Oct 19, 2024',
    documents: [
      { id: 'doc-1', name: 'NADRA B-Form / Birth Certificate', category: 'B-Form / Birth Cert', verified: true, uploadedAt: 'Oct 19, 2024', fileSize: '1.3 MB' },
      { id: 'doc-2', name: 'School Leaving Certificate (SLC)', category: 'Leaving Certificate', verified: false, uploadedAt: 'Pending', fileSize: 'Pending' },
      { id: 'doc-3', name: 'Father CNIC Scanned Copy', category: 'Guardian CNIC', verified: true, uploadedAt: 'Oct 19, 2024', fileSize: '890 KB' },
      { id: 'doc-4', name: 'Certified Medical Health Fitness', category: 'Medical Fitness', verified: false, uploadedAt: 'Pending', fileSize: 'Pending' }
    ],
    feeBreakdown: {
      admissionFee: 15000,
      tuitionFee: 15000,
      securityDeposit: 5000,
      discount: 3000,
      total: 32000
    },
    challanAmount: 32000,
    challanStatus: 'Generated',
    transportRequired: false,
    hostelRequired: false,
    timeline: [
      { title: 'Application Submitted', date: 'Oct 19, 2024', status: 'completed', description: 'Sibling quota requested (Brother in Grade 11).' },
      { title: 'Entrance Examination Scheduled', date: 'Oct 29, 2024 • 10:00 AM', status: 'current', description: 'Room 204 with Examiner Prof. Tariq.' }
    ]
  },
  {
    id: 'APP-2026-1046',
    studentName: 'Daniyal Harris',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    gender: 'Male',
    dob: '2009-03-14',
    bloodGroup: 'B-',
    grade: 'Grade 11 (FSc Pre-Engineering)',
    stream: 'Pre-Engineering (Maths & Physics)',
    guardianName: 'Dr. Harris Khan',
    guardianRelation: 'Father',
    guardianOccupation: 'Consultant Orthopedic Surgeon',
    guardianPhone: '+92 312 9048192',
    guardianEmail: 'dr.harris@clinic.com',
    guardianCnic: '35201-1029482-9',
    residentialAddress: 'House 71, Canal View Colony, Lahore',
    previousSchool: 'Bloomfield Hall School',
    previousPercentage: 81.2,
    testStatus: 'Pending',
    quota: 'Open Merit',
    status: 'Under Review',
    submittedAt: 'Oct 22, 2024',
    documents: [
      { id: 'doc-1', name: 'NADRA B-Form / Birth Certificate', category: 'B-Form / Birth Cert', verified: true, uploadedAt: 'Oct 22, 2024', fileSize: '1.2 MB' },
      { id: 'doc-2', name: 'School Leaving Certificate (SLC)', category: 'Leaving Certificate', verified: false, uploadedAt: 'Pending', fileSize: 'Pending' },
      { id: 'doc-3', name: 'Father CNIC Scanned Copy', category: 'Guardian CNIC', verified: true, uploadedAt: 'Oct 22, 2024', fileSize: '910 KB' },
      { id: 'doc-4', name: 'Certified Medical Health Fitness', category: 'Medical Fitness', verified: false, uploadedAt: 'Pending', fileSize: 'Pending' }
    ],
    feeBreakdown: {
      admissionFee: 18000,
      tuitionFee: 19000,
      securityDeposit: 5000,
      discount: 0,
      total: 42000
    },
    challanAmount: 42000,
    challanStatus: 'Generated',
    transportRequired: true,
    busStop: 'Canal Bank Thokar Stop',
    hostelRequired: true,
    roomPreference: 'Double Sharing (Block A)',
    timeline: [
      { title: 'Application Submitted', date: 'Oct 22, 2024', status: 'current', description: 'Pending leaving certificate upload from candidate.' }
    ]
  },
  {
    id: 'APP-2026-1047',
    studentName: 'Amina Noor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    gender: 'Female',
    dob: '2013-07-09',
    bloodGroup: 'O+',
    grade: 'Grade 6 (Cambridge Junior)',
    stream: 'Cambridge Primary Checkpoint',
    guardianName: 'Noor-ul-Hassan',
    guardianRelation: 'Father',
    guardianOccupation: 'Senior Advocate High Court',
    guardianPhone: '+92 322 8492019',
    guardianEmail: 'noor.hassan@gmail.com',
    guardianCnic: '35202-3920194-3',
    residentialAddress: 'House 5, Gulberg III, Lahore',
    previousSchool: 'Roots Millennium School',
    previousPercentage: 91.8,
    entranceTestScore: 89,
    testStatus: 'Completed',
    testDate: 'Oct 21, 2024',
    testTime: '09:30 AM - 11:30 AM',
    testVenue: 'Junior Wing Hall 1',
    testBreakdown: {
      english: 92,
      mathematics: 88,
      science: 86,
      interview: 90
    },
    meritRank: 5,
    meritScore: 90.1,
    quota: 'Open Merit',
    interviewerNotes: 'Polite, active participant in co-curriculars. Strong English fluency.',
    interviewerRecommendation: 'Strong Admit',
    status: 'Merit Approved',
    submittedAt: 'Oct 14, 2024',
    documents: [
      { id: 'doc-1', name: 'NADRA B-Form / Birth Certificate', category: 'B-Form / Birth Cert', verified: true, uploadedAt: 'Oct 14, 2024', fileSize: '1.1 MB' },
      { id: 'doc-2', name: 'School Leaving Certificate (SLC)', category: 'Leaving Certificate', verified: true, uploadedAt: 'Oct 14, 2024', fileSize: '850 KB' },
      { id: 'doc-3', name: 'Father CNIC Scanned Copy', category: 'Guardian CNIC', verified: true, uploadedAt: 'Oct 14, 2024', fileSize: '900 KB' },
      { id: 'doc-4', name: 'Certified Medical Health Fitness', category: 'Medical Fitness', verified: true, uploadedAt: 'Oct 15, 2024', fileSize: '620 KB' }
    ],
    feeBreakdown: {
      admissionFee: 12000,
      tuitionFee: 15000,
      securityDeposit: 5000,
      discount: 0,
      total: 32000
    },
    challanAmount: 32000,
    challanStatus: 'Generated',
    transportRequired: false,
    hostelRequired: false,
    timeline: [
      { title: 'Application Submitted', date: 'Oct 14, 2024', status: 'completed', description: 'Intake registration completed.' },
      { title: 'Test & Interview Passed', date: 'Oct 21, 2024', status: 'completed', description: 'Composite Score: 90.1%.' },
      { title: 'Merit Approved', date: 'Oct 23, 2024', status: 'current', description: 'Rank #5. Ready for fee challan.' }
    ]
  }
];

export const MOCK_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-01',
    title: 'Mid-Term Examination Schedule & Date Sheet Published',
    category: 'Academic',
    targetAudience: 'All Students & Parents',
    date: 'Today, 09:30 AM',
    author: 'Examination Controller',
    read: false
  },
  {
    id: 'ann-02',
    title: 'November 2026 Fee Challans issued with JazzCash & EasyPaisa 1-Click Pay',
    category: 'Finance',
    targetAudience: 'Parents & Guardians',
    date: 'Yesterday, 04:15 PM',
    author: 'Accounts & Bursar Office',
    read: true
  },
  {
    id: 'ann-03',
    title: 'Annual Inter-Campus Science & Robotics Olympiad Registrations Open',
    category: 'General',
    targetAudience: 'Grades 6 - 12',
    date: 'Nov 09, 2026',
    author: 'Academic Coordinator',
    read: true
  },
  {
    id: 'ann-04',
    title: 'RFID Smart Student ID Cards Biometric Turnstile Sync Scheduled',
    category: 'Urgent',
    targetAudience: 'All Faculty & Transport',
    date: 'Nov 08, 2026',
    author: 'IT Operations & Security',
    read: true
  }
];
