const menu = [
  { section: "MAIN MENU", items: [
    { label: "Dashboard", value: "Dashboard" },
    { label: "Students", value: "Students" },
    { label: "Admissions", value: "Students" },
    { label: "Academics", value: "Examinations" },
    { label: "Attendance", value: "Attendance" },
    { label: "Fees & Accounts", value: "Fees" },
    { label: "Examinations", value: "Examinations" },
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

export default function Sidebar({ onNavigate, active }: any) {
  return (
    <aside className="w-[260px] min-h-screen bg-white border-r border-border p-4 flex flex-col sticky top-0">
      <div className="flex items-center gap-2 px-2 mb-6 pb-4 border-b border-border">
        <div className="w-9 h-9 bg-primary text-white flex items-center justify-center font-bold text-[16px]">V</div>
        <div>
          <p className="font-semibold text-[14px] leading-none text-text">VLearnings <span className="text-[10px] bg-slate-100 text-secondary px-1.5 py-0.5 ml-1 font-medium border border-border">SMS</span></p>
          <p className="text-[11px] text-muted mt-1">School Management System</p>
        </div>
      </div>

      {menu.map((g) => (
        <div key={g.section} className="mb-5">
          <p className="text-[11px] font-semibold text-muted px-2 mb-2 tracking-wide">{g.section}</p>
          {g.items.map((item) => {
            const isActive = active === item.value && (
              // Admissions ko Students ke saath active dikhao
              (item.label === "Admissions" ? active === "Students" : true) &&
              (item.label === "Academics" ? active === "Examinations" : true)
            );
            // Simple active logic - exact match ya mapping
            const activeCheck = active === item.value;
            return (
              <button
                key={item.label}
                onClick={() => onNavigate(item.value)}
                className={`w-full text-left px-3 py-2 text-[13.5px] mb-0.5 border-l-2 ${
                  activeCheck
                    ? "bg-slate-100 text-primary font-semibold border-primary"
                    : "text-secondary border-transparent hover:bg-slate-50 hover:text-text"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      ))}

      <div className="mt-auto flex items-center gap-2 p-3 border-t border-border bg-bg">
        <div className="w-8 h-8 bg-primary text-white flex items-center justify-center text-[12px] font-bold">SJ</div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold leading-none truncate">Dr. Sarah Jenkins</p>
          <p className="text-[11px] text-muted mt-0.5">Super Admin</p>
        </div>
        <span className="w-2 h-2 bg-success"></span>
      </div>
    </aside>
  );
}