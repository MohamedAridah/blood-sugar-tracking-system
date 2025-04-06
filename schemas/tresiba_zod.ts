import { z } from "zod";

export const TresibaSchema = z.object({
  tresibaDose: z
    .number({
      coerce: true,
      invalid_type_error: "Only numbers are allowed",
    })
    .min(1, "Tresiba dose is required!"),
  notes: z.string().optional(),
  createdAt: z.date().optional(),
});

export type TresibaFields = z.infer<typeof TresibaSchema>;
