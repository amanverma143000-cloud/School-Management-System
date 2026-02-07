import React from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const StudentReport = ({ 
  studentOptions, 
  classes, 
  studentName, 
  setStudentName, 
  studentClass, 
  setStudentClass, 
  handleStudentSubmit, 
  filter, 
  setFilter, 
  percentage, 
  chartData 
}) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
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
            <option key={i} value={cls}>{cls}</option>
          ))}
        </select>
        <button
          onClick={handleStudentSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:scale-105 transition"
        >
          View Report
        </button>
      </div>

      <div className="flex justify-center gap-3 mb-6">
        {["weekly", "monthly", "yearly"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              filter === type ? "bg-pink-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {percentage !== null && (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData[filter] || []} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#16A34A" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
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
                {(chartData[filter] || []).map((row, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-50 hover:bg-pink-50">
                    <td className="border p-2">{row.name}</td>
                    <td className="border p-2">{row.value}%</td>
                    <td className={`border p-2 font-semibold ${
                      row.status === "Present" ? "text-green-600" : row.status === "Absent" ? "text-red-600" : "text-yellow-600"
                    }`}>
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
  );
};

export default StudentReport;
