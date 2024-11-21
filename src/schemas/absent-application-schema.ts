import { z } from "zod";

export const absentApplicationSchema = z
  .object({
    dateRange: z.object(
      {
        from: z.date(),
        to: z.date(),
      },
      {
        required_error: "Please select a date range",
      }
    ),
    numberOfDays: z.number().default(0),
    reason: z
      .string()
      .min(4, { message: "Reason should at least be 4 characters." }),
    studentId: z.string(),
    status: z.enum(["In Progress", "Approved"]).default("In Progress"),
  })
  .refine((data) => data.dateRange.from < data.dateRange.to, {
    path: ["dateRange"],
    message: "From date must be before to date",
  });

export type AbsentApplication = z.infer<typeof absentApplicationSchema>;
export type AbsentApplicationStatus = z.infer<
  typeof absentApplicationSchema
>["status"];
