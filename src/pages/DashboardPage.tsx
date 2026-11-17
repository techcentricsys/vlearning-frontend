import React, { useState } from 'react';
import {
  GraduationCap,
  UserCheck,
  Receipt,
  FileSpreadsheet,
  Download,
  Plus,
  Calendar,
  CheckCircle2,
  MoreVertical,
  ArrowUpRight,
  Sparkles,
  CreditCard,
  UserPlus,
  BookOpen,
  Send,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import {
  MOCK_METRICS,
  MOCK_WEEKLY_ATTENDANCE,
  MOCK_STUDENT_DISTRIBUTION,
  MOCK_UPCOMING_EVENTS,
  MOCK_RECENT_ACTIVITIES
} from '../data/mockData';

interface DashboardPageProps {
  currentUser: UserProfile;
  activeRole: UserRole;
  onNavigateAction?: (target: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  currentUser,
  activeRole,
  onNavigateAction
}) => {
  const [attendancePeriod, setAttendancePeriod] = useState<'week' | 'month'>('week');
  const [feePeriod, setFeePeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6 pb-16 max-w-[1600px] mx-auto">
      
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E1B4B] text-white px-5 py-3.5 rounded-2xl shadow-xl border border-indigo-900/60 flex items-center gap-3 animate-fade-in">
          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* Top Greeting Banner matching screenshot */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Good Morning, Administrator!
            </h1>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Sync Active
            </span>
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-2 flex-wrap">
            <span>Here's what's happening at your school today.</span>
            <span>•</span>
            <span className="text-slate-700 font-medium">📅 Thursday, October 24, 2024</span>
            <span>•</span>
            <span className="font-semibold text-[#5B50E8] bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
              AY 2024-25 • Term 2
            </span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button 
            onClick={() => showToast("Executive campus operational report generated and downloading...")}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all border border-slate-200 shadow-2xs"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Generate Report</span>
          </button>

          <button 
            onClick={() => {
              if (onNavigateAction) onNavigateAction('admissions');
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#5B50E8] hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/20 active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Student</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Top Stat Cards matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Students */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-indigo-300 transition-all relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Total Students</span>
            <div className="w-9 h-9 rounded-xl bg-[#EEF0FD] flex items-center justify-center text-[#5B50E8]">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
            1,248
            <span className="text-xs font-bold text-emerald-600 ml-2">↑ 3.2%</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
            <span>vs last term (1,209)</span>
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] border border-emerald-200">
              98.2% Enrolled Active
            </span>
          </div>
        </div>

        {/* Card 2: Today's Attendance */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-teal-300 transition-all relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Today's Attendance</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
            94.5%
            <span className="text-xs font-bold text-emerald-600 ml-2">↑ 1.1%</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>1,180 present</span>
            <span className="font-semibold text-rose-600 text-[11px]">68 absent</span>
          </div>
        </div>

        {/* Card 3: Fees Collected */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-blue-300 transition-all relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Fees Collected (This Term)</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
            Rs. 850,000
            <span className="text-xs font-bold text-emerald-600 ml-2">↑ 12%</span>
          </div>
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Progress to Target</span>
              <strong className="text-slate-700">80.2%</strong>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-teal-600 rounded-full" style={{ width: '80.2%' }}></div>
            </div>
          </div>
        </div>

        {/* Card 4: Outstanding Fees */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-orange-300 transition-all relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Outstanding Fees</span>
            <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
            Rs. 210,000
            <span className="text-xs text-slate-400 ml-2 font-normal">42 invoices</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>Next cycle</span>
            <span className="font-semibold text-orange-700 bg-orange-50 px-2 py-0.5 rounded text-[10px] border border-orange-200">
              Due Oct 31
            </span>
          </div>
        </div>

      </div>

      {/* QUICK ACTIONS ROW matching screenshot */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center justify-between gap-3 flex-wrap">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-2">
          QUICK ACTIONS:
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={() => onNavigateAction && onNavigateAction('admissions')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-[#EEF0FD] hover:text-[#5B50E8] border border-slate-200/80 text-xs font-semibold text-slate-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#5B50E8]" />
            <span>Add Student</span>
          </button>

          <button 
            onClick={() => showToast("Opening Daily RFID Turnstile Attendance Tracker...")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-teal-50 hover:text-teal-700 border border-slate-200/80 text-xs font-semibold text-slate-700 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Record Attendance</span>
          </button>

          <button 
            onClick={() => showToast("Opening 1Link & JazzCash Fee Collection Terminal...")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 border border-slate-200/80 text-xs font-semibold text-slate-700 transition-colors"
          >
            <CreditCard className="w-3.5 h-3.5 text-blue-600" />
            <span>Collect Fee</span>
          </button>

          <button 
            onClick={() => showToast("Opening Faculty & Staff Directory...")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200/80 text-xs font-semibold text-slate-700 transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5 text-indigo-600" />
            <span>Add Teacher</span>
          </button>

          <button 
            onClick={() => showToast("Opening Examination Controller & Date Sheet Creator...")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-orange-50 hover:text-orange-700 border border-slate-200/80 text-xs font-semibold text-slate-700 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-orange-600" />
            <span>Create Examination</span>
          </button>
        </div>
      </div>

      {/* Middle Grid: 2 Charts matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Student Attendance Trends (Area Curve Chart) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Student Attendance Trends</h3>
              <p className="text-xs text-slate-400">Daily attendance rate across institutional cohorts</p>
            </div>
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl text-xs">
              <button 
                onClick={() => setAttendancePeriod('week')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  attendancePeriod === 'week' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                Current Week
              </button>
              <button 
                onClick={() => setAttendancePeriod('month')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  attendancePeriod === 'month' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                Current Month
              </button>
            </div>
          </div>

          {/* Area Chart Visualization */}
          <div className="relative h-48 w-full pt-4">
            {/* Peak Tag */}
            <div className="absolute top-2 left-[62%] -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md flex items-center gap-1">
              <span>96.2% Peak</span>
            </div>

            {/* SVG Wave */}
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
              <defs>
                <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5B50E8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#5B50E8" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Background fill */}
              <path
                d="M 20 110 Q 120 70 200 85 T 320 40 T 450 65 L 450 150 L 20 150 Z"
                fill="url(#purpleGrad)"
              />
              {/* Purple Stroke line */}
              <path
                d="M 20 110 Q 120 70 200 85 T 320 40 T 450 65"
                fill="none"
                stroke="#5B50E8"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Points */}
              <circle cx="20" cy="110" r="4" fill="#FFFFFF" stroke="#5B50E8" strokeWidth="2.5" />
              <circle cx="120" cy="78" r="4" fill="#FFFFFF" stroke="#5B50E8" strokeWidth="2.5" />
              <circle cx="200" cy="85" r="4" fill="#FFFFFF" stroke="#5B50E8" strokeWidth="2.5" />
              <circle cx="320" cy="40" r="5" fill="#5B50E8" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="450" cy="65" r="4" fill="#FFFFFF" stroke="#5B50E8" strokeWidth="2.5" />
            </svg>

            {/* X Axis Labels */}
            <div className="flex justify-between text-xs text-slate-400 pt-2 font-medium">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span className="font-bold text-slate-700">Thu</span>
              <span>Fri</span>
            </div>
          </div>

          {/* Bottom Breakdown by Grades */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center text-xs">
            <div className="p-2 rounded-xl bg-slate-50">
              <span className="text-slate-400 block text-[10px]">Grades 1-5</span>
              <strong className="text-slate-900 font-bold">96.0%</strong>
            </div>
            <div className="p-2 rounded-xl bg-slate-50">
              <span className="text-slate-400 block text-[10px]">Grades 6-8</span>
              <strong className="text-slate-900 font-bold">94.0%</strong>
            </div>
            <div className="p-2 rounded-xl bg-slate-50">
              <span className="text-slate-400 block text-[10px]">Grades 9-12</span>
              <strong className="text-slate-900 font-bold">93.5%</strong>
            </div>
          </div>
        </div>

        {/* Chart 2: Monthly Fee Collection (Bar Chart) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Monthly Fee Collection</h3>
              <p className="text-xs text-slate-400">Collected vs Outstanding fee distribution</p>
            </div>
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl text-xs">
              <button 
                onClick={() => setFeePeriod('monthly')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  feePeriod === 'monthly' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setFeePeriod('yearly')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  feePeriod === 'yearly' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-48 flex items-end justify-between gap-3 pt-4 px-2">
            {[
              { month: 'May', col: 65, out: 20 },
              { month: 'Jun', col: 75, out: 18 },
              { month: 'Jul', col: 80, out: 16 },
              { month: 'Aug', col: 88, out: 15 },
              { month: 'Sep', col: 82, out: 19 },
              { month: 'Oct', col: 92, out: 22 },
            ].map((bar, bIdx) => (
              <div key={bIdx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div className="w-full flex items-end justify-center gap-1 h-36">
                  {/* Purple Collected Bar */}
                  <div 
                    className="w-3.5 bg-[#4338CA] rounded-t-sm transition-all"
                    style={{ height: `${bar.col}%` }}
                    title={`Collected: ${bar.col}%`}
                  />
                  {/* Peach Outstanding Bar */}
                  <div 
                    className="w-3.5 bg-[#FDBA74] rounded-t-sm transition-all"
                    style={{ height: `${bar.out}%` }}
                    title={`Outstanding: ${bar.out}%`}
                  />
                </div>
                <span className="text-[11px] text-slate-400 font-medium">{bar.month}</span>
              </div>
            ))}
          </div>

          {/* Bottom Legend */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#4338CA]"></span> Collected
              </span>
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#FDBA74]"></span> Outstanding
              </span>
            </div>
            <span className="text-slate-500 font-medium text-[11px]">
              Avg Collection: <strong className="text-slate-800">Rs. 748,300/mo</strong>
            </span>
          </div>
        </div>

      </div>

      {/* Bottom Grid: 3 Columns matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Student Distribution (Donut Chart) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Student Distribution</h3>
              <p className="text-xs text-slate-400">Breakdown by academic tiers</p>
            </div>
            <button className="text-slate-400 hover:text-slate-700">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Circular Donut Mockup */}
          <div className="relative flex items-center justify-center py-2">
            <div className="w-36 h-36 rounded-full border-[12px] border-t-[#4F46E5] border-r-[#0D9488] border-b-[#06B6D4] border-l-[#C7D2FE] flex items-center justify-center">
              <div className="text-center">
                <div className="text-xl font-extrabold text-slate-900">1,248</div>
                <div className="text-[10px] text-slate-400 font-medium">Total Enrolled</div>
              </div>
            </div>
          </div>

          {/* Legend Items */}
          <div className="space-y-2 text-xs pt-1">
            {MOCK_STUDENT_DISTRIBUTION.map((dist, idx) => (
              <div key={idx} className="flex items-center justify-between text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dist.color }}></span>
                  <span>{dist.tier}</span>
                </div>
                <span className="font-bold text-slate-800 font-mono">
                  {dist.count} <span className="text-slate-400 font-normal">({dist.percentage}%)</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Upcoming Events matching screenshot */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Upcoming Events</h3>
              <p className="text-xs text-slate-400">Key schedule & deadlines</p>
            </div>
            <button className="text-xs font-bold text-[#5B50E8] hover:underline">
              View Calendar
            </button>
          </div>

          <div className="space-y-3">
            {MOCK_UPCOMING_EVENTS.map((ev) => (
              <div key={ev.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/70 transition-colors">
                {/* Date Block */}
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center font-bold shrink-0">
                  <span className="text-[9px] uppercase text-slate-400">{ev.date.split(' ')[0]}</span>
                  <span className="text-base text-slate-900 leading-tight">{ev.date.split(' ')[1]}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${ev.color}`}>
                      {ev.badge}
                    </span>
                    <span className="text-[10px] text-slate-400">{ev.time}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 truncate">{ev.title}</h4>
                  <p className="text-[11px] text-slate-400 truncate">{ev.venue}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
            <span>4 activities in next 30 days</span>
            <button className="font-semibold text-[#5B50E8] hover:underline">+ Add Event</button>
          </div>
        </div>

        {/* Column 3: Recent Activities matching screenshot */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Activities</h3>
              <p className="text-xs text-slate-400">Real-time campus operational log</p>
            </div>
            <button className="text-xs font-bold text-[#5B50E8] hover:underline">
              Audit Log
            </button>
          </div>

          <div className="space-y-3.5">
            {MOCK_RECENT_ACTIVITIES.map((act) => (
              <div key={act.id} className="flex items-start justify-between gap-2 text-xs">
                <div>
                  <div className="font-bold text-slate-900">{act.title}</div>
                  <div className="text-[11px] text-slate-600">{act.subtitle}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">By: {act.author}</div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${act.statusColor}`}>
                    {act.status}
                  </span>
                  <span className="block text-[10px] text-slate-400 mt-1">{act.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Listening to admin webhook events
            </span>
            <button className="hover:text-slate-600">Refresh</button>
          </div>
        </div>

      </div>

    </div>
  );
};
