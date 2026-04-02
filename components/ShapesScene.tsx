"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useStore } from "../store/useStore";
import { useAudio } from "./AudioProvider";

interface ShapeProps {
  id: string;
  label: string;
  targetX: number;
  targetY: number;
  onFit: () => void;
}

const ShapeItem: React.FC<ShapeProps> = ({ id, label, targetX, targetY, onFit }) => {
  const [isFitted, setIsFitted] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleDragEnd = () => {
    if (isFitted) return;
    
    const dx = x.get() - targetX;
    const dy = y.get() - targetY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 80) {
      x.set(targetX);
      y.set(targetY);
      setIsFitted(true);
      onFit();
    }
  };

  return (
    <motion.div
      drag={!isFitted}
      dragSnapToOrigin={!isFitted}
      onDragEnd={handleDragEnd}
      style={{ x, y }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`absolute w-32 h-32 flex items-center justify-center text-7xl cursor-grab active:cursor-grabbing z-10 transition-shadow ${
        isFitted ? "cursor-default drop-shadow-2xl" : "drop-shadow-md"
      }`}
    >
      <span className={isFitted ? "scale-110" : ""}>{label}</span>
      {isFitted && (
        <motion.div 
           initial={{ scale: 0 }}
           animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
           className="absolute pointer-events-none"
        >
          💖
        </motion.div>
      )}
    </motion.div>
  );
};

export const ShapesScene: React.FC = () => {
  const { addStar, setActiveItem } = useStore();
  const { playAudio } = useAudio();
  const [fittedShapes, setFittedShapes] = useState<Set<string>>(new Set());

  const shapes = [
    { id: "circle", label: "/images/shape-circle.svg", targetX: -200, targetY: -100, name: "Circle" },
    { id: "square", label: "/images/shape-square.svg", targetX: 200, targetY: -100, name: "Square" },
    { id: "triangle", label: "/images/shape-triangle.svg", targetX: -200, targetY: 150, name: "Triangle" },
    { id: "star", label: "/images/shape-star.svg", targetX: 200, targetY: 150, name: "Star" },
  ];

  const handleFit = async (shape: typeof shapes[0]) => {
    setFittedShapes((prev) => new Set(prev).add(shape.id));
    setActiveItem(shape.id);
    
    try {
      await playAudio(`/audio/${shape.id}.mp3`);
      try {
        await playAudio(`/audio/${shape.id}_suffix.mp3`);
      } catch {}
      
      addStar();
      if (fittedShapes.size + 1 === shapes.length) {
         await playAudio("/audio/success.mp3");
      }
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
      className="p-12 h-screen relative flex items-center justify-center pt-32"
    >
      {/* Target Slots */}
      {shapes.map((shape) => (
        <div
          key={`slot-${shape.id}`}
          className="absolute w-40 h-40 border-8 border-dashed border-white/30 rounded-full flex items-center justify-center bg-white/5"
          style={{ transform: `translate(${shape.targetX}px, ${shape.targetY}px)` }}
        >
          <span className="text-4xl opacity-20 filter grayscale">{shape.label}</span>
        </div>
      ))}

      {/* Draggable Shapes */}
      <div className="relative">
         {shapes.map((shape, i) => (
            <div key={`shape-wrap-${shape.id}`} className="absolute" style={{ left: (i - 1.5) * 150, top: 0 }}>
               <ShapeItem 
                 id={shape.id} 
                 label={shape.label} 
                 targetX={shape.targetX - (i - 1.5) * 150} 
                 targetY={shape.targetY} 
                 onFit={() => handleFit(shape)} 
               />
            </div>
         ))}
      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white font-bold text-3xl animate-pulse">
         Drag the shapes to their places!
      </div>
    </motion.div>
  );
};
