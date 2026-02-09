import express from "express";
import {
    createNotice,
    getAllNotices,
    getNoticeById,
    updateNotice,
    deleteNotice
} from "../controllers/noticeController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public route - Anyone can view notices
router.get("/notice/all", protect, getAllNotices);
router.get("/notice/:id", protect, getNoticeById);

// Admin-only routes
router.post("/notice/add", protect, authorizeRoles("Admin"), createNotice);
router.put("/notice/update/:id", protect, authorizeRoles("Admin"), updateNotice);
router.delete("/notice/delete/:id", protect, authorizeRoles("Admin"), deleteNotice);

export default router;
