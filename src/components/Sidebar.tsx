import React from 'react';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck2,
  CalendarDays,
  FileSpreadsheet,
  Receipt,
  UserSquare2,
  BookOpen,
  Bus,
  Building2,
  BarChart3,
  Bell,
  Settings,
  MoreVertical,
  ChevronRight,
  Menu,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  activeRole: UserRole;
  currentPath: string;
  onNavigate: (path: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeRole,
  currentPath,
  onNavigate,
  collapsed,
  onToggleCollapse
}) => {
  const navSections = [
    {
      id: 'main',
      title: 'MAIN MENU',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: 'dashboard' },
        { id: 'students', label: 'Students', icon: GraduationCap, path: 'students' },
        { id: 'admissions', label: 'Admissions', icon: UserSquare2, badge: '38', path: 'admissions' },
        { id: 'academics', label: 'Academics', icon: CalendarDays, path: 'academics' },
        { id: 'attendance', label: 'Attendance', icon: CalendarCheck2, path: 'attendance' },
        { id: 'fees', label: 'Fees & Accounts', icon: Receipt, path: 'fees' },
        { id: 'exams', label: 'Examinations', icon: FileSpreadsheet, path: 'exams' },
      ]
    },
    {
      id: 'management',
      title: 'MANAGEMENT',
      items: [
        { id: 'teachers', label: 'Teachers & Staff', icon: Users, path: 'teachers' },
        { id: 'payroll', label: 'HR & Payroll', icon: FileSpreadsheet, path: 'payroll' },
        { id: 'library', label: 'Library', icon: BookOpen, path: 'library' },
        { id: 'transport', label: 'Transport', icon: Bus, path: 'transport' },
        { id: 'hostel', label: 'Hostel', icon: Building2, path: 'hostel' },
      ]
    },
    {
      id: 'system',
      title: 'SYSTEM',
      items: [
        { id: 'reports', label: 'Reports & Analytics', icon: BarChart3, path: 'reports' },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: '4', path: 'notifications' },
        { id: 'settings', label: 'Settings', icon: Settings, path: 'settings' },
      ]
    }
  ];

  return (
    <aside
      className={`relative z-20 flex flex-col bg-white border-r border-slate-200/90 transition-all duration-300 ease-in-out shrink-0 select-none ${
        collapsed ? 'w-20' : 'w-64 lg:w-70'
      }`}
    >
      {/* Brand Header matching screenshot */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div 
          className="flex items-center gap-3 overflow-hidden cursor-pointer group" 
          onClick={() => onNavigate('dashboard')}
        >
          {/* Logo Mark: Purple square with graduation cap */}
          <div className="w-10 h-10 rounded-2xl bg-[#5B50E8] flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="font-display font-extrabold text-base text-slate-900 tracking-tight flex items-center gap-1.5">
                VLearnings
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-50 text-[#5B50E8] border border-indigo-100">
                  SMS
                </span>
              </span>
              <span className="text-[11px] text-slate-400 truncate">
                v2.4.0 Enterprise
              </span>
            </div>
          )}
        </div>

        {/* Toggle Collapse */}
        <button
          onClick={onToggleCollapse}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
        {navSections.map((section) => (
          <div key={section.id} className="space-y-1">
            {!collapsed && (
              <div className="px-3 pb-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                {section.title}
              </div>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path || (item.path === 'dashboard' && currentPath === '');
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.path)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'bg-[#EEF0FD] text-[#5B50E8] font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'text-[#5B50E8]' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  {!collapsed && (
                    <span className="truncate flex-1 text-left">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        isActive
                          ? 'bg-white text-[#5B50E8] shadow-2xs'
                          : 'bg-indigo-50 text-[#5B50E8]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* User Profile Footer matching screenshot */}
      <div className="p-3.5 border-t border-slate-100 bg-white">
        {!collapsed ? (
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" 
                  alt="Dr. Sarah Jenkins"
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-slate-800 leading-tight group-hover:text-[#5B50E8] transition-colors truncate">
                  Dr. Sarah Jenkins
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  Super Admin
                </div>
              </div>
            </div>
            <MoreVertical className="w-4 h-4 text-slate-400 shrink-0" />
          </div>
        ) : (
          <div className="flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" 
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
            />
          </div>
        )}
      </div>

    </aside>
  );
};
