"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useStore } from "../store/useStore";
import { useAudio } from "./AudioProvider";

export const GardenScene: React.FC = () => {
  const { activeItem, setActiveItem, addStar } = useStore();
  const { playAudio } = useAudio();
  const clickCountMap = useRef<Record<string, number>>({});

  const items = [
    { id: "apple", label: "/images/apple.svg", name: "Apple", accent: "from-cyber-pink/20 to-transparent", glow: "shadow-cyber-pink/30" },
    { id: "banana", label: "/images/banana.svg", name: "Banana", accent: "from-cyber-yellow/20 to-transparent", glow: "shadow-cyber-yellow/30" },
    { id: "lion", label: "/images/lion.svg", name: "Lion", accent: "from-orange-400/20 to-transparent", glow: "shadow-orange-400/30" },
    { id: "elephant", label: "/images/elephant.svg", name: "Elephant", accent: "from-cyber-blue/20 to-transparent", glow: "shadow-cyber-blue/30" },
  ];

  const handleItemClick = async (id: string) => {
    if (activeItem) return;
    
    clickCountMap.current[id] = (clickCountMap.current[id] || 0) + 1;
    setActiveItem(id);
    
    try {
      await playAudio(`/audio/${id}.mp3`);
      try {
        await playAudio(`/audio/${id}_suffix.mp3`);
      } catch {}
      
      if (clickCountMap.current[id] >= 3) {
        addStar();
        await playAudio("/audio/success.mp3");
        clickCountMap.current[id] = 0;
      }
    } catch (err) {
      console.error("Audio error:", err);
    } finally {
      setTimeout(() => setActiveItem(null), 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="p-12 h-screen relative grid grid-cols-2 gap-16 items-center justify-center pt-40 max-w-6xl mx-auto"
    >
      {items.map((item, idx) => (
        <motion.button
          key={item.id}
          onClick={() => handleItemClick(item.id)}
          whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 1 : -1 }}
          whileTap={{ scale: 0.95 }}
          animate={activeItem === item.id 
            ? { scale: 1.15, rotate: [0, 5, -5, 0], y: -20 } 
            : { y: [0, -15, 0] }
          }
          transition={activeItem === item.id 
            ? { duration: 0.6 } 
            : { repeat: Infinity, duration: 4 + idx, ease: "easeInOut" }
          }
          className={`relative aspect-square w-full max-w-[320px] mx-auto glass rounded-5xl border-white/60 shadow-2xl flex flex-col items-center justify-center p-12 transition-all duration-500 group overflow-hidden ${item.glow}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-tr ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
          
          <img 
            src={item.label} 
            alt={item.name} 
            className="w-full h-full object-contain relative z-10 filter drop-shadow-2xl transition-transform group-hover:scale-110" 
          />

          <AnimatePresence>
            {activeItem === item.id && (
               <motion.div 
                 className="absolute -top-6 bg-royal-purple px-10 py-3 rounded-full shadow-2xl border-white/40 text-white font-display font-black text-3xl uppercase tracking-[0.2em] relative z-20"
                 initial={{ opacity: 0, y: 30, scale: 0.8 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, scale: 1.2 }}
               >
                 {item.name}
               </motion.div>
            )}
          </AnimatePresence>
          
          <div className="absolute bottom-6 flex gap-1 opacity-20">
             {[...Array(3)].map((_, i) => (
               <div key={i} className="w-1.5 h-1.5 rounded-full bg-royal-purple" />
             ))}
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
};
