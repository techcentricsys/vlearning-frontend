import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { DashboardPage } from './modules/dashboard/pages/DashboardPage';

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [dialog, setDialog] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const openDialog = (title: string) => { setSubmitted(false); setDialog(title); };
  return <div className="min-h-screen bg-background text-on-surface">
    <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(v => !v)} />
    <Topbar collapsed={collapsed} onAction={openDialog} />
    <main className={`${collapsed ? 'ml-[76px]' : 'ml-[250px]'} min-h-screen pt-16 transition-all duration-200`}><div className="p-6 max-w-[1800px] mx-auto"><DashboardPage onAction={openDialog} /></div></main>
    {dialog && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4" onMouseDown={e => { if (e.target === e.currentTarget) setDialog(null); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="dialog-title" className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-outline-variant/40 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/30"><div><h2 id="dialog-title" className="text-lg font-bold text-on-surface">{dialog}</h2><p className="text-xs text-on-surface-variant mt-0.5">VLearnings School Management System</p></div><button aria-label="Close" onClick={() => setDialog(null)} className="p-2 rounded-lg hover:bg-surface-container-low text-on-surface-variant"><span className="material-symbols-outlined">close</span></button></div>
        <div className="p-5 space-y-4">
          {submitted ? <div className="rounded-xl bg-secondary-container/40 p-4 text-sm text-on-secondary-container"><span className="material-symbols-outlined align-middle mr-2">check_circle</span>Action completed in this demo interface. No backend record was changed.</div> : <>
            <p className="text-sm text-on-surface-variant">This interactive preview opens the {dialog.toLowerCase()} workspace. Enter details below to test the interface.</p>
            {['Add Student','Add New Student','Add Teacher','Record Attendance','Collect Fee','Add Event'].includes(dialog) ? <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="text-xs font-semibold text-on-surface-variant">Name / Reference<input className="mt-1 w-full rounded-lg border border-outline-variant p-2.5 text-sm font-normal text-on-surface outline-none focus:border-primary" placeholder="Enter name" /></label>
              <label className="text-xs font-semibold text-on-surface-variant">Class / Category<input className="mt-1 w-full rounded-lg border border-outline-variant p-2.5 text-sm font-normal text-on-surface outline-none focus:border-primary" placeholder="Select or enter" /></label>
              <label className="text-xs font-semibold text-on-surface-variant sm:col-span-2">Notes<textarea className="mt-1 w-full rounded-lg border border-outline-variant p-2.5 text-sm font-normal text-on-surface outline-none focus:border-primary" rows={3} placeholder="Additional details (optional)" /></label>
            </div> : <div className="rounded-xl bg-surface-container-low p-4 text-sm text-on-surface-variant">{dialog.includes('Search') ? 'Search is ready. Connect your student, staff and finance APIs to display live matching records.' : dialog === 'Notifications' ? 'You are all caught up. New admission, fee and attendance notifications will appear here.' : dialog === 'Help & Support' ? 'Help centre preview: use the sidebar to navigate modules or contact your system administrator.' : dialog === 'Generate Report' ? 'Choose a report format and date range in the full reporting module.' : 'This section is available as an interactive UI preview. Connect the relevant module API to load live records.'}</div>}
          </>}
        </div>
        <div className="flex justify-end gap-2 px-5 py-4 bg-surface-container-low/60 border-t border-outline-variant/30"><button onClick={() => setDialog(null)} className="px-4 py-2 rounded-lg border border-outline-variant text-sm font-medium hover:bg-white">Close</button>{!submitted && <button onClick={() => setSubmitted(true)} className="px-4 py-2 rounded-lg bg-primary-container text-white text-sm font-semibold hover:bg-primary">{['Add Student','Add New Student','Add Teacher','Record Attendance','Collect Fee','Add Event'].includes(dialog) ? 'Save Demo' : 'Done'}</button>}</div>
      </section>
    </div>}
  </div>;
};
export default App;

