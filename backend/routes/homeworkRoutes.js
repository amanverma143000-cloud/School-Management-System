import express from "express";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import {
  createHomework,
  getAllHomework,
  updateHomework,
  deleteHomework,
  getTeacherSubjects,
  getAvailableClasses
} from "../controllers/homeworkController.js";

const router = express.Router();

router.use(protect);

// ========== Teacher Routes (Create, Update, Delete) ==========
router.post("/homework/add", authorizeRoles("Teacher"), createHomework);
router.put("/homework/update/:id", authorizeRoles("Teacher"), updateHomework);
router.delete("/homework/delete/:id", authorizeRoles("Teacher"), deleteHomework);

// Teacher-specific routes
router.get("/homework/teacher-subjects", authorizeRoles("Teacher"), getTeacherSubjects);
router.get("/homework/available-classes", authorizeRoles("Teacher"), getAvailableClasses);

// ========== Shared Routes (View) ==========
// Both Teacher and Student can view homework
router.get("/homework/all", getAllHomework);

export default router;
