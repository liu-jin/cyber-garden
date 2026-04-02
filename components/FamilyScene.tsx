"use client";

import React from "react";
import { motion } from "framer-motion";
import { useStore } from "../store/useStore";
import { useAudio } from "./AudioProvider";

export const FamilyScene: React.FC = () => {
  const { activeItem, setActiveItem, addStar } = useStore();
  const { playAudio } = useAudio();

  const members = [
    { id: "father", label: "👨", name: "Father", color: "bg-blue-400" },
    { id: "mother", label: "👩", name: "Mother", color: "bg-pink-400" },
    { id: "brother", label: "👦", name: "Brother", color: "bg-green-400" },
    { id: "sister", label: "👧", name: "Sister", color: "bg-yellow-400" },
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
      className="p-12 h-screen relative flex items-center justify-center space-x-12 pt-32"
    >
      {members.map((member) => (
        <motion.button
          key={member.id}
          onClick={() => handleMemberClick(member)}
          whileHover={{ scale: 1.1, y: -10 }}
          whileTap={{ scale: 0.9 }}
          animate={activeItem === member.id ? { scale: 1.2, rotate: [0, 5, -5, 0] } : {}}
          className={`w-48 h-48 ${member.color} rounded-full shadow-2xl border-8 border-white flex items-center justify-center text-8xl relative overflow-visible`}
        >
          <img src={member.label} alt={member.name} className="w-3/4 h-3/4 object-contain" />
          
          {activeItem === member.id && (
            <motion.div 
              className="absolute -top-16 bg-white px-6 py-2 rounded-full shadow-lg border-4 border-dragon-blue text-dragon-blue font-black text-2xl uppercase"
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
            >
              {member.name}
            </motion.div>
          )}

          <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity rounded-full" />
        </motion.button>
      ))}
      
      <div className="absolute top-40 text-4xl font-black text-white drop-shadow-lg tracking-widest uppercase">
         Our Royal Family!
      </div>
    </motion.div>
  );
};
