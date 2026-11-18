import { useEffect, useState } from "react"
import { Search, UserPlus, Eye, X, GraduationCap, BookOpen, Users } from "lucide-react"
import { addTeacher, getTeachers } from "../services/teacherService"
import type { Teacher } from "../types/teacherTypes"

const subjectOptions = ["All Subjects", "Mathematics", "Physics", "English", "Computer Science", "Chemistry", "Urdu"]

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  qualification: "",
  experience: "",
  subjects: "",
  classes: "",
}

const splitList = (value: string) =>
  value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [subject, setSubject] = useState("All Subjects")
  const [showForm, setShowForm] = useState(false)
  const [selected, setSelected] = useState<Teacher | null>(null)
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    getTeachers().then((data) => {
      setTeachers(data)
      setLoading(false)
    })
  }, [])

  const filtered = teachers.filter((t) => {
    const text = query.toLowerCase()
    const matchesText = t.name.toLowerCase().includes(text) || t.id.toLowerCase().includes(text)
    const matchesSubject = subject === "All Subjects" || t.subjects.includes(subject)
    return matchesText && matchesSubject
  })

  const update = (key: keyof typeof emptyForm, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    const created = await addTeacher({
      name: form.name,
      email: form.email,
      phone: form.phone,
      qualification: form.qualification,
      experience: form.experience,
      subjects: splitList(form.subjects),
      classes: splitList(form.classes),
    })
    setTeachers((prev) => [created, ...prev])
    setForm(emptyForm)
    setShowForm(false)
  }

  const field =
    "w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-200"

  const stats = [
    { label: "Total Teachers", value: teachers.length, icon: Users },
    { label: "Active", value: teachers.filter((t) => t.status === "Active").length, icon: GraduationCap },
    { label: "On Leave", value: teachers.filter((t) => t.status === "On Leave").length, icon: BookOpen },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Teacher Management</h2>
          <p className="text-sm text-slate-500">Profiles, qualifications, assigned subjects and classes</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 text-sm font-semibold text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg px-4 py-2.5 shadow"
        >
          <UserPlus size={16} /> Add Teacher
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-1 text-3xl font-bold text-slate-900">{value}</p>
            </div>
            <div className="w-11 h-11 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Icon size={22} />
            </div>
          </div>
        ))}
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
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white outline-none"
          >
            {subjectOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-slate-500 bg-slate-50">
                <th className="px-6 py-3 font-semibold">Teacher</th>
                <th className="px-6 py-3 font-semibold">Qualification</th>
                <th className="px-6 py-3 font-semibold">Subjects</th>
                <th className="px-6 py-3 font-semibold">Classes</th>
                <th className="px-6 py-3 font-semibold">Attendance</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-slate-500">Loading teachers...</td>
                </tr>
              )}
              {!loading &&
                filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                          {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{t.name}</p>
                          <p className="text-xs text-slate-500">{t.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{t.qualification}</td>
                    <td className="px-6 py-4 text-slate-700">{t.subjects.join(", ")}</td>
                    <td className="px-6 py-4 text-slate-700">{t.classes.join(", ")}</td>
                    <td className="px-6 py-4 text-slate-700">{t.attendance}%</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-semibold rounded-full px-2.5 py-1 ${
                          t.status === "Active" ? "bg-teal-100 text-teal-800" : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => setSelected(t)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-slate-500">No teachers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 border-t border-slate-100 text-xs text-slate-500">
          Showing {filtered.length} of {teachers.length} teachers
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <form onSubmit={handleAdd} className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Add Teacher</h3>
              <button type="button" onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input required className={field} placeholder="Full name" value={form.name} onChange={(e) => update("name", e.target.value)} />
              <input required type="email" className={field} placeholder="Email" value={form.email} onChange={(e) => update("email", e.target.value)} />
              <input required className={field} placeholder="Phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              <input required className={field} placeholder="Qualification" value={form.qualification} onChange={(e) => update("qualification", e.target.value)} />
              <input required className={field} placeholder="Experience (e.g. 5 years)" value={form.experience} onChange={(e) => update("experience", e.target.value)} />
              <input required className={field} placeholder="Subjects (comma separated)" value={form.subjects} onChange={(e) => update("subjects", e.target.value)} />
              <input className={`${field} sm:col-span-2`} placeholder="Classes (comma separated, e.g. Grade 9-A, Grade 10-B)" value={form.classes} onChange={(e) => update("classes", e.target.value)} />
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg">
                Save Teacher
              </button>
            </div>
          </form>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selected.name}</h3>
                <p className="text-sm text-slate-500">{selected.id}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <dl className="mt-4 space-y-3 text-sm">
              {[
                ["Email", selected.email],
                ["Phone", selected.phone],
                ["Qualification", selected.qualification],
                ["Experience", selected.experience],
                ["Subjects", selected.subjects.join(", ")],
                ["Classes", selected.classes.join(", ") || "Not assigned"],
                ["Attendance", `${selected.attendance}%`],
                ["Status", selected.status],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="font-medium text-slate-900 text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeachersPage