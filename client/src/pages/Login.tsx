import { useState } from "react"
import { useNavigate } from "react-router-dom"
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
  RefreshCw,
  Landmark,
  TrendingUp,
  Users,
  Check,
} from "lucide-react"

const bars = [
  { h: 28, c: "bg-indigo-600" },
  { h: 40, c: "bg-indigo-600" },
  { h: 70, c: "bg-teal-700" },
  { h: 46, c: "bg-indigo-600" },
  { h: 62, c: "bg-teal-700" },
  { h: 88, c: "bg-teal-300" },
  { h: 52, c: "bg-teal-700" },
]

const features = [
  { icon: Landmark, title: "Simplified Ops", text: "Automate grading, schedules & fee workflows." },
  { icon: TrendingUp, title: "Real-Time Insights", text: "Instant grade trends, attendance & data." },
  { icon: Users, title: "Connected Campus", text: "Single portal for faculty, students & guardians." },
]

function Login() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<"staff" | "student">("staff")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Abhi dummy login hai. Backend banne ke baad asli check lagega.
    navigate("/")
  }

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

          <div className="mt-10 inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 text-xs font-bold tracking-wider text-teal-800 shadow-sm">
            <GraduationCap size={14} />
            UNIFIED ACADEMIC OPERATING SYSTEM
          </div>

          <h1 className="mt-6 text-5xl font-bold leading-tight text-slate-900">
            Smarter School Management Starts Here
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-xl">
            Manage students, faculty, grading cycles, attendance rosters, and
            institutional workflows from one synchronized platform.
          </p>

          {/* Preview card */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-5 max-w-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-teal-700" />
                <span className="ml-3 text-xs text-slate-500">vlearnings.com</span>
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-teal-700">
                <RefreshCw size={12} /> Real-Time Sync
              </span>
            </div>

            <div className="rounded-xl bg-slate-900 text-white p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-bold tracking-wider text-teal-300">
                    INSTITUTION ANALYTICS
                  </p>
                  <p className="mt-1 text-xl font-semibold">Faculty &amp; Learner Pulse</p>
                </div>
                <span className="text-xs bg-slate-700 rounded-lg px-3 py-1.5">
                  Term 2 • 2026-27
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { l: "Attendance", v: "97.8%", n: "+1.4%" },
                  { l: "GPA Index", v: "3.84", n: "Target met" },
                  { l: "Fee Clearance", v: "94.2%", n: "Automated" },
                ].map((s) => (
                  <div key={s.l} className="rounded-lg bg-slate-800 p-3">
                    <p className="text-xs text-slate-300">{s.l}</p>
                    <p className="mt-1 text-2xl font-bold">{s.v}</p>
                    <p className="mt-1 text-xs text-teal-300 flex items-center gap-1">
                      <Check size={12} /> {s.n}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-end gap-2 h-20">
                {bars.map((b, i) => (
                  <div
                    key={i}
                    className={`w-8 rounded-t ${b.c}`}
                    style={{ height: `${b.h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Feature cards */}
          <div className="mt-6 grid grid-cols-3 gap-4 max-w-xl">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-white rounded-xl shadow-sm p-4">
                <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Icon size={18} />
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-900">{title}</p>
                <p className="mt-1 text-xs text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-col px-8 sm:px-16 py-8">
        <div className="flex items-center justify-end gap-4 text-sm">
          <span className="hidden sm:flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2 text-slate-700">
            <span className="w-2 h-2 rounded-full bg-teal-700" />
            System Status: <b>Operational</b>
          </span>
          <a href="#" className="flex items-center gap-1 text-indigo-700 font-medium">
            <CircleHelp size={16} /> Admin Helpdesk
          </a>
        </div>

        <div className="flex-1 flex items-center">
          <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
            <h2 className="text-4xl font-bold text-slate-900">Welcome Back</h2>
            <p className="mt-3 text-slate-600">
              Sign in to access your administrative dashboard &amp; academic workflows.
            </p>

            {/* Tabs */}
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

            {/* Email */}
            <div className="mt-6 flex items-center justify-between">
              <label className="text-sm font-medium text-slate-800">Institutional Email</label>
              <span className="text-xs text-slate-400">e.g. admin@school.edu</span>
            </div>
            <div className="relative mt-2">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="faculty.lead@academy.edu"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 shadow-sm outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>

            {/* Password */}
            <div className="mt-5 flex items-center justify-between">
              <label className="text-sm font-medium text-slate-800">Security Password</label>
              <a href="#" className="text-sm font-medium text-indigo-700">
                Forgot password?
              </a>
            </div>
            <div className="relative mt-2">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-slate-200 shadow-sm outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="mt-5 flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 accent-indigo-700"
                />
                Remember device for 30 days
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3.5 rounded-xl shadow-md transition"
            >
              Sign In to Dashboard <ArrowRight size={18} />
            </button>

            <div className="mt-6 flex items-center gap-4 text-xs text-slate-500 tracking-wider">
              <div className="flex-1 h-px bg-slate-200" />
              OR CONTINUE WITH
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <button
              type="button"
              className="mt-6 w-full flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-3.5 font-medium text-slate-800 hover:bg-slate-50 transition"
            >
              <span className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-sm font-bold">
                G
              </span>
              Sign in with Google Workspace for Education
            </button>

            <p className="mt-6 text-center text-sm text-slate-600">
              Don&apos;t have an institution account?{" "}
              <a href="#" className="font-semibold text-teal-800">Enroll School</a>
              {" • "}
              <a href="#" className="font-semibold text-teal-800">Request Live Demo</a>
            </p>
          </form>
        </div>

        <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Security &amp; Compliance</a>
          <span className="w-full">© 2026 VLearnings</span>
        </div>
      </div>
    </div>
  )
}

export default Login