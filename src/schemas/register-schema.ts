import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(4, { message: "Name should at least be 4 characters." }),
  matrixNumber: z.string().min(2, {
    message: "Matrix Number should at least be 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password should at least be 8 characters.",
  }),
});

export type Register = z.infer<typeof registerSchema>;
