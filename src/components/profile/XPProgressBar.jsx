import { motion } from "framer-motion";

const XPProgressBar = ({ xp }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-300 font-medium">Shadow XP</span>
        <span className="text-purple-300 font-bold">
          {xp.current.toLocaleString()} / {xp.max.toLocaleString()}
        </span>
      </div>
      <div className="relative">
        <div className="h-3 bg-gray-800/80 border border-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 via-violet-500 to-cyan-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${xp.percentage}%` }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.div
            className="absolute inset-0 h-3 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
            animate={{ x: [-100, 300] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default XPProgressBar;
