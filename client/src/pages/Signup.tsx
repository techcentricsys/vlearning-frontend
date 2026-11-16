import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  UserPlus,
  ChevronDown,
} from "lucide-react"
import AuthLayout from "../components/auth/AuthLayout"

const roles = [
  "Student",
  "Parent / Guardian",
  "Teacher",
  "Accountant",
  "Admission Officer",
  "Academic Coordinator / HOD",
  "Librarian",
  "Transport Manager",
  "Hostel Warden",
  "Examination Controller",
]

function Signup() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm: "",
    role: "",
  })

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.")
      return
    }
    if (!form.role) {
      setError("Please select a role.")
      return
    }
    setError("")
    // Abhi dummy hai. Backend banne ke baad asli account banega.
    navigate("/login")
  }

  const label = "block text-base font-semibold text-slate-800 mb-2"
  const input =
    "w-full h-14 pl-14 pr-4 rounded-xl border-2 border-slate-200 bg-white text-lg text-slate-900 placeholder:text-slate-400 outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
  const icon = "absolute left-4 top-1/2 -translate-y-1/2 text-violet-500"

  const eyeButton = (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-600"
    >
      {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
    </button>
  )

  return (
    <AuthLayout showChecklist={false}>
      <form onSubmit={handleSubmit}>
        <h2 className="text-5xl font-extrabold tracking-tight text-slate-900 text-center">
          Create Account
        </h2>
        <p className="mt-3 text-lg text-slate-500 text-center">Join VLEARNING today</p>

        <div className="mt-8">
          <label className={label}>Full Name</label>
          <div className="relative">
            <User size={24} className={icon} />
            <input
              type="text"
              required
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="Your full name"
              className={input}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className={label}>Email Address</label>
          <div className="relative">
            <Mail size={24} className={icon} />
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@school.edu"
              className={input}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className={label}>Password</label>
          <div className="relative">
            <Lock size={24} className={icon} />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              placeholder="Minimum 8 characters"
              className={`${input} pr-14`}
            />
            {eyeButton}
          </div>
        </div>

        <div className="mt-4">
          <label className={label}>Confirm Password</label>
          <div className="relative">
            <Lock size={24} className={icon} />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={form.confirm}
              onChange={(e) => update("confirm", e.target.value)}
              placeholder="Re-enter your password"
              className={input}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className={label}>Role</label>
          <div className="relative">
            <ShieldCheck size={24} className={icon} />
            <select
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
              className={`${input} appearance-none pr-14 ${
                form.role ? "text-slate-900" : "text-slate-400"
              }`}
            >
              <option value="">Select your role</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <ChevronDown
              size={24}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 text-base font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-7 w-full h-14 flex items-center justify-center gap-2 bg-gradient-to-b from-violet-500 to-violet-800 hover:from-violet-600 hover:to-violet-900 text-white text-lg font-bold rounded-xl shadow-[0_7px_0_0_rgba(46,16,101,0.6),0_16px_26px_-6px_rgba(46,16,101,0.55)] active:translate-y-1.5 active:shadow-[0_2px_0_0_rgba(46,16,101,0.6)] transition-all"
        >
          <UserPlus size={22} /> Sign Up
        </button>

        <div className="my-5 flex items-center gap-4 text-base text-slate-400">
          <div className="flex-1 h-px bg-slate-200" />
          or
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <button
          type="button"
          className="w-full h-14 flex items-center justify-center gap-3 border-2 border-slate-200 rounded-xl text-lg font-semibold text-slate-800 shadow-sm hover:bg-slate-50 hover:-translate-y-0.5 transition"
        >
          <span className="w-7 h-7 rounded-full border-2 border-slate-400 flex items-center justify-center text-sm font-bold">
            G
          </span>
          Continue with Google
        </button>

        <p className="mt-6 text-center text-base text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-violet-700 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default Signup