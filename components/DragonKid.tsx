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
    <div className="fixed bottom-10 right-10 flex flex-col items-center">
      {/* Dragon Kid Mascot */}
      <motion.div
        animate={
          animationState === "success"
            ? { rotate: [0, 360], scale: [1, 1.3, 1] }
            : { y: [0, -10, 0] }
        }
        transition={
          animationState === "success"
            ? { duration: 1, ease: "easeInOut" }
            : { repeat: Infinity, duration: 3, ease: "easeInOut" }
        }
        className="w-40 h-40 relative flex items-center justify-center"
      >
        <SvgIcon 
          src="/images/dragon-kid.svg" 
          color={dragonColor} 
          className="w-full h-full"
        />
        
        {/* Helmet Glowing Effect (Simulation) */}
        {animationState === "success" && (
           <motion.div 
             initial={{ opacity: 0, scale: 0.5 }}
             animate={{ opacity: [0, 0.5, 0], scale: [0.5, 2, 0.5] }}
             className="absolute w-full h-full bg-cyan-200 rounded-full blur-2xl z-[-1]"
           />
        )}

        {/* Star Sugar Particles */}
        <AnimatePresence>
          {animationState === "success" && (
            [...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ 
                   opacity: [0, 1, 0], 
                   scale: [0, 1, 0.5], 
                   x: (i % 2 === 0 ? 1 : -1) * (i + 1) * 30, 
                   y: -(i + 1) * 40 
                }}
                exit={{ opacity: 0 }}
                className="absolute text-3xl"
              >
                ⭐
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* Star Counter Bubble */}
      <motion.div 
        key={stars}
        animate={{ scale: [1, 1.2, 1] }}
        className="mt-6 bg-white px-8 py-3 rounded-full shadow-2xl text-dragon-blue font-black text-2xl border-4 border-dragon-blue"
      >
        STARS: {stars}
      </motion.div>
    </div>
  );
};
