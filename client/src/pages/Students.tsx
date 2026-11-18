import { useState } from "react"
import { Search, UserPlus, Download, Eye, Pencil } from "lucide-react"

type Student = {
  id: string
  name: string
  className: string
  section: string
  guardian: string
  phone: string
  status: "Active" | "Inactive"
}

const students: Student[] = [
  { id: "STU-001", name: "Ali Raza", className: "Grade 9", section: "A", guardian: "Raza Ahmed", phone: "0300 1234567", status: "Active" },
  { id: "STU-002", name: "Ayesha Khan", className: "Grade 8", section: "B", guardian: "Imran Khan", phone: "0301 2345678", status: "Active" },
  { id: "STU-003", name: "Hamza Malik", className: "Grade 10", section: "A", guardian: "Tariq Malik", phone: "0302 3456789", status: "Active" },
  { id: "STU-004", name: "Fatima Noor", className: "Grade 7", section: "C", guardian: "Noor Hussain", phone: "0303 4567890", status: "Inactive" },
  { id: "STU-005", name: "Usman Ali", className: "Grade 9", section: "B", guardian: "Ali Hassan", phone: "0304 5678901", status: "Active" },
  { id: "STU-006", name: "Zainab Shah", className: "Grade 6", section: "A", guardian: "Shah Nawaz", phone: "0305 6789012", status: "Active" },
]

const classes = ["All Classes", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10"]

function Students() {
  const [query, setQuery] = useState("")
  const [className, setClassName] = useState("All Classes")

  const filtered = students.filter((s) => {
    const matchesText =
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.id.toLowerCase().includes(query.toLowerCase())
    const matchesClass = className === "All Classes" || s.className === className
    return matchesText && matchesClass
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Students</h2>
          <p className="text-sm text-slate-500">Manage student records and profiles</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 text-sm font-medium text-slate-700 border border-slate-200 bg-white rounded-lg px-4 py-2.5 hover:bg-slate-50">
            <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 text-sm font-semibold text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg px-4 py-2.5 shadow">
            <UserPlus size={16} /> Add Student
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="p-4 flex flex-wrap items-center gap-3 border-b border-slate-100">
          <div className="relative w-full max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or ID..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white outline-none"
          >
            {classes.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-slate-500 bg-slate-50">
                <th className="px-6 py-3 font-semibold">Student</th>
                <th className="px-6 py-3 font-semibold">Class</th>
                <th className="px-6 py-3 font-semibold">Guardian</th>
                <th className="px-6 py-3 font-semibold">Phone</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                        {s.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{s.name}</p>
                        <p className="text-xs text-slate-500">{s.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    {s.className} - {s.section}
                  </td>
                  <td className="px-6 py-4 text-slate-700">{s.guardian}</td>
                  <td className="px-6 py-4 text-slate-700">{s.phone}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-semibold rounded-full px-2.5 py-1 ${
                        s.status === "Active"
                          ? "bg-teal-100 text-teal-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 text-slate-500">
                      <button className="p-2 rounded-lg hover:bg-slate-100"><Eye size={16} /></button>
                      <button className="p-2 rounded-lg hover:bg-slate-100"><Pencil size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 border-t border-slate-100 text-xs text-slate-500">
          Showing {filtered.length} of {students.length} students
        </div>
      </div>
    </div>
  )
}

export default Students