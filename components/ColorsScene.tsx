"use client";

import React from "react";
import { motion } from "framer-motion";
import { useStore } from "../store/useStore";
import { useAudio } from "./AudioProvider";

export const ColorsScene: React.FC = () => {
  const { setDragonColor, activeItem, setActiveItem, addStar } = useStore();
  const { playAudio } = useAudio();

  const colors = [
    { id: "red", hex: "#F56565", label: "Red", sound: "/audio/red.mp3" },
    { id: "yellow", hex: "#F6AD55", label: "Yellow", sound: "/audio/yellow.mp3" },
    { id: "blue", hex: "#4299E1", label: "Blue", sound: "/audio/blue.mp3" },
    { id: "green", hex: "#48BB78", label: "Green", sound: "/audio/green.mp3" },
    { id: "purple", hex: "#9F7AEA", label: "Purple", sound: "/audio/purple.mp3" },
  ];

  const handleColorClick = async (color: typeof colors[0]) => {
    if (activeItem) return;
    
    setActiveItem(color.id);
    setDragonColor(color.hex);
    
    try {
      await playAudio(color.sound);
      // Play royal narrative if exists
      try {
        await playAudio(`/audio/${color.id}_suffix.mp3`);
      } catch {}
      
      addStar();
    } catch (err) {
      console.error("Audio error:", err);
    } finally {
      setTimeout(() => setActiveItem(null), 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="p-12 h-screen relative flex items-center justify-center space-x-8 pt-32"
    >
      {colors.map((color) => (
        <motion.button
          key={color.id}
          onClick={() => handleColorClick(color)}
          whileHover={{ scale: 1.1, y: -20 }}
          whileTap={{ scale: 0.9 }}
          animate={activeItem === color.id ? { y: [-20, 0, -20] } : {}}
          className="relative group flex flex-col items-center"
        >
          {/* Fountain Animation Placeholder */}
          <div className="w-24 h-64 bg-white/20 rounded-t-full relative overflow-hidden flex items-end justify-center">
             <motion.div 
               className="w-full absolute bottom-0"
               style={{ backgroundColor: color.hex }}
               animate={{ height: ["40%", "80%", "40%"] }}
               transition={{ repeat: Infinity, duration: 2, delay: Math.random() }}
             />
             <div className="absolute top-0 w-full h-full flex items-start justify-center pt-4">
                <span className="text-4xl">⛲</span>
             </div>
          </div>
          
          <div className="mt-4 bg-white px-6 py-2 rounded-full shadow-lg border-4 border-white text-xl font-bold uppercase tracking-wider" style={{ color: color.hex }}>
            {color.label}
          </div>

          {activeItem === color.id && (
            <motion.div 
              className="absolute -top-20 text-6xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0], y: -50 }}
            >
              ✨
            </motion.div>
          )}
        </motion.button>
      ))}
    </motion.div>
  );
};
