import { useState, type FormEvent } from 'react';
import { ArrowRight, Building2, CircleHelp, Eye, EyeOff, GraduationCap, LockKeyhole, Mail, ShieldCheck, Users, Activity, Landmark } from 'lucide-react';
import { authenticate, DEFAULT_ADMIN, DEFAULT_GUARDIAN } from '../auth';
import './Auth.css';

type Props = { goRegister: () => void; goDashboard: () => void };
export default function Login({ goRegister, goDashboard }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fillAdmin = () => { setEmail(DEFAULT_ADMIN.email); setPassword(DEFAULT_ADMIN.password); setError(''); };
  const fillGuardian = () => { setEmail(DEFAULT_GUARDIAN.email); setPassword(DEFAULT_GUARDIAN.password); setError(''); };
  const submit = (event: FormEvent) => {
    event.preventDefault(); setError('');
    if (!email.trim() || !password) { setError('Please enter your email and password.'); return; }
    setLoading(true);
    const user = authenticate(email, password, remember);
    window.setTimeout(() => {
      setLoading(false);
      if (user) goDashboard(); else setError('Invalid email or password. Please try again.');
    }, 250);
  };
  return <div className="auth-shell">
    <section className="auth-showcase">
      <div className="auth-brand"><div className="auth-logo">V</div><div><strong>VLearnings</strong><small>SMS Cloud v2.4</small></div><span className="auth-certified"><ShieldCheck size={15}/> SOC-2 & FERPA Certified</span></div>
      <div className="auth-intro"><span className="auth-eyebrow"><GraduationCap size={16}/> UNIFIED ACADEMIC OPERATING SYSTEM</span><h1>Smarter School Management Starts Here</h1><p>Manage students, faculty, grading cycles, attendance rosters, and institutional workflows from one synchronized platform.</p></div>
      <div className="analytics-card"><div className="analytics-top"><span className="traffic"><i/><i/><i/></span><span>live-campus-portal.vlearnings.io</span><b><Activity size={15}/> Real-Time Sync</b></div><div className="analytics-inner"><div className="analytics-caption">INSTITUTION ANALYTICS</div><div className="analytics-title">Faculty & Learner Pulse</div><div className="analytics-stats"><div><small>Attendance</small><strong>97.8%</strong><em>↗ +1.4%</em></div><div><small>GPA Index</small><strong>3.84</strong><em>◎ Target met</em></div><div><small>Fee Clearance</small><strong>94.2%</strong><em>✓ Automated</em></div></div><div className="analytics-bars">{[35,45,66,51,61,78,55].map((h,i)=><i key={i} style={{height:`${h}%`}} className={i===5?'bright':''}/>)}</div></div></div>
      <div className="auth-benefits"><div><Landmark/><b>Simplified Ops</b><span>Automate grading, schedules & fee workflows.</span></div><div><Activity/><b>Real-Time Insights</b><span>Instant grade trends, predictive alerts & data.</span></div><div><Users/><b>Connected Campus</b><span>Single portal for faculty, students & guardians.</span></div></div>
      <div className="auth-trust"><ShieldCheck size={19}/><span>Trusted by <b>450+ educational institutions</b> across 18 countries</span><small>IVY-LEAGUE　 •　 OXBRIDGE　 •　 ED-GLOBAL</small></div>
    </section>
    <section className="auth-panel"><div className="auth-status"><span><i/> System Status: <b>Operational</b></span><a href="mailto:support@vlearnings.edu"><CircleHelp size={15}/> Admin Helpdesk</a></div><form className="auth-form" onSubmit={submit}>
      <h2>Welcome Back</h2><p className="auth-subtitle">Sign in to access your administrative dashboard & academic workflows.</p>
      {error && <div className="auth-error" role="alert">{error}</div>}
      <label htmlFor="login-email">Institutional Email</label><div className="auth-input"><Mail/><input id="login-email" type="email" autoComplete="username" placeholder="e.g. admin@school.edu" value={email} onChange={e=>setEmail(e.target.value)}/></div>
      <div className="auth-label-row"><label htmlFor="login-password">Security Password</label><button type="button" className="auth-text-button" onClick={()=>setError('Please contact your school administrator to reset your password.')}>Forgot password?</button></div><div className="auth-input"><LockKeyhole/><input id="login-password" type={showPassword?'text':'password'} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={e=>setPassword(e.target.value)}/><button type="button" aria-label={showPassword?'Hide password':'Show password'} onClick={()=>setShowPassword(v=>!v)}>{showPassword?<EyeOff/>:<Eye/>}</button></div>
      <div className="auth-options"><label className="auth-check"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/> Remember device for 30 days</label><span><ShieldCheck size={14}/> Secure Sign In</span></div>
      <button className="auth-submit" type="submit" disabled={loading}>{loading?'Signing in...':'Sign In to Dashboard'} <ArrowRight size={18}/></button>
      <div className="flex flex-col sm:flex-row gap-2"><button type="button" className="auth-demo flex-1" onClick={fillAdmin}>Fill Default Admin Details</button><button type="button" className="auth-demo flex-1" onClick={fillGuardian}>Fill Default Guardian Details</button></div>
      <div className="auth-or"><span/> OR CONTINUE WITH <span/></div><button type="button" className="auth-google" onClick={()=>setError('Google Workspace sign-in is not configured in this local demo.') }><Building2 size={18}/> Sign in with Google Workspace for Education</button>
      <p className="auth-enroll">Don't have an institution account? <button type="button" onClick={goRegister}>Enroll School</button> <i>•</i> <a href="mailto:support@vlearnings.edu">Request Live Demo</a></p>
    </form><footer className="auth-footer">Privacy Policy　 •　 Terms of Service　 •　 Security & Compliance<br/><span>© 2026 VLearnings Inc.</span></footer></section>
  </div>;
}
