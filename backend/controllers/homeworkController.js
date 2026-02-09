import Homework from "../models/Homework.js";
import Teacher from "../models/Teacher.js";
import Class from "../models/Class.js";

export const getAllHomework = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    
    let query = {};
    if (userRole === 'Admin') {
      query = { createdBy: userId };
    } else if (userRole === 'Teacher') {
      query = { assignedBy: userId };
    }
    
    const homework = await Homework.find(query)
      .populate("assignedBy", "name email")
      .sort({ createdAt: -1 })
      .lean();
    
    // Return as array directly
    res.json(homework);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createHomework = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    
    const homeworkData = { 
      ...req.body, 
      createdBy: userRole === 'Admin' ? userId : req.body.createdBy || userId,
      assignedBy: userId
    };
    
    const homework = await Homework.create(homeworkData);
    const populatedHomework = await Homework.findById(homework._id).populate('assignedBy', 'name email');
    res.status(201).json(populatedHomework);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateHomework = async (req, res) => {
  try {
    const homework = await Homework.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(homework);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteHomework = async (req, res) => {
  try {
    await Homework.findByIdAndDelete(req.params.id);
    res.json({ message: "Homework deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeacherSubjects = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user._id || req.user.id).select('subjects');
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    
    // Also get subjects from classes where teacher is assigned
    const classes = await Class.find({ classTeacher: req.user._id || req.user.id });
    const classSubjects = classes.flatMap(c => c.subjects || []);
    const allSubjects = [...new Set([...teacher.subjects, ...classSubjects])];
    
    res.json({ subjects: allSubjects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAvailableClasses = async (req, res) => {
  try {
    const teacherId = req.user._id || req.user.id;
    
    // Get classes where teacher is assigned
    const classes = await Class.find({ classTeacher: teacherId });
    const formattedClasses = classes.map(cls => ({
      _id: cls._id,
      label: `${cls.grade || cls.name}-${cls.section}`,
      name: cls.name,
      grade: cls.grade,
      section: cls.section
    }));
    
    res.json({ classes: formattedClasses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
