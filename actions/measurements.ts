"use server";

import prisma from "@/lib/prisma";
import { revalidateTag, unstable_cache } from "next/cache";
import type { Measurement, Prisma } from "@prisma/client";
import { MeasurementsSearchParamsType } from "@/app/searchParams";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { MEASUREMENTS_TAG } from "@/utils/redirect";
import { getUserSession } from "./auth";

type GetMeasurementsParams = MeasurementsSearchParamsType;
type BeforeMeal = NonNullable<Measurement["beforeMeal"]>;
type AfterMeal = NonNullable<Measurement["beforeMeal"]>;
type MeasurementWithBeforeWithoutCreatedAt = {
  beforeMeal: Omit<BeforeMeal, "createdAt"> | null;
};
type MeasurementWithAfterWithoutCreatedAt = {
  afterMeal: Omit<AfterMeal, "createdAt"> | null;
};
type Measurement_Picked = Pick<Measurement, "mealId" | "mealType" | "date">;

export const findMeasurementById = async (measurementId: string) => {
  const isFound = await prisma.measurement.findUnique({
    where: { id: measurementId },
  });
  if (!isFound)
    throw new Error(`Measurement with id #${measurementId} is not found`);
  return isFound;
};

export const findMeasurement = async (
  filters: Pick<Measurement, "userId" | "mealId" | "dateString">,
  selectedFields?: Partial<{ [K in keyof Measurement]: boolean }>,
  selectInsulin: boolean = false
) => {
  return await prisma.measurement.findFirst({
    where: { ...filters },
    select: {
      id: true,
      date: true,
      insulinDose: selectInsulin ? { select: { units: true } } : false,
      ...selectedFields,
    },
  });
};

export const getMeasurements = unstable_cache(
  async (userId: string, params: GetMeasurementsParams) => {
    console.log("Getting measurements");
    console.log("Params: ", params);

    const measurements = await prisma.measurement.findMany({
      where: {
        userId,
      },
      take: params.limit,
      include: {
        insulinDose: {
          select: {
            units: true,
          },
        },
      },
      orderBy: {
        date: (params.sort as Prisma.SortOrder) || "desc",
      },
    });
    const count = await prisma.measurement.count();
    console.log(measurements);
    console.log("Got measurements");
    return { measurements, count };
  },
  [MEASUREMENTS_TAG],
  {
    tags: [MEASUREMENTS_TAG],
  }
);

export const getMeasurement = async (measurementId: string) => {
  return unstable_cache(
    async () => {
      console.log(`Fetching Measurement details for ID: ${measurementId}`);
      try {
        const measurement = await prisma.measurement.findUnique({
          where: { id: measurementId },
          include: {
            insulinDose: {
              select: {
                units: true,
                notes: true,
                createdAt: true,
              },
            },
          },
        });

        if (!measurement) {
          const message = `Measurement with ID ${measurementId} not found`;
          console.warn(message);
          throw new Error(message);
        }

        console.log("Measurement retrieved successfully:", measurement);
        return measurement;
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        console.log("Error In getMeasurement: ", error);
        return { error: errorMessage };
      }
    },
    [`${MEASUREMENTS_TAG}-${measurementId}`],
    {
      tags: [`${MEASUREMENTS_TAG}-${measurementId}`],
    }
  )();
};

export const deleteMeasurement = async (id: string) => {
  console.log("Deleting measurement with id of #", id);
  try {
    console.log("Deleting measurement");
    await prisma.measurement.delete({ where: { id } });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
  revalidateTag(MEASUREMENTS_TAG);
};

export const addBeforeMealReading = async (
  measurementData: Measurement_Picked & MeasurementWithBeforeWithoutCreatedAt
) => {
  console.log("Creating New Before Measurement");
  try {
    const { user } = await getUserSession();
    const userId = user?.id;
    if (!userId) throw new Error("Not authenticated");

    const isFound = await findMeasurement(
      {
        userId,
        mealId: measurementData.mealId,
        dateString: measurementData.date.toISOString().split("T")[0],
      },
      { beforeMeal: true }
    );

    if (isFound?.id && isFound.beforeMeal?.value) {
      console.log(`Before Measurement for ${isFound.date} Already Exists`);
      console.log("Tips: Redirects to edit page");
      throw {
        message: "Before measurement already exists.",
        code: "MEASUREMENT_EXISTS",
        id: isFound.id,
      };
    }

    console.log("Creating New Before Measurement Because It's not Exists yet.");

    await prisma.measurement.create({
      data: {
        userId,
        mealId: measurementData.mealId,
        mealType: measurementData.mealType,
        beforeMeal: measurementData.beforeMeal,
        date: measurementData.date,
        dateString: measurementData.date.toISOString().split("T")[0],
      },
    });
  } catch (error: unknown) {
    console.log("Error With createMeasurement__before: ", error);
    return {
      error: getErrorMessage(error),
    };
  }

  revalidateTag(MEASUREMENTS_TAG);
};

export const updateBeforeMealReading = async (
  measurementId: string,
  measurementData: Partial<MeasurementWithBeforeWithoutCreatedAt>
) => {
  console.log("Incomming: ", measurementData);

  console.log("Updating Before Measurement");
  try {
    await prisma.measurement.update({
      where: {
        id: measurementId,
      },
      data: {
        beforeMeal: measurementData.beforeMeal,
      },
    });
  } catch (error: unknown) {
    console.log("Error With updateBeforeMealReading: ", error);
    return {
      error: getErrorMessage(error),
    };
  }
  revalidateTag(MEASUREMENTS_TAG);
  revalidateTag(`${MEASUREMENTS_TAG}-${measurementId}`);
};

export const addAfterMealReading = async (
  measurementData: Measurement_Picked & MeasurementWithAfterWithoutCreatedAt
) => {
  console.log("Creating New After Measurement");
  try {
    const { user } = await getUserSession();
    const userId = user?.id;
    if (!userId) throw new Error("Not authenticated");

    const dateString = measurementData.date.toISOString().split("T")[0];
    const isFound = await findMeasurement(
      {
        userId,
        mealId: measurementData.mealId,
        dateString,
      },
      { afterMeal: true }
    );

    if (!isFound?.id) {
      console.log(`Measurement is not existed`);
      console.log("Tips: Redirects to add before measurement first");
      throw {
        message: `No measurement exists for ${dateString}. Tip add before measurement first`,
        code: "MEASUREMENT_NOT_FOUND",
      };
    }

    if (isFound?.id && isFound.afterMeal?.value) {
      console.log(`After Measurement for ${dateString} Already Exists`);
      console.log("Tips: Redirects to edit page");
      throw {
        message: "After measurement already exists.",
        code: "MEASUREMENT_EXISTS",
      };
    }

    console.log("Creating New After Measurement Because It's not Exists yet.");
    await prisma.measurement.update({
      where: {
        id: isFound.id,
      },
      data: {
        afterMeal: measurementData.afterMeal,
      },
    });
  } catch (error: unknown) {
    console.log("Error With createMeasurement__after: ", error);
    return {
      error: getErrorMessage(error),
    };
  }

  revalidateTag(MEASUREMENTS_TAG);
};

export const updateAfterMealReading = async (
  measurementId: string,
  measurementData: Partial<MeasurementWithAfterWithoutCreatedAt>
) => {
  console.log("Incomming: ", measurementData);

  console.log("Updating After Measurement");
  try {
    await prisma.measurement.update({
      where: {
        id: measurementId,
      },
      data: {
        afterMeal: measurementData.afterMeal,
      },
    });
  } catch (error: unknown) {
    console.log("Error With updateAfterReading: ", error);
    return {
      error: getErrorMessage(error),
    };
  }

  revalidateTag(MEASUREMENTS_TAG);
  revalidateTag(`${MEASUREMENTS_TAG}-${measurementId}`);
};
