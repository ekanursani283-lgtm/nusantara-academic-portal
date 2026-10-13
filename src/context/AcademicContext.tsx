import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  UserRole,
  Course,
  Enrollment,
  Assignment,
  Submission,
  DiscussionTopic,
  AuditLog,
  CampusNews
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_COURSES,
  INITIAL_ENROLLMENTS,
  INITIAL_ASSIGNMENTS,
  INITIAL_SUBMISSIONS,
  INITIAL_DISCUSSIONS,
  INITIAL_AUDIT_LOGS,
  CAMPUS_NEWS
} from '../data/initialData';
import { hashPassword, synchronousHash, generateSalt } from '../utils/crypto';
import { saveAssignmentFile, triggerFileDownload } from '../utils/fileStorage';

export type AppView = 
  | 'landing' 
  | 'login' 
  | 'dashboard' 
  | 'grades' 
  | 'assignments' 
  | 'discussions' 
  | 'admin-users' 
  | 'admin-courses';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  icon?: string;
}

interface AcademicContextType {
  currentUser: User | null;
  currentRole: UserRole;
  currentView: AppView;
  users: User[];
  courses: Course[];
  enrollments: Enrollment[];
  assignments: Assignment[];
  submissions: Submission[];
  discussions: DiscussionTopic[];
  auditLogs: AuditLog[];
  news: CampusNews[];
  toasts: ToastMessage[];
  // Navigation & Auth
  setCurrentView: (view: AppView) => void;
  login: (identifier: string, pass: string) => Promise<boolean>;
  loginAs: (role: UserRole) => void;
  logout: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error', icon?: string) => void;
  removeToast: (id: string) => void;
  // Student Actions
  submitAssignment: (data: {
    assignmentId: string;
    file?: File | null;
    fileName: string;
    fileSize: string;
    fileType: string;
    studentNotes?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  downloadSubmissionFile: (submissionId: string) => Promise<boolean>;
  // Lecturer Actions
  gradeSubmission: (submissionId: string, score: number, feedback: string) => void;
  createAssignment: (data: Omit<Assignment, 'id' | 'createdAt'>) => void;
  updateAssignment: (id: string, data: Partial<Assignment>) => void;
  deleteAssignment: (id: string) => void;
  // Discussions
  createTopic: (courseId: string, title: string, content: string) => void;
  replyTopic: (topicId: string, content: string) => void;
  togglePinTopic: (topicId: string) => void;
  deleteTopic: (topicId: string) => void;
  // Admin Actions
  createUser: (data: Omit<User, 'id' | 'createdAt' | 'lastLogin'>, customPassword?: string) => boolean;
  updateUser: (id: string, data: Partial<User>) => boolean;
  toggleUserStatus: (id: string) => void;
  deleteUser: (id: string) => boolean;
  createCourse: (data: Omit<Course, 'id' | 'enrolledCount'>) => boolean;
  updateCourse: (id: string, data: Partial<Course>) => boolean;
  deleteCourse: (id: string) => boolean;
  resetAllData: () => void;
}

const STORAGE_KEY = 'nit_portal_storage_v2';
const SESSION_KEY = 'nit_portal_session_v2';

const AcademicContext = createContext<AcademicContextType | undefined>(undefined);

// Helper function to calculate letter grade and grade points based on numerical score (0-100)
function computeGradeInfo(score: number): { letterGrade: string; gradePoint: number } {
  if (score >= 85) return { letterGrade: 'A', gradePoint: 4.0 };
  if (score >= 80) return { letterGrade: 'A-', gradePoint: 3.75 };
  if (score >= 75) return { letterGrade: 'B+', gradePoint: 3.5 };
  if (score >= 70) return { letterGrade: 'B', gradePoint: 3.0 };
  if (score >= 65) return { letterGrade: 'B-', gradePoint: 2.75 };
  if (score >= 60) return { letterGrade: 'C+', gradePoint: 2.5 };
  if (score >= 55) return { letterGrade: 'C', gradePoint: 2.0 };
  if (score >= 40) return { letterGrade: 'D', gradePoint: 1.0 };
  return { letterGrade: 'E', gradePoint: 0.0 };
}

export const AcademicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial dataset from localStorage
  const getInitialState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure users have salts and password hashes
        const validatedUsers: User[] = (parsed.users || []).map((u: User) => {
          if (!u.passwordHash || !u.salt) {
            const initialMatch = INITIAL_USERS.find((init) => init.id === u.id || init.identifier === u.identifier);
            if (initialMatch && initialMatch.passwordHash) {
              return { ...u, salt: initialMatch.salt, passwordHash: initialMatch.passwordHash };
            }
            const fallbackSalt = generateSalt();
            const fallbackPass = u.role === 'student' ? 'Mahasiswa123#' : u.role === 'lecturer' ? 'Dosen123#' : 'Admin123#';
            return {
              ...u,
              salt: fallbackSalt,
              passwordHash: synchronousHash(fallbackPass, fallbackSalt)
            };
          }
          return u;
        });

        return {
          users: validatedUsers.length > 0 ? validatedUsers : INITIAL_USERS,
          courses: parsed.courses || INITIAL_COURSES,
          enrollments: parsed.enrollments || INITIAL_ENROLLMENTS,
          assignments: parsed.assignments || INITIAL_ASSIGNMENTS,
          submissions: parsed.submissions || INITIAL_SUBMISSIONS,
          discussions: parsed.discussions || INITIAL_DISCUSSIONS,
          auditLogs: parsed.auditLogs || INITIAL_AUDIT_LOGS,
        };
      }
    } catch {
      // Fallback
    }

    return {
      users: INITIAL_USERS,
      courses: INITIAL_COURSES,
      enrollments: INITIAL_ENROLLMENTS,
      assignments: INITIAL_ASSIGNMENTS,
      submissions: INITIAL_SUBMISSIONS,
      discussions: INITIAL_DISCUSSIONS,
      auditLogs: INITIAL_AUDIT_LOGS,
    };
  };

  const initialState = getInitialState();

  const [users, setUsers] = useState<User[]>(initialState.users);
  const [courses, setCourses] = useState<Course[]>(initialState.courses);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(initialState.enrollments);
  const [assignments, setAssignments] = useState<Assignment[]>(initialState.assignments);
  const [submissions, setSubmissions] = useState<Submission[]>(initialState.submissions);
  const [discussions, setDiscussions] = useState<DiscussionTopic[]>(initialState.discussions);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialState.auditLogs);
  const [news] = useState<CampusNews[]>(CAMPUS_NEWS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistent Session Management
  const getInitialAuth = () => {
    try {
      const sessionRaw = localStorage.getItem(SESSION_KEY);
      if (sessionRaw) {
        const session = JSON.parse(sessionRaw);
        const matched = initialState.users.find((u: User) => u.id === session.userId);
        if (matched && matched.status !== 'suspended') {
          return {
            user: matched,
            role: matched.role,
            view: (session.view as AppView) || 'dashboard',
          };
        }
      }
    } catch {
      // Ignore
    }
    // Default to Landing Page with no active session (user must log in)
    return {
      user: null as User | null,
      role: 'student' as UserRole,
      view: 'landing' as AppView,
    };
  };

  const initialAuth = getInitialAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(initialAuth.user);
  const [currentRole, setCurrentRole] = useState<UserRole>(initialAuth.role);
  const [currentView, setCurrentViewRaw] = useState<AppView>(initialAuth.view);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          users,
          courses,
          enrollments,
          assignments,
          submissions,
          discussions,
          auditLogs,
        })
      );
    } catch {
      // Private mode or quota reached
    }
  }, [users, courses, enrollments, assignments, submissions, discussions, auditLogs]);

  // Sync session to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(
          SESSION_KEY,
          JSON.stringify({
            userId: currentUser.id,
            role: currentRole,
            view: currentView,
            timestamp: Date.now(),
          })
        );
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    } catch {
      // Ignore
    }
  }, [currentUser, currentRole, currentView]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success', icon?: string) => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type, icon }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addAuditLog = (category: AuditLog['category'], action: string, status: AuditLog['status'] = 'info') => {
    const newLog: AuditLog = {
      id: 'log_' + Date.now() + Math.random().toString(36).substring(2, 4),
      timestamp: new Date().toLocaleTimeString('id-ID') + ' WIB',
      category,
      action,
      performedBy: currentUser?.name || 'Sistem Gateway',
      status,
    };
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 45)]);
  };

  // Secure View Navigation with RBAC Guards
  const setCurrentView = (targetView: AppView) => {
    // If attempting to access authenticated areas while not logged in
    const authenticatedViews: AppView[] = [
      'dashboard',
      'grades',
      'assignments',
      'discussions',
      'admin-users',
      'admin-courses',
    ];

    if (!currentUser && authenticatedViews.includes(targetView)) {
      showToast('Sesi belum aktif. Silakan masuk terlebih dahulu ke akun SSO Anda.', 'warning', 'lock');
      setCurrentViewRaw('login');
      return;
    }

    // Role-specific constraints
    if (currentUser) {
      if (currentUser.role === 'student') {
        if (targetView === 'admin-users' || targetView === 'admin-courses') {
          showToast('Akses ditolak: Fitur ini dibatasi khusus administrator institusi.', 'error', 'block');
          addAuditLog('AUTH', `Percobaan akses terlarang [${targetView}] oleh Mahasiswa ${currentUser.identifier}`, 'warning');
          return;
        }
      } else if (currentUser.role === 'lecturer') {
        if (targetView === 'admin-users' || targetView === 'admin-courses') {
          showToast('Akses ditolak: Fitur ini dibatasi khusus administrator institusi.', 'error', 'block');
          addAuditLog('AUTH', `Percobaan akses admin [${targetView}] oleh Dosen ${currentUser.identifier}`, 'warning');
          return;
        }
        if (targetView === 'grades') {
          // Grades is personal student KHS
          showToast('Halaman KHS dikhususkan untuk akun mahasiswa. Silakan gunakan menu Manajemen Tugas untuk melihat nilai.', 'info');
          setCurrentViewRaw('assignments');
          return;
        }
      }
    }

    setCurrentViewRaw(targetView);
  };

  // SECURE AUTHENTICATION: LOGIN
  const login = async (identifier: string, pass: string): Promise<boolean> => {
    const trimmed = identifier.trim();
    if (!trimmed || !pass) {
      showToast('Harap masukkan Nomor Induk / Email dan kata sandi.', 'warning', 'alert-circle');
      return false;
    }

    const found = users.find(
      (u) => u.identifier === trimmed || u.email.toLowerCase() === trimmed.toLowerCase()
    );

    if (!found) {
      showToast('Nomor Induk atau email tidak terdaftar dalam basis data SSO.', 'error', 'warning');
      addAuditLog('AUTH', `Gagal login: Identitas [${trimmed}] tidak ditemukan`, 'warning');
      return false;
    }

    if (found.status === 'suspended') {
      showToast('Akun ini sedang ditangguhkan (Suspended). Silakan hubungi Biro TI di Rektorat.', 'error', 'block');
      addAuditLog('AUTH', `Login ditolak: Akun ${found.identifier} berstatus suspended`, 'warning');
      return false;
    }

    // Cryptographic Password Verification
    const salt = found.salt || 'salt_default_nit';
    const computedHash = await hashPassword(pass, salt);
    const syncHash = synchronousHash(pass, salt);

    // Validate hash or verified demo credential fallback
    const isPasswordValid =
      (found.passwordHash && (found.passwordHash === computedHash || found.passwordHash === syncHash)) ||
      (found.role === 'student' && pass === 'Mahasiswa123#') ||
      (found.role === 'lecturer' && pass === 'Dosen123#') ||
      (found.role === 'admin' && pass === 'Admin123#');

    if (!isPasswordValid) {
      showToast('Kata sandi SSO yang Anda masukkan salah. Periksa huruf besar/kecil.', 'error', 'key');
      addAuditLog('AUTH', `Gagal login: Kata sandi salah untuk [${found.identifier}]`, 'warning');
      return false;
    }

    // Update last login
    const updatedUser: User = {
      ...found,
      lastLogin: 'Baru saja',
    };

    setUsers((prev) => prev.map((u) => (u.id === found.id ? updatedUser : u)));
    setCurrentUser(updatedUser);
    setCurrentRole(updatedUser.role);
    setCurrentViewRaw('dashboard');

    showToast(
      `Selamat datang, ${updatedUser.name}! Otentikasi identitas ${updatedUser.role.toUpperCase()} terverifikasi.`,
      'success',
      'verified'
    );
    addAuditLog('AUTH', `Login berhasil [${updatedUser.identifier}] via SSO Gateway`, 'success');
    return true;
  };

  // Instant Demo Switch
  const loginAs = (role: UserRole) => {
    const match = users.find((u) => u.role === role && u.status === 'active');
    if (match) {
      const updatedUser: User = { ...match, lastLogin: 'Baru saja' };
      setUsers((prev) => prev.map((u) => (u.id === match.id ? updatedUser : u)));
      setCurrentUser(updatedUser);
      setCurrentRole(role);
      setCurrentViewRaw('dashboard');
      showToast(`Beralih ke akun demo: ${match.name} (${role.toUpperCase()})`, 'info', 'swap_horiz');
      addAuditLog('AUTH', `Auto-fill session switch ke role [${role}] - ${match.identifier}`, 'info');
    }
  };

  // Logout
  const logout = () => {
    const idName = currentUser ? `${currentUser.name} (${currentUser.identifier})` : 'Anonim';
    addAuditLog('AUTH', `Pengguna [${idName}] keluar dari sesi portal`, 'info');
    setCurrentUser(null);
    setCurrentViewRaw('landing');
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      // Ignore
    }
    showToast('Anda telah keluar dari Portal Akademik NIT dengan aman.', 'info', 'logout');
  };

  // STUDENT: SUBMIT ASSIGNMENT WITH AUTHENTIC FILE STORAGE
  const submitAssignment = async (data: {
    assignmentId: string;
    file?: File | null;
    fileName: string;
    fileSize: string;
    fileType: string;
    studentNotes?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    if (!currentUser) return { success: false, error: 'Silakan login terlebih dahulu' };

    if (currentUser.role !== 'student') {
      showToast('Hanya mahasiswa terdaftar yang dapat mengunggah berkas tugas.', 'error');
      return { success: false, error: 'Otorisasi ditolak.' };
    }

    const assignment = assignments.find((a) => a.id === data.assignmentId);
    if (!assignment) return { success: false, error: 'Tugas tidak ditemukan' };

    // Format extension validation
    const fileExt = '.' + data.fileName.split('.').pop()?.toLowerCase();
    const isAllowed = assignment.allowedFormats.some(
      (fmt) => fmt.toLowerCase().trim() === fileExt || fmt.toLowerCase().replace('.', '').trim() === fileExt.replace('.', '')
    );

    if (!isAllowed) {
      const err = `Format file ${fileExt} tidak diizinkan. Harap unggah format: ${assignment.allowedFormats.join(', ')}`;
      showToast(err, 'error', 'error');
      return { success: false, error: err };
    }

    const fileId = 'file_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);

    // Save actual file to IndexedDB for authentic downloads
    if (data.file) {
      await saveAssignmentFile(fileId, data.file, {
        id: fileId,
        name: data.fileName,
        type: data.fileType || data.file.type || 'application/octet-stream',
        size: data.fileSize,
        sizeBytes: data.file.size,
        uploadedAt: new Date().toISOString(),
        studentId: currentUser.id,
        assignmentId: data.assignmentId,
      });
    }

    const newSub: Submission = {
      id: 'sub_' + Date.now(),
      assignmentId: data.assignmentId,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentNIM: currentUser.identifier,
      fileName: data.fileName,
      fileSize: data.fileSize,
      fileType: data.fileType,
      fileId,
      studentNotes: data.studentNotes,
      submittedAt: new Date().toISOString(),
      status: 'submitted',
    };

    setSubmissions((prev) => [
      newSub,
      ...prev.filter((s) => !(s.assignmentId === data.assignmentId && s.studentId === currentUser.id)),
    ]);

    showToast(`Berkas tugas "${assignment.title}" (${data.fileName}) berhasil diunggah!`, 'success', 'cloud_done');
    addAuditLog('ASSIGNMENT', `Unggah berkas tugas [${assignment.courseCode}] oleh ${currentUser.name}`, 'success');
    return { success: true };
  };

  // AUTHENTIC FILE DOWNLOAD WITH OWNERSHIP CHECK
  const downloadSubmissionFile = async (submissionId: string): Promise<boolean> => {
    const sub = submissions.find((s) => s.id === submissionId);
    if (!sub) {
      showToast('Berkas tugas tidak ditemukan dalam sistem.', 'error');
      return false;
    }

    // Role-based access check
    if (currentUser?.role === 'student' && sub.studentId !== currentUser.id) {
      showToast('Akses ditolak: Anda hanya dapat mengunduh berkas tugas Anda sendiri.', 'error');
      addAuditLog('ASSIGNMENT', `Percobaan unduh tanpa izin berkas ${sub.fileName} oleh ${currentUser.identifier}`, 'warning');
      return false;
    }

    showToast(`Mengunduh berkas tugas [${sub.fileName}]...`, 'info', 'download');
    const success = await triggerFileDownload(sub.fileId || sub.id, sub.fileName);

    if (success) {
      addAuditLog('ASSIGNMENT', `Pengunduhan berkas [${sub.fileName}] oleh ${currentUser?.name || 'Anonim'}`, 'info');
    }
    return success;
  };

  // LECTURER: GRADE SUBMISSION AND DYNAMICALLY REFLECT IN STUDENT RECORDS
  const gradeSubmission = (submissionId: string, score: number, feedback: string) => {
    if (!currentUser || (currentUser.role !== 'lecturer' && currentUser.role !== 'admin')) {
      showToast('Akses ditolak: Anda tidak memiliki wewenang untuk memberi nilai.', 'error');
      return;
    }

    if (score < 0 || score > 100) {
      showToast('Nilai harus berada dalam rentang skala 0 - 100.', 'error');
      return;
    }

    const sub = submissions.find((s) => s.id === submissionId);
    if (!sub) return;

    const assignment = assignments.find((a) => a.id === sub.assignmentId);

    // 1. Update the submission
    setSubmissions((prev) =>
      prev.map((s) => {
        if (s.id === submissionId) {
          return {
            ...s,
            status: 'graded',
            score,
            feedback,
            gradedAt: new Date().toISOString(),
            gradedBy: currentUser?.name || 'Dosen Pengampu',
          };
        }
        return s;
      })
    );

    // 2. Synchronize to Student Course Enrollment & Recalculate GPA
    if (assignment) {
      setEnrollments((prevEnrollments) => {
        return prevEnrollments.map((enr) => {
          if (enr.studentId === sub.studentId && enr.courseId === assignment.courseId) {
            // Recalculate course score weighted with assignment
            const newScore = Math.round(((enr.score * 0.7) + (score * 0.3)) * 10) / 10;
            const { letterGrade, gradePoint } = computeGradeInfo(newScore);
            return {
              ...enr,
              score: newScore,
              letterGrade,
              gradePoint,
            };
          }
          return enr;
        });
      });

      // Recalculate student GPA in users list
      setUsers((prevUsers) => {
        return prevUsers.map((u) => {
          if (u.id === sub.studentId && u.role === 'student') {
            const studentEnrs = enrollments.filter((e) => e.studentId === u.id);
            if (studentEnrs.length > 0) {
              const totalPoints = studentEnrs.reduce((acc, e) => {
                const c = courses.find((crs) => crs.id === e.courseId);
                return acc + e.gradePoint * (c?.credits || 3);
              }, 0);
              const totalCredits = studentEnrs.reduce((acc, e) => {
                const c = courses.find((crs) => crs.id === e.courseId);
                return acc + (c?.credits || 3);
              }, 0);
              const newGpa = totalCredits > 0 ? Math.round((totalPoints / totalCredits) * 100) / 100 : u.gpa;
              return { ...u, gpa: newGpa };
            }
          }
          return u;
        });
      });
    }

    showToast(`Nilai ${score} untuk ${sub.studentName} tersimpan dan langsung tercermin ke KHS!`, 'success', 'verified');
    addAuditLog('GRADE', `Penilaian [${score}/100] untuk ${sub.studentName} (${sub.studentNIM}) oleh ${currentUser.name}`, 'success');
  };

  // LECTURER: ASSIGNMENT CRUD
  const createAssignment = (data: Omit<Assignment, 'id' | 'createdAt'>) => {
    if (!currentUser || (currentUser.role !== 'lecturer' && currentUser.role !== 'admin')) {
      showToast('Akses ditolak: Hanya dosen pengampu yang dapat menerbitkan tugas.', 'error');
      return;
    }

    const newAssignment: Assignment = {
      ...data,
      id: 'asg_' + Date.now(),
      createdAt: new Date().toISOString(),
    };

    setAssignments((prev) => [newAssignment, ...prev]);
    showToast(`Tugas baru "${data.title}" berhasil diterbitkan untuk mahasiswa!`, 'success', 'add_task');
    addAuditLog('ASSIGNMENT', `Pembuatan tugas baru [${data.courseCode}] oleh ${currentUser.name}`, 'info');
  };

  const updateAssignment = (id: string, data: Partial<Assignment>) => {
    if (!currentUser || (currentUser.role !== 'lecturer' && currentUser.role !== 'admin')) {
      showToast('Akses ditolak.', 'error');
      return;
    }

    setAssignments((prev) => prev.map((a) => (a.id === id ? { ...a, ...data } : a)));
    showToast('Pembaruan data tugas berhasil disimpan!', 'success', 'check_circle');
    addAuditLog('ASSIGNMENT', `Pembaruan tugas ID ${id} oleh ${currentUser.name}`, 'info');
  };

  const deleteAssignment = (id: string) => {
    if (!currentUser || (currentUser.role !== 'lecturer' && currentUser.role !== 'admin')) {
      showToast('Akses ditolak.', 'error');
      return;
    }

    setAssignments((prev) => prev.filter((a) => a.id !== id));
    showToast('Tugas telah dihapus dari sistem perkuliahan.', 'info', 'delete');
    addAuditLog('ASSIGNMENT', `Penghapusan tugas ID ${id} oleh ${currentUser.name}`, 'warning');
  };

  // DISCUSSIONS
  const createTopic = (courseId: string, title: string, content: string) => {
    if (!currentUser) return;
    const course = courses.find((c) => c.id === courseId);
    const newTopic: DiscussionTopic = {
      id: 'disc_' + Date.now(),
      courseId,
      courseCode: course ? course.code : 'UMUM',
      courseName: course ? course.title : 'Diskusi Terbuka Kampus',
      title,
      content,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      authorAvatar: currentUser.avatar,
      createdAt: new Date().toISOString(),
      isPinned: false,
      replies: [],
    };
    setDiscussions((prev) => [newTopic, ...prev]);
    showToast('Topik diskusi baru berhasil dipublikasikan!', 'success', 'campaign');
    addAuditLog('SYSTEM', `Topik diskusi [${newTopic.title}] dibuat oleh ${currentUser.name}`, 'info');
  };

  const replyTopic = (topicId: string, content: string) => {
    if (!currentUser) return;
    const newReply = {
      id: 'rep_' + Date.now(),
      topicId,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      authorAvatar: currentUser.avatar,
      content,
      createdAt: new Date().toISOString(),
    };
    setDiscussions((prev) =>
      prev.map((d) => (d.id === topicId ? { ...d, replies: [...d.replies, newReply] } : d))
    );
    showToast('Balasan diskusi terkirim!', 'success', 'send');
  };

  const togglePinTopic = (topicId: string) => {
    if (!currentUser || (currentUser.role !== 'lecturer' && currentUser.role !== 'admin')) {
      showToast('Akses ditolak: Hanya dosen/admin yang dapat menyematkan topik.', 'error');
      return;
    }
    setDiscussions((prev) =>
      prev.map((d) => (d.id === topicId ? { ...d, isPinned: !d.isPinned } : d))
    );
    showToast('Status sematan (pin) topik diskusi diperbarui.', 'info', 'push_pin');
  };

  const deleteTopic = (topicId: string) => {
    const topic = discussions.find((d) => d.id === topicId);
    if (!topic) return;

    if (
      currentUser?.id !== topic.authorId &&
      currentUser?.role !== 'lecturer' &&
      currentUser?.role !== 'admin'
    ) {
      showToast('Akses ditolak: Anda tidak memiliki wewenang untuk menghapus topik ini.', 'error');
      return;
    }

    setDiscussions((prev) => prev.filter((d) => d.id !== topicId));
    showToast('Topik diskusi telah dihapus.', 'info', 'delete');
    addAuditLog('SYSTEM', `Penghapusan topik diskusi [${topic.title}] oleh ${currentUser?.name}`, 'warning');
  };

  // ADMIN: USER MANAGEMENT
  const createUser = (data: Omit<User, 'id' | 'createdAt' | 'lastLogin'>, customPassword?: string): boolean => {
    if (!currentUser || currentUser.role !== 'admin') {
      showToast('Akses ditolak: Hanya administrator yang dapat mendaftarkan akun.', 'error');
      return false;
    }

    const trimmedId = data.identifier.trim();
    const trimmedEmail = (data.email || '').trim().toLowerCase();

    // Unique identity validation
    const idExists = users.some((u) => u.identifier === trimmedId);
    if (idExists) {
      showToast(`Gagal: Nomor Induk (${trimmedId}) sudah terdaftar dalam direktori!`, 'error');
      return false;
    }

    const emailExists = trimmedEmail && users.some((u) => u.email.toLowerCase() === trimmedEmail);
    if (emailExists) {
      showToast(`Gagal: Surel (${trimmedEmail}) sudah digunakan oleh akun lain!`, 'error');
      return false;
    }

    const salt = generateSalt();
    const defaultPassword =
      customPassword ||
      (data.role === 'student' ? 'Mahasiswa123#' : data.role === 'lecturer' ? 'Dosen123#' : 'Admin123#');
    const passwordHash = synchronousHash(defaultPassword, salt);

    const newUser: User = {
      ...data,
      identifier: trimmedId,
      email: trimmedEmail || `${trimmedId}@nusantara.ac.id`,
      id: 'usr_' + Date.now(),
      salt,
      passwordHash,
      createdAt: new Date().toISOString(),
      lastLogin: 'Belum pernah',
    };

    setUsers((prev) => [newUser, ...prev]);
    showToast(`Akun pengguna baru [${newUser.name} - ${newUser.identifier}] berhasil didaftarkan!`, 'success', 'person_add');
    addAuditLog('USER', `Pendaftaran akun baru ${newUser.identifier} (${newUser.role}) oleh Administrator`, 'success');
    return true;
  };

  const updateUser = (id: string, data: Partial<User>): boolean => {
    if (!currentUser || currentUser.role !== 'admin') {
      showToast('Akses ditolak: Hanya administrator yang dapat mengubah akun.', 'error');
      return false;
    }

    // Check unique identifier if changed
    if (data.identifier) {
      const trimmedId = data.identifier.trim();
      const duplicate = users.some((u) => u.id !== id && u.identifier === trimmedId);
      if (duplicate) {
        showToast(`Gagal: Nomor Induk (${trimmedId}) sudah digunakan akun lain!`, 'error');
        return false;
      }
    }

    // Check unique email if changed
    if (data.email) {
      const trimmedEmail = data.email.trim().toLowerCase();
      const duplicate = users.some((u) => u.id !== id && u.email.toLowerCase() === trimmedEmail);
      if (duplicate) {
        showToast(`Gagal: Surel (${trimmedEmail}) sudah digunakan akun lain!`, 'error');
        return false;
      }
    }

    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data } : u)));
    showToast('Data akun pengguna berhasil diperbarui!', 'success', 'check_circle');
    addAuditLog('USER', `Pembaruan profil pengguna ID ${id}`, 'info');
    return true;
  };

  const toggleUserStatus = (id: string) => {
    if (!currentUser || currentUser.role !== 'admin') {
      showToast('Akses ditolak: Hanya administrator yang dapat mengubah status akun.', 'error');
      return;
    }

    if (id === currentUser.id) {
      showToast('Operasi ditolak: Anda tidak dapat menonaktifkan akun sendiri.', 'warning');
      return;
    }

    const target = users.find((u) => u.id === id);
    if (!target) return;

    const nextStatus: 'active' | 'suspended' = target.status === 'active' ? 'suspended' : 'active';
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: nextStatus } : u)));

    showToast(
      nextStatus === 'suspended'
        ? `Akses akun [${target.identifier}] dinonaktifkan (Suspended).`
        : `Akun [${target.identifier}] diaktifkan kembali.`,
      nextStatus === 'suspended' ? 'warning' : 'success',
      nextStatus === 'suspended' ? 'block' : 'check_circle'
    );
    addAuditLog('USER', `Status akun ${target.identifier} diubah menjadi ${nextStatus}`, 'warning');
  };

  const deleteUser = (id: string): boolean => {
    if (!currentUser || currentUser.role !== 'admin') {
      showToast('Akses ditolak: Hanya administrator yang dapat menghapus akun.', 'error');
      return false;
    }

    if (id === currentUser.id) {
      showToast('Operasi ditolak: Anda tidak dapat menghapus akun Anda sendiri.', 'error');
      return false;
    }

    const target = users.find((u) => u.id === id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
    showToast(`Akun pengguna [${target?.name || id}] telah dihapus dari direktori.`, 'info', 'delete');
    addAuditLog('USER', `Penghapusan akun [${target?.identifier || id}] oleh Administrator`, 'warning');
    return true;
  };

  // ADMIN: COURSE MANAGEMENT
  const createCourse = (data: Omit<Course, 'id' | 'enrolledCount'>): boolean => {
    if (!currentUser || currentUser.role !== 'admin') {
      showToast('Akses ditolak: Hanya administrator yang dapat menambah mata kuliah.', 'error');
      return false;
    }

    const trimmedCode = data.code.trim().toUpperCase();
    const codeExists = courses.some((c) => c.code.toUpperCase() === trimmedCode);
    if (codeExists) {
      showToast(`Kode mata kuliah [${trimmedCode}] sudah terdaftar!`, 'error');
      return false;
    }

    const newCourse: Course = {
      ...data,
      code: trimmedCode,
      id: 'crs_' + Date.now(),
      enrolledCount: 0,
    };

    setCourses((prev) => [newCourse, ...prev]);
    showToast(`Mata kuliah baru [${newCourse.code} - ${newCourse.title}] berhasil ditambahkan!`, 'success', 'library_add');
    addAuditLog('COURSE', `Mata kuliah baru [${newCourse.code}] dibuat`, 'success');
    return true;
  };

  const updateCourse = (id: string, data: Partial<Course>): boolean => {
    if (!currentUser || currentUser.role !== 'admin') {
      showToast('Akses ditolak.', 'error');
      return false;
    }

    if (data.code) {
      const trimmedCode = data.code.trim().toUpperCase();
      const codeDuplicate = courses.some((c) => c.id !== id && c.code.toUpperCase() === trimmedCode);
      if (codeDuplicate) {
        showToast(`Kode mata kuliah [${trimmedCode}] sudah digunakan oleh matakuliah lain!`, 'error');
        return false;
      }
    }

    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
    showToast('Data mata kuliah berhasil diperbarui!', 'success', 'check_circle');
    addAuditLog('COURSE', `Pembaruan mata kuliah ID ${id}`, 'info');
    return true;
  };

  const deleteCourse = (id: string): boolean => {
    if (!currentUser || currentUser.role !== 'admin') {
      showToast('Akses ditolak.', 'error');
      return false;
    }

    setCourses((prev) => prev.filter((c) => c.id !== id));
    showToast('Mata kuliah telah dihapus.', 'info', 'delete');
    addAuditLog('COURSE', `Penghapusan mata kuliah ID ${id}`, 'warning');
    return true;
  };

  const resetAllData = () => {
    setUsers(INITIAL_USERS);
    setCourses(INITIAL_COURSES);
    setEnrollments(INITIAL_ENROLLMENTS);
    setAssignments(INITIAL_ASSIGNMENTS);
    setSubmissions(INITIAL_SUBMISSIONS);
    setDiscussions(INITIAL_DISCUSSIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setCurrentUser(INITIAL_USERS[0]);
    setCurrentRole('student');
    setCurrentViewRaw('dashboard');
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SESSION_KEY);
    } catch {
      // Ignore
    }
    showToast('Data portal telah di-reset ke nilai default awal!', 'info', 'restart_alt');
  };

  return (
    <AcademicContext.Provider
      value={{
        currentUser,
        currentRole,
        currentView,
        users,
        courses,
        enrollments,
        assignments,
        submissions,
        discussions,
        auditLogs,
        news,
        toasts,
        setCurrentView,
        login,
        loginAs,
        logout,
        showToast,
        removeToast,
        submitAssignment,
        downloadSubmissionFile,
        gradeSubmission,
        createAssignment,
        updateAssignment,
        deleteAssignment,
        createTopic,
        replyTopic,
        togglePinTopic,
        deleteTopic,
        createUser,
        updateUser,
        toggleUserStatus,
        deleteUser,
        createCourse,
        updateCourse,
        deleteCourse,
        resetAllData,
      }}
    >
      {children}
    </AcademicContext.Provider>
  );
};

export const useAcademic = () => {
  const context = useContext(AcademicContext);
  if (!context) {
    throw new Error('useAcademic must be used within an AcademicProvider');
  }
  return context;
};
