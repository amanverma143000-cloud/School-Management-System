import mongoose from 'mongoose';
import Student from './models/Student.js';
import Teacher from './models/Teacher.js';
import Admin from './models/Admin.js';
import dotenv from 'dotenv';

dotenv.config();

async function testLoginSystem() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected\n');

    // Test 1: Check if users exist
    console.log('📊 Checking users in database...');
    const studentCount = await Student.countDocuments();
    const teacherCount = await Teacher.countDocuments();
    const adminCount = await Admin.countDocuments();
    
    console.log(`Students: ${studentCount}`);
    console.log(`Teachers: ${teacherCount}`);
    console.log(`Admins: ${adminCount}\n`);

    // Test 2: Test student password verification
    console.log('🔐 Testing Student Login...');
    const students = await Student.find().limit(3);
    
    if (students.length > 0) {
      for (const student of students) {
        console.log(`\nStudent: ${student.name} ${student.lastname}`);
        console.log(`Email: ${student.email}`);
        console.log(`Role: ${student.role}`);
        
        // Test with a common password (you should replace with actual password)
        const testPassword = 'password123';
        const isMatch = await student.matchPassword(testPassword);
        console.log(`Password '${testPassword}' match: ${isMatch ? '✅ YES' : '❌ NO'}`);
      }
    } else {
      console.log('⚠️ No students found in database');
    }

    // Test 3: Test teacher password verification
    console.log('\n🔐 Testing Teacher Login...');
    const teachers = await Teacher.find().limit(3);
    
    if (teachers.length > 0) {
      for (const teacher of teachers) {
        console.log(`\nTeacher: ${teacher.name}`);
        console.log(`Email: ${teacher.email}`);
        console.log(`Role: ${teacher.role}`);
        
        const testPassword = 'password123';
        const isMatch = await teacher.matchPassword(testPassword);
        console.log(`Password '${testPassword}' match: ${isMatch ? '✅ YES' : '❌ NO'}`);
      }
    } else {
      console.log('⚠️ No teachers found in database');
    }

    // Test 4: Test admin password verification
    console.log('\n🔐 Testing Admin Login...');
    const admins = await Admin.find().limit(3);
    
    if (admins.length > 0) {
      for (const admin of admins) {
        console.log(`\nAdmin: ${admin.name}`);
        console.log(`Email: ${admin.email}`);
        console.log(`Role: ${admin.role}`);
        
        const testPassword = 'password123';
        const isMatch = await admin.matchPassword(testPassword);
        console.log(`Password '${testPassword}' match: ${isMatch ? '✅ YES' : '❌ NO'}`);
      }
    } else {
      console.log('⚠️ No admins found in database');
    }

    console.log('\n✅ Test completed!');
    console.log('\n💡 Tips:');
    console.log('1. If password match shows NO, you need to reset the password');
    console.log('2. Use the email shown above to login');
    console.log('3. Default test password is: password123');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 MongoDB connection closed');
    process.exit(0);
  }
}

testLoginSystem();
