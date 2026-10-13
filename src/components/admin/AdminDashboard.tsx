import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { 
  Users, 
  UserCheck, 
  Building, 
  Server, 
  ShieldCheck, 
  UserPlus, 
  RotateCcw, 
  Key, 
  ExternalLink,
  Lock,
  X
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    users, 
    courses, 
    auditLogs, 
    toggleUserStatus, 
    createUser, 
    showToast,
    loginAs,
    setCurrentView 
  } = useAcademic();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    identifier: '',
    role: 'student' as 'student' | 'lecturer' | 'admin',
    email: '',
    department: 'Teknik Informatika',
    status: 'active' as 'active' | 'suspended',
  });

  const studentsCount = users.filter((u) => u.role === 'student').length;
  const lecturersCount = users.filter((u) => u.role === 'lecturer').length;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserData.name || !newUserData.identifier) return;

    const success = createUser({
      name: newUserData.name,
      identifier: newUserData.identifier,
      role: newUserData.role,
      email: newUserData.email || `${newUserData.identifier}@nusantara.ac.id`,
      department: newUserData.department,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      status: newUserData.status,
    });

    if (success) {
      setCreateModalOpen(false);
      setNewUserData({
        name: '',
        identifier: '',
        role: 'student',
        email: '',
        department: 'Teknik Informatika',
        status: 'active',
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Pusat Kontrol IT Kampus
          </span>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-white mt-1">
            Dashboard Administrator
          </h1>
        </div>

        {/* Role Switcher */}
        <div className="p-1 rounded-2xl bg-[#090e1a] border border-white/10 flex items-center shadow-inner gap-1">
          <button
            onClick={() => loginAs('student')}
            className="py-1.5 px-3 rounded-xl text-center text-xs font-semibold text-slate-400 hover:text-white"
          >
            Mahasiswa
          </button>
          <button
            onClick={() => loginAs('lecturer')}
            className="py-1.5 px-3 rounded-xl text-center text-xs font-semibold text-slate-400 hover:text-white"
          >
            Dosen
          </button>
          <button
            onClick={() => loginAs('admin')}
            className="py-1.5 px-3 rounded-xl text-center text-xs font-semibold bg-blue-600 text-white shadow-md"
          >
            Admin
          </button>
        </div>
      </div>

      {/* Campus System Health & Metrics */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0e1628] via-[#111c34] to-[#0e1628] border border-white/10 p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
              Infrastruktur NIT Cloud
            </span>
            <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-white mt-0.5">
              Status Server & Ekosistem Data
            </h2>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>98.2% Uptime</span>
          </div>
        </div>

        {/* Admin Core Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-[#070b14] border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block font-semibold">Mahasiswa Aktif</span>
              <span className="font-serif-display text-lg sm:text-xl font-bold text-white">12.450</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#070b14] border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block font-semibold">Total Dosen</span>
              <span className="font-serif-display text-lg sm:text-xl font-bold text-white">420</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#070b14] border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block font-semibold">Program Studi</span>
              <span className="font-serif-display text-lg sm:text-xl font-bold text-white">18 Prodi</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#070b14] border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block font-semibold">Beban Server</span>
              <span className="font-serif-display text-lg sm:text-xl font-bold text-emerald-400">41% Normal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick User Management Panel */}
      <div className="rounded-3xl bg-[#0e1628] border border-white/10 p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="font-serif-display text-lg sm:text-xl font-bold text-white">
              Kelola Akses & Akun Sivitas
            </h3>
            <p className="text-xs text-slate-400">Manajemen Identitas Terpusat Single Sign-On (SSO)</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('admin-users')}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-semibold"
            >
              Lihat Semua Akun
            </button>
            <button
              onClick={() => setCreateModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Tambah Akun</span>
            </button>
          </div>
        </div>

        {/* User Items Preview */}
        <div className="space-y-2.5">
          {users.slice(0, 4).map((usr) => {
            const isSuspended = usr.status === 'suspended';

            return (
              <div
                key={usr.id}
                className="p-3.5 rounded-2xl bg-black/20 border border-white/5 flex items-center justify-between gap-3 hover:border-blue-500/20 transition-all"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-white text-sm truncate">{usr.name}</p>
                    <span className="px-2 py-0.2 rounded text-[10px] uppercase font-bold bg-white/10 text-blue-300">
                      {usr.role === 'student' ? 'Mahasiswa' : usr.role === 'lecturer' ? 'Dosen' : 'Admin'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {usr.identifier} • {usr.department} • Terakhir login: {usr.lastLogin}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleUserStatus(usr.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      isSuspended
                        ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                    }`}
                  >
                    {isSuspended ? 'Suspended' : 'Aktif'}
                  </button>

                  <button
                    onClick={() => showToast(`Tautan reset kata sandi dikirim ke email terdaftar [${usr.email}]`, 'info', 'mail')}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                    title="Kirim Tautan Reset Sandi"
                  >
                    <Key className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security Audit Logs */}
      <div className="rounded-3xl bg-[#0e1628] border border-white/10 p-6 shadow-2xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <h3 className="font-serif-display text-base font-bold text-white">
              Log Audit Keamanan Terbaru
            </h3>
          </div>
          <span className="text-[11px] font-mono text-blue-400 font-bold uppercase">
            LIVE LOGS
          </span>
        </div>

        <div className="space-y-1.5 font-mono text-xs">
          {auditLogs.slice(0, 5).map((log) => (
            <div
              key={log.id}
              className="p-2.5 rounded-xl bg-[#070b14] border border-white/5 flex items-center justify-between gap-3 text-slate-300"
            >
              <div className="flex items-center gap-2 truncate">
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  log.category === 'AUTH' ? 'bg-blue-600/20 text-blue-300' :
                  log.category === 'GRADE' ? 'bg-emerald-600/20 text-emerald-300' :
                  log.category === 'ASSIGNMENT' ? 'bg-cyan-600/20 text-cyan-300' :
                  'bg-purple-600/20 text-purple-300'
                }`}>
                  [{log.category}]
                </span>
                <span className="truncate">{log.action}</span>
              </div>
              <span className="text-[11px] text-slate-500 shrink-0">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: TAMBAH AKUN PENGGUNA BARU */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0f172a] border border-white/10 shadow-2xl p-6 relative">
            <button
              onClick={() => setCreateModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif-display text-xl font-bold text-white">
              Tambah Pengguna Baru
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Buat akun sivitas baru untuk akses Single Sign-On NIT.
            </p>

            <form onSubmit={handleCreateSubmit} className="mt-4 space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Peran Akun (Role)</label>
                <select
                  value={newUserData.role}
                  onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value as any })}
                  className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white"
                >
                  <option value="student">Mahasiswa</option>
                  <option value="lecturer">Dosen</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Nama Lengkap</label>
                <input
                  type="text"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                  placeholder="Contoh: Muhammad Ihsan"
                  required
                  className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">
                  Nomor Induk (NIM / NIDN / NIP)
                </label>
                <input
                  type="text"
                  value={newUserData.identifier}
                  onChange={(e) => setNewUserData({ ...newUserData, identifier: e.target.value })}
                  placeholder="Contoh: 2201082099"
                  required
                  className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Program Studi / Departemen</label>
                <input
                  type="text"
                  value={newUserData.department}
                  onChange={(e) => setNewUserData({ ...newUserData, department: e.target.value })}
                  placeholder="Contoh: Teknik Informatika"
                  required
                  className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Surel Resmi</label>
                <input
                  type="email"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                  placeholder="Contoh: ihsan@std.nusantara.ac.id"
                  className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-slate-300 font-semibold hover:bg-white/15"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md"
                >
                  Daftarkan Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
