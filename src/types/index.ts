export type UserRole = 'student' | 'lecturer' | 'admin';

export interface User {
  id: string;
  identifier: string; // NIM (Student) | NIDN/NIP (Lecturer) | NIP (Admin)
  name: string;
  role: UserRole;
  email: string;
  department: string;
  avatar: string;
  status: 'active' | 'suspended';
  title?: string; // e.g. "Dr. Ir. Budi Hartono, M.Kom."
  rank?: string; // e.g. "Lektor Kepala"
  financialStatus?: 'paid' | 'pending';
  scholarship?: string;
  gpa?: number;
  completedCredits?: number;
  totalCredits?: number;
  semester?: number;
  passwordHash?: string;
  salt?: string;
  createdAt: string;
  lastLogin: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number; // SKS
  semester: number;
  lecturerId: string;
  lecturerName: string;
  room: string;
  schedule: string;
  capacity: number;
  enrolledCount: number;
  description: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  attendance: number; // percentage
  score: number; // 0-100
  letterGrade: string; // A, A-, B+, etc.
  gradePoint: number; // 4.0, 3.75, 3.5, etc.
  semester: number;
  status: 'completed' | 'in_progress';
}

export interface Assignment {
  id: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  lecturerId: string;
  title: string;
  description: string;
  dueDate: string; // YYYY-MM-DDTHH:mm:ss
  weight: number; // Percentage e.g. 15
  maxScore: number;
  allowedFormats: string[]; // e.g. ['.pdf', '.zip', '.rar']
  maxFileSizeMB: number;
  createdAt: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  studentNIM: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  fileId?: string;
  studentNotes?: string;
  submittedAt: string;
  status: 'submitted' | 'graded';
  score?: number;
  feedback?: string;
  gradedAt?: string;
  gradedBy?: string;
}

export interface DiscussionReply {
  id: string;
  topicId: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar: string;
  content: string;
  createdAt: string;
}

export interface DiscussionTopic {
  id: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar: string;
  createdAt: string;
  isPinned?: boolean;
  replies: DiscussionReply[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  category: 'AUTH' | 'GRADE' | 'ASSIGNMENT' | 'USER' | 'COURSE' | 'SYSTEM';
  action: string;
  performedBy: string;
  status: 'success' | 'warning' | 'info';
}

export interface CampusNews {
  id: string;
  tag: string;
  tagType: 'hot' | 'academic' | 'announcement';
  title: string;
  summary: string;
  location: string;
  date: string;
  image: string;
  featured?: boolean;
}

export interface AcademicEvent {
  id: string;
  date: string; // YYYY-MM-DD
  dayNumber: number;
  title: string;
  type: 'deadline' | 'exam' | 'registration' | 'holiday';
}
