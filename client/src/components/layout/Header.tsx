import {
  Bell,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  LogOut,
  Search,
  User,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { logout } from "../../auth/auth"

function Header() {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="h-16 sticky top-0 z-10 bg-white border-b border-slate-200 flex items-center justify-between gap-6 px-8">
      <div className="flex items-center gap-6 flex-1">
        <p className="text-sm text-slate-500 whitespace-nowrap">
          Dashboard / <span className="font-semibold text-slate-900">Overview</span>
        </p>
        <div className="relative w-full max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search anything... (students, invoices, staff...)"
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="hidden md:flex items-center gap-2 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-2">
          <CalendarDays size={16} />
          AY 2026-2027 • Term 2
          <ChevronDown size={14} />
        </button>

        <button className="relative text-slate-600 hover:text-indigo-700">
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-teal-600 rounded-full" />
        </button>

        <button className="text-slate-600 hover:text-indigo-700">
          <CircleHelp size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-700 text-white flex items-center justify-center">
            <User size={18} />
          </div>
          <div className="hidden lg:block text-sm leading-tight">
            <p className="font-semibold text-slate-900">Akash Haider</p>
            <p className="text-slate-500">Admin</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-red-600"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </header>
  )
}

export default Header