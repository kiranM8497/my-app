"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileBadges from "../components/profile/ProfileBadges";
import ProfileThemes from "../components/profile/ProfileThemes";
import ProfileBio from "../components/profile/ProfileBio";
import ProfileTabs from "../components/profile/ProfileTabs";
import ParticleTrail from "../components/common/ParticleTrail";
import AnimatedBackground from "../components/common/AnimatedBackground";
import ConfessionModal from "../components/modals/ConfessionModal";

const ProfilePage = () => {
  const [selectedTheme, setSelectedTheme] = useState("shadow-purple");
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [particleTrail, setParticleTrail] = useState([]);
  const [isConfessionModalOpen, setIsConfessionModalOpen] = useState(false);
  const [confessions, setConfessions] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newParticle = { id: Date.now(), x: e.clientX, y: e.clientY };
      setParticleTrail((prev) => [...prev.slice(-10), newParticle]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleConfessionSubmit = (confessionData) => {
    setConfessions((prev) => [confessionData, ...prev]);
    console.log("New confession:", confessionData);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const userData = {
    name: "Anonymous Confessor",
    title: "Shadow Walker • Level 12",
    bio: "Digital phantom wandering through shadows of truth. Level 12 anonymous confessor seeking authentic connections in the void of anonymity.",
    xp: { current: 2847, max: 3200, percentage: 89 },
    stats: {
      confessions: confessions.length,
      likes: "1.2K",
      reactions: "89",
    },
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono relative overflow-hidden">
      <ParticleTrail particles={particleTrail} />
      <AnimatedBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        <ProfileHeader
          user={userData}
          glitchEffect={glitchEffect}
          onConfessionClick={() => setIsConfessionModalOpen(true)}
        />

        <ProfileStats stats={userData.stats} />

        <ProfileBadges />

        <ProfileThemes
          themes={[
            {
              id: "shadow-purple",
              name: "Shadow Veil",
              color: "bg-purple-500",
              accent: "from-purple-600 to-violet-700",
            },
            {
              id: "phantom-green",
              name: "Phantom",
              color: "bg-emerald-500",
              accent: "from-emerald-600 to-teal-700",
            },
            {
              id: "ghost-blue",
              name: "Ghost Mode",
              color: "bg-cyan-500",
              accent: "from-cyan-600 to-blue-700",
            },
          ]}
          selectedTheme={selectedTheme}
          onThemeChange={setSelectedTheme}
        />

        <ProfileBio bio={userData.bio} />

        <ProfileTabs confessions={confessions} />

        <div className="h-20" />
      </motion.div>

      <ConfessionModal
        isOpen={isConfessionModalOpen}
        onClose={() => setIsConfessionModalOpen(false)}
        onSubmit={handleConfessionSubmit}
      />
    </div>
  );
};

export default ProfilePage;
