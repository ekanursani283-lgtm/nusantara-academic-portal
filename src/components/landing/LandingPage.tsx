import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { 
  GraduationCap, 
  ArrowRight, 
  ArrowUpRight, 
  School, 
  Building2, 
  Cpu, 
  Radio, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  CheckCircle2, 
  X,
  FileText
} from 'lucide-react';
import { CampusNews } from '../../types';

export const LandingPage: React.FC = () => {
  const { setCurrentView, showToast, news } = useAcademic();
  
  // Selected modal state
  const [selectedNews, setSelectedNews] = useState<CampusNews | null>(null);
  const [showLiveStreamModal, setShowLiveStreamModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(1); // February 2026

  const monthNames = ['Januari 2026', 'Februari 2026', 'Maret 2026'];

  return (
    <div className="flex flex-col w-full relative bg-[#070b12] text-[#f8fafc]">
      {/* SECTION 1: HERO VIEW */}
      <section className="relative w-full overflow-hidden min-h-[680px] lg:min-h-[760px] flex flex-col justify-between">
        {/* Cinematic Campus Background with Dark Gradient Scrim */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/src/assets/images/campus_gothic_dusk_1791899252124.jpg')`
          }}
        >
          {/* Deep gradient overlay for contrast and dark luxury feel */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070b12]/80 via-[#070b12]/65 to-[#070b12]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-transparent to-black/40" />
        </div>

        {/* Hero Header & Crest Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 flex flex-col items-center text-center">
          {/* University Crest Badge */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-700 via-blue-900 to-slate-900 p-2 shadow-2xl ring-2 ring-blue-500/40 flex items-center justify-center mb-4 backdrop-blur-md">
            <GraduationCap className="w-12 h-12 text-blue-200" />
          </div>

          <span className="text-xs sm:text-sm tracking-[0.25em] text-blue-400 uppercase font-bold">
            EST. 1965 • STATE INSTITUTE
          </span>

          <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white mt-2 tracking-tight drop-shadow-xl max-w-3xl">
            Nusantara Institute
          </h1>

          <p className="text-xs sm:text-sm tracking-[0.22em] text-blue-300 uppercase mt-2 font-medium opacity-90">
            The Character of Excellence
          </p>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Pusat keunggulan sains komputasi, kecerdasan buatan terapan, dan riset maritim masa depan yang memadukan kehormatan tradisi intelektual dengan inovasi global.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8 w-full max-w-md">
            <button
              onClick={() => setCurrentView('login')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm tracking-wide shadow-[0_8px_24px_rgba(37,99,235,0.45)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.6)] active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              <span>MASUK PORTAL AKADEMIK</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            <button
              onClick={() => setShowRegistrationModal(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-slate-200 font-semibold text-sm border border-white/15 backdrop-blur-md transition-all active:scale-95 text-center"
            >
              Pendaftaran Mahasiswa Baru
            </button>
          </div>
        </div>

        {/* Hero 3 Feature Cards (Quick Access) */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Card 1: Beasiswa Unggulan */}
            <div 
              onClick={() => showToast('Informasi Beasiswa: Menanggung 100% biaya studi & tunjangan riset bulanan.', 'info')}
              className="bg-[#0e1626]/80 hover:bg-[#131f36]/90 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-lg flex items-center justify-between cursor-pointer transition-all hover:-translate-y-0.5 active:scale-98 group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/30 transition-colors">
                  <School className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                      BEASISWA UNGGULAN
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <span className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    Bantuan riset & pendidikan penuh jenjang S1/S2/S3.
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Kampus & Fasilitas */}
            <div 
              onClick={() => showToast('Fasilitas: Gedung Rektorat Klasik, Superkomputer AI cluster, & Lab Satelit.', 'info')}
              className="bg-[#0e1626]/80 hover:bg-[#131f36]/90 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-lg flex items-center justify-between cursor-pointer transition-all hover:-translate-y-0.5 active:scale-98 group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/30 transition-colors">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                      KAMPUS & FASILITAS
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <span className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    Laboratorium AI superkomputer & perpustakaan pusat.
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Program Studi */}
            <div 
              onClick={() => showToast('Program Studi: 14 Jurusan Terakreditasi Unggul Internasional.', 'info')}
              className="bg-[#0e1626]/80 hover:bg-[#131f36]/90 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-lg flex items-center justify-between cursor-pointer transition-all hover:-translate-y-0.5 active:scale-98 group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/30 transition-colors">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                      PROGRAM STUDI
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <span className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    14 Fakultas teknik mutakhir & rekayasa biosains.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PROFIL INSTITUSI & SAMBUTAN AKADEMIK */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Top/Left Column: Institution Profile */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              AKREDITASI UNGGUL INTERNASIONAL
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Nusantara Institute of Technology
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Berdiri sebagai pelopor sains maritim dan rekayasa kecerdasan komputasi nasional, Nusantara Institute of Technology memadukan kemegahan tradisi intelektual klasik dengan riset masa depan yang berdampak bagi peradaban dunia.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              Melalui kurikulum terintegrasi, fakultas kelas dunia, dan kemitraan strategis dengan industri teknologi multinasional, NIT mencetak para sarjana, insinyur, dan ilmuwan yang siap memimpin transformasi era otonom.
            </p>

            {/* Stats Micro-row */}
            <div className="grid grid-cols-3 gap-3 pt-3 bg-[#0d1424] rounded-2xl p-4 border border-white/[0.08] text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-400 font-serif-display">
                  #1
                </div>
                <div className="text-xs text-slate-400 mt-1">Riset Nasional</div>
              </div>
              <div className="border-x border-white/10 px-2">
                <div className="text-2xl sm:text-3xl font-bold text-white font-serif-display">
                  18:1
                </div>
                <div className="text-xs text-slate-400 mt-1">Rasio Dosen</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-serif-display">
                  96%
                </div>
                <div className="text-xs text-slate-400 mt-1">Karier Lulusan</div>
              </div>
            </div>
          </div>

          {/* Right Column: Academic Portrait Card (Graduate Spotlight) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden bg-[#0d1424] border border-white/10 shadow-2xl group">
              <div className="relative w-full h-[400px] sm:h-[460px]">
                <img
                  src="/src/assets/images/graduate_spotlight_1791899282040.jpg"
                  alt="Wisudawan Terbaik Nusantara Institute of Technology"
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
                />
                {/* Contrast Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-[#070b12]/40 to-transparent" />

                {/* Information Overlay */}
                <div className="absolute bottom-5 left-5 right-5 space-y-1">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider mb-1 shadow-md">
                    Wisudawan Terbaik 2025
                  </span>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-white">
                    Adinda Larasati, B.Eng.
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-300">
                    Penerima Fellowship Quantum Engineering NIT • Tim Peneliti Satelit Merah Putih
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: BERITA & INFORMASI KAMPUS */}
      <section id="section-news" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_12px_#3b82f6]" />
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
              Berita & Informasi Kampus
            </h2>
          </div>
          <span className="text-xs font-semibold text-blue-400 tracking-wider uppercase">
            COMMUNICATION CENTER
          </span>
        </div>

        <p className="text-sm text-slate-400 mb-8 max-w-2xl">
          Liputan agenda akademik terintegrasi, hibah riset internasional, dan info penerimaan semester baru.
        </p>

        <div className="space-y-4">
          {/* News 1: Main Story with Dark Visual Card */}
          {news[0] && (
            <div 
              onClick={() => setSelectedNews(news[0])}
              className="relative rounded-3xl overflow-hidden bg-[#0d1424] border border-white/10 shadow-2xl cursor-pointer group"
            >
              <div 
                className="relative w-full h-72 sm:h-96 bg-cover bg-center transition-transform duration-500 group-hover:scale-101"
                style={{ backgroundImage: `url('${news[0].image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-[#070b12]/60 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-md bg-red-600/90 text-white text-xs font-bold tracking-wider uppercase shadow-md">
                    {news[0].tag}
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="max-w-xl">
                    <h3 className="font-serif-display text-xl sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-md">
                      {news[0].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 line-clamp-2">
                      {news[0].summary}
                    </p>
                    <span className="inline-block text-xs text-blue-300 mt-2">
                      {news[0].location} · {news[0].date}
                    </span>
                  </div>

                  <button className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg active:scale-95 transition-all shrink-0">
                    <span>BACA BERITA</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2-Column Split News Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {news.slice(1, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedNews(item)}
                className="relative rounded-2xl overflow-hidden bg-[#0d1424] border border-white/10 shadow-lg p-5 h-64 flex flex-col justify-between cursor-pointer group bg-cover bg-center"
                style={{ backgroundImage: `url('${item.image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-[#070b12]/75 to-[#070b12]/40" />

                <div className="relative z-10">
                  <span className="px-2.5 py-1 rounded bg-white/15 backdrop-blur-md text-blue-300 text-[11px] font-bold">
                    {item.tag}
                  </span>
                </div>

                <div className="relative z-10">
                  <h4 className="font-serif-display text-lg sm:text-xl font-bold text-white line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    {item.summary}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">{item.date}</span>
                    <button className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center gap-1 shadow group-hover:bg-blue-500 transition-colors">
                      <span>BACA</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Registration Announcement Card (High Contrast Cobalt Blue Variant) */}
          <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />

            <div className="max-w-xl space-y-2 relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                INFO REGISTRASI • SEMESTER GENAP 2025/2026
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
                Pengisian KRS & Registrasi Akademik Dibuka
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                Batas pengajuan bimbingan dosen wali hingga 28 Februari 2026 melalui Single Sign-On NIT. Pastikan beban SKS telah disetujui dosen pembimbing akademik.
              </p>
            </div>

            <div className="flex items-center gap-4 relative z-10 shrink-0">
              <button
                onClick={() => setCurrentView('login')}
                className="py-3 px-6 rounded-full bg-white text-blue-700 font-bold text-xs uppercase tracking-wider shadow-xl hover:bg-blue-50 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>DAFTAR SEKARANG</span>
                <span className="w-5 h-5 rounded-full bg-blue-700/10 flex items-center justify-center text-blue-700">
                  <ArrowRight className="w-3 h-3" />
                </span>
              </button>
              <CheckCircle2 className="w-8 h-8 text-blue-200 hidden sm:block" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: KALENDER AKADEMIK & LIVE STREAM WIDGET */}
      <section id="section-calendar" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {/* Mini Live Stream Notification Bar */}
        <div className="mb-6 p-4 rounded-2xl bg-[#0e1628] border border-white/10 flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center flex-shrink-0 animate-pulse">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                NIT Live Stream Hub
              </span>
              <span className="text-xs text-slate-400">
                Kuliah Umum Tamu: Prof. Dr. K. Hartono — "Arsitektur Kuantum Masa Depan"
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowLiveStreamModal(true)}
            className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-md transition-all active:scale-95"
            title="Tonton Siaran Langsung"
          >
            <Play className="w-4 h-4 ml-0.5" />
          </button>
        </div>

        {/* Academic Calendar Widget */}
        <div className="bg-[#0d1424] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
          {/* Calendar Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span className="font-serif-display text-lg sm:text-xl font-bold text-white">
                {monthNames[currentMonthIndex]}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentMonthIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentMonthIndex === 0}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-40 flex items-center justify-center transition-colors"
                title="Bulan Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentMonthIndex((prev) => Math.min(2, prev + 1))}
                disabled={currentMonthIndex === 2}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-40 flex items-center justify-center transition-colors"
                title="Bulan Berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400 my-4 uppercase tracking-wider">
            <span>MIN</span>
            <span>SEN</span>
            <span>SEL</span>
            <span>RAB</span>
            <span>KAM</span>
            <span>JUM</span>
            <span>SAB</span>
          </div>

          {/* Calendar Dates Matrix for Feb 2026 */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs sm:text-sm font-medium">
            {/* Prev month days */}
            <span className="text-slate-600 py-2">25</span>
            <span className="text-slate-600 py-2">26</span>
            <span className="text-slate-600 py-2">27</span>
            <span className="text-slate-600 py-2">28</span>
            <span className="text-slate-600 py-2">29</span>
            <span className="text-slate-600 py-2">30</span>
            <span className="text-slate-600 py-2">31</span>

            {/* Current month */}
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">1</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">2</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">3</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">4</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">5</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">6</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">7</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">8</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">9</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">10</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">11</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">12</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">13</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">14</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">15</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">16</span>

            {/* Active Agenda Day: 17 Feb */}
            <span 
              onClick={() => showToast('17 Februari: Batas Unggah Proposal Skripsi & Tesis.', 'info')}
              className="py-2 rounded-full bg-blue-600 text-white font-bold shadow-[0_0_12px_rgba(37,99,235,0.6)] cursor-pointer"
            >
              17
            </span>

            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">18</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">19</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">20</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">21</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">22</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">23</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">24</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">25</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">26</span>
            <span className="text-slate-200 py-2 hover:bg-white/5 rounded-full cursor-pointer">27</span>

            {/* Deadline Day: 28 Feb */}
            <span 
              onClick={() => showToast('28 Februari: Batas Pengisian KRS & Registrasi Akademik.', 'warning')}
              className="py-2 rounded-full bg-cyan-600 text-white font-bold shadow-[0_0_12px_rgba(8,145,178,0.6)] cursor-pointer"
            >
              28
            </span>
          </div>

          {/* Upcoming Agenda Highlights */}
          <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0" />
              <div>
                <span className="font-bold text-white block">17 Februari 2026:</span>
                <span className="text-slate-400">Batas Unggah Proposal Skripsi & Tesis</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 flex-shrink-0" />
              <div>
                <span className="font-bold text-white block">28 Februari 2026:</span>
                <span className="text-slate-400">Penutupan KRS Semester Genap NIT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL: DETAIL BERITA */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl bg-[#0f172a] border border-white/10 shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <img
              src={selectedNews.image}
              alt={selectedNews.title}
              className="w-full h-56 object-cover rounded-2xl mb-4"
            />

            <span className="px-2.5 py-1 rounded bg-blue-600 text-white text-[10px] font-bold uppercase">
              {selectedNews.tag}
            </span>

            <h3 className="font-serif-display text-2xl font-bold text-white mt-2">
              {selectedNews.title}
            </h3>

            <p className="text-xs text-blue-300 mt-1">
              {selectedNews.location} · {selectedNews.date}
            </p>

            <div className="mt-4 pt-4 border-t border-white/10 text-sm text-slate-300 space-y-3 leading-relaxed">
              <p>{selectedNews.summary}</p>
              <p>
                Riset kolaboratif ini melibatkan fakultas terkemuka NIT dan mitra institusi global guna menghadirkan solusi teknologi mutakhir berstandar industri internasional. Seluruh data penelitian terdokumentasi secara terbuka untuk civitas akademika NIT.
              </p>
            </div>

            <button
              onClick={() => setSelectedNews(null)}
              className="w-full mt-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors"
            >
              Tutup Berita
            </button>
          </div>
        </div>
      )}

      {/* MODAL: LIVE STREAM HUB */}
      {showLiveStreamModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-[#0f172a] border border-white/10 shadow-2xl p-6 relative">
            <button
              onClick={() => setShowLiveStreamModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">SIARAN LANGSUNG KULIAH UMUM</span>
            </div>

            <div className="w-full h-56 rounded-2xl bg-black border border-white/10 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-950/30" />
              <Play className="w-12 h-12 text-blue-400 mb-2 relative z-10 animate-bounce" />
              <p className="text-sm font-bold text-white relative z-10">Prof. Dr. K. Hartono</p>
              <p className="text-xs text-slate-400 relative z-10">"Arsitektur Kuantum & Rekayasa Komputasi Maritim 2026"</p>
              <span className="mt-3 text-[11px] text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full relative z-10">
                1,240 Mahasiswa Menonton
              </span>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  setShowLiveStreamModal(false);
                  showToast('Menghubungkan ke server stream video NIT...', 'info');
                }}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-all"
              >
                Putar di Pemutar Penuh
              </button>
              <button
                onClick={() => setShowLiveStreamModal(false)}
                className="px-4 py-2.5 rounded-xl bg-white/10 text-slate-300 font-semibold text-xs hover:bg-white/15"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PENDAFTARAN MAHASISWA BARU */}
      {showRegistrationModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0f172a] border border-white/10 shadow-2xl p-6 relative">
            <button
              onClick={() => setShowRegistrationModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Admisi Mahasiswa Baru 2026/2027</h3>
                <p className="text-xs text-blue-400">Jalur Prestasi Riset & Beasiswa Unggulan</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="font-semibold text-white">Syarat Berkas Pendaftaran:</p>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-slate-400">
                  <li>Nilai Rapor SMA/SMK Semester 1-5 rata-rata minimal 85</li>
                  <li>Portofolio karya riset / proyek teknologi (opsional)</li>
                  <li>Surat rekomendasi kepala sekolah</li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="font-semibold text-white">Jadwal Seleksi Gelombang II:</p>
                <p className="text-slate-400 mt-1">Pendaftaran: 1 Okt - 15 Nov 2026</p>
                <p className="text-slate-400">Tes Kemampuan Skolastik: 22 Nov 2026</p>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => {
                  setShowRegistrationModal(false);
                  setCurrentView('login');
                }}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
              >
                Masuk ke Portal Pendaftar
              </button>
              <button
                onClick={() => setShowRegistrationModal(false)}
                className="px-4 py-2.5 rounded-xl bg-white/10 text-slate-300 font-semibold text-xs hover:bg-white/15"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
