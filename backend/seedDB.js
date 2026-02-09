import mongoose from 'mongoose';
import Admin from './models/Admin.js';
import Student from './models/Student.js';
import Teacher from './models/Teacher.js';
import Class from './models/Class.js';
import Attendance from './models/AttendStudent.js';
import TeacherAttendance from './models/AttendTeacher.js';
import Event from './models/Event.js';
import Exam from './models/Exam.js';
import ExamResult from './models/ExamResult.js';
import Holiday from './models/Holiday.js';
import Homework from './models/Homework.js';
import LeaveRequest from './models/LeaveRequest.js';
import Notice from './models/Notice.js';

const MONGO_URI = 'mongodb://localhost:27017/test_school_db';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear all collections
    await Admin.deleteMany({});
    await Student.deleteMany({});
    await Teacher.deleteMany({});
    await Class.deleteMany({});
    await Attendance.deleteMany({});
    await TeacherAttendance.deleteMany({});
    await Event.deleteMany({});
    await Exam.deleteMany({});
    await ExamResult.deleteMany({});
    await Holiday.deleteMany({});
    await Homework.deleteMany({});
    await LeaveRequest.deleteMany({});
    await Notice.deleteMany({});
    console.log('Cleared all data');

    // Create Admin
    const admin = await Admin.create({
      name: 'Admin One',
      email: 'admin1@school.com',
      password: 'admin123',
      domain: 'Management'
    });

    // Create Teachers
    const teacher1 = await Teacher.create({
      name: 'Mr. Verma',
      email: 'verma@school.com',
      password: 'teacher123',
      mobile: '9876543220',
      subjects: ['Math', 'Physics'],
      experience: 5,
      createdBy: admin._id,
      students: [] // Will be updated after students are created
    });

    const teacher2 = await Teacher.create({
      name: 'Ms. Gupta',
      email: 'gupta@school.com',
      password: 'teacher123',
      mobile: '9876543221',
      subjects: ['English'],
      experience: 3,
      createdBy: admin._id,
      students: [] // Will be updated after students are created
    });

    // Create Students
    const student1 = await Student.create({
      name: 'Rahul',
      lastname: 'Sharma',
      email: 'rahul@school.com',
      password: 'student123',
      mobile: '9876543210',
      class: '10',
      section: 'A',
      rollNumber: 'R001',
      createdBy: admin._id
    });

    const student2 = await Student.create({
      name: 'Priya',
      lastname: 'Singh',
      email: 'priya@school.com',
      password: 'student123',
      mobile: '9876543211',
      class: '10',
      section: 'A',
      rollNumber: 'R002',
      createdBy: admin._id
    });

    // Assign students to teachers
    await Teacher.findByIdAndUpdate(teacher1._id, {
      students: [student1._id, student2._id]
    });
    
    await Teacher.findByIdAndUpdate(teacher2._id, {
      students: [student1._id, student2._id]
    });

    // Create Class
    await Class.create({
      name: '10th Standard',
      section: 'A',
      grade: '10',
      classTeacher: teacher1._id,
      subjects: ['Math', 'Physics', 'English'],
      students: [student1._id, student2._id],
      capacity: 40,
      room: 'Room 101',
      createdBy: admin._id
    });

    // Create Attendance
    await Attendance.create([
      {
        student: student1._id,
        date: new Date(),
        status: 'Present',
        markedBy: admin._id
      },
      {
        student: student2._id,
        date: new Date(),
        status: 'Present',
        markedBy: admin._id
      }
    ]);

    // Create Teacher Attendance
    await TeacherAttendance.create([
      {
        teacher: teacher1._id,
        date: new Date(),
        status: 'Present',
        markedBy: admin._id
      },
      {
        teacher: teacher2._id,
        date: new Date(),
        status: 'Present',
        markedBy: admin._id
      }
    ]);

    // Create Events
    await Event.create([
      {
        title: 'Annual Day',
        date: new Date('2024-12-25'),
        description: 'School Annual Day Celebration',
        createdBy: admin._id,
        audience: 'All'
      },
      {
        title: 'Sports Day',
        date: new Date('2024-12-15'),
        description: 'Inter-school Sports Competition',
        createdBy: admin._id,
        audience: 'Students'
      }
    ]);

    // Create Holidays
    await Holiday.create([
      {
        name: 'Republic Day',
        date: new Date('2025-01-26'),
        description: 'National Holiday',
        type: 'National',
        createdBy: admin._id
      },
      {
        name: 'Diwali',
        date: new Date('2024-11-01'),
        description: 'Festival of Lights',
        type: 'Religious',
        createdBy: admin._id
      }
    ]);

    // Create Exam
    const exam = await Exam.create({
      teacher: teacher1._id,
      subjectName: 'Mathematics',
      examDate: new Date('2024-12-20'),
      examDay: 'Friday',
      totalMarks: 100,
      class: '10',
      section: 'A',
      createdBy: admin._id
    });

    // Create Exam Results
    await ExamResult.create([
      {
        exam: exam._id,
        student: student1._id,
        marks: 85,
        grade: 'A',
        teacher: teacher1._id
      },
      {
        exam: exam._id,
        student: student2._id,
        marks: 92,
        grade: 'A+',
        teacher: teacher1._id
      }
    ]);

    // Create Homework
    await Homework.create([
      {
        title: 'Math Assignment',
        description: 'Complete Chapter 5 exercises',
        assignedBy: teacher1._id,
        assignedTo: [student1._id, student2._id],
        dueDate: new Date('2024-12-10'),
        subject: 'Mathematics',
        classSection: '10-A',
        createdBy: admin._id
      },
      {
        title: 'English Essay',
        description: 'Write essay on Environment',
        assignedBy: teacher2._id,
        assignedTo: [student1._id, student2._id],
        dueDate: new Date('2024-12-12'),
        subject: 'English',
        classSection: '10-A',
        createdBy: admin._id
      }
    ]);

    // Create Leave Requests
    await LeaveRequest.create([
      {
        requester: student1._id,
        teacher: teacher1._id,
        admin: admin._id,
        reason: 'Medical appointment',
        fromDate: new Date('2024-12-08'),
        toDate: new Date('2024-12-09'),
        status: 'Pending',
        createdBy: admin._id
      },
      {
        requester: student2._id,
        teacher: teacher1._id,
        admin: admin._id,
        reason: 'Family function',
        fromDate: new Date('2024-12-15'),
        toDate: new Date('2024-12-15'),
        status: 'Approved',
        createdBy: admin._id
      }
    ]);

    // Create Notices
    await Notice.create([
      {
        title: 'Exam Schedule Released',
        description: 'Final exam schedule has been released. Check your dashboard.',
        createdBy: admin._id,
        audience: 'All',
        isImportant: true
      },
      {
        title: 'Library Timing Change',
        description: 'Library will close at 5 PM from next week',
        createdBy: admin._id,
        audience: 'Students',
        isImportant: false
      }
    ]);

    console.log('✅ Database seeded successfully!');
    console.log('\n📊 Created:');
    console.log('- 1 Admin (admin1@school.com / admin123)');
    console.log('- 2 Teachers');
    console.log('- 2 Students');
    console.log('- 1 Class');
    console.log('- 2 Student Attendances');
    console.log('- 2 Teacher Attendances');
    console.log('- 2 Events');
    console.log('- 2 Holidays');
    console.log('- 1 Exam');
    console.log('- 2 Exam Results');
    console.log('- 2 Homeworks');
    console.log('- 2 Leave Requests');
    console.log('- 2 Notices');

    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedDatabase();
