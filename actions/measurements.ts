"use server";

import prisma from "@/lib/prisma";
import { revalidateTag, unstable_cache } from "next/cache";
import type { Measurement, Prisma } from "@prisma/client";
import { MeasurementsSearchParamsType } from "@/app/searchParams";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { MEASUREMENTS_TAG } from "@/utils/redirect";
import delay from "@/utils/delay";

type GetMeasurementsParams = MeasurementsSearchParamsType;
type MeasurementWithBefore = Pick<Measurement, "beforeMeal">;
type MeasurementWithAfter = Pick<Measurement, "afterMeal">;
type Measurement_Picked = Pick<
  Measurement,
  "userId" | "mealId" | "mealType" | "date"
>;

export const findMeasurementById = async (measurementId: string) => {
  const isFound = await prisma.measurement.findUnique({
    where: { id: measurementId },
  });
  if (!isFound)
    throw new Error(`Measurement is width id #${measurementId}not found`);
  return isFound;
};

export const findMeasurement = async (
  filters: Pick<Measurement, "userId" | "mealId" | "date">,
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
  async (params: GetMeasurementsParams) => {
    console.log("Getting measurements");
    console.log("Params: ", params);

    delay();
    const measurements = await prisma.measurement.findMany({
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
  try {
    console.log("Getting measurement details with id of #", measurementId);
    delay();
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
      console.log(
        "Measurement details for id of #",
        measurementId + " not found"
      );
      throw new Error("Measurement not found");
    }

    console.log("Got measurement details");
    console.log(measurement);
    return measurement;
  } catch (error) {
    console.log("Error With getMeasurement: ", error);
    throw new Error("Unable to get measurement");
  }
};

export const deleteMeasurement = async (id: string) => {
  console.log("Deleting measurement with id of #", id);
  try {
    delay();
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
  measurementData: Measurement_Picked & MeasurementWithBefore
) => {
  console.log("Creating New Before Measurement");
  try {
    const isFound = await findMeasurement(
      {
        userId: measurementData.userId,
        mealId: measurementData.mealId,
        date: measurementData.date,
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
        userId: measurementData.userId,
        mealId: measurementData.mealId,
        mealType: measurementData.mealType,
        beforeMeal: measurementData.beforeMeal,
        date: measurementData.date,
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
  measurementData: Partial<MeasurementWithBefore>
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
};

export const addAfterMealReading = async (
  measurementData: Measurement_Picked & MeasurementWithAfter
) => {
  console.log("Creating New After Measurement");
  try {
    const isFound = await findMeasurement(
      {
        userId: measurementData.userId,
        mealId: measurementData.mealId,
        date: measurementData.date,
      },
      { afterMeal: true }
    );

    if (!isFound?.id) {
      console.log(`Measurement is not existed`);
      console.log("Tips: Redirects to add before measurement first");
      throw {
        message: `No measurement exists for ${measurementData.date}. Tip add before measurement first`,
        code: "MEASUREMENT_NOT_FOUND",
      };
    }

    if (isFound?.id && isFound.afterMeal?.value) {
      console.log(`After Measurement for ${isFound.date} Already Exists`);
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
  measurementData: Partial<MeasurementWithAfter>
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
};
