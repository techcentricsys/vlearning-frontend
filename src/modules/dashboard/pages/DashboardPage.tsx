import React, { useEffect, useState } from 'react';
import { KPIWidgets } from '../widgets/KPIWidgets';
import { FinancialSummaryWidget } from '../widgets/FinancialSummaryWidget';
import { DashboardSkeleton } from './DashboardSkeleton';
import { fetchDashboardMetrics, fetchRecentActivities, fetchUpcomingEvents } from '../services/dashboardService';
import { DashboardMetrics, ActivityLogItem, AcademicEvent } from '../types/dashboardTypes';

export const DashboardPage: React.FC<{ onAction: (title: string) => void }> = ({ onAction }) => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [activities, setActivities] = useState<ActivityLogItem[]>([]);
  const [events, setEvents] = useState<AcademicEvent[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [mRes, aRes, eRes] = await Promise.all([
          fetchDashboardMetrics(),
          fetchRecentActivities(),
          fetchUpcomingEvents()
        ]);
        setMetrics(mRes);
        setActivities(aRes);
        setEvents(eRes);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading || !metrics) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Top Welcome & Controls Bar */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/40 shadow-sm">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-on-surface tracking-tight">Good Morning, Administrator!</h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-container-low text-secondary border border-outline-variant/30">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              Live Sync Active
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-on-surface-variant text-xs">
            <span>Here's what's happening at your school today.</span>
            <span className="text-outline-variant/60">•</span>
            <span className="inline-flex items-center gap-1 text-on-surface font-medium">
              <span className="material-symbols-outlined text-[16px] text-secondary">calendar_today</span>
              Thursday, October 24, 2024
            </span>
            <span className="text-outline-variant/60">•</span>
            <span className="px-2 py-0.5 rounded bg-primary-fixed text-primary font-semibold">
              AY 2024-25 • Term 2
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
          <button onClick={() => onAction('Generate Report')} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-outline-variant/60 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface text-sm font-medium transition-colors shadow-sm" type="button">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">file_download</span>
            <span>Generate Report</span>
          </button>
          <button onClick={() => onAction('Add New Student')} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary text-sm font-semibold transition-all shadow-sm" type="button">
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>+ Add New Student</span>
          </button>
        </div>
      </section>

      {/* KPI Summary Cards */}
      <KPIWidgets metrics={metrics} />

      {/* Quick Action Shortcuts Bar */}
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 p-3 shadow-sm flex flex-wrap items-center gap-2 sm:gap-3">
        <span className="px-2 text-xs uppercase tracking-wider text-on-surface-variant font-semibold shrink-0">
          Quick Actions:
        </span>
        <button onClick={() => onAction('Add Student')} className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-low hover:bg-primary-fixed/50 hover:text-primary text-on-surface text-sm font-medium transition-all" type="button">
          <span className="material-symbols-outlined text-primary text-[18px]">add_circle</span>
          <span>Add Student</span>
        </button>
        <button onClick={() => onAction('Record Attendance')} className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-low hover:bg-secondary-fixed/50 hover:text-secondary text-on-surface text-sm font-medium transition-all" type="button">
          <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
          <span>Record Attendance</span>
        </button>
        <button onClick={() => onAction('Collect Fee')} className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-low hover:bg-secondary-container/50 hover:text-on-secondary-container text-on-surface text-sm font-medium transition-all" type="button">
          <span className="material-symbols-outlined text-secondary text-[18px]">payments</span>
          <span>Collect Fee</span>
        </button>
        <button onClick={() => onAction('Add Teacher')} className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-low hover:bg-primary-fixed/50 hover:text-primary text-on-surface text-sm font-medium transition-all" type="button">
          <span className="material-symbols-outlined text-primary text-[18px]">badge</span>
          <span>Add Teacher</span>
        </button>
      </section>

      {/* Primary Analytics Section (Two Columns) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trends */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/40 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-outline-variant/30">
            <div>
              <h2 className="text-base font-semibold text-on-surface">Student Attendance Trends</h2>
              <p className="text-xs text-on-surface-variant">Daily attendance rate across institutional cohorts</p>
            </div>
            <div className="inline-flex rounded-lg bg-surface-container-low p-1 border border-outline-variant/30 text-xs">
              <button onClick={() => onAction('Attendance Trend: Current Week')} className="px-3 py-1 rounded bg-surface-container-lowest font-semibold text-primary shadow-xs" type="button">Current Week</button>
              <button onClick={() => onAction('Attendance Trend: Current Month')} className="px-3 py-1 rounded text-on-surface-variant hover:text-on-surface transition-colors" type="button">Current Month</button>
            </div>
          </div>
          <div className="relative w-full h-64 my-4">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 540 220">
              <defs>
                <linearGradient id="attendanceGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#4338ca" stopOpacity="0.25"></stop>
                  <stop offset="100%" stopColor="#4338ca" stopOpacity="0.0"></stop>
                </linearGradient>
              </defs>
              <line stroke="#d3e4fe" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="520" y1="20" y2="20"></line>
              <text fill="#777586" fontSize="11" textAnchor="end" x="30" y="24">100%</text>
              <line stroke="#d3e4fe" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="520" y1="65" y2="65"></line>
              <text fill="#777586" fontSize="11" textAnchor="end" x="30" y="69">95%</text>
              <line stroke="#d3e4fe" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="520" y1="110" y2="110"></line>
              <text fill="#777586" fontSize="11" textAnchor="end" x="30" y="114">90%</text>
              <line stroke="#c7c4d7" strokeWidth="1" x1="40" x2="520" y1="190" y2="190"></line>
              <path d="M 60,88 C 120,64 150,64 175,64 C 200,64 250,70 290,70 C 330,70 370,54 405,54 C 440,54 480,70 500,70 L 500,190 L 60,190 Z" fill="url(#attendanceGradient)"></path>
              <path d="M 60,88 C 120,64 150,64 175,64 C 200,64 250,70 290,70 C 330,70 370,54 405,54 C 440,54 480,70 500,70" fill="none" stroke="#4338ca" strokeLinecap="round" strokeWidth="3"></path>
              
              <circle cx="60" cy="88" fill="#ffffff" r="4" stroke="#4338ca" strokeWidth="2.5"></circle>
              <text fill="#464554" fontSize="12" fontWeight="500" textAnchor="middle" x="60" y="208">Mon</text>
              
              <circle cx="175" cy="64" fill="#ffffff" r="4" stroke="#4338ca" strokeWidth="2.5"></circle>
              <text fill="#464554" fontSize="12" fontWeight="500" textAnchor="middle" x="175" y="208">Tue</text>
              
              <circle cx="290" cy="70" fill="#ffffff" r="4" stroke="#4338ca" strokeWidth="2.5"></circle>
              <text fill="#464554" fontSize="12" fontWeight="500" textAnchor="middle" x="290" y="208">Wed</text>
              
              <line stroke="#006a61" strokeDasharray="3 3" strokeWidth="1.5" x1="405" x2="405" y1="54" y2="190"></line>
              <circle cx="405" cy="54" fill="#006a61" r="6" stroke="#ffffff" strokeWidth="3"></circle>
              <rect fill="#0b1c30" height="24" rx="6" width="80" x="365" y="20"></rect>
              <text fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle" x="405" y="36">96.2% Peak</text>
              <text fill="#0b1c30" fontSize="12" fontWeight="700" textAnchor="middle" x="405" y="208">Thu</text>

              <circle cx="500" cy="70" fill="#ffffff" r="4" stroke="#4338ca" strokeWidth="2.5"></circle>
              <text fill="#464554" fontSize="12" fontWeight="500" textAnchor="middle" x="500" y="208">Fri</text>
            </svg>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-outline-variant/20 bg-surface-container-low/40 rounded-lg p-2.5">
            <div className="flex flex-col items-center text-center">
              <span className="text-[11px] text-on-surface-variant font-medium">Grades 1-5</span>
              <span className="text-sm font-bold text-on-surface">96.0%</span>
            </div>
            <div className="flex flex-col items-center text-center border-x border-outline-variant/30">
              <span className="text-[11px] text-on-surface-variant font-medium">Grades 6-8</span>
              <span className="text-sm font-bold text-on-surface">94.0%</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-[11px] text-on-surface-variant font-medium">Grades 9-12</span>
              <span className="text-sm font-bold text-on-surface">93.5%</span>
            </div>
          </div>
        </div>

        {/* Financial Summary Widget */}
        <FinancialSummaryWidget />
      </section>

      {/* Secondary Analytics Section (3 Columns) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Distribution */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/40 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
            <div>
              <h2 className="text-base font-semibold text-on-surface">Student Distribution</h2>
              <p className="text-xs text-on-surface-variant">Breakdown by academic tiers</p>
            </div>
            <button onClick={() => onAction('Student Distribution Options')} className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container-low transition-colors" type="button">
              <span className="material-symbols-outlined text-[20px]">more_horiz</span>
            </button>
          </div>
          <div className="relative flex items-center justify-center my-6">
            <svg className="w-48 h-48 -rotate-90 transform" viewBox="0 0 160 160">
              <circle cx="80" cy="80" fill="transparent" r="60" stroke="#eff4ff" strokeWidth="18"></circle>
              <circle cx="80" cy="80" fill="transparent" r="60" stroke="#4338ca" strokeDasharray="126.7 377" strokeDashoffset="0" strokeWidth="18"></circle>
              <circle cx="80" cy="80" fill="transparent" r="60" stroke="#006a61" strokeDasharray="108.6 377" strokeDashoffset="-126.7" strokeWidth="18"></circle>
              <circle cx="80" cy="80" fill="transparent" r="60" stroke="#86f2e4" strokeDasharray="84.4 377" strokeDashoffset="-235.3" strokeWidth="18"></circle>
              <circle cx="80" cy="80" fill="transparent" r="60" stroke="#c3c0ff" strokeDasharray="57.3 377" strokeDashoffset="-319.7" strokeWidth="18"></circle>
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold text-on-surface leading-tight">1,248</span>
              <span className="text-[11px] text-on-surface-variant font-medium">Total Enrolled</span>
            </div>
          </div>
          <div className="space-y-2 pt-2 border-t border-outline-variant/20 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                <span className="text-on-surface font-medium">Primary (Grades 1-5)</span>
              </div>
              <span className="font-semibold text-on-surface">420 <span className="text-on-surface-variant font-normal">(33.6%)</span></span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                <span className="text-on-surface font-medium">Middle (Grades 6-8)</span>
              </div>
              <span className="font-semibold text-on-surface">360 <span className="text-on-surface-variant font-normal">(28.8%)</span></span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span>
                <span className="text-on-surface font-medium">High School (9-10)</span>
              </div>
              <span className="font-semibold text-on-surface">280 <span className="text-on-surface-variant font-normal">(22.4%)</span></span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-fixed-dim"></span>
                <span className="text-on-surface font-medium">Senior Secondary (11-12)</span>
              </div>
              <span className="font-semibold text-on-surface">188 <span className="text-on-surface-variant font-normal">(15.2%)</span></span>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/40 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
            <div>
              <h2 className="text-base font-semibold text-on-surface">Upcoming Events</h2>
              <p className="text-xs text-on-surface-variant">Key schedule & deadlines</p>
            </div>
            <button onClick={() => onAction('Academic Calendar')} className="text-xs font-semibold text-primary hover:text-on-primary-fixed-variant transition-colors">
              View Calendar
            </button>
          </div>
          <div className="space-y-3 my-3">
            {events.map((ev) => (
              <div key={ev.id} className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-low/50 hover:bg-surface-container-low transition-colors">
                <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-tertiary-fixed text-tertiary shrink-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider">{ev.month}</span>
                  <span className="text-base font-bold leading-none">{ev.date}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-tertiary-fixed-dim text-on-tertiary-fixed-variant">{ev.type}</span>
                    <span className="text-[11px] text-on-surface-variant">{ev.time}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-on-surface truncate mt-0.5">{ev.title}</h3>
                  <p className="text-[11px] text-on-surface-variant truncate">{ev.location}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
            <span>4 activities in next 30 days</span>
            <button onClick={() => onAction('Add Event')} className="text-primary hover:text-on-primary-fixed-variant font-semibold inline-flex items-center gap-1" type="button">
              <span className="material-symbols-outlined text-[16px]">add</span> Add Event
            </button>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/40 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
            <div>
              <h2 className="text-base font-semibold text-on-surface">Recent Activities</h2>
              <p className="text-xs text-on-surface-variant">Real-time campus operational log</p>
            </div>
            <button onClick={() => onAction('Audit Log')} className="text-xs font-semibold text-primary hover:text-on-primary-fixed-variant transition-colors">
              Audit Log
            </button>
          </div>
          <div className="space-y-3.5 my-3">
            {activities.map((act) => (
              <div key={act.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary-fixed/50 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">person_check</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-sm font-semibold text-on-surface truncate">{act.title}</span>
                    <span className="text-[11px] text-on-surface-variant shrink-0">{act.time}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant truncate">{act.subtitle}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] text-outline">By: {act.author}</span>
                    <span className="px-2 py-0.2 rounded-full text-[11px] bg-secondary-container/40 text-on-secondary-container font-semibold">{act.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-[11px] text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Listening to admin webhook events
            </span>
            <button onClick={() => onAction('Dashboard Data Refreshed')} className="text-on-surface hover:text-primary transition-colors font-medium" type="button">Refresh</button>
          </div>
        </div>
      </section>
    </div>
  );
};