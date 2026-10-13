import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { 
  FileText, 
  UploadCloud, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Quote, 
  Filter, 
  Download, 
  X,
  FileCheck
} from 'lucide-react';

export const StudentAssignments: React.FC = () => {
  const { currentUser, assignments, submissions, submitAssignment, downloadSubmissionFile, showToast } = useAcademic();

  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');
  const [uploadModalAssignmentId, setUploadModalAssignmentId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [studentNotes, setStudentNotes] = useState('');

  // Find assignments and their submission status
  const assignmentsWithStatus = assignments.map((asg) => {
    const submission = submissions.find(
      (s) => s.assignmentId === asg.id && s.studentId === currentUser?.id
    );
    let status: 'pending' | 'submitted' | 'graded' = 'pending';
    if (submission) {
      status = submission.status === 'graded' ? 'graded' : 'submitted';
    }
    return {
      assignment: asg,
      submission,
      status,
    };
  });

  const filtered = assignmentsWithStatus.filter((item) => {
    if (statusFilter === 'all') return true;
    return item.status === statusFilter;
  });

  const targetAssignment = assignments.find((a) => a.id === uploadModalAssignmentId);

  const handleOpenUpload = (asgId: string) => {
    setUploadModalAssignmentId(asgId);
    setSelectedFile(null);
    setStudentNotes('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 25 * 1024 * 1024) {
        showToast('Ukuran file melebihi 25MB.', 'error');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetAssignment || !selectedFile) {
      showToast('Harap pilih berkas terlebih dahulu.', 'warning');
      return;
    }

    const fileSizeFormatted = (selectedFile.size / (1024 * 1024)).toFixed(1) + ' MB';
    const res = await submitAssignment({
      assignmentId: targetAssignment.id,
      file: selectedFile,
      fileName: selectedFile.name,
      fileSize: fileSizeFormatted,
      fileType: selectedFile.type || 'application/octet-stream',
      studentNotes,
    });

    if (res.success) {
      setUploadModalAssignmentId(null);
      setSelectedFile(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
            <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
              Tugas & Evaluasi Akademik
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Daftar penugasan, instruksi praktikum, unggah berkas tugas, dan riwayat penilaian dosen.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#0e1628] border border-white/10">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Semua ({assignments.length})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === 'pending'
                ? 'bg-amber-500 text-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Belum Dikumpulkan
          </button>
          <button
            onClick={() => setStatusFilter('submitted')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === 'submitted'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Menunggu Nilai
          </button>
          <button
            onClick={() => setStatusFilter('graded')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === 'graded'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sudah Dinilai
          </button>
        </div>
      </div>

      {/* Assignment Cards List */}
      <div className="space-y-4">
        {filtered.map(({ assignment, submission, status }) => (
          <div
            key={assignment.id}
            className="rounded-3xl bg-[#0e1628] border border-white/10 p-6 shadow-xl space-y-4 hover:border-blue-500/20 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-600/20 text-blue-300 text-xs font-bold font-mono">
                    {assignment.courseCode}
                  </span>
                  <span className="text-xs text-slate-400">
                    {assignment.courseName}
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs text-slate-400">
                    Bobot Evaluasi: <strong className="text-white">{assignment.weight}%</strong>
                  </span>
                </div>

                <h3 className="font-serif-display text-xl font-bold text-white mt-1">
                  {assignment.title}
                </h3>
              </div>

              {/* Status Badge & Score */}
              <div className="shrink-0 flex items-center gap-3">
                {status === 'pending' && (
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Belum Dikumpulkan
                  </span>
                )}
                {status === 'submitted' && (
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5" />
                    Menunggu Penilaian Dosen
                  </span>
                )}
                {status === 'graded' && (
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Sudah Dinilai
                    </span>
                    <div className="px-3 py-1 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 font-serif-display font-bold text-base">
                      {submission?.score} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Assignment Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#070b14] p-4 rounded-2xl border border-white/5">
              {assignment.description}
            </p>

            {/* Submission Info / Feedback Box if any */}
            {submission && (
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span className="font-semibold text-white">{submission.fileName}</span>
                    <span className="text-slate-500 font-mono">({submission.fileSize})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500">
                      Diserahkan: {new Date(submission.submittedAt).toLocaleString('id-ID')}
                    </span>
                    <button
                      onClick={() => downloadSubmissionFile(submission.id)}
                      className="text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh Berkas</span>
                    </button>
                  </div>
                </div>

                {submission.studentNotes && (
                  <p className="text-xs text-slate-400 italic">
                    Catatan Anda: "{submission.studentNotes}"
                  </p>
                )}

                {submission.feedback && (
                  <div className="pt-2 border-t border-white/10 text-xs text-slate-300 flex items-start gap-2">
                    <Quote className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-blue-300">Umpan Balik Dosen ({submission.gradedBy}): </strong>
                      <span className="italic">"{submission.feedback}"</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-slate-400">
              <div>
                <span>Format yang didukung: <strong className="text-white">{assignment.allowedFormats.join(', ')}</strong> (Maks. {assignment.maxFileSizeMB}MB)</span>
              </div>

              <button
                onClick={() => handleOpenUpload(assignment.id)}
                className="py-2.5 px-5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all self-start sm:self-auto"
              >
                <UploadCloud className="w-4 h-4" />
                <span>
                  {submission ? 'Unggah Ulang Revisi Berkas' : 'Unggah Berkas Tugas'}
                </span>
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-[#0e1628] border border-white/10 space-y-2">
            <FileText className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">Tidak ada penugasan pada kategori ini.</p>
            <p className="text-xs text-slate-500">Seluruh tugas telah diselesaikan atau belum diterbitkan.</p>
          </div>
        )}
      </div>

      {/* MODAL: UPLOAD BERKAS */}
      {uploadModalAssignmentId && targetAssignment && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0f172a] border border-white/10 shadow-2xl p-6 relative">
            <button
              onClick={() => setUploadModalAssignmentId(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif-display text-xl font-bold text-white">
              Unggah Pengumpulan Tugas
            </h3>
            <p className="text-xs text-blue-400 mt-1 font-semibold">
              {targetAssignment.title}
            </p>
            <p className="text-[11px] text-slate-400">
              {targetAssignment.courseName} • Bobot: {targetAssignment.weight}%
            </p>

            <form onSubmit={handleUploadSubmit} className="mt-4 space-y-4">
              <div 
                onClick={() => document.getElementById('assignment-file-input-full')?.click()}
                className="p-6 rounded-2xl border-2 border-dashed border-white/20 hover:border-blue-500 bg-[#070b14] flex flex-col items-center justify-center text-center cursor-pointer transition-colors"
              >
                <UploadCloud className="w-10 h-10 text-blue-400 mb-2" />
                <span className="text-xs font-bold text-white">
                  {selectedFile ? selectedFile.name : 'Pilih atau Drag Berkas ke Sini'}
                </span>
                <span className="text-[11px] text-slate-500 mt-1">
                  Format diizinkan: {targetAssignment.allowedFormats.join(', ')} (Maks. {targetAssignment.maxFileSizeMB}MB)
                </span>
                <input
                  id="assignment-file-input-full"
                  type="file"
                  onChange={handleFileChange}
                  accept={targetAssignment.allowedFormats.join(',')}
                  className="hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300">Catatan Tambahan Mahasiswa</label>
                <textarea
                  value={studentNotes}
                  onChange={(e) => setStudentNotes(e.target.value)}
                  placeholder="Tautan repository Git, dokumentasi singkat, atau panduan pengujian..."
                  rows={2}
                  className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setUploadModalAssignmentId(null)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-slate-300 font-semibold text-xs hover:bg-white/15"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={!selectedFile}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all"
                >
                  Kirim Berkas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
