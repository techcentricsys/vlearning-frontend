import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  UserPlus,
  BookOpen,
  CalendarCheck,
  Wallet,
  ClipboardList,
  Briefcase,
  Banknote,
  Library,
  Bus,
  Building2,
  BarChart3,
  Megaphone,
  Settings,
  GraduationCap,
  PanelLeftClose,
  EllipsisVertical,
  User,
} from "lucide-react"

const sections = [
  {
    title: "MAIN MENU",
    items: [
      { label: "Dashboard", path: "/", icon: LayoutDashboard },
      { label: "Students", path: "/students", icon: Users },
      { label: "Admissions", path: "/admissions", icon: UserPlus },
      { label: "Academics", path: "/academics", icon: BookOpen },
      { label: "Attendance", path: "/attendance", icon: CalendarCheck },
      { label: "Fees & Accounts", path: "/fees", icon: Wallet },
      { label: "Examinations", path: "/exams", icon: ClipboardList },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { label: "Teachers & Staff", path: "/teachers", icon: Briefcase },
      { label: "HR & Payroll", path: "/hr", icon: Banknote },
      { label: "Library", path: "/library", icon: Library },
      { label: "Transport", path: "/transport", icon: Bus },
      { label: "Hostel", path: "/hostel", icon: Building2 },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { label: "Reports & Analytics", path: "/reports", icon: BarChart3 },
      { label: "Notifications", path: "/notifications", icon: Megaphone },
      { label: "Settings", path: "/settings", icon: Settings },
    ],
  },
]

function Sidebar() {
  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 bg-white border-r border-slate-200 flex flex-col">
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-700 text-white flex items-center justify-center">
            <GraduationCap size={22} />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900">VLearnings</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700">
                SMS
              </span>
            </div>
            <span className="text-[11px] text-slate-400">School Management</span>
          </div>
        </div>
        <PanelLeftClose size={18} className="text-slate-400" />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="px-3 mb-2 text-[11px] font-bold tracking-wider text-slate-500">
              {section.title}
            </p>
            <div className="space-y-0.5">
              {section.items.map(({ label, path, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={path === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-slate-600 hover:bg-slate-100"
                    }`
                  }
                >
                  <Icon size={18} />
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-200 p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-indigo-700 text-white flex items-center justify-center">
          <User size={18} />
        </div>
        <div className="flex-1 leading-tight">
          <p className="text-sm font-semibold text-slate-900">Akash Haider</p>
          <p className="text-xs text-slate-500">Super Admin</p>
        </div>
        <EllipsisVertical size={18} className="text-slate-400" />
      </div>
    </aside>
  )
}

export default Sidebar