import mongoose from "mongoose";
import dotenv from "dotenv";
import Teacher from "./models/Teacher.js";
import Student from "./models/Student.js";

dotenv.config();

const assignTeacherData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // Get first teacher
    const teacher = await Teacher.findOne();
    if (!teacher) {
      console.log("❌ No teacher found");
      process.exit(1);
    }

    console.log("Found teacher:", teacher.name, teacher.email);

    // Get all students
    const students = await Student.find().limit(10);
    console.log(`Found ${students.length} students`);

    // Assign students to teacher
    teacher.students = students.map(s => s._id);
    
    // Assign subjects if not already assigned
    if (!teacher.subjects || teacher.subjects.length === 0) {
      teacher.subjects = ["Mathematics", "Science", "English", "Hindi", "Social Studies"];
    }

    await teacher.save();
    console.log("✅ Teacher updated successfully");
    console.log("Assigned students:", teacher.students.length);
    console.log("Assigned subjects:", teacher.subjects);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

assignTeacherData();
