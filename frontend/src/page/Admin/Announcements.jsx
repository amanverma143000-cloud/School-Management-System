import React, { useState, useEffect } from "react";
import { noticeAPI } from "../../services/api";
import { useAuth } from "../../context/AuthProvider";

const Announcements = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const { user } = useAuth();

  const fetchNotices = async () => {
    try {
      setIsLoading(true);
      const response = await noticeAPI.getAllNotices();
      const notices = response?.notices || [];
      setAnnouncements(notices.map(notice => ({
        id: notice._id,
        title: notice.title || "No Title",
        message: notice.description || "No Description",
        audience: notice.audience || "All",
        isImportant: notice.isImportant || false,
        createdAt: notice.createdAt ? new Date(notice.createdAt).toLocaleDateString() : "N/A"
      })));
    } catch (err) {
      console.error("Error fetching notices:", err);
      setAnnouncements([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // Add new announcement
  const handleAdd = async () => {
    if (title.trim() === "" || message.trim() === "") {
      alert("Please fill all fields!");
      return;
    }

    try {
      const noticeData = { 
        title, 
        description: message,
        audience: "All",
        isImportant 
      };
      
      await noticeAPI.createNotice(noticeData);
      
      setTitle("");
      setMessage("");
      setIsImportant(false);
      fetchNotices();
      alert("Announcement created successfully!");
    } catch (err) {
      console.error("Error adding announcement:", err);
      alert(`Failed to create announcement: ${err.response?.data?.message || err.message}`);
    }
  };

  // Delete announcement
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;
    try {
      await noticeAPI.deleteNotice(id);
      alert("Announcement deleted successfully!");
      fetchNotices();
    } catch (err) {
      console.error("Error deleting announcement:", err);
      alert("Failed to delete announcement!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Announcements
      </h1>

      {/* Create New Announcement */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Create New Announcement
        </h2>

        {/* Input Fields */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter announcement title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <textarea
            placeholder="Enter announcement message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 h-28 resize-none"
          />

          {/* Importance Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsImportant(!isImportant)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isImportant 
                  ? "bg-red-500 text-white hover:bg-red-600" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {isImportant ? "🔴 Important" : "⚪ Normal"}
            </button>
            <span className="text-sm text-gray-600">
              Click to toggle importance
            </span>
          </div>

          <button
            onClick={handleAdd}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-2 rounded-lg transition-all"
          >
            Add Announcement
          </button>
        </div>
      </div>

      {/* All Announcements */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          All Announcements
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-500 py-8">Loading...</p>
        ) : announcements.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No announcements available.
          </p>
        ) : (
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-yellow-200">
              <tr>
                <th className="p-3 text-left font-semibold text-gray-700">#</th>
                <th className="p-3 text-left font-semibold text-gray-700">
                  Title
                </th>
                <th className="p-3 text-left font-semibold text-gray-700">
                  Message
                </th>
                <th className="p-3 text-left font-semibold text-gray-700">
                  Audience
                </th>
                <th className="p-3 text-left font-semibold text-gray-700">
                  Date
                </th>
                <th className="p-3 text-left font-semibold text-gray-700">
                  Status
                </th>
                <th className="p-3 text-left font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {announcements.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-yellow-50 transition-all"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-medium text-gray-800">{item.title}</td>
                  <td className="p-3 text-gray-600">{item.message}</td>
                  <td className="p-3">{item.audience}</td>
                  <td className="p-3">{item.createdAt}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.isImportant 
                        ? "bg-red-100 text-red-700" 
                        : "bg-green-100 text-green-700"
                    }`}>
                      {item.isImportant ? "Important" : "Normal"}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Announcements;