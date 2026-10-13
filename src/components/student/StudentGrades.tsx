import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { 
  FileText, 
  Printer, 
  Award, 
  Download, 
  ChevronRight, 
  HelpCircle,
  TrendingUp,
  BookOpen
} from 'lucide-react';

export const StudentGrades: React.FC = () => {
  const { currentUser, enrollments, courses, showToast } = useAcademic();
  const [selectedSemester, setSelectedSemester] = useState<number>(6);

  // Filter enrollments strictly for this logged-in student (data isolation)
  const myEnrollments = enrollments.filter((e) => e.studentId === currentUser?.id);
  const semesterEnrollments = myEnrollments.filter((e) => e.semester === selectedSemester);

  // Compute semester credits and semester GPA
  const totalSKS = semesterEnrollments.reduce((sum, e) => {
    const c = courses.find((crs) => crs.id === e.courseId);
    return sum + (c ? c.credits : 0);
  }, 0);

  const totalPoints = semesterEnrollments.reduce((sum, e) => {
    const c = courses.find((crs) => crs.id === e.courseId);
    const credits = c ? c.credits : 0;
    return sum + (e.gradePoint * credits);
  }, 0);

  const ips = totalSKS > 0 ? (totalPoints / totalSKS).toFixed(2) : '0.00';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
            <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
              Kartu Hasil Studi (KHS) & Transkrip
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Laporan kemajuan capaian akademik resmi mahasiswa per semester.
          </p>
        </div>

        <button
          onClick={() => showToast('Mencetak transkrip akademik resmi ber-QR verification...', 'success')}
          className="px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-all self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Dokumen Resmi</span>
        </button>
      </div>

      {/* Overview Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#0e1628] border border-white/10 shadow-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
              Indeks Prestasi Semester (IPS)
            </span>
            <span className="font-serif-display text-2xl sm:text-3xl font-bold text-blue-400 mt-0.5 block">
              {ips}
            </span>
            <span className="text-[11px] text-emerald-400 font-medium">Predikat: Sangat Memuaskan</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0e1628] border border-white/10 shadow-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
              IPK Kumulatif (Total)
            </span>
            <span className="font-serif-display text-2xl sm:text-3xl font-bold text-white mt-0.5 block">
              {currentUser?.gpa?.toFixed(2) || '3.88'}
            </span>
            <span className="text-[11px] text-blue-300 font-medium">84 / 144 SKS Selesai</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0e1628] border border-white/10 shadow-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
              SKS Semester Aktif
            </span>
            <span className="font-serif-display text-2xl sm:text-3xl font-bold text-white mt-0.5 block">
              {totalSKS} SKS
            </span>
            <span className="text-[11px] text-slate-400 font-medium">5 Mata Kuliah Berjalan</span>
          </div>
        </div>
      </div>

      {/* Semester Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[1, 2, 3, 4, 5, 6].map((sem) => (
          <button
            key={sem}
            onClick={() => setSelectedSemester(sem)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedSemester === sem
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-[#0e1628] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            Semester {sem} {sem === 6 ? '(Aktif)' : ''}
          </button>
        ))}
      </div>

      {/* Detailed Grades Table */}
      <div className="bg-[#0e1628] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Daftar Nilai Semester {selectedSemester}
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Skala Nilai 0.0 - 4.0 (A, A-, B+, B, C, D, E)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#070b14] text-slate-400 uppercase tracking-wider text-[11px] border-b border-white/10">
              <tr>
                <th className="py-3 px-5">Kode</th>
                <th className="py-3 px-4">Nama Mata Kuliah</th>
                <th className="py-3 px-4 text-center">SKS</th>
                <th className="py-3 px-4 text-center">Kehadiran</th>
                <th className="py-3 px-4 text-center">Nilai Angka</th>
                <th className="py-3 px-4 text-center">Nilai Huruf</th>
                <th className="py-3 px-4 text-center">Bobot</th>
                <th className="py-3 px-5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {semesterEnrollments.map((enr) => {
                const c = courses.find((crs) => crs.id === enr.courseId);
                return (
                  <tr key={enr.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-5 font-mono text-blue-300 font-semibold">{c?.code}</td>
                    <td className="py-3.5 px-4 font-semibold text-white">
                      <div>{c?.title}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{c?.lecturerName}</div>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono">{c?.credits}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[11px] font-mono">
                        {enr.attendance}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-white">
                      {enr.score.toFixed(1)}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex w-7 h-7 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/30 items-center justify-center font-serif-display font-bold text-sm">
                        {enr.letterGrade}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-semibold text-slate-300">
                      {enr.gradePoint.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        Lulus (Tuntas)
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Summary Bar */}
        <div className="p-4 bg-[#070b14] border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span>Total Beban: <strong className="text-white">{totalSKS} SKS</strong></span>
            <span>Total Poin Mutu: <strong className="text-blue-300 font-mono">{totalPoints.toFixed(2)}</strong></span>
            <span>IPS Semester {selectedSemester}: <strong className="text-emerald-400 font-mono">{ips}</strong></span>
          </div>

          <button
            onClick={() => showToast('Transkrip elektronik tersertifikasi telah dikirim ke email kampus Anda.', 'success')}
            className="text-blue-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh Salinan Transkrip Digital (.pdf)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
