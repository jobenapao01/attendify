import { AbsentApplication } from "@/schemas/absent-application-schema";
import { Student } from "@/schemas/student-schema";
import { create } from "zustand";

type AbsentApplicationState = {
  absentApplication: AbsentApplication[];
  onSave: (data: AbsentApplication) => void;
  onClose: () => void;
};

export const useAbsentApplication = create<AbsentApplicationState>((set) => ({
  absentApplication: [],
  onSave: (data: AbsentApplication) =>
    set((state) => ({
      absentApplication: [...state.absentApplication, data],
    })),
  onClose: () =>
    set({
      absentApplication: [
        {
          studentId: "",
          numberOfDays: 0,
          reason: "",
          dateRange: { from: new Date(), to: new Date() },
        },
      ],
    }),
}));
