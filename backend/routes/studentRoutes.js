import express from "express";
import Student from "../models/Student.js";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getUniqueSections
} from "../controllers/studentController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ========== STUDENT MANAGEMENT ROUTES ==========
// These routes are mounted at /api/admin/students

// Test route without auth
router.get("/test", async (req, res) => {
  try {
    const count = await Student.countDocuments();
    res.json({ message: "Student routes working", studentCount: count });
  } catch (error) {
    res.json({ message: "Error", error: error.message });
  }
});

// Sections route - Teacher aur Admin dono access kar sakte hain
router.get("/student/sections", protect, authorizeRoles("Admin", "Teacher"), getUniqueSections);

// All student management routes (admin-only)
router.use(protect);                 // Login required
router.use(authorizeRoles("Admin")); // Only Admin can manage students

// Student CRUD operations with /student/ prefix to match frontend expectations
router.post("/student/add", createStudent);           // Create student
router.get("/student/all", getAllStudents);          // Get all students
router.get("/student/:id", getStudentById);           // Get single student
router.put("/student/update/:id", updateStudent);     // Update student
router.delete("/student/delete/:id", deleteStudent);  // Delete student

export default router;
