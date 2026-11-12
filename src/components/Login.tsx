import { useState } from "react";

export default function Login({ goRegister, goDashboard }: any) {
  const [email, setEmail] = useState("admin@vlearnings.edu");
  const [password, setPassword] = useState("admin123");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) { setError("Please enter email and password"); return; }
    setLoading(true); setError("");
    setTimeout(() => { setLoading(false); goDashboard(); }, 800);
  };

  return (
    <div className="min-h-screen flex bg-white animate-fade">
      {/* LEFT - BRANDING */}
      <div className="hidden lg:flex w-[46%] bg-primary text-white flex-col justify-between p-10 animate-slide-left">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white text-primary flex items-center justify-center font-bold text-[18px]">V</div>
          <div><p className="font-semibold text-[16px]">VLearnings</p><p className="text-[11px] text-slate-300">School Management System</p></div>
        </div>
        <div>
          <h1 className="text-[32px] font-semibold leading-[1.2]">Manage your entire<br/>school in one place.</h1>
          <p className="text-slate-300 text-[14px] mt-3 leading-relaxed max-w-[380px]">Students, attendance, fees, examinations and staff — everything your school needs, in a single secure system.</p>
          <div className="mt-8 space-y-3 text-[13px]">
            <p className="flex gap-2"><span className="w-5 h-5 bg-white/10 flex items-center justify-center text-[11px]">✓</span> Trusted by 120+ schools across Pakistan</p>
            <p className="flex gap-2"><span className="w-5 h-5 bg-white/10 flex items-center justify-center text-[11px]">✓</span> Secure data • Daily backup • Role-based access</p>
            <p className="flex gap-2"><span className="w-5 h-5 bg-white/10 flex items-center justify-center text-[11px]">✓</span> Works on mobile, tablet and desktop</p>
          </div>
        </div>
        <div className="flex items-center gap-3 border-t border-white/10 pt-5">
          <div className="w-9 h-9 bg-white/10 flex items-center justify-center text-[12px] font-bold">SJ</div>
          <div><p className="text-[13px] font-medium">Dr. Sarah Jenkins</p><p className="text-[11px] text-slate-400">Super Admin, VLearnings School</p></div>
          <p className="ml-auto text-[11px] text-slate-400">© 2026 VLearnings</p>
        </div>
      </div>

      {/* RIGHT - FORM */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-[400px] animate-slide-up">
          <div className="lg:hidden flex items-center gap-2 mb-8"><div className="w-9 h-9 bg-primary text-white flex items-center justify-center font-bold">V</div><p className="font-semibold">VLearnings</p></div>
          <h2 className="text-[24px] font-semibold">Welcome back</h2>
          <p className="text-muted text-[13px] mt-1">Sign in to your account to continue. Demo account is pre-filled.</p>

          {error && <div className="mt-4 bg-red-50 border border-red-200 text-danger text-[13px] px-3 py-2">{error}</div>}

          <label className="block text-[12px] font-medium mt-6 mb-1.5">Email Address</label>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@school.edu" className="w-full border border-border px-3 py-2.5 text-[13px] bg-white" />

          <label className="block text-[12px] font-medium mt-4 mb-1.5">Password</label>
          <div className="relative">
            <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" className="w-full border border-border px-3 py-2.5 text-[13px] pr-16" />
            <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-2.5 text-[12px] text-primary font-medium">{showPass ? "Hide" : "Show"}</button>
          </div>

          <div className="flex justify-between items-center mt-3 text-[12px]">
            <label className="flex items-center gap-1.5 text-secondary"><input type="checkbox" defaultChecked className="accent-[#1B2A4A]" /> Remember me</label>
            <button className="text-primary font-medium">Forgot password?</button>
          </div>

          <button onClick={handleLogin} disabled={loading} className="btn-press w-full bg-primary text-white py-2.5 text-[13px] font-medium mt-6 disabled:opacity-60">
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="flex items-center gap-3 my-5"><div className="flex-1 h-px bg-border"></div><span className="text-[11px] text-muted">OR</span><div className="flex-1 h-px bg-border"></div></div>

          <button onClick={goDashboard} className="btn-press w-full border border-border py-2.5 text-[13px] bg-white hover:bg-bg">Continue as Guest - View Demo</button>

          <p className="text-center text-[12px] text-muted mt-5">Don't have an account? <button onClick={goRegister} className="text-primary font-semibold">Create account</button></p>
          <p className="text-center text-[11px] text-muted mt-4">By signing in, you agree to our Terms & Privacy Policy.<br/>Need help? support@vlearnings.edu</p>
        </div>
      </div>
    </div>
  );
}