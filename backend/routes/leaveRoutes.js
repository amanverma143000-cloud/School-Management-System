import express from "express";
import {
  getAllLeaves,
  updateLeaveStatus
} from "../controllers/leaveController.js";

import { protect } from "../middlewares/authMiddleware.js"; // JWT protect middleware
import { authorizeRoles } from "../middlewares/authMiddleware.js"; // Optional role check

const router = express.Router();
// Get all leaves
router.get("/leave/all", protect, getAllLeaves);

// Update leave status
router.put("/leave/:id", protect, updateLeaveStatus);

export default router;
