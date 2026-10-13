import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { 
  GraduationCap, 
  Menu, 
  X, 
  Bell, 
  BookOpen, 
  FileCheck, 
  MessageSquare, 
  ShieldCheck, 
  LogOut, 
  UserCheck, 
  RefreshCw,
  Home
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentUser, 
    currentRole, 
    currentView, 
    setCurrentView, 
    logout, 
    loginAs, 
    showToast,
    resetAllData 
  } = useAcademic();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleNav = (view: any) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-[#070b12]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
      {/* Signature Academic Bookmark Ribbon (Top Right) */}
      <div 
        className="academic-ribbon top-0 right-8 h-20 hidden sm:flex flex-col justify-end items-center pb-2 pointer-events-none"
        title="Nusantara Institute of Technology Heritage Emblem"
      >
        <div className="w-2 h-2 rounded-full bg-white/70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between relative">
        {/* Brand Zone */}
        <div 
          onClick={() => handleNav('landing')} 
          className="flex items-center gap-3.5 cursor-pointer group select-none pr-3"
        >
          {/* University Crest */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 via-blue-900 to-slate-900 p-1 flex items-center justify-center ring-1 ring-blue-500/40 group-hover:ring-blue-400 shadow-lg transition-all">
            <GraduationCap className="w-6 h-6 text-blue-200" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-serif-display text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-blue-200 transition-colors">
              Nusantara Institute
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-blue-400 tracking-wider uppercase">
              The Character of Excellence
            </span>
          </div>
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            onClick={() => handleNav('landing')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              currentView === 'landing'
                ? 'bg-blue-600/20 text-blue-300 ring-1 ring-blue-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Beranda
          </button>

          {currentUser ? (
            <>
              <button
                onClick={() => handleNav('dashboard')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  currentView === 'dashboard'
                    ? 'bg-blue-600/20 text-blue-300 ring-1 ring-blue-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Dashboard {currentRole === 'student' ? 'Mahasiswa' : currentRole === 'lecturer' ? 'Dosen' : 'Admin'}
              </button>

              {currentRole === 'student' && (
                <button
                  onClick={() => handleNav('grades')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    currentView === 'grades'
                      ? 'bg-blue-600/20 text-blue-300 ring-1 ring-blue-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Nilai & KHS
                </button>
              )}

              <button
                onClick={() => handleNav('assignments')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  currentView === 'assignments'
                    ? 'bg-blue-600/20 text-blue-300 ring-1 ring-blue-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {currentRole === 'student' ? 'Tugas Kuliah' : currentRole === 'lecturer' ? 'Manajemen Tugas' : 'Tugas & Jadwal'}
              </button>

              <button
                onClick={() => handleNav('discussions')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  currentView === 'discussions'
                    ? 'bg-blue-600/20 text-blue-300 ring-1 ring-blue-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Forum Diskusi
              </button>

              {currentRole === 'admin' && (
                <>
                  <button
                    onClick={() => handleNav('admin-users')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                      currentView === 'admin-users'
                        ? 'bg-blue-600/20 text-blue-300 ring-1 ring-blue-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Kelola Pengguna
                  </button>
                  <button
                    onClick={() => handleNav('admin-courses')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                      currentView === 'admin-courses'
                        ? 'bg-blue-600/20 text-blue-300 ring-1 ring-blue-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Mata Kuliah
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  const el = document.getElementById('section-news');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else handleNav('landing');
                }}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
              >
                Berita Kampus
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('section-calendar');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else handleNav('landing');
                }}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
              >
                Kalender Akademik
              </button>
            </>
          )}
        </nav>

        {/* Right Zone: Controls & Profile */}
        <div className="flex items-center gap-3">
          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white flex items-center justify-center transition-all relative ring-1 ring-white/10"
              title="Notifikasi Akademik"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-[#070b12]" />
            </button>

            {/* Notification Dropdown */}
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0f172a] border border-white/10 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Pemberitahuan Sistem</span>
                  <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full font-semibold">2 Baru</span>
                </div>
                <div className="space-y-2 mt-2">
                  <div className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-xs transition-colors">
                    <p className="font-semibold text-blue-300">Tenggat Tugas 3: Arsitektur Web MVC</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Batas waktu besok, pukul 23:59 WIB melalui portal.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-xs transition-colors">
                    <p className="font-semibold text-emerald-300">Nilai Kuis Algoritma Genetika Diterbitkan</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Prof. Maya Indrawati memberikan nilai 95/100.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Account / Login Button */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] ring-1 ring-white/15 transition-all"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-blue-500/60"
                  onError={(e) => {
                    // Fallback avatar
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="hidden sm:flex flex-col text-left leading-none">
                  <span className="text-xs font-semibold text-white truncate max-w-[120px]">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-blue-400 uppercase tracking-wider font-semibold">
                    {currentUser.role === 'student' ? 'Mahasiswa' : currentUser.role === 'lecturer' ? 'Dosen' : 'Admin'}
                  </span>
                </div>
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#0d1424] border border-white/10 shadow-2xl p-4 z-50">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-11 h-11 rounded-xl object-cover ring-2 ring-blue-500/50"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white truncate">{currentUser.name}</p>
                      <p className="text-xs font-mono text-blue-400">{currentUser.identifier}</p>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser.department}</p>
                    </div>
                  </div>

                  {/* Switch Role Fast Simulator */}
                  <div className="py-3 border-b border-white/10">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-2">
                      Ganti Peran (Simulasi Cepat):
                    </p>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        onClick={() => {
                          loginAs('student');
                          setProfileDropdownOpen(false);
                        }}
                        className={`py-1.5 text-[11px] font-semibold rounded-lg transition-all ${
                          currentRole === 'student'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        Mahasiswa
                      </button>
                      <button
                        onClick={() => {
                          loginAs('lecturer');
                          setProfileDropdownOpen(false);
                        }}
                        className={`py-1.5 text-[11px] font-semibold rounded-lg transition-all ${
                          currentRole === 'lecturer'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        Dosen
                      </button>
                      <button
                        onClick={() => {
                          loginAs('admin');
                          setProfileDropdownOpen(false);
                        }}
                        className={`py-1.5 text-[11px] font-semibold rounded-lg transition-all ${
                          currentRole === 'admin'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        Admin
                      </button>
                    </div>
                  </div>

                  {/* Navigation links inside dropdown */}
                  <div className="py-2 space-y-1">
                    <button
                      onClick={() => handleNav('dashboard')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-left"
                    >
                      <UserCheck className="w-4 h-4 text-blue-400" />
                      <span>Dashboard Utama</span>
                    </button>
                    <button
                      onClick={() => {
                        resetAllData();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-amber-300/80 hover:text-amber-300 hover:bg-amber-500/10 transition-colors text-left"
                    >
                      <RefreshCw className="w-4 h-4 text-amber-400" />
                      <span>Reset Data Demo</span>
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4 text-red-400" />
                      <span>Keluar Sesi (Logout)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => handleNav('login')}
              className="py-2 px-5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold tracking-wide shadow-[0_4px_16px_rgba(37,99,235,0.4)] active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span>MASUK PORTAL</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-xl bg-white/[0.04] text-slate-300 hover:text-white flex items-center justify-center ring-1 ring-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0f1d] border-b border-white/10 px-4 py-4 space-y-2">
          <button
            onClick={() => handleNav('landing')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/5"
          >
            <Home className="w-4 h-4 text-blue-400" />
            <span>Beranda Kampus</span>
          </button>

          {currentUser ? (
            <>
              <button
                onClick={() => handleNav('dashboard')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/5"
              >
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span>Dashboard ({currentRole.toUpperCase()})</span>
              </button>

              {currentRole === 'student' && (
                <button
                  onClick={() => handleNav('grades')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/5"
                >
                  <FileCheck className="w-4 h-4 text-blue-400" />
                  <span>Kartu Hasil Studi (KHS)</span>
                </button>
              )}

              <button
                onClick={() => handleNav('assignments')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/5"
              >
                <FileCheck className="w-4 h-4 text-blue-400" />
                <span>Tugas & Evaluasi</span>
              </button>

              <button
                onClick={() => handleNav('discussions')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/5"
              >
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span>Forum Diskusi Kuliah</span>
              </button>

              {currentRole === 'admin' && (
                <>
                  <button
                    onClick={() => handleNav('admin-users')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/5"
                  >
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    <span>Kelola Pengguna & Akses</span>
                  </button>
                  <button
                    onClick={() => handleNav('admin-courses')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/5"
                  >
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    <span>Kelola Mata Kuliah</span>
                  </button>
                </>
              )}

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">{currentUser.name}</span>
                <button
                  onClick={logout}
                  className="text-xs text-red-400 font-semibold hover:underline"
                >
                  Keluar
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => handleNav('login')}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-md"
            >
              Masuk ke Single Sign-On NIT
            </button>
          )}
        </div>
      )}
    </header>
  );
};
