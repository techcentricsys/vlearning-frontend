export default function Dashboard() {
  const cards = [
    { label: "Total Students", value: "1,248", sub: "98.2% Enrolled Active", color: "text-primary", bg: "bg-indigo-50" },
    { label: "Today's Attendance", value: "94.5%", sub: "1,180 present • 68 absent", color: "text-teal", bg: "bg-teal-50" },
    { label: "Fees Collected (This Term)", value: "Rs. 850,000", sub: "Progress to Target 80.3%", color: "text-secondary", bg: "bg-indigo-50" },
    { label: "Outstanding Fees", value: "Rs. 210,000", sub: "43 invoices • Due Oct 31", color: "text-pending", bg: "bg-amber-50" },
  ];
  return (
    <div className="p-6 md:p-8 flex-1">
      <div className="flex justify-between items-center">
        <div><h1 className="font-heading text-[26px] font-bold">Good Morning, Administrator! <span className="text-[11px] bg-teal-50 text-teal px-2 py-1 rounded-full font-sans font-medium">● Live Sync Active</span></h1><p className="text-slate-500 text-[13px]">Here's what's happening at your school today. • Thursday, October 24, 2024</p></div>
        <div className="flex gap-2"><button className="border border-border bg-white px-3 py-2 rounded-lg text-[13px]">↓ Generate Report</button><button className="bg-primary text-white px-3 py-2 rounded-lg text-[13px]">+ Add New Student</button></div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mt-6">
        {cards.map(c => (
          <div key={c.label} className="bg-white border border-border rounded-2xl p-5">
            <div className="flex justify-between"><p className="text-[12px] text-slate-500 font-medium">{c.label}</p><span className={`w-7 h-7 ${c.bg} rounded-lg flex items-center justify-center ${c.color}`}>◈</span></div>
            <p className="font-heading text-[26px] font-bold mt-2">{c.value}</p>
            <p className="text-[12px] text-slate-500 mt-1">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 items-center mt-5 bg-white border border-border rounded-xl p-3 text-[13px] font-medium">
        <span className="text-slate-500 text-[11px]">QUICK ACTIONS:</span>
        {["+ Add Student", "◷ Record Attendance", "₨ Collect Fee", "+ Add Teacher", "✎ Create Examination"].map(a => <button key={a} className="bg-slate-50 px-3 py-1.5 rounded-lg hover:bg-indigo-50 hover:text-primary">{a}</button>)}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="bg-white border border-border rounded-2xl p-5">
          <div className="flex justify-between"><div><b>Student Attendance Trends</b><p className="text-[12px] text-slate-500">Daily attendance rate across institutional cohorts</p></div><span className="text-[12px] bg-slate-100 px-2 py-1 rounded">Current Week</span></div>
          <div className="flex items-end gap-6 h-[140px] mt-6 px-2">{[82, 88, 85, 96, 92].map((h, i) => <div key={i} className="flex-1 flex flex-col items-center gap-2"><div className="w-full bg-primary rounded-t-lg" style={{ height: `${h}px` }}></div><span className="text-[11px]">Mon Tue Wed Thu Fri</span></div>)}</div>
          <div className="grid grid-cols-3 text-center mt-4 text-[12px]"><div><b>96.0%</b><p className="text-slate-500">Grades 1-5</p></div><div><b>94.0%</b><p className="text-slate-500">Grades 6-8</p></div><div><b>93.5%</b><p className="text-slate-500">Grades 9-12</p></div></div>
        </div>
        <div className="bg-white border border-border rounded-2xl p-5">
          <div className="flex justify-between"><div><b>Monthly Fee Collection</b><p className="text-[12px] text-slate-500">Collected vs Outstanding fee distribution</p></div><span className="text-[12px] bg-slate-100 px-2 py-1 rounded">Monthly</span></div>
          <div className="flex items-end gap-4 h-[140px] mt-6">{[90, 110, 95, 130, 115, 140].map((h, i) => <div key={i} className="flex-1 bg-secondary rounded-t-md" style={{ height: `${h}px` }}></div>)}</div>
          <p className="text-[12px] mt-3 text-slate-500">■ Collected &nbsp; ■ Outstanding &nbsp; Avg Collection: Rs. 748,300/mo</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-4">
        <div className="bg-white border border-border rounded-2xl p-5"><b>Student Distribution</b><p className="text-[12px] text-slate-500">Breakdown by academic tiers</p><div className="w-32 h-32 rounded-full mx-auto my-5 bg-conic flex items-center justify-center" style={{ background: "conic-gradient(#4338CA 0 33%, #0D9488 33% 62%, #6366F1 62% 84%, #F59E0B 84% 100%)" }}><div className="w-20 h-20 bg-white rounded-full flex flex-col items-center justify-center"><b>1,248</b><span className="text-[10px] text-slate-500">Total Enrolled</span></div></div><div className="space-y-1 text-[12px]"><p>● Primary (Grades 1-5) - 420 (33.6%)</p><p>● Middle (Grades 6-8) - 360 (28.8%)</p><p>● High (Grades 9-10) - 280 (22.4%)</p><p>● Senior Secondary (11-12) - 188 (15.2%)</p></div></div>
        <div className="bg-white border border-border rounded-2xl p-5"><div className="flex justify-between"><b>Upcoming Events</b><span className="text-primary text-[12px]">View Calendar</span></div><div className="space-y-3 mt-4 text-[13px]"><p><b className="text-primary">OCT 28</b> - Midterm Exams (Grade 10) - 09:00 AM</p><p><b className="text-teal">NOV 02</b> - Parent-Teacher Meeting - All Day</p><p><b className="text-secondary">NOV 11</b> - National Education Day - 10:00 AM</p><p><b className="text-pending">NOV 15</b> - Mid-Term School Holiday - Full Day</p></div></div>
        <div className="bg-white border border-border rounded-2xl p-5"><b>Recent Activities</b><p className="text-[12px] text-slate-500">Real-time campus operational log</p><div className="space-y-3 mt-4 text-[12px]"><p>● <b>Admission Approved</b> - Aryan Sharma (Grade 9-A) - By Dr. Sarah Jenkins - <span className="text-success">Approved</span></p><p>● <b>Fee Payment Received</b> - Rs. 45,000 - Online Transfer - <span className="text-success">Paid</span></p><p>● <b>Attendance Submitted</b> - Grade 10-B - 38 Present - <span className="text-info">Verified</span></p><p>● <b>Exam Results Published</b> - Grade 11 Physics Quiz - <span className="text-primary">Published</span></p></div></div>
      </div>
    </div>
  );
}