import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react"
import AuthLayout from "../components/auth/AuthLayout"
import { login } from "../auth/auth"

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Abhi dummy login hai. Backend banne ke baad asli check lagega.
    login({ name: email.split("@")[0] || "Admin", email, role: "Admin" })
    navigate("/")
  }

  const label = "block text-lg font-semibold text-slate-800 mb-2"
  const input =
    "w-full h-16 pl-16 pr-4 rounded-2xl border-2 border-slate-200 bg-white text-xl text-slate-900 placeholder:text-slate-400 outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
  const icon = "absolute left-5 top-1/2 -translate-y-1/2 text-violet-500"
  const btn3d =
    "w-full h-16 flex items-center justify-center gap-2 bg-gradient-to-b from-violet-500 to-violet-800 hover:from-violet-600 hover:to-violet-900 text-white text-xl font-bold rounded-2xl shadow-[0_7px_0_0_rgba(46,16,101,0.6),0_16px_26px_-6px_rgba(46,16,101,0.55)] active:translate-y-1.5 active:shadow-[0_2px_0_0_rgba(46,16,101,0.6)] transition-all"

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit}>
        <h2 className="text-5xl font-extrabold tracking-tight text-slate-900 text-center">
          Welcome Back!
        </h2>
        <p className="mt-3 text-lg text-slate-500 text-center">
          Sign in to your VLEARNING account
        </p>

        <div className="mt-9">
          <label className={label}>Email Address</label>
          <div className="relative">
            <Mail size={28} className={icon} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@school.edu"
              className={input}
            />
          </div>
        </div>

        <div className="mt-5">
          <label className={label}>Password</label>
          <div className="relative">
            <Lock size={28} className={icon} />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`${input} pr-16`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-600"
            >
              {showPassword ? <EyeOff size={28} /> : <Eye size={28} />}
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between text-base">
          <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="w-5 h-5 accent-violet-700"
            />
            Remember Me
          </label>
          <a href="#" className="font-semibold text-violet-700 hover:underline">
            Forgot Password?
          </a>
        </div>

        <button type="submit" className={`mt-8 ${btn3d}`}>
          <LogIn size={26} /> Sign In
        </button>

        <div className="my-6 flex items-center gap-4 text-base text-slate-400">
          <div className="flex-1 h-px bg-slate-200" />
          or
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <button
          type="button"
          className="w-full h-16 flex items-center justify-center gap-3 border-2 border-slate-200 rounded-2xl text-xl font-semibold text-slate-800 shadow-sm hover:bg-slate-50 hover:-translate-y-0.5 transition"
        >
          <span className="w-8 h-8 rounded-full border-2 border-slate-400 flex items-center justify-center text-sm font-bold">
            G
          </span>
          Continue with Google
        </button>

        <p className="mt-8 text-center text-base text-slate-600">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-bold text-violet-700 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default Login