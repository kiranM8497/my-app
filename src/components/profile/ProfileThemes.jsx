"use client";
import { motion } from "framer-motion";
import { Palette } from "lucide-react";
import Card from "../common/Card";

const ProfileThemes = ({ themes, selectedTheme, onThemeChange }) => {
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

  return (
    <motion.div variants={itemVariants} className="px-6 mb-6">
      <Card>
        <div className="pb-3">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              <Palette className="w-5 h-5 text-purple-400" />
            </motion.div>
            <h3 className="font-semibold tracking-wide text-white">
              Shadow Themes
            </h3>
          </div>
        </div>
        <div className="flex gap-3">
          {themes.map((theme, index) => (
            <motion.button
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 ${
                selectedTheme === theme.id
                  ? "border-purple-400/70 bg-purple-900/40 shadow-lg shadow-purple-500/25"
                  : "border-gray-600/50 hover:border-gray-500/70 bg-gray-800/30"
              }`}
            >
              <motion.div
                className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.accent} mx-auto mb-2 shadow-lg`}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              />
              <div className="text-xs font-medium text-white">{theme.name}</div>
            </motion.button>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default ProfileThemes;
