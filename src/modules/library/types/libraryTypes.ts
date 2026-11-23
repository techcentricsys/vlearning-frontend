export type Book = {
  id: string
  barcode: string
  rfid: string
  title: string
  author: string
  isbn: string
  category: string
  publisher: string
  year: string
  copies: number
  lost: number
  shelf: string
  price: number
}

export type BookCategory = {
  id: string
  name: string
  description: string
}

export const MEMBER_TYPES = ["Student", "Teacher", "Staff"] as const
export type MemberType = (typeof MEMBER_TYPES)[number]

export type LibraryMember = {
  id: string
  code: string
  name: string
  type: MemberType
  classOrDept: string
  status: "Active" | "Blocked"
}

export type IssueStatus = "Issued" | "Returned"

export type IssueRecord = {
  id: string
  bookId: string
  memberId: string
  issueDate: string
  dueDate: string
  returnDate: string
  renewals: number
  fine: number
  finePaid: boolean
  status: IssueStatus
}

/** Library ke rules: har member type ke liye limit aur muddat. */
export const POLICY: Record<MemberType, { maxBooks: number; loanDays: number }> = {
  Student: { maxBooks: 3, loanDays: 14 },
  Teacher: { maxBooks: 5, loanDays: 30 },
  Staff: { maxBooks: 3, loanDays: 21 },
}
export const FINE_PER_DAY = 10
export const MAX_RENEWALS = 2