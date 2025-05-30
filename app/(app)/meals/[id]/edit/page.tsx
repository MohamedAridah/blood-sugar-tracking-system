import { getUserMeal } from "@/actions/meals";
import BackButton from "@/components/BackButton";
import MealForm__Update from "@/components/forms/MealForm__Update";
import NotificationMessage from "@/components/NotificationMessage";
import { PackageXIcon } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

const EditMeal = async ({ params }: Props) => {
  const mealId = (await params).id;
  const mealData = await getUserMeal(mealId);

  if ("error" in mealData) {
    return (
      <>
        <BackButton />
        <NotificationMessage
          title="Meal not found!"
          description={mealData.error.message}
          icon={PackageXIcon}
          variant="gray"
          theme="no-border"
        />
      </>
    );
  }

  return (
    <>
      <BackButton />
      <h3 className="text-lg mb-2 font-semibold">Update Meal</h3>

      <section className="max-w-[700px] mt-5">
        <MealForm__Update formData={mealData} mealId={mealData.id} />
      </section>
    </>
  );
};

export default EditMeal;
