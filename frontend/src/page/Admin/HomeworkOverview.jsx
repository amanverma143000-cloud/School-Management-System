/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line

const HomeworkOverview = () => {
  // ✅ Dummy Data (API ke bad ye remove hoga)
  const [homeworkData, setHomeworkData] = useState([
    {
      _id: 1,
      subject: "English Grammar",
      teacher: "Mr. Rajesh Sharma",
      date: "2025-10-29",
      className: "8th A",
      description: "Complete the worksheet on Tenses and Active Voice.",
      imageUrl: "https://picsum.photos/800/500?random=1",
    },
    {
      _id: 2,
      subject: "Mathematics",
      teacher: "Ms. Kavita Singh",
      date: "2025-10-29",
      className: "9th B",
      description: "Solve problems from Chapter 6 (Linear Equations).",
      imageUrl: "https://picsum.photos/800/500?random=2",
    },
    {
      _id: 3,
      subject: "Science",
      teacher: "Mr. Rohan Patel",
      date: "2025-10-30",
      className: "10th A",
      description: "Write notes on 'Human Circulatory System'.",
      imageUrl: "https://picsum.photos/800/500?random=3",
    },
    {
      _id: 4,
      subject: "History",
      teacher: "Mr. Vivek Mehta",
      date: "2025-10-31",
      className: "7th A",
      description: "Read and summarize the Revolt of 1857.",
      imageUrl: "https://picsum.photos/800/500?random=4",
    },
    {
      _id: 5,
      subject: "Computer Science",
      teacher: "Mr. Pankaj Kumar",
      date: "2025-11-01",
      className: "10th B",
      description: "Prepare a note on Database Management System.",
      imageUrl: "https://picsum.photos/800/500?random=5",
    },
  ]);

  // ✅ Filters ke state
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // ✅ Ye jagah par future me API se data fetch hoga
  /*
  useEffect(() => {
    fetch("http://localhost:5000/api/homework")  // <-- your backend API URL
      .then((res) => res.json())
      .then((data) => setHomeworkData(data))
      .catch((err) => console.error(err));
  }, []);
  */

  // ✅ Filter logic (multi filter)
  const filteredHomework = homeworkData.filter((item) => {
    return (
      (selectedDate ? item.date === selectedDate : true) &&
      (selectedClass ? item.className === selectedClass : true) &&
      (selectedSubject ? item.subject === selectedSubject : true) &&
      (selectedTeacher ? item.teacher === selectedTeacher : true)
    );
  });

  // ✅ Delete handler
  const handleDelete = (id) => {
    setHomeworkData((prev) => prev.filter((item) => item._id !== id));
  };

  // ✅ View handler
  const handleView = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // ✅ Modal close
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // ✅ Unique filter values (auto generate)
  const classOptions = [...new Set(homeworkData.map((item) => item.className))];
  const subjectOptions = [...new Set(homeworkData.map((item) => item.subject))];
  const teacherOptions = [...new Set(homeworkData.map((item) => item.teacher))];

  return (
    <div className="bg-gradient-to-br min-h-screen p-6 overflow-hidden relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          📚 Homework Overview
        </h2>

        {/* Filter Section */}
        <div className="flex flex-wrap items-center gap-3 mt-4 sm:mt-0">
          {/* Date Filter */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400 transition"
          />

          {/* Class Filter */}
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">All Classes</option>
            {classOptions.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>

          {/* Subject Filter */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">All Subjects</option>
            {subjectOptions.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>

          {/* Teacher Filter */}
          <select
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">All Teachers</option>
            {teacherOptions.map((teach) => (
              <option key={teach} value={teach}>
                {teach}
              </option>
            ))}
          </select>

          {/* Clear All */}
          {(selectedDate ||
            selectedClass ||
            selectedSubject ||
            selectedTeacher) && (
            <button
              onClick={() => {
                setSelectedDate("");
                setSelectedClass("");
                setSelectedSubject("");
                setSelectedTeacher("");
              }}
              className="text-sm text-purple-600 hover:underline"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Cards Section */}
      <div className="rounded-xl overflow-y-auto max-h-[70vh] p-5 ">
  {filteredHomework.length > 0 ? (
    <div className="flex flex-col gap-5">
      {filteredHomework.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.02, y: -3 }} // thoda upar uthta hua feel
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          style={{background:"var(--card-bg)"}}
          className="border border-gray-100 rounded-xl shadow-2xl hover:border-transparent  p-5"
        >
                {/* Card Content */}
                <div className="flex flex-wrap items-center justify-between text-gray-700 gap-3 sm:gap-4">
                  <p className="font-semibold text-purple-700 text-lg">
                    📘 {item.subject}
                  </p>
                  <p>👨‍🏫 {item.teacher}</p>
                  <p>🏫 {item.className}</p>
                  <p>📅 {item.date}</p>
                </div>

                <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                  📝 {item.description}
                </p>

                {/* Buttons */}
                <div className="mt-4 flex gap-3 justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleView(item.imageUrl)}
                    className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                  >
                    👁 View
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
                  >
                    🗑 Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center p-4">
            No homework found for this filter.
          </p>
        )}
      </div>

      {/* ✅ Modal Image Viewer */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-white rounded-lg overflow-hidden shadow-2xl max-w-3xl w-[90%]"
            >
              <img
                src={selectedImage}
                alt="Homework"
                className="w-full h-auto object-contain"
              />
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-red-700 transition"
              >
                ✖ Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeworkOverview;