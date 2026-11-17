import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AppLayout from "./components/layout/AppLayout"
import ProtectedRoute from "./auth/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import Students from "./pages/Students"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function Page({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <p className="mt-1 text-slate-500">This module is coming soon.</p>
    </div>
  )
}

const pages = [
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
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            {pages.map((p) => (
              <Route key={p.path} path={p.path} element={<Page title={p.title} />} />
            ))}
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App