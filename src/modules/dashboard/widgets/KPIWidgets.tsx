import React from 'react';

interface KPIWidgetsProps {
  metrics: {
    totalStudents: number;
    studentsGrowth: string;
    attendanceRate: string;
    attendanceGrowth: string;
    feesCollected: string;
    feesProgress: number;
    outstandingFees: string;
    outstandingInvoices: number;
  };
}

export const KPIWidgets: React.FC<KPIWidgetsProps> = ({ metrics }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Total Students */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/40 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-on-surface-variant">Total Students</span>
            <div className="w-10 h-10 rounded-lg bg-primary-fixed/60 text-primary flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-[22px]">school</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-on-surface tracking-tight">{metrics.totalStudents.toLocaleString()}</span>
            <span className="inline-flex items-center text-xs font-semibold text-secondary">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
              {metrics.studentsGrowth}
            </span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between">
          <span className="text-[11px] text-on-surface-variant">vs last term (1,209)</span>
          <span className="px-2 py-0.5 rounded-full text-[11px] bg-secondary-fixed/50 text-on-secondary-container font-semibold">
            98.2% Enrolled Active
          </span>
        </div>
      </div>

      {/* Card 2: Today's Attendance */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/40 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-on-surface-variant">Today's Attendance</span>
            <div className="w-10 h-10 rounded-lg bg-secondary-container/40 text-secondary flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-[22px]">fact_check</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-on-surface tracking-tight">{metrics.attendanceRate}</span>
            <span className="inline-flex items-center text-xs font-semibold text-secondary">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
              {metrics.attendanceGrowth}
            </span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between">
          <span className="text-[11px] text-on-surface-variant font-medium">1,180 present</span>
          <span className="text-[11px] text-error font-medium">68 absent</span>
        </div>
      </div>

      {/* Card 3: Fees Collected */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/40 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-on-surface-variant">Fees Collected (This Term)</span>
            <div className="w-10 h-10 rounded-lg bg-surface-container-high text-secondary flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-[22px]">account_balance_wallet</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-on-surface tracking-tight">{metrics.feesCollected}</span>
            <span className="inline-flex items-center text-xs font-semibold text-secondary">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
              12%
            </span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-outline-variant/20 space-y-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-on-surface-variant">Progress to Target</span>
            <span className="font-semibold text-on-surface">{metrics.feesProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-secondary rounded-full" style={{ width: `${metrics.feesProgress}%` }}></div>
          </div>
        </div>
      </div>

      {/* Card 4: Outstanding Fees */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/40 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-on-surface-variant">Outstanding Fees</span>
            <div className="w-10 h-10 rounded-lg bg-tertiary-fixed text-tertiary flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-[22px]">pending_actions</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-on-surface tracking-tight">{metrics.outstandingFees}</span>
            <span className="text-[11px] text-on-surface-variant font-medium">{metrics.outstandingInvoices} invoices</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between">
          <span className="text-[11px] text-on-surface-variant">Next cycle</span>
          <span className="px-2 py-0.5 rounded text-[11px] bg-error-container/60 text-on-error-container font-semibold">
            Due Oct 31
          </span>
        </div>
      </div>
    </section>
  );
};