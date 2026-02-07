import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { studentAPI, attendanceAPI } from "../../../services/api";

const ClassReport = ({ classes, selectedClass, setSelectedClass, filter, setFilter }) => {
  const [chartData, setChartData] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedClass && students.length > 0 && attendance.length > 0) {
      processClassData();
    }
  }, [selectedClass, filter, students, attendance]);

  const fetchData = async () => {
    try {
      const [studentsData, attendanceData] = await Promise.all([
        studentAPI.getAllStudents(),
        attendanceAPI.getAllStudentsAttendance()
      ]);
      console.log('Students Data:', studentsData);
      console.log('Attendance Data:', attendanceData);
      
      setStudents(Array.isArray(studentsData) ? studentsData : []);
      setAttendance(Array.isArray(attendanceData) ? attendanceData : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setStudents([]);
      setAttendance([]);
    }
  };

  const processClassData = () => {
    if (!Array.isArray(students) || !Array.isArray(attendance)) {
      console.error('Invalid data format:', { students, attendance });
      setChartData([]);
      return;
    }
    
    const classStudents = students.filter(s => `${s.class} - ${s.section}` === selectedClass);
    const classStudentIds = classStudents.map(s => s._id);
    const classAttendance = attendance.filter(att => classStudentIds.includes(att.student?._id || att.studentId));
    
    const processed = processAttendanceData(classAttendance, filter);
    setChartData(processed);
  };

  const processAttendanceData = (records, filterType) => {
    if (!records || records.length === 0) return [];

    if (filterType === 'weekly') {
      const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const last7Days = records.slice(-7);
      return weekDays.map((day, index) => {
        const record = last7Days[index];
        if (record) {
          const present = record.status === 'Present' ? 100 : 0;
          return { name: day, value: present, status: record.status };
        }
        return { name: day, value: 0, status: 'N/A' };
      });
    } else if (filterType === 'monthly') {
      const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      const last30Days = records.slice(-30);
      return weeks.map((week, index) => {
        const weekData = last30Days.slice(index * 7, (index + 1) * 7);
        const presentCount = weekData.filter(d => d.status === 'Present').length;
        const percentage = weekData.length > 0 ? Math.round((presentCount / weekData.length) * 100) : 0;
        const status = percentage > 75 ? 'Present' : percentage > 50 ? 'Leave' : 'Absent';
        return { name: week, value: percentage, status };
      });
    } else {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months.map((month, index) => {
        const monthData = records.filter(record => {
          const recordDate = new Date(record.date);
          return recordDate.getMonth() === index;
        });
        const presentCount = monthData.filter(d => d.status === 'Present').length;
        const percentage = monthData.length > 0 ? Math.round((presentCount / monthData.length) * 100) : 0;
        const status = percentage > 75 ? 'Present' : percentage > 50 ? 'Leave' : 'Absent';
        return { name: month, value: percentage, status };
      });
    }
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
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

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          onChange={(e) => setSelectedClass(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={selectedClass}
        >
          <option value="">-- Select Class --</option>
          {classes.map((cls, i) => (
            <option key={i} value={cls}>{cls}</option>
          ))}
        </select>

        <div className="flex gap-2 justify-center">
          {["weekly", "monthly", "yearly"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                filter === type ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6">
        <table className="min-w-full border border-gray-300 text-center rounded-lg overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="border p-2">Day / Period</th>
              <th className="border p-2">Attendance %</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-700">
            {chartData.length > 0 ? chartData.map((row, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50 hover:bg-blue-50">
                <td className="border p-2">{row.name}</td>
                <td className="border p-2">{row.value}%</td>
                <td className={`border p-2 font-semibold ${
                  row.status === "Present" ? "text-green-600" : row.status === "Absent" ? "text-red-600" : "text-yellow-600"
                }`}>
                  {row.status}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="3" className="border p-4 text-gray-500">
                  {selectedClass ? 'No attendance data available' : 'Please select a class'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ClassReport;
