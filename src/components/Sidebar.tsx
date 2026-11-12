const menu = [
  { section: "MAIN MENU", items: ["Dashboard", "Students", "Admissions", "Academics", "Attendance", "Fees & Accounts", "Examinations"] },
  { section: "MANAGEMENT", items: ["Teachers & Staff", "HR & Payroll", "Library", "Transport", "Hostel"] },
  { section: "SYSTEM", items: ["Reports & Analytics", "Notifications", "Settings"] },
];

export default function Sidebar({ onNavigate, active }: any) {
  return (
    <aside className="w-[260px] min-h-screen bg-white border-r border-border p-4 flex flex-col sticky top-0">
      <div className="flex items-center gap-2 px-2 mb-6">
        <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-heading font-bold text-lg">V</div>
        <div>
          <p className="font-heading font-bold leading-none">VLearnings <span className="text-[10px] bg-indigo-100 text-primary px-1.5 py-0.5 rounded">SMS</span></p>
          <p className="text-[11px] text-slate-500">v2.4 Enterprise</p>
        </div>
      </div>

      {menu.map((g) => (
        <div key={g.section} className="mb-5">
          <p className="text-[11px] font-semibold text-slate-400 px-2 mb-2 tracking-wider">{g.section}</p>
          {g.items.map((item) => (
            <button
              key={item}
              onClick={() => onNavigate(item)}
              className={`w-full text-left px-3 py-2 rounded-lg text-[14px] mb-0.5 ${active === item || (active === "Dashboard" && item === "Dashboard") ? "bg-indigo-50 text-primary font-semibold" : "text-slate-600 hover:bg-slate-50"}`}
            >
              {item}
            </button>
          ))}
        </div>
      ))}

      <div className="mt-auto flex items-center gap-2 p-2 border-t border-border">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">DJ</div>
        <div>
          <p className="text-[13px] font-semibold leading-none">Dr. Sarah Jenkins</p>
          <p className="text-[11px] text-slate-500">Super Admin</p>
        </div>
      </div>
    </aside>
  );
}