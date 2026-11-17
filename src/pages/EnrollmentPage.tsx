import React, { useState } from 'react';
import {
  UserPlus,
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  FileText,
  Calendar,
  CreditCard,
  Download,
  Plus,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Phone,
  Mail,
  School,
  Check,
  X,
  AlertCircle,
  Eye,
  Award,
  Send,
  Building,
  Bus,
  ChevronDown,
  Printer,
  Barcode,
  Layers,
  GraduationCap,
  Kanban,
  Table as TableIcon,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  CheckSquare,
  Square,
  QrCode,
  FileCheck,
  MessageSquare,
  RefreshCw,
  Home,
  CheckCircle,
  AlertTriangle,
  UserCheck
} from 'lucide-react';
import { 
  Applicant, 
  ApplicationStatus, 
  SeatCapacity, 
  ApplicantDocument,
  TestScoreBreakdown,
  FeeBreakdown
} from '../types';
import { 
  MOCK_APPLICANTS, 
  MOCK_SEAT_CAPACITY, 
  MOCK_ENROLLMENT_METRICS 
} from '../data/mockData';

interface EnrollmentPageProps {
  onNotify?: (msg: string) => void;
}

export const EnrollmentPage: React.FC<EnrollmentPageProps> = ({ onNotify }) => {
  // Navigation & View mode
  const [activeTab, setActiveTab] = useState<'pipeline' | 'evaluation' | 'merit' | 'capacity' | 'challans'>('pipeline');
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  
  // Data state
  const [applicants, setApplicants] = useState<Applicant[]>(MOCK_APPLICANTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Modals & Drawers
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [dossierActiveTab, setDossierActiveTab] = useState<'overview' | 'documents' | 'evaluation' | 'fee' | 'timeline'>('overview');
  const [wizardStep, setWizardStep] = useState(1);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Merit configurator weights
  const [prevMarksWeight, setPrevMarksWeight] = useState(40);
  const [testMarksWeight, setTestMarksWeight] = useState(60);
  const [meritCutoff, setMeritCutoff] = useState(75);

  // New applicant registration wizard form state
  const [newStudentName, setNewStudentName] = useState('');
  const [newGender, setNewGender] = useState<'Male' | 'Female'>('Male');
  const [newDob, setNewDob] = useState('2011-05-15');
  const [newBloodGroup, setNewBloodGroup] = useState('B+');
  const [newGrade, setNewGrade] = useState('Grade 9 (Science)');
  const [newStream, setNewStream] = useState('General Science & Computer');
  const [newGuardianName, setNewGuardianName] = useState('');
  const [newGuardianRelation, setNewGuardianRelation] = useState('Father');
  const [newGuardianOccupation, setNewGuardianOccupation] = useState('Corporate Executive');
  const [newGuardianPhone, setNewGuardianPhone] = useState('');
  const [newGuardianEmail, setNewGuardianEmail] = useState('');
  const [newGuardianCnic, setNewGuardianCnic] = useState('');
  const [newResidentialAddress, setNewResidentialAddress] = useState('DHA Phase 5, Lahore');
  const [newPreviousSchool, setNewPreviousSchool] = useState('');
  const [newPreviousPercentage, setNewPreviousPercentage] = useState('88.5');
  const [newQuota, setNewQuota] = useState<'Open Merit' | 'Sibling Quota' | 'Sports / Talent' | 'Need-Based Scholarship'>('Open Merit');
  const [newTransport, setNewTransport] = useState(false);
  const [newBusStop, setNewBusStop] = useState('Main Ring Road Interchange');
  const [newHostel, setNewHostel] = useState(false);

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    if (onNotify) onNotify(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Filtered applicants
  const filteredApplicants = applicants.filter(app => {
    const matchesSearch = app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.guardianPhone.includes(searchQuery) ||
                          app.guardianName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (app.assignedRollNo && app.assignedRollNo.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesGrade = gradeFilter === 'All' || app.grade.includes(gradeFilter);
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  // Bulk selection toggles
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredApplicants.map(a => a.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Status transition handlers
  const handleUpdateStatus = (appId: string, newStatus: ApplicationStatus) => {
    setApplicants(prev => prev.map(a => {
      if (a.id === appId) {
        const updated = { ...a, status: newStatus };
        if (newStatus === 'Enrolled') {
          updated.assignedRollNo = updated.assignedRollNo || `${a.grade.slice(0, 2)}-A-${Math.floor(10 + Math.random() * 80)}`;
          updated.assignedSection = updated.assignedSection || 'Section A';
          updated.challanStatus = 'Paid';
        }
        if (newStatus === 'Challan Issued') {
          updated.challanStatus = 'Generated';
        }
        return updated;
      }
      return a;
    }));
    showNotification(`Applicant ${appId} progressed to status "${newStatus}"!`);
  };

  // Document verification toggle in Dossier
  const handleToggleDocVerification = (appId: string, docId: string) => {
    setApplicants(prev => prev.map(a => {
      if (a.id === appId) {
        const updatedDocs = a.documents.map(d => 
          d.id === docId ? { ...d, verified: !d.verified } : d
        );
        const updatedApp = { ...a, documents: updatedDocs };
        if (selectedApplicant && selectedApplicant.id === appId) {
          setSelectedApplicant(updatedApp);
        }
        return updatedApp;
      }
      return a;
    }));
  };

  // Scoring update for entrance test
  const handleUpdateScore = (appId: string, subject: keyof TestScoreBreakdown, score: number) => {
    setApplicants(prev => prev.map(a => {
      if (a.id === appId) {
        const currentBreakdown = a.testBreakdown || { english: 80, mathematics: 80, science: 80, interview: 80 };
        const updatedBreakdown = { ...currentBreakdown, [subject]: score };
        const totalTest = Math.round((updatedBreakdown.english + updatedBreakdown.mathematics + updatedBreakdown.science + updatedBreakdown.interview) / 4);
        const newMerit = Math.round((a.previousPercentage * (prevMarksWeight / 100)) + (totalTest * (testMarksWeight / 100)));
        const updatedApp = { 
          ...a, 
          entranceTestScore: totalTest,
          testBreakdown: updatedBreakdown,
          meritScore: newMerit,
          testStatus: 'Completed' as const
        };
        if (selectedApplicant && selectedApplicant.id === appId) {
          setSelectedApplicant(updatedApp);
        }
        return updatedApp;
      }
      return a;
    }));
  };

  // Form registration handler
  const handleCreateApplicant = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `APP-2026-${1040 + applicants.length + 1}`;
    
    // Calculate fee breakdown with sibling/scholarship logic
    const baseAdmission = 15000;
    const baseTuition = 15000;
    const baseSecurity = 5000;
    let discount = 0;
    if (newQuota === 'Sibling Quota') discount = 3000;
    if (newQuota === 'Need-Based Scholarship') discount = 7500;
    const totalFee = baseAdmission + baseTuition + baseSecurity - discount;

    const newApplicant: Applicant = {
      id: newId,
      studentName: newStudentName || 'New Applicant',
      gender: newGender,
      dob: newDob,
      bloodGroup: newBloodGroup,
      grade: newGrade,
      stream: newStream,
      guardianName: newGuardianName || 'Guardian',
      guardianRelation: newGuardianRelation,
      guardianOccupation: newGuardianOccupation,
      guardianPhone: newGuardianPhone || '+92 300 1234567',
      guardianEmail: newGuardianEmail || 'guardian@vlearnings.com',
      guardianCnic: newGuardianCnic || '35201-0000000-1',
      residentialAddress: newResidentialAddress,
      previousSchool: newPreviousSchool || 'Private School',
      previousPercentage: parseFloat(newPreviousPercentage) || 85,
      quota: newQuota,
      testStatus: 'Pending',
      status: 'Under Review',
      submittedAt: 'Today, Just Now',
      documents: [
        { id: 'd-1', name: 'NADRA B-Form / Birth Certificate', category: 'B-Form / Birth Cert', verified: true, uploadedAt: 'Just Now', fileSize: '1.2 MB' },
        { id: 'd-2', name: 'School Leaving Certificate (SLC)', category: 'Leaving Certificate', verified: false, uploadedAt: 'Pending', fileSize: 'Pending' },
        { id: 'd-3', name: 'Father CNIC Scanned Copy', category: 'Guardian CNIC', verified: true, uploadedAt: 'Just Now', fileSize: '950 KB' },
        { id: 'd-4', name: 'Certified Medical Health Fitness', category: 'Medical Fitness', verified: false, uploadedAt: 'Pending', fileSize: 'Pending' }
      ],
      feeBreakdown: {
        admissionFee: baseAdmission,
        tuitionFee: baseTuition,
        securityDeposit: baseSecurity,
        discount: discount,
        total: totalFee
      },
      challanAmount: totalFee,
      challanStatus: 'Generated',
      transportRequired: newTransport,
      busStop: newTransport ? newBusStop : undefined,
      hostelRequired: newHostel,
      timeline: [
        { title: 'Online Admission Application Received', date: 'Today • Just Now', status: 'completed', description: 'Application processed by VLearnings Intake System.' },
        { title: 'Document Verification', date: 'In Progress', status: 'current', description: 'Desk reviewing candidate credentials.' },
        { title: 'Entrance Examination', date: 'Upcoming', status: 'upcoming', description: 'Admit card will be dispatched via WhatsApp.' }
      ]
    };

    setApplicants([newApplicant, ...applicants]);
    setIsAddModalOpen(false);
    setWizardStep(1);
    // Reset inputs
    setNewStudentName('');
    setNewGuardianName('');
    setNewGuardianPhone('');
    showNotification(`Applicant "${newApplicant.studentName}" registered! Application ID: ${newApplicant.id}`);
  };

  // Status Badge Component
  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Enrolled':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Enrolled
        </span>;
      case 'Merit Approved':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EEF0FD] text-[#5B50E8] font-bold text-[11px] border border-indigo-200">
          <Award className="w-3 h-3 text-[#5B50E8]" /> Merit Approved
        </span>;
      case 'Challan Issued':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px] border border-blue-200">
          <CreditCard className="w-3 h-3 text-blue-600" /> Challan Issued
        </span>;
      case 'Test Scheduled':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-bold text-[11px] border border-amber-200">
          <Clock className="w-3 h-3 text-amber-600" /> Test Scheduled
        </span>;
      case 'Under Review':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-[11px] border border-slate-200">
          <Search className="w-3 h-3 text-slate-500" /> Under Review
        </span>;
      case 'Rejected':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 font-bold text-[11px] border border-rose-200">
          <X className="w-3 h-3 text-rose-500" /> Rejected
        </span>;
    }
  };

  return (
    <div className="space-y-6 pb-20 max-w-[1600px] mx-auto animate-fade-in">
      
      {/* Toast Notification Banner */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E1B4B] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-indigo-900/60 flex items-center gap-3 animate-bounce">
          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* Top Header Banner matching screenshot aesthetic */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-[#5B50E8] font-bold">Admissions & Student Intake</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Fall 2026-27 Active Cycle
            </span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            Admissions & Student Enrollment Management
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Centralized intake engine managing student inquiries, entrance examinations, automated merit calculations, document verification vault, and 1Link/JazzCash fee challans.
          </p>
        </div>

        {/* Action Header Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button 
            onClick={() => showNotification("Exporting official merit list and applicant ledger to Excel...")}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all border border-slate-200 shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Merit Ledger</span>
          </button>

          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5B50E8] hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/25 active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>+ Register New Applicant</span>
          </button>
        </div>
      </div>

      {/* 4 Core Interactive KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Total Applications */}
        <div 
          onClick={() => { setStatusFilter('All'); }}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-indigo-400 hover:shadow-card transition-all cursor-pointer relative group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Total Applications</span>
            <div className="w-9 h-9 rounded-xl bg-[#EEF0FD] flex items-center justify-center text-[#5B50E8] group-hover:scale-110 transition-transform">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
            {MOCK_ENROLLMENT_METRICS.totalApplications}
            <span className="text-xs font-bold text-emerald-600 ml-2">↑ 18.4%</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
            <span>Target: 500 applicants</span>
            <span className="font-semibold text-[#5B50E8] bg-indigo-50 px-2 py-0.5 rounded text-[10px]">
              97.2% Capacity
            </span>
          </div>
        </div>

        {/* KPI 2: Entrance Tests Scheduled */}
        <div 
          onClick={() => { setActiveTab('evaluation'); setStatusFilter('Test Scheduled'); }}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-emerald-400 hover:shadow-card transition-all cursor-pointer relative group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Entrance Tests</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
            {MOCK_ENROLLMENT_METRICS.testScheduled}
            <span className="text-xs font-semibold text-slate-400 ml-2">scheduled</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>Pass Rate: <strong className="text-emerald-700">{MOCK_ENROLLMENT_METRICS.interviewPassRate}</strong></span>
            <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
              Hall A & B
            </span>
          </div>
        </div>

        {/* KPI 3: Merit Shortlisted */}
        <div 
          onClick={() => { setActiveTab('merit'); }}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-blue-400 hover:shadow-card transition-all cursor-pointer relative group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Merit Shortlisted</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
            {MOCK_ENROLLMENT_METRICS.meritApproved}
            <span className="text-xs font-bold text-blue-600 ml-2">↑ 82.6%</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
            <span>Cutoff: {meritCutoff}%</span>
            <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[10px]">
              Ready for Challan
            </span>
          </div>
        </div>

        {/* KPI 4: Final Enrolled & Fee Collections */}
        <div 
          onClick={() => { setActiveTab('challans'); }}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-orange-400 hover:shadow-card transition-all cursor-pointer relative group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Final Enrolled</span>
            <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
            {MOCK_ENROLLMENT_METRICS.enrolled}
            <span className="text-xs font-semibold text-slate-400 ml-2">/ {MOCK_ENROLLMENT_METRICS.seatsOffered} seats</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>{MOCK_ENROLLMENT_METRICS.pendingChallans} Challans Pending</span>
            <span className="font-bold text-orange-600 text-[10px]">
              {MOCK_ENROLLMENT_METRICS.collectedAdmissionFees}
            </span>
          </div>
        </div>

      </div>

      {/* Module Navigation Tabs Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 rounded-2xl shadow-2xs flex-wrap gap-2">
        <div className="flex items-center gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'pipeline'
                ? 'border-[#5B50E8] text-[#5B50E8]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Applicant Pipeline & Roster ({filteredApplicants.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('evaluation')}
            className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'evaluation'
                ? 'border-[#5B50E8] text-[#5B50E8]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Entrance Tests & Evaluation</span>
          </button>

          <button
            onClick={() => setActiveTab('merit')}
            className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'merit'
                ? 'border-[#5B50E8] text-[#5B50E8]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Merit Engine & Ranking</span>
          </button>

          <button
            onClick={() => setActiveTab('capacity')}
            className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'capacity'
                ? 'border-[#5B50E8] text-[#5B50E8]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Class Capacity & Sections</span>
          </button>

          <button
            onClick={() => setActiveTab('challans')}
            className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'challans'
                ? 'border-[#5B50E8] text-[#5B50E8]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Admission Challans Desk</span>
          </button>
        </div>

        {/* View Switcher: Table vs Kanban (Active on pipeline tab) */}
        {activeTab === 'pipeline' && (
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs my-2">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-all ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-all ${
                viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Pipeline (Kanban)</span>
            </button>
          </div>
        )}
      </div>

      {/* Bulk Selection Actions Ribbon */}
      {selectedIds.length > 0 && activeTab === 'pipeline' && (
        <div className="p-3 bg-indigo-50/90 border border-indigo-200 rounded-2xl flex items-center justify-between gap-4 text-xs animate-slide-down">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#5B50E8] px-2 py-0.5 bg-white rounded-lg border border-indigo-200">
              {selectedIds.length} Applicants Selected
            </span>
            <span className="text-slate-600 font-medium">Quick Bulk Actions:</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button 
              onClick={() => {
                showNotification(`Sent WhatsApp verification reminder to ${selectedIds.length} parents.`);
                setSelectedIds([]);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-200 font-bold transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Document Reminder</span>
            </button>

            <button 
              onClick={() => {
                showNotification(`Generated admission fee challan batch for ${selectedIds.length} applicants.`);
                setSelectedIds([]);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 border border-blue-200 font-bold transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Batch Challans</span>
            </button>

            <button 
              onClick={() => {
                selectedIds.forEach(id => handleUpdateStatus(id, 'Merit Approved'));
                setSelectedIds([]);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#5B50E8] text-white hover:bg-indigo-700 font-bold transition-all shadow-xs"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Approve All For Merit</span>
            </button>

            <button 
              onClick={() => setSelectedIds([])}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-white"
              title="Clear selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 1: APPLICANT PIPELINE & ROSTER (TABLE OR KANBAN)
          ========================================================================= */}
      {activeTab === 'pipeline' && (
        <div className="space-y-4">
          
          {/* Filter & Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by student name, App ID, guardian phone or CNIC..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#5B50E8] transition-all"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs">
              {/* Class Filter */}
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-medium">Class:</span>
                <select
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                  className="bg-transparent font-bold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Classes</option>
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11 (FSc)</option>
                  <option value="Grade 8">Grade 8</option>
                  <option value="Grade 6">Grade 6</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-medium">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent font-bold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Stages</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Test Scheduled">Test Scheduled</option>
                  <option value="Merit Approved">Merit Approved</option>
                  <option value="Challan Issued">Challan Issued</option>
                  <option value="Enrolled">Enrolled</option>
                </select>
              </div>
            </div>
          </div>

          {/* TABLE VIEW */}
          {viewMode === 'table' ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-200/80 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                      <th className="py-3 px-4 w-10">
                        <input 
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={selectedIds.length === filteredApplicants.length && filteredApplicants.length > 0}
                          className="w-4 h-4 rounded text-[#5B50E8] focus:ring-indigo-500 border-slate-300"
                        />
                      </th>
                      <th className="py-3 px-3">Applicant Name</th>
                      <th className="py-3 px-3">Application ID</th>
                      <th className="py-3 px-3">Target Grade</th>
                      <th className="py-3 px-3">Guardian & WhatsApp</th>
                      <th className="py-3 px-3">Prev. Marks</th>
                      <th className="py-3 px-3">Doc Vault</th>
                      <th className="py-3 px-3">Stage / Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredApplicants.map((app) => {
                      const isSelected = selectedIds.includes(app.id);
                      const verifiedCount = app.documents.filter(d => d.verified).length;
                      return (
                        <tr 
                          key={app.id} 
                          className={`hover:bg-slate-50/80 transition-colors ${
                            isSelected ? 'bg-indigo-50/30' : ''
                          }`}
                        >
                          <td className="py-3.5 px-4">
                            <input 
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleSelect(app.id)}
                              className="w-4 h-4 rounded text-[#5B50E8] focus:ring-indigo-500 border-slate-300"
                            />
                          </td>

                          {/* Student Info */}
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-3">
                              <img 
                                src={app.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80"}
                                alt={app.studentName}
                                className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                              />
                              <div>
                                <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                                  <span>{app.studentName}</span>
                                  {app.quota && app.quota !== 'Open Merit' && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200">
                                      {app.quota.split(' ')[0]}
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-slate-400">
                                  {app.gender} • DOB: {app.dob} • <strong className="text-slate-600">{app.bloodGroup}</strong>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* App ID */}
                          <td className="py-3.5 px-3 font-mono font-bold text-slate-700">
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 text-[11px]">
                              {app.id}
                            </span>
                          </td>

                          {/* Grade & Assigned Roll */}
                          <td className="py-3.5 px-3">
                            <div className="font-bold text-slate-800">{app.grade}</div>
                            {app.assignedRollNo ? (
                              <div className="text-[10px] text-[#5B50E8] font-mono font-bold mt-0.5">
                                Roll: {app.assignedRollNo} ({app.assignedSection?.split(' ')[0]})
                              </div>
                            ) : (
                              <div className="text-[10px] text-slate-400">Unassigned</div>
                            )}
                          </td>

                          {/* Guardian & WhatsApp */}
                          <td className="py-3.5 px-3">
                            <div className="font-bold text-slate-800">{app.guardianName}</div>
                            <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                              <Phone className="w-3 h-3 text-emerald-600" />
                              <span>{app.guardianPhone}</span>
                            </div>
                          </td>

                          {/* Previous Marks & School */}
                          <td className="py-3.5 px-3">
                            <div className="font-mono font-extrabold text-slate-900">{app.previousPercentage}%</div>
                            <div className="text-[10px] text-slate-400 truncate max-w-[120px]">{app.previousSchool}</div>
                          </td>

                          {/* Document Vault Indicator */}
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-1.5">
                              <div className="flex items-center -space-x-1">
                                {app.documents.map((doc, dIdx) => (
                                  <span
                                    key={dIdx}
                                    title={`${doc.name}: ${doc.verified ? 'Verified' : 'Pending'}`}
                                    className={`w-2.5 h-2.5 rounded-full ring-2 ring-white ${
                                      doc.verified ? 'bg-emerald-500' : 'bg-slate-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-[10px] font-bold text-slate-600">
                                {verifiedCount}/{app.documents.length}
                              </span>
                            </div>
                          </td>

                          {/* Status Badge */}
                          <td className="py-3.5 px-3">
                            {getStatusBadge(app.status)}
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedApplicant(app)}
                                className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-[#EEF0FD] hover:text-[#5B50E8] text-slate-700 font-bold text-[11px] transition-colors"
                              >
                                View Dossier
                              </button>

                              {app.status === 'Under Review' && (
                                <button
                                  onClick={() => handleUpdateStatus(app.id, 'Test Scheduled')}
                                  className="px-2 py-1.5 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 font-bold text-[11px] transition-colors"
                                  title="Schedule Entrance Test"
                                >
                                  Schedule Test
                                </button>
                              )}

                              {app.status === 'Test Scheduled' && (
                                <button
                                  onClick={() => handleUpdateStatus(app.id, 'Merit Approved')}
                                  className="px-2 py-1.5 rounded-xl bg-indigo-50 text-[#5B50E8] hover:bg-indigo-100 font-bold text-[11px] transition-colors"
                                  title="Approve for Merit"
                                >
                                  Approve Merit
                                </button>
                              )}

                              {app.status === 'Merit Approved' && (
                                <button
                                  onClick={() => handleUpdateStatus(app.id, 'Challan Issued')}
                                  className="px-2 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-[11px] transition-colors"
                                  title="Generate & Issue Admission Fee Challan"
                                >
                                  Issue Challan
                                </button>
                              )}

                              {app.status === 'Challan Issued' && (
                                <button
                                  onClick={() => handleUpdateStatus(app.id, 'Enrolled')}
                                  className="px-2.5 py-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-[11px] transition-colors shadow-2xs"
                                  title="Confirm Enrollment and Assign Roll Number"
                                >
                                  Enroll Student
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* KANBAN FUNNEL PIPELINE VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
              
              {/* Column 1: Under Review */}
              <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-200/80 space-y-3 min-w-[260px]">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    <h4 className="text-xs font-bold text-slate-800">1. Under Review</h4>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                    {applicants.filter(a => a.status === 'Under Review').length}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {applicants.filter(a => a.status === 'Under Review').map(app => (
                    <div 
                      key={app.id} 
                      className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-indigo-300 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-slate-500">{app.id}</span>
                        <span className="text-[10px] font-bold text-slate-700">{app.grade.split(' ')[0]}</span>
                      </div>
                      <div className="font-bold text-xs text-slate-900">{app.studentName}</div>
                      <div className="text-[11px] text-slate-500 truncate">Guardian: {app.guardianName}</div>
                      
                      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                        <span className="text-[10px] text-slate-400">Prev: {app.previousPercentage}%</span>
                        <button 
                          onClick={() => handleUpdateStatus(app.id, 'Test Scheduled')}
                          className="text-[10px] font-bold text-[#5B50E8] hover:underline"
                        >
                          → Schedule Test
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Test Scheduled */}
              <div className="bg-amber-50/40 rounded-2xl p-3 border border-amber-200/70 space-y-3 min-w-[260px]">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <h4 className="text-xs font-bold text-amber-900">2. Test Scheduled</h4>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    {applicants.filter(a => a.status === 'Test Scheduled').length}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {applicants.filter(a => a.status === 'Test Scheduled').map(app => (
                    <div 
                      key={app.id} 
                      className="p-3 bg-white rounded-xl border border-amber-200 shadow-2xs hover:border-amber-400 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-slate-500">{app.id}</span>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded">
                          {app.testDate ? app.testDate.split(' ')[0] : 'Upcoming'}
                        </span>
                      </div>
                      <div className="font-bold text-xs text-slate-900">{app.studentName}</div>
                      <div className="text-[11px] text-slate-500">{app.grade}</div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                        <button 
                          onClick={() => setSelectedApplicant(app)}
                          className="text-[10px] font-bold text-slate-600 hover:text-slate-900"
                        >
                          Grade Test
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(app.id, 'Merit Approved')}
                          className="text-[10px] font-bold text-emerald-600 hover:underline"
                        >
                          → Approve Merit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Merit Approved */}
              <div className="bg-indigo-50/40 rounded-2xl p-3 border border-indigo-200/70 space-y-3 min-w-[260px]">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#5B50E8]"></span>
                    <h4 className="text-xs font-bold text-indigo-900">3. Merit Approved</h4>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                    {applicants.filter(a => a.status === 'Merit Approved').length}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {applicants.filter(a => a.status === 'Merit Approved').map(app => (
                    <div 
                      key={app.id} 
                      className="p-3 bg-white rounded-xl border border-indigo-200 shadow-2xs hover:border-indigo-400 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-slate-500">{app.id}</span>
                        <span className="text-[10px] font-bold text-[#5B50E8] bg-indigo-50 px-1.5 py-0.2 rounded font-mono">
                          Rank #{app.meritRank || '—'}
                        </span>
                      </div>
                      <div className="font-bold text-xs text-slate-900">{app.studentName}</div>
                      <div className="text-[11px] text-slate-500">Composite: <strong className="text-emerald-700">{app.meritScore}%</strong></div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                        <span className="text-[10px] text-slate-400">Rs. {app.challanAmount.toLocaleString()}</span>
                        <button 
                          onClick={() => handleUpdateStatus(app.id, 'Challan Issued')}
                          className="text-[10px] font-bold text-blue-600 hover:underline"
                        >
                          → Issue Challan
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 4: Challan Issued */}
              <div className="bg-blue-50/40 rounded-2xl p-3 border border-blue-200/70 space-y-3 min-w-[260px]">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <h4 className="text-xs font-bold text-blue-900">4. Challan Issued</h4>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    {applicants.filter(a => a.status === 'Challan Issued').length}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {applicants.filter(a => a.status === 'Challan Issued').map(app => (
                    <div 
                      key={app.id} 
                      className="p-3 bg-white rounded-xl border border-blue-200 shadow-2xs hover:border-blue-400 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-slate-500">{app.id}</span>
                        <span className="text-[10px] font-bold text-blue-700 font-mono">
                          Rs. {app.challanAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="font-bold text-xs text-slate-900">{app.studentName}</div>
                      <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                        <Phone className="w-3 h-3 text-emerald-600" />
                        {app.guardianPhone}
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                        <button 
                          onClick={() => showNotification(`Sent WhatsApp payment link to ${app.guardianPhone}`)}
                          className="text-[10px] font-bold text-emerald-600 hover:underline"
                        >
                          WhatsApp Link
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(app.id, 'Enrolled')}
                          className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold hover:bg-emerald-700"
                        >
                          Enroll ✓
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 5: Officially Enrolled */}
              <div className="bg-emerald-50/40 rounded-2xl p-3 border border-emerald-200/70 space-y-3 min-w-[260px]">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <h4 className="text-xs font-bold text-emerald-900">5. Enrolled Active</h4>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {applicants.filter(a => a.status === 'Enrolled').length}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {applicants.filter(a => a.status === 'Enrolled').map(app => (
                    <div 
                      key={app.id} 
                      className="p-3 bg-white rounded-xl border border-emerald-200 shadow-2xs hover:border-emerald-400 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-[#5B50E8] bg-indigo-50 px-1.5 py-0.2 rounded">
                          {app.assignedRollNo || 'Enrolled'}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600">✓ Settled</span>
                      </div>
                      <div className="font-bold text-xs text-slate-900">{app.studentName}</div>
                      <div className="text-[11px] text-slate-500">{app.assignedSection || app.grade}</div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px]">
                        <span className="text-slate-400">Card Generated</span>
                        <button 
                          onClick={() => setSelectedApplicant(app)}
                          className="font-bold text-[#5B50E8] hover:underline"
                        >
                          View ID Card
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* =========================================================================
          TAB 2: ENTRANCE TEST & EVALUATION SUITE
          ========================================================================= */}
      {activeTab === 'evaluation' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>Entrance Examination Scoring & Interview Panel</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-[#5B50E8] border border-indigo-200">
                  Hall A & Hall B Operational
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Record subject marks (English, Mathematics, Science) and oral panel evaluation with live composite score calculation.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => showNotification("Dispatched Entrance Examination Admit Cards & QR entry passes to all registered applicants via WhatsApp.")}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5B50E8] text-white font-bold text-xs hover:bg-indigo-700 transition-all shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Admit Cards via SMS/WhatsApp</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {applicants.map((app) => {
              const breakdown = app.testBreakdown || { english: 85, mathematics: 85, science: 85, interview: 85 };
              return (
                <div 
                  key={app.id} 
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-300 hover:shadow-xs transition-all space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-slate-400">{app.id}</span>
                      <h4 className="font-bold text-sm text-slate-900">{app.studentName}</h4>
                      <p className="text-[11px] text-slate-500">{app.grade}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-extrabold text-[#5B50E8] bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-200 block">
                        {app.entranceTestScore || 85}/100
                      </span>
                      <span className="text-[9px] text-slate-400 mt-0.5 block">Composite Score</span>
                    </div>
                  </div>

                  {/* Subject Marks Input Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-white p-3 rounded-xl border border-slate-200/80">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">English (100):</span>
                      <input 
                        type="number"
                        min="0"
                        max="100"
                        value={breakdown.english}
                        onChange={(e) => handleUpdateScore(app.id, 'english', Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 font-mono font-bold text-slate-800 text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Mathematics (100):</span>
                      <input 
                        type="number"
                        min="0"
                        max="100"
                        value={breakdown.mathematics}
                        onChange={(e) => handleUpdateScore(app.id, 'mathematics', Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 font-mono font-bold text-slate-800 text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">General Science (100):</span>
                      <input 
                        type="number"
                        min="0"
                        max="100"
                        value={breakdown.science}
                        onChange={(e) => handleUpdateScore(app.id, 'science', Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 font-mono font-bold text-slate-800 text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Oral Interview (100):</span>
                      <input 
                        type="number"
                        min="0"
                        max="100"
                        value={breakdown.interview}
                        onChange={(e) => handleUpdateScore(app.id, 'interview', Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 font-mono font-bold text-slate-800 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-500 text-[11px]">
                      Test Venue: <strong>{app.testVenue || 'Hall A'}</strong>
                    </span>
                    <button 
                      onClick={() => handleUpdateStatus(app.id, 'Merit Approved')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition-colors"
                    >
                      Pass & Shortlist
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: MERIT LIST ENGINE & WEIGHTAGE CONFIGURATOR
          ========================================================================= */}
      {activeTab === 'merit' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          
          {/* Header & Configurator Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-50/70 via-slate-50 to-white border border-indigo-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5B50E8] bg-white px-2.5 py-0.5 rounded-full border border-indigo-200">
                <Sparkles className="w-3.5 h-3.5" />
                Autonomous Merit Computation Formula
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Dynamic Merit Calculation & Intake Quotas
              </h3>
              <p className="text-xs text-slate-500 max-w-xl">
                Configure weightage percentages below. All candidate rankings are recalculated in real time.
              </p>
            </div>

            {/* Weightage Sliders */}
            <div className="flex items-center gap-5 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Prev. School Marks</span>
                <div className="flex items-center gap-2 mt-1">
                  <input 
                    type="range"
                    min="10"
                    max="90"
                    value={prevMarksWeight}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setPrevMarksWeight(val);
                      setTestMarksWeight(100 - val);
                    }}
                    className="w-24 accent-[#5B50E8] cursor-pointer"
                  />
                  <span className="font-mono font-bold text-xs text-[#5B50E8]">{prevMarksWeight}%</span>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-200"></div>

              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">VLearnings Test</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono font-bold text-xs text-[#5B50E8]">{testMarksWeight}%</span>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-200"></div>

              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Cutoff Threshold</span>
                <div className="flex items-center gap-2 mt-1">
                  <input 
                    type="number"
                    value={meritCutoff}
                    onChange={(e) => setMeritCutoff(Number(e.target.value))}
                    className="w-14 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 font-mono font-bold text-xs text-slate-800"
                  />
                  <span className="text-xs font-semibold text-slate-500">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">1st Official Merit List (Open Merit & Quotas)</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                {applicants.filter(a => (a.meritScore || 80) >= meritCutoff).length} Qualified Above Cutoff
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => showNotification("Published 1st Official Merit List to School Website and Notice Board.")}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 shadow-2xs"
              >
                Publish to Web Portal
              </button>
              <button 
                onClick={() => showNotification("Broadcasted acceptance offer letters to all qualified candidates via SMS & WhatsApp!")}
                className="px-4 py-2 rounded-xl bg-[#5B50E8] hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
              >
                Send Offer Letters (SMS)
              </button>
            </div>
          </div>

          {/* Ranked Candidates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {applicants
              .filter(a => a.meritRank || a.entranceTestScore)
              .sort((a, b) => (b.meritScore || 85) - (a.meritScore || 85))
              .map((app, rIdx) => {
                const rank = rIdx + 1;
                const isPassed = (app.meritScore || 85) >= meritCutoff;
                return (
                  <div 
                    key={app.id} 
                    className={`p-4 rounded-2xl border transition-all space-y-3 relative overflow-hidden ${
                      isPassed 
                        ? 'bg-white border-slate-200 hover:border-indigo-400 hover:shadow-card' 
                        : 'bg-slate-50 border-slate-200/60 opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                          rank === 1 ? 'bg-amber-400 text-slate-900 shadow-xs' :
                          rank === 2 ? 'bg-slate-300 text-slate-900' :
                          rank === 3 ? 'bg-amber-600 text-white' :
                          'bg-indigo-50 text-[#5B50E8] font-mono'
                        }`}>
                          #{rank}
                        </span>
                        <div>
                          <h4 className="font-extrabold text-sm text-slate-900">{app.studentName}</h4>
                          <span className="text-[11px] text-slate-500">{app.grade}</span>
                        </div>
                      </div>

                      <span className={`px-2.5 py-1 rounded-xl text-xs font-mono font-extrabold border ${
                        isPassed 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {app.meritScore || 86}%
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div>
                        <span className="text-slate-400 text-[10px] block">Previous</span>
                        <strong className="font-mono text-slate-800">{app.previousPercentage}%</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Test Score</span>
                        <strong className="font-mono text-[#5B50E8]">{app.entranceTestScore || 85}/100</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Quota</span>
                        <strong className="text-slate-700 text-[10px] truncate block">{app.quota?.split(' ')[0] || 'Open'}</strong>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      {getStatusBadge(app.status)}
                      <button 
                        onClick={() => {
                          handleUpdateStatus(app.id, 'Challan Issued');
                          showNotification(`Offer Letter & Challan generated for ${app.studentName}`);
                        }}
                        className="text-xs font-bold text-[#5B50E8] hover:underline"
                      >
                        Issue Offer →
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: CLASS CAPACITY & SECTIONS ASSIGNMENT
          ========================================================================= */}
      {activeTab === 'capacity' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Grade & Section Capacity Matrix (2026-27 Intake)
              </h3>
              <p className="text-xs text-slate-500">
                Real-time seat occupancy with automated classroom cap enforcement (1:25 ratio).
              </p>
            </div>

            <button 
              onClick={() => showNotification("Optimized section distribution! All sections are now balanced.")}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              Auto-Balance Classrooms
            </button>
          </div>

          <div className="space-y-6">
            {MOCK_SEAT_CAPACITY.map((gradeData, gIdx) => {
              const totalFilled = Math.round((gradeData.enrolled / gradeData.totalSeats) * 100);
              return (
                <div key={gIdx} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between text-xs flex-wrap gap-2">
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">{gradeData.grade}</h4>
                      <span className="text-slate-500 text-[11px]">
                        Total Capacity: <strong>{gradeData.totalSeats} seats</strong> across {gradeData.sections?.length || 2} sections
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-emerald-700 font-bold">Enrolled: {gradeData.enrolled}</span>
                      <span className="text-[#5B50E8] font-bold">Shortlisted: {gradeData.shortlisted}</span>
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        gradeData.available === 0 ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {gradeData.available === 0 ? 'CLASSROOM FULL' : `${gradeData.available} Vacant Seats`}
                      </span>
                    </div>
                  </div>

                  {/* Primary Grade Bar */}
                  <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden flex">
                    <div className="h-full bg-[#5B50E8]" style={{ width: `${totalFilled}%` }}></div>
                    <div className="h-full bg-indigo-300" style={{ width: `${(gradeData.shortlisted / gradeData.totalSeats) * 100}%` }}></div>
                  </div>

                  {/* Section-wise Cards */}
                  {gradeData.sections && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                      {gradeData.sections.map((sec, secIdx) => (
                        <div key={secIdx} className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-800">{sec.sectionName}</span>
                            <span className="font-mono text-[10px] font-bold text-[#5B50E8]">
                              {sec.enrolled}/{sec.totalSeats}
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div 
                              className="h-full bg-teal-600 rounded-full" 
                              style={{ width: `${(sec.enrolled / sec.totalSeats) * 100}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                            <span>Room: {sec.room}</span>
                            <span className="truncate max-w-[120px]">{sec.classTeacher}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: ADMISSION FEE CHALLANS DESK
          ========================================================================= */}
      {activeTab === 'challans' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Admission Fee Invoicing & Reconciliation Desk
              </h3>
              <p className="text-xs text-slate-500">
                First-term tuition, admission fee & security deposits payable via 1Link, JazzCash, EasyPaisa.
              </p>
            </div>

            <button 
              onClick={() => showNotification("Generated combined PDF bank ledger for all admission challans.")}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print All Vouchers</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {applicants.map((app) => (
              <div 
                key={app.id} 
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#5B50E8] tracking-wider">
                      Official Admission Voucher
                    </span>
                    <div className="text-xs font-mono font-extrabold text-slate-900">
                      INV-ADM-{app.id.replace('APP-', '')}
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                    app.challanStatus === 'Paid'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {app.challanStatus === 'Paid' ? `✓ Paid via ${app.paymentGateway || 'JazzCash'}` : 'Pending Fee Settlement'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-slate-900">{app.studentName}</div>
                    <div className="text-xs text-slate-500">{app.grade}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">Guardian: {app.guardianPhone}</div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-semibold">Total Admission Fee:</span>
                    <span className="text-xl font-extrabold text-slate-900 font-mono">
                      Rs. {app.challanAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Itemized breakdown pill */}
                {app.feeBreakdown && (
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 grid grid-cols-4 gap-2 text-center text-[10px]">
                    <div>
                      <span className="text-slate-400 block">Admission</span>
                      <strong className="text-slate-700 font-mono">Rs. {app.feeBreakdown.admissionFee.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Tuition</span>
                      <strong className="text-slate-700 font-mono">Rs. {app.feeBreakdown.tuitionFee.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Security</span>
                      <strong className="text-slate-700 font-mono">Rs. {app.feeBreakdown.securityDeposit.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Discount</span>
                      <strong className="text-emerald-600 font-mono">-Rs. {app.feeBreakdown.discount.toLocaleString()}</strong>
                    </div>
                  </div>
                )}

                <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Barcode className="w-5 h-5 text-slate-600" />
                    <span className="font-mono text-[11px] text-slate-500">9284729104820</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => showNotification(`Downloaded Official Admission Challan PDF for ${app.studentName}`)}
                      className="text-xs font-bold text-[#5B50E8] hover:underline"
                    >
                      Download PDF
                    </button>
                    {app.challanStatus !== 'Paid' && (
                      <button 
                        onClick={() => {
                          setApplicants(prev => prev.map(a => a.id === app.id ? { 
                            ...a, 
                            challanStatus: 'Paid', 
                            status: 'Enrolled',
                            assignedRollNo: a.assignedRollNo || `${a.grade.slice(0, 2)}-A-99`,
                            assignedSection: a.assignedSection || 'Section A'
                          } : a));
                          showNotification(`Marked Challan for ${app.studentName} as PAID and finalized enrollment!`);
                        }}
                        className="px-2.5 py-1 rounded bg-emerald-600 text-white font-bold text-[10px] hover:bg-emerald-700"
                      >
                        Reconcile & Enroll
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          INTERACTIVE APPLICANT DOSSIER DRAWER / MODAL
          ========================================================================= */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 space-y-6 animate-scale-in max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <img 
                  src={selectedApplicant.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"}
                  alt={selectedApplicant.studentName}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-100"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-extrabold text-slate-900">{selectedApplicant.studentName}</h3>
                    {getStatusBadge(selectedApplicant.status)}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    ID: <strong className="font-mono text-slate-800">{selectedApplicant.id}</strong> • Class: <strong className="text-slate-800">{selectedApplicant.grade}</strong> • Stream: {selectedApplicant.stream || 'Standard'}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedApplicant(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dossier Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setDossierActiveTab('overview')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  dossierActiveTab === 'overview' ? 'bg-white text-[#5B50E8] shadow-2xs' : 'text-slate-600'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setDossierActiveTab('documents')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  dossierActiveTab === 'documents' ? 'bg-white text-[#5B50E8] shadow-2xs' : 'text-slate-600'
                }`}
              >
                Documents Vault
              </button>
              <button
                onClick={() => setDossierActiveTab('evaluation')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  dossierActiveTab === 'evaluation' ? 'bg-white text-[#5B50E8] shadow-2xs' : 'text-slate-600'
                }`}
              >
                Test Evaluation
              </button>
              <button
                onClick={() => setDossierActiveTab('fee')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  dossierActiveTab === 'fee' ? 'bg-white text-[#5B50E8] shadow-2xs' : 'text-slate-600'
                }`}
              >
                Challan Voucher
              </button>
              <button
                onClick={() => setDossierActiveTab('timeline')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  dossierActiveTab === 'timeline' ? 'bg-white text-[#5B50E8] shadow-2xs' : 'text-slate-600'
                }`}
              >
                Audit Timeline
              </button>
            </div>

            {/* Dossier Content: Overview */}
            {dossierActiveTab === 'overview' && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 space-y-1.5 border border-slate-100">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Personal Demographics</span>
                    <div className="text-slate-700">Date of Birth: <strong>{selectedApplicant.dob}</strong></div>
                    <div className="text-slate-700">Gender: <strong>{selectedApplicant.gender}</strong></div>
                    <div className="text-slate-700">Blood Group: <strong>{selectedApplicant.bloodGroup || 'B+'}</strong></div>
                    <div className="text-slate-700">Quota: <strong className="text-[#5B50E8]">{selectedApplicant.quota || 'Open Merit'}</strong></div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 space-y-1.5 border border-slate-100">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Guardian & Residence</span>
                    <div className="text-slate-700 font-bold">{selectedApplicant.guardianName} ({selectedApplicant.guardianRelation})</div>
                    <div className="text-slate-700">Occupation: <strong>{selectedApplicant.guardianOccupation || 'Business'}</strong></div>
                    <div className="text-slate-700 font-mono">CNIC: {selectedApplicant.guardianCnic}</div>
                    <div className="text-slate-700 font-mono">Phone: {selectedApplicant.guardianPhone}</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 space-y-1.5 border border-slate-100">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Academic Background</span>
                  <div className="text-slate-800 font-bold">{selectedApplicant.previousSchool}</div>
                  <div className="text-slate-600">Previous School Transcript: <strong className="font-mono text-slate-900">{selectedApplicant.previousPercentage}%</strong></div>
                  {selectedApplicant.assignedRollNo && (
                    <div className="text-[#5B50E8] font-bold mt-1">
                      Assigned Roll No: {selectedApplicant.assignedRollNo} • Section: {selectedApplicant.assignedSection}
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-slate-50 flex items-center justify-between text-xs border border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Opt-In Facilities:</span>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        selectedApplicant.transportRequired ? 'bg-indigo-50 text-[#5B50E8]' : 'bg-slate-200 text-slate-500'
                      }`}>
                        {selectedApplicant.transportRequired ? `Bus Transport: ${selectedApplicant.busStop || 'Assigned'}` : 'No Transport'}
                      </span>
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        selectedApplicant.hostelRequired ? 'bg-indigo-50 text-[#5B50E8]' : 'bg-slate-200 text-slate-500'
                      }`}>
                        {selectedApplicant.hostelRequired ? `Hostel Boarding: ${selectedApplicant.roomPreference || 'Requested'}` : 'Day Scholar'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Dossier Content: Documents Vault */}
            {dossierActiveTab === 'documents' && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-bold text-slate-800">Uploaded Credentials & Verification</span>
                  <button 
                    onClick={() => showNotification(`Sent WhatsApp document re-upload reminder to ${selectedApplicant.guardianPhone}`)}
                    className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Request Missing Docs via WhatsApp</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {selectedApplicant.documents.map((doc) => (
                    <div 
                      key={doc.id}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-slate-400" />
                        <div>
                          <div className="font-bold text-slate-800">{doc.name}</div>
                          <div className="text-[10px] text-slate-400">
                            Category: {doc.category} • Uploaded: {doc.uploadedAt} ({doc.fileSize})
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleDocVerification(selectedApplicant.id, doc.id)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 ${
                            doc.verified 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                              : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                          }`}
                        >
                          {doc.verified ? <Check className="w-3.5 h-3.5" /> : null}
                          <span>{doc.verified ? 'Verified' : 'Click to Verify'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dossier Content: Evaluation */}
            {dossierActiveTab === 'evaluation' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 space-y-3 border border-slate-100">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Entrance Test Breakdown</span>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                      <span className="text-slate-400 text-[10px] block">English</span>
                      <strong className="font-mono text-slate-900 text-sm">{selectedApplicant.testBreakdown?.english || 85}</strong>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                      <span className="text-slate-400 text-[10px] block">Mathematics</span>
                      <strong className="font-mono text-slate-900 text-sm">{selectedApplicant.testBreakdown?.mathematics || 88}</strong>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                      <span className="text-slate-400 text-[10px] block">Science</span>
                      <strong className="font-mono text-slate-900 text-sm">{selectedApplicant.testBreakdown?.science || 86}</strong>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                      <span className="text-slate-400 text-[10px] block">Interview</span>
                      <strong className="font-mono text-slate-900 text-sm">{selectedApplicant.testBreakdown?.interview || 90}</strong>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 space-y-1.5 border border-slate-100">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Examiner Feedback Notes</span>
                  <p className="text-slate-700 leading-relaxed italic">
                    "{selectedApplicant.interviewerNotes || 'Candidate shows good promise, verified aptitude, and meets institutional entry criteria.'}"
                  </p>
                  <div className="pt-2 text-slate-500">
                    Recommendation: <strong className="text-emerald-700">{selectedApplicant.interviewerRecommendation || 'Admit'}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Dossier Content: Fee & Voucher */}
            {dossierActiveTab === 'fee' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 space-y-3 border border-slate-200">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="font-bold text-slate-800">Admission Fee Challan Breakdown</span>
                    <span className="font-mono font-bold text-slate-700">INV-ADM-{selectedApplicant.id.replace('APP-', '')}</span>
                  </div>

                  {selectedApplicant.feeBreakdown && (
                    <div className="space-y-1.5 text-slate-600">
                      <div className="flex justify-between">
                        <span>One-Time Admission Fee:</span>
                        <strong className="font-mono">Rs. {selectedApplicant.feeBreakdown.admissionFee.toLocaleString()}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>First Term Tuition Fee:</span>
                        <strong className="font-mono">Rs. {selectedApplicant.feeBreakdown.tuitionFee.toLocaleString()}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Refundable Security Deposit:</span>
                        <strong className="font-mono">Rs. {selectedApplicant.feeBreakdown.securityDeposit.toLocaleString()}</strong>
                      </div>
                      {selectedApplicant.feeBreakdown.discount > 0 && (
                        <div className="flex justify-between text-emerald-600 font-bold">
                          <span>Sibling / Merit Concession:</span>
                          <span className="font-mono">-Rs. {selectedApplicant.feeBreakdown.discount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-extrabold text-slate-900">
                        <span>Net Payable Amount:</span>
                        <span className="font-mono text-[#5B50E8]">Rs. {selectedApplicant.challanAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Barcode className="w-6 h-6 text-slate-700" />
                    <span className="font-mono text-slate-500 text-[11px]">984729103849</span>
                  </div>
                  <button 
                    onClick={() => showNotification(`Printed Official Admission Challan for ${selectedApplicant.studentName}`)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Print Challan PDF
                  </button>
                </div>
              </div>
            )}

            {/* Dossier Content: Timeline */}
            {dossierActiveTab === 'timeline' && (
              <div className="space-y-4 text-xs">
                <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {(selectedApplicant.timeline || [
                    { title: 'Online Intake Application Received', date: selectedApplicant.submittedAt, status: 'completed', description: 'Application filed online.' },
                    { title: 'Entrance Examination Stage', date: 'Oct 2024', status: 'current', description: 'Assessment process.' }
                  ]).map((t, idx) => (
                    <div key={idx} className="flex items-start gap-4 relative pl-7">
                      <span className={`w-3 h-3 rounded-full absolute left-1.5 top-1 ring-4 ring-white ${
                        t.status === 'completed' ? 'bg-emerald-500' :
                        t.status === 'current' ? 'bg-[#5B50E8]' : 'bg-slate-300'
                      }`} />
                      <div>
                        <div className="font-bold text-slate-900">{t.title}</div>
                        <div className="text-[10px] text-slate-400">{t.date}</div>
                        <p className="text-slate-600 mt-0.5">{t.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Actions Drawer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
              <button 
                onClick={() => {
                  showNotification(`Sent WhatsApp acceptance pack & challan to ${selectedApplicant.guardianPhone}`);
                  setSelectedApplicant(null);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs hover:bg-emerald-100 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>WhatsApp Acceptance Pack</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleUpdateStatus(selectedApplicant.id, 'Enrolled');
                    setSelectedApplicant(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#5B50E8] hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/25 transition-all"
                >
                  Confirm & Finalize Enrollment
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          4-STEP "+ REGISTER NEW APPLICANT" STEPPER MODAL
          ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-scale-in">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B50E8]">
                  Admission Intake Wizard (Step {wizardStep} of 4)
                </span>
                <h3 className="text-lg font-bold text-slate-900">Register New Student Applicant</h3>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper Indicator */}
            <div className="grid grid-cols-4 gap-1.5">
              {['1. Student', '2. Guardian', '3. Academic', '4. Facilities'].map((st, sIdx) => (
                <div 
                  key={sIdx} 
                  className={`py-1.5 text-center text-[10px] font-bold rounded-lg ${
                    wizardStep === sIdx + 1 
                      ? 'bg-[#EEF0FD] text-[#5B50E8]' 
                      : wizardStep > sIdx + 1 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {st}
                </div>
              ))}
            </div>

            <form onSubmit={handleCreateApplicant} className="space-y-4">
              
              {/* STEP 1: STUDENT INFORMATION */}
              {wizardStep === 1 && (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Student Full Name (per B-Form)</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Daniyal Ahmed Khan"
                      value={newStudentName}
                      onChange={(e) => setNewStudentName(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#5B50E8]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Gender</label>
                      <select 
                        value={newGender}
                        onChange={(e) => setNewGender(e.target.value as 'Male' | 'Female')}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Date of Birth</label>
                      <input 
                        type="date"
                        value={newDob}
                        onChange={(e) => setNewDob(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Blood Group</label>
                      <select 
                        value={newBloodGroup}
                        onChange={(e) => setNewBloodGroup(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-bold text-slate-800"
                      >
                        <option>B+</option>
                        <option>A+</option>
                        <option>O+</option>
                        <option>AB+</option>
                        <option>B-</option>
                        <option>O-</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setWizardStep(2)}
                      className="px-4 py-2 bg-[#5B50E8] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-indigo-700"
                    >
                      <span>Next: Guardian Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: GUARDIAN DETAILS */}
              {wizardStep === 2 && (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Father / Guardian Full Name</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Tariq Mehmood Khan"
                      value={newGuardianName}
                      onChange={(e) => setNewGuardianName(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#5B50E8]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Guardian CNIC</label>
                      <input 
                        type="text"
                        placeholder="35201-xxxxxxx-x"
                        value={newGuardianCnic}
                        onChange={(e) => setNewGuardianCnic(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Guardian WhatsApp</label>
                      <input 
                        type="tel"
                        required
                        placeholder="+92 300 1234567"
                        value={newGuardianPhone}
                        onChange={(e) => setNewGuardianPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Residential Address</label>
                    <input 
                      type="text"
                      placeholder="e.g. House 42, Street 7, Block D, DHA Phase 5, Lahore"
                      value={newResidentialAddress}
                      onChange={(e) => setNewResidentialAddress(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setWizardStep(1)}
                      className="px-3.5 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setWizardStep(3)}
                      className="px-4 py-2 bg-[#5B50E8] text-white rounded-xl font-bold flex items-center gap-1.5 hover:bg-indigo-700"
                    >
                      <span>Next: Academic Class</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: ACADEMIC PROGRAM & PREVIOUS SCHOOLING */}
              {wizardStep === 3 && (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Class / Grade Applying For</label>
                    <select 
                      value={newGrade}
                      onChange={(e) => setNewGrade(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-bold text-slate-800"
                    >
                      <option>Grade 9 (Science / Matric)</option>
                      <option>Grade 10 (Science / Matric)</option>
                      <option>Grade 11 (FSc Pre-Medical)</option>
                      <option>Grade 11 (FSc Pre-Engineering)</option>
                      <option>Grade 8 (Middle Wing)</option>
                      <option>Grade 6 (Cambridge Junior)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Subject Stream Preference</label>
                    <select 
                      value={newStream}
                      onChange={(e) => setNewStream(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-semibold text-slate-700"
                    >
                      <option>General Science & Computer</option>
                      <option>Pre-Medical (Biology & Chemistry)</option>
                      <option>Pre-Engineering (Maths & Physics)</option>
                      <option>Cambridge O-Level Sciences</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Previous School Name</label>
                      <input 
                        type="text"
                        placeholder="e.g. Army Public School"
                        value={newPreviousSchool}
                        onChange={(e) => setNewPreviousSchool(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Previous Marks (%)</label>
                      <input 
                        type="number"
                        placeholder="88.5"
                        value={newPreviousPercentage}
                        onChange={(e) => setNewPreviousPercentage(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setWizardStep(2)}
                      className="px-3.5 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setWizardStep(4)}
                      className="px-4 py-2 bg-[#5B50E8] text-white rounded-xl font-bold flex items-center gap-1.5 hover:bg-indigo-700"
                    >
                      <span>Next: Facilities & Concessions</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: FACILITIES, CONCESSIONS & SUBMISSION */}
              {wizardStep === 4 && (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Admission Quota / Concession Category</label>
                    <select 
                      value={newQuota}
                      onChange={(e) => setNewQuota(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-bold text-slate-800"
                    >
                      <option value="Open Merit">Open Merit (Standard Fee)</option>
                      <option value="Sibling Quota">Sibling Quota (Rs. 3,000 concession)</option>
                      <option value="Need-Based Scholarship">Need-Based Scholarship (50% Tuition Waiver)</option>
                      <option value="Sports / Talent">Sports / Talent Scholarship</option>
                    </select>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-700 block">Facilities Requested:</span>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                        <input 
                          type="checkbox"
                          checked={newTransport}
                          onChange={(e) => setNewTransport(e.target.checked)}
                          className="w-4 h-4 text-[#5B50E8] rounded"
                        />
                        <span>Bus Fleet Route</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                        <input 
                          type="checkbox"
                          checked={newHostel}
                          onChange={(e) => setNewHostel(e.target.checked)}
                          className="w-4 h-4 text-[#5B50E8] rounded"
                        />
                        <span>Hostel Boarding</span>
                      </label>
                    </div>

                    {newTransport && (
                      <div className="pt-2">
                        <label className="block text-[10px] text-slate-400 font-bold mb-1">Nearest Bus Stop / Pickup</label>
                        <input 
                          type="text"
                          value={newBusStop}
                          onChange={(e) => setNewBusStop(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Auto-generates official Admission Fee Challan with 1Link / JazzCash barcode.</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setWizardStep(3)}
                      className="px-3.5 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                    >
                      <span>Complete Registration</span>
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
