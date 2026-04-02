"use client";

import React from "react";
import { useStore } from "../store/useStore";
import { MagicGate } from "../components/MagicGate";
import { DragonKid } from "../components/DragonKid";
import { SceneSwitcher } from "../components/SceneSwitcher";
import { GardenScene } from "../components/GardenScene";
import { ColorsScene } from "../components/ColorsScene";
import { ShapesScene } from "../components/ShapesScene";
import { FamilyScene } from "../components/FamilyScene";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { hasEntered, currentScene } = useStore();

  const renderScene = () => {
    switch (currentScene) {
      case "GARDEN":
        return <GardenScene key="garden" />;
      case "COLORS":
        return <ColorsScene key="colors" />;
      case "SHAPES":
        return <ShapesScene key="shapes" />;
      case "FAMILY":
        return <FamilyScene key="family" />;
      default:
        return <GardenScene key="garden" />;
    }
  };

  return (
    <main className="relative min-h-screen bg-[#E6FFFA] overflow-hidden cursor-default">
      <AnimatePresence>
        {!hasEntered && <MagicGate key="gate" />}
      </AnimatePresence>

      {hasEntered && (
        <>
          <SceneSwitcher />
          
          <AnimatePresence mode="wait">
             {renderScene()}
          </AnimatePresence>

          <DragonKid />
          
          {/* Subtle Ambient Background Elements */}
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
        </>
      )}
    </main>
  );
}
