import React from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { Home, School, Calendar, Bell, UserCircle, FileText, ShieldCheck } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentView, setCurrentView, currentRole, showToast, currentUser } = useAcademic();

  return (
    <nav className="lg:hidden fixed bottom-0 w-full z-40 bg-[#070b12]/95 backdrop-blur-xl border-t border-white/[0.08] shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-around h-16 px-2">
        {/* Beranda */}
        <button
          onClick={() => setCurrentView('landing')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors ${
            currentView === 'landing' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-1">Beranda</span>
        </button>

        {/* Akademik / Dashboard */}
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors ${
            currentView === 'dashboard' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <School className="w-5 h-5" />
          <span className="text-[10px] mt-1">Akademik</span>
        </button>

        {/* Nilai (for Student) or Tugas (for Lecturer) or Users (for Admin) */}
        {currentRole === 'student' ? (
          <button
            onClick={() => setCurrentView('grades')}
            className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors ${
              currentView === 'grades' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-[10px] mt-1">KHS</span>
          </button>
        ) : currentRole === 'lecturer' ? (
          <button
            onClick={() => setCurrentView('assignments')}
            className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors ${
              currentView === 'assignments' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[10px] mt-1">Tugas</span>
          </button>
        ) : (
          <button
            onClick={() => setCurrentView('admin-users')}
            className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors ${
              currentView === 'admin-users' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] mt-1">Akses</span>
          </button>
        )}

        {/* Notifikasi */}
        <button
          onClick={() => showToast('Tidak ada notifikasi darurat. Seluruh jadwal sesuai kalender akademik.', 'info', 'bell')}
          className="flex flex-col items-center justify-center min-w-[56px] h-12 text-slate-400 hover:text-white relative transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-4 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-[#070b12]" />
          <span className="text-[10px] mt-1">Notifikasi</span>
        </button>

        {/* Profil */}
        <button
          onClick={() => {
            if (currentUser) {
              setCurrentView('dashboard');
              showToast(`Sesi login aktif: ${currentUser.name} (${currentUser.identifier})`, 'info');
            } else {
              setCurrentView('login');
            }
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors ${
            currentView === 'login' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <UserCircle className="w-5 h-5" />
          <span className="text-[10px] mt-1">Profil</span>
        </button>
      </div>
    </nav>
  );
};
