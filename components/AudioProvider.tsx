"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { useStore } from "../store/useStore";
import { assetManager } from "../lib/asset-manager";

interface AudioContextType {
  playAudio: (id: string) => Promise<void>;
  unlock: () => Promise<void>;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const unlockAudio = useStore((state) => state.unlockAudio);

  const unlock = async () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
      assetManager.setAudioContext(audioContextRef.current);
    }
    
    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }
    
    // Play silent buffer
    const buffer = audioContextRef.current.createBuffer(1, 1, 22050);
    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextRef.current.destination);
    source.start(0);
    
    unlockAudio();
    console.log("AudioContext unlocked and resumed.");
  };

  const playAudio = (src: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      if (!audioContextRef.current) {
        resolve();
        return;
      }

      try {
        // Use AssetManager to get or preload audio
        let audioBuffer = assetManager.getAudio(src);
        if (!audioBuffer) {
          audioBuffer = await assetManager.preloadAudio(src);
        }

        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContextRef.current.destination);
        
        source.onended = () => {
          resolve();
        };

        source.start(0);
      } catch (err) {
        console.error("Failed to play audio:", err);
        // Fail silently for certain files (e.g., non-existent suffixes)
        if (src.includes('_suffix')) {
          resolve();
        } else {
          reject(err);
        }
      }
    });
  };

  return (
    <AudioContext.Provider value={{ playAudio, unlock }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within AudioProvider");
  return context;
};
