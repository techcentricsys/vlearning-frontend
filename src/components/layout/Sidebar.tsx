import React from 'react';

interface SidebarProps { collapsed: boolean; onToggle: () => void; }
const groups = [
  { title: 'Main Menu', items: [['grid_view','Dashboard'],['group','Students'],['how_to_reg','Admissions'],['menu_book','Academics'],['fact_check','Attendance'],['account_balance_wallet','Fees & Accounts'],['assignment','Examinations']] },
  { title: 'Management', items: [['badge','Teachers & Staff'],['payments','HR & Payroll'],['local_library','Library'],['directions_bus','Transport'],['apartment','Hostel']] },
  {
  title: 'System',
  items: [
    ['analytics', 'Reports & Analytics'],
    ['notifications', 'Notifications'],
    ['settings', 'Settings'],
  ],
},
];
export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => (
  <aside className={`fixed left-0 top-0 h-full ${collapsed ? 'w-[76px]' : 'w-[250px]'} bg-surface-container-lowest border-r border-outline-variant/30 z-50 flex flex-col justify-between select-none transition-all duration-200`}>
    <div className="flex flex-col h-[calc(100%-80px)] min-h-0">
      <div className={`h-16 ${collapsed ? 'px-3 justify-center' : 'px-4 justify-between'} border-b border-outline-variant/30 flex items-center shrink-0`}>
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center text-on-primary shrink-0"><span className="material-symbols-outlined text-[20px]">school</span></div>
          {!collapsed && <div className="flex flex-col"><div className="flex items-center gap-1"><span className="text-base font-bold text-on-surface tracking-tight">VLearnings</span><span className="text-[11px] px-1.5 py-0.5 rounded bg-primary-fixed text-primary font-semibold">SMS</span></div><span className="text-[10px] leading-tight text-on-surface-variant">v2.4.0 Enterprise</span></div>}
        </div>
        {!collapsed && <button type="button" aria-label="Collapse sidebar" title="Collapse sidebar" onClick={onToggle} className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container-low"><span className="material-symbols-outlined text-[20px]">menu_open</span></button>}
      </div>
      <div className="overflow-y-auto px-2 py-4 space-y-4 flex-1">
        {groups.map(group => <div className="space-y-1" key={group.title}>
          {!collapsed && <div className="px-2 text-xs uppercase tracking-wider text-on-surface-variant font-semibold">{group.title}</div>}
          <nav className="space-y-1" aria-label={group.title}>{group.items.map(([icon,label]) => <button
            type="button"
            key={label}
            title={collapsed ? label : undefined}
            aria-current={label === 'Dashboard' ? 'page' : undefined}
            className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'gap-2 px-3'} py-2 rounded-lg ${label === 'Dashboard' ? 'bg-primary-fixed text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'} transition-colors text-sm`}
          ><span className="material-symbols-outlined text-[20px]">{icon}</span>{!collapsed && <span>{label}</span>}</button>)}</nav>
        </div>)}
      </div>
    </div>
    <div className={`h-20 ${collapsed ? 'px-2 justify-center' : 'px-3 justify-between'} border-t border-outline-variant/30 flex items-center bg-surface-container-low/50`}>
      <div className="flex items-center gap-2 min-w-0"><div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div>{!collapsed && <div className="flex flex-col min-w-0"><span className="text-sm font-semibold text-on-surface truncate">Dr. Sarah Jenkins</span><span className="text-[11px] text-on-surface-variant truncate">Super Admin</span></div>}</div>
      {collapsed && <button type="button" title="Expand sidebar" aria-label="Expand sidebar" onClick={onToggle} className="absolute left-[54px] bottom-[88px] bg-surface-container-lowest border rounded-full shadow p-1 text-on-surface-variant"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>}
    </div>
  </aside>
);
