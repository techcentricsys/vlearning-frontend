import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Abhi dummy login hai. Backend banne ke baad asli check lagega.
    navigate("/")
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center bg-violet-700 text-white p-16">
        <div className="w-12 h-12 rounded-xl bg-white text-violet-700 flex items-center justify-center text-2xl font-bold">
          V
        </div>
        <h1 className="mt-8 text-4xl font-bold leading-tight">
          Smarter school management,
          <br />
          all in one place.
        </h1>
        <p className="mt-4 text-violet-200 max-w-md">
          Students, attendance, exams, fees and communication, managed from one
          secure platform.
        </p>
      </div>

      <div className="flex items-center justify-center bg-slate-50 p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-8 shadow-sm"
        >
          <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
          <p className="mt-1 text-sm text-slate-500">
            Sign in to your VLEARNING account
          </p>

          <label className="block mt-6 text-sm font-medium text-slate-700">
            Email
          </label>
          <div className="relative mt-1">
            <Mail
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@school.com"
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-violet-300"
            />
          </div>

          <label className="block mt-4 text-sm font-medium text-slate-700">
            Password
          </label>
          <div className="relative mt-1">
            <Lock
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full pl-9 pr-10 py-2.5 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-violet-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-violet-700 hover:bg-violet-800 text-white font-medium py-2.5 rounded-lg transition"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login