"use client";

import React from "react";
import { motion } from "framer-motion";
import { useStore, Scene } from "../store/useStore";

export const SceneSwitcher: React.FC = () => {
  const { currentScene, setScene } = useStore();

  const scenes: { id: Scene; label: string; name: string }[] = [
    { id: "GARDEN", label: "🏡", name: "Garden" },
    { id: "COLORS", label: "🌈", name: "Colors" },
    { id: "SHAPES", label: "📐", name: "Shapes" },
    { id: "FAMILY", label: "👨‍👩‍👧", name: "Family" },
    { id: "BODY_PARTS", label: "🛡️", name: "Hero" },
  ];

  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex gap-4 glass p-3 rounded-5xl border-white/80 shadow-2xl"
    >
      {scenes.map((scene) => (
        <motion.button
          key={scene.id}
          onClick={() => setScene(scene.id)}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`group flex items-center gap-2 px-5 py-3 rounded-4xl transition-all duration-500 relative overflow-hidden ${
            currentScene === scene.id
              ? "bg-royal-purple text-white shadow-lg shadow-royal-purple/30"
              : "bg-white/40 hover:bg-white/60 text-royal-purple"
          }`}
        >
          {currentScene === scene.id && (
            <motion.div 
              layoutId="nav-bg"
              className="absolute inset-0 bg-royal-purple z-0"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="text-2xl relative z-10">{scene.label}</span>
          {currentScene === scene.id && (
             <motion.span 
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               className="font-display font-bold text-sm uppercase tracking-widest relative z-10"
             >
               {scene.name}
             </motion.span>
          )}
        </motion.button>
      ))}
    </motion.div>
  );
};
