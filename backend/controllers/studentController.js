// Student model ko import kar rahe hain - database operations ke liye
import Student from "../models/Student.js";

// ========== STUDENT MANAGEMENT FUNCTIONS ==========
// Ye saare functions student ke CRUD operations handle karte hain
// CRUD = Create, Read, Update, Delete

// 📝 CREATE STUDENT - Naya student add karne ke liye
export const createStudent = async (req, res) => {
    try {
        // Request body se student data lekar naya student create kar rahe hain
        const student = await Student.create(req.body);
        
        // Success response bhej rahe hain
        res.status(201).json({
            message: "Student created successfully",
            student: student
        });
    } catch (error) {
        // Agar duplicate entry hai (email ya roll number already exists)
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0]; // Konsa field duplicate hai
            return res.status(400).json({ message: `${field} already exists` });
        }
        // Koi aur error hai to general error message bhejenge
        res.status(400).json({ message: error.message });
    }
};

// 📋 GET ALL STUDENTS - Saare students ki list lene ke liye
export const getAllStudents = async (req, res) => {
    try {
        // Saare students find kar rahe hain, lekin password field exclude kar rahe hain security ke liye
        const students = await Student.find().select("-password");
        
        // Students ki list return kar rahe hain
        res.status(200).json(students);
    } catch (error) {
        // Error case mein error message bhej rahe hain
        res.status(500).json({ message: error.message });
    }
};

// 🔍 GET SINGLE STUDENT - Specific student ki details lene ke liye (ID se)
export const getStudentById = async (req, res) => {
    try {
        // URL params se student ID lekar specific student find kar rahe hain
        const student = await Student.findById(req.params.id).select("-password");
        
        // Agar student nahi mila to 404 error
        if (!student) return res.status(404).json({ message: "Student not found" });
        
        // Student data return kar rahe hain
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✏️ UPDATE STUDENT - Student ki information update karne ke liye
export const updateStudent = async (req, res) => {
    try {
        // Student ID se find karke new data se update kar rahe hain
        const student = await Student.findByIdAndUpdate(
            req.params.id,           // Konsa student update karna hai
            req.body,                // Naya data
            { 
                new: true,           // Updated document return karo
                runValidators: true  // Schema validation check karo
            }
        );
        
        // Agar student nahi mila to error
        if (!student) return res.status(404).json({ message: "Student not found" });
        
        // Updated student data return kar rahe hain
        res.status(200).json(student);
    } catch (error) {
        // Duplicate entry error handle kar rahe hain
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ message: `${field} already exists` });
        }
        res.status(400).json({ message: error.message });
    }
};

// 🗑️ DELETE STUDENT - Student ko database se delete karne ke liye
export const deleteStudent = async (req, res) => {
    try {
        // Student ID se find karke delete kar rahe hain
        const student = await Student.findByIdAndDelete(req.params.id);
        
        // Agar student nahi mila to error
        if (!student) return res.status(404).json({ message: "Student not found" });
        
        // Success message bhej rahe hain
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 📚 GET UNIQUE SECTIONS - Database mein jo sections use ho rahe hain unki list
export const getUniqueSections = async (req, res) => {
    try {
        // Students collection se unique sections nikal rahe hain
        const sections = await Student.distinct("section");
        
        // Sections ko alphabetically sort kar rahe hain
        const sortedSections = sections.sort();
        
        res.status(200).json({
            success: true,
            data: sortedSections
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
