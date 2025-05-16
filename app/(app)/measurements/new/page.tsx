import Link from "next/link";
import { getUserMeals } from "@/actions/meals";
import BackButton from "@/components/BackButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeasurementForm__Create__Before from "@/components/forms/MeasurementForm__Create__Before";
import MeasurementForm__Create__After from "@/components/forms/MeasurementForm__Create__After";
import MealTimeTriggersList from "@/components/util-components/MealTimeTriggersList";
import InsulinForm__Create from "@/components/forms/InsulinForm__Create";
import NotificationMessage from "@/components/NotificationMessage";
import { FileArchiveIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import MealsDropdown from "./meals-dropdown";

const meals_list_limit: number = 3;

const AddMeasurement = async () => {
  const meals = await getUserMeals("680fd0ec954a447f2cef1b0c");
  const showMoreMeals = meals.length > meals_list_limit;

  if (meals.length === 0) {
    return (
      <>
        <BackButton />
        <NotificationMessage
          title="You have no meals yet"
          description="Add your meals whcich measurements will be related to"
          variant="gray"
          icon={FileArchiveIcon}
        >
          <Button variant="outline" className="mt-2" asChild>
            <Link href="/meals/new">Add Meal</Link>
          </Button>
        </NotificationMessage>
      </>
    );
  }

  return (
    <>
      <BackButton text="Back to Measurements" />

      <section className="max-w-[700px]">
        <Tabs defaultValue={meals[0].name}>
          {/* User Main Meals List */}
          <TabsList className="justify-start overflow-x-auto sm:overflow-x-hidden w-full md:max-w-fit h-auto sm:h-9">
            {meals.slice(0, meals_list_limit).map((meal) => (
              <TabsTrigger
                key={meal.id}
                value={meal.name.toLowerCase()}
                className="capitalize"
                role="tab"
              >
                {meal.name.toLowerCase()}
              </TabsTrigger>
            ))}
            {showMoreMeals && <MealsDropdown meals={meals} />}
            <Link
              href="/meals/new"
              className="flex justify-center items-center justify-self-end ml-3 px-2 border-l border-l-[#737373]/20"
              role="link"
              aria-label="Go to add new meal page"
            >
              <Plus className="size-5 text-[#737373]/80 hover:text-[#737373]" />
            </Link>
          </TabsList>

          {/* Tab Content */}
          {meals?.map((meal) => (
            <TabsContent key={meal.id} value={meal.name} className="mt-4">
              <Tabs defaultValue="before">
                {/* Main Meal Times List*/}
                <MealTimeTriggersList />
                <TabsContent value="before">
                  <MeasurementForm__Create__Before
                    formData={{
                      userId: meal.userId,
                      mealId: meal.id,
                      mealType: meal.name,
                    }}
                  />
                </TabsContent>

                <TabsContent value="after">
                  <MeasurementForm__Create__After
                    formData={{
                      userId: meal.userId,
                      mealId: meal.id,
                      mealType: meal.name,
                    }}
                  />
                </TabsContent>

                <TabsContent value="insulin">
                  <InsulinForm__Create
                    formData={{
                      userId: meal.userId,
                      mealId: meal.id,
                    }}
                  />
                </TabsContent>
              </Tabs>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </>
  );
};

export default AddMeasurement;
