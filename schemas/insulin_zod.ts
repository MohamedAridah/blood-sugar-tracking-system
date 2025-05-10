import { z } from "zod";

export const InsulinSchema = z.object({
  insulinDose: z
    .number({
      coerce: true,
      invalid_type_error: "Only numbers are allowed",
    })
    .min(1, "Insulin dose is required!"),
  notes: z.string().trim().optional(),
  createdAt: z.date().optional(),
});

export type InsulinFields = z.infer<typeof InsulinSchema>;
