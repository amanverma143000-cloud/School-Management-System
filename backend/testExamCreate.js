import mongoose from "mongoose";
import dotenv from "dotenv";
import Teacher from "./models/Teacher.js";
import Exam from "./models/Exam.js";

dotenv.config();

const testExamCreate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // Pehla teacher find karo
    const teacher = await Teacher.findOne();
    if (!teacher) {
      console.log("❌ No teacher found in database");
      process.exit(1);
    }

    console.log("✅ Teacher found:", teacher.name);

    // Exam create karo
    const newExam = await Exam.create({
      teacher: teacher._id,
      subjectName: "Mathematics",
      examDate: new Date("2024-02-15"),
      examDay: "Thursday",
      totalMarks: 100,
      class: "10",
      section: "A",
      createdBy: teacher._id,
      marks: []
    });

    console.log("✅ Exam created successfully:", newExam);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

testExamCreate();
