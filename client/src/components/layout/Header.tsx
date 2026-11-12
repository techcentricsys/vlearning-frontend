import { Bell, Search } from "lucide-react"

function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
      <div className="relative w-80">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search students, teachers..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 rounded-lg outline-none focus:ring-2 focus:ring-violet-300"
        />
      </div>

      <div className="flex items-center gap-5">
        <button className="relative text-slate-500 hover:text-violet-700">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-violet-700 text-white flex items-center justify-center text-sm font-semibold">
            AH
          </div>
          <div className="text-sm leading-tight">
            <p className="font-semibold text-slate-900">Akash Haider</p>
            <p className="text-slate-500">Admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header