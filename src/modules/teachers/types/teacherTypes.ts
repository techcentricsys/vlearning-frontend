export type TeacherStatus = "Active" | "On Leave"

export interface Teacher {
  id: string
  name: string
  email: string
  phone: string
  qualification: string
  experience: string
  subjects: string[]
  classes: string[]
  attendance: number
  status: TeacherStatus
}

export interface NewTeacher {
  name: string
  email: string
  phone: string
  qualification: string
  experience: string
  subjects: string[]
  classes: string[]
}