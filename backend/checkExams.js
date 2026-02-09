import mongoose from "mongoose";
import dotenv from "dotenv";
import Exam from "./models/Exam.js";
import Teacher from "./models/Teacher.js";

dotenv.config();

const checkExams = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    const exams = await Exam.find().populate("teacher", "name email");
    console.log(`\n📚 Total Exams in Database: ${exams.length}\n`);
    
    exams.forEach((exam, index) => {
      console.log(`${index + 1}. Subject: ${exam.subjectName}`);
      console.log(`   Teacher: ${exam.teacher?.name}`);
      console.log(`   Class: ${exam.class}-${exam.section}`);
      console.log(`   Date: ${exam.examDate.toDateString()}`);
      console.log(`   Total Marks: ${exam.totalMarks}`);
      console.log(`   Created: ${exam.createdAt.toLocaleString()}\n`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

checkExams();
