import type {
  ClassStat,
  Defaulter,
  Department,
  GradeCount,
  LowAttendance,
  MonthStat,
  SubjectAvg,
  TopStudent,
} from "../types/reportTypes"

/**
 * Abhi dummy data hai. Backend aane par sirf in functions ke andar axios API calls lagengi,
 * page ka code nahi badlega.
 */
export const CLASSES = Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`)

export function getClassStats(): ClassStat[] {
  return CLASSES.map((className, i) => {
    const students = 110 + ((i * 7) % 40)
    const boys = Math.round(students * (0.5 + ((i % 3) * 0.02)))
    const feeBilled = students * (3500 + i * 250)
    const feeCollected = Math.round(feeBilled * (0.78 + ((i * 3) % 15) / 100))
    return {
      className,
      students,
      boys,
      girls: students - boys,
      attendancePct: 86 + ((i * 3) % 11),
      feeBilled,
      feeCollected,
      avgMarks: 62 + ((i * 5) % 20),
      passPct: 84 + ((i * 4) % 15),
    }
  })
}

export function getMonthStats(): MonthStat[] {
  const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  return months.map((month, i) => {
    const collected = 1_800_000 + ((i * 137_000) % 900_000)
    return {
      month,
      collected,
      pending: 300_000 + ((i * 91_000) % 400_000),
      attendancePct: 88 + ((i * 3) % 8),
      admissions: 8 + ((i * 5) % 22),
    }
  })
}

const NAMES = ["Ayesha Khan", "Hamza Ali", "Fatima Noor", "Bilal Ahmed", "Zainab Raza", "Usman Tariq", "Maryam Iqbal", "Ali Hassan", "Hira Saeed", "Saad Mehmood", "Noor Fatima", "Ahmed Raza"]

export function getDefaulters(): Defaulter[] {
  return NAMES.slice(0, 8).map((name, i) => ({
    id: `d${i}`,
    name,
    className: CLASSES[(i * 3) % CLASSES.length],
    due: 4500 + i * 1750,
    daysLate: 10 + i * 6,
  }))
}

export function getLowAttendance(): LowAttendance[] {
  return NAMES.slice(2, 9).map((name, i) => ({
    id: `l${i}`,
    name,
    className: CLASSES[(i * 2 + 1) % CLASSES.length],
    attendancePct: 62 + i * 2,
    absentDays: 24 - i * 2,
  }))
}

export function getTopStudents(): TopStudent[] {
  return NAMES.slice(0, 8).map((name, i) => {
    const percentage = 96 - i * 1.5
    return {
      id: `t${i}`,
      name,
      className: CLASSES[(i * 2) % CLASSES.length],
      percentage,
      grade: percentage >= 90 ? "A+" : percentage >= 80 ? "A" : "B",
    }
  })
}

export function getSubjectAvg(): SubjectAvg[] {
  return [
    { subject: "English", avg: 72 },
    { subject: "Urdu", avg: 75 },
    { subject: "Maths", avg: 66 },
    { subject: "Science", avg: 69 },
    { subject: "Islamiyat", avg: 82 },
    { subject: "Social St.", avg: 74 },
    { subject: "Computer", avg: 79 },
  ]
}

export function getGrades(): GradeCount[] {
  return [
    { grade: "A+", count: 162 },
    { grade: "A", count: 310 },
    { grade: "B", count: 384 },
    { grade: "C", count: 241 },
    { grade: "D", count: 97 },
    { grade: "F", count: 54 },
  ]
}

export function getDepartments(): Department[] {
  return [
    { dept: "Teaching", headcount: 62, attendancePct: 95, leaves: 21, payroll: 4_650_000 },
    { dept: "Administration", headcount: 14, attendancePct: 93, leaves: 6, payroll: 980_000 },
    { dept: "Accounts", headcount: 6, attendancePct: 96, leaves: 2, payroll: 420_000 },
    { dept: "Library", headcount: 4, attendancePct: 94, leaves: 1, payroll: 210_000 },
    { dept: "Transport", headcount: 18, attendancePct: 91, leaves: 7, payroll: 640_000 },
    { dept: "Support Staff", headcount: 22, attendancePct: 90, leaves: 9, payroll: 560_000 },
  ]
}

/** Table ko CSV file bana kar download karwata hai (Excel mein khul jati hai). */
export function downloadCsv(filename: string, rows: Record<string, string | number>[]) {
  if (rows.length === 0) return
  const headers = Object.keys(rows[0])
  const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`
  const csv = [headers.map(esc).join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))].join("\n")
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}