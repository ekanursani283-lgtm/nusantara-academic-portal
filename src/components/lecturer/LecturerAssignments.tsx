import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { 
  Plus, 
  FileText, 
  Trash2, 
  Edit3, 
  Download, 
  CheckCircle2, 
  Clock, 
  Save, 
  X,
  FileCheck
} from 'lucide-react';
import { Assignment } from '../../types';

export const LecturerAssignments: React.FC = () => {
  const { 
    currentUser, 
    courses, 
    assignments, 
    submissions, 
    createAssignment, 
    updateAssignment, 
    deleteAssignment, 
    gradeSubmission, 
    downloadSubmissionFile,
    showToast 
  } = useAcademic();

  // Modal state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    courseId: courses[0]?.id || '',
    title: '',
    description: '',
    dueDate: '2026-10-25T23:59:00Z',
    weight: 15,
    maxScore: 100,
    allowedFormats: '.pdf, .zip, .rar',
    maxFileSizeMB: 25,
  });

  // Selected assignment for viewing submissions
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>(assignments[0]?.id || '');

  // Grading modal state
  const [gradeModalSub, setGradeModalSub] = useState<any | null>(null);
  const [gradeModalScore, setGradeModalScore] = useState<number>(90);
  const [gradeModalFeedback, setGradeModalFeedback] = useState<string>('');

  const currentAsg = assignments.find((a) => a.id === selectedAssignmentId) || assignments[0];
  const currentSubmissions = submissions.filter((s) => s.assignmentId === currentAsg?.id);

  const handleOpenCreate = () => {
    setEditingAssignment(null);
    setFormData({
      courseId: courses[0]?.id || '',
      title: '',
      description: '',
      dueDate: '2026-10-25T23:59:00Z',
      weight: 15,
      maxScore: 100,
      allowedFormats: '.pdf, .zip, .rar',
      maxFileSizeMB: 25,
    });
    setCreateModalOpen(true);
  };

  const handleOpenEdit = (asg: Assignment) => {
    setEditingAssignment(asg);
    setFormData({
      courseId: asg.courseId,
      title: asg.title,
      description: asg.description,
      dueDate: asg.dueDate,
      weight: asg.weight,
      maxScore: asg.maxScore,
      allowedFormats: asg.allowedFormats.join(', '),
      maxFileSizeMB: asg.maxFileSizeMB,
    });
    setCreateModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const course = courses.find((c) => c.id === formData.courseId);
    if (!course) return;

    const formats = formData.allowedFormats
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    if (editingAssignment) {
      updateAssignment(editingAssignment.id, {
        courseId: formData.courseId,
        courseCode: course.code,
        courseName: course.title,
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        weight: Number(formData.weight),
        maxScore: Number(formData.maxScore),
        allowedFormats: formats,
        maxFileSizeMB: Number(formData.maxFileSizeMB),
      });
    } else {
      createAssignment({
        courseId: formData.courseId,
        courseCode: course.code,
        courseName: course.title,
        lecturerId: currentUser?.id || 'usr_lecturer_1',
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        weight: Number(formData.weight),
        maxScore: Number(formData.maxScore),
        allowedFormats: formats,
        maxFileSizeMB: Number(formData.maxFileSizeMB),
      });
    }
    setCreateModalOpen(false);
  };

  const handleOpenGradeModal = (sub: any) => {
    setGradeModalSub(sub);
    setGradeModalScore(sub.score ?? 90);
    setGradeModalFeedback(sub.feedback ?? 'Analisis implementasi komprehensif dan kode rapi.');
  };

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradeModalSub) return;
    gradeSubmission(gradeModalSub.id, gradeModalScore, gradeModalFeedback);
    setGradeModalSub(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
            <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
              Manajemen Tugas & Penilaian Mahasiswa
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Terbitkan penugasan baru, atur bobot evaluasi, dan periksa berkas unggahan mahasiswa.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Terbitkan Tugas Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Assignments List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Daftar Penugasan Aktif ({assignments.length})
          </h2>

          <div className="space-y-2">
            {assignments.map((asg) => {
              const isSelected = asg.id === currentAsg?.id;
              const subCount = submissions.filter((s) => s.assignmentId === asg.id).length;

              return (
                <div
                  key={asg.id}
                  onClick={() => setSelectedAssignmentId(asg.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600/15 border-blue-500/50 shadow-lg'
                      : 'bg-[#0e1628] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-600/20 text-blue-300 text-[10px] font-bold font-mono">
                      {asg.courseCode}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Bobot: {asg.weight}%
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-sm mt-1.5 line-clamp-1">
                    {asg.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">
                    {asg.courseName}
                  </p>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10 text-xs">
                    <span className="text-slate-400">{subCount} Pengumpulan</span>
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleOpenEdit(asg)}
                        className="p-1 text-slate-400 hover:text-white"
                        title="Edit Tugas"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteAssignment(asg.id)}
                        className="p-1 text-slate-400 hover:text-red-400"
                        title="Hapus Tugas"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Submissions Table & Grading Detail (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {currentAsg ? (
            <div className="rounded-3xl bg-[#0e1628] border border-white/10 p-6 shadow-2xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs text-blue-400 font-mono font-bold">
                    {currentAsg.courseCode} • {currentAsg.courseName}
                  </span>
                  <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-white mt-1">
                    {currentAsg.title}
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Tenggat Pengumpulan</span>
                  <span className="text-xs font-mono text-amber-300 font-bold">
                    {new Date(currentAsg.dueDate).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>

              {/* Submissions List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Berkas Mahasiswa yang Masuk ({currentSubmissions.length})
                  </h3>
                  <button
                    onClick={() => showToast('Mempersiapkan arsip batch unduhan ZIP seluruh berkas...', 'info')}
                    className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh Semua Berkas (ZIP)</span>
                  </button>
                </div>

                {currentSubmissions.length > 0 ? (
                  <div className="divide-y divide-white/5 border border-white/10 rounded-2xl bg-black/20 overflow-hidden">
                    {currentSubmissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">
                              {sub.studentName}
                            </span>
                            <span className="text-xs text-blue-400 font-mono">
                              NIM: {sub.studentNIM}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5 text-slate-500" />
                            <span className="font-mono text-slate-300">{sub.fileName}</span>
                            <span>({sub.fileSize})</span>
                          </p>
                          {sub.studentNotes && (
                            <p className="text-[11px] text-slate-400 italic">
                              "{sub.studentNotes}"
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {sub.status === 'graded' ? (
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                                Nilai: {sub.score}/100
                              </span>
                              <button
                                onClick={() => handleOpenGradeModal(sub)}
                                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-semibold"
                              >
                                Edit Nilai
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleOpenGradeModal(sub)}
                              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-all active:scale-95"
                            >
                              Beri Nilai & Feedback
                            </button>
                          )}

                          <button
                            onClick={() => downloadSubmissionFile(sub.id)}
                            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                            title="Unduh Berkas Mahasiswa"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center rounded-2xl bg-black/20 border border-white/5 space-y-1">
                    <Clock className="w-8 h-8 text-slate-600 mx-auto" />
                    <p className="text-xs text-slate-400">Belum ada pengumpulan berkas dari mahasiswa untuk tugas ini.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-[#0e1628] border border-white/10">
              <p className="text-sm text-slate-400">Pilih tugas pada daftar di sebelah kiri.</p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: CREATE / EDIT ASSIGNMENT */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-[#0f172a] border border-white/10 shadow-2xl p-6 relative">
            <button
              onClick={() => setCreateModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif-display text-xl font-bold text-white">
              {editingAssignment ? 'Edit Tugas Perkuliahan' : 'Terbitkan Tugas Perkuliahan Baru'}
            </h3>

            <form onSubmit={handleFormSubmit} className="mt-4 space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Mata Kuliah</label>
                <select
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.code} - {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Judul Penugasan</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Tugas 4: Integrasi Microservices"
                  required
                  className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Bobot Evaluasi (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) || 10 })}
                    className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Batas Format File</label>
                  <input
                    type="text"
                    value={formData.allowedFormats}
                    onChange={(e) => setFormData({ ...formData, allowedFormats: e.target.value })}
                    placeholder=".pdf, .zip, .rar"
                    className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Deskripsi & Instruksi Pengerjaan</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tuliskan spesifikasi, rubrik penilaian, dan instruksi pengumpulan..."
                  required
                  rows={3}
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
                  {editingAssignment ? 'Simpan Pembaruan' : 'Terbitkan Sekarang'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: GRADE & FEEDBACK */}
      {gradeModalSub && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0f172a] border border-white/10 shadow-2xl p-6 relative">
            <button
              onClick={() => setGradeModalSub(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif-display text-xl font-bold text-white">
              Penilaian & Umpan Balik Dosen
            </h3>
            <p className="text-xs text-blue-400 mt-0.5">
              Mahasiswa: {gradeModalSub.studentName} ({gradeModalSub.studentNIM})
            </p>

            <form onSubmit={handleGradeSubmit} className="mt-4 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Skor Nilai Akhir (0 - 100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={gradeModalScore}
                  onChange={(e) => setGradeModalScore(parseInt(e.target.value) || 0)}
                  required
                  className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white font-bold text-base focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Catatan Dosen / Umpan Balik</label>
                <textarea
                  value={gradeModalFeedback}
                  onChange={(e) => setGradeModalFeedback(e.target.value)}
                  placeholder="Berikan apresiasi, poin kekuatan solusi, atau saran optimasi..."
                  required
                  rows={3}
                  className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white focus:border-blue-500"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setGradeModalSub(null)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-slate-300 font-semibold hover:bg-white/15"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md"
                >
                  Simpan Nilai
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
