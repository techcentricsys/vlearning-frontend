export default function Register({ goLogin, goDashboard }: any) {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="bg-[#EAF0FF] p-10 hidden md:flex flex-col justify-between">
        <div className="flex items-center gap-2"><div className="w-9 h-9 bg-primary rounded-lg text-white flex items-center justify-center font-bold">V</div><b className="font-heading">VLearnings</b><span className="text-[11px] bg-white px-2 py-1 rounded-full">CLOUD v2.4</span></div>
        <div>
          <h1 className="font-heading text-[38px] leading-[1.1] font-extrabold">Bring Your School Into the Digital Era</h1>
          <p className="text-slate-600 mt-3 text-[15px]">Streamline campus administration, automate core academic workflows, and deliver a connected digital experience.</p>
          <div className="space-y-3 mt-6">
            {["Manage Students & Staff", "Automate Attendance & Fees", "Monitor Academic Performance"].map(t => (
              <div key={t} className="bg-white rounded-xl p-3"><b className="text-[13px]">{t}</b><p className="text-[12px] text-slate-500">Unified central directory, automated billing, real-time analytics.</p></div>
            ))}
          </div>
        </div>
        <p className="text-[11px] text-slate-500">TRUSTED BY 450+ EDUCATIONAL INSTITUTIONS ACROSS 18 COUNTRIES</p>
      </div>

      <div className="p-8 md:p-12 flex flex-col justify-center max-w-[560px] w-full mx-auto">
        <p className="text-[11px] tracking-widest text-primary font-semibold">● INSTITUTIONAL ONBOARDING</p>
        <h2 className="font-heading text-[26px] font-bold mt-1">Create Your School Account</h2>
        <p className="text-slate-500 text-[13px]">Set up your institution's central workspace in under 3 minutes. No credit card required.</p>

        <label className="mt-6 text-[13px] font-medium">School / Institution Name</label>
        <input placeholder="e.g. St. Jude's International Academy" className="w-full mt-1 border border-border rounded-lg px-3 py-2.5 outline-none focus:border-primary" />

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div><label className="text-[13px] font-medium">Administrator Full Name</label><input placeholder="e.g. Dr. Sarah Jenkins" className="w-full mt-1 border border-border rounded-lg px-3 py-2.5 outline-none focus:border-primary" /></div>
          <div><label className="text-[13px] font-medium">Official Email Address</label><input placeholder="s.jenkins@academy.edu" className="w-full mt-1 border border-border rounded-lg px-3 py-2.5 outline-none focus:border-primary" /></div>
        </div>

        <label className="mt-4 text-[13px] font-medium">Campus Contact Phone</label>
        <input placeholder="+92 (300) 019-2834" className="w-full mt-1 border border-border rounded-lg px-3 py-2.5 outline-none focus:border-primary" />

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div><label className="text-[13px] font-medium">Create Master Password</label><input type="password" placeholder="••••••••" className="w-full mt-1 border border-border rounded-lg px-3 py-2.5 outline-none focus:border-primary" /></div>
          <div><label className="text-[13px] font-medium">Confirm Master Password</label><input type="password" placeholder="••••••••" className="w-full mt-1 border border-border rounded-lg px-3 py-2.5 outline-none focus:border-primary" /></div>
        </div>

        <div className="mt-4"><div className="flex justify-between text-[12px]"><span>Password Strength</span><span className="text-success font-semibold">Strong & Compliant</span></div><div className="h-1.5 bg-slate-100 rounded-full mt-1"><div className="h-full w-[90%] bg-success rounded-full"></div></div></div>

        <label className="flex gap-2 text-[12px] mt-4 text-slate-600"><input type="checkbox" defaultChecked className="accent-[#4338CA]" /> Agree to the Institutional Master Agreement, FERPA Compliance Standards, and Privacy Policy.</label>

        <button onClick={goDashboard} className="w-full bg-primary text-white py-3 rounded-lg font-semibold mt-5">Create School Account & Start Free Trial →</button>
        <p className="text-center text-[13px] mt-4 text-slate-500">Already have an institution registered? <button onClick={goLogin} className="text-primary font-semibold">Sign In</button></p>
      </div>
    </div>
  );
}