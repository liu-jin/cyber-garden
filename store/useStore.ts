import { create } from "zustand";

export type Scene = "GARDEN" | "COLORS" | "SHAPES" | "FAMILY" | "BODY_PARTS" | "ETIQUETTE" | "SONGS";

interface AppState {
  hasEntered: boolean;
  isAudioUnlocked: boolean;
  activeItem: string | null;
  stars: number;
  currentScene: Scene;
  dragonColor: string;
  equippedItems: string[];
  enterGarden: () => void;
  unlockAudio: () => void;
  setActiveItem: (item: string | null) => void;
  addStar: () => void;
  setScene: (scene: Scene) => void;
  setDragonColor: (color: string) => void;
  equipItem: (item: string) => void;
}

export const useStore = create<AppState>((set) => ({
  hasEntered: false,
  isAudioUnlocked: false,
  activeItem: null,
  stars: 0,
  currentScene: "GARDEN",
  dragonColor: "#4FD1C5", // Default dragon-blue
  equippedItems: [],
  enterGarden: () => set({ hasEntered: true }),
  unlockAudio: () => set({ isAudioUnlocked: true }),
  setActiveItem: (item) => set({ activeItem: item }),
  addStar: () => set((state) => ({ stars: state.stars + 1 })),
  setScene: (scene) => set({ currentScene: scene, activeItem: null }),
  setDragonColor: (color) => set({ dragonColor: color }),
  equipItem: (item) => set((state) => ({ 
    equippedItems: state.equippedItems.includes(item) 
      ? state.equippedItems 
      : [...state.equippedItems, item] 
  })),
}));
