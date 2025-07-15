import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  MessageSquare,
  Users,
  FileText,
  Ghost,
  EyeOff,
  Heart,
} from "lucide-react";
import Card from "../common/Card";
import Badge from "../common/Badge";

const ProfileTabs = ({ confessions }) => {
  const [activeTab, setActiveTab] = useState("confessions");

  const tabs = [
    { value: "confessions", icon: FileText, label: "Secrets" },
    { value: "messages", icon: MessageSquare, label: "Whispers" },
    { value: "friends", icon: Users, label: "Shadows" },
    { value: "settings", icon: Settings, label: "Control" },
  ];

  const recentActivity = [
    {
      type: "confession",
      content: "Shared an anonymous truth",
      time: "2h ago",
      reactions: 24,
      anonymous: true,
    },
    {
      type: "like",
      content: "Received reactions on hidden post",
      time: "4h ago",
      reactions: 5,
      anonymous: true,
    },
    {
      type: "badge",
      content: "Unlocked 'Shadow Walker' achievement",
      time: "1d ago",
      reactions: 0,
      anonymous: false,
    },
    {
      type: "message",
      content: "Anonymous message received",
      time: "2d ago",
      reactions: 0,
      anonymous: true,
    },
  ];

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "confessions":
        return (
          <Card>
            <div className="pb-3">
              <h3 className="font-semibold tracking-wide text-white flex items-center gap-2">
                <Ghost className="w-5 h-5 text-purple-400" />
                Shadow Activity
              </h3>
            </div>
            <div className="space-y-4">
              {/* Show new confessions */}
              {confessions.map((confession, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/40 hover:bg-gray-700/40 transition-all duration-300 border border-gray-700/30"
                >
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-200 font-medium">
                      New anonymous confession shared
                    </p>
                    <p className="text-xs text-gray-400">Just now</p>
                  </div>
                  <Badge variant="purple">
                    <EyeOff className="w-3 h-3 mr-1" />
                    Hidden
                  </Badge>
                </motion.div>
              ))}

              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/40 hover:bg-gray-700/40 transition-all duration-300 border border-gray-700/30 cursor-pointer"
                >
                  <motion.div
                    className={`w-3 h-3 rounded-full ${
                      activity.type === "confession"
                        ? "bg-purple-500"
                        : activity.type === "like"
                        ? "bg-red-500"
                        : activity.type === "badge"
                        ? "bg-yellow-500"
                        : "bg-cyan-500"
                    }`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-200 font-medium">
                      {activity.content}
                    </p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                  {activity.anonymous && (
                    <Badge variant="purple">
                      <EyeOff className="w-3 h-3 mr-1" />
                      Hidden
                    </Badge>
                  )}
                  {activity.reactions > 0 && (
                    <Badge variant="gray">
                      <Heart className="w-3 h-3 mr-1" />
                      {activity.reactions}
                    </Badge>
                  )}
                </motion.div>
              ))}
            </div>
          </Card>
        );

      case "messages":
        return (
          <Card>
            <div className="p-8 text-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-500" />
              </motion.div>
              <p className="text-gray-300">No anonymous whispers yet</p>
            </div>
          </Card>
        );

      case "friends":
        return (
          <Card>
            <div className="p-8 text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-500" />
              </motion.div>
              <p className="text-gray-300">Connect with other shadows</p>
            </div>
          </Card>
        );

      case "settings":
        return (
          <Card>
            <div className="p-8 text-center">
              <motion.div
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              >
                <Settings className="w-12 h-12 mx-auto mb-4 text-gray-500" />
              </motion.div>
              <p className="text-gray-300">Control your anonymity</p>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div variants={itemVariants} className="px-6">
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-1 bg-gray-900/60 border border-gray-700/50 backdrop-blur-xl rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
                activeTab === tab.value
                  ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {renderTabContent()}
      </div>
    </motion.div>
  );
};

export default ProfileTabs;
