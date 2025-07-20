import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import axiosInstance from "./lib/axios";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const { user, loading, setUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleCollapse = () => setSidebarCollapsed(!sidebarCollapsed);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout");

      // Clear local user state
      setUser(null);

      // Redirect to login
      navigate("/auth");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case "/":
        return "Home";
      case "/profile":
        return "Profile";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isCollapsed={sidebarCollapsed}
        toggleCollapse={toggleCollapse}
      />

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        {/* Top bar */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
            >
              <AiOutlineMenu size={20} />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {getPageTitle()}
            </h2>
            <div className="flex items-center gap-2">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
