import { useMemo } from "react"
import { addDays, daysBetween, today, useStore } from "../../management/shared/store"
import { FINE_PER_DAY, MAX_RENEWALS, POLICY } from "../types/libraryTypes"
import type { Book, BookCategory, IssueRecord, LibraryMember } from "../types/libraryTypes"

const categories: BookCategory[] = [
  { id: "c1", name: "Science", description: "Physics, Chemistry, Biology" },
  { id: "c2", name: "Mathematics", description: "Textbooks and practice books" },
  { id: "c3", name: "Literature", description: "Novels, poetry, drama" },
  { id: "c4", name: "History", description: "World and Pakistan history" },
  { id: "c5", name: "Reference", description: "Dictionaries and encyclopedias" },
]

const books: Book[] = [
  { id: "b1", barcode: "LIB-0001", rfid: "RF-A101", title: "Physics for Class 10", author: "Dr. A. Hameed", isbn: "978-969-0001", category: "Science", publisher: "Punjab Textbook Board", year: "2022", copies: 5, lost: 0, shelf: "A-1", price: 650 },
  { id: "b2", barcode: "LIB-0002", rfid: "RF-A102", title: "Elementary Algebra", author: "S. Khan", isbn: "978-969-0002", category: "Mathematics", publisher: "Oxford Pakistan", year: "2021", copies: 4, lost: 0, shelf: "B-2", price: 800 },
  { id: "b3", barcode: "LIB-0003", rfid: "RF-A103", title: "Oliver Twist", author: "Charles Dickens", isbn: "978-014-0003", category: "Literature", publisher: "Penguin", year: "2018", copies: 3, lost: 1, shelf: "C-1", price: 950 },
  { id: "b4", barcode: "LIB-0004", rfid: "RF-A104", title: "History of Pakistan", author: "Dr. M. Ali", isbn: "978-969-0004", category: "History", publisher: "Sang-e-Meel", year: "2020", copies: 6, lost: 0, shelf: "D-3", price: 700 },
  { id: "b5", barcode: "LIB-0005", rfid: "RF-A105", title: "Oxford English Dictionary", author: "Oxford Press", isbn: "978-019-0005", category: "Reference", publisher: "Oxford", year: "2019", copies: 2, lost: 0, shelf: "R-1", price: 3500 },
  { id: "b6", barcode: "LIB-0006", rfid: "RF-A106", title: "Chemistry Fundamentals", author: "R. Ahmed", isbn: "978-969-0006", category: "Science", publisher: "National Book Foundation", year: "2023", copies: 4, lost: 0, shelf: "A-2", price: 720 },
]

const members: LibraryMember[] = [
  { id: "m1", code: "STU-1001", name: "Ayesha Khan", type: "Student", classOrDept: "Class 10-A", status: "Active" },
  { id: "m2", code: "STU-1002", name: "Hamza Ali", type: "Student", classOrDept: "Class 9-B", status: "Active" },
  { id: "m3", code: "TCH-201", name: "Sara Malik", type: "Teacher", classOrDept: "Science", status: "Active" },
  { id: "m4", code: "STF-301", name: "Imran Shah", type: "Staff", classOrDept: "Accounts", status: "Active" },
]

const d = (n: number) => addDays(today(), n)
const issues: IssueRecord[] = [
  { id: "i1", bookId: "b1", memberId: "m1", issueDate: d(-20), dueDate: d(-6), returnDate: "", renewals: 0, fine: 0, finePaid: false, status: "Issued" },
  { id: "i2", bookId: "b3", memberId: "m2", issueDate: d(-5), dueDate: d(9), returnDate: "", renewals: 0, fine: 0, finePaid: false, status: "Issued" },
  { id: "i3", bookId: "b4", memberId: "m3", issueDate: d(-40), dueDate: d(-10), returnDate: d(-12), renewals: 1, fine: 0, finePaid: true, status: "Returned" },
  { id: "i4", bookId: "b2", memberId: "m1", issueDate: d(-30), dueDate: d(-16), returnDate: d(-10), renewals: 0, fine: 60, finePaid: false, status: "Returned" },
]

/** Overdue din ke hisab se fine nikalta hai. */
export function calcFine(dueDate: string, endDate = today()) {
  const late = daysBetween(dueDate, endDate)
  return late > 0 ? late * FINE_PER_DAY : 0
}

export function useLibrary() {
  const cat = useStore<BookCategory>("lib-categories", categories)
  const bk = useStore<Book>("lib-books", books)
  const mem = useStore<LibraryMember>("lib-members", members)
  const iss = useStore<IssueRecord>("lib-issues", issues)

  const active = useMemo(() => iss.items.filter((i) => i.status === "Issued"), [iss.items])

  const availableOf = (bookId: string) => {
    const b = bk.items.find((x) => x.id === bookId)
    if (!b) return 0
    return Math.max(0, b.copies - b.lost - active.filter((i) => i.bookId === bookId).length)
  }

  const liveFine = (i: IssueRecord) => (i.status === "Issued" ? calcFine(i.dueDate) : i.fine)

  /** Return: { ok, message } */
  const issueBook = (bookId: string, memberId: string) => {
    const m = mem.items.find((x) => x.id === memberId)
    const b = bk.items.find((x) => x.id === bookId)
    if (!m || !b) return { ok: false, message: "Member aur book dono select karein." }
    if (m.status === "Blocked") return { ok: false, message: "Ye member blocked hai." }
    if (availableOf(bookId) < 1) return { ok: false, message: "Is book ki koi copy available nahi." }
    const mine = active.filter((i) => i.memberId === memberId)
    if (mine.length >= POLICY[m.type].maxBooks) return { ok: false, message: `${m.type} ki limit ${POLICY[m.type].maxBooks} books hai.` }
    if (mine.some((i) => i.bookId === bookId)) return { ok: false, message: "Ye book is member ke paas pehle se hai." }
    if (mine.some((i) => calcFine(i.dueDate) > 0)) return { ok: false, message: "Pehle overdue book wapas karein." }
    const unpaid = iss.items.some((i) => i.memberId === memberId && i.status === "Returned" && i.fine > 0 && !i.finePaid)
    if (unpaid) return { ok: false, message: "Pehle purana fine ada karein." }
    iss.add({ bookId, memberId, issueDate: today(), dueDate: addDays(today(), POLICY[m.type].loanDays), returnDate: "", renewals: 0, fine: 0, finePaid: false, status: "Issued" })
    return { ok: true, message: `"${b.title}" ${m.name} ko issue ho gayi.` }
  }

  const returnBook = (issueId: string) => {
    const i = iss.items.find((x) => x.id === issueId)
    if (!i) return
    const fine = calcFine(i.dueDate)
    iss.update(issueId, { status: "Returned", returnDate: today(), fine, finePaid: fine === 0 })
  }

  const renewBook = (issueId: string) => {
    const i = iss.items.find((x) => x.id === issueId)
    const m = mem.items.find((x) => x.id === i?.memberId)
    if (!i || !m) return { ok: false, message: "Record nahi mila." }
    if (i.renewals >= MAX_RENEWALS) return { ok: false, message: `Maximum ${MAX_RENEWALS} renewals ho chuki hain.` }
    if (calcFine(i.dueDate) > 0) return { ok: false, message: "Overdue book renew nahi hoti, pehle return karein." }
    iss.update(issueId, { dueDate: addDays(i.dueDate, POLICY[m.type].loanDays), renewals: i.renewals + 1 })
    return { ok: true, message: "Book renew ho gayi." }
  }

  const payFine = (issueId: string) => iss.update(issueId, { finePaid: true })

  const bookTitle = (id: string) => bk.items.find((b) => b.id === id)?.title ?? "Unknown"
  const memberName = (id: string) => mem.items.find((m) => m.id === id)?.name ?? "Unknown"

  return { cat, bk, mem, iss, active, availableOf, liveFine, issueBook, returnBook, renewBook, payFine, bookTitle, memberName }
}