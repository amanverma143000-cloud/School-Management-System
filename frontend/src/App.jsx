import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./Route/PrivateRoute";

import Navbar from "./Components/Navbar";
import Home from "./page/Homepage/Home";
import Login from "./Components/Login";
import AdminDashboard from "./page/Admin/AdminDashboard";
import TeacherDashboard from "./page/Teacher/TeacherDashboard";
import StudentDashboard from "./page/Student/Dashboard";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public pages with Navbar */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Home />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <Navbar />
            <Login />
          </>
        }
      />

      {/* Role-based dashboards without Navbar */}
      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoute roles={["admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/teacher-dashboard"
        element={
          <PrivateRoute roles={["teacher"]}>
            <TeacherDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/student-dashboard"
        element={
          <PrivateRoute roles={["student"]}>
            <StudentDashboard />
            
          </PrivateRoute>
        }
      />


      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
