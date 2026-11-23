import React, { useEffect, useState } from 'react';
import type { AuthUser } from '../../auth';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeItem: string;
  onNavigate: (item: string) => void;
  activeStudentTab: string;
  activeFeesTab: string;
  currentUser: Omit<AuthUser, 'password'> | null;
  onSignOut: () => void;
  activeAcademicTab: string;
  activeHRTab: string;
  activeHostelTab: string;
}

type MenuItem = [string, string];
type MenuGroup = { title: string; items: MenuItem[] };

const groups: MenuGroup[] = [
  {
    title: 'Main Menu',
    items: [
      ['grid_view', 'Dashboard'],
      ['group', 'Students'],
      ['how_to_reg', 'Admissions'],
      ['menu_book', 'Academics & Timetable'],
      ['fact_check', 'Attendance'],
      ['account_balance_wallet', 'Fees & Accounts'],
      ['assignment', 'Examinations'],
    ],
  },
  {
    title: 'Management',
    items: [
      ['family_restroom', 'Parent & Guardian'],
      ['badge', 'Teachers & Staff'],
      ['payments', 'HR & Payroll'],
      ['local_library', 'Library'],
      ['directions_bus', 'Transport'],
      ['apartment', 'Hostel'],
    ],
  },
  {
    title: 'System',
    items: [
      ['analytics', 'Reports & Analytics'],
      ['notifications', 'Notifications'],
      ['settings', 'Settings'],
    ],
  },
];

const dropdownItems: Record<string, string[]> = {
  Attendance: ['Attendance Overview', 'Student Attendance', 'Staff Attendance', 'Attendance Records', 'Biometric / RFID', 'Attendance Reports'],
  Students: ['Overview', 'Students', 'Admissions', 'Academic Records', 'ID Cards'],
  'Parent & Guardian': ['Parent Overview', 'Parent Directory', 'Student Relationships', 'Portal Accounts', 'Communication', 'Parent Reports & Analytics'],
  Admissions: ['Applications', 'Entrance Tests', 'Merit List', 'Fee Challans'],
  'Fees & Accounts': ['Overview', 'Fee Structures', 'Fee Challans', 'Collect Fees', 'Discounts & Scholarships', 'Fines', 'Refunds', 'Financial Reports'],
  'Academics & Timetable': ['Overview', 'Class Scheduling & Timetable', 'Subject & Teacher Assignment', 'Course Outlines & Syllabi', 'Substitute Teachers', 'Academic Calendar'],
  'HR & Payroll': ['Overview', 'Employee Records', 'Attendance & Biometrics', 'Payroll Processing', 'Leave Management', 'HR Reports & Compliance'],
  Transport: ['Dashboard', 'Routes & Stops', 'Vehicles', 'Drivers', 'Student Allocation', 'Pickup & Drop Logs', 'Transport Fees'],
  Hostel: ['Overview', 'Rooms & Buildings', 'Room Allocation', 'Occupancy Tracking', 'Hostel Fees & Payments', 'Meal Plans & Menus', 'Visitor Management', 'Security Logs'],
};

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggle,
  activeItem,
  onNavigate,
  activeStudentTab,
  activeFeesTab,
  currentUser,
  onSignOut,
  activeAcademicTab,
  activeHRTab,
  activeHostelTab,
}) => {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(() => {
    if (['Applications', 'Entrance Tests', 'Merit List', 'Fee Challans'].includes(activeItem)) return 'Admissions';
    if (activeItem === 'Students') return 'Students';
    if (activeItem === 'Fees & Accounts') return 'Fees & Accounts';
    if (activeItem === 'Academics & Timetable') return 'Academics & Timetable';
    if (activeItem === 'HR & Payroll') return 'HR & Payroll';
    if (activeItem.startsWith('Transport ')) return 'Transport';
    if (activeItem === 'Hostel') return 'Hostel';
    return null;
  });

  const activeDropdown = activeItem.startsWith('Transport ') ? 'Transport' : activeItem.startsWith('Hostel ') ? 'Hostel' : activeItem.startsWith('Hostel ') ? 'Hostel' : Object.entries(dropdownItems).find(([, items]) => items.includes(activeItem))?.[0] ?? (activeItem === 'Examinations' ? 'Examinations' : undefined);
  const financeOnly = /accountant|finance officer/i.test(currentUser?.role ?? '');
  const visibleGroups: MenuGroup[] = financeOnly
    ? [{ title: 'Finance', items: [['account_balance_wallet', 'Fees & Accounts']] }]
    : groups;

  useEffect(() => {
    if (activeDropdown) setExpandedMenu(activeDropdown);
  }, [activeDropdown]);

  const isDropdownActive = (label: string) =>
    label === activeItem || (label === 'Transport' && activeItem.startsWith('Transport ')) || (dropdownItems[label]?.includes(activeItem) ?? false);

  const handleParentClick = (label: string) => {
    if (collapsed) {
      if (label === 'Students') onNavigate('Students');
      else if (label === 'Admissions') onNavigate('Applications');
      else if (label === 'Parent & Guardian') onNavigate('Parent Overview');
      else if (label === 'Fees & Accounts') onNavigate('Fees & Accounts');
      else if (label === 'Academics & Timetable') onNavigate('Academics & Timetable');
      else if (label === 'HR & Payroll') onNavigate('HR & Payroll');
      else if (label === 'Transport') onNavigate('Transport');
      else if (label === 'Hostel') onNavigate('Hostel');
      return;
    }
    setExpandedMenu((current) => (current === label ? null : label));
  };

  const handleSubmenuClick = (parent: string, item: string) => {
    // Keep the selected dropdown open while moving between its own pages.
    setExpandedMenu(parent);
    if (parent === 'Students') onNavigate(`StudentTab:${item}`);
    else if (parent === 'Fees & Accounts') onNavigate(`FeesTab:${item}`);
    else if (parent === 'Academics & Timetable') onNavigate(`AcademicTab:${item}`);
    else if (parent === 'HR & Payroll') onNavigate('HRTab:' + item);
    else if (parent === 'Transport') onNavigate('TransportTab:' + item);
    else if (parent === 'Hostel') onNavigate('HostelTab:' + item);
    else onNavigate(item);
  };

  const handleRegularNavigation = (item: string) => {
    setExpandedMenu(null);
    onNavigate(item);
  };

  return (
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
          {visibleGroups.map((group) => <div className="space-y-1" key={group.title}>
            {!collapsed && <div className="px-2 text-xs uppercase tracking-wider text-on-surface-variant font-semibold">{group.title}</div>}
            <nav className="space-y-1" aria-label={group.title}>
              {group.items.map(([icon, label]) => {
                const hasDropdown = Boolean(dropdownItems[label]);
                const active = isDropdownActive(label);
                const expanded = expandedMenu === label;
                return <React.Fragment key={label}>
                  <button
                    type="button"
                    title={collapsed ? label : undefined}
                    aria-current={active && !hasDropdown ? 'page' : undefined}
                    aria-expanded={hasDropdown ? expanded : undefined}
                    onClick={() => hasDropdown ? handleParentClick(label) : handleRegularNavigation(label)}
                    className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'gap-2 px-3'} py-2 rounded-lg ${active ? 'bg-primary-fixed text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'} transition-colors text-sm`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                    {!collapsed && <><span className="flex-1 text-left">{label}</span>{hasDropdown && <span className="material-symbols-outlined ml-auto text-[18px]">{expanded ? 'expand_less' : 'expand_more'}</span>}</>}
                  </button>
                  {hasDropdown && expanded && !collapsed && <nav aria-label={`${label} pages`} className="ml-5 pl-3 border-l border-outline-variant/60 space-y-1">
                    {dropdownItems[label].map((item) => {
                      const selected = label === 'Students' ? activeItem === 'Students' && activeStudentTab === item
                        : label === 'Fees & Accounts' ? activeItem === 'Fees & Accounts' && activeFeesTab === item
                        : label === 'Academics & Timetable' ? activeItem === 'Academics & Timetable' && activeAcademicTab === item
                        : label === 'HR & Payroll' ? activeItem === 'HR & Payroll' && activeHRTab === item
                        : label === 'Transport' ? activeItem === `Transport ${item}`
                        : label === 'Hostel' ? activeItem === 'Hostel' && activeHostelTab === item : activeItem === item;
                      return <button
                        key={item}
                        type="button"
                        aria-current={selected ? 'page' : undefined}
                        onClick={() => handleSubmenuClick(label, item)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selected ? 'bg-primary-fixed text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}
                      >{item}</button>;
                    })}
                  </nav>}
                </React.Fragment>;
              })}
            </nav>
          </div>)}
        </div>
      </div>

      <div className="shrink-0 border-t border-outline-variant/30 bg-surface-container-low/50 p-3 space-y-2">
        <div className={`flex items-center gap-2 min-w-0 ${collapsed ? 'justify-center' : ''}`}><div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div>{!collapsed && <div className="flex flex-col min-w-0"><span className="text-sm font-semibold text-on-surface truncate">{currentUser?.name || 'User'}</span><span className="text-[11px] text-on-surface-variant truncate">{currentUser?.role || 'School Administrator'}</span></div>}</div>
        <button type="button" title="Sign out" onClick={onSignOut} className={`w-full flex items-center ${collapsed ? 'justify-center' : 'gap-2 px-3'} py-2 rounded-lg text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors`}><span className="material-symbols-outlined text-[20px]">logout</span>{!collapsed && <span>Sign out</span>}</button>
        {collapsed && <button type="button" title="Expand sidebar" aria-label="Expand sidebar" onClick={onToggle} className="absolute left-[54px] bottom-[110px] bg-surface-container-lowest border rounded-full shadow p-1 text-on-surface-variant"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>}
      </div>
    </aside>
  );
};

