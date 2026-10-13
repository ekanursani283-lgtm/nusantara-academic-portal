import { User, Course, Enrollment, Assignment, Submission, DiscussionTopic, AuditLog, CampusNews, AcademicEvent } from '../types';
import { synchronousHash } from '../utils/crypto';

export const INITIAL_USERS: User[] = [
  // 1. Primary Student (from reference image)
  {
    id: 'usr_student_1',
    identifier: '2201082045',
    name: 'Andi Pratama S.',
    role: 'student',
    email: 'andi.pratama@std.nusantara.ac.id',
    department: 'Teknik Informatika',
    avatar: '/src/assets/images/graduate_spotlight_1791899282040.jpg',
    status: 'active',
    financialStatus: 'paid',
    scholarship: 'Beasiswa Unggulan',
    gpa: 3.88,
    completedCredits: 84,
    totalCredits: 144,
    semester: 6,
    salt: 'salt_std_1',
    passwordHash: synchronousHash('Mahasiswa123#', 'salt_std_1'),
    createdAt: '2022-08-15T08:00:00Z',
    lastLogin: '10 menit lalu'
  },
  // 2. Secondary Student
  {
    id: 'usr_student_2',
    identifier: '2201082012',
    name: 'Rina Rahmawati',
    role: 'student',
    email: 'rina.rahma@std.nusantara.ac.id',
    department: 'Teknik Informatika',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    financialStatus: 'paid',
    scholarship: 'Riset Mandiri',
    gpa: 3.79,
    completedCredits: 84,
    totalCredits: 144,
    semester: 6,
    salt: 'salt_std_2',
    passwordHash: synchronousHash('Mahasiswa123#', 'salt_std_2'),
    createdAt: '2022-08-15T08:00:00Z',
    lastLogin: '45 menit lalu'
  },
  // 3. Third Student
  {
    id: 'usr_student_3',
    identifier: '2201082068',
    name: 'Farhan Maulana',
    role: 'student',
    email: 'farhan.m@std.nusantara.ac.id',
    department: 'Sains Komputasi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    financialStatus: 'paid',
    scholarship: 'Reguler',
    gpa: 3.65,
    completedCredits: 81,
    totalCredits: 144,
    semester: 6,
    salt: 'salt_std_3',
    passwordHash: synchronousHash('Mahasiswa123#', 'salt_std_3'),
    createdAt: '2022-08-15T08:00:00Z',
    lastLogin: '1 jam lalu'
  },
  // 4. Primary Lecturer (from reference image)
  {
    id: 'usr_lecturer_1',
    identifier: '0412087501',
    name: 'Dr. Ir. Budi Hartono, M.Kom.',
    title: 'Dr. Ir. Budi Hartono, M.Kom.',
    rank: 'Lektor Kepala • Dosen Tetap',
    role: 'lecturer',
    email: 'budi.hartono@lecturer.nusantara.ac.id',
    department: 'Fakultas Sains Data & Informatika',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    salt: 'salt_lec_1',
    passwordHash: synchronousHash('Dosen123#', 'salt_lec_1'),
    createdAt: '2015-01-10T08:00:00Z',
    lastLogin: '2 jam lalu'
  },
  // 5. Secondary Lecturer
  {
    id: 'usr_lecturer_2',
    identifier: '0428058203',
    name: 'Prof. Dr. Maya Indrawati, Ph.D.',
    title: 'Prof. Dr. Maya Indrawati, Ph.D.',
    rank: 'Guru Besar • Kecerdasan Komputasi',
    role: 'lecturer',
    email: 'maya.indrawati@lecturer.nusantara.ac.id',
    department: 'Fakultas Rekayasa Sistem Cerdas',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    salt: 'salt_lec_2',
    passwordHash: synchronousHash('Dosen123#', 'salt_lec_2'),
    createdAt: '2012-03-01T08:00:00Z',
    lastLogin: 'Kemarin'
  },
  // 6. Primary Administrator (from reference image)
  {
    id: 'usr_admin_1',
    identifier: '198501012010',
    name: 'Hendra Wijaya, S.Kom., M.T.',
    title: 'Hendra Wijaya, S.Kom., M.T.',
    rank: 'Kepala Pusat Data & Sistem Informasi',
    role: 'admin',
    email: 'admin.ti@nusantara.ac.id',
    department: 'Biro Teknologi Informasi Kampus',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    status: 'active',
    salt: 'salt_adm_1',
    passwordHash: synchronousHash('Admin123#', 'salt_adm_1'),
    createdAt: '2010-06-01T08:00:00Z',
    lastLogin: '5 menit lalu'
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'crs_web_lanjut',
    code: 'IF3201',
    title: 'Pemrograman Web Lanjut',
    credits: 3,
    semester: 6,
    lecturerId: 'usr_lecturer_1',
    lecturerName: 'Dr. Ir. Budi Hartono, M.Kom.',
    room: 'Lab Software 3',
    schedule: 'Selasa 08:00 - 10:30 WIB',
    capacity: 40,
    enrolledCount: 38,
    description: 'Arsitektur modern Full-Stack Web, RESTful API, Single Page Applications, Microservices, and state orchestration.'
  },
  {
    id: 'crs_cloud_devops',
    code: 'IF3208',
    title: 'Arsitektur Cloud & DevOps',
    credits: 3,
    semester: 6,
    lecturerId: 'usr_lecturer_1',
    lecturerName: 'Dr. Ir. Budi Hartono, M.Kom.',
    room: 'R. Teori 402',
    schedule: 'Kamis 13:00 - 15:30 WIB',
    capacity: 45,
    enrolledCount: 42,
    description: 'Containerization, Kubernetes orchestration, CI/CD automated deployment pipelines, infrastructure as code.'
  },
  {
    id: 'crs_kripto',
    code: 'IF3214',
    title: 'Keamanan Siber & Kriptografi',
    credits: 3,
    semester: 6,
    lecturerId: 'usr_lecturer_1',
    lecturerName: 'Dr. Ir. Budi Hartono, M.Kom.',
    room: 'Lab Keamanan Siber',
    schedule: 'Rabu 10:00 - 12:30 WIB',
    capacity: 35,
    enrolledCount: 34,
    description: 'Enkripsi simetris & asimetris, hash functions, Zero-Knowledge proofs, audit kerentanan, dan mitigasi ancaman siber.'
  },
  {
    id: 'crs_ai_genetika',
    code: 'IF3204',
    title: 'Kecerdasan Komputasional',
    credits: 3,
    semester: 6,
    lecturerId: 'usr_lecturer_2',
    lecturerName: 'Prof. Dr. Maya Indrawati, Ph.D.',
    room: 'Auditorium Riset AI',
    schedule: 'Senin 09:00 - 11:30 WIB',
    capacity: 50,
    enrolledCount: 48,
    description: 'Algoritma genetika, logika fuzzy, swarm intelligence, optimasi metaheuristik, dan model evolusioner terapan.'
  },
  {
    id: 'crs_distribusi',
    code: 'IF3220',
    title: 'Rekayasa Perangkat Lunak Terdistribusi',
    credits: 3,
    semester: 6,
    lecturerId: 'usr_lecturer_2',
    lecturerName: 'Prof. Dr. Maya Indrawati, Ph.D.',
    room: 'Lab Software 2',
    schedule: 'Jumat 08:30 - 11:00 WIB',
    capacity: 40,
    enrolledCount: 36,
    description: 'Konsensus terdistribusi, event-driven architecture, CQRS, dan fault-tolerance pada klaster cloud skala masif.'
  }
];

export const INITIAL_ENROLLMENTS: Enrollment[] = [
  // Student 1 (Andi Pratama)
  {
    id: 'enr_1',
    studentId: 'usr_student_1',
    courseId: 'crs_web_lanjut',
    attendance: 96,
    score: 88.5,
    letterGrade: 'A',
    gradePoint: 4.0,
    semester: 6,
    status: 'in_progress'
  },
  {
    id: 'enr_2',
    studentId: 'usr_student_1',
    courseId: 'crs_cloud_devops',
    attendance: 94,
    score: 84.0,
    letterGrade: 'A-',
    gradePoint: 3.75,
    semester: 6,
    status: 'in_progress'
  },
  {
    id: 'enr_3',
    studentId: 'usr_student_1',
    courseId: 'crs_kripto',
    attendance: 92,
    score: 78.5,
    letterGrade: 'B+',
    gradePoint: 3.5,
    semester: 6,
    status: 'in_progress'
  },
  {
    id: 'enr_4',
    studentId: 'usr_student_1',
    courseId: 'crs_ai_genetika',
    attendance: 100,
    score: 95.0,
    letterGrade: 'A',
    gradePoint: 4.0,
    semester: 6,
    status: 'in_progress'
  },
  {
    id: 'enr_5',
    studentId: 'usr_student_1',
    courseId: 'crs_distribusi',
    attendance: 90,
    score: 82.0,
    letterGrade: 'A-',
    gradePoint: 3.75,
    semester: 6,
    status: 'in_progress'
  },
  // Student 2 (Rina Rahmawati)
  {
    id: 'enr_6',
    studentId: 'usr_student_2',
    courseId: 'crs_web_lanjut',
    attendance: 98,
    score: 91.0,
    letterGrade: 'A',
    gradePoint: 4.0,
    semester: 6,
    status: 'in_progress'
  },
  {
    id: 'enr_7',
    studentId: 'usr_student_2',
    courseId: 'crs_cloud_devops',
    attendance: 96,
    score: 86.5,
    letterGrade: 'A',
    gradePoint: 4.0,
    semester: 6,
    status: 'in_progress'
  },
  {
    id: 'enr_8',
    studentId: 'usr_student_2',
    courseId: 'crs_kripto',
    attendance: 94,
    score: 81.0,
    letterGrade: 'A-',
    gradePoint: 3.75,
    semester: 6,
    status: 'in_progress'
  },
  {
    id: 'enr_9',
    studentId: 'usr_student_2',
    courseId: 'crs_distribusi',
    attendance: 92,
    score: 84.0,
    letterGrade: 'A-',
    gradePoint: 3.75,
    semester: 6,
    status: 'in_progress'
  },
  // Student 3 (Farhan Maulana)
  {
    id: 'enr_10',
    studentId: 'usr_student_3',
    courseId: 'crs_ai_genetika',
    attendance: 92,
    score: 83.5,
    letterGrade: 'A-',
    gradePoint: 3.75,
    semester: 6,
    status: 'in_progress'
  },
  {
    id: 'enr_11',
    studentId: 'usr_student_3',
    courseId: 'crs_cloud_devops',
    attendance: 88,
    score: 79.0,
    letterGrade: 'B+',
    gradePoint: 3.5,
    semester: 6,
    status: 'in_progress'
  },
  {
    id: 'enr_12',
    studentId: 'usr_student_3',
    courseId: 'crs_distribusi',
    attendance: 90,
    score: 80.5,
    letterGrade: 'B+',
    gradePoint: 3.5,
    semester: 6,
    status: 'in_progress'
  },
  {
    id: 'enr_13',
    studentId: 'usr_student_3',
    courseId: 'crs_web_lanjut',
    attendance: 86,
    score: 77.0,
    letterGrade: 'B+',
    gradePoint: 3.5,
    semester: 6,
    status: 'in_progress'
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg_web_mvc',
    courseId: 'crs_web_lanjut',
    courseCode: 'IF3201',
    courseName: 'Pemrograman Web Lanjut (Kelas IF-6A)',
    lecturerId: 'usr_lecturer_1',
    title: 'Tugas 3: Arsitektur Web MVC & REST API',
    description: 'Implementasikan layanan backend modular MVC lengkap dengan otentikasi JWT, validasi input, dan dokumentasi OpenAPI. Kemas dalam arsip .zip atau unggah laporan ringkas .pdf.',
    dueDate: '2026-10-14T23:59:00Z', // Tomorrow 23:59
    weight: 15,
    maxScore: 100,
    allowedFormats: ['.zip', '.rar', '.pdf'],
    maxFileSizeMB: 25,
    createdAt: '2026-10-07T09:00:00Z'
  },
  {
    id: 'asg_quiz_genetika',
    courseId: 'crs_ai_genetika',
    courseCode: 'IF3204',
    courseName: 'Kecerdasan Komputasional (Kelas IF-6B)',
    lecturerId: 'usr_lecturer_2',
    title: 'Kuis Algoritma Genetika',
    description: 'Simulasi seleksi Roulette Wheel, Two-point Crossover, dan Mutasi Gaussian untuk penyelesaian Travelling Salesperson Problem (TSP) 20 simpul.',
    dueDate: '2026-10-05T12:00:00Z',
    weight: 10,
    maxScore: 100,
    allowedFormats: ['.pdf', '.ipynb'],
    maxFileSizeMB: 15,
    createdAt: '2026-10-01T08:00:00Z'
  },
  {
    id: 'asg_cloud_cluster',
    courseId: 'crs_cloud_devops',
    courseCode: 'IF3208',
    courseName: 'Arsitektur Cloud & DevOps (Kelas IF-6B)',
    lecturerId: 'usr_lecturer_1',
    title: 'Praktikum 4: Klaster Kubernetes Multi-Node',
    description: 'Konfigurasi manifest deployment Kubernetes dengan 3 replicas, Ingress NGINX controller, auto-healing probe, dan persistent volume claim (PVC).',
    dueDate: '2026-10-20T23:59:00Z',
    weight: 20,
    maxScore: 100,
    allowedFormats: ['.yaml', '.zip', '.pdf'],
    maxFileSizeMB: 20,
    createdAt: '2026-10-10T10:00:00Z'
  }
];

export const INITIAL_SUBMISSIONS: Submission[] = [
  // Graded Quiz submission for Andi Pratama
  {
    id: 'sub_andi_quiz',
    assignmentId: 'asg_quiz_genetika',
    studentId: 'usr_student_1',
    studentName: 'Andi Pratama S.',
    studentNIM: '2201082045',
    fileName: 'andi_pratama_kuis_genetika_tsp.pdf',
    fileSize: '3.4 MB',
    fileType: 'application/pdf',
    fileId: 'file_andi_quiz',
    studentNotes: 'Solusi menggunakan populasi awal 100 individu dengan konvergensi pada generasi ke-42.',
    submittedAt: '2026-10-04T21:15:00Z',
    status: 'graded',
    score: 95,
    feedback: 'Implementasi seleksi roulette wheel dan crossover sangat efisien dan rapi!',
    gradedAt: '2026-10-06T14:30:00Z',
    gradedBy: 'Prof. Dr. Maya Indrawati, Ph.D.'
  },
  // Pending submission by Rina Rahmawati in Task 3 for Lecturer to grade
  {
    id: 'sub_rina_mvc',
    assignmentId: 'asg_web_mvc',
    studentId: 'usr_student_2',
    studentName: 'Rina Rahmawati',
    studentNIM: '2201082012',
    fileName: 'rina_mvc_tugas3.zip',
    fileSize: '5.8 MB',
    fileType: 'application/zip',
    fileId: 'file_rina_mvc',
    studentNotes: 'Lengkap dengan unit testing Jest dan migrasi schema SQLite otomatis.',
    submittedAt: '2026-10-12T16:20:00Z',
    status: 'submitted'
  },
  // Pending submission by Farhan Maulana in Task 3
  {
    id: 'sub_farhan_mvc',
    assignmentId: 'asg_web_mvc',
    studentId: 'usr_student_3',
    studentName: 'Farhan Maulana',
    studentNIM: '2201082068',
    fileName: 'farhan_backend_rest_mvc.zip',
    fileSize: '4.2 MB',
    fileType: 'application/zip',
    fileId: 'file_farhan_mvc',
    studentNotes: 'Sudah diuji di Node.js LTS dengan Dockerfile terlampir.',
    submittedAt: '2026-10-12T22:10:00Z',
    status: 'submitted'
  }
];

export const INITIAL_DISCUSSIONS: DiscussionTopic[] = [
  {
    id: 'disc_1',
    courseId: 'crs_cloud_devops',
    courseCode: 'IF3208',
    courseName: 'Arsitektur Cloud & DevOps',
    title: 'Pembahasan Persiapan UTS Cloud Computing',
    content: 'Ada yang sudah menguji deploy Kubernetes Cluster mini di local minikube untuk latihan studi kasus 2? Apakah ada kendala saat mengonfigurasi Ingress controller port 80?',
    authorId: 'usr_student_3',
    authorName: 'Farhan Maulana',
    authorRole: 'student',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    createdAt: '2026-10-13T06:15:00Z',
    isPinned: true,
    replies: [
      {
        id: 'rep_1',
        topicId: 'disc_1',
        authorId: 'usr_student_1',
        authorName: 'Andi Pratama S.',
        authorRole: 'student',
        authorAvatar: '/src/assets/images/graduate_spotlight_1791899282040.jpg',
        content: 'Bisa aktifkan addon ingress dulu dengan perintah `minikube addons enable ingress`, lalu beri jeda sekitar 60 detik sampai pod ingress-controller ready.',
        createdAt: '2026-10-13T06:25:00Z'
      },
      {
        id: 'rep_2',
        topicId: 'disc_1',
        authorId: 'usr_lecturer_1',
        authorName: 'Dr. Ir. Budi Hartono, M.Kom.',
        authorRole: 'lecturer',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        content: 'Bagus Andi. Pastikan juga file `hosts` di OS lokal Anda sudah dipetakan ke IP cluster `minikube ip` agar DNS resolution bekerja sesuai skenario pengujian.',
        createdAt: '2026-10-13T06:38:00Z'
      }
    ]
  },
  {
    id: 'disc_2',
    courseId: 'crs_web_lanjut',
    courseCode: 'IF3201',
    courseName: 'Pemrograman Web Lanjut',
    title: 'Best Practice Refresh Token Rotation pada Single Page Application',
    content: 'Untuk Tugas 3, apakah penyimpanan Refresh Token lebih disarankan via HttpOnly Cookie dengan SameSite=Strict atau melalui memory session client?',
    authorId: 'usr_student_2',
    authorName: 'Rina Rahmawati',
    authorRole: 'student',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    createdAt: '2026-10-12T14:00:00Z',
    isPinned: false,
    replies: [
      {
        id: 'rep_3',
        topicId: 'disc_2',
        authorId: 'usr_lecturer_1',
        authorName: 'Dr. Ir. Budi Hartono, M.Kom.',
        authorRole: 'lecturer',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        content: 'HttpOnly Secure Cookie dengan proteksi CSRF token adalah standar emas industri. Ini mencegah pencurian token melalui serangan XSS.',
        createdAt: '2026-10-12T15:10:00Z'
      }
    ]
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log_1',
    timestamp: '09:12:04 WIB',
    category: 'AUTH',
    action: '2201082045 SSO OAuth 2.0 Identity Verified',
    performedBy: 'Andi Pratama S.',
    status: 'success'
  },
  {
    id: 'log_2',
    timestamp: '08:45:10 WIB',
    category: 'GRADE',
    action: 'Batch sync exported to PDDIKTI Kemenristek',
    performedBy: 'Sistem Sinkronisasi Otomatis',
    status: 'success'
  },
  {
    id: 'log_3',
    timestamp: '08:15:33 WIB',
    category: 'ASSIGNMENT',
    action: 'Berkas Tugas 3 diunggah (2201082012)',
    performedBy: 'Rina Rahmawati',
    status: 'info'
  },
  {
    id: 'log_4',
    timestamp: '07:50:12 WIB',
    category: 'USER',
    action: 'Pembaruan kuota KRS Semester Genap 2025/2026',
    performedBy: 'Hendra Wijaya, S.Kom., M.T.',
    status: 'success'
  },
  {
    id: 'log_5',
    timestamp: '07:30:00 WIB',
    category: 'SYSTEM',
    action: 'Daily backup cluster database snapshot created (4.8 GB)',
    performedBy: 'PostgreSQL Auto-Archiver',
    status: 'info'
  }
];

export const CAMPUS_NEWS: CampusNews[] = [
  {
    id: 'news_1',
    tag: 'HOT | TODAY',
    tagType: 'hot',
    title: 'Riset AI Nusantara Raih Hibah Internasional $2.4M untuk Mitigasi Iklim',
    summary: 'Konsorsium peneliti NIT memimpin pengembangan jaringan sensor satelit dan pemodelan prediktif hidrometeorologi maritim kawasan khatulistiwa.',
    location: 'Lab Siber Gedung Rektorat',
    date: '13 Oktober 2026',
    image: '/src/assets/images/ai_robotics_lab_1791899284126.jpg',
    featured: true
  },
  {
    id: 'news_2',
    tag: 'HOT | TODAY',
    tagType: 'hot',
    title: 'Penerimaan Mahasiswa Baru Gelombang II Telah Dibuka',
    summary: 'Jalur seleksi prestasi riset mandiri dan beasiswa kemitraan industri teknologi kuantum telah resmi menerima berkas pendaftar baru.',
    location: 'Biro Admisi Kampus Barat',
    date: '12 Oktober 2026',
    image: '/src/assets/images/students_courtyard_1791899285559.jpg'
  },
  {
    id: 'news_3',
    tag: 'AKADEMIK',
    tagType: 'academic',
    title: 'Simposium Nasional Teknologi Satelit Nusantara 2026',
    summary: 'Pusat Rekayasa Antariksa NIT memamerkan prototipe bus satelit orbit rendah buatan mahasiswa untuk telekomunikasi kepulauan terluar.',
    location: 'Auditorium Sains Dirgantara',
    date: '11 Oktober 2026',
    image: '/src/assets/images/satellite_cleanroom_1791899317434.jpg'
  }
];

export const ACADEMIC_EVENTS: AcademicEvent[] = [
  {
    id: 'ev_1',
    date: '2026-02-17',
    dayNumber: 17,
    title: 'Batas Unggah Proposal Skripsi & Tesis',
    type: 'deadline'
  },
  {
    id: 'ev_2',
    date: '2026-02-28',
    dayNumber: 28,
    title: 'Penutupan KRS Semester Genap NIT',
    type: 'registration'
  },
  {
    id: 'ev_3',
    date: '2026-03-15',
    dayNumber: 15,
    title: 'Ujian Tengah Semester (UTS) Genap',
    type: 'exam'
  }
];
