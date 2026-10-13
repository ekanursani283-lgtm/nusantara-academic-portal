import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { 
  Users, 
  Clock, 
  MessageSquare, 
  BookOpen, 
  Download, 
  Save, 
  Plus, 
  ExternalLink,
  CheckCircle2,
  Calendar,
  X
} from 'lucide-react';

export const LecturerDashboard: React.FC = () => {
  const { 
    currentUser, 
    loginAs, 
    courses, 
    assignments, 
    submissions, 
    gradeSubmission, 
    downloadSubmissionFile,
    showToast,
    setCurrentView 
  } = useAcademic();

  // Filter courses taught by this lecturer
  const myCourses = courses.filter((c) => c.lecturerId === currentUser?.id || currentUser?.role === 'admin');
  
  // Pending submissions for this lecturer's courses
  const myCourseIds = myCourses.map((c) => c.id);
  const myAssignments = assignments.filter((a) => myCourseIds.includes(a.courseId));
  const myAssignmentIds = myAssignments.map((a) => a.id);

  const pendingSubmissions = submissions.filter(
    (s) => myAssignmentIds.includes(s.assignmentId) && s.status === 'submitted'
  );

  // Rapid grading form state per submission
  const [gradeInputs, setGradeInputs] = useState<{ [id: string]: { score: number; feedback: string } }>({
    sub_rina_mvc: { score: 92, feedback: 'Routing rapi, controller modular dan pengujian unit tuntas.' },
    sub_farhan_mvc: { score: 88, feedback: 'Arsitektur RESTful baik, dokumentasi API Swagger jelas.' }
  });

  const handleScoreChange = (subId: string, score: number) => {
    setGradeInputs((prev) => ({
      ...prev,
      [subId]: {
        score,
        feedback: prev[subId]?.feedback || ''
      }
    }));
  };

  const handleFeedbackChange = (subId: string, feedback: string) => {
    setGradeInputs((prev) => ({
      ...prev,
      [subId]: {
        score: prev[subId]?.score || 90,
        feedback
      }
    }));
  };

  const handleSaveGrade = (submission: any) => {
    const input = gradeInputs[submission.id] || { score: 90, feedback: 'Bagus dan terstruktur.' };
    gradeSubmission(submission.id, input.score, input.feedback);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Portal Pengajaran & Riset Dosen
          </span>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-white mt-1">
            Dashboard Dosen NIT
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
            className="py-1.5 px-3 rounded-xl text-center text-xs font-semibold bg-blue-600 text-white shadow-md"
          >
            Dosen
          </button>
          <button
            onClick={() => loginAs('admin')}
            className="py-1.5 px-3 rounded-xl text-center text-xs font-semibold text-slate-400 hover:text-white"
          >
            Admin
          </button>
        </div>
      </div>

      {/* Lecturer Profile Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0e1628] via-[#111c34] to-[#0e1628] border border-white/10 p-6 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-serif-display text-2xl font-bold flex items-center justify-center shadow-xl shrink-0">
            BH
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-xs font-semibold">
                {currentUser?.rank || 'Dosen Tetap • Lektor Kepala'}
              </span>
              <span className="text-xs text-slate-400">
                {currentUser?.department || 'Fakultas Sains Data & Informatika'}
              </span>
            </div>
            <h2 className="font-serif-display text-2xl font-bold text-white mt-1 truncate">
              {currentUser?.name || 'Dr. Ir. Budi Hartono, M.Kom.'}
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              NIDN: <span className="text-white">{currentUser?.identifier || '0412087501'}</span>
            </p>
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 bg-black/20 rounded-2xl p-4 text-center">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Kelas Diampu
            </span>
            <span className="font-serif-display text-2xl sm:text-3xl font-bold text-blue-400 mt-1 block">
              {myCourses.length}
            </span>
            <span className="text-[10px] text-slate-400">
              {myCourses.reduce((sum, c) => sum + c.enrolledCount, 0)} Mahasiswa
            </span>
          </div>

          <div className="border-x border-white/10 px-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Perlu Dinilai
            </span>
            <span className="font-serif-display text-2xl sm:text-3xl font-bold text-amber-400 mt-1 block">
              {pendingSubmissions.length}
            </span>
            <span className="text-[10px] text-amber-300">Antrean Review</span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Moderasi Forum
            </span>
            <span className="font-serif-display text-2xl sm:text-3xl font-bold text-white mt-1 block">
              3
            </span>
            <span className="text-[10px] text-blue-300">Thread Aktif</span>
          </div>
        </div>
      </div>

      {/* Assigned Classes Overview */}
      <div className="rounded-3xl bg-[#0e1628] border border-white/10 p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="font-serif-display text-lg sm:text-xl font-bold text-white">
              Daftar Mata Kuliah Diampu
            </h3>
            <p className="text-xs text-slate-400">Semester Genap 2025/2026 • Kurikulum Outcome-Based Education</p>
          </div>
          <button
            onClick={() => setCurrentView('assignments')}
            className="px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Buat Tugas Baru</span>
          </button>
        </div>

        <div className="space-y-3">
          {myCourses.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-2xl bg-black/20 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-500/20 transition-all"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-600/20 text-blue-300 text-xs font-bold font-mono">
                    {c.code}
                  </span>
                  <p className="font-bold text-white text-sm">{c.title}</p>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {c.schedule} • {c.room} • {c.credits} SKS
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-xl bg-white/5 text-slate-200 text-xs font-bold">
                  {c.enrolledCount} / {c.capacity} Mhs
                </span>
                <button
                  onClick={() => setCurrentView('assignments')}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-blue-300 text-xs font-semibold"
                >
                  Kelola Evaluasi
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rapid Inline Grading Interface */}
      <div className="rounded-3xl bg-[#0e1628] border border-white/10 p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="font-serif-display text-lg sm:text-xl font-bold text-white">
              Input Nilai & Evaluasi Cepat
            </h3>
            <p className="text-xs text-slate-400">
              Periksa berkas unggahan mahasiswa, masukkan skor penilaian, dan simpan langsung ke basis data.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
            {pendingSubmissions.length} Antrean Penilaian
          </span>
        </div>

        {pendingSubmissions.length > 0 ? (
          <div className="space-y-4">
            {pendingSubmissions.map((sub) => {
              const asg = assignments.find((a) => a.id === sub.assignmentId);
              const currentScore = gradeInputs[sub.id]?.score ?? 90;
              const currentFeedback = gradeInputs[sub.id]?.feedback ?? 'Pengerjaan baik dan sesuai spesifikasi.';

              return (
                <div
                  key={sub.id}
                  className="p-5 rounded-2xl bg-black/30 border border-white/10 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif-display text-base font-bold text-white">
                          {sub.studentName}
                        </h4>
                        <span className="text-xs text-blue-400 font-mono">
                          (NIM: {sub.studentNIM})
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Tugas: <strong className="text-white">{asg?.title}</strong> ({asg?.courseCode})
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Berkas: <span className="font-mono text-slate-300">{sub.fileName}</span> ({sub.fileSize})
                      </p>
                    </div>

                    <button
                      onClick={() => downloadSubmissionFile(sub.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-bold flex items-center gap-1.5 self-start transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh Berkas</span>
                    </button>
                  </div>

                  {sub.studentNotes && (
                    <p className="text-xs text-slate-400 italic bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                      Catatan Mahasiswa: "{sub.studentNotes}"
                    </p>
                  )}

                  {/* Input Score & Feedback */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-1 space-y-1">
                      <label className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">
                        Nilai (0 - 100)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={currentScore}
                        onChange={(e) => handleScoreChange(sub.id, parseInt(e.target.value) || 0)}
                        className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-center text-sm font-bold text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-3 space-y-1">
                      <label className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">
                        Catatan Dosen / Umpan Balik
                      </label>
                      <input
                        type="text"
                        value={currentFeedback}
                        onChange={(e) => handleFeedbackChange(sub.id, e.target.value)}
                        placeholder="Tuliskan umpan balik evaluasi tugas..."
                        className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleSaveGrade(sub)}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan & Terbitkan Nilai Mahasiswa</span>
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center rounded-2xl bg-black/20 border border-white/5 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="text-sm font-semibold text-white">Semua berkas tugas telah diperiksa!</p>
            <p className="text-xs text-slate-400">Tidak ada antrean penilaian yang tertunda saat ini.</p>
          </div>
        )}
      </div>
    </div>
  );
};
