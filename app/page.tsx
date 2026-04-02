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
    <main className="relative min-h-screen bg-royal-pearl overflow-hidden cursor-default selection:bg-royal-purple/20">
      <AnimatePresence>
        {!hasEntered && <MagicGate key="gate" />}
      </AnimatePresence>

      {hasEntered && (
        <>
          {/* Top Layer: UI Navigation */}
          <div className="relative z-40">
            <SceneSwitcher />
          </div>
          
          {/* Background Ambient Decor - Royal Style */}
          <div className="fixed inset-0 pointer-events-none z-0">
             <motion.div 
                className="absolute top-[-5%] left-[5%] w-[45%] h-[45%] bg-cyber-mint/15 rounded-full blur-[100px]"
                animate={{ 
                  scale: [1, 1.1, 1],
                  x: [0, 20, 0]
                }}
                transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
             />
             <motion.div 
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-royal-purple/10 rounded-full blur-[140px]"
                animate={{ 
                  scale: [1, 1.05, 1],
                  y: [0, -30, 0]
                }}
                transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
             />
          </div>

          {/* Main Scene Container */}
          <div className="relative z-10 w-full h-full min-h-screen">
            <AnimatePresence mode="wait">
               {renderScene()}
            </AnimatePresence>
          </div>

          {/* Persistent Mascot */}
          <div className="relative z-30">
            <DragonKid />
          </div>
          
          {/* Subtle Grainy Overlay */}
          <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-repeat z-[100]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        </>
      )}
    </main>
  );
}
