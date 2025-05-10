import { z } from "zod";

export const MeasurementSchema = z.object({
  bloodSugarLevel: z
    .number({ coerce: true, invalid_type_error: "Only numbers are allowed." })
    .min(1, "Sugar level is required!"),
    notes: z.string().trim().optional(),
    createdAt: z.date().optional(),
});

export type MeasurementFields = z.infer<typeof MeasurementSchema>;
