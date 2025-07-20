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
      type: "post",
    },
    {
      icon: "💬",
      text: 'Joined room: "Mental Health Support"',
      time: "1 day ago",
      type: "join",
    },
    {
      icon: "💭",
      text: 'Commented on: "Anonymous confession about work stress"',
      time: "3 days ago",
      type: "comment",
    },
    {
      icon: "🎭",
      text: "Updated mood tracker: Feeling better today",
      time: "5 days ago",
      type: "mood",
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
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div
      className="min-h-screen text-white font-sans relative"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(30, 41, 59, 0.45) 0%, rgba(51, 65, 85, 0.45) 50%, rgba(71, 85, 105, 0.45) 100%), 
                         url('https://img.freepik.com/free-vector/dark-hexagonal-background-with-gradient-color_79603-1409.jpg?semt=ais_hybrid&w=740')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Additional overlay for better content readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-transparent to-slate-900/50 backdrop-blur-[0.5px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-6">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-white/95 to-gray-100/95 backdrop-blur-md text-gray-900 rounded-2xl p-6 md:p-8 mb-6 border border-white/30 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center border-4 border-white shadow-2xl">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white text-sm font-semibold">
                  Anonymous
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full border-4 border-white shadow-lg"></div>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                @username_here
              </h1>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-gray-700 border border-gray-300/50 shadow-sm">
                <p className="leading-relaxed">
                  Your bio goes here... Share a little about yourself while
                  staying anonymous. Express your thoughts, feelings, and what
                  brings you to this space. Let others know what resonates with
                  you.
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/30 shadow-2xl text-gray-900">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: "47",
                label: "Confessions",
                color: "from-blue-600 to-blue-700",
              },
              {
                number: "128",
                label: "Comments",
                color: "from-purple-600 to-purple-700",
              },
              {
                number: "12",
                label: "Rooms Joined",
                color: "from-emerald-600 to-emerald-700",
              },
              {
                number: "89",
                label: "Days Active",
                color: "from-orange-600 to-orange-700",
              },
            ].map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div
                  className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-all duration-300`}
                >
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-wide font-medium mt-1 group-hover:text-gray-700 transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm">
            ✏️ New Confession
          </button>
          <button className="bg-white/95 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-gray-900 px-6 py-3 rounded-xl font-semibold border border-white/50 transition-all duration-300 shadow-md hover:shadow-lg">
            Edit Profile
          </button>
          <button className="bg-white/95 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-gray-900 px-6 py-3 rounded-xl font-semibold border border-white/50 transition-all duration-300 shadow-md hover:shadow-lg">
            Share Profile
          </button>
        </div>

        {/* Navigation Grid */}
        <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl p-6 mb-6 border border-slate-600/50 shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-6">Navigation</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {navigationOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleOptionClick(option)}
                className={`rounded-xl p-5 cursor-pointer transition-all duration-300 text-center border backdrop-blur-sm ${
                  activeOption === option.text
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 border-blue-400/50 shadow-lg text-white"
                    : "bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:border-white/30 shadow-md hover:shadow-lg text-gray-200 hover:text-white"
                }`}
              >
                <div className="text-2xl mb-3">{option.icon}</div>
                <div className="text-sm font-semibold">{option.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/30 shadow-2xl text-gray-900">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Recent Activities
          </h3>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-white/80 backdrop-blur-sm hover:bg-white/95 rounded-xl transition-all duration-300 cursor-pointer border border-gray-200/50 shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-slate-100 to-slate-200 backdrop-blur-sm rounded-xl flex items-center justify-center text-lg mr-4 border border-gray-300/50 shadow-sm">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <div className="text-gray-900 font-semibold mb-1">
                    {activity.text}
                  </div>
                  <div className="text-gray-500 text-sm">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl p-6 border border-slate-600/50 shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {quickActions.map((action, index) => {
              const colors = [
                "from-blue-500/30 to-blue-600/30 hover:from-blue-500/40 hover:to-blue-600/40 border-blue-400/50",
                "from-purple-500/30 to-purple-600/30 hover:from-purple-500/40 hover:to-purple-600/40 border-purple-400/50",
                "from-emerald-500/30 to-emerald-600/30 hover:from-emerald-500/40 hover:to-emerald-600/40 border-emerald-400/50",
                "from-orange-500/30 to-orange-600/30 hover:from-orange-500/40 hover:to-orange-600/40 border-orange-400/50",
              ];
              return (
                <div
                  key={action.id}
                  onClick={() => handleQuickAction(action.id)}
                  className={`bg-gradient-to-r ${colors[index]} backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 text-center border shadow-md hover:shadow-lg`}
                >
                  <div className="text-3xl mb-4">{action.icon}</div>
                  <div className="text-lg font-semibold mb-2 text-white">
                    {action.text}
                  </div>
                  <div className="text-gray-200 text-sm">{action.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
