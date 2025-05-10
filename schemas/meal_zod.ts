import { z } from "zod";

export const MealSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Meal name is required" })
    .transform((val) => val.toLowerCase()),
  description: z.string().optional(),
});

export type MealSchemaType = z.infer<typeof MealSchema>;
