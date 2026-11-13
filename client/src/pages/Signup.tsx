import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  GraduationCap,
  Briefcase,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CircleHelp,
  Phone,
  UserRound,
  Check,
   LogIn,
} from "lucide-react"

const points = [
  "Student, attendance and fee records in one place",
  "Role-based access for staff, students and parents",
  "Instant results, reports and notifications",
]

function Signup() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<"staff" | "student">("staff")
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  })
  const [error, setError] = useState("")

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
    setError("")
    // Abhi dummy hai. Backend banne ke baad asli account banega.
    navigate("/login")
  }

  const inputClass =
    "w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 shadow-sm outline-none focus:ring-2 focus:ring-indigo-300"
  const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-100">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white shadow flex items-center justify-center text-indigo-700">
                <GraduationCap size={24} />
              </div>
              <span className="text-2xl font-bold text-slate-900">VLearnings</span>
              <span className="text-xs font-semibold px-2 py-1 rounded-md bg-teal-100 text-teal-800">
                SMS Cloud
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm bg-white rounded-full shadow-sm px-4 py-2 text-slate-700">
              <ShieldCheck size={16} className="text-teal-700" />
              Secure Platform
            </div>
          </div>

          <h1 className="mt-16 text-5xl font-bold leading-tight text-slate-900">
            Create your account and get started
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-xl">
            Join your school on VLearnings and manage academics, attendance,
            fees and communication from one platform.
          </p>

          <ul className="mt-10 space-y-4 max-w-xl">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-4">
                <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                  <Check size={16} />
                </span>
                <span className="text-slate-700">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-col px-8 sm:px-16 py-8">
        <div className="flex items-center justify-end gap-4 text-sm">
                    <Link
            to="/login"
            className="flex items-center gap-2 border border-indigo-700 text-indigo-700 hover:bg-indigo-50 font-semibold rounded-lg px-4 py-2 transition"
          >
            <LogIn size={16} /> Sign In
          </Link>
        </div>

        <div className="flex-1 flex items-center">
          <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
            <h2 className="text-4xl font-bold text-slate-900">Create Account</h2>
            <p className="mt-3 text-slate-600">
              Fill in your details to request access to your school portal.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-100">
              <button
                type="button"
                onClick={() => setTab("staff")}
                className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition ${
                  tab === "staff" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600"
                }`}
              >
                <Briefcase size={16} /> Staff &amp; Faculty
              </button>
              <button
                type="button"
                onClick={() => setTab("student")}
                className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition ${
                  tab === "student" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-600"
                }`}
              >
                <User size={16} /> Student &amp; Parent
              </button>
            </div>

            <label className="block mt-6 text-sm font-medium text-slate-800">Full Name</label>
            <div className="relative mt-2">
              <UserRound size={18} className={iconClass} />
              <input
                type="text"
                required
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder="Your full name"
                className={inputClass}
              />
            </div>

            <label className="block mt-5 text-sm font-medium text-slate-800">Email</label>
            <div className="relative mt-2">
              <Mail size={18} className={iconClass} />
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@school.edu"
                className={inputClass}
              />
            </div>

            <label className="block mt-5 text-sm font-medium text-slate-800">Phone Number</label>
            <div className="relative mt-2">
              <Phone size={18} className={iconClass} />
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="03XX XXXXXXX"
                className={inputClass}
              />
            </div>

            <label className="block mt-5 text-sm font-medium text-slate-800">Password</label>
            <div className="relative mt-2">
              <Lock size={18} className={iconClass} />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                placeholder="At least 8 characters"
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <label className="block mt-5 text-sm font-medium text-slate-800">Confirm Password</label>
            <div className="relative mt-2">
              <Lock size={18} className={iconClass} />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={form.confirm}
                onChange={(e) => update("confirm", e.target.value)}
                placeholder="Re-enter your password"
                className={inputClass}
              />
            </div>

            {error && (
              <p className="mt-4 text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</p>
            )}

            <button
              type="submit"
              className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3.5 rounded-xl shadow-md transition"
            >
              Create Account <ArrowRight size={18} />
            </button>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-indigo-700">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <span className="w-full">© 2026 VLearnings</span>
        </div>
      </div>
    </div>
  )
}

export default Signup