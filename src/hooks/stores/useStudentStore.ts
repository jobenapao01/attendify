import { Student } from "@/schemas/student-schema";
import { create } from "zustand";

type StudentState = {
  students: Student[];
  onSave: (data: Student) => void;
  onClose: () => void;
};

export const useStudent = create<StudentState>((set) => ({
  students: [],
  onSave: (data: Student) =>
    set((state) => ({
      students: [...state.students, data],
    })),
  onClose: () => set({ students: [{ id: "", name: "", course: "" }] }),
}));
