import { create } from "zustand";

export const useStore = create((set) => ({
  phase: "device",                 // 'device' | 'hero'
  setPhase: (phase) => set({ phase }),

  scrollProgress: 0,               // 0..1, used by navbar ring
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
}));
