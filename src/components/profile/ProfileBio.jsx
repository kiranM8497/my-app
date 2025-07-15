import { motion } from "framer-motion";
import { Instagram, Twitter, Github, LinkIcon } from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";

const ProfileBio = ({ bio }) => {
  const socialLinks = [
    { icon: Instagram, color: "text-pink-400" },
    { icon: Twitter, color: "text-blue-400" },
    { icon: Github, color: "text-gray-300" },
    { icon: LinkIcon, color: "text-emerald-400" },
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
        <div className="p-4">
          <div className="space-y-3">
            <motion.p
              className="text-gray-200 text-sm leading-relaxed font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {bio}
            </motion.p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
                    <social.icon className={`w-4 h-4 ${social.color}`} />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProfileBio;
