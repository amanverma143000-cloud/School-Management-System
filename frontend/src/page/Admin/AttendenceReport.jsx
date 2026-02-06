import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { studentAPI, teacherAPI, attendanceAPI } from "../../services/api";

const AttendanceReport = () => {
  const [selectedOption, setSelectedOption] = useState("class");
  const [selectedClass, setSelectedClass] = useState("");
  const [filter, setFilter] = useState("weekly");
  const [percentage, setPercentage] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [studentsData, teachersData] = await Promise.all([
          studentAPI.getAllStudents(),
          teacherAPI.getAllTeachers()
        ]);
        setStudents(studentsData.data || studentsData || []);
        setTeachers(teachersData.data || teachersData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  
  // Get unique classes from students
  const classes = [...new Set(students.map(s => `${s.class} - ${s.section}`))];
  
  // Get student names for dropdown
  const studentOptions = students.map(s => ({
    name: `${s.name} ${s.lastname}`,
    class: `${s.class} - ${s.section}`,
    id: s._id
  }));
  
  // Get teacher names for dropdown
  const teacherOptions = teachers.map(t => ({
    name: t.name,
    subjects: t.subjects?.join(", ") || "No subjects",
    id: t._id
  }));

  // Demo Data
  const attendanceData = {
    weekly: [
      { name: "Mon", value: 80, status: "Present" },
      { name: "Tue", value: 65, status: "Absent" },
      { name: "Wed", value: 75, status: "Leave" },
      { name: "Thu", value: 90, status: "Present" },
      { name: "Fri", value: 85, status: "Present" },
      { name: "Sat", value: 60, status: "Absent" },
    ],
    monthly: [
      { name: "Week 1", value: 70, status: "Present" },
      { name: "Week 2", value: 82, status: "Leave" },
      { name: "Week 3", value: 90, status: "Present" },
      { name: "Week 4", value: 75, status: "Absent" },
    ],
    yearly: [
      { name: "Jan", value: 80, status: "Present" },
      { name: "Feb", value: 68, status: "Absent" },
      { name: "Mar", value: 85, status: "Leave" },
      { name: "Apr", value: 72, status: "Present" },
      { name: "May", value: 90, status: "Present" },
      { name: "Jun", value: 88, status: "Absent" },
      { name: "Jul", value: 76, status: "Present" },
      { name: "Aug", value: 82, status: "Leave" },
      { name: "Sep", value: 79, status: "Present" },
      { name: "Oct", value: 91, status: "Present" },
      { name: "Nov", value: 84, status: "Absent" },
      { name: "Dec", value: 89, status: "Present" },
    ],
  };

  const handleStudentSubmit = () => {
    if (studentName && studentClass) setPercentage(80);
  };

  const handleTeacherSubmit = () => {
    if (teacherName) setPercentage(85);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen  p-4 sm:p-6 md:p-8">
      {/* Toggle Buttons */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
  {[
    { label: "Class Report", value: "class", color: "" },
    { label: "Student Report", value: "student", color: "" },
    { label: "Teacher Report", value: "teacher", color: "" },
  ].map((btn) => (
    <button
      key={btn.value}
      onClick={() => {
        setSelectedOption(btn.value);
        setPercentage(null);
      }}
      style={{
        background:
          selectedOption === btn.value ? btn.color : "#2563EB", // gray-200 fallback
        color: selectedOption === btn.value ? "" : "#FDE047", // gray-700
        boxShadow: selectedOption === btn.value ? "0 4px 8px rgba(0,0,0,0.1)" : "none",
      }}
      className="w-full sm:w-auto px-6 py-2 rounded-lg font-semibold transition hover:bg-gray-300"
    >
      {btn.label}
    </button>
  ))}
</div>


      {/* Report Section */}
      <AnimatePresence mode="wait">
        {/* CLASS REPORT SECTION */}
        {selectedOption === "class" && (
          <motion.div
            key="class"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-lg max-w-4xl mx-auto w-full"
          >
            <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center sm:text-left">
              Class Attendance Report
            </h2>

            {/* Dropdown + Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <select
                onChange={(e) => setSelectedClass(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={selectedClass}
              >
                <option value="">-- Select Class --</option>
                {classes.map((cls, i) => (
                  <option key={i} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>

              <div className="flex gap-2 justify-center">
                {["weekly", "monthly", "yearly"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                      filter === type
                        ? "bg-[var(--button-primary-text)] text-white"
                        : " hover:bg-[var( --sidebar-active)]"
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={attendanceData[filter]}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var( --text-primary)"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Table */}
            <div className="mt-6">
              <table className="min-w-full border border-gray-300 text-center rounded-lg overflow-hidden">
                <thead style={{background:"var(--gradient-yellow)"}}>
                  <tr>
                    <th className="border p-2">Day / Period</th>
                    <th className="border p-2">Attendance %</th>
                    <th className="border p-2">Status</th>
                  </tr>
                </thead>
                <tbody  className="bg-white text-gray-700">
                  {attendanceData[filter].map((row, index) => (
                    <tr
                      key={index}
                      className="odd:bg-white even:bg-gray-50 hover:bg-blue-50"
                    >
                      <td className="border p-2">{row.name}</td>
                      <td className="border p-2">{row.value}%</td>
                      <td
                        className={`border p-2 font-semibold ${
                          row.status === "Present"
                            ? "text-green-600"
                            : row.status === "Absent"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {row.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* STUDENT REPORT SECTION */}
        {selectedOption === "student" && (
          <motion.div
            key="student"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-lg max-w-4xl mx-auto w-full"
          >
            <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center sm:text-left">
              Student Attendance Report
            </h2>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <select
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Student</option>
                {studentOptions.map((student, i) => (
                  <option key={i} value={student.name}>
                    {student.name} ({student.class})
                  </option>
                ))}
              </select>
              <select
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                className="p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Class</option>
                {classes.map((cls, i) => (
                  <option key={i} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
              <button
                onClick={handleStudentSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:scale-105 transition"
              >
                View Report
              </button>
            </div>

            {/* Filters */}
            <div className="flex justify-center gap-3 mb-6">
              {["weekly", "monthly", "yearly"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    filter === type
                      ? "bg-pink-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            {/* Chart + Table */}
            {percentage && (
              <>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={attendanceData[filter]}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#16A34A"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>

                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr className="bg-pink-100">
                        <th className="border p-2">Day / Period</th>
                        <th className="border p-2">Attendance %</th>
                        <th className="border p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData[filter].map((row, index) => (
                        <tr
                          key={index}
                          className="odd:bg-white even:bg-gray-50 hover:bg-pink-50"
                        >
                          <td className="border p-2">{row.name}</td>
                          <td className="border p-2">{row.value}%</td>
                          <td
                            className={`border p-2 font-semibold ${
                              row.status === "Present"
                                ? "text-green-600"
                                : row.status === "Absent"
                                ? "text-red-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {row.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* ✅ TEACHER REPORT SECTION */}
        {selectedOption === "teacher" && (
          <motion.div
            key="teacher"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-lg max-w-4xl mx-auto w-full"
          >
            <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center sm:text-left">
              Teacher Attendance Report
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <select
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="flex-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Select Teacher</option>
                {teacherOptions.map((teacher, i) => (
                  <option key={i} value={teacher.name}>
                    {teacher.name} ({teacher.subjects})
                  </option>
                ))}
              </select>
              <button
                onClick={handleTeacherSubmit}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:scale-105 transition"
              >
                View Report
              </button>
            </div>

            {percentage && (
              <>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={attendanceData[filter]}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#6366f1"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>

                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr className="bg-indigo-100">
                        <th className="border p-2">Day</th>
                        <th className="border p-2">Attendance %</th>
                        <th className="border p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData[filter].map((row, index) => (
                        <tr
                          key={index}
                          className="odd:bg-white even:bg-gray-50 hover:bg-indigo-50"
                        >
                          <td className="border p-2">{row.name}</td>
                          <td className="border p-2">{row.value}%</td>
                          <td
                            className={`border p-2 font-semibold ${
                              row.status === "Present"
                                ? "text-green-600"
                                : row.status === "Absent"
                                ? "text-red-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {row.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AttendanceReport;
