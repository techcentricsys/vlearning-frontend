import {
  GraduationCap,
  CalendarCheck,
  Wallet,
  Receipt,
  Download,
  UserPlus,
  CircleCheck,
  Briefcase,
  ClipboardList,
  TrendingUp,
  Calendar,
  Star,
  FileText,
  UserCheck,
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

const stats = [
  {
    label: "Total Students",
    value: "1,248",
    trend: "3.2%",
    icon: GraduationCap,
    iconStyle: "bg-indigo-50 text-indigo-700",
    footLeft: "vs last term (1,209)",
    footRight: "98.2% Enrolled Active",
    footStyle: "bg-teal-100 text-teal-800",
  },
  {
    label: "Today's Attendance",
    value: "94.5%",
    trend: "1.1%",
    icon: CalendarCheck,
    iconStyle: "bg-teal-50 text-teal-700",
    footLeft: "1,180 present",
    footRight: "68 absent",
    footStyle: "text-red-600",
  },
  {
    label: "Fees Collected (This Term)",
    value: "Rs. 850,000",
    trend: "12%",
    icon: Wallet,
    iconStyle: "bg-indigo-50 text-indigo-700",
    footLeft: "Progress to Target",
    footRight: "80.2%",
    footStyle: "text-slate-700",
  },
  {
    label: "Outstanding Fees",
    value: "Rs. 210,000",
    trend: "",
    icon: Receipt,
    iconStyle: "bg-orange-50 text-orange-600",
    footLeft: "Next cycle Due",
    footRight: "Due Oct 31",
    footStyle: "bg-red-50 text-red-600",
  },
]

const quickActions = [
  { label: "Add Student", icon: UserPlus },
  { label: "Record Attendance", icon: CircleCheck },
  { label: "Collect Fee", icon: Wallet },
  { label: "Add Teacher", icon: Briefcase },
  { label: "Create Examination", icon: ClipboardList },
]

const attendanceData = [
  { day: "Mon", rate: 94.5 },
  { day: "Tue", rate: 95.8 },
  { day: "Wed", rate: 95.2 },
  { day: "Thu", rate: 96.2 },
  { day: "Fri", rate: 94.8 },
]

const feeData = [
  { month: "May", collected: 760, outstanding: 200 },
  { month: "Jun", collected: 810, outstanding: 190 },
  { month: "Jul", collected: 850, outstanding: 170 },
  { month: "Aug", collected: 900, outstanding: 160 },
  { month: "Sep", collected: 880, outstanding: 180 },
  { month: "Oct", collected: 950, outstanding: 210 },
]

const distribution = [
  { name: "Primary (Grades 1-5)", value: 420, color: "#4338ca" },
  { name: "Middle (Grades 6-8)", value: 360, color: "#0f766e" },
  { name: "High School (9-10)", value: 280, color: "#5eead4" },
  { name: "Senior Secondary (11-12)", value: 188, color: "#c7d2fe" },
]

const events = [
  { month: "OCT", day: "28", tag: "Exam", title: "Midterm Exams (Grades 9-12)", place: "Central Examination Hall" },
  { month: "NOV", day: "02", tag: "Meeting", title: "Parent-Teacher Meeting", place: "Term 1 Performance Review" },
  { month: "NOV", day: "11", tag: "Event", title: "National Education Day", place: "Main Auditorium Assembly" },
  { month: "NOV", day: "15", tag: "Holiday", title: "Mid-Term School Holiday", place: "Institutional Break for All Classes" },
]

const activities = [
  { icon: UserCheck, title: "Admission Approved", sub: "Aryan Sharma (Grade 9-A)", by: "By: Dr. Sarah Jenkins", time: "10:24 AM", badge: "Approved" },
  { icon: FileText, title: "Fee Payment Received", sub: "Inv #4892 (Rs. 24,500)", by: "By: Cashier Counter 2", time: "09:45 AM", badge: "Cleared" },
  { icon: CalendarCheck, title: "Attendance Submitted", sub: "Grade 10-B (38 Present, 2 Absent)", by: "By: Prof. R. Verma", time: "09:15 AM", badge: "Verified" },
  { icon: Star, title: "Exam Results Published", sub: "Term 1 Physics Quiz • Grade 11", by: "By: HOD Science Dept", time: "Yesterday", badge: "Published" },
]

const card = "bg-white rounded-2xl border border-slate-200 shadow-sm"

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className={`${card} p-6 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-slate-900">Good Morning, Administrator!</h2>
            <span className="flex items-center gap-1.5 text-xs font-medium text-teal-800 bg-teal-50 rounded-full px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
              Live Sync Active
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Here&apos;s what&apos;s happening at your school today.
          </p>
          <span className="inline-block mt-2 text-xs font-semibold text-indigo-700 bg-indigo-50 rounded px-2 py-1">
            AY 2026-27 • Term 2
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg px-4 py-2.5 hover:bg-slate-50">
            <Download size={16} /> Generate Report
          </button>
          <button className="flex items-center gap-2 text-sm font-semibold text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg px-4 py-2.5 shadow">
            <UserPlus size={16} /> Add New Student
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className={`${card} p-5 flex flex-col justify-between`}>
            <div className="flex items-start justify-between">
              <p className="text-sm text-slate-600 max-w-[8rem]">{s.label}</p>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.iconStyle}`}>
                <s.icon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-end gap-2">
              <p className="text-3xl font-bold text-slate-900">{s.value}</p>
              {s.trend && (
                <span className="mb-1 text-xs font-semibold text-teal-700">↑ {s.trend}</span>
              )}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>{s.footLeft}</span>
              <span className={`font-semibold rounded px-2 py-0.5 ${s.footStyle}`}>{s.footRight}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className={`${card} p-4 flex flex-wrap items-center gap-3`}>
        <span className="text-xs font-bold tracking-wider text-slate-500 mr-2">QUICK ACTIONS:</span>
        {quickActions.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg px-4 py-2.5 transition"
          >
            <Icon size={16} className="text-indigo-700" />
            {label}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className={`${card} p-6`}>
          <h3 className="font-bold text-slate-900">Student Attendance Trends</h3>
          <p className="text-xs text-slate-500">Daily attendance rate across institutional cohorts</p>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="attFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4338ca" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#4338ca" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis domain={[85, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="rate" stroke="#4338ca" strokeWidth={2.5} fill="url(#attFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 text-center rounded-lg bg-slate-50 py-3 text-xs text-slate-500">
            <div><p>Grades 1-5</p><p className="text-lg font-bold text-slate-900">96.0%</p></div>
            <div><p>Grades 6-8</p><p className="text-lg font-bold text-slate-900">94.0%</p></div>
            <div><p>Grades 9-12</p><p className="text-lg font-bold text-slate-900">93.5%</p></div>
          </div>
        </div>

        <div className={`${card} p-6`}>
          <h3 className="font-bold text-slate-900">Monthly Fee Collection</h3>
          <p className="text-xs text-slate-500">Collected vs Outstanding fee distribution</p>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="collected" fill="#4338ca" radius={[4, 4, 0, 0]} />
                <Bar dataKey="outstanding" fill="#fdba74" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-indigo-700" />Collected</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-orange-300" />Outstanding</span>
            </div>
            <span>Values in Rs. thousands</span>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Distribution */}
        <div className={`${card} p-6`}>
          <h3 className="font-bold text-slate-900">Student Distribution</h3>
          <p className="text-xs text-slate-500">Breakdown by academic tiers</p>
          <div className="h-52 mt-2 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distribution} dataKey="value" innerRadius={60} outerRadius={85} paddingAngle={2}>
                  {distribution.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-slate-900">1,248</span>
              <span className="text-xs text-slate-500">Total Enrolled</span>
            </div>
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            {distribution.map((d) => (
              <li key={d.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  {d.name}
                </span>
                <span className="text-slate-600">
                  {d.value} ({((d.value / 1248) * 100).toFixed(1)}%)
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Events */}
        <div className={`${card} p-6`}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-slate-900">Upcoming Events</h3>
              <p className="text-xs text-slate-500">Key schedule &amp; deadlines</p>
            </div>
            <a href="#" className="text-sm font-medium text-indigo-700">View Calendar</a>
          </div>
          <div className="mt-4 space-y-3">
            {events.map((e) => (
              <div key={e.title} className="flex items-center gap-4 bg-slate-50 rounded-xl p-3">
                <div className="w-14 h-14 rounded-lg bg-indigo-100 text-indigo-700 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold">{e.month}</span>
                  <span className="text-lg font-bold leading-none">{e.day}</span>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase bg-orange-100 text-orange-700 rounded px-1.5 py-0.5">
                    {e.tag}
                  </span>
                  <p className="mt-1 text-sm font-semibold text-slate-900 truncate">{e.title}</p>
                  <p className="text-xs text-slate-500 truncate">{e.place}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1"><Calendar size={14} /> 4 activities in next 30 days</span>
            <a href="#" className="font-medium text-indigo-700">+ Add Event</a>
          </div>
        </div>

        {/* Activities */}
        <div className={`${card} p-6`}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-slate-900">Recent Activities</h3>
              <p className="text-xs text-slate-500">Real-time campus operational log</p>
            </div>
            <a href="#" className="text-sm font-medium text-indigo-700">Audit Log</a>
          </div>
          <div className="mt-4 space-y-5">
            {activities.map((a) => (
              <div key={a.title} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                  <a.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900 truncate">{a.title}</p>
                    <span className="text-xs text-slate-400 shrink-0">{a.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{a.sub}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs text-slate-400">{a.by}</span>
                    <span className="text-[10px] font-semibold bg-teal-100 text-teal-800 rounded px-1.5 py-0.5">
                      {a.badge}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 flex items-center gap-2 text-xs text-slate-500">
            <TrendingUp size={14} className="text-teal-700" /> Listening to admin events
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard