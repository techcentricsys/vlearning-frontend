import { useState, useMemo } from "react";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Register from "./components/Register";

const initialStudents = [
  { id: 1, name: "Ayesha Khan", class: "Class 10-A", roll: "VL-101", phone: "0300-1234567", fee: "Paid", attendance: "92%" },
  { id: 2, name: "Muhammad Ali", class: "Class 9-B", roll: "VL-102", phone: "0301-7654321", fee: "Pending", attendance: "88%" },
  { id: 3, name: "Fatima Noor", class: "Class 10-A", roll: "VL-103", phone: "0321-9876543", fee: "Paid", attendance: "95%" },
  { id: 4, name: "Hassan Raza", class: "Class 8-C", roll: "VL-104", phone: "0333-1122334", fee: "Pending", attendance: "81%" },
];
const initialTeachers = [
  { id: 1, name: "Ahmed Raza", subject: "Mathematics", class: "10-A", phone: "0300-1112223", salary: "85,000" },
  { id: 2, name: "Sana Iqbal", subject: "English", class: "9-B", phone: "0300-4445556", salary: "78,000" },
  { id: 3, name: "Bilal Ahmed", subject: "Science", class: "8-C", phone: "0300-7778889", salary: "82,000" },
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
  const [attendance, setAttendance] = useState<Record<number, string>>({});

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };
  const filteredStudents = useMemo(() => students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.toLowerCase().includes(search.toLowerCase())), [students, search]);
  const filteredTeachers = useMemo(() => teachers.filter(t => t.name.toLowerCase().includes(search.toLowerCase())), [teachers, search]);

  const addStudent = () => {
    if (!form.name || !form.roll) return alert("Name and Roll No are required");
    setStudents([...students, { id: Date.now(), name: form.name, class: form.class, roll: form.roll, phone: form.phone, fee: "Pending", attendance: "100%" }]);
    setShowAdd(false); setForm({ name: "", class: "Class 10-A", roll: "", phone: "" }); showToast("Student added successfully");
  };
  const collectFee = (id: number) => { setStudents(students.map(s => s.id === id ? { ...s, fee: "Paid" } : s)); showToast("Fee collected successfully"); };
  const deleteStudent = (id: number) => { if (confirm("Are you sure you want to delete this student?")) { setStudents(students.filter(s => s.id !== id)); showToast("Student deleted"); } };

  if (page === "login") return <Login goRegister={() => setPage("register")} goDashboard={() => setPage("dashboard")} />;
  if (page === "register") return <Register goLogin={() => setPage("login")} goDashboard={() => setPage("dashboard")} />;

  const paidCount = students.filter(s => s.fee === "Paid").length;

  return (
    <div className="flex min-h-screen bg-bg text-text font-sans">
      <Sidebar active={section} onNavigate={(s: string) => { setSection(s); setSearch(""); }} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-border px-6 py-3 flex items-center justify-between sticky top-0 z-10">
          <div><p className="text-[11px] text-muted">VLearnings / {section}</p><p className="font-semibold text-[16px]">{section}</p></div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students, roll no, teachers..." className="w-[380px] bg-bg border border-border px-3 py-2 text-[13px] outline-none focus:border-primary" />
          <div className="flex gap-3 items-center text-[13px]">
            <button onClick={() => showToast("3 new notifications: Fee received, Attendance submitted")} className="border border-border px-3 py-1.5 bg-white">Notifications (3)</button>
            <button onClick={() => setSection("Settings")} className="border border-border px-3 py-1.5 bg-white">Settings</button>
            <button onClick={() => setPage("login")} className="bg-danger text-white px-3 py-1.5 text-[12px] font-medium">Logout</button>
          </div>
        </header>

        <div className="p-6">
          {toast && <div className="fixed top-20 right-6 bg-white border border-border text-text px-4 py-2.5 shadow-md z-50 text-[13px]">{toast}</div>}

          {section === "Dashboard" && (
            <div>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { t: "Total Students", v: students.length, s: "12 new this month" },
                  { t: "Total Teachers", v: teachers.length, s: "2 on leave today" },
                  { t: "Fees Collected", v: `${paidCount}/${students.length}`, s: "Rs. 2,45,000 collected" },
                  { t: "Attendance Today", v: "92%", s: "312 of 340 present" },
                ].map(x => <div key={x.t} className="bg-white border border-border p-4 shadow-sm"><p className="text-[12px] text-muted">{x.t}</p><p className="text-[26px] font-bold mt-1">{x.v}</p><p className="text-[12px] text-teal mt-1">{x.s}</p><div className="h-[3px] bg-bg mt-3"><div className="h-full bg-primary" style={{ width: "70%" }}></div></div></div>)}
              </div>

              <div className="flex gap-2 mt-4 flex-wrap">
                {["Add Student", "Record Attendance", "Collect Fee", "Add Teacher", "Create Exam"].map(a => <button key={a} onClick={() => { if (a.includes("Student")) setSection("Students"); if (a.includes("Attendance")) setSection("Attendance"); if (a.includes("Fee")) setSection("Fees"); if (a.includes("Teacher")) setSection("Teachers"); if (a.includes("Exam")) setSection("Examinations"); }} className="bg-white border border-border px-3 py-2 text-[13px] hover:border-primary hover:text-primary">{a}</button>)}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white border border-border p-4 shadow-sm"><h3 className="font-semibold text-[14px]">Attendance - Last 7 Days</h3><div className="flex items-end gap-2 h-[120px] mt-4 border-b border-border">{[85, 92, 88, 95, 90, 93, 92].map((v, i) => <div key={i} className="flex-1 bg-primary text-white text-[10px] flex items-end justify-center pb-1" style={{ height: `${v}%` }}>{v}%</div>)}</div><div className="flex justify-between text-[11px] text-muted mt-1"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div>
                <div className="bg-white border border-border p-4 shadow-sm"><h3 className="font-semibold text-[14px]">Recent Students</h3>{students.slice(0, 4).map(s => <div key={s.id} className="flex justify-between py-2.5 border-b border-border/60 text-[13px]"><span>{s.name} - {s.class}</span><span className={s.fee === "Paid" ? "text-success font-medium" : "text-amber font-medium"}>{s.fee}</span></div>)}</div>
              </div>
            </div>
          )}

          {section === "Students" && (
            <div className="bg-white border border-border p-4 shadow-sm">
              <div className="flex justify-between items-center"><h2 className="font-semibold text-[16px]">Students ({filteredStudents.length})</h2><button onClick={() => setShowAdd(true)} className="bg-primary text-white px-3 py-2 text-[13px]">+ Add Student</button></div>
              <table className="w-full mt-4 text-[13px]"><thead><tr className="text-left text-muted border-b border-border bg-bg"><th className="py-2 px-2 font-medium">Name</th><th className="font-medium">Class</th><th className="font-medium">Roll No</th><th className="font-medium">Phone</th><th className="font-medium">Fee Status</th><th className="font-medium">Action</th></tr></thead><tbody>{filteredStudents.map(s => <tr key={s.id} className="border-b border-border/60 hover:bg-bg/50"><td className="py-3 px-2 font-medium">{s.name}</td><td>{s.class}</td><td>{s.roll}</td><td>{s.phone}</td><td><span className={`px-2 py-0.5 text-[11px] border ${s.fee === "Paid" ? "bg-green-50 text-success border-green-200" : "bg-amber-50 text-amber border-amber-200"}`}>{s.fee}</span></td><td className="flex gap-1 py-2"><button onClick={() => collectFee(s.id)} className="bg-teal text-white px-2 py-1 text-[11px]">Collect Fee</button><button onClick={() => deleteStudent(s.id)} className="border border-danger/30 text-danger px-2 py-1 text-[11px]">Delete</button></td></tr>)}</tbody></table>
              {filteredStudents.length === 0 && <p className="text-center py-8 text-muted">No student found. Try different search or add new student.</p>}
            </div>
          )}

          {section === "Teachers" && (
            <div className="bg-white border border-border p-4 shadow-sm"><h2 className="font-semibold text-[16px]">Teachers ({filteredTeachers.length})</h2><div className="grid grid-cols-3 gap-3 mt-4">{filteredTeachers.map(t => <div key={t.id} className="border border-border p-3"><p className="font-semibold">{t.name}</p><p className="text-[12px] text-muted">{t.subject} - {t.class}</p><p className="text-[13px] mt-2">Salary: Rs. {t.salary}</p><p className="text-[12px] text-muted">Phone: {t.phone}</p><button onClick={() => showToast(`Message sent to ${t.name}`)} className="mt-3 bg-primary text-white px-3 py-1.5 text-[12px] w-full">Send Message</button></div>)}</div></div>
          )}

          {section === "Attendance" && (
            <div className="bg-white border border-border p-4 shadow-sm"><h2 className="font-semibold text-[16px]">Mark Attendance - Today</h2><p className="text-[12px] text-muted mt-1">Date: 12 Nov 2026 - Select status for each student</p>{students.map(s => <div key={s.id} className="flex justify-between items-center py-3 border-b border-border/60"><span className="text-[13px]">{s.name} - {s.class}</span><div className="flex gap-2">{["Present", "Absent", "Late"].map(st => <button key={st} onClick={() => { setAttendance({ ...attendance, [s.id]: st }); showToast(`${s.name} marked as ${st}`); }} className={`px-3 py-1 text-[12px] border ${attendance[s.id] === st ? "bg-primary text-white border-primary" : "bg-white border-border"}`}>{st}</button>)}</div></div>)}<button onClick={() => showToast("Attendance saved successfully")} className="mt-4 bg-teal text-white px-4 py-2 text-[13px] w-full">Save Attendance</button></div>
          )}

          {section === "Fees" && (
            <div className="bg-white border border-border p-4 shadow-sm"><h2 className="font-semibold text-[16px]">Fee Management</h2><p className="text-[13px] text-muted mt-1">Collected: {paidCount} | Pending: {students.length - paidCount} | Monthly Fee: Rs. 5,000</p>{students.map(s => <div key={s.id} className="flex justify-between items-center py-3 border-b border-border/60"><span className="text-[13px]">{s.name} - {s.class}</span><button onClick={() => collectFee(s.id)} className={`px-3 py-1 text-[12px] ${s.fee === "Paid" ? "bg-green-50 text-success border border-green-200" : "bg-primary text-white"}`}>{s.fee === "Paid" ? "Paid" : "Collect Now"}</button></div>)}</div>
          )}

          {["Examinations", "Timetable", "Library", "Transport", "Settings", "Reports"].includes(section) && (
            <div className="bg-white border border-border p-10 text-center shadow-sm"><h2 className="font-semibold text-[18px]">{section}</h2><p className="text-muted text-[13px] mt-1">{section} module is ready. Total Students: {students.length}, Teachers: {teachers.length}</p><div className="flex gap-2 justify-center mt-4"><button onClick={() => setSection("Dashboard")} className="bg-primary text-white px-4 py-2 text-[13px]">Back to Dashboard</button><button onClick={() => showToast(`${section} exported as PDF`)} className="border border-border px-4 py-2 text-[13px] bg-white">Export PDF</button></div></div>
          )}
        </div>

        {showAdd && <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"><div className="bg-white p-6 w-[380px] shadow-lg"><h3 className="font-semibold text-[16px]">Add New Student</h3><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full Name" className="w-full border border-border px-3 py-2 mt-3 text-[13px] outline-none focus:border-primary" /><input value={form.roll} onChange={e => setForm({ ...form, roll: e.target.value })} placeholder="Roll No e.g VL-105" className="w-full border border-border px-3 py-2 mt-2 text-[13px] outline-none focus:border-primary" /><input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone Number" className="w-full border border-border px-3 py-2 mt-2 text-[13px] outline-none focus:border-primary" /><select value={form.class} onChange={e => setForm({ ...form, class: e.target.value })} className="w-full border border-border px-3 py-2 mt-2 text-[13px]">{["Class 8-C", "Class 9-B", "Class 10-A"].map(c => <option key={c}>{c}</option>)}</select><div className="flex gap-2 mt-4"><button onClick={addStudent} className="flex-1 bg-primary text-white py-2 text-[13px]">Save Student</button><button onClick={() => setShowAdd(false)} className="flex-1 border border-border py-2 text-[13px]">Cancel</button></div></div></div>}
      </div>
    </div>
  );
}