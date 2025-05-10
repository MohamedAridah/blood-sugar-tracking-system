import BackButton from "@/components/BackButton";
import MealForm from "@/components/forms/MealForm";

const Meal = async () => {
  return (
    <>
      <BackButton />
      <h2 className="font-semibold mb-2 text-xl">Create New Meal</h2>
      <section className="max-w-[700px]">
        <MealForm formData={{ userId: "680fd0ec954a447f2cef1b0c" }} />
      </section>
    </>
  );
};

export default Meal;
