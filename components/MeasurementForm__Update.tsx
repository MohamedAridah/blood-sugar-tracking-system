"use client";
import { SubmitHandler } from "react-hook-form";
import { MeasurementFields } from "@/schemas/measurement_zod";

import { updateMeasurement } from "@/actions/measurements";
import MeasurementForm from "./MeasurementForm";

type Props = {
  data: MeasurementFields;
  id: string;
};

const MeasurementForm__Update = ({ id, data: formData }: Props) => {
  const onSubmit: SubmitHandler<MeasurementFields> = async (
    data: MeasurementFields
  ) => {
    await updateMeasurement(id, data);
  };

  return <MeasurementForm data={formData} formHandler={onSubmit} />;
};

export default MeasurementForm__Update;
