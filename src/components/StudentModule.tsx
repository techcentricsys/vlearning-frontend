
import { useMemo, useState, useEffect } from "react";

type Tab =
  | "Overview"
  | "Students"
  | "Admissions"
  | "Attendance"
  | "Academic Records"
  | "ID Cards";

type Student = {
  id: number;
  name: string;
  roll: string;
  className: string;
  section: string;
  guardian: string;
  guardianRelation: string;
  phone: string;
  email: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  admissionDate: string;
  previousSchool: string;
  fee: "Paid" | "Pending";
  attendance: string;
  admissionStatus: "Approved" | "Pending" | "Rejected";
};

type StudentForm = Omit<Student, "id" | "fee" | "attendance" | "admissionStatus">;

const initialStudents: Student[] = [
  {
    id: 1,
    name: "Ayesha Khan",
    roll: "VL-101",
    className: "Class 10-A",
    section: "A",
    guardian: "Ahmed Khan",
    guardianRelation: "Father",
    phone: "0300-1234567",
    email: "ayesha@example.com",
    address: "Lahore, Pakistan",
    dateOfBirth: "2010-05-12",
    gender: "Female",
    admissionDate: "2022-04-10",
    previousSchool: "City Public School",
    fee: "Paid",
    attendance: "92%",
    admissionStatus: "Approved",
  },
  {
    id: 2,
    name: "Muhammad Ali",
    roll: "VL-102",
    className: "Class 9-B",
    section: "B",
    guardian: "Ali Raza",
    guardianRelation: "Father",
    phone: "0301-7654321",
    email: "ali@example.com",
    address: "Lahore, Pakistan",
    dateOfBirth: "2011-02-18",
    gender: "Male",
    admissionDate: "2023-04-12",
    previousSchool: "Bright Future School",
    fee: "Pending",
    attendance: "88%",
    admissionStatus: "Approved",
  },
  {
    id: 3,
    name: "Fatima Noor",
    roll: "VL-103",
    className: "Class 10-A",
    section: "A",
    guardian: "Noor Ahmed",
    guardianRelation: "Father",
    phone: "0321-9876543",
    email: "fatima@example.com",
    address: "Model Town, Lahore",
    dateOfBirth: "2010-09-21",
    gender: "Female",
    admissionDate: "2022-04-15",
    previousSchool: "The Learning School",
    fee: "Paid",
    attendance: "95%",
    admissionStatus: "Approved",
  },
  {
    id: 4,
    name: "Hassan Raza",
    roll: "VL-104",
    className: "Class 8-C",
    section: "C",
    guardian: "Raza Ahmed",
    guardianRelation: "Father",
    phone: "0333-1112223",
    email: "hassan@example.com",
    address: "Johar Town, Lahore",
    dateOfBirth: "2012-01-08",
    gender: "Male",
    admissionDate: "2024-04-08",
    previousSchool: "Al Noor School",
    fee: "Pending",
    attendance: "81%",
    admissionStatus: "Approved",
  },
  {
    id: 5,
    name: "Sana Iqbal",
    roll: "VL-105",
    className: "Class 9-B",
    section: "B",
    guardian: "Iqbal Hussain",
    guardianRelation: "Father",
    phone: "0345-5556667",
    email: "sana@example.com",
    address: "DHA, Lahore",
    dateOfBirth: "2011-11-03",
    gender: "Female",
    admissionDate: "2023-04-20",
    previousSchool: "Knowledge Academy",
    fee: "Paid",
    attendance: "97%",
    admissionStatus: "Approved",
  },
];

const emptyForm: StudentForm = {
  name: "",
  roll: "",
  className: "Class 10-A",
  section: "A",
  guardian: "",
  guardianRelation: "Father",
  phone: "",
  email: "",
  address: "",
  dateOfBirth: "",
  gender: "Male",
  admissionDate: new Date().toISOString().slice(0, 10),
  previousSchool: "",
};

const classes = ["Class 8-C", "Class 9-B", "Class 10-A"];

const subjects = ["English", "Mathematics", "Science", "Urdu", "Computer"];

const inputClass =
  "w-full rounded-2xl border border-indigo-100 bg-white shadow-[0_2px_12px_rgba(67,56,202,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-[0_8px_24px_rgba(67,56,202,0.12)] px-3 py-2.5 text-[13px] outline-none focus:border-indigo-600";

const labelClass = "mb-1.5 block text-[12px] font-medium text-slate-600";

function statusClass(status: string) {
  if (status === "Paid" || status === "Approved" || status === "Present") {
    return "border-green-200 bg-green-50 text-green-700";
  }

  if (status === "Rejected" || status === "Absent") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  return "border-amber-200 bg-amber-50 text-amber-700";
}

export default function StudentModule({ initialTab = "Overview", onBack }: { initialTab?: string; onBack?: () => void }) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  useEffect(() => { setActiveTab(initialTab as Tab); }, [initialTab]);
  const [attendanceOverviewLoading, setAttendanceOverviewLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setAttendanceOverviewLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<StudentForm>(emptyForm);
  const [toast, setToast] = useState("");

  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [attendanceSubject, setAttendanceSubject] = useState("Daily Attendance");

  const [academicRecords, setAcademicRecords] = useState<
    Record<number, { subject: string; marks: string; total: string; exam: string }[]>
  >({
    1: [
      { subject: "Mathematics", marks: "85", total: "100", exam: "Mid Term" },
      { subject: "English", marks: "78", total: "100", exam: "Mid Term" },
      { subject: "Science", marks: "91", total: "100", exam: "Mid Term" },
    ],
    2: [
      { subject: "Mathematics", marks: "72", total: "100", exam: "Mid Term" },
      { subject: "English", marks: "80", total: "100", exam: "Mid Term" },
    ],
  });

  const [academicStudentId, setAcademicStudentId] = useState(1);
  const [academicForm, setAcademicForm] = useState({
    subject: "Mathematics",
    marks: "",
    total: "100",
    exam: "Mid Term",
  });

  const [admissionFilter, setAdmissionFilter] = useState("All");

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2500);
  };

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesClass =
        filterClass === "All" || student.className === filterClass;

      const term = search.toLowerCase();
      const matchesSearch =
        student.name.toLowerCase().includes(term) ||
        student.roll.toLowerCase().includes(term) ||
        student.guardian.toLowerCase().includes(term);

      return matchesClass && matchesSearch;
    });
  }, [students, filterClass, search]);

  const paidCount = students.filter((s) => s.fee === "Paid").length;
  const pendingCount = students.filter((s) => s.fee === "Pending").length;
  const approvedCount = students.filter(
    (s) => s.admissionStatus === "Approved"
  ).length;

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (student: Student) => {
    const { id, fee, attendance, admissionStatus, ...studentForm } = student;
    setForm(studentForm);
    setEditingId(id);
    setShowForm(true);
  };

  const saveStudent = () => {
    if (!form.name.trim() || !form.roll.trim() || !form.guardian.trim()) {
      notify("Name, Roll No and Guardian are required");
      return;
    }

    if (
      students.some(
        (s) =>
          s.roll.toLowerCase() === form.roll.trim().toLowerCase() &&
          s.id !== editingId
      )
    ) {
      notify("This Roll No already exists");
      return;
    }

    if (editingId !== null) {
      setStudents((current) =>
        current.map((s) =>
          s.id === editingId ? { ...s, ...form } : s
        )
      );
      notify("Student profile updated");
    } else {
      setStudents((current) => [
        ...current,
        {
          id: Date.now(),
          ...form,
          fee: "Pending",
          attendance: "100%",
          admissionStatus: "Approved",
        },
      ]);
      notify("Student added successfully");
    }

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const deleteStudent = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    setStudents((current) => current.filter((s) => s.id !== id));
    if (selectedStudent?.id === id) setSelectedStudent(null);
    notify("Student deleted");
  };

  const updateAdmissionStatus = (
    id: number,
    status: Student["admissionStatus"]
  ) => {
    setStudents((current) =>
      current.map((s) =>
        s.id === id ? { ...s, admissionStatus: status } : s
      )
    );
    notify(`Admission ${status.toLowerCase()}`);
  };

  const markAttendance = (studentId: number, status: string) => {
    const key = `${attendanceDate}-${attendanceSubject}-${studentId}`;
    setAttendance((current) => ({ ...current, [key]: status }));
  };

  const getAttendance = (studentId: number) => {
    const key = `${attendanceDate}-${attendanceSubject}-${studentId}`;
    return attendance[key] || "";
  };

  const saveAttendance = () => {
    notify("Attendance saved in this session");
  };

  const addAcademicRecord = () => {
    if (!academicForm.marks || !academicForm.total) {
      notify("Please enter marks and total marks");
      return;
    }

    const marks = Number(academicForm.marks);
    const total = Number(academicForm.total);

    if (
      !Number.isFinite(marks) ||
      !Number.isFinite(total) ||
      total <= 0 ||
      marks < 0 ||
      marks > total
    ) {
      notify("Please enter valid marks");
      return;
    }

    setAcademicRecords((current) => ({
      ...current,
      [academicStudentId]: [
        ...(current[academicStudentId] || []),
        { ...academicForm },
      ],
    }));

    setAcademicForm({
      subject: "Mathematics",
      marks: "",
      total: "100",
      exam: "Mid Term",
    });

    notify("Academic record added");
  };
const displayedAdmissions = students.filter((s) =>
    admissionFilter === "All" ? true : s.admissionStatus === admissionFilter
  );

  const selectedAcademicStudent =
    students.find((s) => s.id === academicStudentId) || students[0];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      {toast && (
        <div className="fixed right-6 top-20 z-[100] border border-indigo-200 bg-indigo-700 px-4 py-3 text-[13px] text-white shadow-lg">
          {toast}
        </div>
      )}

      {/* PAGE HEADER */}
      <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          {activeTab !== "Overview" && (
            <button
              type="button"
              onClick={() => {
                setActiveTab("Overview");
                onBack?.();
              }}
              className="mb-3 inline-flex items-center gap-2 rounded-lg border border-indigo-200 bg-white px-3 py-2 text-[12px] font-semibold text-indigo-700 shadow-sm hover:bg-indigo-50"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Back
            </button>
          )}
          <p className="text-[11px] text-slate-500">
            VLearnings / Student Management
          </p>
          <h1 className="mt-1 text-[22px] font-bold text-slate-900">
            Student Management
          </h1>
          <p className="mt-1 text-[13px] text-slate-500">
            Manage student profiles, admissions, attendance and academic
            performance.
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="rounded-xl border border-indigo-800 bg-indigo-700 px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-900 hover:bg-indigo-800 hover:shadow-md active:translate-y-0"
        >
          + Add New Student
        </button>
      </div>


      {/* OVERVIEW */}
      {activeTab === "Overview" && (
        <>
          <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Total Students",
                value: students.length,
                note: "Currently registered",
                color: "text-indigo-700",
              },
              {
                title: "Class 10-A",
                value: students.filter((s) => s.className === "Class 10-A")
                  .length,
                note: "Students in this class",
                color: "text-blue-700",
              },
              {
                title: "Fee Paid",
                value: paidCount,
                note: "This month",
                color: "text-green-700",
              },
              {
                title: "Fee Pending",
                value: pendingCount,
                note: "Need follow-up",
                color: "text-amber-700",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-indigo-100 bg-white shadow-[0_2px_12px_rgba(67,56,202,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-[0_8px_24px_rgba(67,56,202,0.12)] p-4 shadow-sm"
              >
                <p className="text-[12px] text-slate-500">{item.title}</p>
                <p className={`mt-2 text-[27px] font-bold ${item.color}`}>
                  {item.value}
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  {item.note}
                </p>
              </div>
            ))}
          </div>

          <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-indigo-100 bg-white shadow-[0_2px_12px_rgba(67,56,202,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-[0_8px_24px_rgba(67,56,202,0.12)] p-4">
              <p className="text-[13px] font-semibold text-slate-800">
                Admission Overview
              </p>
              <p className="mt-3 text-[26px] font-bold text-indigo-700">
                {approvedCount}
              </p>
              <p className="text-[12px] text-slate-500">
                Approved admissions
              </p>
            </div>

            <div className="rounded-2xl border border-indigo-100 bg-white shadow-[0_2px_12px_rgba(67,56,202,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-[0_8px_24px_rgba(67,56,202,0.12)] p-4">
              <p className="text-[13px] font-semibold text-slate-800">
                Attendance Overview
              </p>
              {attendanceOverviewLoading ? (
                <div className="mt-3 animate-pulse space-y-2">
                  <div className="h-8 w-24 rounded-lg bg-slate-200" />
                  <div className="h-3 w-40 rounded-md bg-slate-100" />
                </div>
              ) : (
                <>
                  <p className="mt-3 text-[26px] font-bold text-teal-700">
                    {students.length
                      ? Math.round(
                          students.reduce(
                            (sum, s) => sum + Number.parseInt(s.attendance, 10),
                            0
                          ) / students.length
                        )
                      : 0}%
                  </p>
                  <p className="text-[12px] text-slate-500">
                    Average recorded attendance
                  </p>
                </>
              )}
            </div>

            <div className="rounded-2xl border border-indigo-100 bg-white shadow-[0_2px_12px_rgba(67,56,202,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-[0_8px_24px_rgba(67,56,202,0.12)] p-4">
              <p className="text-[13px] font-semibold text-slate-800">
                Academic Records
              </p>
              <p className="mt-3 text-[26px] font-bold text-amber-700">
                {Object.values(academicRecords).reduce(
                  (sum, records) => sum + records.length,
                  0
                )}
              </p>
              <p className="text-[12px] text-slate-500">
                Recorded subject results
              </p>
            </div>
          </div>
          <StudentTable
            students={filteredStudents}
            search={search}
            setSearch={setSearch}
            filterClass={filterClass}
            setFilterClass={setFilterClass}
            onView={setSelectedStudent}
            onEdit={openEditForm}
            onDelete={deleteStudent}
            onAdd={openAddForm}
          />
        </>
      )}

      {/* STUDENTS */}
      {activeTab === "Students" && (
        <StudentTable
          students={filteredStudents}
          search={search}
          setSearch={setSearch}
          filterClass={filterClass}
          setFilterClass={setFilterClass}
          onView={setSelectedStudent}
          onEdit={openEditForm}
          onDelete={deleteStudent}
          onAdd={openAddForm}
        />
      )}

      {/* ADMISSIONS */}
      {activeTab === "Admissions" && (
        <div className="rounded-2xl border border-indigo-100 bg-white shadow-[0_2px_12px_rgba(67,56,202,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-[0_8px_24px_rgba(67,56,202,0.12)] p-4">
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-[16px] font-semibold text-slate-900">
                Admission Management
              </h2>
              <p className="mt-1 text-[12px] text-slate-500">
                Review student enrollment and admission status.
              </p>
            </div>
            <select
              value={admissionFilter}
              onChange={(e) => setAdmissionFilter(e.target.value)}
              className={inputClass + " sm:w-44"}
            >
              <option value="All">All Admissions</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-[13px]">
              <thead className="bg-slate-50 text-[12px] text-slate-500">
                <tr>
                  <th className="p-3 font-medium">Student</th>
                  <th className="p-3 font-medium">Roll No</th>
                  <th className="p-3 font-medium">Class</th>
                  <th className="p-3 font-medium">Admission Date</th>
                  <th className="p-3 font-medium">Previous School</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Update Status</th>
                </tr>
              </thead>
              <tbody>
                {displayedAdmissions.map((s) => (
                  <tr key={s.id} className="border-t border-slate-100">
                    <td className="p-3 font-medium">{s.name}</td>
                    <td className="p-3">{s.roll}</td>
                    <td className="p-3">{s.className}</td>
                    <td className="p-3">{s.admissionDate || "-"}</td>
                    <td className="p-3">{s.previousSchool || "-"}</td>
                    <td className="p-3">
                      <span
                        className={`border px-2 py-1 text-[11px] ${statusClass(
                          s.admissionStatus
                        )}`}
                      >
                        {s.admissionStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={s.admissionStatus}
                        onChange={(e) =>
                          updateAdmissionStatus(
                            s.id,
                            e.target.value as Student["admissionStatus"]
                          )
                        }
                        className="border border-slate-200 px-2 py-1.5 text-[12px]"
                      >
                        <option>Pending</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {displayedAdmissions.length === 0 && (
              <p className="py-8 text-center text-[13px] text-slate-500">
                No admission records found.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ATTENDANCE */}
      {activeTab === "Attendance" && (
        <div className="rounded-2xl border border-indigo-100 bg-white shadow-[0_2px_12px_rgba(67,56,202,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-[0_8px_24px_rgba(67,56,202,0.12)] p-4">
          <div className="mb-5">
            <h2 className="text-[16px] font-semibold text-slate-900">
              Student Attendance
            </h2>
            <p className="mt-1 text-[12px] text-slate-500">
              Record daily or subject-wise student attendance.
            </p>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Attendance Date</label>
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Attendance Type</label>
              <select
                value={attendanceSubject}
                onChange={(e) => setAttendanceSubject(e.target.value)}
                className={inputClass}
              >
                <option>Daily Attendance</option>
                {subjects.map((subject) => (
                  <option key={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-[13px]">
              <thead className="bg-slate-50 text-[12px] text-slate-500">
                <tr>
                  <th className="p-3 font-medium">Student</th>
                  <th className="p-3 font-medium">Roll No</th>
                  <th className="p-3 font-medium">Class</th>
                  <th className="p-3 font-medium">Attendance Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="border-t border-slate-100">
                    <td className="p-3 font-medium">{s.name}</td>
                    <td className="p-3">{s.roll}</td>
                    <td className="p-3">{s.className}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-2">
                        {["Present", "Absent", "Late"].map((status) => (
                          <button
                            key={status}
                            onClick={() => markAttendance(s.id, status)}
                            className={`border px-3 py-1.5 text-[11px] ${
                              getAttendance(s.id) === status
                                ? "border-indigo-700 bg-indigo-700 text-white"
                                : "border-slate-200 bg-white text-slate-600 hover:border-indigo-400"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={saveAttendance}
            className="mt-5 rounded-xl border border-indigo-800 bg-indigo-700 px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-800 hover:shadow-md"
          >
            Save Attendance
          </button>
          <p className="mt-2 text-[11px] text-slate-400">
            Attendance changes are currently held in frontend session state.
          </p>
        </div>
      )}

      {/* ACADEMIC RECORDS */}
      {activeTab === "Academic Records" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-indigo-100 bg-white shadow-[0_2px_12px_rgba(67,56,202,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-[0_8px_24px_rgba(67,56,202,0.12)] p-4">
            <h2 className="text-[16px] font-semibold text-slate-900">
              Academic Performance
            </h2>
            <p className="mt-1 text-[12px] text-slate-500">
              Select a student to view and add examination results.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Select Student</label>
                <select
                  value={academicStudentId}
                  onChange={(e) => setAcademicStudentId(Number(e.target.value))}
                  className={inputClass}
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.roll})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Class</label>
                <input
                  readOnly
                  value={selectedAcademicStudent?.className || ""}
                  className={inputClass + " bg-slate-50"}
                />
              </div>
            </div>
          </div>

          {selectedAcademicStudent && (
            <div className="rounded-2xl border border-indigo-100 bg-white shadow-[0_2px_12px_rgba(67,56,202,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-[0_8px_24px_rgba(67,56,202,0.12)] p-4">
              <h3 className="text-[14px] font-semibold text-slate-800">
                Add Examination Result
              </h3>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className={labelClass}>Subject</label>
                  <select
                    value={academicForm.subject}
                    onChange={(e) =>
                      setAcademicForm({
                        ...academicForm,
                        subject: e.target.value,
                      })
                    }
                    className={inputClass}
                  >
                    {subjects.map((subject) => (
                      <option key={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Exam</label>
                  <select
                    value={academicForm.exam}
                    onChange={(e) =>
                      setAcademicForm({
                        ...academicForm,
                        exam: e.target.value,
                      })
                    }
                    className={inputClass}
                  >
                    <option>Mid Term</option>
                    <option>Final Term</option>
                    <option>Monthly Test</option>
                    <option>Quiz</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Obtained Marks</label>
                  <input
                    type="number"
                    min="0"
                    value={academicForm.marks}
                    onChange={(e) =>
                      setAcademicForm({
                        ...academicForm,
                        marks: e.target.value,
                      })
                    }
                    placeholder="e.g. 85"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Total Marks</label>
                  <input
                    type="number"
                    min="1"
                    value={academicForm.total}
                    onChange={(e) =>
                      setAcademicForm({
                        ...academicForm,
                        total: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <button
                onClick={addAcademicRecord}
                className="mt-4 rounded-xl border border-indigo-800 bg-indigo-700 px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-800 hover:shadow-md"
              >
                + Add Result
              </button>
            </div>
          )}

          <div className="rounded-2xl border border-indigo-100 bg-white shadow-[0_2px_12px_rgba(67,56,202,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-[0_8px_24px_rgba(67,56,202,0.12)] p-4">
            <h3 className="mb-3 text-[14px] font-semibold text-slate-800">
              Academic History - {selectedAcademicStudent?.name || "No Student"}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] text-left text-[13px]">
                <thead className="bg-slate-50 text-[12px] text-slate-500">
                  <tr>
                    <th className="p-3 font-medium">Subject</th>
                    <th className="p-3 font-medium">Exam</th>
                    <th className="p-3 font-medium">Obtained</th>
                    <th className="p-3 font-medium">Total</th>
                    <th className="p-3 font-medium">Percentage</th>
                    <th className="p-3 font-medium">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {(academicRecords[academicStudentId] || []).map(
                    (record, index) => {
                      const percentage =
                        (Number(record.marks) / Number(record.total)) * 100;
                      const grade =
                        percentage >= 80
                          ? "A"
                          : percentage >= 70
                            ? "B"
                            : percentage >= 60
                              ? "C"
                              : percentage >= 50
                                ? "D"
                                : "F";

                      return (
                        <tr
                          key={`${record.subject}-${index}`}
                          className="border-t border-slate-100"
                        >
                          <td className="p-3 font-medium">{record.subject}</td>
                          <td className="p-3">{record.exam}</td>
                          <td className="p-3">{record.marks}</td>
                          <td className="p-3">{record.total}</td>
                          <td className="p-3">{percentage.toFixed(1)}%</td>
                          <td className="p-3 font-semibold text-indigo-700">
                            {grade}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>

              {(academicRecords[academicStudentId] || []).length === 0 && (
                <p className="py-8 text-center text-[13px] text-slate-500">
                  No academic records added for this student.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ID CARDS */}
      {activeTab === "ID Cards" && (
        <div>
          <div className="mb-4">
            <h2 className="text-[16px] font-semibold text-slate-900">
              Student ID Cards
            </h2>
            <p className="mt-1 text-[12px] text-slate-500">
              Preview and print student identity cards.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredStudents.map((s) => (
              <div
                key={s.id}
                className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-[0_2px_12px_rgba(67,56,202,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-[0_8px_24px_rgba(67,56,202,0.12)]"
              >
                <div
                  id={`student-card-${s.id}`}
                  className="mx-auto w-full max-w-[340px] bg-white p-4"
                >
                  <div className="flex items-center gap-3 border-b-2 border-indigo-700 pb-3">
                    <div className="flex h-10 w-10 items-center justify-center bg-indigo-700 text-[18px] font-bold text-white">
                      V
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-indigo-800">
                        VLEARNINGS
                      </p>
                      <p className="text-[10px] text-slate-500">
                        STUDENT IDENTITY CARD
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 py-4">
                    <div className="flex h-[76px] w-[65px] shrink-0 items-center justify-center border border-slate-200 bg-slate-100 text-[25px] font-bold text-indigo-700">
                      {s.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[14px] font-bold text-slate-900">
                        {s.name}
                      </p>
                      <p className="mt-1 text-[11px] text-slate-500">
                        Roll No: {s.roll}
                      </p>
                      
          <p className="text-[11px] text-slate-500">
                        Class: {s.className}
                      </p>
                      
          <p className="text-[11px] text-slate-500">
                        Section: {s.section}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-2 text-[10px] text-slate-600">
                    <p>Guardian: {s.guardian}</p>
                    <p className="mt-1">Phone: {s.phone}</p>
                  </div>

                  <div className="mt-3 bg-indigo-700 py-2 text-center text-[10px] font-medium tracking-wider text-white">
                    STUDENT ID CARD
                  </div>
                </div>

                <div className="border-t border-slate-200 p-3">
                  <button
                    onClick={() => {
                      const card = document.getElementById(
                        `student-card-${s.id}`
                      );
                      if (!card) return;

                      const printWindow = window.open("", "_blank");
                      if (!printWindow) {
                        notify("Please allow pop-ups to print the ID card");
                        return;
                      }

                      printWindow.document.write(`
                        <html>
                          <head>
                            <title>Student ID - ${s.roll}</title>
                            <script src="https://cdn.tailwindcss.com"></script>
                            <style>
                              body { font-family: Arial, sans-serif; padding: 24px; }
                              @media print { body { padding: 0; } }
                            </style>
                          </head>
                          <body>${card.outerHTML}</body>
                        </html>
                      `);
                      printWindow.document.close();
                      printWindow.focus();
                      printWindow.print();
                    }}
                    className="w-full rounded-xl border border-indigo-800 bg-indigo-700 px-4 py-2 text-[12px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-800 hover:shadow-md"
                  >
                    Print ID Card
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD / EDIT STUDENT FORM */}
      {showForm && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-3">
          <div className="my-auto max-h-[95vh] w-full max-w-[760px] overflow-y-auto bg-white p-5 shadow-xl md:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-[18px] font-bold text-slate-900">
                  {editingId !== null ? "Edit Student Profile" : "New Student Admission"}
                </h2>
                <p className="mt-1 text-[12px] text-slate-500">
                  Enter personal, guardian and enrollment details.
                </p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="px-2 text-[22px] text-slate-500 hover:text-slate-900"
              >
                X
              </button>
            </div>

            <div className="mb-4 border-b border-slate-200 pb-2">
              <p className="text-[13px] font-semibold text-indigo-700">
                Personal Information
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <FormField label="Student Full Name *">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter full name"
                  className={inputClass}
                />
              </FormField>
              <FormField label="Roll Number *">
                <input
                  value={form.roll}
                  onChange={(e) => setForm({ ...form, roll: e.target.value })}
                  placeholder="e.g. VL-106"
                  className={inputClass}
                />
              </FormField>
              <FormField label="Gender">
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className={inputClass}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </FormField>
              <FormField label="Date of Birth">
                <input
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(e) =>
                    setForm({ ...form, dateOfBirth: e.target.value })
                  }
                  className={inputClass}
                />
              </FormField>
            </div>

            <div className="mb-4 mt-6 border-b border-slate-200 pb-2">
              <p className="text-[13px] font-semibold text-indigo-700">
                Contact & Guardian Details
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <FormField label="Guardian Name *">
                <input
                  value={form.guardian}
                  onChange={(e) =>
                    setForm({ ...form, guardian: e.target.value })
                  }
                  placeholder="Parent / Guardian name"
                  className={inputClass}
                />
              </FormField>
              <FormField label="Relationship">
                <select
                  value={form.guardianRelation}
                  onChange={(e) =>
                    setForm({ ...form, guardianRelation: e.target.value })
                  }
                  className={inputClass}
                >
                  <option>Father</option>
                  <option>Mother</option>
                  <option>Guardian</option>
                  <option>Other</option>
                </select>
              </FormField>
              <FormField label="Contact Number">
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="03XX-XXXXXXX"
                  className={inputClass}
                />
              </FormField>
              <FormField label="Email Address">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="student@example.com"
                  className={inputClass}
                />
              </FormField>
              <div className="sm:col-span-2">
                <FormField label="Residential Address">
                  <textarea
                    rows={2}
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    placeholder="Enter residential address"
                    className={inputClass}
                  />
                </FormField>
              </div>
            </div>

            <div className="mb-4 mt-6 border-b border-slate-200 pb-2">
              <p className="text-[13px] font-semibold text-indigo-700">
                Enrollment & Class Assignment
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <FormField label="Class Assignment">
                <select
                  value={form.className}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      className: e.target.value,
                      section: e.target.value.slice(-1),
                    })
                  }
                  className={inputClass}
                >
                  {classes.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </FormField>
              <FormField label="Section">
                <select
                  value={form.section}
                  onChange={(e) => setForm({ ...form, section: e.target.value })}
                  className={inputClass}
                >
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                </select>
              </FormField>
              <FormField label="Admission Date">
                <input
                  type="date"
                  value={form.admissionDate}
                  onChange={(e) =>
                    setForm({ ...form, admissionDate: e.target.value })
                  }
                  className={inputClass}
                />
              </FormField>
              <FormField label="Previous School">
                <input
                  value={form.previousSchool}
                  onChange={(e) =>
                    setForm({ ...form, previousSchool: e.target.value })
                  }
                  placeholder="Previous school name"
                  className={inputClass}
                />
              </FormField>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end">
              <button
                onClick={() => setShowForm(false)}
                className="border border-slate-200 px-5 py-2.5 text-[13px] text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={saveStudent}
                className="bg-indigo-700 px-5 py-2.5 text-[13px] font-medium text-white hover:bg-indigo-800"
              >
                {editingId !== null ? "Update Student" : "Save Student"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STUDENT PROFILE VIEW */}
      {selectedStudent && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-3">
          <div className="my-auto max-h-[90vh] w-full max-w-[600px] overflow-y-auto bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                
          <p className="text-[11px] text-slate-500">
                  Student Management / Profile
                </p>
                <h2 className="mt-1 text-[19px] font-bold text-slate-900">
                  Student Profile
                </h2>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-2 text-[22px] text-slate-500"
              >
                X
              </button>
            </div>

            <div className="mt-5 flex items-center gap-4 border-b border-slate-200 pb-5">
              <div className="flex h-16 w-16 items-center justify-center bg-indigo-100 text-[25px] font-bold text-indigo-700">
                {selectedStudent.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-[17px] font-semibold text-slate-900">
                  {selectedStudent.name}
                </h3>
                <p className="mt-1 text-[12px] text-slate-500">
                  {selectedStudent.roll} | {selectedStudent.className}
                </p>
                <span
                  className={`mt-2 inline-block border px-2 py-1 text-[10px] ${statusClass(
                    selectedStudent.admissionStatus
                  )}`}
                >
                  {selectedStudent.admissionStatus}
                </span>
              </div>
            </div>

            <ProfileSection title="Personal Information">
              <ProfileItem label="Gender" value={selectedStudent.gender} />
              <ProfileItem
                label="Date of Birth"
                value={selectedStudent.dateOfBirth}
              />
              <ProfileItem
                label="Admission Date"
                value={selectedStudent.admissionDate}
              />
            </ProfileSection>

            <ProfileSection title="Guardian & Contact">
              <ProfileItem
                label="Guardian"
                value={selectedStudent.guardian}
              />
              <ProfileItem
                label="Relationship"
                value={selectedStudent.guardianRelation}
              />
              <ProfileItem label="Phone" value={selectedStudent.phone} />
              <ProfileItem label="Email" value={selectedStudent.email} />
              <ProfileItem label="Address" value={selectedStudent.address} />
            </ProfileSection>

            <ProfileSection title="Enrollment Details">
              <ProfileItem label="Class" value={selectedStudent.className} />
              <ProfileItem label="Section" value={selectedStudent.section} />
              <ProfileItem
                label="Previous School"
                value={selectedStudent.previousSchool}
              />
            </ProfileSection>

            <ProfileSection title="Academic & Fee Summary">
              <ProfileItem
                label="Attendance"
                value={selectedStudent.attendance}
              />
              <ProfileItem label="Fee Status" value={selectedStudent.fee} />
            </ProfileSection>

            <button
              onClick={() => setSelectedStudent(null)}
              className="mt-5 w-full border border-slate-200 py-2.5 text-[13px] hover:bg-slate-50"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StudentTable({
  students,
  search,
  setSearch,
  filterClass,
  setFilterClass,
  onView,
  onEdit,
  onDelete,
  onAdd,
}: {
  students: Student[];
  search: string;
  setSearch: (value: string) => void;
  filterClass: string;
  setFilterClass: (value: string) => void;
  onView: (student: Student) => void;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
}) {
  return (
    <div className="rounded-2xl border border-indigo-100 bg-white shadow-[0_2px_12px_rgba(67,56,202,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-[0_8px_24px_rgba(67,56,202,0.12)]">
      <div className="flex flex-col justify-between gap-3 border-b border-slate-200 p-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-[15px] font-semibold text-slate-900">
            Student Directory
          </h2>
          <p className="mt-1 text-[12px] text-slate-500">
            {students.length} student records
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, roll no, guardian..."
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[12px] outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-64"
          />
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[12px] outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="All">All Classes</option>
            {classes.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <button
            onClick={() => {
              setSearch("");
              setFilterClass("All");
            }}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-[12px] font-semibold text-slate-600 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
          >
            Clear
          </button>
          <button
            onClick={onAdd}
            className="rounded-xl border border-indigo-800 bg-indigo-700 px-4 py-2 text-[12px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-800 hover:shadow-md"
          >
            + Add Student
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-[13px]">
          <thead className="bg-slate-50 text-[11px] text-slate-500">
            <tr>
              <th className="p-3 font-medium">Student</th>
              <th className="p-3 font-medium">Roll No</th>
              <th className="p-3 font-medium">Class</th>
              <th className="p-3 font-medium">Guardian</th>
              <th className="p-3 font-medium">Phone</th>
              <th className="p-3 font-medium">Attendance</th>
              <th className="p-3 font-medium">Fee</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr
                key={s.id}
                className="border-t border-slate-100 hover:bg-slate-50"
              >
                <td className="p-3">
                  <p className="font-medium text-slate-800">{s.name}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {s.gender}
                  </p>
                </td>
                <td className="p-3">{s.roll}</td>
                <td className="p-3">{s.className}</td>
                <td className="p-3">{s.guardian}</td>
                <td className="p-3">{s.phone}</td>
                <td className="p-3">{s.attendance}</td>
                <td className="p-3">
                  <span
                    className={`border px-2 py-1 text-[11px] ${statusClass(
                      s.fee
                    )}`}
                  >
                    {s.fee}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => onView(s)}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onEdit(s)}
                      className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-[11px] font-semibold text-indigo-700 transition-all hover:border-indigo-400 hover:bg-indigo-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(s.id)}
                      className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-[11px] font-semibold text-red-600 transition-all hover:border-red-400 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {students.length === 0 && (
          <p className="py-10 text-center text-[13px] text-slate-500">
            No students found.
          </p>
        )}
      </div>
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

function ProfileSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <h4 className="mb-3 border-b border-slate-200 pb-2 text-[12px] font-semibold text-indigo-700">
        {title}
      </h4>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-slate-400">{label}</p>
      <p className="mt-1 break-words text-[13px] font-medium text-slate-800">
        {value || "-"}
      </p>
    </div>
  );
}
