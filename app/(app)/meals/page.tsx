import Link from "next/link";
import { getUserMeals } from "@/actions/meals";
import { getUserSession } from "@/actions/auth";
import MealCard from "./_components/meal-card";
import NotificationMessage from "@/components/NotificationMessage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import { ArrowRight, FilesIcon, Plus } from "lucide-react";

const Meals = async () => {
  const { user } = await getUserSession();
  const meals = await getUserMeals(user?.id as string);

  return (
    <section>
      <div className="flex justify-between items-center">
        <BackButton />
        <Button size="sm" className="group">
          <Link href="/meals/new" className="flex items-center">
            <Plus className="mr-2" />
            Add Meal
            <ArrowRight className="invisible -translate-x-full group-hover:visible group-hover:translate-x-1  transition-all" />
          </Link>
        </Button>
      </div>
      <h1 className="font-semibold text-lg mb-2">My Meals</h1>

      {meals.length ? (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-2 mt-5">
          {meals.map((meal: any) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      ) : (
        <NotificationMessage
          title="No Meals Found"
          description="your added meals will appear here."
          icon={FilesIcon}
          variant="gray"
          theme="no-border"
        >
          <Button size="sm" className="my-4" asChild>
            <Link href="/meals/new">
              Add Meal
              <ArrowRight />
            </Link>
          </Button>
        </NotificationMessage>
      )}
    </section>
  );
};

export default Meals;
