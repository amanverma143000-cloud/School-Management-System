import React from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const TeacherReport = ({ 
  teacherOptions, 
  teacherName, 
  setTeacherName, 
  handleTeacherSubmit, 
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

      <div className="flex justify-center gap-3 mb-6">
        {["weekly", "monthly", "yearly"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              filter === type ? "bg-indigo-600 text-white" : "bg-gray-200 hover:bg-gray-300"
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
              <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
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
                {(chartData[filter] || []).map((row, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-50 hover:bg-indigo-50">
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

export default TeacherReport;
