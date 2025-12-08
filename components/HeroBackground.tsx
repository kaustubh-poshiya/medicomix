import React from 'react';
import { motion } from 'framer-motion';

export const HeroBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-slate-50">
      <div className="absolute inset-0 z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

      {/* Aurora Layer 1 - Primary Blue */}
      <motion.div
        animate={{
          x: [-100, 100, -100],
          y: [-50, 50, -50],
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-primary-200/50 blur-[120px] mix-blend-multiply"
      />

      {/* Aurora Layer 2 - Cyan/Teal */}
      <motion.div
        animate={{
          x: [100, -100, 100],
          y: [50, -50, 50],
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-secondary-200/50 blur-[130px] mix-blend-multiply"
      />

      {/* Aurora Layer 3 - Purple Accent */}
      <motion.div
        animate={{
          x: [-50, 50, -50],
          y: [100, -100, 100],
          rotate: [0, 180, 360],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[20%] right-[30%] w-[40vw] h-[40vw] rounded-full bg-purple-200/40 blur-[100px] mix-blend-multiply"
      />

      {/* Aurora Layer 4 - Cyan Glow Center */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[40%] left-[40%] w-[30vw] h-[30vw] rounded-full bg-cyan-100/50 blur-[80px] mix-blend-screen"
      />
    </div>
  );
};
