import mongoose from "mongoose";
import dotenv from "dotenv";
import Teacher from "./models/Teacher.js";
import Student from "./models/Student.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");
    
    const teachers = await Teacher.find().select('name email students');
    console.log('\n📋 Teachers and their assigned students:\n');
    
    for (const teacher of teachers) {
      console.log(`Teacher: ${teacher.name} (${teacher.email})`);
      console.log(`Students assigned: ${teacher.students?.length || 0}`);
      
      if (teacher.students && teacher.students.length > 0) {
        const students = await Student.find({ _id: { $in: teacher.students } }).select('name class section');
        console.log('Student details:');
        students.forEach(s => console.log(`  - ${s.name} (Class: ${s.class}, Section: ${s.section})`));
      }
      console.log('---\n');
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
