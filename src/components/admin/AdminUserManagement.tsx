import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { 
  Users, 
  Search, 
  UserPlus, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  Key, 
  X, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { User, UserRole } from '../../types';

export const AdminUserManagement: React.FC = () => {
  const { users, createUser, updateUser, toggleUserStatus, deleteUser, showToast } = useAcademic();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    identifier: '',
    role: 'student' as UserRole,
    email: '',
    department: 'Teknik Informatika',
    status: 'active' as 'active' | 'suspended',
    scholarship: '',
    gpa: 3.80,
  });

  // Delete confirmation modal
  const [deleteConfirmUser, setDeleteConfirmUser] = useState<User | null>(null);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.identifier.includes(searchQuery) ||
      u.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleOpenCreate = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      identifier: '',
      role: 'student',
      email: '',
      department: 'Teknik Informatika',
      status: 'active',
      scholarship: 'Reguler',
      gpa: 3.75,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      identifier: user.identifier,
      role: user.role,
      email: user.email,
      department: user.department,
      status: user.status,
      scholarship: user.scholarship || '',
      gpa: user.gpa || 3.75,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      const ok = updateUser(editingUser.id, {
        name: formData.name,
        identifier: formData.identifier,
        role: formData.role,
        email: formData.email,
        department: formData.department,
        status: formData.status,
        scholarship: formData.scholarship,
        gpa: Number(formData.gpa),
      });
      if (ok) setModalOpen(false);
    } else {
      const ok = createUser({
        name: formData.name,
        identifier: formData.identifier,
        role: formData.role,
        email: formData.email || `${formData.identifier}@nusantara.ac.id`,
        department: formData.department,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        status: formData.status,
        scholarship: formData.scholarship,
        gpa: Number(formData.gpa),
        completedCredits: formData.role === 'student' ? 84 : undefined,
        totalCredits: formData.role === 'student' ? 144 : undefined,
        semester: formData.role === 'student' ? 6 : undefined,
      });
      if (ok) setModalOpen(false);
    }
  };

  const confirmDelete = () => {
    if (deleteConfirmUser) {
      const ok = deleteUser(deleteConfirmUser.id);
      if (ok) setDeleteConfirmUser(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
            <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
              Manajemen Pengguna & Hak Akses
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Daftar direktori akun mahasiswa, dosen pengampu, dan staf administrasi sistem.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-all self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Tambah Akun Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-5 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama, NIM, NIDN, atau prodi..."
            className="w-full bg-[#0e1628] border border-white/10 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Role Filters */}
        <div className="md:col-span-4 flex items-center gap-1 p-1 bg-[#0e1628] rounded-2xl border border-white/10">
          <button
            onClick={() => setRoleFilter('all')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              roleFilter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setRoleFilter('student')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              roleFilter === 'student' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Mahasiswa
          </button>
          <button
            onClick={() => setRoleFilter('lecturer')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              roleFilter === 'lecturer' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Dosen
          </button>
          <button
            onClick={() => setRoleFilter('admin')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              roleFilter === 'admin' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Admin
          </button>
        </div>

        {/* Status Filter */}
        <div className="md:col-span-3 flex items-center gap-1 p-1 bg-[#0e1628] rounded-2xl border border-white/10">
          <button
            onClick={() => setStatusFilter('all')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === 'all' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Semua Status
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === 'active' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'
            }`}
          >
            Aktif
          </button>
          <button
            onClick={() => setStatusFilter('suspended')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === 'suspended' ? 'bg-red-500/20 text-red-300' : 'text-slate-400 hover:text-white'
            }`}
          >
            Suspended
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#0e1628] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Total Pengguna Terdaftar ({filteredUsers.length})
          </span>
          <span className="text-[11px] text-slate-400">
            Terhubung ke Single Sign-On NIT Gateway
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#070b14] text-slate-400 uppercase tracking-wider text-[11px] border-b border-white/10">
              <tr>
                <th className="py-3 px-5">Nama Lengkap & Identitas</th>
                <th className="py-3 px-4">Peran</th>
                <th className="py-3 px-4">Departemen / Prodi</th>
                <th className="py-3 px-4">Surel SSO</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-5 text-right">Aksi Manajemen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-9 h-9 rounded-xl object-cover ring-1 ring-white/10"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div>
                        <p className="font-bold text-white text-sm">{u.name}</p>
                        <p className="font-mono text-blue-300 text-[11px]">{u.identifier}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      u.role === 'student' ? 'bg-blue-600/20 text-blue-300' :
                      u.role === 'lecturer' ? 'bg-cyan-600/20 text-cyan-300' :
                      'bg-purple-600/20 text-purple-300'
                    }`}>
                      {u.role === 'student' ? 'Mahasiswa' : u.role === 'lecturer' ? 'Dosen' : 'Admin'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">{u.department}</td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">{u.email}</td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => toggleUserStatus(u.id)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                        u.status === 'active'
                          ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                          : 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                      }`}
                    >
                      {u.status === 'active' ? 'Aktif' : 'Suspended'}
                    </button>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => showToast(`Tautan reset dikirim ke [${u.email}]`, 'info', 'mail')}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                        title="Kirim Reset Sandi"
                      >
                        <Key className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(u)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                        title="Edit Profil"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmUser(u)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                        title="Hapus Pengguna"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: ADD / EDIT USER */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0f172a] border border-white/10 shadow-2xl p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif-display text-xl font-bold text-white">
              {editingUser ? 'Edit Data Pengguna' : 'Tambah Pengguna Baru'}
            </h3>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Peran (Role)</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
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
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Nama lengkap civitas..."
                  className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Nomor Induk (NIM / NIDN / NIP)</label>
                <input
                  type="text"
                  value={formData.identifier}
                  onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                  required
                  placeholder="Nomor identitas unik..."
                  className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Departemen / Program Studi</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                  className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Surel Resmi</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="nama@nusantara.ac.id"
                  className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Status Akun</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white"
                >
                  <option value="active">Aktif</option>
                  <option value="suspended">Suspended (Ditangguhkan)</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-slate-300 font-semibold hover:bg-white/15"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md"
                >
                  {editingUser ? 'Simpan Pembaruan' : 'Tambah Pengguna'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DELETE CONFIRMATION */}
      {deleteConfirmUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#0f172a] border border-white/10 shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-serif-display text-lg font-bold text-white">
                Hapus Akun Pengguna?
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Apakah Anda yakin ingin menghapus akun <strong>{deleteConfirmUser.name}</strong> ({deleteConfirmUser.identifier})? Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmUser(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 text-slate-300 font-semibold text-xs hover:bg-white/15"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md"
              >
                Hapus Akun
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
