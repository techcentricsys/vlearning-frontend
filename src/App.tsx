import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [page, setPage] = useState("login");

  if (page === "login") return <Login goRegister={() => setPage("register")} goDashboard={() => setPage("dashboard")} />;
  if (page === "register") return <Register goLogin={() => setPage("login")} goDashboard={() => setPage("dashboard")} />;

  return (
    <div className="flex bg-bg min-h-screen">
      <Sidebar active="Dashboard" onNavigate={() => setPage("dashboard")} />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-border px-6 py-3 flex items-center justify-between sticky top-0">
          <div><p className="text-[12px] text-slate-400">Dashboard / Overview</p></div>
          <input placeholder="🔍 Search anything... students, invoices, staff..." className="w-[380px] bg-bg border border-border rounded-full px-4 py-2 text-[13px] outline-none" />
          <div className="flex gap-2 items-center"><span className="text-[12px] bg-slate-100 px-2 py-1 rounded">AY 2024-2025 • Term 2</span><span>🔔</span><span>⚙️</span></div>
        </header>
        <Dashboard />
      </div>
    </div>
  );
}