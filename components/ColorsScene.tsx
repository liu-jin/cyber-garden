"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../store/useStore";
import { useAudio } from "./AudioProvider";
import { SvgIcon } from "./SvgIcon";

export const ColorsScene: React.FC = () => {
  const { setDragonColor, activeItem, setActiveItem, addStar } = useStore();
  const { playAudio } = useAudio();

  const colors = [
    { id: "red", hex: "#FF4D4D", label: "Red", icon: "/images/fountain-red.svg" },
    { id: "yellow", hex: "#FFD633", label: "Yellow", icon: "/images/fountain-yellow.svg" },
    { id: "blue", hex: "#4D94FF", label: "Blue", icon: "/images/fountain-blue.svg" },
    { id: "green", hex: "#4DFF88", label: "Green", icon: "/images/fountain-green.svg" },
    { id: "purple", hex: "#B366FF", label: "Purple", icon: "/images/fountain-purple.svg" },
  ];

  const handleColorClick = async (color: typeof colors[0]) => {
    if (activeItem) return;
    
    setActiveItem(color.id);
    setDragonColor(color.hex);
    
    try {
      await playAudio(`/audio/${color.id}.mp3`);
      try {
        await playAudio(`/audio/${color.id}_suffix.mp3`);
      } catch {}
      
      addStar();
      await playAudio("/audio/success.mp3");
    } catch (err) {
      console.error("Audio error:", err);
    } finally {
      setTimeout(() => setActiveItem(null), 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
      className="p-12 h-screen relative flex items-center justify-center gap-12 pt-40"
    >
      {colors.map((color, idx) => (
        <div key={color.id} className="relative flex flex-col items-center">
          <motion.button
            onClick={() => handleColorClick(color)}
            whileHover={{ scale: 1.1, y: -10 }}
            whileTap={{ scale: 0.9 }}
            animate={activeItem === color.id ? { 
              scale: 1.1,
              transition: { duration: 0.2 }
            } : {
              y: [0, -15, 0]
            }}
            transition={activeItem === color.id ? {} : { repeat: Infinity, duration: 4 + idx, ease: "easeInOut" }}
            className="w-48 h-72 relative group"
          >
             <div className="absolute inset-x-0 bottom-0 h-4 w-4 bg-white/20 blur-xl mx-auto rounded-full" />
             <div className="w-full h-full relative z-10 transition-transform duration-500 group-hover:scale-105">
                <SvgIcon src={color.icon} color={color.hex} className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]" />
             </div>
             
             {/* Dynamic Glow */}
             <div 
               className="absolute inset-0 blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full"
               style={{ backgroundColor: color.hex }}
             />
          </motion.button>

          <AnimatePresence>
            {activeItem === color.id && (
               <motion.div 
                 className="mt-12 glass px-10 py-3 rounded-full border-white/40 shadow-2xl font-display font-black text-3xl uppercase tracking-[0.2em] text-white relative z-20"
                 initial={{ opacity: 0, scale: 0.8, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 1.2 }}
                 style={{ 
                   background: `linear-gradient(135deg, ${color.hex}aa, ${color.hex}44)`,
                   boxShadow: `0 10px 40px ${color.hex}66`
                 }}
               >
                 {color.label}
               </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
};
