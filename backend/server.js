import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import adminRoutes from "./routes/adminRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import exmaRoutes from "./routes/examRoutes.js";
import homework from "./routes/homeworkRoutes.js";
import LeaveRequest from "./routes/leaveRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import resultRoute from "./routes/resultRoutes.js";
import adminAllRoutes from "./routes/adminAllRoutes.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors({
    origin: "http://localhost:3001", // yaha aapka React frontend ka port
    credentials: true, // agar cookies/token bhejna hai
}));

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));
console.log("JWT Secret:", process.env.JWT_SECRET);

// Routes
app.use("/api/auth", adminRoutes);       // Admin routes
app.use("/api/admin/teachers", teacherRoutes);       // Teacher management routes
app.use("/api/admin/students", studentRoutes);
app.use("/api/admin/events", eventRoutes);
app.use("/api/admin/notices", noticeRoutes);
app.use("/api/teacher/exam", exmaRoutes);
app.use("/api/teacher/homework", homework);
app.use("api/teacheer/result", resultRoute);
app.use("api/teacheer/exam", examRoutes);
app.use("/api/student/leave", LeaveRequest);

app.use("/api/admin", adminAllRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("School Management API running on port " + (process.env.PORT || 3000));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
