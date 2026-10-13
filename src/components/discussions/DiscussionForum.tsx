import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Pin, 
  Send, 
  Trash2, 
  User, 
  X, 
  CheckCircle2,
  Calendar,
  Filter
} from 'lucide-react';
import { DiscussionTopic } from '../../types';

export const DiscussionForum: React.FC = () => {
  const { 
    currentUser, 
    courses, 
    discussions, 
    createTopic, 
    replyTopic, 
    togglePinTopic, 
    deleteTopic, 
    showToast 
  } = useAcademic();

  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [newTopicModalOpen, setNewTopicModalOpen] = useState(false);

  // New topic state
  const [newTopicData, setNewTopicData] = useState({
    courseId: courses[0]?.id || '',
    title: '',
    content: '',
  });

  // Reply inputs keyed by topicId
  const [replyInputs, setReplyInputs] = useState<{ [topicId: string]: string }>({});

  const filteredTopics = discussions.filter((t) => {
    const matchesCourse = courseFilter === 'all' || t.courseId === courseFilter;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.authorName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCourse && matchesSearch;
  });

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicData.title.trim() || !newTopicData.content.trim()) return;

    createTopic(newTopicData.courseId, newTopicData.title, newTopicData.content);
    setNewTopicData({
      courseId: courses[0]?.id || '',
      title: '',
      content: '',
    });
    setNewTopicModalOpen(false);
  };

  const handleSendReply = (topicId: string) => {
    const content = replyInputs[topicId]?.trim();
    if (!content) return;

    replyTopic(topicId, content);
    setReplyInputs((prev) => ({ ...prev, [topicId]: '' }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
            <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
              Forum Kolaborasi & Diskusi Kuliah
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Ruang interaksi akademik terbuka antara mahasiswa, dosen pengampu, dan asisten laboratorium.
          </p>
        </div>

        <button
          onClick={() => setNewTopicModalOpen(true)}
          className="px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Topik Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul diskusi, materi, atau nama penanya..."
            className="w-full bg-[#0e1628] border border-white/10 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="w-full bg-[#0e1628] border border-white/10 rounded-2xl py-2.5 px-3 text-xs text-white focus:outline-none"
          >
            <option value="all">Semua Mata Kuliah ({courses.length})</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code} - {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Discussion Threads */}
      <div className="space-y-4">
        {filteredTopics.map((topic) => {
          const isAuthorOrPrivileged =
            currentUser?.id === topic.authorId ||
            currentUser?.role === 'lecturer' ||
            currentUser?.role === 'admin';

          return (
            <div
              key={topic.id}
              className={`rounded-3xl bg-[#0e1628] border p-6 shadow-xl space-y-4 transition-all ${
                topic.isPinned ? 'border-blue-500/50 bg-[#0d172e]' : 'border-white/10'
              }`}
            >
              {/* Thread Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <img
                    src={topic.authorAvatar}
                    alt={topic.authorName}
                    className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/10 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-white text-sm">
                        {topic.authorName}
                      </span>
                      <span className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase ${
                        topic.authorRole === 'student' ? 'bg-blue-600/20 text-blue-300' :
                        topic.authorRole === 'lecturer' ? 'bg-cyan-600/20 text-cyan-300' :
                        'bg-purple-600/20 text-purple-300'
                      }`}>
                        {topic.authorRole === 'student' ? 'Mahasiswa' : topic.authorRole === 'lecturer' ? 'Dosen' : 'Admin'}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {new Date(topic.createdAt).toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded bg-blue-600/20 text-blue-300 text-[10px] font-bold font-mono">
                        {topic.courseCode}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {topic.courseName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pin & Delete Controls */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {topic.isPinned && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-400 text-[10px] font-bold flex items-center gap-1">
                      <Pin className="w-3 h-3" />
                      Disematkan
                    </span>
                  )}

                  {(currentUser?.role === 'lecturer' || currentUser?.role === 'admin') && (
                    <button
                      onClick={() => togglePinTopic(topic.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        topic.isPinned
                          ? 'text-blue-400 bg-blue-500/10'
                          : 'text-slate-400 hover:text-white bg-white/5'
                      }`}
                      title="Sematkan Topik"
                    >
                      <Pin className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {isAuthorOrPrivileged && (
                    <button
                      onClick={() => deleteTopic(topic.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 transition-colors"
                      title="Hapus Topik"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Thread Content */}
              <div>
                <h3 className="font-serif-display text-lg font-bold text-white leading-snug">
                  {topic.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed whitespace-pre-line">
                  {topic.content}
                </p>
              </div>

              {/* Replies Container */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold uppercase tracking-wider text-white">
                    Tanggapan & Diskusi ({topic.replies.length})
                  </span>
                </div>

                {/* Reply Items */}
                {topic.replies.length > 0 && (
                  <div className="space-y-2.5">
                    {topic.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="p-3.5 rounded-2xl bg-black/30 border border-white/5 space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-xs">
                              {reply.authorName}
                            </span>
                            <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                              reply.authorRole === 'student' ? 'bg-blue-600/20 text-blue-300' :
                              reply.authorRole === 'lecturer' ? 'bg-cyan-600/20 text-cyan-300' :
                              'bg-purple-600/20 text-purple-300'
                            }`}>
                              {reply.authorRole}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-500">
                            {new Date(reply.createdAt).toLocaleTimeString('id-ID', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })} WIB
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {reply.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Write Reply Box */}
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={replyInputs[topic.id] || ''}
                    onChange={(e) =>
                      setReplyInputs({ ...replyInputs, [topic.id]: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendReply(topic.id);
                    }}
                    placeholder={`Ketik balasan atas nama ${currentUser?.name || 'Pengguna'}...`}
                    className="flex-1 bg-[#070b14] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleSendReply(topic.id)}
                    className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredTopics.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-[#0e1628] border border-white/10 space-y-2">
            <MessageSquare className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">Belum ada diskusi untuk kategori ini.</p>
            <p className="text-xs text-slate-500">Mulai diskusi pertama dengan mengklik tombol "Buat Topik Baru".</p>
          </div>
        )}
      </div>

      {/* MODAL: CREATE TOPIC */}
      {newTopicModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-[#0f172a] border border-white/10 shadow-2xl p-6 relative">
            <button
              onClick={() => setNewTopicModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif-display text-xl font-bold text-white">
              Buat Topik Diskusi Baru
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Bagikan pertanyaan teknis, materi praktikum, atau ide riset kolaboratif.
            </p>

            <form onSubmit={handleCreateTopic} className="mt-4 space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Pilih Mata Kuliah</label>
                <select
                  value={newTopicData.courseId}
                  onChange={(e) =>
                    setNewTopicData({ ...newTopicData, courseId: e.target.value })
                  }
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
                <label className="text-slate-300 font-semibold">Judul Topik Diskusi</label>
                <input
                  type="text"
                  value={newTopicData.title}
                  onChange={(e) =>
                    setNewTopicData({ ...newTopicData, title: e.target.value })
                  }
                  required
                  placeholder="Contoh: Analisis Kinerja Algoritma Crossover pada TSP"
                  className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Uraian Pertanyaan / Materi</label>
                <textarea
                  value={newTopicData.content}
                  onChange={(e) =>
                    setNewTopicData({ ...newTopicData, content: e.target.value })
                  }
                  required
                  rows={4}
                  placeholder="Jelaskan kendala teknis, baris kode terkait, atau pertanyaan konseptual secara terperinci..."
                  className="w-full bg-[#070b14] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewTopicModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-slate-300 font-semibold hover:bg-white/15"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md"
                >
                  Publikasikan Topik
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
