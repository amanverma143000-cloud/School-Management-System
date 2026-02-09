import express from "express";
import {
    postExamResult,
    getAllExamResults,
    getExamResultById,
    updateExamResult,
    deleteExamResult,
    getAllResults
} from "../controllers/ResultController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 🔒 Protect all routes
router.use(protect);

// ========== Teacher Routes (Create, Update, Delete) ==========
router.post("/resultadd", authorizeRoles("Teacher"), postExamResult);
router.put("/result/:id", authorizeRoles("Teacher"), updateExamResult);
router.delete("/result/:id", authorizeRoles("Teacher"), deleteExamResult);

// ========== Teacher Routes (View own results) ==========
router.get("/resultget", authorizeRoles("Teacher"), getAllExamResults);

// ========== Shared Routes (View) ==========
// Both Teacher and Student can view results
router.get("/all", getAllResults);
router.get("/result/:id", getExamResultById);

export default router;
