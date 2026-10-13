import React from 'react';
import { GraduationCap, Globe, Mail, Phone, MapPin, Shield } from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

export const Footer: React.FC = () => {
  const { setCurrentView, showToast } = useAcademic();

  return (
    <footer className="relative bg-[#05080e] border-t border-white/[0.08] pt-14 pb-16 overflow-hidden">
      {/* Mirror Bottom Hanging Bookmark Ribbon (Right Edge) */}
      <div 
        className="academic-ribbon-bottom bottom-0 right-8 h-20 hidden sm:flex flex-col justify-start items-center pt-2 pointer-events-none"
        title="Heritage Ribbon Motif"
      >
        <div className="w-2 h-2 rounded-full bg-white/70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Address Column (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-700 via-blue-900 to-slate-900 p-1 flex items-center justify-center ring-1 ring-blue-500/50 shadow-lg">
                <GraduationCap className="w-6 h-6 text-blue-200" />
              </div>
              <div>
                <h3 className="font-serif-display text-lg font-bold text-white tracking-tight">
                  Nusantara Institute of Technology
                </h3>
                <p className="text-[11px] font-semibold text-blue-400 uppercase tracking-widest">
                  Integritas, Riset & Peradaban
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Jl. Cendekia Sains Maritim No. 1, Kawasan Sains Terpadu Nusantara, Indonesia 14450.
            </p>

            <div className="pt-2 flex items-center gap-2.5">
              <button 
                onClick={() => showToast('Membuka portal resmi: nit.ac.id', 'info')}
                className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-blue-600/20 text-slate-400 hover:text-blue-300 ring-1 ring-white/10 flex items-center justify-center transition-all"
                title="Situs Resmi"
              >
                <Globe className="w-4 h-4" />
              </button>
              <button 
                onClick={() => showToast('Surel resmi: info@nusantara.ac.id', 'info')}
                className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-blue-600/20 text-slate-400 hover:text-blue-300 ring-1 ring-white/10 flex items-center justify-center transition-all"
                title="Surel Kampus"
              >
                <Mail className="w-4 h-4" />
              </button>
              <button 
                onClick={() => showToast('Layanan Informasi: (021) 789-9900', 'info')}
                className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-blue-600/20 text-slate-400 hover:text-blue-300 ring-1 ring-white/10 flex items-center justify-center transition-all"
                title="Telepon Rektorat"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button 
                onClick={() => showToast('Lokasi Kampus: Kawasan Riset Terpadu Nusantara', 'info')}
                className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-blue-600/20 text-slate-400 hover:text-blue-300 ring-1 ring-white/10 flex items-center justify-center transition-all"
                title="Peta Kampus"
              >
                <MapPin className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Column 2: Tautan Kampus */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Tautan Kampus
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => showToast('Pendaftaran Beasiswa Unggulan NIT dibuka tiap semester.', 'info')}
                  className="hover:text-blue-300 transition-colors"
                >
                  Admisi & Beasiswa
                </button>
              </li>
              <li>
                <button 
                  onClick={() => showToast('14 Fakultas Teknik & Riset Sains Komputasi.', 'info')}
                  className="hover:text-blue-300 transition-colors"
                >
                  Fakultas & Riset
                </button>
              </li>
              <li>
                <button 
                  onClick={() => showToast('Perpustakaan digital menyediakan akses 45.000 jurnal IEEE & ACM.', 'info')}
                  className="hover:text-blue-300 transition-colors"
                >
                  Perpustakaan Digital
                </button>
              </li>
              <li>
                <button 
                  onClick={() => showToast('Pusat Karir & Inkubator Startup Teknologi Nusantara.', 'info')}
                  className="hover:text-blue-300 transition-colors"
                >
                  Karir & Alumni
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Portal Mahasiswa */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Portal Akademik
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => setCurrentView('dashboard')}
                  className="hover:text-blue-300 transition-colors"
                >
                  Sistem Informasi Akademik
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('assignments')}
                  className="hover:text-blue-300 transition-colors"
                >
                  Tugas & Portofolio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('grades')}
                  className="hover:text-blue-300 transition-colors"
                >
                  Transkrip & KHS Digital
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('discussions')}
                  className="hover:text-blue-300 transition-colors"
                >
                  Forum Kolaborasi
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Keamanan & Akreditasi */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Keamanan Sistem
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-300">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Enkripsi SSL 256-Bit</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                Otentikasi terintegrasi Single Sign-On (SSO) multi-faktor memenuhi regulasi UU PDP No. 27/2022.
              </p>
              <div className="pt-1">
                <span className="inline-block px-2.5 py-1 rounded bg-blue-500/10 text-blue-300 text-[10px] font-bold">
                  Akreditasi Unggul Internasional
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Nusantara Institute of Technology. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hover:text-slate-400 cursor-pointer">Kebijakan Privasi</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Syarat & Ketentuan Layanan</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Status Server (99.98% Uptime)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
