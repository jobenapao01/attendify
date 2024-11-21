import { create } from "zustand";

type AbsentModalState = {
  id?: string;
  isOpen: boolean;
  onOpen: (id?: string) => void;
  onClose: () => void;
};

export const useAbsentModal = create<AbsentModalState>((set) => ({
  id: undefined,
  isOpen: false,
  onClose: () => set({ id: undefined, isOpen: false }),
  onOpen: (id?: string) => set({ id, isOpen: true }),
}));
