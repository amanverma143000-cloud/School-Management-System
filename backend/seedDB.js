import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";
import Student from "./models/Student.js";
import Teacher from "./models/Teacher.js";
import Event from "./models/Event.js";
import Notice from "./models/Notice.js";
import Exam from "./models/Exam.js";
import Homework from "./models/Homework.js";
import LeaveRequest from "./models/LeaveRequest.js";
import ExamResult from "./models/ExamResult.js";
import AttendStudent from "./models/AttendStudent.js";
import AttendTeacher from "./models/AttendTeacher.js";
import Class from "./models/Class.js";
import Holiday from "./models/Holiday.js";

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Database connected");
};

const clearData = async () => {
  await Admin.deleteMany({});
  await Student.deleteMany({});
  await Teacher.deleteMany({});
  await Event.deleteMany({});
  await Notice.deleteMany({});
  await Exam.deleteMany({});
  await Homework.deleteMany({});
  await LeaveRequest.deleteMany({});
  await ExamResult.deleteMany({});
  await AttendStudent.deleteMany({});
  await AttendTeacher.deleteMany({});
  await Class.deleteMany({});
  await Holiday.deleteMany({});
  console.log("🗑️ Data cleared");
};

const seedData = async () => {
  const admins = await Admin.create([
    { name: "Admin One", email: "admin1@school.com", password: "admin123", domain: "Management" },
    { name: "Admin Two", email: "admin2@school.com", password: "admin123", domain: "Academics" },
    { name: "Admin Three", email: "admin3@school.com", password: "admin123", domain: "Finance" },
    { name: "Admin Four", email: "admin4@school.com", password: "admin123", domain: "HR" },
    { name: "Admin Five", email: "admin5@school.com", password: "admin123", domain: "IT" }
  ]);

  const teachers = await Teacher.create([
    { name: "Rajesh Kumar", email: "rajesh@school.com", password: "teacher123", mobile: "9876543210", location: "Delhi", experience: 5, subjects: ["Math", "Physics"] },
    { name: "Priya Sharma", email: "priya@school.com", password: "teacher123", mobile: "9876543211", location: "Mumbai", experience: 3, subjects: ["English", "Hindi"] },
    { name: "Amit Singh", email: "amit@school.com", password: "teacher123", mobile: "9876543212", location: "Pune", experience: 7, subjects: ["Chemistry", "Biology"] },
    { name: "Sunita Gupta", email: "sunita@school.com", password: "teacher123", mobile: "9876543213", location: "Bangalore", experience: 4, subjects: ["History", "Geography"] },
    { name: "Vikash Yadav", email: "vikash@school.com", password: "teacher123", mobile: "9876543214", location: "Chennai", experience: 6, subjects: ["Computer Science"] }
  ]);

  const students = await Student.create([
    { name: "Rahul", lastname: "Verma", email: "rahul@school.com", password: "student123", mobile: "8765432109", class: "10th", section: "A", rollNumber: "10A001" },
    { name: "Anita", lastname: "Patel", email: "anita@school.com", password: "student123", mobile: "8765432108", class: "10th", section: "B", rollNumber: "10B002" },
    { name: "Suresh", lastname: "Kumar", email: "suresh@school.com", password: "student123", mobile: "8765432107", class: "9th", section: "A", rollNumber: "9A003" },
    { name: "Kavita", lastname: "Singh", email: "kavita@school.com", password: "student123", mobile: "8765432106", class: "9th", section: "B", rollNumber: "9B004" },
    { name: "Deepak", lastname: "Sharma", email: "deepak@school.com", password: "student123", mobile: "8765432105", class: "8th", section: "A", rollNumber: "8A005" }
  ]);

  const events = await Event.create([
    { title: "Annual Sports Day", date: new Date("2024-03-15"), description: "School sports competition", createdBy: admins[0]._id, audience: "All", location: "School Ground" },
    { title: "Science Exhibition", date: new Date("2024-04-10"), description: "Student science projects", createdBy: admins[1]._id, audience: "Students", location: "Science Lab" },
    { title: "Teacher Training", date: new Date("2024-02-20"), description: "Professional development", createdBy: admins[0]._id, audience: "Teachers", location: "Conference Hall" },
    { title: "Parent Meeting", date: new Date("2024-05-05"), description: "Quarterly parent-teacher meeting", createdBy: admins[1]._id, audience: "All", location: "Auditorium" },
    { title: "Cultural Fest", date: new Date("2024-06-01"), description: "Annual cultural program", createdBy: admins[0]._id, audience: "All", location: "Main Hall" }
  ]);

  const notices = await Notice.create([
    { title: "Exam Schedule", description: "Final exam dates announced", createdBy: students[0]._id, audience: "Students", isImportant: true },
    { title: "Holiday Notice", description: "School closed for festival", createdBy: students[1]._id, audience: "All", isImportant: false },
    { title: "Fee Payment", description: "Last date for fee submission", createdBy: students[2]._id, audience: "Students", isImportant: true },
    { title: "Staff Meeting", description: "Monthly staff meeting", createdBy: students[3]._id, audience: "Teachers", isImportant: false },
    { title: "Library Rules", description: "New library guidelines", createdBy: students[4]._id, audience: "All", isImportant: false }
  ]);

  const exams = await Exam.create([
    { teacher: teachers[0]._id, subjectName: "Mathematics", examDate: new Date("2024-03-01"), examDay: "Monday", totalMarks: 100 },
    { teacher: teachers[1]._id, subjectName: "English", examDate: new Date("2024-03-03"), examDay: "Wednesday", totalMarks: 80 },
    { teacher: teachers[2]._id, subjectName: "Chemistry", examDate: new Date("2024-03-05"), examDay: "Friday", totalMarks: 100 },
    { teacher: teachers[3]._id, subjectName: "History", examDate: new Date("2024-03-07"), examDay: "Sunday", totalMarks: 75 },
    { teacher: teachers[4]._id, subjectName: "Computer Science", examDate: new Date("2024-03-10"), examDay: "Wednesday", totalMarks: 100 }
  ]);

  const homework = await Homework.create([
    { title: "Math Assignment", description: "Solve chapter 5 problems", assignedBy: teachers[0]._id, assignedTo: [students[0]._id, students[1]._id], dueDate: new Date("2024-02-25") },
    { title: "English Essay", description: "Write essay on environment", assignedBy: teachers[1]._id, assignedTo: [students[2]._id, students[3]._id], dueDate: new Date("2024-02-28") },
    { title: "Chemistry Lab Report", description: "Submit lab experiment report", assignedBy: teachers[2]._id, assignedTo: [students[0]._id, students[4]._id], dueDate: new Date("2024-03-02") },
    { title: "History Project", description: "Research on freedom fighters", assignedBy: teachers[3]._id, assignedTo: [students[1]._id, students[2]._id], dueDate: new Date("2024-03-05") },
    { title: "Programming Task", description: "Create a simple calculator", assignedBy: teachers[4]._id, assignedTo: [students[3]._id, students[4]._id], dueDate: new Date("2024-03-08") }
  ]);

  const leaveRequests = await LeaveRequest.create([
    { requester: students[0]._id, teacher: teachers[0]._id, reason: "Medical checkup", fromDate: new Date("2024-02-20"), toDate: new Date("2024-02-21"), status: "Pending" },
    { requester: students[1]._id, teacher: teachers[1]._id, reason: "Family function", fromDate: new Date("2024-02-25"), toDate: new Date("2024-02-26"), status: "Approved" },
    { requester: students[2]._id, teacher: teachers[2]._id, reason: "Fever", fromDate: new Date("2024-02-22"), toDate: new Date("2024-02-23"), status: "Rejected" },
    { requester: students[3]._id, teacher: teachers[3]._id, reason: "Personal work", fromDate: new Date("2024-02-28"), toDate: new Date("2024-03-01"), status: "Pending" },
    { requester: students[4]._id, teacher: teachers[4]._id, reason: "Emergency", fromDate: new Date("2024-03-05"), toDate: new Date("2024-03-06"), status: "Approved" }
  ]);

  const examResults = await ExamResult.create([
    { exam: exams[0]._id, student: students[0]._id, marks: 85, grade: "A", teacher: teachers[0]._id },
    { exam: exams[1]._id, student: students[1]._id, marks: 78, grade: "B+", teacher: teachers[1]._id },
    { exam: exams[2]._id, student: students[2]._id, marks: 92, grade: "A+", teacher: teachers[2]._id },
    { exam: exams[3]._id, student: students[3]._id, marks: 65, grade: "B", teacher: teachers[3]._id },
    { exam: exams[4]._id, student: students[4]._id, marks: 88, grade: "A", teacher: teachers[4]._id }
  ]);

  const studentAttendance = await AttendStudent.create([
    { student: students[0]._id, date: new Date("2024-02-15"), status: "Present", remarks: "On time" },
    { student: students[1]._id, date: new Date("2024-02-15"), status: "Absent", remarks: "Sick leave" },
    { student: students[2]._id, date: new Date("2024-02-15"), status: "Present", remarks: "Good" },
    { student: students[3]._id, date: new Date("2024-02-15"), status: "Leave", remarks: "Family function" },
    { student: students[4]._id, date: new Date("2024-02-15"), status: "Present", remarks: "Excellent" }
  ]);

  const teacherAttendance = await AttendTeacher.create([
    { teacher: teachers[0]._id, date: new Date("2024-02-15"), status: "Present", remarks: "Full day" },
    { teacher: teachers[1]._id, date: new Date("2024-02-15"), status: "Present", remarks: "Half day" },
    { teacher: teachers[2]._id, date: new Date("2024-02-15"), status: "Absent", remarks: "Medical leave" },
    { teacher: teachers[3]._id, date: new Date("2024-02-15"), status: "Present", remarks: "Training session" },
    { teacher: teachers[4]._id, date: new Date("2024-02-15"), status: "Leave", remarks: "Personal work" }
  ]);

  const classes = await Class.create([
    { name: "10th A", section: "A", grade: "10th", classTeacher: teachers[0]._id, subjects: ["Math", "Physics", "Chemistry"], capacity: 40, room: "101", schedule: { startTime: "09:00", endTime: "15:00" } },
    { name: "10th B", section: "B", grade: "10th", classTeacher: teachers[1]._id, subjects: ["English", "Hindi", "History"], capacity: 35, room: "102", schedule: { startTime: "09:00", endTime: "15:00" } },
    { name: "9th A", section: "A", grade: "9th", classTeacher: teachers[2]._id, subjects: ["Chemistry", "Biology", "Math"], capacity: 38, room: "201", schedule: { startTime: "09:00", endTime: "15:00" } },
    { name: "9th B", section: "B", grade: "9th", classTeacher: teachers[3]._id, subjects: ["History", "Geography", "English"], capacity: 42, room: "202", schedule: { startTime: "09:00", endTime: "15:00" } },
    { name: "8th A", section: "A", grade: "8th", classTeacher: teachers[4]._id, subjects: ["Computer Science", "Math", "English"], capacity: 30, room: "301", schedule: { startTime: "09:00", endTime: "15:00" } }
  ]);

  const holidays = await Holiday.create([
    { name: "Independence Day", date: new Date("2024-08-15"), description: "National Holiday", type: "National" },
    { name: "Gandhi Jayanti", date: new Date("2024-10-02"), description: "National Holiday", type: "National" },
    { name: "Diwali", date: new Date("2024-11-01"), description: "Festival of Lights", type: "Religious" },
    { name: "Christmas", date: new Date("2024-12-25"), description: "Christmas Day", type: "Religious" },
    { name: "School Foundation Day", date: new Date("2024-03-15"), description: "School Anniversary", type: "School" }
  ]);

  console.log("✅ Data seeded successfully!");
  console.log(`📊 Created: ${admins.length} Admins, ${teachers.length} Teachers, ${students.length} Students, ${events.length} Events, ${notices.length} Notices, ${exams.length} Exams, ${homework.length} Homework, ${leaveRequests.length} Leave Requests, ${examResults.length} Exam Results, ${studentAttendance.length} Student Attendance, ${teacherAttendance.length} Teacher Attendance, ${classes.length} Classes, ${holidays.length} Holidays`);
};

const main = async () => {
  await connectDB();
  await clearData();
  await seedData();
  await mongoose.disconnect();
  console.log("🔌 Database disconnected");
  process.exit(0);
};

main();