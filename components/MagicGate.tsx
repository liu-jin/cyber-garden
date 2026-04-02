"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../store/useStore";
import { useAudio } from "./AudioProvider";

export const MagicGate: React.FC = () => {
  const { enterGarden, hasEntered } = useStore();
  const { unlock, playAudio } = useAudio();

  if (hasEntered) return null;

  const handleEnter = async () => {
    // Unlock Audio Context (One-click rule)
    await unlock();
    
    // Play Opening Greeting
    try {
      await playAudio("/audio/guide_opening.mp3");
    } catch (err) {
      console.warn("Opening audio failed to play, proceeding anyway.");
    }
    
    // Smooth transition into the garden
    enterGarden();
  };

  return (
    <AnimatePresence>
      {!hasEntered && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-royal-pearl overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background Decor */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyber-mint/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-royal-purple/10 rounded-full blur-[120px] animate-pulse" />

          <motion.div 
            className="relative z-10 flex flex-col items-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {/* Dragon Kid Mascot */}
            <motion.div
              animate={{ 
                y: [0, -12, 0],
                rotate: [0, -2, 2, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4, 
                ease: "easeInOut" 
              }}
              className="mb-12 relative"
            >
              <div className="absolute inset-0 bg-cyber-mint/30 rounded-full blur-2xl scale-75 neon-shadow" />
              <img src="/images/dragon-kid.svg" alt="Dragon Kid" className="w-48 h-48 mx-auto relative z-10 drop-shadow-2xl" />
            </motion.div>

            {/* The Magic Gate Button - Glassmorphism UI */}
            <motion.button
              onClick={handleEnter}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(107, 70, 193, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="glass p-8 rounded-5xl group relative transition-all duration-500 border-white/60 hover:border-royal-purple/30 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-royal-purple/5 to-cyber-mint/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              >
                <img src="/images/magic-gate.svg" alt="Magic Gate" className="w-72 h-72 object-contain relative z-10 neon-shadow text-royal-purple/40" />
              </motion.div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-500 group-hover:scale-125">
                 <span className="text-8xl filter drop-shadow-xl">✨</span>
              </div>
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 space-y-2 text-center"
            >
              <h1 className="font-display text-4xl font-bold tracking-tight text-royal-purple">
                Royal English Garden
              </h1>
              <p className="font-sans text-slate-500 font-medium text-lg tracking-wide uppercase">
                 Tap the Gate to Begin
              </p>
            </motion.div>
          </motion.div>
          
          {/* Royal Footer Accent */}
          <div className="absolute bottom-8 flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-royal-purple/20" />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
