import React, { useState } from "react";
import { useGetStudentLeavesQuery } from "../../../Api/SchoolApi";

const LeaveManagement = () => {
  // ✅ सभी hooks सबसे ऊपर
  const { data: apiLeaves = [], isLoading } = useGetStudentLeavesQuery();
  const [filter, setFilter] = useState("All"); // ✅ यहाँ move किया

  // Transform API data - conditional check के साथ
  const leaves = isLoading ? [] : apiLeaves.map(leave => ({
    id: leave._id,
    studentName: leave.requester?.name + " " + leave.requester?.lastname || "Unknown Student",
    class: leave.requester?.class + " - " + leave.requester?.section || "Unknown Class",
    from: new Date(leave.fromDate).toLocaleDateString(),
    to: new Date(leave.toDate).toLocaleDateString(),
    reason: leave.reason,
    status: leave.status,
    teacher: leave.teacher?.name || "Unknown Teacher",
  }));
  
  // ✅ Loading check hooks के बाद
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading leave requests...</div>
      </div>
    );
  }

  // Function for color badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Filtered data
  const filteredLeaves =
    filter === "All"
      ? leaves
      : leaves.filter((leave) => leave.status === filter);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Heading */}
      <p className="text-3xl font-bold text-gray-800 tracking-tight mb-2">
        Manage Leave
      </p>
      <p className="text-gray-500 text-sm sm:text-base mb-6 leading-relaxed">
        View all student leave requests and their current status.
      </p>

      {/* Filter Buttons */}
      <div className="flex justify-center flex-wrap gap-4 mb-6">
        {["All", "Pending", "Approved", "Rejected"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 
              ${
                filter === type
                  ? "bg-yellow-400 text-gray-800"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="min-w-full text-left text-gray-700">
          <thead
            className="sticky top-0"
            style={{
              background: "linear-gradient(to right, #FDE68A, #FACC15)",
            }}
          >
            <tr>
              <th className="p-3">Student Name</th>
              <th className="p-3">Class</th>
              <th className="p-3">From</th>
              <th className="p-3">To</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Status</th>
              <th className="p-3">Teacher Name</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeaves.length > 0 ? (
              filteredLeaves.map((leave) => (
                <tr
                  key={leave.id}
                  className="border-b hover:bg-yellow-50 transition-all"
                >
                  <td className="p-3 font-medium">{leave.studentName}</td>
                  <td className="p-3">{leave.class}</td>
                  <td className="p-3">{leave.from}</td>
                  <td className="p-3">{leave.to}</td>
                  <td className="p-3">{leave.reason}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                        leave.status
                      )}`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td className="p-3">{leave.teacher}</td>
                  <td className="p-3">
                    <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center text-gray-500 py-6 font-medium"
                >
                  No {filter !== "All" ? filter : ""} leave requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveManagement;