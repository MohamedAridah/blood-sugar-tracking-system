import BackButton from "@/components/BackButton";
import MeasurementForm__Create from "@/components/MeasurementForm__Create";

const AddMeasurement = () => {
  return (
    <>
      <BackButton link="/" text="Back to Measurements" variant="link" />
      <section className="max-w-[700px] mx-auto">
        <h3 className="text-2xl mt-8 mb-4 ">Create New Measurement</h3>
        <MeasurementForm__Create />
      </section>
    </>
  );
};

export default AddMeasurement;
