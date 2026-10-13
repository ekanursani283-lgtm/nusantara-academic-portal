/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AcademicProvider, useAcademic } from './context/AcademicContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { BottomNav } from './components/common/BottomNav';
import { ToastContainer } from './components/common/Toast';

import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { StudentDashboard } from './components/student/StudentDashboard';
import { StudentGrades } from './components/student/StudentGrades';
import { StudentAssignments } from './components/student/StudentAssignments';
import { LecturerDashboard } from './components/lecturer/LecturerDashboard';
import { LecturerAssignments } from './components/lecturer/LecturerAssignments';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminUserManagement } from './components/admin/AdminUserManagement';
import { AdminCourseManagement } from './components/admin/AdminCourseManagement';
import { DiscussionForum } from './components/discussions/DiscussionForum';

const MainContent: React.FC = () => {
  const { currentView, currentRole, currentUser } = useAcademic();

  const renderView = () => {
    // Defense-in-depth: If not logged in and requesting protected views, redirect to login
    if (!currentUser && currentView !== 'landing' && currentView !== 'login') {
      return <LoginPage />;
    }

    switch (currentView) {
      case 'landing':
        return <LandingPage />;

      case 'login':
        return <LoginPage />;

      case 'dashboard':
        if (currentRole === 'student') {
          return <StudentDashboard />;
        } else if (currentRole === 'lecturer') {
          return <LecturerDashboard />;
        } else {
          return <AdminDashboard />;
        }

      case 'grades':
        if (currentRole === 'student') {
          return <StudentGrades />;
        } else {
          return currentRole === 'lecturer' ? <LecturerAssignments /> : <AdminDashboard />;
        }

      case 'assignments':
        if (currentRole === 'student') {
          return <StudentAssignments />;
        } else {
          return <LecturerAssignments />;
        }

      case 'discussions':
        return <DiscussionForum />;

      case 'admin-users':
        if (currentRole === 'admin') {
          return <AdminUserManagement />;
        }
        return currentRole === 'student' ? <StudentDashboard /> : <LecturerDashboard />;

      case 'admin-courses':
        if (currentRole === 'admin') {
          return <AdminCourseManagement />;
        }
        return currentRole === 'student' ? <StudentDashboard /> : <LecturerDashboard />;

      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#070b12] text-[#f8fafc]">
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        {renderView()}
      </main>
      <Footer />
      <BottomNav />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AcademicProvider>
      <MainContent />
    </AcademicProvider>
  );
}
