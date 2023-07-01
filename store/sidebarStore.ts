import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ISidebarState {
  state: boolean;
  toggle: () => void;
}

const useSidebarStore = create<ISidebarState>()(
  persist(
    (set) => ({
      state: false,
      toggle: () => set((state) => ({ state: !state.state })),
    }),
    {
      name: "sidebar-storage",
    },
  ),
);
export default useSidebarStore;
