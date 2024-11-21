import { create } from "zustand";

type UserState = {
  users: { name: string; matrixNumber: string; password: string }[];
  onSave: (data: {
    name: string;
    matrixNumber: string;
    password: string;
  }) => void;
};

export const useUser = create<UserState>((set) => ({
  users: [],
  onSave: (data: { name: string; matrixNumber: string; password: string }) =>
    set((state) => ({
      users: [
        ...state.users,
        {
          name: data.name,
          matrixNumber: data.matrixNumber,
          password: data.password,
        },
      ],
    })),
  onClose: () => set({ users: [{ name: "", matrixNumber: "", password: "" }] }),
}));
