import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Eye,
  EyeOff,
  Lock,
  Zap,
  Heart,
  MessageSquare,
  Ghost,
  Sparkles,
  Timer,
  Shield,
  AlertTriangle,
} from "lucide-react";
import Button from "../common/Button";
import Card from "../common/Card";
import Badge from "../common/Badge";

const ConfessionModal = ({ isOpen, onClose, onSubmit }) => {
  const [confession, setConfession] = useState("");
  const [selectedMood, setSelectedMood] = useState("anonymous");
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  const moods = [
    {
      id: "anonymous",
      name: "Anonymous",
      icon: Ghost,
      color: "purple",
      description: "Complete anonymity",
    },
    {
      id: "vulnerable",
      name: "Vulnerable",
      icon: Heart,
      color: "pink",
      description: "Emotional confession",
    },
    {
      id: "secret",
      name: "Secret",
      icon: Lock,
      color: "blue",
      description: "Hidden truth",
    },
    {
      id: "regret",
      name: "Regret",
      icon: AlertTriangle,
      color: "orange",
      description: "Something you regret",
    },
    {
      id: "confession",
      name: "Confession",
      icon: MessageSquare,
      color: "green",
      description: "General confession",
    },
  ];

  const categories = [
    { id: "general", name: "General", icon: MessageSquare },
    { id: "relationships", name: "Relationships", icon: Heart },
    { id: "work", name: "Work/Career", icon: Zap },
    { id: "family", name: "Family", icon: Shield },
    { id: "personal", name: "Personal Growth", icon: Sparkles },
  ];

  const handleTextChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setConfession(text);
      setCharCount(text.length);
    }
  };

  const handleSubmit = () => {
    if (confession.trim()) {
      onSubmit({
        text: confession,
        mood: selectedMood,
        category: selectedCategory,
        anonymous: isAnonymous,
        timestamp: new Date().toISOString(),
      });
      setConfession("");
      setCharCount(0);
      onClose();
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            <Card className="bg-gray-900/95 border-purple-500/50 shadow-2xl shadow-purple-500/25 backdrop-blur-xl">
              {/* Header */}
              <div className="pb-4 border-b border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 20,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      <Ghost className="w-6 h-6 text-purple-400" />
                    </motion.div>
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        Anonymous Confession
                      </h2>
                      <p className="text-sm text-gray-400">
                        Share your truth in the shadows
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-gray-800/60 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </motion.button>
                </div>
              </div>

              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Mood Selection */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
                    Confession Mood
                  </h3>
                  <div className="grid grid-cols-5 gap-2">
                    {moods.map((mood) => {
                      const IconComponent = mood.icon;
                      return (
                        <motion.button
                          key={mood.id}
                          onClick={() => setSelectedMood(mood.id)}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                            selectedMood === mood.id
                              ? `border-${mood.color}-400/70 bg-${mood.color}-900/40 shadow-lg shadow-${mood.color}-500/25`
                              : "border-gray-600/50 hover:border-gray-500/70 bg-gray-800/30"
                          }`}
                        >
                          <IconComponent
                            className={`w-5 h-5 mx-auto mb-1 ${
                              selectedMood === mood.id
                                ? `text-${mood.color}-300`
                                : "text-gray-400"
                            }`}
                          />
                          <div className="text-xs font-medium text-white">
                            {mood.name}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-gray-400">
                    {moods.find((m) => m.id === selectedMood)?.description}
                  </p>
                </div>

                {/* Category Selection */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
                    Category
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <motion.button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 ${
                            selectedCategory === category.id
                              ? "border-purple-400/70 bg-purple-900/40 text-purple-300"
                              : "border-gray-600/50 hover:border-gray-500/70 bg-gray-800/30 text-gray-300"
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {category.name}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Anonymity Toggle */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
                    Privacy Level
                  </h3>
                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => setIsAnonymous(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 p-3 rounded-xl border-2 transition-all duration-300 ${
                        isAnonymous
                          ? "border-purple-400/70 bg-purple-900/40 shadow-lg shadow-purple-500/25"
                          : "border-gray-600/50 hover:border-gray-500/70 bg-gray-800/30"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <EyeOff
                          className={`w-5 h-5 ${
                            isAnonymous ? "text-purple-300" : "text-gray-400"
                          }`}
                        />
                        <span className="font-semibold text-white">
                          Anonymous
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">
                        Complete privacy, no traces
                      </p>
                    </motion.button>

                    <motion.button
                      onClick={() => setIsAnonymous(false)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 p-3 rounded-xl border-2 transition-all duration-300 ${
                        !isAnonymous
                          ? "border-cyan-400/70 bg-cyan-900/40 shadow-lg shadow-cyan-500/25"
                          : "border-gray-600/50 hover:border-gray-500/70 bg-gray-800/30"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Eye
                          className={`w-5 h-5 ${
                            !isAnonymous ? "text-cyan-300" : "text-gray-400"
                          }`}
                        />
                        <span className="font-semibold text-white">
                          Semi-Private
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">
                        Visible to close connections
                      </p>
                    </motion.button>
                  </div>
                </div>

                {/* Confession Text Area */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
                      Your Confession
                    </h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-medium ${
                          charCount > maxChars * 0.9
                            ? "text-orange-400"
                            : "text-gray-400"
                        }`}
                      >
                        {charCount}/{maxChars}
                      </span>
                      <motion.button
                        onClick={() => setShowPreview(!showPreview)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-1 rounded ${
                          showPreview ? "text-purple-400" : "text-gray-400"
                        }`}
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {!showPreview ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative"
                    >
                      <textarea
                        value={confession}
                        onChange={handleTextChange}
                        placeholder="Share your truth... What's weighing on your mind? This is a safe space for your thoughts."
                        className="w-full h-32 p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 resize-none focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        autoFocus
                      />

                      {/* Floating particles around textarea when focused */}
                      {confession && (
                        <>
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-purple-400/60 rounded-full pointer-events-none"
                              style={{
                                left: `${10 + Math.random() * 80}%`,
                                top: `${10 + Math.random() * 80}%`,
                              }}
                              animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.4,
                              }}
                            />
                          ))}
                        </>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-gray-800/30 border border-gray-700/50 rounded-xl min-h-[128px]"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Badge
                          variant={
                            moods.find((m) => m.id === selectedMood)?.color
                          }
                        >
                          {moods.find((m) => m.id === selectedMood)?.name}
                        </Badge>
                        <Badge variant="gray">
                          {
                            categories.find((c) => c.id === selectedCategory)
                              ?.name
                          }
                        </Badge>
                        {isAnonymous && (
                          <Badge variant="purple">
                            <Ghost className="w-3 h-3 mr-1" />
                            Anonymous
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-200 text-sm leading-relaxed">
                        {confession || "Your confession will appear here..."}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Warning/Info */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg"
                >
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-purple-300">
                      <p className="font-medium mb-1">
                        Your privacy is protected
                      </p>
                      <p className="text-purple-400/80">
                        All confessions are encrypted and stored securely.
                        Anonymous confessions cannot be traced back to you.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-700/50 bg-gray-900/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Timer className="w-4 h-4" />
                    <span>Auto-delete in 30 days</span>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="secondary" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleSubmit}
                      disabled={!confession.trim()}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Share Confession
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfessionModal;
