import { create } from "zustand";

interface AppState {
  hasEntered: boolean;
  isAudioUnlocked: boolean;
  activeItem: string | null;
  stars: number;
  enterGarden: () => void;
  unlockAudio: () => void;
  setActiveItem: (item: string | null) => void;
  addStar: () => void;
}

export const useStore = create<AppState>((set) => ({
  hasEntered: false,
  isAudioUnlocked: false,
  activeItem: null,
  stars: 0,
  enterGarden: () => set({ hasEntered: true }),
  unlockAudio: () => set({ isAudioUnlocked: true }),
  setActiveItem: (item) => set({ activeItem: item }),
  addStar: () => set((state) => ({ stars: state.stars + 1 })),
}));
