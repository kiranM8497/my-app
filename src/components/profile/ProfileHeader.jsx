import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit3, Send, Crown } from "lucide-react";
import Avatar from "../common/Avatar";
import Button from "../common/Button";
import ProfileHoverCard from "./ProfileHoverCard";
import XPProgressBar from "./XPProgressBar";

const ProfileHeader = ({ user, glitchEffect, onConfessionClick }) => {
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  const glitchVariants = {
    normal: { x: 0, filter: "hue-rotate(0deg)" },
    glitch: {
      x: [-2, 2, -2, 2, 0],
      filter: [
        "hue-rotate(0deg)",
        "hue-rotate(90deg)",
        "hue-rotate(180deg)",
        "hue-rotate(270deg)",
        "hue-rotate(0deg)",
      ],
      transition: { duration: 0.2 },
    },
  };

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
    <motion.div variants={itemVariants} className="relative overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-cyan-900/30" />
      <div className="relative p-6 pb-8">
        <div className="flex items-start gap-6">
          {/* Profile Avatar Section */}
          <motion.div
            className="relative"
            onHoverStart={() => setIsProfileHovered(true)}
            onHoverEnd={() => setIsProfileHovered(false)}
            whileHover={{ scale: 1.05 }}
            style={{ zIndex: isProfileHovered ? 10000 : 10 }}
          >
            <motion.div
              animate={glitchEffect ? "glitch" : "normal"}
              variants={glitchVariants}
              className="relative"
            >
              <Avatar size="large" />

              {/* Mysterious glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-purple-500/20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            </motion.div>

            {/* Crown with animation */}
            <motion.div
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <Crown className="w-4 h-4 text-yellow-300" />
            </motion.div>

            <ProfileHoverCard isVisible={isProfileHovered} user={user} />
          </motion.div>

          {/* User Info Section */}
          <div className="flex-1 space-y-3">
            <motion.div
              animate={glitchEffect ? "glitch" : "normal"}
              variants={glitchVariants}
            >
              <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-lg">
                {user.name}
              </h1>
              <p className="text-purple-300 font-semibold text-lg drop-shadow-md">
                {user.title}
              </p>
            </motion.div>

            <XPProgressBar xp={user.xp} />
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex gap-3 mt-6">
          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="primary"
              onClick={onConfessionClick}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Anonymous Confession
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="secondary">
              <Edit3 className="w-4 h-4 mr-2" />
              Mask
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="secondary">
              <Send className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
