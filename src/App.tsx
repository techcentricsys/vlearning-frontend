import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { EnrollmentPage } from './pages/EnrollmentPage';
import { AuthPage } from './pages/AuthPage';
import { DesignSystemShowcase } from './components/DesignSystemShowcase';
import { DEMO_USERS } from './data/mockData';
import { UserRole } from './types';

export const App: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>('admin');
  const [activeView, setActiveView] = useState<'dashboard' | 'admissions' | 'login' | 'signup' | 'design-system'>('admissions');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPath, setCurrentPath] = useState('admissions');

  const currentUser = DEMO_USERS[activeRole] || DEMO_USERS.admin;

  const handleRoleChange = (newRole: UserRole) => {
    setActiveRole(newRole);
  };

  const handleLoginSuccess = (role: UserRole) => {
    setActiveRole(role);
    setActiveView('admissions');
    setCurrentPath('admissions');
  };

  const handleSidebarNavigate = (path: string) => {
    setCurrentPath(path);
    if (path === 'admissions') {
      setActiveView('admissions');
    } else if (path === 'dashboard' || path === '') {
      setActiveView('dashboard');
    } else {
      setActiveView('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans selection:bg-[#5B50E8] selection:text-white text-slate-800">
      
      {/* Top Global Navigation Bar */}
      <Navbar
        currentUser={currentUser}
        activeRole={activeRole}
        onRoleChange={handleRoleChange}
        activeView={activeView}
        onViewChange={(view) => {
          setActiveView(view);
          if (view === 'admissions') setCurrentPath('admissions');
          if (view === 'dashboard') setCurrentPath('dashboard');
        }}
      />

      {/* Main Layout Area */}
      {activeView === 'login' || activeView === 'signup' ? (
        <main className="flex-1">
          <AuthPage
            initialMode={activeView === 'login' ? 'login' : 'signup'}
            onLoginSuccess={handleLoginSuccess}
          />
        </main>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Collapsible Left Navigation Sidebar (Light Theme matching screenshot) */}
          <Sidebar
            activeRole={activeRole}
            currentPath={currentPath}
            onNavigate={handleSidebarNavigate}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />

          {/* Core Viewport */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-7">
            {activeView === 'dashboard' && (
              <DashboardPage
                currentUser={currentUser}
                activeRole={activeRole}
                onNavigateAction={handleSidebarNavigate}
              />
            )}

            {activeView === 'admissions' && (
              <EnrollmentPage />
            )}

            {activeView === 'design-system' && (
              <DesignSystemShowcase />
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default App;
