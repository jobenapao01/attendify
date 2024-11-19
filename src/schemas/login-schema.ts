import { z } from "zod";

export const loginSchema = z.object({
  matrixNumber: z.string().min(2, {
    message: "Matrix Number should at least be 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password should at least be 8 characters.",
  }),
});

export type Login = z.infer<typeof loginSchema>;
