import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetAdminClassesQuery, useAddAdminClassMutation, useDeleteAdminClassMutation, useGetTeachersQuery } from "../../../../Api/SchoolApi";
import { FaSchool, FaPlus, FaEye, FaEdit, FaTrash, FaUser, FaBook, FaClock } from "react-icons/fa";

const ManageClasses = () => {
  const { data: apiClasses = [], isLoading, refetch } = useGetAdminClassesQuery();
  const { data: teachers = [] } = useGetTeachersQuery();
  const [addClassMutation] = useAddAdminClassMutation();
  const [deleteClassMutation] = useDeleteAdminClassMutation();
  
  const [selectedClass, setSelectedClass] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    section: "",
    classTeacher: "",
    subjects: "",
    capacity: 40,
    startTime: "09:00",
    endTime: "15:00"
  });

  const classNames = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];
  const sections = ["A", "B", "C", "D", "E"];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div className="ml-4 text-xl text-gray-600">Loading classes...</div>
      </div>
    );
  }

  const handleAddClass = async (e) => {
    e.preventDefault();
    try {
      await addClassMutation({
        ...formData,
        subjects: formData.subjects.split(",").map(s => s.trim()),
        schedule: {
          startTime: formData.startTime,
          endTime: formData.endTime
        }
      });
      setShowAddForm(false);
      setFormData({
        name: "",
        section: "",
        classTeacher: "",
        subjects: "",
        capacity: 40,
        startTime: "09:00",
        endTime: "15:00"
      });
      refetch();
    } catch (error) {
      console.error("Error adding class:", error);
    }
  };

  const handleDelete = async (classId) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        await deleteClassMutation(classId);
        refetch();
      } catch (error) {
        console.error("Error deleting class:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedClass && !showAddForm ? (
            <motion.div
              key="classList"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <FaSchool className="text-3xl text-blue-600" />
                  <h1 className="text-3xl font-bold text-gray-800">Manage Classes</h1>
                </div>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                >
                  <FaPlus /> Add Class
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apiClasses.map((cls) => (
                  <motion.div
                    key={cls._id}
                    whileHover={{ y: -5 }}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{cls.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <FaUser className="text-green-500" />
                          <span>{cls.classTeacher?.name || "No Teacher"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <FaBook className="text-blue-500" />
                          <span>{cls.students?.length || 0} Students</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaClock className="text-orange-500" />
                          <span>Capacity: {cls.capacity}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                      <span>Subjects: {cls.subjects?.join(", ") || "None"}</span>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedClass(cls)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
                      >
                        <FaEye /> View
                      </button>
                      <button
                        onClick={() => handleDelete(cls._id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : showAddForm ? (
            <motion.div
              key="addForm"
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Class</h2>
              <form onSubmit={handleAddClass} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class Name</label>
                  <select
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Class</option>
                    {classNames.map((className) => (
                      <option key={className} value={className}>{className}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({...formData, section: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Section</option>
                    {sections.map((section) => (
                      <option key={section} value={section}>{section}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class Teacher</label>
                  <select
                    value={formData.classTeacher}
                    onChange={(e) => setFormData({...formData, classTeacher: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map((teacher) => (
                      <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subjects (comma separated)</label>
                  <input
                    type="text"
                    value={formData.subjects}
                    onChange={(e) => setFormData({...formData, subjects: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Math, English, Science"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2 flex gap-4">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
                  >
                    Add Class
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="classDetails"
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Class Details: {selectedClass.name}</h2>
                <button
                  onClick={() => setSelectedClass(null)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                >
                  ← Back
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Class Information</h3>
                  <p><strong>Section:</strong> {selectedClass.section}</p>
                  <p><strong>Capacity:</strong> {selectedClass.capacity}</p>
                  <p><strong>Current Students:</strong> {selectedClass.students?.length || 0}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Teacher & Schedule</h3>
                  <p><strong>Class Teacher:</strong> {selectedClass.classTeacher?.name || "Not assigned"}</p>
                  <p><strong>Schedule:</strong> {selectedClass.schedule?.startTime} - {selectedClass.schedule?.endTime}</p>
                  <p><strong>Students:</strong> {selectedClass.students?.length || 0}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Subjects</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedClass.subjects?.map((subject, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {subject}
                    </span>
                  )) || <span className="text-gray-500">No subjects assigned</span>}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ManageClasses;