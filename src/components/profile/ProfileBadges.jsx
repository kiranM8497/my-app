import { motion } from "framer-motion";
import {
  Trophy,
  VenetianMaskIcon as Mask,
  Ghost,
  Lock,
  Eye,
  EyeOff,
  UserX,
} from "lucide-react";
import Card from "../common/Card";

const ProfileBadges = () => {
  const badges = [
    { id: 1, name: "Anonymous", icon: Mask, rarity: "common", unlocked: true },
    {
      id: 2,
      name: "Shadow Walker",
      icon: Ghost,
      rarity: "rare",
      unlocked: true,
    },
    { id: 3, name: "Vault Keeper", icon: Lock, rarity: "epic", unlocked: true },
    {
      id: 4,
      name: "Phantom",
      icon: EyeOff,
      rarity: "legendary",
      unlocked: false,
    },
    { id: 5, name: "Truth Seeker", icon: Eye, rarity: "rare", unlocked: true },
    {
      id: 6,
      name: "Digital Ghost",
      icon: UserX,
      rarity: "legendary",
      unlocked: false,
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

  return (
    <motion.div variants={itemVariants} className="px-6 mb-6">
      <Card>
        <div className="pb-3">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <Trophy className="w-5 h-5 text-yellow-400" />
            </motion.div>
            <h3 className="font-semibold tracking-wide text-white">
              Shadow Achievements
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className={`relative p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                  badge.unlocked
                    ? badge.rarity === "legendary"
                      ? "bg-gradient-to-br from-yellow-900/40 to-orange-900/40 border-yellow-400/60 shadow-lg shadow-yellow-500/30"
                      : badge.rarity === "epic"
                      ? "bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-400/60 shadow-lg shadow-purple-500/30"
                      : badge.rarity === "rare"
                      ? "bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-cyan-400/60 shadow-lg shadow-cyan-500/30"
                      : "bg-gradient-to-br from-gray-800/40 to-gray-700/40 border-gray-400/60"
                    : "bg-gray-900/60 border-gray-600/30 opacity-50"
                }`}
              >
                <div className="text-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent
                      className={`w-6 h-6 mx-auto mb-1 ${
                        badge.unlocked
                          ? badge.rarity === "legendary"
                            ? "text-yellow-300"
                            : badge.rarity === "epic"
                            ? "text-purple-300"
                            : badge.rarity === "rare"
                            ? "text-cyan-300"
                            : "text-gray-300"
                          : "text-gray-500"
                      }`}
                    />
                  </motion.div>
                  <div className="text-xs font-medium text-white">
                    {badge.name}
                  </div>
                </div>
                {!badge.unlocked && (
                  <motion.div
                    className="absolute inset-0 bg-gray-900/90 rounded-xl flex items-center justify-center"
                    whileHover={{ backgroundColor: "rgba(17, 24, 39, 0.7)" }}
                  >
                    <Lock className="w-4 h-4 text-gray-400" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
};

export default ProfileBadges;
