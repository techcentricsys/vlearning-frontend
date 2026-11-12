import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [page, setPage] = useState("login");
  const [section, setSection] = useState("Dashboard");

  if (page === "login") return <Login goRegister={() => setPage("register")} goDashboard={() => setPage("dashboard")} />;
  if (page === "register") return <Register goLogin={() => setPage("login")} goDashboard={() => setPage("dashboard")} />;

  return (
    <div className="flex bg-bg min-h-screen">
      <Sidebar active={section} onNavigate={(s: string) => setSection(s)} />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-border px-6 py-3 flex items-center justify-between sticky top-0">
          <div><p className="text-[12px] text-slate-400">Dashboard / {section}</p><p className="font-heading font-bold text-[16px]">{section}</p></div>
          <input placeholder="🔍 Search anything..." className="w-[380px] bg-bg border border-border rounded-full px-4 py-2 text-[13px] outline-none" />
          <div className="flex gap-2 items-center">
            <button onClick={() => alert("Notifications: 3 new - Fee Received, Attendance Submitted")} className="text-[18px]">🔔</button>
            <button onClick={() => alert("Settings - Coming Soon")} className="text-[18px]">⚙️</button>
            <button onClick={() => setPage("login")} className="bg-danger text-white px-3 py-1.5 rounded-lg text-[12px] font-semibold">Logout</button>
          </div>
        </header>

        {section === "Dashboard" ? <Dashboard /> : (
          <div className="p-10">
            <div className="bg-white border border-border rounded-2xl p-10 text-center">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-[24px] mx-auto">📁</div>
              <h2 className="font-heading text-[22px] font-bold mt-4">{section}</h2>
              <p className="text-slate-500 text-[14px] mt-1">Ye {section} module hai. Design ready hai, data aur functionality next phase me add hogi.</p>
              <div className="flex gap-2 justify-center mt-5">
                <button onClick={() => setSection("Dashboard")} className="bg-primary text-white px-4 py-2 rounded-lg text-[13px]">← Back to Dashboard</button>
                <button onClick={() => alert(`${section} - Add New Clicked!`)} className="border border-border px-4 py-2 rounded-lg text-[13px]">+ Add New</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}