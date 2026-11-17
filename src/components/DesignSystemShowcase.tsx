import React, { useState } from 'react';
import { 
  Palette, 
  Type, 
  Layers, 
  Sparkles, 
  Check, 
  Copy, 
  ShieldCheck, 
  CreditCard,
  GraduationCap,
  Sliders,
  CheckCircle2,
  QrCode,
  Barcode,
  School,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const DesignSystemShowcase: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [testText, setTestText] = useState('VLearnings: 2,840 Students • PKR 8,450,000 Fee Collection');
  const [fontSize, setFontSize] = useState<number>(18);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const palettes = [
    {
      category: 'Brand Primary & Executive Foundation',
      description: 'Used for primary CTAs, active sidebar selection, brand marks, and executive navigation. Conveys academic trust, institutional authority, and digital innovation.',
      tokens: [
        { name: 'Primary Sapphire 600', hex: '#4F46E5', rgb: '79, 70, 229', use: 'Main Action Buttons, Active Navigation, Key Highlights' },
        { name: 'Deep Indigo 700', hex: '#4338CA', rgb: '67, 56, 202', use: 'Button Hover states, Active border rings' },
        { name: 'Vibrant Indigo 500', hex: '#6366F1', rgb: '99, 102, 241', use: 'Icons, Active radio states, Glow borders' },
        { name: 'Light Surface 50', hex: '#EEF2FF', rgb: '238, 242, 255', use: 'Active pill backgrounds, Soft card headers' },
        { name: 'Border Highlight 200', hex: '#C7D2FE', rgb: '199, 210, 254', use: '1px clean card highlights & selected state outline' },
        { name: 'Midnight Navy 950', hex: '#0B0F19', rgb: '11, 15, 25', use: 'Enterprise Dark Sidebar, Global Dark surface' }
      ]
    },
    {
      category: 'Academic Success & Financial Settlement',
      description: 'Used for paid fee challans, on-time collections, positive attendance (+95%), passing grades (GPA 4.0 / A+), and biometric device health.',
      tokens: [
        { name: 'Emerald Success 500', hex: '#10B981', rgb: '16, 185, 129', use: 'Live RFID sync pulse, Paid badges, Positive trends' },
        { name: 'Forest Emerald 600', hex: '#059669', rgb: '5, 150, 105', use: 'Confirmation checkmarks, EasyPaisa gateway' },
        { name: 'Mint Soft 50', hex: '#ECFDF5', rgb: '236, 253, 245', use: 'Paid challan status container, Safe score cards' },
        { name: 'Teal Academic 600', hex: '#0D9488', rgb: '13, 148, 136', use: 'Student portal badges, Subject grades' }
      ]
    },
    {
      category: 'Pending Dues, Overdue & Disciplinary Alerts',
      description: 'Engineered for financial urgency and operational alerts (e.g. pending monthly challans, late returns, absent notifications, disciplinary action).',
      tokens: [
        { name: 'Amber Alert 500', hex: '#F59E0B', rgb: '245, 158, 11', use: 'Pending challan dues, Substitute teacher alerts' },
        { name: 'Amber Soft 50', hex: '#FFFBEB', rgb: '255, 251, 235', use: 'Pending invoice background pill' },
        { name: 'Crimson Rose 500', hex: '#F43F5E', rgb: '244, 63, 94', use: 'Absentees counter, Overdue challans, Critical notices' },
        { name: 'Rose Soft 50', hex: '#FFF1F2', rgb: '255, 241, 242', use: 'Overdue badge background & emergency banner' }
      ]
    },
    {
      category: 'Regional Online Payment Gateways (Pakistan & Global)',
      description: 'Color-coded badges ensuring parents and accountants instantly identify payment channels across JazzCash, EasyPaisa, and 1Link banks.',
      tokens: [
        { name: 'JazzCash Ruby', hex: '#DC2626', rgb: '220, 38, 38', use: 'JazzCash Mobile Wallet & QR Code indicator' },
        { name: 'EasyPaisa Emerald', hex: '#16A34A', rgb: '22, 163, 74', use: 'EasyPaisa App & OTC retailer receipts' },
        { name: '1Link Bank Blue', hex: '#2563EB', rgb: '37, 99, 235', use: 'Direct Bank Transfer / ATM Challan payment' },
        { name: 'Raast Gateway Violet', hex: '#7C3AED', rgb: '124, 58, 237', use: 'State Bank Raast Instant P2G settlements' }
      ]
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      
      {/* Design System Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border border-slate-800 p-8 lg:p-10 text-white shadow-2xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-brand-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-400/30 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            VLearnings Official Design Specification
          </div>
          <h1 className="text-3xl lg:text-4xl font-display font-black tracking-tight text-white leading-tight">
            Design Tokens, Palette & Visual Hierarchy
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            A comprehensive design standard crafted for the VLearnings School Management Platform (vlearnings.com). Engineered for 100% clarity across high-volume data grids, role-tailored dashboards (Admin, Faculty, Student, Parent, Accountant), and automated financial workflows.
          </p>

          <div className="pt-2 flex flex-wrap gap-3 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-white font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> WCAG 2.1 AAA Contrast Compliant
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-white font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Tabular Numerical Alignment
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-white font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Tailored for Pakistani & International Schools
            </span>
          </div>
        </div>
      </div>

      {/* Typography Section */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 lg:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-brand-50 text-brand-600">
              <Type className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-slate-900">Typography Pairing System</h2>
              <p className="text-xs text-slate-500">Pairing Plus Jakarta Sans for UI readability with Outfit for display numbers</p>
            </div>
          </div>

          {/* Interactive Font Preview Controller */}
          <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200/80">
            <span className="text-xs font-bold text-slate-500 pl-2">Size: {fontSize}px</span>
            <input 
              type="range" 
              min="12" 
              max="36" 
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-24 accent-brand-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Live Font Testing Box */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Interactive Test String
            </span>
            <span className="text-[11px] text-brand-600 font-semibold">Live editable below</span>
          </div>
          <input
            type="text"
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Font Family Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Plus Jakarta Sans Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-600"></span>
                <span className="font-display font-bold text-base text-slate-900">Plus Jakarta Sans</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-[11px] font-bold border border-brand-200">
                Primary UI & Body
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Engineered with open counters, wide geometric apertures, and tall x-height. Ideal for dense tables, student lists, biometric timestamps, and multi-lingual transliteration.
            </p>

            <div 
              className="p-4 bg-white rounded-xl border border-slate-200 text-slate-900 font-sans transition-all"
              style={{ fontSize: `${fontSize}px` }}
            >
              {testText}
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-slate-100 font-light text-slate-700">Light 300</div>
              <div className="p-2.5 rounded-xl bg-slate-100 font-normal text-slate-800">Regular 400</div>
              <div className="p-2.5 rounded-xl bg-slate-100 font-semibold text-slate-900">SemiBold 600</div>
            </div>
          </div>

          {/* Outfit Display Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/40 to-white border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                <span className="font-display font-bold text-base text-slate-900">Outfit</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-200">
                Display & Numerics
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Contemporary display font built with confident circular geometry. Provides instant visual punch for KPI metrics, fee challan amounts (`PKR 28,500`), and report card CGPAs.
            </p>

            <div 
              className="p-4 bg-white rounded-xl border border-slate-200 text-slate-900 font-display font-bold transition-all"
              style={{ fontSize: `${fontSize}px` }}
            >
              {testText}
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-indigo-50 font-display font-medium text-indigo-900">Medium 500</div>
              <div className="p-2.5 rounded-xl bg-indigo-50 font-display font-bold text-indigo-900">Bold 700</div>
              <div className="p-2.5 rounded-xl bg-indigo-50 font-display font-black text-indigo-950">ExtraBold 800</div>
            </div>
          </div>

        </div>
      </div>

      {/* Color Palettes Section */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 lg:p-8 shadow-xs space-y-8">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
          <div className="p-3 rounded-2xl bg-brand-50 text-brand-600">
            <Palette className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-slate-900">Comprehensive Color Palettes</h2>
            <p className="text-xs text-slate-500">Click any card to copy its Hexadecimal value directly to clipboard</p>
          </div>
        </div>

        <div className="space-y-8">
          {palettes.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-sm font-bold text-slate-900">{section.category}</h3>
                <span className="text-xs text-slate-500 max-w-xl text-left sm:text-right">{section.description}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {section.tokens.map((token) => {
                  const isCopied = copiedHex === token.hex;
                  return (
                    <button
                      key={token.hex}
                      onClick={() => copyToClipboard(token.hex)}
                      className="group flex flex-col p-3 rounded-2xl border border-slate-200/80 bg-white hover:border-brand-500 hover:shadow-card transition-all text-left relative overflow-hidden"
                    >
                      <div
                        className="w-full h-14 rounded-xl mb-3 border border-black/5 flex items-center justify-center transition-transform group-hover:scale-[1.02]"
                        style={{ backgroundColor: token.hex }}
                      >
                        {isCopied && (
                          <span className="bg-black/70 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1 shadow-lg">
                            <Check className="w-3.5 h-3.5" /> Copied {token.hex}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-slate-900 group-hover:text-brand-600 transition-colors">
                          {token.name}
                        </span>
                        <span className="font-mono text-[11px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                          {token.hex}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                        {token.use}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Micro-Components Showcase */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 lg:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
          <div className="p-3 rounded-2xl bg-brand-50 text-brand-600">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-slate-900">VLearnings Domain Components Preview</h2>
            <p className="text-xs text-slate-500">Live components showcasing Student ID Card, Fee Challan voucher & Status Pills</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Smart Student Digital ID Card Preview */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center font-bold text-white text-xs">V</div>
                <span className="text-xs font-bold tracking-tight">BEACONHILL INT. SCHOOL</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Active Student
              </span>
            </div>

            <div className="flex items-center gap-4 my-2">
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80" 
                alt="Student" 
                className="w-16 h-16 rounded-xl object-cover ring-2 ring-white/30"
              />
              <div>
                <div className="text-base font-display font-bold text-white">Hamza Farooq</div>
                <div className="text-xs text-brand-200">Roll # 10-A-24 • Grade 10-A</div>
                <div className="text-[10px] text-slate-400 mt-1">RFID UID: 8492-4820-1940</div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-mono">VALID: 2026-2027</span>
              <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                <QrCode className="w-3.5 h-3.5" />
                <span>Smart Barcode Sync</span>
              </div>
            </div>
          </div>

          {/* Automated Fee Challan Voucher Preview */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-700 tracking-wider">Fee Challan Voucher</span>
                <div className="text-xs font-mono font-bold text-slate-900">CH-2026-9041</div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                Paid via JazzCash
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-500">Student & Class:</div>
                <div className="text-xs font-bold text-slate-800">Hamza Farooq (Grade 10-A)</div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-slate-500">Monthly Tuition Due:</div>
                <div className="text-lg font-display font-extrabold text-slate-900">PKR 28,500</div>
              </div>
            </div>

            <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Barcode className="w-6 h-6 text-slate-700" />
                <span className="font-mono text-[11px] text-slate-600">98472910384</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600">Settled Nov 11, 2026</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
