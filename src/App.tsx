import { useState, useMemo } from "react";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Register from "./components/Register";

// --- INITIAL DATA ---
const initialStudents = [
  { id: 1, name: "Ayesha Khan", class: "Class 10-A", roll: "VL-101", phone: "0300-1234567", fee: "Paid", attendance: "92%" },
  { id: 2, name: "Muhammad Ali", class: "Class 9-B", roll: "VL-102", phone: "0301-7654321", fee: "Pending", attendance: "88%" },
  { id: 3, name: "Fatima Noor", class: "Class 10-A", roll: "VL-103", phone: "0321-9876543", fee: "Paid", attendance: "95%" },
  { id: 4, name: "Hassan Raza", class: "Class 8-C", roll: "VL-104", phone: "0333-1122334", fee: "Pending", attendance: "81%" },
];
const initialTeachers = [
  { id: 1, name: "Sir Ahmed", subject: "Mathematics", class: "10-A", phone: "0300-1112223", salary: "85,000" },
  { id: 2, name: "Miss Sana", subject: "English", class: "9-B", phone: "0300-4445556", salary: "78,000" },
  { id: 3, name: "Sir Bilal", subject: "Science", class: "8-C", phone: "0300-7778889", salary: "82,000" },
];

export default function App() {
  const [page, setPage] = useState("login");
  const [section, setSection] = useState("Dashboard");
  const [students, setStudents] = useState(initialStudents);
  const [teachers, setTeachers] = useState(initialTeachers);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", class: "Class 10-A", roll: "", phone: "" });
  const [toast, setToast] = useState("");
  const [dark, setDark] = useState(false);
  const [attendance, setAttendance] = useState<Record<number, string>>({});

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const filteredStudents = useMemo(() => students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.toLowerCase().includes(search.toLowerCase())), [students, search]);
  const filteredTeachers = useMemo(() => teachers.filter(t => t.name.toLowerCase().includes(search.toLowerCase())), [teachers, search]);

  const addStudent = () => {
    if (!form.name || !form.roll) return alert("Name aur Roll No lazmi hai!");
    setStudents([...students, { id: Date.now(), name: form.name, class: form.class, roll: form.roll, phone: form.phone, fee: "Pending", attendance: "100%" }]);
    setShowAdd(false); setForm({ name: "", class: "Class 10-A", roll: "", phone: "" }); showToast("✅ Student Added Successfully!");
  };
  const collectFee = (id: number) => { setStudents(students.map(s => s.id === id ? { ...s, fee: "Paid" } : s)); showToast("💰 Fee Collected Successfully!"); };
  const deleteStudent = (id: number) => { if (confirm("Delete karna hai?")) { setStudents(students.filter(s => s.id !== id)); showToast("🗑️ Student Deleted"); } };

  if (page === "login") return <Login goRegister={() => setPage("register")} goDashboard={() => setPage("dashboard")} />;
  if (page === "register") return <Register goLogin={() => setPage("login")} goDashboard={() => setPage("dashboard")} />;

  const paidCount = students.filter(s => s.fee === "Paid").length;

  return (
    <div className={`flex min-h-screen ${dark ? "bg-slate-900 text-white" : "bg-bg"}`}>
      <Sidebar active={section} onNavigate={(s: string) => { setSection(s); setSearch(""); }} />
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOPBAR */}
        <header className={`border-b px-6 py-3 flex items-center justify-between sticky top-0 z-10 ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-border"}`}>
          <div><p className="text-[11px] text-slate-400">VLearnings / {section}</p><p className="font-heading font-bold text-[16px]">{section} {dark ? "🌙" : ""}</p></div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search Student, Roll No, Teacher..." className={`w-[380px] rounded-full px-4 py-2 text-[13px] outline-none border ${dark ? "bg-slate-700 border-slate-600 text-white" : "bg-bg border-border"}`} />
          <div className="flex gap-2 items-center">
            <button onClick={() => setDark(!dark)} className="text-[18px]">{dark ? "☀️" : "🌙"}</button>
            <button onClick={() => showToast("🔔 3 New: Fee Received, Attendance 92%, New Student Added")} className="relative text-[18px]">🔔<span className="absolute -top-1 -right-1 bg-danger text-white text-[9px] w-4 h-4 rounded-full">3</span></button>
            <button onClick={() => setSection("Settings")} className="text-[18px]">⚙️</button>
            <button onClick={() => setPage("login")} className="bg-danger text-white px-3 py-1.5 rounded-lg text-[12px] font-semibold">Logout</button>
          </div>
        </header>

        <div className="p-6">
          {toast && <div className="fixed top-20 right-6 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl z-50 text-[13px]">{toast}</div>}

          {/* DASHBOARD */}
          {section === "Dashboard" && (
            <div>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { t: "Total Students", v: students.length, s: "+12 this month", c: "bg-indigo-50 text-primary", icon: "👨‍🎓" },
                  { t: "Total Teachers", v: teachers.length, s: "2 on leave", c: "bg-teal-50 text-teal", icon: "👩‍🏫" },
                  { t: "Fees Collected", v: `${paidCount}/${students.length}`, s: "Rs. 2,45,000", c: "bg-amber-50 text-amber", icon: "💰" },
                  { t: "Attendance Today", v: "92%", s: "312 / 340 present", c: "bg-green-50 text-green-600", icon: "✅" },
                ].map(x => <div key={x.t} className={`rounded-2xl p-4 border border-border ${dark ? "bg-slate-800" : "bg-white"}`}><div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[18px] ${x.c}`}>{x.icon}</div><p className="text-[12px] text-slate-400 mt-2">{x.t}</p><p className="font-heading text-[24px] font-bold">{x.v}</p><p className="text-[11px] text-teal">{x.s}</p></div>)}
              </div>

              <div className="flex gap-2 mt-4 flex-wrap">
                {["+ Add Student", "◷ Record Attendance", "₨ Collect Fee", "+ Add Teacher", "✎ Create Exam"].map(a => <button key={a} onClick={() => { if (a.includes("Student")) setSection("Students"); if (a.includes("Attendance")) setSection("Attendance"); if (a.includes("Fee")) setSection("Fees"); if (a.includes("Teacher")) setSection("Teachers"); if (a.includes("Exam")) setSection("Examinations"); }} className="bg-white border border-border px-3 py-2 rounded-lg text-[13px] font-medium hover:bg-indigo-50 hover:text-primary">{a}</button>)}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className={`rounded-2xl p-4 border border-border ${dark ? "bg-slate-800" : "bg-white"}`}><h3 className="font-bold">📊 Attendance - Last 7 Days</h3><div className="flex items-end gap-2 h-[120px] mt-3">{[85, 92, 88, 95, 90, 93, 92].map((v, i) => <div key={i} className="flex-1 bg-primary rounded-t-lg text-white text-[10px] flex items-end justify-center pb-1" style={{ height: `${v}%` }}>{v}%</div>)}</div></div>
                <div className={`rounded-2xl p-4 border border-border ${dark ? "bg-slate-800" : "bg-white"}`}><h3 className="font-bold">Recent Students</h3>{students.slice(0, 3).map(s => <div key={s.id} className="flex justify-between py-2 border-b border-border/50 text-[13px]"><span>{s.name} - {s.class}</span><span className={s.fee === "Paid" ? "text-teal" : "text-amber"}>{s.fee}</span></div>)}</div>
              </div>
            </div>
          )}

          {/* STUDENTS */}
          {section === "Students" && (
            <div className={`rounded-2xl border border-border p-4 ${dark ? "bg-slate-800" : "bg-white"}`}>
              <div className="flex justify-between"><h2 className="font-heading font-bold text-[18px]">Students ({filteredStudents.length})</h2><button onClick={() => setShowAdd(true)} className="bg-primary text-white px-3 py-2 rounded-lg text-[13px]">+ Add Student</button></div>
              <table className="w-full mt-4 text-[13px]"><thead><tr className="text-left text-slate-400 border-b"><th className="py-2">Name</th><th>Class</th><th>Roll</th><th>Phone</th><th>Fee</th><th>Action</th></tr></thead><tbody>{filteredStudents.map(s => <tr key={s.id} className="border-b border-border/50"><td className="py-3 font-medium">{s.name}</td><td>{s.class}</td><td>{s.roll}</td><td>{s.phone}</td><td><span className={`px-2 py-1 rounded-full text-[11px] ${s.fee === "Paid" ? "bg-teal-50 text-teal" : "bg-amber-50 text-amber"}`}>{s.fee}</span></td><td className="flex gap-1"><button onClick={() => collectFee(s.id)} className="bg-teal text-white px-2 py-1 rounded-md text-[11px]">Collect Fee</button><button onClick={() => deleteStudent(s.id)} className="bg-danger/10 text-danger px-2 py-1 rounded-md text-[11px]">Delete</button></td></tr>)}</tbody></table>
              {filteredStudents.length === 0 && <p className="text-center py-8 text-slate-400">Koi student nahi mila. Search change karo ya Add karo.</p>}
            </div>
          )}

          {/* TEACHERS */}
          {section === "Teachers" && (
            <div className={`rounded-2xl border border-border p-4 ${dark ? "bg-slate-800" : "bg-white"}`}><h2 className="font-heading font-bold text-[18px]">Teachers ({filteredTeachers.length})</h2><div className="grid grid-cols-3 gap-3 mt-4">{filteredTeachers.map(t => <div key={t.id} className="border border-border rounded-xl p-3"><p className="font-bold">{t.name}</p><p className="text-[12px] text-slate-400">{t.subject} • {t.class}</p><p className="text-[13px] mt-2">💰 Salary: {t.salary}</p><p className="text-[12px]">📞 {t.phone}</p><button onClick={() => showToast(`📩 Message sent to ${t.name}`)} className="mt-2 bg-primary text-white px-3 py-1.5 rounded-lg text-[12px] w-full">Send Message</button></div>)}</div></div>
          )}

          {/* ATTENDANCE */}
          {section === "Attendance" && (
            <div className={`rounded-2xl border border-border p-4 ${dark ? "bg-slate-800" : "bg-white"}`}><h2 className="font-heading font-bold text-[18px]">Mark Attendance - Today</h2>{students.map(s => <div key={s.id} className="flex justify-between items-center py-3 border-b border-border/50"><span>{s.name} - {s.class}</span><div className="flex gap-2">{["Present", "Absent", "Late"].map(st => <button key={st} onClick={() => { setAttendance({ ...attendance, [s.id]: st }); showToast(`${s.name} - ${st}`); }} className={`px-3 py-1 rounded-full text-[12px] ${attendance[s.id] === st ? "bg-primary text-white" : "bg-slate-100"}`}>{st}</button>)}</div></div>)}<button onClick={() => showToast("✅ Attendance Saved Successfully!")} className="mt-4 bg-teal text-white px-4 py-2 rounded-lg text-[13px] w-full">Save Attendance</button></div>
          )}

          {/* FEES */}
          {section === "Fees" && (
            <div className={`rounded-2xl border border-border p-4 ${dark ? "bg-slate-800" : "bg-white"}`}><h2 className="font-heading font-bold text-[18px]">Fee Management</h2><p className="text-[13px] text-slate-500">Total Collected: {paidCount} / Pending: {students.length - paidCount}</p>{students.map(s => <div key={s.id} className="flex justify-between py-3 border-b border-border/50"><span>{s.name} - Rs. 5,000 / month</span><button onClick={() => collectFee(s.id)} className={`px-3 py-1 rounded-lg text-[12px] ${s.fee === "Paid" ? "bg-teal-50 text-teal" : "bg-primary text-white"}`}>{s.fee === "Paid" ? "✓ Paid" : "Collect Now"}</button></div>)}</div>
          )}

          {/* OTHER SECTIONS */}
          {["Examinations", "Timetable", "Library", "Transport", "Settings", "Reports"].includes(section) && (
            <div className={`rounded-2xl border border-border p-10 text-center ${dark ? "bg-slate-800" : "bg-white"}`}><div className="text-[40px]">🚀</div><h2 className="font-heading text-[20px] font-bold mt-2">{section} - Advanced Module</h2><p className="text-slate-400 text-[13px]">Is module ka UI ready hai. Data: Students {students.length}, Teachers {teachers.length}</p><div className="flex gap-2 justify-center mt-4"><button onClick={() => setSection("Dashboard")} className="bg-primary text-white px-4 py-2 rounded-lg text-[13px]">← Dashboard</button><button onClick={() => showToast(`${section} Exported as PDF!`)} className="border border-border px-4 py-2 rounded-lg text-[13px]">⬇ Export PDF</button></div></div>
          )}
        </div>

        {/* ADD MODAL */}
        {showAdd && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div className="bg-white rounded-2xl p-6 w-[380px]"><h3 className="font-bold text-[18px]">Add New Student</h3><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full Name" className="w-full border border-border rounded-lg px-3 py-2 mt-3 text-[13px]" /><input value={form.roll} onChange={e => setForm({ ...form, roll: e.target.value })} placeholder="Roll No e.g VL-105" className="w-full border border-border rounded-lg px-3 py-2 mt-2 text-[13px]" /><input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="w-full border border-border rounded-lg px-3 py-2 mt-2 text-[13px]" /><select value={form.class} onChange={e => setForm({ ...form, class: e.target.value })} className="w-full border border-border rounded-lg px-3 py-2 mt-2 text-[13px]">{["Class 8-C", "Class 9-B", "Class 10-A"].map(c => <option key={c}>{c}</option>)}</select><div className="flex gap-2 mt-4"><button onClick={addStudent} className="flex-1 bg-primary text-white py-2 rounded-lg text-[13px]">Save Student</button><button onClick={() => setShowAdd(false)} className="flex-1 border border-border py-2 rounded-lg text-[13px]">Cancel</button></div></div></div>}
      </div>
    </div>
  );
}