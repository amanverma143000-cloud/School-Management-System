import mongoose from "mongoose";
import Student from "./models/Student.js";
import Teacher from "./models/Teacher.js";
import dotenv from "dotenv";

dotenv.config();

const resetAllPasswords = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected\n");

    // All students ka password reset
    const students = await Student.find({});
    console.log(`Found ${students.length} students`);
    
    for (let student of students) {
      student.password = "123456";
      await student.save();
      console.log(`✅ Reset password for student: ${student.email}`);
    }

    // All teachers ka password reset
    const teachers = await Teacher.find({});
    console.log(`\nFound ${teachers.length} teachers`);
    
    for (let teacher of teachers) {
      teacher.password = "123456";
      await teacher.save();
      console.log(`✅ Reset password for teacher: ${teacher.email}`);
    }

    console.log("\n✅ All passwords reset to: 123456");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

resetAllPasswords();
