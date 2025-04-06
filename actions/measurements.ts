"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { MeasurementFields } from "@/schemas/measurement_zod";
import delay from "@/utils/delay";

export const getMeasurements = unstable_cache(
  async (limit?: number) => {
    console.log("Getting measurements");
    delay();
    const measurements = await prisma.measurements.findMany({
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    const count = await prisma.measurements.count()
    console.log(measurements);
    console.log("Got measurements");
    return {measurements,count};
  },
  ["measurements__key"],
  {
    tags: ["measurements__key"],
    revalidate: false,
  }
);

export const getMeasurement = async (id: string) => {
  try {
    console.log("Getting measurement details with id of #", id);
    delay();
    const measurement = await prisma.measurements.findUnique({
      where: { id },
    });
    console.log("Got measurement details");
    return measurement;
  } catch (error) {
    console.log("Custom Error getmeasurement", error);
    throw new Error("Failed to get measurement with id of #" + id);
  }
};

// export const getMeasurement = async (id: string) => {
//   unstable_cache(
//     async () => {
//       try {
//         console.log("Getting measurement details with id of #", id);
//         delay();
//         const measurement = await prisma.measurements.findUnique({
//           where: { id },
//         });
//         console.log("Got measurement details");
//         return measurement;
//       } catch (error) {
//         console.log("Custom Error getmeasurement", error);
//         throw new Error("Failed to get measurement with id of #" + id);
//       }
//     },
//     [`measurement:${id}`],
//     {
//       tags: [`measurement:${id}`],
//       revalidate: false,
//     }
//   );
// };

export const addMeasurement = async (formData: MeasurementFields) => {
  console.log("Submitting form, ", formData);
  delay();
  const measurement = await prisma.measurements.create({
    data: {
      ...formData,
      userId: "67efd23991c18e2aef414bec",
    },
  });
  console.log("measurement created");
  revalidateTag("measurements__key");
  redirect("/measurements");
};

export const updateMeasurement = async (
  id: string,
  formData: MeasurementFields
) => {
  console.log("Updated data: ", formData);
  console.log("Submitting form, ", formData);
  delay();
  const measurement = await prisma.measurements.update({
    where: {
      id,
    },
    data: formData,
  });
  console.log("measurement updated");
  // revalidateTag(`measurement:${id}`);
  revalidatePath(`/measurements/${id}/details`);
  revalidateTag("measurements__key");
  redirect("/measurements");
};

export const deleteMeasurement = async (id: string) => {
  console.log("Deleting measurement with id of #", id);
  delay();
  const measurement = await prisma.measurements.delete({ where: { id } });
  console.log("deleted measurement");
  revalidateTag("measurements__key");
  redirect("/measurements");
};
