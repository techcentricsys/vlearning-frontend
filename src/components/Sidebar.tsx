import { useState } from "react";

const menu = [
  { section: "MAIN MENU", items: [
    { label: "Dashboard", value: "Dashboard" },
    { label: "Students", value: "Students" },
    { label: "Admissions", value: "Students" },
    { label: "Academics", value: "Examinations" },
    { label: "Attendance", value: "Attendance" },
    { label: "Fees & Accounts", value: "Fees" },
    { label: "Examinations", value: "Examinations" },
    { label: "Timetable", value: "Timetable" },
  ]},
  { section: "MANAGEMENT", items: [
    { label: "Teachers & Staff", value: "Teachers" },
    { label: "HR & Payroll", value: "Teachers" },
    { label: "Library", value: "Library" },
    { label: "Transport", value: "Transport" },
    { label: "Hostel", value: "Hostel" },
  ]},
  { section: "SYSTEM", items: [
    { label: "Reports & Analytics", value: "Reports" },
    { label: "Notifications", value: "Dashboard" },
    { label: "Settings", value: "Settings" },
  ]},
];

export default function Sidebar({ onNavigate }: any) {
  const [selected, setSelected] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`${collapsed ? "w-[68px]" : "w-[260px]"} min-h-screen bg-white border-r border-border flex flex-col sticky top-0 transition-all duration-300 ease-in-out overflow-hidden shrink-0`}>
      
      {/* TOP - LOGO + HAMBURGER */}
      <div className="flex items-center gap-2 px-3 py-4 border-b border-border">
        <button onClick={() => setCollapsed(!collapsed)} className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] hover:bg-slate-100 shrink-0">
          <span className={`block h-[2px] bg-text transition-all duration-300 ${collapsed ? "w-[20px] rotate-45 translate-y-[7px]" : "w-[20px]"}`}></span>
          <span className={`block h-[2px] bg-text transition-all duration-300 ${collapsed ? "w-[20px] opacity-0" : "w-[20px]"}`}></span>
          <span className={`block h-[2px] bg-text transition-all duration-300 ${collapsed ? "w-[20px] -rotate-45 -translate-y-[7px]" : "w-[20px]"}`}></span>
        </button>

        {!collapsed && (
          <div className="flex items-center gap-2 whitespace-nowrap">
            <div className="w-9 h-9 bg-primary text-white flex items-center justify-center font-bold text-[16px] shrink-0">V</div>
            <div>
              <p className="font-semibold text-[14px] leading-none">VLearnings <span className="text-[10px] bg-slate-100 text-secondary px-1.5 py-0.5 ml-1 font-medium border border-border">SMS</span></p>
              <p className="text-[11px] text-muted mt-1">School Management System</p>
            </div>
          </div>
        )}
      </div>

      {/* MENU LIST */}
      <div className="flex-1 overflow-y-auto px-2 pt-3">
        {menu.map((g) => (
          <div key={g.section} className="mb-4">
            {!collapsed && <p className="text-[11px] font-semibold text-muted px-2 mb-2 tracking-wide">{g.section}</p>}
            {collapsed && <div className="h-px bg-border mx-2 mb-2"></div>}
            {g.items.map((item) => {
              const isActive = selected === item.label;
              return (
                <button
                  key={item.label}
                  title={item.label}
                  onClick={() => { setSelected(item.label); onNavigate(item.value); }}
                  className={`w-full text-left px-3 py-2 text-[13.5px] mb-0.5 border-l-2 flex items-center gap-2 transition-all duration-200 ${
                    isActive ? "bg-slate-100 text-primary font-semibold border-primary" : "text-secondary border-transparent hover:bg-slate-50 hover:text-text"
                  }`}
                >
                  <span className={`w-6 h-6 flex items-center justify-center text-[12px] font-bold shrink-0 ${isActive ? "bg-primary text-white" : "bg-slate-100 text-secondary"}`}>
                    {item.label.charAt(0)}
                  </span>
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* BOTTOM PROFILE */}
      <div className="flex items-center gap-2 p-3 border-t border-border bg-bg">
        <div className="w-8 h-8 bg-primary text-white flex items-center justify-center text-[12px] font-bold shrink-0">SJ</div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold leading-none truncate">Dr. Sarah Jenkins</p>
            <p className="text-[11px] text-muted mt-0.5">Super Admin</p>
          </div>
        )}
        {!collapsed && <span className="w-2 h-2 bg-success shrink-0"></span>}
      </div>
    </aside>
  );
}