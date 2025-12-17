import Class from "../models/Class.js";

// Get all classes
export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find({})
      .populate("classTeacher", "name email subjects")
      .populate("students", "name lastname rollNumber")
      .sort({ grade: 1, section: 1 });

    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new class
export const createClass = async (req, res) => {
  try {
    const { name, section, grade, classTeacher, subjects, capacity, room, schedule } = req.body;

    const newClass = await Class.create({
      name,
      section,
      grade,
      classTeacher,
      subjects,
      capacity,
      room,
      schedule
    });

    const populatedClass = await Class.findById(newClass._id)
      .populate("classTeacher", "name email subjects");

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      class: populatedClass
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update class
export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedClass = await Class.findByIdAndUpdate(id, updates, { new: true })
      .populate("classTeacher", "name email subjects")
      .populate("students", "name lastname rollNumber");

    if (!updatedClass) {
      return res.status(404).json({ success: false, message: "Class not found" });
    }

    res.status(200).json({
      success: true,
      message: "Class updated successfully",
      class: updatedClass
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete class
export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedClass = await Class.findByIdAndDelete(id);

    if (!deletedClass) {
      return res.status(404).json({ success: false, message: "Class not found" });
    }

    res.status(200).json({
      success: true,
      message: "Class deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single class
export const getClass = async (req, res) => {
  try {
    const { id } = req.params;

    const classData = await Class.findById(id)
      .populate("classTeacher", "name email subjects")
      .populate("students", "name lastname rollNumber class section");

    if (!classData) {
      return res.status(404).json({ success: false, message: "Class not found" });
    }

    res.status(200).json(classData);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};