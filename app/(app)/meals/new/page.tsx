import BackButton from "@/components/BackButton";
import MealForm__Create from "@/components/forms/MealForm__Create";

const Meal = async () => {
  return (
    <>
      <BackButton />
      <h2 className="font-semibold mb-2 text-xl">Create New Meal</h2>
      <section className="max-w-[700px]">
        <MealForm__Create formData={{ userId: "680fd0ec954a447f2cef1b0c" }} />
      </section>
    </>
  );
};

export default Meal;
