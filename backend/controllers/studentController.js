import Student from "../models/Student.js";

// ---------- STUDENT MANAGEMENT ----------

// Create Student
export const createStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json({
            message: "Student created successfully",
            student: student
        });
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ message: `${field} already exists` });
        }
        res.status(400).json({ message: error.message });
    }
};

// Get All Students
export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().select("-password");
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single Student by ID
export const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).select("-password");
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Student
export const updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(student);
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ message: `${field} already exists` });
        }
        res.status(400).json({ message: error.message });
    }
};

// Delete Student
export const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
