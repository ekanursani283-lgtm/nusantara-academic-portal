import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { UserRole } from '../../types';
import { 
  GraduationCap, 
  Lock, 
  Key, 
  BadgeCheck, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Cookie, 
  Shield, 
  Zap, 
  User as UserIcon, 
  Headphones, 
  AlertTriangle, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, loginAs, showToast } = useAcademic();

  const [activeTab, setActiveTab] = useState<UserRole>('student');
  const [identifier, setIdentifier] = useState('2201082045');
  const [password, setPassword] = useState('Mahasiswa123#');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (role: UserRole) => {
    setActiveTab(role);
    if (role === 'student') {
      setIdentifier('2201082045');
      setPassword('Mahasiswa123#');
    } else if (role === 'lecturer') {
      setIdentifier('0412087501');
      setPassword('Dosen123#');
    } else {
      setIdentifier('198501012010');
      setPassword('Admin123#');
    }
  };

  const fillAndSubmit = (role: UserRole, idVal: string, passVal: string) => {
    setActiveTab(role);
    setIdentifier(idVal);
    setPassword(passVal);
    showToast(`Kredensial demo ${role.toUpperCase()} disisipkan!`, 'info', 'bolt');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(identifier, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto flex flex-col justify-center">
      {/* Ambient Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Megah & Emblem */}
      <div className="text-center space-y-3 mb-6 relative z-10">
        <div className="relative inline-block">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-700 via-blue-900 to-slate-900 p-2 mx-auto flex items-center justify-center ring-2 ring-blue-500/40 shadow-2xl">
            <GraduationCap className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/15 border border-blue-500/20 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider">
            SSO Gateway v4.2 • Terverifikasi
          </span>
        </div>

        <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Nusantara Institute of Technology
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Single Sign-On (SSO) Academic Portal • Gerbang Akses Terpadu Sivitas Akademika
        </p>
      </div>

      {/* Role Selector Segmented Control */}
      <div className="bg-[#0e1628] p-1.5 rounded-2xl border border-white/10 shadow-lg mb-4 relative z-10">
        <div className="grid grid-cols-3 gap-1">
          <button
            type="button"
            onClick={() => handleTabChange('student')}
            className={`flex flex-col sm:flex-row items-center justify-center py-2.5 px-3 rounded-xl text-xs font-semibold gap-1.5 transition-all ${
              activeTab === 'student'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <GraduationCap className="w-4 h-4 shrink-0" />
            <span>Mahasiswa</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('lecturer')}
            className={`flex flex-col sm:flex-row items-center justify-center py-2.5 px-3 rounded-xl text-xs font-semibold gap-1.5 transition-all ${
              activeTab === 'lecturer'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <UserIcon className="w-4 h-4 shrink-0" />
            <span>Dosen / Tendik</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('admin')}
            className={`flex flex-col sm:flex-row items-center justify-center py-2.5 px-3 rounded-xl text-xs font-semibold gap-1.5 transition-all ${
              activeTab === 'admin'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Admin</span>
          </button>
        </div>
      </div>

      {/* Main Login Glass Card */}
      <div className="bg-[#0d1424]/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative z-10 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-400" />
              <span>Otentikasi Identitas</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {activeTab === 'student'
                ? 'Masuk menggunakan NIM aktif dan kata sandi SSO Anda.'
                : activeTab === 'lecturer'
                ? 'Otorisasi portal pengajaran, riset, dan pengabdian dosen.'
                : 'Akses konsol manajemen sistem dan basis data akademik.'}
            </p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
            Aktif
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Identifier Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              {activeTab === 'student'
                ? 'Nomor Induk Mahasiswa (NIM)'
                : activeTab === 'lecturer'
                ? 'Nomor Induk Dosen Nasional (NIDN / NIP)'
                : 'Nomor Induk Pegawai (NIP Admin)'}
            </label>
            <div className="relative rounded-xl bg-[#070b14] border border-white/10 focus-within:border-blue-500 transition-colors">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <BadgeCheck className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                placeholder={
                  activeTab === 'student'
                    ? 'Contoh: 2201082045'
                    : activeTab === 'lecturer'
                    ? 'Contoh: 0412087501'
                    : 'Contoh: 198501012010'
                }
                className="w-full bg-transparent py-3 pl-10 pr-4 text-white text-sm placeholder:text-slate-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Kata Sandi SSO
            </label>
            <div className="relative rounded-xl bg-[#070b14] border border-white/10 focus-within:border-blue-500 transition-colors">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Key className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Masukkan kata sandi akun"
                className="w-full bg-transparent py-3 pl-10 pr-11 text-white text-sm placeholder:text-slate-600 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-white transition-colors"
                title={showPassword ? 'Sembunyikan sandi' : 'Lihat sandi'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-[#070b14] border border-white/20 text-blue-600 focus:ring-0"
              />
              <span>Ingat di Perangkat Ini</span>
            </label>
            <button
              type="button"
              onClick={() => showToast('Hubungi Biro TI di Gedung Rektorat untuk reset kata sandi.', 'info')}
              className="text-blue-400 hover:underline"
            >
              Lupa Kata Sandi?
            </button>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(37,99,235,0.4)] active:scale-98 transition-all disabled:opacity-75"
          >
            {loading ? (
              <span>Memverifikasi SSO...</span>
            ) : (
              <>
                <span>MASUK KE SISTEM</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security Badges Row */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Enkripsi SSL 256-Bit</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cookie className="w-3.5 h-3.5 text-cyan-400" />
            <span>Session Guard</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            <span>Argon2 / Bcrypt</span>
          </div>
        </div>
      </div>

      {/* Interactive Credentials Box / Demo Accounts Sandbox */}
      <div className="mt-6 bg-[#0e1628] rounded-2xl p-5 border border-white/10 shadow-lg space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Akun Uji Coba & Sandbox
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-300 text-[10px] font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            1-Click Auto Fill
          </span>
        </div>

        <p className="text-xs text-slate-400">
          Pilih akun simulator di bawah ini untuk mengisi formulir secara instan saat pengujian:
        </p>

        <div className="space-y-2">
          {/* Demo 1: Mahasiswa */}
          <div className="p-3 rounded-xl bg-[#090e1a] border border-white/5 flex items-center justify-between gap-3 hover:border-blue-500/30 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="min-w-0 text-xs">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-white">Mahasiswa S1</p>
                  <span className="text-[10px] text-slate-400">Teknik Informatika</span>
                </div>
                <p className="text-slate-400 truncate mt-0.5">
                  NIM: <span className="text-blue-300 font-mono">2201082045</span> (Andi Pratama)
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => fillAndSubmit('student', '2201082045', 'Mahasiswa123#')}
              className="shrink-0 px-3 py-1.5 rounded-full bg-white/10 hover:bg-blue-600 hover:text-white text-blue-300 text-xs font-semibold transition-all active:scale-95"
            >
              Isi Cepat
            </button>
          </div>

          {/* Demo 2: Dosen */}
          <div className="p-3 rounded-xl bg-[#090e1a] border border-white/5 flex items-center justify-between gap-3 hover:border-blue-500/30 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center shrink-0">
                <UserIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0 text-xs">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-white">Dosen Tetap</p>
                  <span className="text-[10px] text-slate-400">Fakultas Sains Data</span>
                </div>
                <p className="text-slate-400 truncate mt-0.5">
                  NIDN: <span className="text-cyan-300 font-mono">0412087501</span> (Dr. Budi Hartono)
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => fillAndSubmit('lecturer', '0412087501', 'Dosen123#')}
              className="shrink-0 px-3 py-1.5 rounded-full bg-white/10 hover:bg-blue-600 hover:text-white text-blue-300 text-xs font-semibold transition-all active:scale-95"
            >
              Isi Cepat
            </button>
          </div>

          {/* Demo 3: Admin */}
          <div className="p-3 rounded-xl bg-[#090e1a] border border-white/5 flex items-center justify-between gap-3 hover:border-blue-500/30 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0 text-xs">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-white">Staf Biro TI</p>
                  <span className="text-[10px] text-slate-400">Pusat Data Utama</span>
                </div>
                <p className="text-slate-400 truncate mt-0.5">
                  NIP: <span className="text-purple-300 font-mono">198501012010</span> (Hendra Wijaya)
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => fillAndSubmit('admin', '198501012010', 'Admin123#')}
              className="shrink-0 px-3 py-1.5 rounded-full bg-white/10 hover:bg-blue-600 hover:text-white text-blue-300 text-xs font-semibold transition-all active:scale-95"
            >
              Isi Cepat
            </button>
          </div>
        </div>
      </div>

      {/* Help & Support Tiles */}
      <div className="mt-4 grid grid-cols-2 gap-3 relative z-10">
        <div className="p-4 rounded-2xl bg-[#0e1628] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-2">
              <Headphones className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-white">Helpdesk TI</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Tiket darurat & kendala login akun</p>
          </div>
          <button
            type="button"
            onClick={() => showToast('Hotline Helpdesk TI: (021) 789-9901 atau helpdesk@nusantara.ac.id', 'info')}
            className="inline-flex items-center gap-1 text-blue-400 text-xs font-semibold mt-3 hover:underline text-left"
          >
            <span>Buka Tiket</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-[#0e1628] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-2">
              <Shield className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-white">Siber Kampus</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Panduan keamanan & regulasi sandi</p>
          </div>
          <button
            type="button"
            onClick={() => showToast('Pedoman Keamanan: Dilarang membagikan OTP & ganti sandi tiap 90 hari.', 'info')}
            className="inline-flex items-center gap-1 text-blue-400 text-xs font-semibold mt-3 hover:underline text-left"
          >
            <span>Baca Panduan</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Campus Bulletin Notice */}
      <div className="mt-4 p-4 rounded-2xl bg-[#0e1628] border border-white/10 flex items-start gap-3 relative z-10 text-xs text-slate-400">
        <AlertTriangle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white block">
            Pemeliharaan Terjadwal (Maintenance)
          </span>
          <p className="mt-0.5 leading-relaxed">
            Sinkronisasi basis data nilai semester genap berlangsung setiap Minggu pukul 01.00 - 04.00 WIB. Layanan SSO tetap aktif normal.
          </p>
        </div>
      </div>
    </div>
  );
};
