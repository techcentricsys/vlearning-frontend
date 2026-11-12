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
          <div className="flex gap-2 items-center text-[13px]">
            <button onClick={() => showToast("3 new notifications: Fee received, Attendance submitted")} className="btn-press border border-border px-3 py-1.5 bg-white hover:bg-bg">Notifications <span className="bg-danger text-white text-[10px] px-1.5 py-0.5 ml-1">3</span></button>
            <button onClick={() => setSection("Settings")} className="btn-press border border-border px-3 py-1.5 bg-white hover:bg-bg">Settings</button>
            <button onClick={() => setPage("login")} className="btn-press bg-danger text-white px-3 py-1.5 text-[12px] font-medium">Logout</button>
          </div>
        </header>

        <div className="p-6 animate-fade">
          {toast && <div className="fixed top-20 right-6 bg-primary text-white px-4 py-2.5 shadow-lg z-50 text-[13px] animate-slide-up flex items-center gap-2"><span className="w-2 h-2 bg-success"></span>{toast}</div>}

          {section === "Dashboard" && (
            <div className="space-y-4">
              {/* WELCOME BANNER */}
              <div className="bg-primary text-white p-5 flex justify-between items-center animate-slide-up">
                <div>
                  <p className="text-[12px] text-slate-300">Thursday, 12 Nov 2026 • Term 2 - Week 8</p>
                  <h2 className="text-[22px] font-semibold mt-1">Good Morning, Dr. Sarah Jenkins 👋</h2>
                  <p className="text-[13px] text-slate-300 mt-1">Aaj 312 students present hain, 2 teachers leave par hain. 1 fee pending hai jo aaj due hai.</p>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => setSection("Attendance")} className="btn-press bg-white text-primary px-3 py-1.5 text-[12px] font-medium">Mark Attendance</button>
                    <button onClick={() => setSection("Fees")} className="btn-press border border-white/30 px-3 py-1.5 text-[12px]">Collect Fee</button>
                  </div>
                </div>
                <div className="hidden md:block text-right">
                  <p className="text-[36px] font-bold leading-none">92%</p>
                  <p className="text-[11px] text-slate-300 mt-1">Today's Attendance</p>
                  <div className="w-[160px] h-[4px] bg-white/20 mt-2 ml-auto"><div className="h-full bg-white" style={{ width: "92%" }}></div></div>
                </div>
              </div>

              {/* 4 STATS CARDS - ADVANCED */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { t: "Total Students", v: students.length, s: "+12 this month", color: "bg-primary", icon: "S", bar: "86%" },
                  { t: "Total Teachers", v: teachers.length, s: "2 on leave today", color: "bg-teal", icon: "T", bar: "64%" },
                  { t: "Fees Collected", v: `${paidCount}/${students.length}`, s: "Rs. 2,45,000 collected", color: "bg-amber", icon: "Rs", bar: "75%" },
                  { t: "Avg. Attendance", v: "92%", s: "312 of 340 present", color: "bg-success", icon: "%", bar: "92%" },
                ].map((x, i) => (
                  <div key={x.t} style={{ animationDelay: `${i * 60}ms` }} className="bg-white border border-border p-4 shadow-sm card-hover animate-slide-up">
                    <div className="flex justify-between items-start">
                      <p className="text-[12px] text-muted">{x.t}</p>
                      <span className={`w-8 h-8 ${x.color} text-white flex items-center justify-center text-[12px] font-bold`}>{x.icon}</span>
                    </div>
                    <p className="text-[26px] font-bold mt-1">{x.v}</p>
                    <p className="text-[12px] text-teal mt-0.5">{x.s}</p>
                    <div className="h-[4px] bg-bg mt-3"><div className="h-full bg-primary transition-all duration-700" style={{ width: x.bar }}></div></div>
                    <button onClick={() => setSection(x.t.includes("Student") ? "Students" : x.t.includes("Teacher") ? "Teachers" : x.t.includes("Fee") ? "Fees" : "Attendance")} className="text-[11px] text-primary font-medium mt-2">View Details →</button>
                  </div>
                ))}
              </div>

              {/* QUICK ACTIONS */}
              <div className="flex gap-2 flex-wrap animate-slide-up">
                {["Add Student", "Record Attendance", "Collect Fee", "Add Teacher", "Create Exam"].map(a => <button key={a} onClick={() => { if (a.includes("Student")) setSection("Students"); if (a.includes("Attendance")) setSection("Attendance"); if (a.includes("Fee")) setSection("Fees"); if (a.includes("Teacher")) setSection("Teachers"); if (a.includes("Exam")) setSection("Examinations"); }} className="btn-press bg-white border border-border px-3 py-2 text-[13px] hover:border-primary hover:text-primary">{a}</button>)}
              </div>

              {/* CHART + RECENT + TODAY CLASSES */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 bg-white border border-border p-4 shadow-sm card-hover animate-slide-up">
                  <div className="flex justify-between"><h3 className="font-semibold text-[14px]">Attendance - Last 7 Days</h3><span className="text-[11px] bg-green-50 text-success border border-green-200 px-2 py-0.5">+4% vs last week</span></div>
                  <div className="flex items-end gap-2 h-[130px] mt-4 border-b border-border">{[85, 92, 88, 95, 90, 93, 92].map((v, i) => <div key={i} className="flex-1 flex flex-col items-center gap-1"><span className="text-[10px] font-medium">{v}%</span><div className={`w-full ${i === 6 ? "bg-primary" : "bg-slate-200"} flex items-end justify-center`} style={{ height: `${v}px` }}></div></div>)}</div>
                  <div className="flex justify-between text-[11px] text-muted mt-2 px-1"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
                </div>

                <div className="bg-white border border-border p-4 shadow-sm card-hover animate-slide-up">
                  <h3 className="font-semibold text-[14px]">Today's Classes</h3>
                  {[
                    { time: "08:00 - 08:45", sub: "Mathematics - 10-A", teacher: "Ahmed Raza", color: "bg-primary" },
                    { time: "09:00 - 09:45", sub: "English - 9-B", teacher: "Sana Iqbal", color: "bg-teal" },
                    { time: "10:00 - 10:45", sub: "Science - 8-C", teacher: "Bilal Ahmed", color: "bg-amber" },
                  ].map(c => (
                    <div key={c.sub} className="flex gap-3 py-2.5 border-b border-border/60">
                      <div className={`w-1 ${c.color}`}></div>
                      <div><p className="text-[13px] font-medium">{c.sub}</p><p className="text-[11px] text-muted">{c.time} • {c.teacher}</p></div>
                      <span className="ml-auto text-[11px] bg-bg px-1.5 py-0.5 h-fit">Live</span>
                    </div>
                  ))}
                  <button onClick={() => setSection("Timetable")} className="w-full mt-3 border border-border py-1.5 text-[12px] btn-press hover:bg-bg">View Full Timetable</button>
                </div>
              </div>

              {/* RECENT STUDENTS + FEE ALERT */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-border p-4 shadow-sm card-hover animate-slide-up">
                  <div className="flex justify-between"><h3 className="font-semibold text-[14px]">Recent Students</h3><button onClick={() => setSection("Students")} className="text-[12px] text-primary">View All →</button></div>
                  {students.slice(0, 4).map(s => <div key={s.id} className="flex justify-between items-center py-2.5 border-b border-border/60 text-[13px]"><div className="flex gap-2 items-center"><span className="w-7 h-7 bg-slate-100 flex items-center justify-center text-[11px] font-bold">{s.name.charAt(0)}</span><span>{s.name} <span className="text-muted text-[11px]">• {s.class}</span></span></div><span className={s.fee === "Paid" ? "text-success font-medium text-[12px]" : "text-amber font-medium text-[12px]"}>{s.fee}</span></div>)}
                </div>
                <div className="bg-white border border-border p-4 shadow-sm card-hover animate-slide-up">
                  <h3 className="font-semibold text-[14px]">Fee Alerts</h3>
                  <div className="bg-amber-50 border border-amber-200 p-3 mt-3 text-[13px] flex gap-2"><span>⚠</span><span><b>Hassan Raza - Class 8-C</b><br /><span className="text-[12px] text-muted">Rs. 5,000 pending since 5 Nov. Last reminder sent 2 days ago.</span></span></div>
                  <div className="bg-green-50 border border-green-200 p-3 mt-2 text-[13px] flex gap-2"><span>✓</span><span><b>Ayesha Khan - Class 10-A</b><br /><span className="text-[12px] text-muted">Rs. 5,000 paid today via bank transfer.</span></span></div>
                  <button onClick={() => setSection("Fees")} className="btn-press w-full bg-primary text-white py-2 text-[12px] mt-3">Go to Fee Management</button>
                </div>
              </div>
            </div>
          )}

          {section === "Students" && (
            <div className="bg-white border border-border p-4 shadow-sm animate-slide-up">
              <div className="flex justify-between items-center"><h2 className="font-semibold text-[16px]">Students ({filteredStudents.length})</h2><button onClick={() => setShowAdd(true)} className="btn-press bg-primary text-white px-3 py-2 text-[13px]">+ Add Student</button></div>
              <table className="w-full mt-4 text-[13px]"><thead><tr className="text-left text-muted border-b border-border bg-bg"><th className="py-2 px-2 font-medium">Name</th><th className="font-medium">Class</th><th className="font-medium">Roll No</th><th className="font-medium">Phone</th><th className="font-medium">Fee Status</th><th className="font-medium">Action</th></tr></thead><tbody>{filteredStudents.map(s => <tr key={s.id} className="border-b border-border/60 hover:bg-bg/50 transition-colors"><td className="py-3 px-2 font-medium">{s.name}</td><td>{s.class}</td><td>{s.roll}</td><td>{s.phone}</td><td><span className={`px-2 py-0.5 text-[11px] border ${s.fee === "Paid" ? "bg-green-50 text-success border-green-200" : "bg-amber-50 text-amber border-amber-200"}`}>{s.fee}</span></td><td className="flex gap-1 py-2"><button onClick={() => collectFee(s.id)} className="btn-press bg-teal text-white px-2 py-1 text-[11px]">Collect Fee</button><button onClick={() => deleteStudent(s.id)} className="btn-press border border-danger/30 text-danger px-2 py-1 text-[11px]">Delete</button></td></tr>)}</tbody></table>
              {filteredStudents.length === 0 && <p className="text-center py-8 text-muted">No student found. Try different search or add new student.</p>}
            </div>
          )}

          {section === "Teachers" && (
            <div className="bg-white border border-border p-4 shadow-sm animate-slide-up"><h2 className="font-semibold text-[16px]">Teachers ({filteredTeachers.length})</h2><div className="grid grid-cols-3 gap-3 mt-4">{filteredTeachers.map(t => <div key={t.id} className="border border-border p-3 card-hover"><p className="font-semibold">{t.name}</p><p className="text-[12px] text-muted">{t.subject} - {t.class}</p><p className="text-[13px] mt-2">Salary: Rs. {t.salary}</p><p className="text-[12px] text-muted">Phone: {t.phone}</p><button onClick={() => showToast(`Message sent to ${t.name}`)} className="btn-press mt-3 bg-primary text-white px-3 py-1.5 text-[12px] w-full">Send Message</button></div>)}</div></div>
          )}

          {section === "Attendance" && (
            <div className="bg-white border border-border p-4 shadow-sm animate-slide-up"><h2 className="font-semibold text-[16px]">Mark Attendance - Today</h2><p className="text-[12px] text-muted mt-1">Date: 12 Nov 2026 - Select status for each student</p>{students.map(s => <div key={s.id} className="flex justify-between items-center py-3 border-b border-border/60"><span className="text-[13px]">{s.name} - {s.class}</span><div className="flex gap-2">{["Present", "Absent", "Late"].map(st => <button key={st} onClick={() => { setAttendance({ ...attendance, [s.id]: st }); showToast(`${s.name} marked as ${st}`); }} className={`btn-press px-3 py-1 text-[12px] border ${attendance[s.id] === st ? "bg-primary text-white border-primary" : "bg-white border-border"}`}>{st}</button>)}</div></div>)}<button onClick={() => showToast("Attendance saved successfully")} className="btn-press mt-4 bg-teal text-white px-4 py-2 text-[13px] w-full">Save Attendance</button></div>
          )}

          {section === "Fees" && (
            <div className="bg-white border border-border p-4 shadow-sm animate-slide-up"><h2 className="font-semibold text-[16px]">Fee Management</h2><p className="text-[13px] text-muted mt-1">Collected: {paidCount} | Pending: {students.length - paidCount} | Monthly Fee: Rs. 5,000</p>{students.map(s => <div key={s.id} className="flex justify-between items-center py-3 border-b border-border/60"><span className="text-[13px]">{s.name} - {s.class}</span><button onClick={() => collectFee(s.id)} className={`btn-press px-3 py-1 text-[12px] ${s.fee === "Paid" ? "bg-green-50 text-success border border-green-200" : "bg-primary text-white"}`}>{s.fee === "Paid" ? "Paid" : "Collect Now"}</button></div>)}</div>
          )}

          {["Examinations", "Timetable", "Library", "Transport", "Settings", "Reports", "Hostel"].includes(section) && (
            <div className="bg-white border border-border p-10 text-center shadow-sm animate-slide-up"><h2 className="font-semibold text-[18px]">{section}</h2><p className="text-muted text-[13px] mt-1">{section} module is ready. Total Students: {students.length}, Teachers: {teachers.length}</p><div className="flex gap-2 justify-center mt-4"><button onClick={() => setSection("Dashboard")} className="btn-press bg-primary text-white px-4 py-2 text-[13px]">Back to Dashboard</button><button onClick={() => showToast(`${section} exported as PDF`)} className="btn-press border border-border px-4 py-2 text-[13px] bg-white">Export PDF</button></div></div>
          )}
        </div>

        {showAdd && <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fade"><div className="bg-white p-6 w-[380px] shadow-lg animate-slide-up"><h3 className="font-semibold text-[16px]">Add New Student</h3><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full Name" className="w-full border border-border px-3 py-2 mt-3 text-[13px] outline-none focus:border-primary" /><input value={form.roll} onChange={e => setForm({ ...form, roll: e.target.value })} placeholder="Roll No e.g VL-105" className="w-full border border-border px-3 py-2 mt-2 text-[13px] outline-none focus:border-primary" /><input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone Number" className="w-full border border-border px-3 py-2 mt-2 text-[13px] outline-none focus:border-primary" /><select value={form.class} onChange={e => setForm({ ...form, class: e.target.value })} className="w-full border border-border px-3 py-2 mt-2 text-[13px]">{["Class 8-C", "Class 9-B", "Class 10-A"].map(c => <option key={c}>{c}</option>)}</select><div className="flex gap-2 mt-4"><button onClick={addStudent} className="btn-press flex-1 bg-primary text-white py-2 text-[13px]">Save Student</button><button onClick={() => setShowAdd(false)} className="btn-press flex-1 border border-border py-2 text-[13px]">Cancel</button></div></div></div>}
      </div>
    </div>
  );
}