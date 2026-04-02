"use client";

import { useStore } from "../store/useStore";
import { MagicGate } from "../components/MagicGate";
import { DragonKid } from "../components/DragonKid";
import { useAudio } from "../components/AudioProvider";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Home() {
  const { hasEntered, activeItem, setActiveItem, addStar } = useStore();
  const { playAudio } = useAudio();
  const clickCountMap = useRef<Record<string, number>>({});

  const items = [
    { id: "apple", label: "/images/apple.svg", name: "Apple", color: "bg-apple-red" },
    { id: "banana", label: "/images/banana.svg", name: "Banana", color: "bg-banana-yellow" },
    { id: "lion", label: "/images/lion.svg", name: "Lion", color: "bg-orange-400" },
    { id: "elephant", label: "/images/elephant.svg", name: "Elephant", color: "bg-sky-blue" },
  ];

  const handleItemClick = async (id: string) => {
    if (activeItem) return; // Wait for current item feedback
    
    // Increment local click count
    clickCountMap.current[id] = (clickCountMap.current[id] || 0) + 1;
    
    // Set active state for UI feedback
    setActiveItem(id);
    
    try {
      // 1. Play Core Word Audio
      await playAudio(`/audio/${id}.mp3`);
      
      // 2. Dynamic Narrative Suffix (e.g., "Apple! A gift from nature!")
      // This allows礼部 to provide a suffix file independently
      try {
        await playAudio(`/audio/${id}_suffix.mp3`);
      } catch {
        // Silent fail if suffix doesn't exist yet
      }
      
      // 3. Reward Logic: If clicked 3 times, reward with success audio and star
      if (clickCountMap.current[id] >= 3) {
        await playAudio("/audio/success.mp3");
        addStar();
        clickCountMap.current[id] = 0; // Reset
      }
    } catch (err) {
      console.error("Audio sequence interrupted:", err);
    } finally {
      // Clear active state after feedback
      // Using a longer delay to ensure animations finish
      setTimeout(() => setActiveItem(null), 1500);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#E6FFFA] overflow-hidden cursor-default">
      <AnimatePresence>
        {!hasEntered && <MagicGate key="gate" />}
      </AnimatePresence>

      {/* The Cyber Garden Sandbox */}
      {hasEntered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-12 h-screen relative grid grid-cols-2 gap-12 items-center justify-center"
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

          {/* Dragon Kid Character */}
          <DragonKid />
          
          {/* Subtle Ambient Background Elements (Simulating Cyber Garden) */}
          <motion.div 
             className="absolute top-10 left-10 w-48 h-48 bg-white opacity-20 rounded-full blur-3xl"
             animate={{ scale: [1, 1.2, 1] }}
             transition={{ repeat: Infinity, duration: 5 }}
          />
          <motion.div 
             className="absolute bottom-20 left-1/4 w-32 h-32 bg-sky-100 opacity-30 rounded-full blur-2xl"
             animate={{ scale: [1, 1.5, 1], y: [0, -20, 0] }}
             transition={{ repeat: Infinity, duration: 8 }}
          />
        </motion.div>
      )}
    </main>
  );
}
