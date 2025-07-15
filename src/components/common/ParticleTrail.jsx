"use client";
import { motion } from "framer-motion";

const ParticleTrail = ({ particles }) => {
  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed w-2 h-2 bg-purple-400/60 rounded-full pointer-events-none"
          style={{
            left: particle.x - 4,
            top: particle.y - 4,
            zIndex: 9998,
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </>
  );
};

export default ParticleTrail;
