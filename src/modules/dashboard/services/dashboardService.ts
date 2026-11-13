import { DashboardMetrics, ActivityLogItem, AcademicEvent } from '../types/dashboardTypes';

export const fetchDashboardMetrics = async (): Promise<DashboardMetrics> => {
  // Simulated API call matching your school management dashboard specs
  return {
    totalStudents: 1248,
    studentsGrowth: '3.2%',
    attendanceRate: '94.5%',
    attendanceGrowth: '1.1%',
    feesCollected: 'Rs. 850,000',
    feesProgress: 80.2,
    outstandingFees: 'Rs. 210,000',
    outstandingInvoices: 42,
  };
};

export const fetchRecentActivities = async (): Promise<ActivityLogItem[]> => {
  return [
    {
      id: '1',
      title: 'Admission Approved',
      time: '10:24 AM',
      subtitle: 'Aryan Sharma (Grade 9-A)',
      author: 'Dr. Sarah Jenkins',
      status: 'Approved',
      statusType: 'success'
    },
    {
      id: '2',
      title: 'Fee Payment Received',
      time: '09:45 AM',
      subtitle: 'Inv #4892 (Rs. 24,500) • Online Transfer',
      author: 'Cashier Counter 2',
      status: 'Cleared',
      statusType: 'primary'
    },
    {
      id: '3',
      title: 'Attendance Submitted',
      time: '09:15 AM',
      subtitle: 'Grade 10-B (38 Present, 2 Absent)',
      author: 'Prof. R. Verma',
      status: 'Verified',
      statusType: 'neutral'
    },
    {
      id: '4',
      title: 'Exam Results Published',
      time: 'Yesterday',
      subtitle: 'Term 1 Physics Quiz • Grade 11',
      author: 'HOD Science Dept',
      status: 'Published',
      statusType: 'success'
    }
  ];
};

export const fetchUpcomingEvents = async (): Promise<AcademicEvent[]> => {
  return [
    {
      id: 'e1',
      month: 'OCT',
      date: '28',
      type: 'Exam',
      time: '09:00 AM - 12:30 PM',
      title: 'Midterm Exams (Grades 9-12)',
      location: 'Central Examination Hall & Block B'
    },
    {
      id: 'e2',
      month: 'NOV',
      date: '02',
      type: 'Meeting',
      time: 'All Day Session',
      title: 'Parent-Teacher Meeting',
      location: 'Term 1 Performance Review'
    },
    {
      id: 'e3',
      month: 'NOV',
      date: '11',
      type: 'Event',
      time: '10:00 AM',
      title: 'National Education Day',
      location: 'Main Auditorium Assembly & Science Expo'
    }
  ];
};