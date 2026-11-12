import React, { useState } from 'react';

export const FinancialSummaryWidget: React.FC = () => {
  const [period, setPeriod] = useState<'Monthly' | 'Yearly'>('Monthly');
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/40 shadow-sm flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-outline-variant/30">
        <div>
          <h2 className="text-base font-semibold text-on-surface">{period} Fee Collection</h2>
          <p className="text-xs text-on-surface-variant">Collected vs Outstanding fee distribution ({period.toLowerCase()} view)</p>
        </div>
        <div className="inline-flex rounded-lg bg-surface-container-low p-1 border border-outline-variant/30 text-xs font-medium">
          <button onClick={() => setPeriod('Monthly')} className={`px-3 py-1 rounded ${period === 'Monthly' ? 'bg-surface-container-lowest font-semibold text-primary shadow-xs' : 'text-on-surface-variant'}`} type="button">Monthly</button>
          <button onClick={() => setPeriod('Yearly')} className={`px-3 py-1 rounded ${period === 'Yearly' ? 'bg-surface-container-lowest font-semibold text-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}`} type="button">Yearly</button>
        </div>
      </div>

      {/* Bar Chart Area */}
      <div className="relative w-full h-64 my-4">
        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 540 220">
          <line stroke="#d3e4fe" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="520" y1="30" y2="30"></line>
          <text fill="#777586" fontSize="11" textAnchor="end" x="32" y="34">1.0M</text>
          <line stroke="#d3e4fe" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="520" y1="80" y2="80"></line>
          <text fill="#777586" fontSize="11" textAnchor="end" x="32" y="84">750k</text>
          <line stroke="#d3e4fe" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="520" y1="130" y2="130"></line>
          <text fill="#777586" fontSize="11" textAnchor="end" x="32" y="134">500k</text>
          <line stroke="#c7c4d7" strokeWidth="1" x1="40" x2="520" y1="180" y2="180"></line>

          {/* May */}
          <rect fill="#4338ca" height="102" rx="3" width="16" x="62" y="78"></rect>
          <rect fill="#ffb597" height="30" rx="3" width="16" x="80" y="150"></rect>
          <text fill="#464554" fontSize="12" textAnchor="middle" x="79" y="200">May</text>

          {/* Jun */}
          <rect fill="#4338ca" height="114" rx="3" width="16" x="142" y="66"></rect>
          <rect fill="#ffb597" height="27" rx="3" width="16" x="160" y="153"></rect>
          <text fill="#464554" fontSize="12" textAnchor="middle" x="159" y="200">Jun</text>

          {/* Jul */}
          <rect fill="#4338ca" height="122" rx="3" width="16" x="222" y="58"></rect>
          <rect fill="#ffb597" height="23" rx="3" width="16" x="240" y="157"></rect>
          <text fill="#464554" fontSize="12" textAnchor="middle" x="239" y="200">Jul</text>

          {/* Aug */}
          <rect fill="#4338ca" height="133" rx="3" width="16" x="302" y="47"></rect>
          <rect fill="#ffb597" height="18" rx="3" width="16" x="320" y="162"></rect>
          <text fill="#464554" fontSize="12" textAnchor="middle" x="319" y="200">Aug</text>

          {/* Sep */}
          <rect fill="#4338ca" height="128" rx="3" width="16" x="382" y="52"></rect>
          <rect fill="#ffb597" height="20" rx="3" width="16" x="400" y="160"></rect>
          <text fill="#464554" fontSize="12" textAnchor="middle" x="399" y="200">Sep</text>

          {/* Oct */}
          <rect fill="#4338ca" height="140" rx="3" width="16" x="462" y="40"></rect>
          <rect fill="#ffb597" height="35" rx="3" width="16" x="480" y="145"></rect>
          <text fill="#0b1c30" fontSize="12" fontWeight="700" textAnchor="middle" x="479" y="200">Oct</text>
        </svg>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-primary-container"></span>
            <span className="text-on-surface font-medium">Collected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-tertiary-fixed-dim"></span>
            <span className="text-on-surface-variant font-medium">Outstanding</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-on-surface-variant">Avg Collection: </span>
          <span className="text-sm font-bold text-on-surface">Rs. 748,300/mo</span>
        </div>
      </div>
    </div>
  );
};