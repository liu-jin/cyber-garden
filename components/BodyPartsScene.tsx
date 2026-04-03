"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../store/useStore";
import { useAudio } from "./AudioProvider";

type Part = "head" | "shoulders" | "knees" | "toes";

const PARTS: Part[] = ["head", "shoulders", "knees", "toes"];

export const BodyPartsScene: React.FC = () => {
  const { equipItem, addStar, setActiveItem } = useStore();
  const { playAudio } = useAudio();
  const [currentTarget, setCurrentTarget] = useState<Part | null>(null);
  const [showHint, setShowHint] = useState(false);

  // Initialize game
  useEffect(() => {
    const startTimer = setTimeout(() => {
      pickNewTarget();
    }, 1500);
    return () => clearTimeout(startTimer);
  }, []);

  const pickNewTarget = async () => {
    const remaining = PARTS; 
    const next = remaining[Math.floor(Math.random() * remaining.length)];
    setCurrentTarget(next);
    setActiveItem(next); 
    setShowHint(false);
    
    try {
      await playAudio(`/audio/command_${next}.mp3`);
    } catch (err) {
      console.error("Audio failed:", err);
    }
  };

  const handleTouch = async (part: Part) => {
    if (part === currentTarget) {
      // Correct!
      equipItem(part);
      addStar();
      setActiveItem(`${part}_success`); 
      
      try {
        await playAudio(`/audio/success.mp3`);
        await playAudio(`/audio/${part}.mp3`);
      } catch {}

      // Delay before next target
      setTimeout(() => {
        pickNewTarget();
      }, 3000);
    } else {
      // Wrong - gentle feedback
      setActiveItem(`${part}_wrong`); 
      setShowHint(true);
      try {
        await playAudio(`/audio/wrong.mp3`);
      } catch {}
    }
  };

  const hotspots = [
    { id: "head", pos: "top-[20%] left-1/2 -translate-x-1/2 w-40 h-40" },
    { id: "shoulders", pos: "top-[40%] left-1/2 -translate-x-1/2 w-72 h-32" },
    { id: "knees", pos: "bottom-[30%] left-1/2 -translate-x-1/2 w-48 h-32" },
    { id: "toes", pos: "bottom-[15%] left-1/2 -translate-x-1/2 w-64 h-32" },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-royal-pearl to-white opacity-50" />

      {/* Instructional Title - Visual Only */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-24 left-1/2 -translate-x-1/2 text-center"
      >
        <h2 className="text-4xl font-display font-black text-royal-purple/30 uppercase tracking-[0.3em]">
          Hero Armor Challenge
        </h2>
        <div className="mt-2 text-royal-purple/20 font-bold">
           TOUCH THE {currentTarget?.toUpperCase()}
        </div>
      </motion.div>

      {/* Interaction Hotspots - Invisible but clickable */}
      <div className="relative w-[500px] h-[700px] z-20">
        {hotspots.map((spot) => (
          <button
            key={spot.id}
            onClick={() => handleTouch(spot.id as Part)}
            className={`absolute ${spot.pos} rounded-full transition-all duration-300 ${
              showHint && spot.id === currentTarget 
                ? "border-4 border-cyber-mint border-dashed animate-pulse bg-cyber-mint/10" 
                : "hover:bg-white/10"
            }`}
          >
            <span className="sr-only">{spot.id}</span>
          </button>
        ))}
      </div>

      {/* Floating Instructions Text (Minimal) */}
      <AnimatePresence>
        {currentTarget && (
          <motion.div
            key={currentTarget}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            className="absolute bottom-1/4 glass px-10 py-6 rounded-5xl border-white/80 shadow-2xl z-40 pointer-events-none"
          >
            <span className="text-6xl mr-4">🛡️</span>
            <span className="text-3xl font-display font-black text-royal-purple">
              {currentTarget.toUpperCase()}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Pearl Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-white rounded-full blur-sm opacity-20"
            animate={{
              x: [Math.random() * 1000, Math.random() * 1000],
              y: [Math.random() * 1000, Math.random() * 1000],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
};
