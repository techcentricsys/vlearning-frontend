import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "./components/layout/AppLayout"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"

function Page({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <p className="mt-1 text-slate-500">This module is coming soon.</p>
    </div>
  )
}

const pages = [
  { path: "/students", title: "Students" },
  { path: "/admissions", title: "Admissions" },
  { path: "/academics", title: "Academics" },
  { path: "/attendance", title: "Attendance" },
  { path: "/fees", title: "Fees & Accounts" },
  { path: "/exams", title: "Examinations" },
  { path: "/teachers", title: "Teachers & Staff" },
  { path: "/hr", title: "HR & Payroll" },
  { path: "/library", title: "Library" },
  { path: "/transport", title: "Transport" },
  { path: "/hostel", title: "Hostel" },
  { path: "/reports", title: "Reports & Analytics" },
  { path: "/notifications", title: "Notifications" },
  { path: "/settings", title: "Settings" },
]

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          {pages.map((p) => (
            <Route key={p.path} path={p.path} element={<Page title={p.title} />} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App