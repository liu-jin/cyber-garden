"use client";

import React from "react";
import { motion } from "framer-motion";
import { useStore, Scene } from "../store/useStore";

export const SceneSwitcher: React.FC = () => {
  const { currentScene, setScene } = useStore();

  const scenes: { id: Scene; label: string }[] = [
    { id: "GARDEN", label: "🏡" },
    { id: "COLORS", label: "🌈" },
    { id: "SHAPES", label: "📐" },
    { id: "FAMILY", label: "👨‍👩‍👧" },
  ];

  return (
    <div className="fixed top-10 left-1/2 -translate-x-1/2 z-40 flex space-x-6 bg-white/50 backdrop-blur-md p-4 rounded-full shadow-lg border-4 border-white">
      {scenes.map((scene) => (
        <motion.button
          key={scene.id}
          onClick={() => setScene(scene.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl border-4 transition-colors ${
            currentScene === scene.id
              ? "bg-dragon-blue border-white text-white"
              : "bg-white border-dragon-blue text-dragon-blue opacity-50"
          }`}
        >
          {scene.label}
        </motion.button>
      ))}
    </div>
  );
};
