// authMiddleware.js
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";

// Protect middleware – verify JWT token
export const protect = async (req, res, next) => {
  let token;

  try {
    // 1️⃣ Check Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
      }

      // 2️⃣ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey123");

      // 3️⃣ Fetch user based on role
      let user;
      const role = decoded.role || decoded.userRole;
      
      if (role === "Admin" || role === "admin") {
        user = await Admin.findById(decoded.id).select("-password");
        if (user) user.role = "Admin";
      } else if (role === "Teacher" || role === "teacher") {
        user = await Teacher.findById(decoded.id).select("-password");
        if (user) user.role = "Teacher";
      } else if (role === "Student" || role === "student") {
        user = await Student.findById(decoded.id).select("-password");
        if (user) user.role = "Student";
      } else {
        return res.status(401).json({ message: "Invalid user role" });
      }

      if (!user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      req.user = user; // attach user info to request
      next();
    } else {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    console.error("Protect middleware error:", error.message);
    return res.status(401).json({
      message: "Not authorized, token failed or malformed",
    });
  }
};

// Role-based authorization
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role?.toLowerCase();
    const allowedRoles = roles.map(role => role.toLowerCase());
    
    if (!req.user || !allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: `Only ${roles.join("/")} can access this route`,
      });
    }
    next();
  };
};
