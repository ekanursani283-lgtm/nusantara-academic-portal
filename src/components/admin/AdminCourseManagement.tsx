import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Users, 
  Clock, 
  MapPin, 
  X,
  AlertTriangle 
} from 'lucide-react';
import { Course } from '../../types';

export const AdminCourseManagement: React.FC = () => {
  const { courses, users, createCourse, updateCourse, deleteCourse, showToast } = useAcademic();

  const lecturers = users.filter((u) => u.role === 'lecturer');

  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deleteConfirmCourse, setDeleteConfirmCourse] = useState<Course | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    title: '',
    credits: 3,
    semester: 6,
    lecturerId: lecturers[0]?.id || '',
    room: 'Lab Software 1',
    schedule: 'Senin 08:00 - 10:30 WIB',
    capacity: 40,
    description: '',
  });

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lecturerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenCreate = () => {
    setEditingCourse(null);
    setFormData({
      code: '',
      title: '',
      credits: 3,
      semester: 6,
      lecturerId: lecturers[0]?.id || '',
      room: 'Lab Software 1',
      schedule: 'Senin 08:00 - 10:30 WIB',
      capacity: 40,
      description: '',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      code: course.code,
      title: course.title,
      credits: course.credits,
      semester: course.semester,
      lecturerId: course.lecturerId,
      room: course.room,
      schedule: course.schedule,
      capacity: course.capacity,
      description: course.description,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lecturer = lecturers.find((l) => l.id === formData.lecturerId);
    const lecturerName = lecturer ? lecturer.name : 'Dosen Pengampu';

    if (editingCourse) {
      const ok = updateCourse(editingCourse.id, {
        code: formData.code,
        title: formData.title,
        credits: Number(formData.credits),
        semester: Number(formData.semester),
        lecturerId: formData.lecturerId,
        lecturerName,
        room: formData.room,
        schedule: formData.schedule,
        capacity: Number(formData.capacity),
        description: formData.description,
      });
      if (ok) setModalOpen(false);
    } else {
      const ok = createCourse({
        code: formData.code,
        title: formData.title,
        credits: Number(formData.credits),
        semester: Number(formData.semester),
        lecturerId: formData.lecturerId,
        lecturerName,
        room: formData.room,
        schedule: formData.schedule,
        capacity: Number(formData.capacity),
        description: formData.description,
      });
      if (ok) setModalOpen(false);
    }
  };

  const confirmDelete = () => {
    if (deleteConfirmCourse) {
      const ok = deleteCourse(deleteConfirmCourse.id);
      if (ok) setDeleteConfirmCourse(null);
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
              Manajemen Mata Kuliah & Kurikulum
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Konfigurasi silabus perkuliahan, penugasan dosen pengampu, kuota kapasitas kelas, dan jadwal ruangan.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Mata Kuliah</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari kode mata kuliah, nama mata kuliah, atau nama dosen pengampu..."
          className="w-full bg-[#0e1628] border border-white/10 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCourses.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-3xl bg-[#0e1628] border border-white/10 shadow-xl space-y-4 flex flex-col justify-between hover:border-blue-500/20 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-600/20 text-blue-300 font-mono font-bold text-xs">
                  {c.code}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  Semester {c.semester} • {c.credits} SKS
                </span>
              </div>

              <h3 className="font-serif-display text-lg font-bold text-white">
                {c.title}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {c.description}
              </p>

              <div className="pt-2 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-blue-400" />
                  <span>Dosen: <strong className="text-white">{c.lecturerName}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>Jadwal: {c.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>Ruang: {c.room}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Terisi: <strong className="text-white">{c.enrolledCount}</strong> / {c.capacity} Mahasiswa
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(c)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                  title="Edit Mata Kuliah"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteConfirmCourse(c)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400"
                  title="Hapus Mata Kuliah"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: ADD / EDIT COURSE */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-[#0f172a] border border-white/10 shadow-2xl p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif-display text-xl font-bold text-white">
              {editingCourse ? 'Edit Data Mata Kuliah' : 'Tambah Mata Kuliah Baru'}
            </h3>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Kode Mata Kuliah</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    required
                    placeholder="Contoh: IF3225"
                    className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Beban Kredit (SKS)</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={formData.credits}
                    onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) || 3 })}
                    required
                    className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Nama Mata Kuliah</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Contoh: Sistem Terdistribusi Lanjut"
                  className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Dosen Pengampu</label>
                <select
                  value={formData.lecturerId}
                  onChange={(e) => setFormData({ ...formData, lecturerId: e.target.value })}
                  className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white"
                >
                  {lecturers.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name} ({l.identifier})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Ruang Perkuliahan</label>
                  <input
                    type="text"
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    placeholder="Contoh: Lab Software 3"
                    className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Kapasitas Kelas</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 40 })}
                    className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Jadwal Kuliah</label>
                <input
                  type="text"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  placeholder="Contoh: Selasa 08:00 - 10:30 WIB"
                  className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Deskripsi & Capaian Pembelajaran</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  placeholder="Ringkasan materi silabus mata kuliah..."
                  className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
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
                  {editingCourse ? 'Simpan Pembaruan' : 'Tambah Mata Kuliah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DELETE CONFIRMATION */}
      {deleteConfirmCourse && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#0f172a] border border-white/10 shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-serif-display text-lg font-bold text-white">
                Hapus Mata Kuliah?
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Apakah Anda yakin ingin menghapus <strong>{deleteConfirmCourse.title}</strong> ({deleteConfirmCourse.code})? Seluruh data penugasan terkait akan terpengaruh.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmCourse(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 text-slate-300 font-semibold text-xs hover:bg-white/15"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
