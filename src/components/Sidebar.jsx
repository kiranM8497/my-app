import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineMail,
  AiOutlineFileText,
  AiOutlineBarChart,
  AiOutlineClose,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";

const Sidebar = ({ isOpen, toggleSidebar, isCollapsed, toggleCollapse }) => {
  const location = useLocation();

  const menuItems = [
    { icon: AiOutlineHome, label: "Dashboard", path: "/" },
    { icon: AiOutlineUser, label: "Profile", path: "/profile" },
    { icon: AiOutlineMail, label: "Messages", path: "/messages" },
    { icon: AiOutlineFileText, label: "Documents", path: "/documents" },
    { icon: AiOutlineBarChart, label: "Analytics", path: "/analytics" },
    { icon: AiOutlineSetting, label: "Settings", path: "/settings" },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
        transition-all duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${isCollapsed ? "w-20" : "w-64"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            {!isCollapsed && (
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                Aceternity
              </h1>
            )}
            <button
              onClick={toggleCollapse}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden lg:flex"
            >
              {isCollapsed ? (
                <AiOutlineRight size={20} />
              ) : (
                <AiOutlineLeft size={20} />
              )}
            </button>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
            >
              <AiOutlineClose size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-3 rounded-lg transition-all duration-200
                    ${isCollapsed ? "px-3 py-3 justify-center" : "px-3 py-2"}
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    }
                  `}
                  title={isCollapsed ? item.label : ""}
                >
                  <item.icon size={isCollapsed ? 24 : 20} />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div
              className={`flex items-center gap-3 ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <div
                className={`bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center ${
                  isCollapsed ? "w-10 h-10" : "w-8 h-8"
                }`}
              >
                <span
                  className={`text-white font-medium ${
                    isCollapsed ? "text-base" : "text-sm"
                  }`}
                >
                  JD
                </span>
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    John Doe
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    john@example.com
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
