"use client";

import { SubmitHandler } from "react-hook-form";
import { MeasurementFields } from "@/schemas/measurement_zod";

import { addMeasurement } from "@/actions/measurements";
import MeasurementForm from "./MeasurementForm";

const MeasurementForm__Create = () => {
  const onSubmit: SubmitHandler<MeasurementFields> = async (
    data: MeasurementFields
  ) => {
    await addMeasurement(data);
  };

  return <MeasurementForm formHandler={onSubmit} />;
};

export default MeasurementForm__Create;
