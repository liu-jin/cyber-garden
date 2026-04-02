"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useStore } from "../store/useStore";
import { useAudio } from "./AudioProvider";
import { SvgIcon } from "./SvgIcon";

interface ShapeProps {
  id: string;
  icon: string;
  color: string;
  targetX: number;
  targetY: number;
  onFit: () => void;
  name: string;
}

const ShapeItem: React.FC<ShapeProps> = ({ id, icon, color, targetX, targetY, onFit, name }) => {
  const [isFitted, setIsFitted] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth spring motion
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const handleDragEnd = () => {
    if (isFitted) return;
    
    const dx = x.get() - targetX;
    const dy = y.get() - targetY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 100) {
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
      style={{ x: isFitted ? targetX : x, y: isFitted ? targetY : y }}
      whileHover={!isFitted ? { scale: 1.1, rotate: 5 } : {}}
      whileTap={!isFitted ? { scale: 0.9, rotate: -5 } : {}}
      className={`absolute w-36 h-36 flex items-center justify-center cursor-grab active:cursor-grabbing z-20 transition-all duration-500 ${
        isFitted ? "cursor-default drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]" : "drop-shadow-2xl"
      }`}
    >
      <div className={`w-full h-full relative ${isFitted ? "scale-110" : ""}`}>
         <SvgIcon src={icon} color={color} className="w-full h-full" />
      </div>

      <AnimatePresence>
        {isFitted && (
          <motion.div 
             initial={{ opacity: 0, scale: 0.5 }}
             animate={{ opacity: 1, scale: 1.2 }}
             exit={{ opacity: 0 }}
             className="absolute -top-8 glass px-4 py-1 rounded-full text-white font-display font-black text-sm uppercase tracking-widest border-white/20"
          >
            {name}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const ShapesScene: React.FC = () => {
  const { addStar, setActiveItem } = useStore();
  const { playAudio } = useAudio();
  const [fittedShapes, setFittedShapes] = useState<Set<string>>(new Set());

  const shapes = [
    { id: "circle", icon: "/images/shape-circle.svg", color: "#FF4D4D", targetX: -300, targetY: -150, name: "Circle" },
    { id: "square", icon: "/images/shape-square.svg", color: "#4D94FF", targetX: 300, targetY: -150, name: "Square" },
    { id: "triangle", icon: "/images/shape-triangle.svg", color: "#4DFF88", targetX: -300, targetY: 150, name: "Triangle" },
    { id: "star", icon: "/images/shape-star.svg", color: "#FFD633", targetX: 300, targetY: 150, name: "Star" },
  ];

  const handleFit = async (shape: typeof shapes[0]) => {
    setFittedShapes((prev) => {
      const next = new Set(prev).add(shape.id);
      return next;
    });
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
      className="p-12 h-screen relative flex items-center justify-center pt-40"
    >
      {/* Target Slots - Glass Cavities */}
      {shapes.map((shape) => (
        <div
          key={`slot-${shape.id}`}
          className="absolute w-44 h-44 rounded-3xl flex items-center justify-center bg-black/10 border-2 border-white/10 shadow-[inset_0_4px_12px_rgba(0,0,0,0.5)] overflow-hidden"
          style={{ transform: `translate(${shape.targetX}px, ${shape.targetY}px)` }}
        >
          <div className="opacity-10 scale-90 filter brightness-200">
             <SvgIcon src={shape.icon} color="#FFFFFF" className="w-32 h-32" />
          </div>
          
          {/* Slot Glow if not fitted */}
          {!fittedShapes.has(shape.id) && (
            <motion.div 
              className="absolute inset-0 bg-white/5"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          )}
        </div>
      ))}

      {/* Draggable Shapes - Centered initially */}
      <div className="relative z-30">
         {shapes.map((shape, i) => (
            !fittedShapes.has(shape.id) && (
              <div 
                key={`shape-wrap-${shape.id}`} 
                className="absolute" 
                style={{ 
                   left: (i - 1.5) * 160, 
                   top: 200, 
                }}
              >
                 <ShapeItem 
                   id={shape.id} 
                   icon={shape.icon} 
                   color={shape.color}
                   name={shape.name}
                   targetX={shape.targetX - (i - 1.5) * 160} 
                   targetY={shape.targetY - 200} 
                   onFit={() => handleFit(shape)} 
                 />
              </div>
            )
         ))}
         
         {/* Re-render fitted shapes at their slots */}
         {shapes.map((shape, i) => (
            fittedShapes.has(shape.id) && (
              <div 
                key={`shape-fitted-${shape.id}`} 
                className="absolute" 
                style={{ 
                   left: shape.targetX, 
                   top: shape.targetY, 
                }}
              >
                 <div className="w-36 h-36 flex items-center justify-center drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]">
                    <SvgIcon src={shape.icon} color={shape.color} className="w-full h-full" />
                 </div>
              </div>
            )
         ))}
      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 glass px-12 py-4 rounded-full border-white/30 text-white font-display font-black text-2xl uppercase tracking-[0.3em] shadow-2xl animate-pulse">
         Fit the Royal Shapes
      </div>
    </motion.div>
  );
};
