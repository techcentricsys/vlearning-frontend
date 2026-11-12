import {
  GraduationCap,
  Users,
  CalendarCheck,
  Wallet,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts"

const stats = [
  { label: "Total Students", value: "1,248", note: "+12 this month", icon: GraduationCap },
  { label: "Total Teachers", value: "86", note: "+2 this month", icon: Users },
  { label: "Today's Attendance", value: "94%", note: "Present", icon: CalendarCheck },
  { label: "Pending Fees", value: "Rs 4.2M", note: "128 students", icon: Wallet },
]

const attendance = [
  { day: "Mon", rate: 92 },
  { day: "Tue", rate: 95 },
  { day: "Wed", rate: 90 },
  { day: "Thu", rate: 94 },
  { day: "Fri", rate: 91 },
]

const fees = [
  { month: "Jul", amount: 3.1 },
  { month: "Aug", amount: 3.8 },
  { month: "Sep", amount: 3.4 },
  { month: "Oct", amount: 4.1 },
  { month: "Nov", amount: 3.9 },
]

const activities = [
  "New admission application received",
  "Fee collected from Class 8-A",
  "Attendance marked for Class 10-B",
  "Result published for Mid-Term exam",
]

function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        <p className="mt-1 text-slate-500">Overview of your school today</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map(({ label, value, note, icon: Icon }) => (
          <div
            key={label}
            className="bg-white rounded-xl border border-slate-200 p-6 flex items-start justify-between"
          >
            <div>
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
              <p className="mt-1 text-xs text-slate-400">{note}</p>
            </div>
            <div className="w-11 h-11 rounded-lg bg-violet-50 text-violet-700 flex items-center justify-center">
              <Icon size={22} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Weekly Attendance (%)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendance}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Bar dataKey="rate" fill="#6d28d9" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Fee Collection (Rs million)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fees}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#6d28d9" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Recent Activities</h3>
        <ul className="divide-y divide-slate-100">
          {activities.map((item) => (
            <li key={item} className="py-3 text-sm text-slate-600">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Dashboard