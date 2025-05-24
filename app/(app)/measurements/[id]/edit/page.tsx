import { getMeasurement } from "@/actions/measurements";
import BackButton from "@/components/BackButton";
import InsulinForm__Update from "@/components/forms/InsulinForm__Update";
import MeasurementForm__UpdateAfter from "@/components/forms/MeasurementForm__UpdateAfter";
import MeasurementForm__UpdateBefore from "@/components/forms/MeasurementForm__UpdateBefore";
import NotificationMessage from "@/components/NotificationMessage";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import MealTimeTriggersList from "@/components/util-components/MealTimeTriggersList";
import formatDate from "@/utils/formatDate";
import { Info, PackageXIcon } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

const EditMeasurement = async ({ params }: Props) => {
  const measurementId = (await params).id;
  const measurementData = await getMeasurement(measurementId);

  if ("error" in measurementData) {
    return (
      <>
        <BackButton />
        <NotificationMessage
          title="Measurement not found!"
          description={measurementData.error.message}
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
      <h3 className="text-lg mb-2 font-semibold">Update Meal Measurement</h3>
      <div className="flex items-center gap-1 mt-2 mb-4">
        <Info className="text-blue-800/70" size={17} />
        <p className="text-sm text-muted-foreground">
          You are updating{" "}
          <span className="font-semibold text-foreground/90">
            {measurementData.mealType}
          </span>{" "}
          measurement for{" "}
          <span className="font-semibold text-foreground/90">
            {formatDate(measurementData.date, "EEEE, MMMM dd, yyyy")}
          </span>
        </p>
      </div>
      <section className="max-w-[700px] mt-5">
        <Tabs defaultValue="before">
          <MealTimeTriggersList />
          <TabsContent value="before">
            <MeasurementForm__UpdateBefore
              measurementId={measurementData?.id}
              formData={measurementData}
            />
          </TabsContent>
          <TabsContent value="after">
            <MeasurementForm__UpdateAfter
              measurementId={measurementData?.id}
              formData={measurementData}
            />
          </TabsContent>
          <TabsContent value="insulin">
            <InsulinForm__Update
              measurementId={measurementData.id}
              formData={measurementData}
            />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default EditMeasurement;
