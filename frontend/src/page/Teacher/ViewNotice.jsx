import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Bell } from "lucide-react";
import { useGetNoticesQuery } from "../../../Api/SchoolApi";

const ViewNotice = () => {
  const { data: noticesResponse, isLoading, error } = useGetNoticesQuery();
  const [selectedNotice, setSelectedNotice] = useState(null);

  const handleNoticeClick = (notice) => {
    setSelectedNotice(notice);
  };

  const handleBack = () => {
    setSelectedNotice(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading notices...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg">
        Error loading notices: {error.message}
      </div>
    );
  }

  const notices = noticesResponse?.notices || [];

  if (selectedNotice) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen flex flex-col items-center py-10 px-6"
        style={{ background: "linear-gradient(to bottom right, #fffdf3, #fffbea, #fff6d9)" }}
      >
        <div 
          style={{
            backgroundColor: "var(--card-bg)",
            boxShadow: "-6px 4px 12px rgba(0, 0, 0, 0.25)",
          }}
          className="rounded-2xl p-8 w-full max-w-3xl border border-yellow-200"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[var(--text-secondary)] flex items-center gap-2">
              <Bell className="w-6 h-6 text-yellow-600" /> 📢 Notice Details
            </h1>
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-yellow-600 hover:text-yellow-800 transition"
            >
              <ArrowLeft size={18} /> Back
            </button>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            {selectedNotice.title}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {selectedNotice.description}
          </p>
          <div className="text-sm text-gray-500 mt-3">
            <p><strong>Audience:</strong> {selectedNotice.audience}</p>
            <p><strong>Important:</strong> {selectedNotice.isImportant ? 'Yes' : 'No'}</p>
            <p><strong>Posted on:</strong> {new Date(selectedNotice.createdAt).toLocaleDateString()}</p>
            {selectedNotice.expiryDate && (
              <p><strong>Expires on:</strong> {new Date(selectedNotice.expiryDate).toLocaleDateString()}</p>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen py-10 px-6"
      style={{ background: "linear-gradient(to bottom right, #fffdf3, #fffbea, #fff6d9)" }}
    >
      <div 
        style={{
          backgroundColor: "var(--card-bg)",
          boxShadow: "-6px 4px 12px rgba(0, 0, 0, 0.25)",
        }}
        className="max-w-4xl mx-auto rounded-2xl border border-yellow-200 p-8"
      >
        <div className="flex items-center gap-2 mb-6">
          <Bell className="text-yellow-600 w-7 h-7" />
          <h1 className="text-2xl font-bold text-[var(--text-secondary)]">📢 School Notices</h1>
        </div>

        {notices.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No notices available</p>
          </div>
        ) : (
          <>
            {notices.length > 0 && (
              <div
                onClick={() => handleNoticeClick(notices[0])}
                className="cursor-pointer bg-yellow-50 border border-yellow-200 p-6 rounded-xl shadow-sm mb-8 hover:bg-yellow-100 transition"
              >
                <h2 className="text-lg font-semibold text-yellow-800 mb-2">
                  📢 Latest Notice:
                </h2>
                <p className="text-gray-700 font-medium">{notices[0].title}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-500">
                    {new Date(notices[0].createdAt).toLocaleDateString()}
                  </p>
                  {notices[0].isImportant && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      Important
                    </span>
                  )}
                </div>
              </div>
            )}

            {notices.length > 1 && (
              <>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Previous Notices:
                </h3>
                <ul className="space-y-3">
                  {notices.slice(1).map((notice) => (
                    <li
                      key={notice._id}
                      onClick={() => handleNoticeClick(notice)}
                      className="p-4 border border-yellow-200 rounded-xl cursor-pointer hover:bg-yellow-50 transition flex justify-between items-center"
                    >
                      <div>
                        <span className="font-medium text-gray-700">{notice.title}</span>
                        <p className="text-sm text-gray-500 mt-1">Audience: {notice.audience}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500 block">
                          {new Date(notice.createdAt).toLocaleDateString()}
                        </span>
                        {notice.isImportant && (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-1 inline-block">
                            Important
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ViewNotice;
