import mongoose from "mongoose";
import Teacher from "./models/Teacher.js";
import dotenv from "dotenv";

dotenv.config();

const checkTeacher = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected\n");

    const teachers = await Teacher.find({});
    
    if (teachers.length === 0) {
      console.log("❌ No teachers found in database");
      process.exit(1);
    }

    console.log(`Found ${teachers.length} teacher(s):\n`);
    teachers.forEach((t, i) => {
      console.log(`${i + 1}. Name: ${t.name}`);
      console.log(`   Email: ${t.email}`);
      console.log(`   Subjects: ${t.subjects?.join(", ") || "N/A"}\n`);
    });

    // First teacher ka password reset
    const teacher = teachers[0];
    teacher.password = "123456";
    await teacher.save();
    
    console.log(`✅ Password reset for: ${teacher.email}`);
    console.log(`✅ New password: 123456`);
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

checkTeacher();
