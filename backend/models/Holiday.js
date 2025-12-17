import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    description: String,
    type: { type: String, enum: ["National", "Religious", "School"], default: "School" }
}, { timestamps: true });

export default mongoose.model("Holiday", holidaySchema);