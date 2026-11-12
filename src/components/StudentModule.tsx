import { useState } from "react";

type Student = {
  id: number;
  name: string;
  roll: string;
  className: string;
  guardian: string;
  phone: string;
  gender: string;
  fee: string;
  attendance: string;
};

const initialStudents: Student[] = [
  { id: 1, name: "Ayesha Khan", roll: "VL-101", className: "Class 10-A", guardian: "Ahmed Khan", phone: "0300-1234567", gender: "Female", fee: "Paid", attendance: "92%" },
  { id: 2, name: "Muhammad Ali", roll: "VL-102", className: "Class 9-B", guardian: "Ali Raza", phone: "0301-7654321", gender: "Male", fee: "Pending", attendance: "88%" },
  { id: 3, name: "Fatima Noor", roll: "VL-103", className: "Class 10-A", guardian: "Noor Ahmed", phone: "0321-9876543", gender: "Female", fee: "Paid", attendance: "95%" },
  { id: 4, name: "Hassan Raza", roll: "VL-104", className: "Class 8-C", guardian: "Raza Ahmed", phone: "0333-1112223", gender: "Male", fee: "Pending", attendance: "81%" },
  { id: 5, name: "Sana Iqbal", roll: "VL-105", className: "Class 9-B", guardian: "Iqbal Hussain", phone: "0345-5556667", gender: "Female", fee: "Paid", attendance: "97%" },
];

export default function StudentModule() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState<Student | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  const [form, setForm] = useState({ name: "", roll: "", className: "Class 10-A", guardian: "", phone: "", gender: "Male" });

  const filtered = students.filter((s) => {
    const matchClass = filterClass === "All" || s.className === filterClass;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.toLowerCase().includes(search.toLowerCase());
    return matchClass && matchSearch;
  });

  const resetForm = () => setForm({ name: "", roll: "", className: "Class 10-A", guardian: "", phone: "", gender: "Male" });

  const handleSave = () => {
    if (!form.name || !form.roll) return alert("Name aur Roll No zaroori hai");
    if (editId) {
      setStudents(students.map((s) => (s.id === editId ? { ...s, ...form } : s)));
    } else {
      setStudents([...students, { id: Date.now(), ...form, fee: "Pending", attendance: "100%" }]);
    }
    setShowAdd(false);
    setEditId(null);
    resetForm();
  };

  const handleEdit = (s: Student) => {
    setForm({ name: s.name, roll: s.roll, className: s.className, guardian: s.guardian, phone: s.phone, gender: s.gender });
    setEditId(s.id);
    setShowAdd(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Kya aap is student ko delete karna chahte hain?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="p-6 bg-[#F7F8FA] min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[11px] text-slate-500">VLearnings / Student Management</p>
          <h1 className="text-[20px] font-semibold text-[#1A2332]">Student Management Module</h1>
          <p className="text-[13px] text-slate-500">ERP Style - Separate Screen for Students</p>
        </div>
        <button onClick={() => { resetForm(); setEditId(null); setShowAdd(true); }} className="bg-[#1A2332] text-white px-4 py-2 text-[13px] hover:bg-black">
          + Add New Student
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="bg-white border border-slate-200 p-4"><p className="text-[12px] text-slate-500">Total Students</p><p className="text-[24px] font-bold">{students.length}</p><p className="text-[11px] text-teal-600">All Classes</p></div>
        <div className="bg-white border border-slate-200 p-4"><p className="text-[12px] text-slate-500">Class 10-A</p><p className="text-[24px] font-bold">{students.filter((s) => s.className === "Class 10-A").length}</p><p className="text-[11px] text-slate-500">Section A</p></div>
        <div className="bg-white border border-slate-200 p-4"><p className="text-[12px] text-slate-500">Fee Paid</p><p className="text-[24px] font-bold text-green-600">{students.filter((s) => s.fee === "Paid").length}</p><p className="text-[11px] text-slate-500">This Month</p></div>
        <div className="bg-white border border-slate-200 p-4"><p className="text-[12px] text-slate-500">Fee Pending</p><p className="text-[24px] font-bold text-amber-600">{students.filter((s) => s.fee === "Pending").length}</p><p className="text-[11px] text-slate-500">Need Follow-up</p></div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="bg-white border border-slate-200 p-4 mt-4 flex gap-3">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, roll no..." className="flex-1 border border-slate-200 px-3 py-2 text-[13px] outline-none focus:border-[#1A2332]" />
        <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)} className="border border-slate-200 px-3 py-2 text-[13px] outline-none">
          <option>All</option><option>Class 10-A</option><option>Class 9-B</option><option>Class 8-C</option>
        </select>
        <button onClick={() => { setSearch(""); setFilterClass("All"); }} className="border border-slate-200 px-3 py-2 text-[13px]">Clear</button>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-slate-200 mt-4 overflow-hidden">
        <table className="w-full text-[13px]">
          <thead><tr className="text-left bg-slate-50 border-b border-slate-200 text-slate-500">
            <th className="py-2.5 px-3 font-medium">Student</th><th className="font-medium">Roll No</th><th className="font-medium">Class</th><th className="font-medium">Guardian</th><th className="font-medium">Phone</th><th className="font-medium">Attendance</th><th className="font-medium">Fee</th><th className="font-medium">Action</th>
          </tr></thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-3"><p className="font-medium">{s.name}</p><p className="text-[11px] text-slate-500">{s.gender}</p></td>
                <td>{s.roll}</td><td>{s.className}</td><td>{s.guardian}</td><td>{s.phone}</td><td>{s.attendance}</td>
                <td><span className={`px-2 py-0.5 text-[11px] border ${s.fee === "Paid" ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>{s.fee}</span></td>
                <td className="flex gap-1 py-2">
                  <button onClick={() => setShowView(s)} className="border border-slate-200 px-2 py-1 text-[11px] hover:bg-white">View</button>
                  <button onClick={() => handleEdit(s)} className="border border-slate-200 px-2 py-1 text-[11px] hover:bg-white">Edit</button>
                  <button onClick={() => handleDelete(s.id)} className="border border-red-200 text-red-600 px-2 py-1 text-[11px]">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center py-8 text-slate-500">No student found</p>}
      </div>

      {/* ADD / EDIT MODAL */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-[420px] max-w-[90vw]">
            <h3 className="font-semibold text-[16px]">{editId ? "Edit Student" : "Add New Student"}</h3>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Name *" className="w-full border border-slate-200 px-3 py-2 mt-3 text-[13px]" />
            <input value={form.roll} onChange={(e) => setForm({ ...form, roll: e.target.value })} placeholder="Roll No * e.g VL-106" className="w-full border border-slate-200 px-3 py-2 mt-2 text-[13px]" />
            <input value={form.guardian} onChange={(e) => setForm({ ...form, guardian: e.target.value })} placeholder="Guardian Name" className="w-full border border-slate-200 px-3 py-2 mt-2 text-[13px]" />
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone e.g 0300-1234567" className="w-full border border-slate-200 px-3 py-2 mt-2 text-[13px]" />
            <div className="flex gap-2 mt-2">
              <select value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value })} className="flex-1 border border-slate-200 px-3 py-2 text-[13px]"><option>Class 10-A</option><option>Class 9-B</option><option>Class 8-C</option></select>
              <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="flex-1 border border-slate-200 px-3 py-2 text-[13px]"><option>Male</option><option>Female</option></select>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={handleSave} className="flex-1 bg-[#1A2332] text-white py-2 text-[13px]">{editId ? "Update" : "Save Student"}</button>
              <button onClick={() => { setShowAdd(false); setEditId(null); }} className="flex-1 border border-slate-200 py-2 text-[13px]">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {showView && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-[380px]">
            <div className="flex justify-between"><h3 className="font-semibold">Student Profile</h3><button onClick={() => setShowView(null)}>✕</button></div>
            <div className="flex items-center gap-3 mt-4"><div className="w-12 h-12 bg-slate-100 flex items-center justify-center font-bold text-[18px]">{showView.name.charAt(0)}</div><div><p className="font-semibold">{showView.name}</p><p className="text-[12px] text-slate-500">{showView.roll} • {showView.className}</p></div></div>
            <div className="mt-4 space-y-2 text-[13px]"><p><b>Guardian:</b> {showView.guardian}</p><p><b>Phone:</b> {showView.phone}</p><p><b>Gender:</b> {showView.gender}</p><p><b>Attendance:</b> {showView.attendance}</p><p><b>Fee Status:</b> {showView.fee}</p></div>
            <button onClick={() => setShowView(null)} className="w-full border border-slate-200 py-2 mt-4 text-[13px]">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}