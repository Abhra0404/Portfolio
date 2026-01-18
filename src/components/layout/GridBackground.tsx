'use client';

import { motion } from 'framer-motion';

export default function GridBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      {/* Animated grid lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-neon-cyan/10"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-neon-cyan rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5 + 0.2
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [Math.random() * 0.5 + 0.2, Math.random() * 0.5 + 0.2, Math.random() * 0.5 + 0.2]
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}