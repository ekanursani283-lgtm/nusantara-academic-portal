import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { 
  CheckCircle2, 
  Award, 
  Clock, 
  UploadCloud, 
  Quote, 
  Printer, 
  MessageSquare, 
  Plus, 
  Send, 
  FileText, 
  RefreshCw, 
  ExternalLink,
  X,
  FileCheck,
  Calendar,
  AlertCircle
} from 'lucide-react';
import graduateSpotlight from '../../assets/images/graduate_spotlight_1791899282040.jpg';

export const StudentDashboard: React.FC = () => {
  const { 
    currentUser, 
    loginAs, 
    assignments, 
    submissions, 
    courses, 
    enrollments, 
    discussions, 
    createTopic, 
    replyTopic, 
    submitAssignment, 
    showToast,
    setCurrentView 
  } = useAcademic();

  // State for Upload Assignment Modal
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [studentNotes, setStudentNotes] = useState('');

  // State for Discussion fast topic
  const [showNewTopicForm, setShowNewTopicForm] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicContent, setNewTopicContent] = useState('');
  const [newTopicCourse, setNewTopicCourse] = useState(courses[0]?.id || '');

  // State for fast reply modal
  const [replyModalTopicId, setReplyModalTopicId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  // Print KHS modal
  const [showPrintModal, setShowPrintModal] = useState(false);

  const selectedAssignment = assignments.find((a) => a.id === selectedAssignmentId);

  // Find submissions for this student only (data isolation)
  const studentSubmissions = submissions.filter((s) => s.studentId === currentUser?.id);
  const myEnrollments = enrollments.filter((e) => e.studentId === currentUser?.id);

  const handleOpenUpload = (assignmentId: string) => {
    setSelectedAssignmentId(assignmentId);
    setSelectedFile(null);
    setStudentNotes('');
    setUploadModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 25 * 1024 * 1024) {
        showToast('Ukuran file melebihi batas maksimal 25 MB.', 'error', 'warning');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment || !selectedFile) {
      showToast('Harap pilih file terlebih dahulu.', 'warning', 'alert-circle');
      return;
    }

    const fileSizeFormatted = (selectedFile.size / (1024 * 1024)).toFixed(1) + ' MB';
    const res = await submitAssignment({
      assignmentId: selectedAssignment.id,
      file: selectedFile,
      fileName: selectedFile.name,
      fileSize: fileSizeFormatted,
      fileType: selectedFile.type || 'application/octet-stream',
      studentNotes,
    });

    if (res.success) {
      setUploadModalOpen(false);
      setSelectedFile(null);
    }
  };

  const handlePostTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim() || !newTopicContent.trim()) {
      showToast('Harap lengkapi judul dan deskripsi diskusi.', 'warning');
      return;
    }
    createTopic(newTopicCourse, newTopicTitle, newTopicContent);
    setNewTopicTitle('');
    setNewTopicContent('');
    setShowNewTopicForm(false);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyModalTopicId || !replyContent.trim()) return;
    replyTopic(replyModalTopicId, replyContent);
    setReplyContent('');
    setReplyModalTopicId(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner: Academic Session Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Sistem Informasi Akademik Terpadu
          </span>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-white mt-1">
            Portal Akademik NIT
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Sinkronisasi data kalender dan KRS realtime berhasil!', 'info', 'refresh-cw')}
            className="w-10 h-10 rounded-xl bg-[#0e1628] border border-white/10 hover:bg-white/5 text-blue-400 flex items-center justify-center transition-all active:scale-95 shadow-md"
            title="Sinkronisasi Data Realtime"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Active Academic Session Indicator */}
      <div className="p-4 rounded-2xl bg-[#0e1628] border border-white/10 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate">Semester Genap 2025/2026</p>
            <p className="text-xs text-slate-400 truncate">Minggu Perkuliahan ke-8 • Masa Aktif Kuliah</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold shrink-0">
          Aktif
        </span>
      </div>

      {/* Role Switcher Segmented Control */}
      <div className="p-1 rounded-2xl bg-[#090e1a] border border-white/10 flex items-center shadow-inner gap-1">
        <button
          onClick={() => loginAs('student')}
          className="flex-1 py-2.5 px-2 rounded-xl text-center text-xs font-semibold bg-blue-600 text-white shadow-md flex items-center justify-center gap-2 transition-all"
        >
          <span>Mahasiswa</span>
        </button>
        <button
          onClick={() => loginAs('lecturer')}
          className="flex-1 py-2.5 px-2 rounded-xl text-center text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 flex items-center justify-center gap-2 transition-all"
        >
          <span>Dosen</span>
        </button>
        <button
          onClick={() => loginAs('admin')}
          className="flex-1 py-2.5 px-2 rounded-xl text-center text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 flex items-center justify-center gap-2 transition-all"
        >
          <span>Admin</span>
        </button>
      </div>

      {/* Student Overview Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e1628] via-[#111c34] to-[#0e1628] border border-white/10 p-6 shadow-2xl">
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center gap-5 relative z-10">
          <div className="relative shrink-0">
            <img
              src={currentUser?.avatar || graduateSpotlight}
              alt={currentUser?.name}
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-blue-500/50 shadow-xl"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-[#070b12] flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-white" />
            </span>
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-serif-display text-2xl font-bold text-white truncate">
                {currentUser?.name || 'Andi Pratama S.'}
              </h2>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold">
                {currentUser?.department || 'Teknik Informatika'}
              </span>
            </div>

            <p className="text-xs text-slate-400 font-mono">
              NIM: <span className="text-white font-bold">{currentUser?.identifier || '2201082045'}</span>
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Keuangan Lunas</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-400 text-xs font-medium">
                <Award className="w-3.5 h-3.5" />
                <span>Beasiswa Unggulan</span>
              </span>
            </div>
          </div>
        </div>

        {/* Academic Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/10 bg-black/20 rounded-2xl p-4 text-center">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              IPK Kumulatif
            </span>
            <span className="font-serif-display text-2xl sm:text-3xl font-bold text-blue-400 mt-1 block">
              {currentUser?.gpa?.toFixed(2) || '3.88'}
            </span>
            <span className="text-[10px] text-emerald-400 font-medium">▲ +0.06 Poin</span>
          </div>

          <div className="border-x border-white/10 px-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              SKS Tempuh
            </span>
            <span className="font-serif-display text-2xl sm:text-3xl font-bold text-white mt-1 block">
              {currentUser?.completedCredits || 84}{' '}
              <span className="text-xs text-slate-400 font-normal">/ {currentUser?.totalCredits || 144}</span>
            </span>
            <span className="text-[10px] text-blue-300 font-medium">Sem. {currentUser?.semester || 6} Aktif</span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Beban KRS
            </span>
            <span className="font-serif-display text-2xl sm:text-3xl font-bold text-white mt-1 block">
              21 <span className="text-xs text-slate-400 font-normal">SKS</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium">7 Matakuliah</span>
          </div>
        </div>
      </div>

      {/* SECTION: TUGAS & EVALUASI MENDATANG */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
            <h3 className="font-serif-display text-lg sm:text-xl font-bold text-white">
              Tugas & Evaluasi Mendatang
            </h3>
          </div>
          <button
            onClick={() => setCurrentView('assignments')}
            className="text-xs font-semibold text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Lihat Semua Tugas</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Task 1: Web MVC - Belum Dikumpulkan */}
          {assignments[0] && (
            <div className="rounded-2xl bg-[#0e1628] border border-white/10 p-5 shadow-xl flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {studentSubmissions.some((s) => s.assignmentId === assignments[0].id) ? (
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold mb-1.5">
                        Sudah Dikumpulkan
                      </span>
                    ) : (
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold mb-1.5">
                        Belum Dikumpulkan
                      </span>
                    )}
                    <h4 className="font-serif-display text-base font-bold text-white leading-snug">
                      {assignments[0].title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">{assignments[0].courseName}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                  {assignments[0].description}
                </p>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10 text-xs text-slate-400">
                  <span className="text-amber-300 font-medium">Tenggat: Besok, 23:59 WIB</span>
                  <span>Bobot: {assignments[0].weight}%</span>
                </div>
              </div>

              <button
                onClick={() => handleOpenUpload(assignments[0].id)}
                className="w-full py-2.5 px-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
              >
                <UploadCloud className="w-4 h-4" />
                <span>
                  {studentSubmissions.some((s) => s.assignmentId === assignments[0].id)
                    ? 'Perbarui Berkas Tugas'
                    : 'Unggah Berkas (.zip, .pdf)'}
                </span>
              </button>
            </div>
          )}

          {/* Task 2: Quiz Algoritma Genetika - Sudah Dinilai */}
          {assignments[1] && (() => {
            const task2Sub = studentSubmissions.find((s) => s.assignmentId === assignments[1].id);
            const isGraded = task2Sub?.status === 'graded';
            return (
              <div className="rounded-2xl bg-[#0e1628] border border-white/10 p-5 shadow-xl flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold mb-1.5 ${
                        isGraded ? 'bg-blue-500/20 text-blue-300' : task2Sub ? 'bg-cyan-500/20 text-cyan-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {isGraded ? 'Sudah Dinilai' : task2Sub ? 'Menunggu Penilaian' : 'Belum Dikumpulkan'}
                      </span>
                      <h4 className="font-serif-display text-base font-bold text-white leading-snug">
                        {assignments[1].title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">{assignments[1].courseName}</p>
                    </div>
                    {isGraded ? (
                      <div className="px-3 py-1.5 rounded-xl bg-blue-600/20 text-blue-400 text-center shrink-0">
                        <span className="font-serif-display text-xl font-bold block leading-none">{task2Sub?.score ?? 95}</span>
                        <span className="text-[10px] text-slate-400">/ 100</span>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  {/* Lecturer Feedback Quote */}
                  {task2Sub?.feedback ? (
                    <div className="mt-4 p-3 rounded-xl bg-black/30 border border-white/5 text-xs text-slate-300 flex items-start gap-2.5">
                      <Quote className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <p className="italic leading-relaxed">
                        <strong className="text-white not-italic font-semibold">Catatan Dosen ({task2Sub.gradedBy || 'Dosen'}): </strong>
                        "{task2Sub.feedback}"
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 p-3 rounded-xl bg-black/30 border border-white/5 text-xs text-slate-300 flex items-start gap-2.5">
                      <Quote className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <p className="italic leading-relaxed">
                        <strong className="text-white not-italic font-semibold">Catatan Dosen: </strong>
                        "Implementasi seleksi roulette wheel dan crossover sangat efisien dan rapi!"
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                  <span>Dosen: Prof. Dr. Maya Indrawati</span>
                  <span className="text-emerald-400 font-semibold">{isGraded ? 'Tuntas (Lulus)' : 'Aktif'}</span>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* SECTION: KARTU HASIL STUDI (KHS) PREVIEW */}
      <div className="rounded-3xl bg-[#0e1628] border border-white/10 p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div>
            <h3 className="font-serif-display text-lg sm:text-xl font-bold text-white">
              Kartu Hasil Studi (KHS)
            </h3>
            <p className="text-xs text-slate-400">
              Pratinjau Nilai Sementara Semester 6 • Tahun Akademik 2025/2026
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('grades')}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold transition-colors"
            >
              Rincian Lengkap
            </button>
            <button
              onClick={() => setShowPrintModal(true)}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak KHS</span>
            </button>
          </div>
        </div>

        {/* Course Grades List */}
        <div className="divide-y divide-white/10">
          {myEnrollments.slice(0, 4).map((enr) => {
            const course = courses.find((c) => c.id === enr.courseId);
            if (!course) return null;
            return (
              <div key={enr.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate">{course.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {course.code} • {course.credits} SKS • {course.lecturerName}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-slate-400 font-mono">{enr.score.toFixed(1)}</span>
                  <span className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-300 font-serif-display text-base font-bold flex items-center justify-center border border-blue-500/30">
                    {enr.letterGrade}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION: FORUM DISKUSI KULIAH */}
      <div className="rounded-3xl bg-[#0e1628] border border-white/10 p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            <h3 className="font-serif-display text-lg sm:text-xl font-bold text-white">
              Forum Diskusi Kuliah
            </h3>
          </div>
          <button
            onClick={() => setShowNewTopicForm(!showNewTopicForm)}
            className="px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1 shadow-md active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Topik Baru</span>
          </button>
        </div>

        {/* New Topic Form */}
        {showNewTopicForm && (
          <form onSubmit={handlePostTopic} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Pilih Mata Kuliah</label>
              <select
                value={newTopicCourse}
                onChange={(e) => setNewTopicCourse(e.target.value)}
                className="w-full bg-[#090e1a] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} - {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">Judul Diskusi</label>
              <input
                type="text"
                value={newTopicTitle}
                onChange={(e) => setNewTopicTitle(e.target.value)}
                placeholder="Tuliskan judul topik bahasan..."
                required
                className="w-full bg-[#090e1a] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">Isi Pertanyaan / Materi</label>
              <textarea
                value={newTopicContent}
                onChange={(e) => setNewTopicContent(e.target.value)}
                placeholder="Jelaskan pertanyaan atau topik diskusi secara detail..."
                required
                rows={3}
                className="w-full bg-[#090e1a] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowNewTopicForm(false)}
                className="px-3.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md"
              >
                Publikasikan Topik
              </button>
            </div>
          </form>
        )}

        {/* Active Threads List */}
        <div className="space-y-3">
          {discussions.slice(0, 2).map((disc) => (
            <div
              key={disc.id}
              className="p-4 rounded-2xl bg-black/20 border border-white/5 hover:border-blue-500/20 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="px-2 py-0.5 rounded bg-blue-600/20 text-blue-300 text-[10px] font-bold">
                    {disc.courseCode}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1.5">
                    {disc.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {disc.content}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold flex items-center gap-1 shrink-0">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                  <span>{disc.replies.length}</span>
                </span>
              </div>

              {/* Thread Replies Preview */}
              {disc.replies.length > 0 && (
                <div className="pl-3 border-l-2 border-blue-500/40 space-y-1.5 text-xs text-slate-300">
                  <p className="font-semibold text-blue-300">{disc.replies[disc.replies.length - 1].authorName}:</p>
                  <p className="text-slate-400 italic">"{disc.replies[disc.replies.length - 1].content}"</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-slate-500">
                <span>Oleh: {disc.authorName}</span>
                <button
                  onClick={() => setReplyModalTopicId(disc.id)}
                  className="text-blue-400 hover:underline font-semibold flex items-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Balas Diskusi</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: UPLOAD TUGAS */}
      {uploadModalOpen && selectedAssignment && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0f172a] border border-white/10 shadow-2xl p-6 relative">
            <button
              onClick={() => setUploadModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif-display text-xl font-bold text-white">
              Unggah Pengumpulan Tugas
            </h3>
            <p className="text-xs text-blue-400 mt-1 font-semibold">
              {selectedAssignment.title}
            </p>
            <p className="text-[11px] text-slate-400">
              {selectedAssignment.courseName} • Bobot: {selectedAssignment.weight}%
            </p>

            <form onSubmit={handleUploadSubmit} className="mt-4 space-y-4">
              {/* File Dropzone */}
              <div 
                onClick={() => document.getElementById('assignment-file-input')?.click()}
                className="p-6 rounded-2xl border-2 border-dashed border-white/20 hover:border-blue-500 bg-[#070b14] flex flex-col items-center justify-center text-center cursor-pointer transition-colors"
              >
                <UploadCloud className="w-10 h-10 text-blue-400 mb-2" />
                <span className="text-xs font-bold text-white">
                  {selectedFile ? selectedFile.name : 'Pilih atau Drag Berkas ke Sini'}
                </span>
                <span className="text-[11px] text-slate-500 mt-1">
                  Format diizinkan: {selectedAssignment.allowedFormats.join(', ')} (Maks. {selectedAssignment.maxFileSizeMB}MB)
                </span>
                <input
                  id="assignment-file-input"
                  type="file"
                  onChange={handleFileChange}
                  accept={selectedAssignment.allowedFormats.join(',')}
                  className="hidden"
                />
              </div>

              {/* Student Notes */}
              <div className="space-y-1">
                <label className="text-xs text-slate-300">Catatan Mahasiswa (Opsional)</label>
                <textarea
                  value={studentNotes}
                  onChange={(e) => setStudentNotes(e.target.value)}
                  placeholder="Tautan repository Git, dokumentasi singkat, atau instruksi konfigurasi .env..."
                  rows={2}
                  className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-slate-300 font-semibold text-xs hover:bg-white/15"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={!selectedFile}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all"
                >
                  Kirim Berkas Tugas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: BALAS DISKUSI CEPAT */}
      {replyModalTopicId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0f172a] border border-white/10 shadow-2xl p-6 relative">
            <button
              onClick={() => setReplyModalTopicId(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif-display text-lg font-bold text-white">
              Tulis Balasan Forum
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Tanggapi topik diskusi aktif sebagai {currentUser?.name}.
            </p>

            <form onSubmit={handleSendReply} className="mt-4 space-y-4">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Tuliskan respon, solusi teknis, atau pertanyaan lanjutan..."
                required
                rows={4}
                className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setReplyModalTopicId(null)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-slate-300 font-semibold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md"
                >
                  Kirim Balasan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CETAK KHS DIGITAL RESMI */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-[#0d1424] border border-white/10 shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowPrintModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Document Header */}
            <div className="text-center pb-5 border-b-2 border-white/20">
              <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-white tracking-wide">
                NUSANTARA INSTITUTE OF TECHNOLOGY
              </h2>
              <p className="text-xs text-blue-300 uppercase tracking-widest mt-0.5">
                KARTU HASIL STUDI (KHS) SEMENTARA
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Semester Genap 2025/2026 • Dokumen Resmi Terverifikasi Sistem Informasi Akademik
              </p>
            </div>

            {/* Student Info Grid */}
            <div className="grid grid-cols-2 gap-4 py-4 text-xs text-slate-300 border-b border-white/10">
              <div>
                <p><span className="text-slate-500">Nama:</span> <strong className="text-white">{currentUser?.name}</strong></p>
                <p className="mt-1"><span className="text-slate-500">NIM:</span> <span className="font-mono text-white">{currentUser?.identifier}</span></p>
                <p className="mt-1"><span className="text-slate-500">Program Studi:</span> {currentUser?.department}</p>
              </div>
              <div>
                <p><span className="text-slate-500">Dosen Wali:</span> Dr. Ir. Budi Hartono, M.Kom.</p>
                <p className="mt-1"><span className="text-slate-500">IPK Kumulatif:</span> <strong className="text-blue-400">{currentUser?.gpa}</strong></p>
                <p className="mt-1"><span className="text-slate-500">Status Pembayaran:</span> <span className="text-emerald-400 font-semibold">Lunas</span></p>
              </div>
            </div>

            {/* Courses Table */}
            <div className="py-4">
              <table className="w-full text-xs text-left">
                <thead className="text-[11px] uppercase tracking-wider text-slate-400 border-b border-white/10">
                  <tr>
                    <th className="py-2">Kode</th>
                    <th className="py-2">Mata Kuliah</th>
                    <th className="py-2 text-center">SKS</th>
                    <th className="py-2 text-center">Nilai</th>
                    <th className="py-2 text-center">Huruf</th>
                    <th className="py-2 text-center">Bobot</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {myEnrollments.map((e) => {
                    const c = courses.find((crs) => crs.id === e.courseId);
                    return (
                      <tr key={e.id} className="hover:bg-white/[0.02]">
                        <td className="py-2.5 font-mono text-slate-400">{c?.code}</td>
                        <td className="py-2.5 font-semibold text-white">{c?.title}</td>
                        <td className="py-2.5 text-center">{c?.credits}</td>
                        <td className="py-2.5 text-center font-mono">{e.score.toFixed(1)}</td>
                        <td className="py-2.5 text-center font-bold text-blue-300">{e.letterGrade}</td>
                        <td className="py-2.5 text-center font-mono">{e.gradePoint.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Official Digital Stamp & Signature */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-blue-400" />
                <span>QR Verifikasi Digital PDDIKTI Terbit</span>
              </div>
              <div className="text-right">
                <p>Nusantara, 13 Oktober 2026</p>
                <p className="font-semibold text-white mt-1">Wakil Rektor Bidang Akademik</p>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => {
                  showToast('Mengunduh dokumen PDF Kartu Hasil Studi ber-cap digital...', 'success');
                  setShowPrintModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Simpan Berkas PDF</span>
              </button>
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2.5 rounded-xl bg-white/10 text-slate-300 font-semibold text-xs hover:bg-white/15"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
