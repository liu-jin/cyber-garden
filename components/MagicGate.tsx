"use client";

import React from "react";
import { motion } from "framer-motion";
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
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#E6FFFA]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center">
        {/* Dragon Kid Mascot */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mb-8"
        >
          <img src="/images/dragon-kid.svg" alt="Dragon Kid" className="w-40 h-40 mx-auto" />
        </motion.div>

        {/* The Magic Gate Button */}
        <motion.button
          onClick={handleEnter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white p-4 rounded-[48px] shadow-2xl border-4 border-dragon-blue group relative transition-colors duration-300"
        >
          <img src="/images/magic-gate.svg" alt="Magic Gate" className="w-64 h-64 object-contain" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
             <span className="text-6xl">✨</span>
          </div>
          <p className="mt-4 text-dragon-blue font-bold text-2xl uppercase tracking-widest">Tap to Enter!</p>
        </motion.button>
        
        {/* Voice hint for 4yo */}
        <p className="mt-8 text-dragon-blue opacity-80 animate-bounce font-medium text-lg">
           Hear the magic of Dragon Kid!
        </p>
      </div>
    </motion.div>
  );
};
