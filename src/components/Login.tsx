export default function Login({ goRegister, goDashboard }: any) {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left - Branding */}
      <div className="bg-[#EAF0FF] p-10 hidden md:flex flex-col justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded-lg text-white flex items-center justify-center font-bold">V</div>
          <b className="font-heading">VLearnings</b>
          <span className="text-[11px] bg-white px-2 py-1 rounded-full">SMS Cloud v2.4</span>
        </div>
        <div>
          <span className="text-[11px] bg-white px-3 py-1 rounded-full text-primary font-semibold">● UNIFIED ACADEMIC OPERATING SYSTEM</span>
          <h1 className="font-heading text-[42px] leading-[1.1] font-extrabold mt-4">Smarter School Management<br/>Starts Here</h1>
          <p className="text-slate-600 mt-3 text-[15px]">Manage students, faculty, grading cycles, attendance rosters, and institutional workflows from one synchronized platform.</p>
          <div className="bg-[#0F172A] text-white rounded-2xl p-5 mt-6">
            <p className="text-[11px] text-slate-400">INSTITUTION ANALYTICS • Term 2 • 2024-25</p>
            <p className="font-heading font-bold text-lg mt-1">Faculty & Learner Pulse</p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div><p className="text-[11px] text-slate-400">Attendance</p><b>97.8%</b></div>
              <div><p className="text-[11px] text-slate-400">GPA Index</p><b>3.84</b></div>
              <div><p className="text-[11px] text-slate-400">Fee Clearance</p><b>94.2%</b></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {["Simplified Ops", "Real-Time Insights", "Connected Campus"].map(t => (
              <div key={t} className="bg-white rounded-xl p-3"><b className="text-[12px]">{t}</b><p className="text-[11px] text-slate-500">Automated grading, schedules & workflows.</p></div>
            ))}
          </div>
        </div>
        <p className="text-[11px] text-slate-500">Trusted by 450+ educational institutions across 18 countries</p>
      </div>

      {/* Right - Form */}
      <div className="p-8 md:p-14 flex flex-col justify-center max-w-[520px] w-full mx-auto">
        <h2 className="font-heading text-[28px] font-bold">Welcome Back</h2>
        <p className="text-slate-500 text-[14px]">Sign in to access your administrative dashboard & academic workflows.</p>

        <div className="flex bg-slate-100 p-1 rounded-lg mt-6 text-[13px] font-medium">
          <button className="flex-1 bg-white py-2 rounded-md shadow-sm">Staff & Faculty</button>
          <button className="flex-1 py-2 text-slate-500">Student & Parent</button>
        </div>

        <label className="mt-6 text-[13px] font-medium">Institutional Email</label>
        <input placeholder="faculty.lead@academy.edu" className="w-full mt-1 border border-border rounded-lg px-3 py-2.5 outline-none focus:border-primary" />
        <label className="mt-4 text-[13px] font-medium flex justify-between">Security Password <span className="text-primary text-[12px] cursor-pointer">Forget password?</span></label>
        <input type="password" placeholder="••••••••••" className="w-full mt-1 border border-border rounded-lg px-3 py-2.5 outline-none focus:border-primary" />

        <label className="flex gap-2 items-center mt-3 text-[13px]"><input type="checkbox" defaultChecked className="accent-[#4338CA]" /> Remember device for 30 days</label>

        <button onClick={goDashboard} className="w-full bg-primary hover:bg-[#3730A3] text-white py-3 rounded-lg font-semibold mt-5">Sign In to Dashboard →</button>
        <p className="text-center text-[12px] text-slate-400 my-3">OR CONTINUE WITH</p>
        <button className="w-full border border-border py-2.5 rounded-lg text-[13px] font-medium">G Sign in with Google Workspace for Education</button>

        <p className="text-center text-[13px] mt-5 text-slate-500">Don't have an institution account? <button onClick={goRegister} className="text-primary font-semibold">Enroll School</button> • Request Live Demo</p>
      </div>
    </div>
  );
}