export interface DashboardMetrics {
  totalStudents: number;
  studentsGrowth: string;
  attendanceRate: string;
  attendanceGrowth: string;
  feesCollected: string;
  feesProgress: number;
  outstandingFees: string;
  outstandingInvoices: number;
}

export interface ActivityLogItem {
  id: string;
  title: string;
  time: string;
  subtitle: string;
  author: string;
  status: string;
  statusType: 'success' | 'primary' | 'warning' | 'neutral';
}

export interface AcademicEvent {
  id: string;
  month: string;
  date: string;
  type: string;
  time: string;
  title: string;
  location: string;
}