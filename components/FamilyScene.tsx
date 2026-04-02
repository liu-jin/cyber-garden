"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../store/useStore";
import { useAudio } from "./AudioProvider";

export const FamilyScene: React.FC = () => {
  const { activeItem, setActiveItem, addStar } = useStore();
  const { playAudio } = useAudio();

  const members = [
    { id: "father", icon: "/images/family-father.svg", name: "Father", accent: "from-blue-500/20 to-transparent" },
    { id: "mother", icon: "/images/family-mother.svg", name: "Mother", accent: "from-pink-500/20 to-transparent" },
    { id: "brother", icon: "/images/family-brother.svg", name: "Brother", accent: "from-green-500/20 to-transparent" },
    { id: "sister", icon: "/images/family-sister.svg", name: "Sister", accent: "from-yellow-500/20 to-transparent" },
  ];

  const handleMemberClick = async (member: typeof members[0]) => {
    if (activeItem) return;
    
    setActiveItem(member.id);
    
    try {
      await playAudio(`/audio/${member.id}.mp3`);
      try {
        await playAudio(`/audio/${member.id}_suffix.mp3`);
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
      className="p-12 h-screen relative flex items-center justify-center gap-12 pt-40"
    >
      <div className="absolute top-40 glass px-12 py-3 rounded-full border-white/30 text-white font-display font-black text-3xl uppercase tracking-[0.4em] shadow-2xl">
         Our Royal Family
      </div>

      {members.map((member, idx) => (
        <motion.button
          key={member.id}
          onClick={() => handleMemberClick(member)}
          whileHover={{ scale: 1.1, y: -10 }}
          whileTap={{ scale: 0.9 }}
          animate={activeItem === member.id 
            ? { scale: 1.15, rotate: [0, 5, -5, 0] } 
            : { y: [0, -10, 0] }
          }
          transition={activeItem === member.id 
            ? { duration: 0.5 } 
            : { repeat: Infinity, duration: 4 + idx, ease: "easeInOut" }
          }
          className="relative group w-56 h-72 glass rounded-[80px] border-white/40 shadow-2xl flex flex-col items-center justify-center p-8 transition-all duration-500"
        >
          <div className={`absolute inset-0 bg-gradient-to-tr ${member.accent} opacity-0 group-hover:opacity-100 transition-opacity rounded-[80px]`} />
          
          <img 
            src={member.icon} 
            alt={member.name} 
            className="w-full h-full object-contain relative z-10 neon-shadow drop-shadow-2xl transition-transform group-hover:scale-110" 
          />
          
          <AnimatePresence>
            {activeItem === member.id && (
              <motion.div 
                className="absolute -top-12 glass px-8 py-2 rounded-full border-white/40 shadow-2xl text-white font-display font-black text-2xl uppercase tracking-widest z-20"
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0, y: -20 }}
              >
                {member.name}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pedestal Shadow */}
          <div className="absolute bottom-4 w-3/4 h-4 bg-black/20 blur-xl rounded-full" />
        </motion.button>
      ))}
    </motion.div>
  );
};
