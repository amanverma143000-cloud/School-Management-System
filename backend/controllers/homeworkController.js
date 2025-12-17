import Homework from "../models/Homework.js";

export const getAllHomework = async (req, res) => {
  try {
    const homework = await Homework.find()
      .populate("assignedBy", "name")
      .populate("assignedTo", "name lastname");
    res.json(homework);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createHomework = async (req, res) => {
  try {
    const homework = await Homework.create(req.body);
    res.status(201).json(homework);
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