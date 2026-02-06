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
  getAllNotices: () => api.get('/admin/notices'),
  getNoticeById: (id) => api.get(`/admin/notices/${id}`),
  createNotice: (noticeData) => api.post('/admin/notices', noticeData),
  updateNotice: (id, noticeData) => api.put(`/admin/notices/${id}`, noticeData),
  deleteNotice: (id) => api.delete(`/admin/notices/${id}`),
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
  getAllLeaves: () => api.get('/admin/leaves'),
  getLeaveById: (id) => api.get(`/admin/leaves/${id}`),
  createLeave: (leaveData) => api.post('/student/leave', leaveData),
  updateLeave: (id, leaveData) => api.put(`/admin/leaves/${id}`, leaveData),
  deleteLeave: (id) => api.delete(`/admin/leaves/${id}`),
  approveLeave: (id) => api.put(`/admin/leaves/${id}/approve`),
  rejectLeave: (id) => api.put(`/admin/leaves/${id}/reject`),
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
  getStudentAttendance: () => api.get('/admin/attendance/students'),
  getTeacherAttendance: () => api.get('/admin/attendance/teachers'),
  markStudentAttendance: (attendanceData) => api.post('/admin/attendance/students', attendanceData),
  markTeacherAttendance: (attendanceData) => api.post('/admin/attendance/teachers', attendanceData),
};

// ========== HOLIDAY APIs ==========
export const holidayAPI = {
  getAllHolidays: () => api.get('/admin/holidays'),
  getHolidayById: (id) => api.get(`/admin/holidays/${id}`),
  createHoliday: (holidayData) => api.post('/admin/holidays', holidayData),
  updateHoliday: (id, holidayData) => api.put(`/admin/holidays/${id}`, holidayData),
  deleteHoliday: (id) => api.delete(`/admin/holidays/${id}`),
};

// Default export - main api instance
export default api;