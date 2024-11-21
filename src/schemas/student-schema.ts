import { z } from "zod";

export const studentSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(4, { message: "Name should at least have 4 characters." }),
  course: z
    .string()
    .min(4, { message: "Course should at least have 4 characters." }),
});

export type Student = z.infer<typeof studentSchema>;
