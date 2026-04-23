import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";
import Teacher from "./models/Teacher.js";
import Student from "./models/Student.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connected");

    // Pehle purana data delete karo
    await Admin.deleteMany({});
    await Teacher.deleteMany({});
    await Student.deleteMany({});
    console.log("🗑️ Old data deleted");

    // Admin create karo
    const admin = await Admin.create({
      name: "Rupesh Yadav",
      email: "admin@example.com",
      password: "Admin@123",
      domain: "shopmanagementsystem.com"
    });
    console.log("✅ Admin created:", admin.email);

    // Teacher create karo
    const teacher = await Teacher.create({
      name: "Amit Sharma",
      email: "amit.sharma@example.com",
      password: "Teacher@123",
      mobile: "9876543210",
      location: "Indore, Madhya Pradesh",
      experience: 5,
      subjects: ["Mathematics", "Physics"],
      createdBy: admin._id
    });
    console.log("✅ Teacher created:", teacher.email);

    // Student create karo
    const student = await Student.create({
      name: "Rohan",
      lastname: "Verma",
      email: "rohan.verma@example.com",
      password: "Student@123",
      mobile: "9876501234",
      class: "10",
      section: "A",
      rollNumber: "10A23",
      createdBy: admin._id,
      attendance: [
        {
          date: new Date("2025-10-08"),
          status: "Present",
          remarks: "On time"
        },
        {
          date: new Date("2025-10-07"),
          status: "Absent",
          remarks: "Sick leave"
        }
      ]
    });
    console.log("✅ Student created:", student.email);

    console.log("\n🎉 Seed data successfully added!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seedData();
