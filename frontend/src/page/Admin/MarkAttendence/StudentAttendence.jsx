import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";// eslint-disable-line
import { useGetStudentsQuery } from "../../../../Api/SchoolApi";

export default function StudentAttendance({ goBack }) {
  const { data: allStudents = [], isLoading } = useGetStudentsQuery();
  
  // Group students by class and section
  const studentsData = allStudents.reduce((acc, student) => {
    const classKey = `${student.class} - ${student.section}`;
    if (!acc[classKey]) acc[classKey] = [];
    acc[classKey].push({
      id: student._id,
      name: `${student.name} ${student.lastname}`,
      rollNumber: student.rollNumber
    });
    return acc;
  }, {});

  const [selectedClass, setSelectedClass] = useState("");
  const [attendance, setAttendance] = useState({});
  const [savedAttendance, setSavedAttendance] = useState({});
  const [viewMode, setViewMode] = useState("mark"); // mark | view | completed

  // ✅ Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("attendanceData");
    if (stored) setSavedAttendance(JSON.parse(stored));
  }, []);

  // ✅ Save to localStorage when updated
  useEffect(() => {
    localStorage.setItem("attendanceData", JSON.stringify(savedAttendance));
  }, [savedAttendance]);

  const handleMark = (id, status) => {
    if (viewMode === "view" || viewMode === "completed") return;
    setAttendance((prev) => ({ ...prev, [id]: status }));
  };

  const handleSave = () => {
    const currentDate = new Date().toLocaleDateString();
    setSavedAttendance((prev) => ({
      ...prev,
      [selectedClass]: {
        data: attendance,
        date: currentDate,
      },
    }));
    setSelectedClass("");
    setAttendance({});
    setViewMode("mark");
  };

  const handleClassChange = (cls) => {
    setSelectedClass(cls);
    if (savedAttendance[cls]) {
      setAttendance(savedAttendance[cls].data);
      setViewMode("completed");
    } else {
      setAttendance({});
      setViewMode("mark");
    }
  };

  const handleView = (cls) => {
    setSelectedClass(cls);
    setAttendance(savedAttendance[cls].data);
    setViewMode("view");
  };

  const handleEdit = (cls) => {
    setSelectedClass(cls);
    setAttendance(savedAttendance[cls].data);
    setViewMode("mark");
  };

  const selectedStudents = studentsData[selectedClass] || [];
  const allMarked =
    selectedStudents.length > 0 &&
    selectedStudents.every((s) => attendance[s.id]);
    
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading students...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 bg-white rounded-2xl shadow-lg max-w-5xl mx-auto w-full"
    >
      {/* 🔙 Back Button */}
      <button
        onClick={goBack}
         style={{
          backgroundColor: "var(--primary-color)",
          color: "var(--button-text)",
          boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
        }}
        className="font-semibold px-4 py-2 rounded-xl transition"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-semibold mb-6 text-[var()] text-center">
        Student Attendance
      </h2>

      {/* 🔽 Class Dropdown */}
      <div className="flex justify-center mb-6">
        <select
          value={selectedClass}
          onChange={(e) => handleClassChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-60 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Class</option>
          {Object.keys(studentsData).map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>

      {/* 🗂️ Saved Attendance Cards */}
      {Object.keys(savedAttendance).length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4 mb-10"
        >
          {Object.entries(savedAttendance).map(([cls, info]) => (
            <motion.div
              key={cls}
              whileHover={{ scale: 1.01 }}
              className="flex justify-between items-center bg-gray-50 border rounded-xl p-4 shadow-sm w-full"
            >
              <div className="text-left font-semibold text-gray-800">
                {cls}
              </div>
              <div className="text-center font-semibold text-gray-700">
                📅 {info.date || "Not Saved"}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleView(cls)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  View
                </button>
                <button
                  onClick={() => handleEdit(cls)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* 🧾 Attendance Table */}
      {selectedClass && viewMode !== "completed" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-50 border-b">
                <th className="p-3 text-left text-gray-700 font-semibold">
                  Name
                </th>
                <th className="p-3 text-center text-gray-700 font-semibold">
                  Mark Attendance
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedStudents.map((student) => (
                <motion.tr
                  key={student.id}
                  whileHover={{ scale: 1.01 }}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-gray-500">Roll: {student.rollNumber}</div>
                    </div>
                  </td>
                  <td className="p-3 text-center space-x-3">
                    {["Present", "Absent", "Leave"].map((status) => {
                      const isActive = attendance[student.id] === status;
                      const base =
                        "px-4 py-2 rounded-full font-medium transition-all duration-200";
                      const styles = {
                        Present: isActive
                          ? "bg-green-500 text-white shadow-md scale-105"
                          : "bg-green-100 text-green-700 hover:bg-green-200",
                        Absent: isActive
                          ? "bg-red-500 text-white shadow-md scale-105"
                          : "bg-red-100 text-red-700 hover:bg-red-200",
                        Leave: isActive
                          ? "bg-yellow-500 text-white shadow-md scale-105"
                          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
                      };

                      return (
                        <motion.button
                          key={status}
                          whileTap={{ scale: 0.95 }}
                          disabled={viewMode === "view"}
                          onClick={() => handleMark(student.id, status)}
                          className={`${base} ${styles[status]} ${
                            viewMode === "view"
                              ? "opacity-60 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          {status}
                        </motion.button>
                      );
                    })}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {/* 💾 Save Button */}
          {allMarked && viewMode === "mark" && (
            <motion.div
              className="flex justify-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md"
              >
                💾 Save Attendance
              </button>
            </motion.div>
          )}
        </motion.div>
      )}

      {!selectedClass && Object.keys(savedAttendance).length === 0 && (
        <p className="text-gray-500 text-center mt-10">
          Please select a class to mark attendance.
        </p>
      )}
    </motion.div>
  );
}
