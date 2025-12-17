import express from "express";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

// Import controllers
import { getAllEvents, createEvent, updateEvent, deleteEvent } from "../controllers/eventController.js";
import { getAllHomework, createHomework, updateHomework, deleteHomework } from "../controllers/homeworkController.js";
import { getAllLeaves, updateLeaveStatus } from "../controllers/leaveController.js";
import { getStudentAttendance, getTeacherAttendance, markStudentAttendance, markTeacherAttendance } from "../controllers/attendanceController.js";
import { getAllStudents, createStudent, updateStudent, deleteStudent } from "../controllers/studentController.js";
import { getAllNotices, createNotice, updateNotice, deleteNotice } from "../controllers/noticeController.js";
import { getAllResults } from "../controllers/ResultController.js";
import { getAllClasses, createClass, updateClass, deleteClass, getClass } from "../controllers/classController.js";
import { getAllHolidays, createHoliday, deleteHoliday } from "../controllers/holidayController.js";
import { getAllAdmins } from "../controllers/adminController.js";
import { getAllHomework as getAdminHomework } from "../controllers/homeworkController.js";
import { getAllExamResults as getAdminResults } from "../controllers/ResultController.js";

const router = express.Router();

// Admin only access
router.use(protect);
router.use(authorizeRoles("Admin"));

// Events
router.get("/events", getAllEvents);
router.post("/events", createEvent);
router.put("/events/:id", updateEvent);
router.delete("/events/:id", deleteEvent);

// Homework
router.get("/homework", getAllHomework);
router.post("/homework", createHomework);
router.put("/homework/:id", updateHomework);
router.delete("/homework/:id", deleteHomework);

// Leave Management
router.get("/leaves", getAllLeaves);
router.put("/leaves/:id", updateLeaveStatus);

// Attendance
router.get("/attendance/students", getStudentAttendance);
router.get("/attendance/teachers", getTeacherAttendance);
router.post("/attendance/students", markStudentAttendance);
router.post("/attendance/teachers", markTeacherAttendance);

// Students
router.get("/students", getAllStudents);
router.post("/students", createStudent);
router.put("/students/:id", updateStudent);
router.delete("/students/:id", deleteStudent);

// Notices
router.get("/notices", getAllNotices);
router.post("/notices", createNotice);
router.put("/notices/:id", updateNotice);
router.delete("/notices/:id", deleteNotice);

// Results
router.get("/results", getAllResults);

// Classes
router.get("/classes", getAllClasses);
router.post("/classes", createClass);
router.get("/classes/:id", getClass);
router.put("/classes/:id", updateClass);
router.delete("/classes/:id", deleteClass);

// Holidays
router.get("/holidays", getAllHolidays);
router.post("/holidays", createHoliday);
router.delete("/holidays/:id", deleteHoliday);

// Admins
router.get("/admins", getAllAdmins);

// Admin access to all data
router.get("/homework", getAdminHomework);
router.get("/results", getAdminResults);

export default router;