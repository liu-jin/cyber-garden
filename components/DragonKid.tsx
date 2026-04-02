"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../store/useStore";

import { SvgIcon } from "./SvgIcon";

export const DragonKid: React.FC = () => {
  const { stars, activeItem, dragonColor } = useStore();
  const [animationState, setAnimationState] = useState<"idle" | "success">("idle");

  useEffect(() => {
    if (activeItem) {
      setAnimationState("success");
      const timer = setTimeout(() => {
        setAnimationState("idle");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeItem]);

  return (
    <div className="fixed bottom-10 right-10 flex flex-col items-end pointer-events-none">
      {/* Dragon Kid Mascot */}
      <motion.div
        animate={
          animationState === "success"
            ? { rotate: [0, 360], scale: [1, 1.25, 1], filter: ["blur(0px)", "blur(2px)", "blur(0px)"] }
            : { y: [0, -10, 0] }
        }
        transition={
          animationState === "success"
            ? { duration: 1, ease: [0.22, 1, 0.36, 1] }
            : { repeat: Infinity, duration: 4, ease: "easeInOut" }
        }
        className="w-44 h-44 relative flex items-center justify-center mb-4"
      >
        <div className="absolute inset-0 bg-white/30 rounded-full blur-3xl scale-75" />
        <SvgIcon 
          src="/images/dragon-kid.svg" 
          color={dragonColor} 
          className="w-full h-full relative z-10 neon-shadow drop-shadow-xl"
        />
        
        {/* Helmet Glowing Effect (Simulation) */}
        <AnimatePresence>
          {animationState === "success" && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: [0, 0.4, 0], scale: [0.5, 2.5, 0.5] }}
               exit={{ opacity: 0 }}
               className="absolute w-full h-full bg-cyber-mint rounded-full blur-[60px] z-0"
             />
          )}
        </AnimatePresence>

        {/* Star Sugar Particles */}
        <AnimatePresence>
          {animationState === "success" && (
            [...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ 
                   opacity: [0, 1, 0], 
                   scale: [0, 1.5, 0], 
                   x: (i % 2 === 0 ? 1 : -1) * (i + 1) * 45, 
                   y: -(i + 1) * 55,
                   rotate: [0, 360]
                }}
                exit={{ opacity: 0 }}
                className="absolute text-4xl filter drop-shadow-lg"
              >
                ✨
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* Star Counter - Glass UI */}
      <motion.div 
        key={stars}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass px-8 py-4 rounded-4xl flex items-center gap-4 border-white/80 shadow-2xl overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-cyber-yellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <motion.span 
          animate={{ scale: [1, 1.4, 1], rotate: [0, 20, -20, 0] }}
          className="text-4xl filter drop-shadow-md"
        >
           ⭐
        </motion.span>
        <div className="flex flex-col">
          <span className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none mb-1">
             Cyber Stars
          </span>
          <span className="font-display font-black text-3xl text-royal-purple tabular-nums leading-none">
            {stars.toString().padStart(2, '0')}
          </span>
        </div>
      </motion.div>
    </div>
  );
};
