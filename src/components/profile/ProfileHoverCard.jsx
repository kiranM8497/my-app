import { motion, AnimatePresence } from "framer-motion";
import { Ghost, Fingerprint } from "lucide-react";
import Avatar from "../common/Avatar";
import Badge from "../common/Badge";

const ProfileHoverCard = ({ isVisible, user }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <div
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 9999 }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 pointer-events-auto"
            style={{ zIndex: 10000 }}
          >
            <div className="bg-gray-900/95 backdrop-blur-xl border-2 border-purple-500/50 rounded-2xl p-6 shadow-2xl shadow-purple-500/25 min-w-[350px]">
              <div className="text-center space-y-3">
                <Avatar size="xlarge" />
                <div>
                  <h3 className="text-xl font-bold text-white">{user.name}</h3>
                  <p className="text-purple-400 font-semibold">{user.title}</p>
                  <p className="text-gray-300 text-sm mt-2">
                    Identity concealed, truth revealed
                  </p>
                </div>
                <div className="flex justify-center gap-2">
                  <Badge variant="purple">
                    <Ghost className="w-3 h-3 mr-1" />
                    Phantom Mode
                  </Badge>
                  <Badge variant="cyan">
                    <Fingerprint className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileHoverCard;
