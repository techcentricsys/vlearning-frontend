import React from 'react';
import { 
  Search, 
  Bell, 
  Calendar, 
  HelpCircle, 
  ChevronDown, 
  SlidersHorizontal,
  LayoutDashboard,
  UserSquare2,
  LogIn,
  Palette,
  Sparkles
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface NavbarProps {
  currentUser: UserProfile;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeView: 'dashboard' | 'admissions' | 'login' | 'signup' | 'design-system';
  onViewChange: (view: 'dashboard' | 'admissions' | 'login' | 'signup' | 'design-system') => void;
  currentPathTitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeRole,
  onRoleChange,
  activeView,
  onViewChange,
  currentPathTitle = 'Dashboard / Overview'
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-6 py-2.5 transition-all">
      <div className="flex items-center justify-between gap-3">
        
        {/* Left: Breadcrumb matching screenshot */}
        <div className="flex items-center gap-3">
          <div className="text-xs font-semibold text-slate-500 hidden sm:block">
            {activeView === 'admissions' ? (
              <span>Admissions / <strong className="text-slate-800">Enrollment Management</strong></span>
            ) : activeView === 'design-system' ? (
              <span>Design System / <strong className="text-slate-800">Color Palette & Fonts</strong></span>
            ) : (
              <span>Dashboard / <strong className="text-slate-800">Overview</strong></span>
            )}
          </div>
        </div>

        {/* Center: Search pill input matching screenshot */}
        <div className="relative flex-1 max-w-md mx-2">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search anything... (students, invoices, staff...)"
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#5B50E8] text-slate-700 placeholder:text-slate-400 transition-all"
          />
        </div>

        {/* Module View Quick Switcher Tabs */}
        <div className="hidden lg:flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => onViewChange('dashboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeView === 'dashboard'
                ? 'bg-white text-[#5B50E8] shadow-2xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => onViewChange('admissions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeView === 'admissions'
                ? 'bg-[#5B50E8] text-white shadow-xs font-extrabold'
                : 'text-[#5B50E8] hover:bg-indigo-50 font-bold'
            }`}
          >
            <UserSquare2 className="w-3.5 h-3.5" />
            <span>Enrollment Module</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>

          <button
            onClick={() => onViewChange('login')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeView === 'login'
                ? 'bg-white text-[#5B50E8] shadow-2xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Login Screen</span>
          </button>

          <button
            onClick={() => onViewChange('design-system')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-bold transition-all ${
              activeView === 'design-system'
                ? 'bg-white text-[#5B50E8] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Colors & Tokens</span>
          </button>
        </div>

        {/* Right: Academic Year pill, Bell, Help, Profile */}
        <div className="flex items-center gap-2.5">
          
          {/* AY 2024-2025 • Term 2 Pill */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-[#5B50E8]" />
            <span>AY 2024-2025 • Term 2</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>

          {/* Bell Icon with badge */}
          <button 
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#5B50E8] rounded-full ring-2 ring-white"></span>
          </button>

          {/* Help Icon */}
          <button 
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors hidden sm:block"
            title="Help Desk"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-2 pl-1 cursor-pointer">
            <img 
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-100"
            />
          </div>

        </div>

      </div>
    </header>
  );
};
