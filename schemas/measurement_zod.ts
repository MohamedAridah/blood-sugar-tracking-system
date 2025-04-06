import { Prisma } from "@prisma/client";
import { z } from "zod";

export const MeasurementSchema = z.object({
  id: z.string().optional(),
  bloodSugarLevel: z
    .number({
      coerce: true,
      invalid_type_error: "Only numbers are allowed",
    })
    .min(1, "sugar level is required!"),
  measurementType: z.string().min(1, "Meal is required"),
  insulinDose: z
    .number({
      coerce: true,
      invalid_type_error: "Only numbers are allowed",
    })
    .min(1, "Insulin dose is required!"),
  userId: z.string().optional(),
  notes: z.string().optional(),
  createdAt: z.date().optional(),
});

export type MeasurementFields = z.infer<typeof MeasurementSchema>;

export type MeasurementFieldsWithId = {
  id: string;
} & MeasurementFields;
