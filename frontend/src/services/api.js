// Axios library import kar rahe hain - HTTP requests ke liye
import axios from 'axios';

// Base API URL - Backend server ka address
const API_BASE_URL = 'http://localhost:3000/api';

// Axios instance create kar rahe hain with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Har request se pehle token add karta hai
api.interceptors.request.use(
  (config) => {
    // localStorage se token get kar rahe hain
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Response handle karta hai
api.interceptors.response.use(
  (response) => {
    return response.data; // Sirf data return karte hain
  },
  (error) => {
    // Error handling
    if (error.response?.status === 401) {
      // Unauthorized - token invalid hai
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

// ========== AUTHENTICATION APIs ==========
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

// ========== ADMIN APIs ==========
export const adminAPI = {
  getAllAdmins: () => api.get('/admin/admins'),
  getAdminById: (id) => api.get(`/admin/admins/${id}`),
  createAdmin: (adminData) => api.post('/admin/admins', adminData),
  updateAdmin: (id, adminData) => api.put(`/admin/admins/${id}`, adminData),
  deleteAdmin: (id) => api.delete(`/admin/admins/${id}`),
  getDashboardData: () => api.get('/admin/dashboard'),
};

// ========== STUDENT APIs ==========
export const studentAPI = {
  getAllStudents: () => api.get('/admin/students/student/all'),
  getStudentById: (id) => api.get(`/admin/students/student/${id}`),
  createStudent: (studentData) => api.post('/admin/students/student/add', studentData),
  updateStudent: (id, studentData) => api.put(`/admin/students/student/update/${id}`, studentData),
  deleteStudent: (id) => api.delete(`/admin/students/student/delete/${id}`),
  getUniqueSections: () => api.get('/admin/students/student/sections'), // Sahi path
};

// ========== TEACHER APIs ==========
export const teacherAPI = {
  getAllTeachers: () => api.get('/admin/teachers/teacher/all'),
  getTeacherById: (id) => api.get(`/admin/teachers/teacher/${id}`),
  createTeacher: (teacherData) => api.post('/admin/teachers/teacher/add', teacherData),
  updateTeacher: (id, teacherData) => api.put(`/admin/teachers/teacher/update/${id}`, teacherData),
  deleteTeacher: (id) => api.delete(`/admin/teachers/teacher/delete/${id}`),
};

// ========== CLASS APIs ==========
export const classAPI = {
  getAllClasses: () => api.get('/admin/classes'),
  getClassById: (id) => api.get(`/admin/classes/${id}`),
  createClass: (classData) => api.post('/admin/classes', classData),
  updateClass: (id, classData) => api.put(`/admin/classes/${id}`, classData),
  deleteClass: (id) => api.delete(`/admin/classes/${id}`),
  createPredefinedClasses: () => api.post('/admin/classes/predefined'),
  deleteAllClasses: () => api.delete('/admin/classes/all'),
};
// ========== EVENT APIs ==========
export const eventAPI = {
  getAllEvents: () => api.get('/admin/events'),
  getEventById: (id) => api.get(`/admin/events/${id}`),
  createEvent: (eventData) => api.post('/admin/events', eventData),
  updateEvent: (id, eventData) => api.put(`/admin/events/${id}`, eventData),
  deleteEvent: (id) => api.delete(`/admin/events/${id}`),
};

// ========== NOTICE APIs ==========
export const noticeAPI = {
  getAllNotices: () => api.get('/admin/notices/notice/all'),
  getNoticeById: (id) => api.get(`/admin/notices/notice/${id}`),
  createNotice: (noticeData) => api.post('/admin/notices/notice/add', noticeData),
  updateNotice: (id, noticeData) => api.put(`/admin/notices/notice/update/${id}`, noticeData),
  deleteNotice: (id) => api.delete(`/admin/notices/notice/delete/${id}`),
};

// ========== HOMEWORK APIs ==========
export const homeworkAPI = {
  getAllHomework: () => api.get('/admin/homework'),
  getHomeworkById: (id) => api.get(`/admin/homework/${id}`),
  createHomework: (homeworkData) => api.post('/admin/homework', homeworkData),
  updateHomework: (id, homeworkData) => api.put(`/admin/homework/${id}`, homeworkData),
  deleteHomework: (id) => api.delete(`/admin/homework/${id}`),
};

// ========== LEAVE APIs ==========
export const leaveAPI = {
  applyLeave: (leaveData) => api.post('/student/leave/apply', leaveData),
  getMyLeaves: () => api.get('/student/leave/my-leaves'),
  getAllLeaves: () => api.get('/admin/leaves/leave/all'),
  getLeaveById: (id) => api.get(`/admin/leaves/leave/${id}`),
  updateLeaveStatus: (id, status) => api.put(`/admin/leaves/leave/${id}`, { status }),
  deleteLeave: (id) => api.delete(`/admin/leaves/leave/${id}`),
};

// ========== RESULT APIs ==========
export const resultAPI = {
  getAllResults: () => api.get('/admin/results'),
  getResultById: (id) => api.get(`/admin/results/${id}`),
  createResult: (resultData) => api.post('/admin/results', resultData),
  updateResult: (id, resultData) => api.put(`/admin/results/${id}`, resultData),
  deleteResult: (id) => api.delete(`/admin/results/${id}`),
};

// ========== EXAM APIs ==========
export const examAPI = {
  getAllExams: () => api.get('/admin/exams'),
  getExamById: (id) => api.get(`/admin/exams/${id}`),
  createExam: (examData) => api.post('/admin/exams', examData),
  updateExam: (id, examData) => api.put(`/admin/exams/${id}`, examData),
  deleteExam: (id) => api.delete(`/admin/exams/${id}`),
};

// ========== ATTENDANCE APIs ==========
export const attendanceAPI = {
  // Student Attendance
  markStudentAttendance: (attendanceData) => api.post('/attendance/student', attendanceData),
  getStudentAttendance: (studentId) => api.get(`/attendance/student/${studentId}`),
  getAllStudentsAttendance: () => api.get('/attendance/student'),
  updateStudentAttendance: (id, attendanceData) => api.put(`/attendance/student/${id}`, attendanceData),
  deleteStudentAttendance: (id) => api.delete(`/attendance/student/${id}`),
  
  // Teacher Attendance
  markTeacherAttendance: (attendanceData) => api.post('/attendance/teacher', attendanceData),
  getTeacherAttendance: (teacherId) => api.get(`/attendance/teacher/${teacherId}`),
  getAllTeachersAttendance: () => api.get('/attendance/teacher'),
  updateTeacherAttendance: (id, attendanceData) => api.put(`/attendance/teacher/${id}`, attendanceData),
  deleteTeacherAttendance: (id) => api.delete(`/attendance/teacher/${id}`),
};

// ========== HOLIDAY APIs ==========
export const holidayAPI = {
  getAllHolidays: () => api.get('/admin/holidays'),
  getHolidayById: (id) => api.get(`/admin/holidays/${id}`),
  createHoliday: (holidayData) => api.post('/admin/holidays', holidayData),
  updateHoliday: (id, holidayData) => api.put(`/admin/holidays/${id}`, holidayData),
  deleteHoliday: (id) => api.delete(`/admin/holidays/${id}`),
};

// ========== ANNOUNCEMENT APIs ==========
export const announcementAPI = {
  getAllAnnouncements: () => api.get('/admin/announcements'),
  getAnnouncementById: (id) => api.get(`/admin/announcements/${id}`),
  createAnnouncement: (announcementData) => api.post('/admin/announcements', announcementData),
  updateAnnouncement: (id, announcementData) => api.put(`/admin/announcements/${id}`, announcementData),
  deleteAnnouncement: (id) => api.delete(`/admin/announcements/${id}`),
};

// Default export - main api instance
export default api;