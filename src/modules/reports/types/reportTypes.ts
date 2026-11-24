export type ClassStat = {
  className: string
  students: number
  boys: number
  girls: number
  attendancePct: number
  feeBilled: number
  feeCollected: number
  avgMarks: number
  passPct: number
}

export type MonthStat = {
  month: string
  collected: number
  pending: number
  attendancePct: number
  admissions: number
}

export type Defaulter = {
  id: string
  name: string
  className: string
  due: number
  daysLate: number
}

export type Department = {
  dept: string
  headcount: number
  attendancePct: number
  leaves: number
  payroll: number
}

export type SubjectAvg = { subject: string; avg: number }
export type GradeCount = { grade: string; count: number }

export type TopStudent = {
  id: string
  name: string
  className: string
  percentage: number
  grade: string
}

export type LowAttendance = {
  id: string
  name: string
  className: string
  attendancePct: number
  absentDays: number
}