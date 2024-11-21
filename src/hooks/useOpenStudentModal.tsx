import { create } from "zustand";

type StudentModalState = {
  id?: string;
  isOpen: boolean;
  onOpen: (id?: string) => void;
  onClose: () => void;
};

export const useStudentModal = create<StudentModalState>((set) => ({
  id: undefined,
  isOpen: false,
  onClose: () => set({ id: undefined, isOpen: false }),
  onOpen: (id?: string) => set({ id, isOpen: true }),
}));
