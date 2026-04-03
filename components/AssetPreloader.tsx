"use client";

import { useEffect } from "react";
import { useStore } from "../store/useStore";
import { assetManager } from "../lib/asset-manager";
import { useAudio } from "./AudioProvider";

/**
 * 【赛博王朝】工部尚书专用 - 资产预加载组件
 * 
 * 功能：
 * 1. 在皇子进入乐园前，静默预热核心资产。
 * 2. 确保在“魔法大门”开启后，所有交互皆为“指尖即回响”。
 */

const CORE_ASSETS = {
  images: [
    "/images/apple.svg",
    "/images/banana.svg",
    "/images/lion.svg",
    "/images/elephant.svg",
    "/images/dragon-kid.svg",
    "/images/magic-gate.svg",
    "/images/fountain-red.svg",
    "/images/fountain-blue.svg",
    "/images/fountain-yellow.svg",
    "/images/fountain-green.svg",
    "/images/fountain-purple.svg",
    "/images/shape-circle.svg",
    "/images/shape-square.svg",
    "/images/shape-triangle.svg",
    "/images/shape-star.svg",
    "/images/family-father.svg",
    "/images/family-mother.svg",
    "/images/family-brother.svg",
    "/images/family-sister.svg",
    // Phase 3: Hero Path - Body Parts & Armor
    "/images/armor/head.svg",
    "/images/armor/shoulders.svg",
    "/images/armor/knees.svg",
    "/images/armor/toes.svg",
  ],
  audio: [
    "/audio/guide_opening.mp3",
    "/audio/success.mp3",
    "/audio/apple.mp3",
    "/audio/banana.mp3",
    "/audio/lion.mp3",
    "/audio/elephant.mp3",
    "/audio/red.mp3",
    "/audio/blue.mp3",
    "/audio/yellow.mp3",
    "/audio/green.mp3",
    "/audio/purple.mp3",
    "/audio/circle.mp3",
    "/audio/square.mp3",
    "/audio/triangle.mp3",
    "/audio/star.mp3",
    "/audio/father.mp3",
    "/audio/mother.mp3",
    "/audio/brother.mp3",
    "/audio/sister.mp3",
  ],
  data: [
    "/audio/audio-manifest.json",
  ],
};

export const AssetPreloader: React.FC = () => {
  const isAudioUnlocked = useStore((state) => state.isAudioUnlocked);

  useEffect(() => {
    // 1. Preload Images immediately
    CORE_ASSETS.images.forEach((src) => {
      assetManager.preloadImage(src).catch(() => {});
    });
    // 2. Preload Manifests
    CORE_ASSETS.data.forEach((src) => {
      assetManager.preloadData(src).catch(() => {});
    });
  }, []);

  useEffect(() => {
    // 3. Preload Audio only after AudioContext is unlocked
    if (isAudioUnlocked) {
      console.log("🛠️ [基建巡视] 正在为皇子预热三期【英雄路】音频资产库...");
      CORE_ASSETS.audio.forEach((src) => {
        assetManager.preloadAudio(src).catch(() => {});
      });
    }
  }, [isAudioUnlocked]);

  return null; // Silent worker
};
