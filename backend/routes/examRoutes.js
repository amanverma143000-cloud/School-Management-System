import express from "express";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam
} from "../controllers/examController.js";

const router = express.Router();

router.use(protect);

// ========== Teacher Routes (Create, Update, Delete) ==========
router.post("/exam/add", authorizeRoles("Teacher"), createExam);
router.put("/exam/update/:id", authorizeRoles("Teacher"), updateExam);
router.delete("/exam/delete/:id", authorizeRoles("Teacher"), deleteExam);

// ========== Shared Routes (View) ==========
// Both Teacher and Student can view exams
router.get("/exam/all", getAllExams);
router.get("/exam/:id", getExamById);

export default router;
