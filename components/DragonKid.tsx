"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../store/useStore";

import { SvgIcon } from "./SvgIcon";

export const DragonKid: React.FC = () => {
  const { stars, activeItem, dragonColor, equippedItems, currentScene } = useStore();
  const [animationState, setAnimationState] = useState<"idle" | "success">("idle");

  const armorLayers = [
    { id: "head", src: "/images/armor/head.svg", socket: "top-[-5%] left-[10%] w-[80%] z-20" },
    { id: "shoulders", src: "/images/armor/shoulders.svg", socket: "top-[25%] left-[0%] w-[100%] z-10" },
    { id: "knees", src: "/images/armor/knees.svg", socket: "bottom-[15%] left-[10%] w-[80%] z-20" },
    { id: "toes", src: "/images/armor/toes.svg", socket: "bottom-[-5%] left-[5%] w-[90%] z-10" },
  ];

  useEffect(() => {
    if (activeItem) {
      setAnimationState("success");
      const timer = setTimeout(() => {
        setAnimationState("idle");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeItem]);

  const isCentral = currentScene === "BODY_PARTS";

  return (
    <div className={`fixed transition-all duration-1000 ease-in-out flex flex-col items-center pointer-events-none ${
      isCentral 
        ? "bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2" 
        : "bottom-10 right-10 items-end"
    }`}>
      {/* Dragon Kid Mascot */}
      <motion.div
        animate={
          animationState === "success"
            ? { rotate: [0, 360], scale: isCentral ? [2, 2.5, 2] : [1, 1.25, 1], filter: ["blur(0px)", "blur(2px)", "blur(0px)"] }
            : { 
                y: [0, -10, 0],
                scale: isCentral ? 2.5 : 1
              }
        }
        transition={
          animationState === "success"
            ? { duration: 1, ease: [0.22, 1, 0.36, 1] }
            : { repeat: Infinity, duration: 4, ease: "easeInOut" }
        }
        className={`${isCentral ? "w-64 h-64" : "w-44 h-44"} relative flex items-center justify-center mb-4 transition-all duration-1000`}
      >
        <div className="absolute inset-0 bg-white/30 rounded-full blur-3xl scale-75" />
        <SvgIcon 
          src="/images/dragon-kid.svg" 
          color={dragonColor} 
          className="w-full h-full relative z-10 neon-shadow drop-shadow-xl"
        />

        {/* Dynamic Armor Layers */}
        <AnimatePresence>
          {armorLayers.map((armor) => (
            equippedItems.includes(armor.id) && (
              <motion.div
                key={armor.id}
                initial={{ opacity: 0, scale: 0.5, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className={`absolute ${armor.socket} pointer-events-none`}
              >
                 <img src={armor.src} alt={armor.id} className="w-full h-full neon-shadow" />
              </motion.div>
            )
          ))}
        </AnimatePresence>
        
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
