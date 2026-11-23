export type AttendanceStatus = 'Present' | 'Absent' | 'Late';
export type AttendanceType = 'Daily' | 'Subject-wise';
export type AttendanceSource = 'Manual' | 'Biometric' | 'RFID';
export interface AttendanceStudent { id: string; name: string; roll: string; className: string; section: string; guardian: string; phone?: string; }
export interface AttendanceEmployee { id: string; name: string; department: string; designation: string; }
export interface StudentAttendanceRecord {
 id: string; kind: 'Student'; studentId: string; studentName: string; roll: string; className: string; section: string;
 date: string; attendanceType: AttendanceType; subject: string; teacher: string; status: AttendanceStatus;
 source: AttendanceSource; createdAt: string; updatedAt: string;
}
export interface StaffAttendanceRecord {
 id: string; kind: 'Staff'; employeeId: string; employeeName: string; department: string; designation: string;
 date: string; checkIn: string; checkOut: string; status: AttendanceStatus; source: AttendanceSource;
 createdAt: string; updatedAt: string;
}
export type AttendanceRecord = StudentAttendanceRecord | StaffAttendanceRecord;
export interface AttendanceDevice { id: string; name: string; code: string; type: 'Biometric' | 'RFID'; location: string; status: 'Not Connected' | 'Connected'; lastSyncAt?: string; }
export interface AbsenceNotification {
 id: string; attendanceId: string; studentName: string; guardianName: string; date: string;
 channel: 'SMS' | 'Email' | 'In-app'; status: 'Integration Required'; createdAt: string;
}
