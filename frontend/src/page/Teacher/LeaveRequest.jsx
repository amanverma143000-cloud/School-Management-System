import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { leaveAPI } from "../../services/api";

const LeaveRequests = () => {
  const [leaves, setLeaves] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await leaveAPI.getAllLeaves();
        const apiLeaves = Array.isArray(response) ? response : [];
        const pendingLeaves = apiLeaves
          .filter(leave => leave.status === "Pending")
          .map(leave => ({
            id: leave._id,
            student: leave.requester?.name + " " + (leave.requester?.lastname || ""),
            className: (leave.requester?.class || "") + " - " + (leave.requester?.section || ""),
            date: new Date(leave.fromDate).toLocaleDateString() + " to " + new Date(leave.toDate).toLocaleDateString(),
            reason: leave.reason,
            fromDate: new Date(leave.fromDate).toLocaleDateString(),
            toDate: new Date(leave.toDate).toLocaleDateString()
          }));
        setLeaves(pendingLeaves);
      } catch (err) {
        console.error("Error fetching leaves:", err);
        setLeaves([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, []);

  const handleOpenApplication = (leave) => setSelectedLeave(leave);
  const handleBack = () => setSelectedLeave(null);
  const handleConfirmLeave = async (id) => {
    try {
      await leaveAPI.updateLeaveStatus(id, "Approved");
      alert("Leave approved successfully!");
      setLeaves(prev => prev.filter(l => l.id !== id));
      setSelectedLeave(null);
    } catch (err) {
      console.error("Error approving leave:", err);
      alert("Failed to approve leave!");
    }
  };
  const handleCancelLeave = async (id) => {
    try {
      await leaveAPI.updateLeaveStatus(id, "Rejected");
      alert("Leave rejected successfully!");
      setLeaves(prev => prev.filter(l => l.id !== id));
      setSelectedLeave(null);
    } catch (err) {
      console.error("Error rejecting leave:", err);
      alert("Failed to reject leave!");
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading leaves...</div>;

  if (selectedLeave) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen p-6 flex justify-center items-start pt-10"
        style={{ background: "linear-gradient(to bottom right, #fffdf3, #fffbea, #fff6d9)" }}
      >
        <div 
          style={{
            backgroundColor: "var(--card-bg)",
            boxShadow: "-6px 4px 12px rgba(0, 0, 0, 0.25)",
          }}
          className="rounded-2xl max-w-lg w-full p-8 text-gray-700 border border-yellow-200"
        >
          <p className="text-left mb-6">To,</p>
          <p className="font-semibold mb-1">The Principal</p>
          <p className="mb-4">Your School Name</p>

          <p className="font-semibold mb-3">Subject: Leave Application</p>

          <p className="mb-4">Respected Sir/Madam,</p>
          <p className="mb-4">
            I, <span className="font-semibold">{selectedLeave.student}</span>, of class <span className="font-semibold">{selectedLeave.className}</span>, would like to inform you that I am unable to attend school on <span className="font-semibold">{selectedLeave.date}</span> due to <span className="font-semibold">{selectedLeave.reason}</span>.
          </p>
          <p className="mb-4">Kindly grant me leave for the mentioned date.</p>

          <p className="mb-6">Thanking you,</p>
          <p className="font-semibold">From: {selectedLeave.student}</p>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => handleConfirmLeave(selectedLeave.id)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
            >
              Confirm Leave
            </button>
            <button
              onClick={() => handleCancelLeave(selectedLeave.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
            >
              Cancel Leave
            </button>
          </div>

          <button
            onClick={handleBack}
            className="mt-4 text-yellow-600 hover:text-yellow-800"
          >
            ← Back
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen p-6"
      style={{ background: "linear-gradient(to bottom right, #fffdf3, #fffbea, #fff6d9)" }}
    >
      <div 
        style={{
          backgroundColor: "var(--card-bg)",
          boxShadow: "-6px 4px 12px rgba(0, 0, 0, 0.25)",
        }}
        className="max-w-4xl mx-auto rounded-2xl border border-yellow-200 p-6"
      >
        <h1 className="text-3xl font-bold text-[var(--text-secondary)] mb-6">📋 Pending Leave Requests</h1>
        {leaves.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No pending leave requests.</p>
        ) : (
          <table className="min-w-full border border-yellow-200 rounded-xl overflow-hidden">
            <thead className="bg-yellow-50">
              <tr>
                <th className="px-4 py-2 border border-yellow-200 text-left">Student</th>
                <th className="px-4 py-2 border border-yellow-200 text-left">Class</th>
                <th className="px-4 py-2 border border-yellow-200 text-left">Date</th>
                <th className="px-4 py-2 border border-yellow-200 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id} className="hover:bg-yellow-50">
                  <td className="px-4 py-2 border border-yellow-200">{leave.student}</td>
                  <td className="px-4 py-2 border border-yellow-200">{leave.className}</td>
                  <td className="px-4 py-2 border border-yellow-200">{leave.date}</td>
                  <td className="px-4 py-2 border border-yellow-200 text-center">
                    <button
                      onClick={() => handleOpenApplication(leave)}
                      style={{ backgroundColor: "var(--primary-color)" }}
                      className="hover:bg-yellow-500 text-gray-800 px-3 py-1 rounded-xl"
                    >
                      Open Application
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
};

export default LeaveRequests;
