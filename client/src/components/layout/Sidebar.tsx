import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  CalendarCheck,
  FileText,
  Wallet,
} from "lucide-react"

const menu = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Students", path: "/students", icon: GraduationCap },
  { label: "Teachers", path: "/teachers", icon: Users },
  { label: "Attendance", path: "/attendance", icon: CalendarCheck },
  { label: "Exams", path: "/exams", icon: FileText },
  { label: "Fees", path: "/fees", icon: Wallet },
]

function Sidebar() {
  return (
    <aside className="w-64 shrink-0 min-h-screen bg-white border-r border-slate-200 flex flex-col">
      <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-200">
        <div className="w-9 h-9 rounded-lg bg-violet-700 text-white flex items-center justify-center font-bold">
          V
        </div>
        <span className="text-xl font-bold text-slate-900">VLEARNING</span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menu.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-violet-50 text-violet-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar