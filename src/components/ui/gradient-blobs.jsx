"use client"

import { motion } from "framer-motion"

export function GradientBlobs() {
  return (
    <div className="blob-container">
      <motion.div
        className="blob blob-light"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -50, 20, 0],
          scale: [1, 1.1, 0.9, 1],
          rotate: [0, 120, 240, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ top: "-10%", left: "80%"}}
      />
      <motion.div
        className="blob blob-primary"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -50, 20, 0],
          scale: [1, 1.1, 0.9, 1],
          rotate: [0, 120, 240, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ top: "10%", left: "0%" }}
      />
      <motion.div
        className="blob blob-secondary"
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 30, -40, 0],
          scale: [1, 0.9, 1.1, 1],
          rotate: [0, -120, -240, -360]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ top: "60%", right: "15%" }}
      />
      <motion.div
        className="blob blob-primary"
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 30, -40, 0],
          scale: [1, 0.9, 1.1, 1],
          rotate: [0, -120, -240, -360]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ top: "100%", right: "15%" }}
      />
      <motion.div
        className="blob blob-secondary"
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.2, 0.8, 1],
          rotate: [0, 200, 400, 600]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ top: "40%", left: "60%" }}
      />

      {/* Mobile bottom blob */}
      <motion.div
        className="blob blob-mobile-bottom sm:hidden"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ 
          position: 'fixed',
          bottom: '-20vh',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '150vw',
          height: '50vh',
          background: 'radial-gradient(circle at center, var(--primary-green) 0%, transparent 70%)',
          filter: 'blur(80px)',
          zIndex: -1,
        }}
      />
    </div>
  )
} 