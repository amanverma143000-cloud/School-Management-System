// Express framework ko import kar rahe hain - ye web server banane ke liye use hota hai
import express from "express";
// Environment variables ko load karne ke liye dotenv import kar rahe hain
import dotenv from "dotenv";
// MongoDB database ke saath connection banane ke liye mongoose import kar rahe hain
import mongoose from "mongoose";

// Saare route files ko import kar rahe hain - ye different features ke liye alag-alag routes hain
import adminRoutes from "./routes/adminRoutes.js";           // Admin ke liye routes
import teacherRoutes from "./routes/teacherRoutes.js";       // Teacher ke liye routes
import studentRoutes from "./routes/studentRoutes.js";       // Student ke liye routes
import eventRoutes from "./routes/eventRoutes.js";           // Events ke liye routes
import noticeRoutes from "./routes/noticeRoutes.js";         // Notices ke liye routes
import exmaRoutes from "./routes/examRoutes.js";             // Exams ke liye routes
import homework from "./routes/homeworkRoutes.js";           // Homework ke liye routes
import LeaveRequest from "./routes/leaveRoutes.js";          // Leave requests ke liye routes
import examRoutes from "./routes/examRoutes.js";             // Exam routes (duplicate)
import resultRoute from "./routes/resultRoutes.js";          // Results ke liye routes
import adminAllRoutes from "./routes/adminAllRoutes.js";     // Admin ke saare routes

// CORS (Cross-Origin Resource Sharing) ko enable karne ke liye - frontend se backend ko access karne ke liye
import cors from "cors";

// Environment variables ko load kar rahe hain (.env file se)
dotenv.config();

// Express app create kar rahe hain
const app = express();

// CORS setup - frontend se backend ko access karne ki permission de rahe hain
app.use(cors({
    origin: "http://localhost:3001", // React frontend ka URL (port 3001 par chal raha hai)
    credentials: true, // Cookies aur authentication tokens bhejne ki permission
}));

// JSON data ko parse karne ke liye middleware - API requests mein JSON data aata hai
app.use(express.json());

// MongoDB database se connection banane ki koshish kar rahe hain
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,    // Naya URL parser use karne ke liye
    useUnifiedTopology: true  // Naya connection management use karne ke liye
})
    .then(() => console.log("✅ MongoDB connected"))                    // Success message
    .catch(err => console.error("❌ MongoDB connection error:", err));    // Error message

// JWT Secret key ko console mein print kar rahe hain (debugging ke liye)
console.log("JWT Secret:", process.env.JWT_SECRET);

// API Routes setup - har route ka apna specific kaam hai
app.use("/api/auth", adminRoutes);                    // Admin login/signup routes
app.use("/api/admin/teachers", teacherRoutes);        // Teacher management routes
app.use("/api/admin/students", studentRoutes);        // Student management routes
app.use("/api/admin/events", eventRoutes);            // Event management routes
app.use("/api/admin/notices", noticeRoutes);          // Notice management routes
app.use("/api/teacher/exam", exmaRoutes);             // Teacher exam routes
app.use("/api/teacher/homework", homework);           // Homework management routes
app.use("/api/teacher/result", resultRoute);          // Result management routes
app.use("/api/teacher/exam", examRoutes);             // Exam routes (duplicate)
app.use("/api/student/leave", LeaveRequest);          // Student leave request routes
app.use("/api/admin", adminAllRoutes);                // Admin ke saare general routes

// Default route - jab koi home page par jaye to ye message dikhega
app.get("/", (req, res) => {
    res.send("School Management API running on port " + (process.env.PORT || 3000));
});

// Server start karne ka code
const PORT = process.env.PORT || 3000;  // Port number environment variable se ya default 3000
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
