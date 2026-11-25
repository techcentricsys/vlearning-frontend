import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  GraduationCap, 
  ShieldCheck, 
  School, 
  Sparkles, 
  CheckCircle2, 
  CreditCard,
  User,
  Phone,
  BookOpen,
  Building,
  QrCode,
  Barcode,
  Check,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { UserRole } from '../types';

interface AuthPageProps {
  initialMode?: 'login' | 'signup';
  onLoginSuccess: (role: UserRole) => void;
  onSwitchMode?: (mode: 'login' | 'signup') => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'login',
  onLoginSuccess,
}) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('admin@vlearnings.com');
  const [loginPassword, setLoginPassword] = useState('••••••••••••');
  
  // Signup / Online Admission state
  const [studentName, setStudentName] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [gradeApplying, setGradeApplying] = useState('Grade 9 (Matric / Science)');
  const [contactNumber, setContactNumber] = useState('');
  const [submittedAdmission, setSubmittedAdmission] = useState(false);

  const rolePresets: { 
    role: UserRole; 
    title: string; 
    email: string; 
    badge: string; 
    color: string;
    description: string;
  }[] = [
    { 
      role: 'admin', 
      title: 'Administrator', 
      email: 'admin@vlearnings.com', 
      badge: 'Superuser',
      color: 'border-purple-200 bg-purple-50/70 text-purple-900 hover:border-purple-400',
      description: 'System config, global reports & access'
    },
    { 
      role: 'teacher', 
      title: 'Faculty / Teacher', 
      email: 'ayesha.khan@vlearnings.com', 
      badge: 'Teacher',
      color: 'border-indigo-200 bg-indigo-50/70 text-indigo-900 hover:border-indigo-400',
      description: 'Attendance, marks entry & syllabi'
    },
    { 
      role: 'student', 
      title: 'Student Portal', 
      email: 'hamza.f@student.vlearnings.com', 
      badge: 'Student',
      color: 'border-emerald-200 bg-emerald-50/70 text-emerald-900 hover:border-emerald-400',
      description: 'Timetables, grades & challan pay'
    },
    { 
      role: 'parent', 
      title: 'Parent / Guardian', 
      email: 'farooq.malik@vlearnings.com', 
      badge: 'Guardian',
      color: 'border-amber-200 bg-amber-50/70 text-amber-900 hover:border-amber-400',
      description: 'Child progress & online fee payment'
    },
    { 
      role: 'accountant', 
      title: 'Bursar & Finance', 
      email: 'accounts@vlearnings.com', 
      badge: 'Finance',
      color: 'border-cyan-200 bg-cyan-50/70 text-cyan-900 hover:border-cyan-400',
      description: 'Auto fee challans & JazzCash sync'
    },
  ];

  const handleRolePresetClick = (preset: typeof rolePresets[0]) => {
    setSelectedRole(preset.role);
    setLoginEmail(preset.email);
    setLoginPassword('Password123!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(selectedRole);
    }, 600);
  };

  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedAdmission(true);
    setTimeout(() => {
      onLoginSuccess('parent');
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-62px)] flex flex-col lg:flex-row bg-slate-50">
      
      {/* Left Column: Visual Showcase & Brand Story */}
      <div className="lg:w-1/2 bg-[#0B0F19] text-white p-8 lg:p-14 flex flex-col justify-between relative overflow-hidden border-r border-slate-800">
        
        {/* Abstract Glowing Mesh Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Brand Header */}
        <div className="relative z-10">
          <div className="flex items-center gap-3.5 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-xl shadow-brand-500/30 font-display font-black text-2xl tracking-tighter ring-1 ring-white/20">
              V
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                  VLearnings
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-400/30">
                  Cloud SMS
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Smart Unified School Management System</p>
            </div>
          </div>

          <div className="space-y-4 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-brand-300 text-xs font-semibold border border-white/10 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-pulse" />
              Powering Modern Educational Institutions Across Pakistan
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-black text-white tracking-tight leading-tight">
              {isLogin 
                ? "Autonomous Academic, Financial & Attendance Operations."
                : "Fast Online Admissions & Automated Challan Generation."}
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Eliminate paper bottlenecks with centralized student dossiers, turnstile RFID biometric attendance, instant JazzCash / EasyPaisa / Bank fee settlements, and high-visibility parent portals.
            </p>
          </div>
        </div>

        {/* Floating Domain Visual Cards Showcase */}
        <div className="relative z-10 my-8 space-y-4">
          
          {/* Card 1: Student Smart Digital ID Card */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:bg-white/[0.07] transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-brand-400" />
                <span className="text-xs font-bold text-white tracking-wide">STUDENT 360° SMART PROFILE</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                RFID Tap Verified
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80" 
                alt="Student" 
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/20"
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white truncate">Hamza Farooq (Roll # 10-A-24)</div>
                <div className="text-[11px] text-slate-400 truncate">Beaconhill International • Grade 10-A</div>
                <div className="text-[10px] text-brand-300 flex items-center gap-2 mt-0.5 font-mono">
                  <span>97.4% Attendance</span>
                  <span>•</span>
                  <span>CGPA 3.85 / 4.0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Automated Fee Reconciliation Card */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:bg-white/[0.07] transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white tracking-wide">AUTOMATED MONTHLY CHALLAN</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Check className="w-3 h-3" /> Paid Instant
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400">Voucher: <strong className="text-slate-200 font-mono">CH-2026-9041</strong></div>
                <div className="text-xs font-bold text-white">Tuition & Lab Fee (Nov 2026)</div>
              </div>
              <div className="text-right">
                <div className="text-base font-display font-extrabold text-white">PKR 28,500</div>
                <div className="text-[10px] text-emerald-400 font-semibold">Settled via JazzCash QR</div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Guarantee */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Multi-Tier Role Access Control • 99.9% Cloud Uptime</span>
          </div>
          <span className="font-mono text-[11px] text-slate-500">vlearnings.com</span>
        </div>

      </div>

      {/* Right Column: Interactive Form & Demo Autofill */}
      <div className="lg:w-1/2 p-6 sm:p-10 lg:p-14 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          
          {/* Form Switcher Tabs */}
          <div className="flex p-1 bg-slate-200/90 rounded-2xl border border-slate-300/70 shadow-2xs">
            <button
              type="button"
              onClick={() => { setIsLogin(true); setSubmittedAdmission(false); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                isLogin
                  ? 'bg-white text-brand-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In to Portal
            </button>
            <button
              type="button"
              onClick={() => { setIsLogin(false); setSubmittedAdmission(false); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                !isLogin
                  ? 'bg-white text-brand-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Online Admission / Register
            </button>
          </div>

          {isLogin ? (
            /* Login Flow */
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight">
                  Welcome to VLearnings
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Select your role from the presets below to preview that specific experience.
                </p>
              </div>

              {/* Quick Demo Role Auto-Fill Bar */}
              <div className="p-3.5 bg-slate-100/80 border border-slate-200/80 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                    Quick Role Simulator (1-Click Test):
                  </span>
                  <span className="text-[10px] text-brand-600 font-semibold">Select below</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {rolePresets.map((preset) => {
                    const isSelected = selectedRole === preset.role;
                    return (
                      <button
                        key={preset.role}
                        type="button"
                        onClick={() => handleRolePresetClick(preset)}
                        className={`p-2 rounded-xl text-left border transition-all text-xs relative ${
                          isSelected
                            ? 'bg-brand-600 text-white border-brand-600 font-bold shadow-md shadow-brand-600/25 ring-2 ring-brand-500/20'
                            : 'bg-white text-slate-700 border-slate-200/80 hover:border-brand-300 hover:shadow-2xs'
                        }`}
                      >
                        <div className="truncate font-bold text-xs">{preset.title}</div>
                        <div className={`text-[10px] truncate ${isSelected ? 'text-brand-100' : 'text-slate-400'}`}>
                          {preset.badge}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Institutional Campus Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Select Institutional Campus
                  </label>
                  <div className="relative">
                    <School className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all">
                      <option>Main Executive Campus - Lahore</option>
                      <option>Junior Wing - Gulberg Campus</option>
                      <option>Islamabad Capital Campus</option>
                    </select>
                  </div>
                </div>

                {/* Email / Roll Number / Staff ID */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Official Email or Portal ID
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g. admin@vlearnings.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Password
                    </label>
                    <a href="#forgot" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your institutional password"
                      className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me iOS-Style Toggle */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setRememberMe(!rememberMe)}
                      className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${
                        rememberMe ? 'bg-brand-600' : 'bg-slate-300'
                      }`}
                    >
                      <div 
                        className={`w-4 h-4 rounded-full bg-white shadow-xs transform transition-transform ${
                          rememberMe ? 'translate-x-4' : 'translate-x-0'
                        }`} 
                      />
                    </button>
                    <span className="text-xs font-medium text-slate-600 cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
                      Remember this workstation
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">256-bit SSL</span>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-brand-600/30 transition-all active:scale-[0.99] disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Enter as {selectedRole.toUpperCase()}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Google Workspace SSO Option */}
                <div className="relative py-2 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <span className="relative px-3 bg-slate-50 text-[11px] text-slate-400 uppercase font-semibold">
                    Or institutional SSO
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onLoginSuccess('teacher')}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2.5 transition-all shadow-2xs"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Continue with Google Workspace</span>
                </button>

              </form>
            </div>
          ) : (
            /* Online Admission / Registration Flow */
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Admissions Open Academic Year 2026-27
                </span>
                <h2 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight mt-2">
                  Online Student Admission
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Automatic document verification, entrance schedule & fee challan generation.
                </p>
              </div>

              {submittedAdmission ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-emerald-900">Application Submitted Successfully!</h3>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Application reference <strong>#ADM-2026-849</strong> generated. Admission test date and initial fee challan have been sent to guardian's WhatsApp. Redirecting to Parent Portal...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAdmissionSubmit} className="space-y-4">
                  {/* Student Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Student Full Name (as per B-Form / Birth Cert)
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="e.g. Muhammad Zayan Malik"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Father / Guardian Name & CNIC */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Father / Guardian Name & CNIC
                    </label>
                    <input
                      type="text"
                      value={guardianName}
                      onChange={(e) => setGuardianName(e.target.value)}
                      placeholder="e.g. Tariq Mehmood Malik (35201-xxxxxxx-x)"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                      required
                    />
                  </div>

                  {/* Grade / Class Applying For */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Applying for Grade / Academic Program
                    </label>
                    <div className="relative">
                      <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select
                        value={gradeApplying}
                        onChange={(e) => setGradeApplying(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                      >
                        <option>Grade 9 (Matric / Science)</option>
                        <option>Grade 10 (Matric / Science)</option>
                        <option>O-Levels / IGCSE (Cambridge)</option>
                        <option>Grade 1 - 8 (Middle & Primary)</option>
                        <option>Pre-School & Kindergarten</option>
                      </select>
                    </div>
                  </div>

                  {/* Guardian WhatsApp Contact */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Guardian WhatsApp / Mobile for SMS Alerts & Challan
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        placeholder="+92 300 1234567"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instant admission challan payable via JazzCash, EasyPaisa, or any 1Link bank.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                  >
                    <span>Submit & Generate Admission Challan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Institutional Help & Support */}
          <div className="pt-4 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-500">
              Need assistance? Central Admissions Helpline: <span className="font-semibold text-slate-700">+92 (42) 111-VLEARN</span>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
