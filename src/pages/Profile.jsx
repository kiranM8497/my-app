import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../components/lib/axios";

const ProfilePage = () => {
  const [activeOption, setActiveOption] = useState("Dashboard");
  const { user, loading, setUser } = useAuth();
  const navigationOptions = [
    { id: "dashboard", icon: "📊", text: "Dashboard" },
    { id: "confessions", icon: "📝", text: "My Confessions" },
    { id: "chat", icon: "💬", text: "Chat Rooms" },
    { id: "saved", icon: "⭐", text: "Saved Posts" },
    { id: "mood", icon: "🎭", text: "Mood Tracker" },
    { id: "privacy", icon: "🔒", text: "Privacy Settings" },
    { id: "notifications", icon: "🔔", text: "Notifications" },
    { id: "safety", icon: "🛡️", text: "Safety Support" },
  ];

  const activities = [
    {
      icon: "📝",
      text: 'Posted confession: "Feeling overwhelmed with life lately..."',
      time: "2 hours ago",
    },
    {
      icon: "💬",
      text: 'Joined room: "Mental Health Support"',
      time: "1 day ago",
    },
    {
      icon: "💭",
      text: 'Commented on: "Anonymous confession about work stress"',
      time: "3 days ago",
    },
    {
      icon: "🎭",
      text: "Updated mood tracker: Feeling better today",
      time: "5 days ago",
    },
  ];

  const quickActions = [
    {
      id: "confession",
      icon: "📝",
      text: "Write Confession",
      desc: "Share your thoughts anonymously",
    },
    {
      id: "room",
      icon: "💬",
      text: "Join Chat Room",
      desc: "Connect with others",
    },
    {
      id: "media",
      icon: "📷",
      text: "Upload Media",
      desc: "Share photos or videos",
    },
    {
      id: "feelings",
      icon: "❤️",
      text: "Express Feelings",
      desc: "Share what's on your mind",
    },
  ];

  const handleOptionClick = (option) => {
    setActiveOption(option.text);
  };

  const handleQuickAction = (actionType) => {
    console.log(`Opening ${actionType}...`);
    // Add your action logic here
  };
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout");

      // Clear local user state
      setUser(null);

      // Redirect to login
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-300 font-sans overflow-x-hidden relative">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-800/5 via-transparent to-gray-700/5"></div>
        <div className="absolute top-1/5 left-1/5 w-96 h-96 bg-gray-600/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/5 right-1/5 w-96 h-96 bg-gray-500/3 rounded-full blur-3xl"></div>
        <div className="absolute top-2/5 left-2/5 w-64 h-64 bg-gray-700/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto p-5 relative z-10">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-800/95 backdrop-blur-xl rounded-3xl p-10 mb-8 border border-gray-700/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>

          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center mb-8">
            <div className="relative">
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-white text-xs font-medium shadow-xl">
                Anonymous Avatar
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded-full animate-spin opacity-30 blur-sm"></div>
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent mb-4">
                @username_here
              </h1>
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg border border-gray-700/30 rounded-2xl p-5 text-gray-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-gray-600/5 to-transparent animate-pulse"></div>
                Your bio goes here... Share a little about yourself while
                staying anonymous. Express your thoughts, feelings, and what
                brings you to this space. Let others know what resonates with
                you.
              </div>
            </div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-6 mb-8 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-45 from-transparent via-gray-600/10 to-transparent animate-pulse"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {[
              { number: "47", label: "Confessions" },
              { number: "128", label: "Comments" },
              { number: "12", label: "Rooms Joined" },
              { number: "89", label: "Days Active" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wide font-medium mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col lg:flex-row gap-5 mb-8">
          <button className="bg-gradient-to-r from-gray-700 to-gray-600 text-white px-8 py-4 rounded-xl font-semibold uppercase tracking-wide transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-gray-700/50 relative overflow-hidden hover:from-gray-600 hover:to-gray-500">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full hover:translate-x-full transition-transform duration-500"></div>
            + New Confession
          </button>
          <button className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg text-gray-300 px-8 py-4 rounded-xl font-semibold uppercase tracking-wide border border-gray-700/30 transition-all duration-300 hover:transform hover:-translate-y-1 hover:bg-gray-700/90 hover:text-white">
            Edit Profile
          </button>
          <button className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg text-gray-300 px-8 py-4 rounded-xl font-semibold uppercase tracking-wide border border-gray-700/30 transition-all duration-300 hover:transform hover:-translate-y-1 hover:bg-gray-700/90 hover:text-white">
            Share Profile
          </button>
        </div>

        {/* Navigation Options */}
        <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-8 mb-8 shadow-xl">
          <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            Navigation
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {navigationOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleOptionClick(option)}
                className={`bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg border border-gray-700/30 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:border-gray-600/50 hover:shadow-xl hover:shadow-gray-700/20 text-center relative overflow-hidden ${
                  activeOption === option.text
                    ? "bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-lg shadow-gray-700/40 border-gray-600"
                    : ""
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-600/10 to-gray-700/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <div
                  className={`w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center text-xl shadow-lg ${
                    activeOption === option.text
                      ? "bg-white/10"
                      : "bg-gradient-to-r from-gray-700 to-gray-600"
                  }`}
                >
                  {option.icon}
                </div>
                <div className="text-sm font-semibold tracking-wide relative z-10">
                  {option.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-8 mb-8 shadow-xl">
          <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            Recent Activities
          </h3>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center p-5 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg border border-gray-700/30 rounded-2xl transition-all duration-300 hover:transform hover:translate-x-2 hover:border-gray-600/50 hover:shadow-lg hover:shadow-gray-700/10 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-gray-600 to-gray-700 scale-y-0 hover:scale-y-100 transition-transform duration-300"></div>
                <div className="w-13 h-13 bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl flex items-center justify-center text-lg mr-5 shadow-lg">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <div className="text-gray-300 font-medium mb-1">
                    {activity.text}
                  </div>
                  <div className="text-gray-500 text-sm">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-8 shadow-xl">
          <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {quickActions.map((action) => (
              <div
                key={action.id}
                onClick={() => handleQuickAction(action.id)}
                className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg border border-gray-700/30 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:border-gray-600/50 hover:shadow-xl hover:shadow-gray-700/20 text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-600/10 to-gray-700/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-14 h-14 bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl mx-auto mb-4 flex items-center justify-center text-2xl shadow-lg">
                  {action.icon}
                </div>
                <div className="text-base font-semibold mb-2 tracking-wide relative z-10">
                  {action.text}
                </div>
                <div className="text-sm text-gray-500 relative z-10">
                  {action.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
