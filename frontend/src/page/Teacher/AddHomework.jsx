import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Image as ImageIcon, X } from "lucide-react";
import { homeworkAPI } from "../../services/api";
import { useAuth } from "../../context/AuthProvider";

const AddHomework = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [subject, setSubject] = useState("");
  const [classSection, setClassSection] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      const [subjectsRes, classesRes] = await Promise.all([
        homeworkAPI.getTeacherSubjects(),
        homeworkAPI.getAvailableClasses()
      ]);
      setSubjects(subjectsRes.subjects || []);
      setClasses(classesRes.classes || []);
    } catch (err) {
      console.error('Error fetching dropdown data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      console.log('Current user:', user);
      const userId = user?._id || user?.id;
      console.log('User ID:', userId);
      
      if (!userId) {
        alert('User not logged in properly. Please login again.');
        return;
      }

      const homeworkData = {
        title,
        description,
        assignedBy: userId,
        dueDate: dueDate || undefined,
        subject: subject || undefined,
        classSection: classSection || undefined
      };

      console.log('Sending homework data:', homeworkData);
      await homeworkAPI.createHomework(homeworkData);
      alert("Homework posted successfully!");

      setTitle("");
      setDescription("");
      setDueDate("");
      setSubject("");
      setClassSection("");
    } catch (err) {
      console.error('Full error:', err);
      alert("Error while posting homework: " + (err.message || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4" 
         style={{ background: "linear-gradient(to bottom right, #fffdf3, #fffbea, #fff6d9)" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          backgroundColor: "var(--card-bg)",
          boxShadow: "-6px 4px 12px rgba(0, 0, 0, 0.25)",
        }}
        className="rounded-2xl p-8 w-full max-w-lg border border-yellow-200"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <FileText className="text-yellow-600 w-7 h-7" />
          <h1 className="text-2xl font-bold text-[var(--text-secondary)]">📚 Add Homework</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Homework Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Science - Chapter 6: Motion"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-yellow-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none transition bg-yellow-50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              placeholder="Write homework details here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-yellow-300 rounded-xl px-3 py-2 h-28 resize-none focus:ring-2 focus:ring-yellow-400 outline-none transition bg-yellow-50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subject (optional)
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-yellow-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none transition bg-yellow-50"
              disabled={loading}
            >
              <option value="">Select Subject</option>
              {subjects.map((sub, idx) => (
                <option key={idx} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Class/Section (optional)
            </label>
            <select
              value={classSection}
              onChange={(e) => setClassSection(e.target.value)}
              className="w-full border border-yellow-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none transition bg-yellow-50"
              disabled={loading}
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls.label}>{cls.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Due Date (optional)
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border border-yellow-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none transition bg-yellow-50"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--text-primary)",
            }}
            className="w-full hover:bg-yellow-500 font-semibold py-3 rounded-xl shadow-md transition"
          >
            <div className="flex items-center justify-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Post Homework
            </div>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddHomework;
