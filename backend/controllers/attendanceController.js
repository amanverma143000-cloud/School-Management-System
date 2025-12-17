import AttendStudent from "../models/AttendStudent.js";
import AttendTeacher from "../models/AttendTeacher.js";

export const getStudentAttendance = async (req, res) => {
  try {
    const attendance = await AttendStudent.find()
      .populate("student", "name lastname class section");
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeacherAttendance = async (req, res) => {
  try {
    const attendance = await AttendTeacher.find()
      .populate("teacher", "name subjects");
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markStudentAttendance = async (req, res) => {
  try {
    const attendance = await AttendStudent.create(req.body);
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const markTeacherAttendance = async (req, res) => {
  try {
    const attendance = await AttendTeacher.create(req.body);
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};