import ExamResult from "../models/ExamResult.js";
import Exam from "../models/Exam.js";

/* ================================
   1️⃣ Create / Post Exam Result
   (Teacher only)
================================ */
export const postExamResult = async (req, res) => {
  try {
    const { exam, student, marks, grade } = req.body;
    const teacherId = req.user._id; // logged-in teacher

    const newResult = await ExamResult.create({
      exam,
      student,
      marks,
      grade,
      teacher: teacherId,
    });

    // Optional: Push marks inside Exam model
    await Exam.findByIdAndUpdate(exam, {
      $push: {
        marks: {
          student,
          mark: marks,
          grade,
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Exam result added successfully",
      result: newResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================================
   2️⃣ Get All Exam Results (Teacher)
================================ */
export const getAllExamResults = async (req, res) => {
  try {
    const teacherId = req.user._id;

    const results = await ExamResult.find({ teacher: teacherId })
      .populate("student", "name email rollNumber class section")
      .populate("exam", "subjectName examDate examDay totalMarks")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================================
   3️⃣ Get Single Exam Result by ID
================================ */
export const getExamResultById = async (req, res) => {
  try {
    const result = await ExamResult.findById(req.params.id)
      .populate("student", "name email rollNumber class section")
      .populate("exam", "subjectName examDate examDay totalMarks")
      .populate("teacher", "name email");

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Exam result not found",
      });
    }

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================================
   4️⃣ Update Exam Result
   (Teacher / Admin)
================================ */
export const updateExamResult = async (req, res) => {
  try {
    const { marks, grade } = req.body;

    const updatedResult = await ExamResult.findByIdAndUpdate(
      req.params.id,
      { marks, grade },
      { new: true }
    );

    if (!updatedResult) {
      return res.status(404).json({
        success: false,
        message: "Exam result not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Exam result updated successfully",
      result: updatedResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================================
   5️⃣ Delete Exam Result
   (Admin only)
================================ */
export const deleteExamResult = async (req, res) => {
  try {
    const result = await ExamResult.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Exam result not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Exam result deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================================
   6️⃣ Get All Results (Admin)
================================ */
export const getAllResults = async (req, res) => {
  try {
    const results = await ExamResult.find({})
      .populate("student", "name lastname rollNumber class section")
      .populate("exam", "subjectName examDate examDay totalMarks")
      .populate("teacher", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
