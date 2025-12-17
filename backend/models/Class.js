import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., "10th A", "9th B"
    section: { type: String, required: true }, // A, B, C
    grade: { type: String, required: true }, // 1st, 2nd, 3rd, etc.
    classTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    subjects: [{ type: String }], // Math, English, Science, etc.
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    capacity: { type: Number, default: 40 },
    room: { type: String }, // Room number
    schedule: {
        startTime: String,
        endTime: String
    }
}, { timestamps: true });

export default mongoose.model("Class", classSchema);