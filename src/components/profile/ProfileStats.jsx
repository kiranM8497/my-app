import { motion } from "framer-motion";
import { Ghost, Heart, Zap } from "lucide-react";
import Card from "../common/Card";

const ProfileStats = ({ stats }) => {
  const statsData = [
    {
      value: stats.confessions.toString(),
      label: "Hidden Truths",
      color: "purple",
      icon: Ghost,
    },
    {
      value: stats.likes,
      label: "Anonymous Likes",
      color: "emerald",
      icon: Heart,
    },
    {
      value: stats.reactions,
      label: "Shadow Reactions",
      color: "cyan",
      icon: Zap,
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
    <motion.div variants={itemVariants} className="px-6 -mt-4 mb-6">
      <div className="grid grid-cols-3 gap-4">
        {statsData.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="cursor-pointer">
                <div className="p-4 text-center relative overflow-hidden">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/10 to-transparent`}
                    whileHover={{ opacity: 0.3 }}
                    initial={{ opacity: 0.1 }}
                  />
                  <IconComponent
                    className={`w-5 h-5 mx-auto mb-2 text-${stat.color}-400`}
                  />
                  <div
                    className={`text-2xl font-bold text-${stat.color}-300 drop-shadow-lg`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-300 uppercase tracking-wide font-medium">
                    {stat.label}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProfileStats;
