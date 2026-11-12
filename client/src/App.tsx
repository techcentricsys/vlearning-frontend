import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "./components/layout/AppLayout"
import Dashboard from "./pages/Dashboard"

function Page({ title }: { title: string }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <p className="mt-1 text-slate-500">This page is coming soon.</p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Page title="Students" />} />
          <Route path="/teachers" element={<Page title="Teachers" />} />
          <Route path="/attendance" element={<Page title="Attendance" />} />
          <Route path="/exams" element={<Page title="Exams" />} />
          <Route path="/fees" element={<Page title="Fees" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App