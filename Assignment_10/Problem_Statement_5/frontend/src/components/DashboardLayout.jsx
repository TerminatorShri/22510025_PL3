import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardLayout = () => {
  const { user } = useAuth();
  const location = useLocation(); // Hook to get the current location

  return (
    <div className="flex flex-col h-screen">
      {/* Header with Event Planner title and user name */}
      <header className="bg-blue-700 text-white p-4 flex justify-between items-center">
        <h1 className="rowdy-font text-lg font-bold">Event Planner</h1>
        <span className="tajawal-font text-lg">
          Hello, {user.name || "User"}👋
        </span>
      </header>

      <div className="flex flex-col flex-grow p-4">
        {/* Navigation options centered in the middle */}
        <nav className="tajawal-font flex justify-center mb-4 space-x-4 p-2 rounded-lg">
          <Link
            to="/dashboard/events"
            className={`p-2 rounded font-bold ${
              location.pathname === "/dashboard/events"
                ? "bg-blue-600 text-white"
                : "text-blue-500"
            }`}
          >
            Events
          </Link>
          <Link
            to="/dashboard/registered"
            className={`p-2 rounded font-bold ${
              location.pathname === "/dashboard/registered"
                ? "bg-blue-600 text-white"
                : "text-blue-500"
            }`}
          >
            Registered
          </Link>
          <Link
            to="/dashboard/admin"
            className={`p-2 rounded font-bold ${
              location.pathname === "/dashboard/admin"
                ? "bg-blue-600 text-white"
                : "text-blue-500"
            }`}
          >
            Admin
          </Link>
        </nav>

        {/* Content area for displaying routes */}
        <div className="flex-grow mt-6">
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;
