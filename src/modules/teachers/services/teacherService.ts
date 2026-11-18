import type { NewTeacher, Teacher } from "../types/teacherTypes"

let teachers: Teacher[] = [
  { id: "TCH-001", name: "Sara Ahmed", email: "sara@school.edu", phone: "0300 1111111", qualification: "MSc Mathematics", experience: "8 years", subjects: ["Mathematics"], classes: ["Grade 9-A", "Grade 10-A"], attendance: 96, status: "Active" },
  { id: "TCH-002", name: "Bilal Hussain", email: "bilal@school.edu", phone: "0301 2222222", qualification: "MSc Physics", experience: "6 years", subjects: ["Physics"], classes: ["Grade 9-B", "Grade 10-B"], attendance: 93, status: "Active" },
  { id: "TCH-003", name: "Nida Farooq", email: "nida@school.edu", phone: "0302 3333333", qualification: "MA English", experience: "10 years", subjects: ["English"], classes: ["Grade 7-A", "Grade 8-B"], attendance: 98, status: "Active" },
  { id: "TCH-004", name: "Kamran Shah", email: "kamran@school.edu", phone: "0303 4444444", qualification: "BS Computer Science", experience: "3 years", subjects: ["Computer Science"], classes: ["Grade 8-A"], attendance: 89, status: "On Leave" },
]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getTeachers(): Promise<Teacher[]> {
  await delay(300)
  return [...teachers]
}

export async function addTeacher(data: NewTeacher): Promise<Teacher> {
  await delay(200)
  const teacher: Teacher = {
    ...data,
    id: `TCH-${String(teachers.length + 1).padStart(3, "0")}`,
    attendance: 100,
    status: "Active",
  }
  teachers = [teacher, ...teachers]
  return teacher
}