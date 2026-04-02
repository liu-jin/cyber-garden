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
  ],
  audio: [
    "/audio/guide_opening.mp3",
    "/audio/success.mp3",
    "/audio/apple.mp3",
    "/audio/banana.mp3",
    "/audio/lion.mp3",
    "/audio/elephant.mp3",
  ],
};

export const AssetPreloader: React.FC = () => {
  const isAudioUnlocked = useStore((state) => state.isAudioUnlocked);

  useEffect(() => {
    // 1. Preload Images immediately
    CORE_ASSETS.images.forEach((src) => {
      assetManager.preloadImage(src).catch(() => {});
    });
  }, []);

  useEffect(() => {
    // 2. Preload Audio only after AudioContext is unlocked
    if (isAudioUnlocked) {
      console.log("🛠️ [基建巡视] 正在为皇子预热音频资产库...");
      CORE_ASSETS.audio.forEach((src) => {
        assetManager.preloadAudio(src).catch(() => {});
      });
    }
  }, [isAudioUnlocked]);

  return null; // Silent worker
};
