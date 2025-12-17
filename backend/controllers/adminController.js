import Admin from "../models/Admin.js";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";
import generateToken from "../utils/generateToken.js";

// Generate JWT

// Register Controller
export const registerAdmin = async (req, res) => {
  const { name, email, password, role, domain } = req.body;

  try {
    const userExists = await Admin.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await Admin.create({ name, email, password, role, domain });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      domain: user.domain,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Login Controller
export const loginAdmin = async (req, res) => {
  console.log("backend 1")
  const { email, password } = req.body;
 console.log("backend 2")
  try {
    let user;
    let role;

    // 1️⃣ Try Admin
    user = await Admin.findOne({ email });
    if (user) role = "Admin";

    // 2️⃣ Try Teacher
    if (!user) {
      user = await Teacher.findOne({ email });
      if (user) role = "Teacher";
    }

    // 3️⃣ Try Student
    if (!user) {
      user = await Student.findOne({ email });
      if (user) role = "Student";
    }

    // 4️⃣ Check password
    if (user && (await user.matchPassword(password))) {
      // Role-based success message
      let successMessage;
      if (role === "Student") {
        successMessage = `Welcome Student ${user.name}! You have successfully logged in.`;
      } else if (role === "Teacher") {
        successMessage = `Welcome Teacher ${user.name}! You have successfully logged in.`;
      } else if (role === "Admin") {
        successMessage = `Welcome Admin ${user.name}! You have successfully logged in.`;
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: role,                           // ✅ Use role variable
        token: generateToken(user._id, role), // ✅ Token includes correct role
        message: successMessage                // ✅ Send role-based message
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Example Protected Controller
export const adminOnly = (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.name}` });
}


export const studentOnly = (req, res) => {
  res.json({ message: `Welcome Student ${req.user.name}` });
}


export const teacherOnly = (req, res) => {
  res.json({ message: `Welcome Teacher ${req.user.name}` });
}

// Get all admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}).select('-password');
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new admin
export const createAdmin = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(201).json({ success: true, admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};