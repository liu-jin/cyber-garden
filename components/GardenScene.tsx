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
    { id: "apple", label: "/images/apple.svg", name: "Apple", color: "bg-apple-red" },
    { id: "banana", label: "/images/banana.svg", name: "Banana", color: "bg-banana-yellow" },
    { id: "lion", label: "/images/lion.svg", name: "Lion", color: "bg-orange-400" },
    { id: "elephant", label: "/images/elephant.svg", name: "Elephant", color: "bg-sky-blue" },
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
        await playAudio("/audio/success.mp3");
        addStar();
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
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="p-12 h-screen relative grid grid-cols-2 gap-12 items-center justify-center pt-32"
    >
      {items.map((item) => (
        <motion.button
          key={item.id}
          onClick={() => handleItemClick(item.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={activeItem === item.id ? { scale: 1.15, rotate: [0, 5, -5, 0] } : {}}
          className={`relative aspect-square w-full max-w-[280px] mx-auto ${item.color} rounded-[64px] shadow-2xl border-8 border-white flex flex-col items-center justify-center p-8 transition-transform group`}
        >
          <img src={item.label} alt={item.name} className="w-4/5 h-4/5 object-contain" />
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity rounded-[64px]" />
          {activeItem === item.id && (
             <motion.div 
               className="absolute -top-10 bg-white px-6 py-2 rounded-full shadow-lg border-4 border-dragon-blue text-dragon-blue font-black text-2xl uppercase tracking-widest"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
             >
               {item.name}
             </motion.div>
          )}
        </motion.button>
      ))}
    </motion.div>
  );
};
