"use client";

import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MeasurementSchema,
  MeasurementFields,
} from "@/schemas/measurement_zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Spinner from "@/components/Spinner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

type Props = {
  data?: MeasurementFields;
  formHandler?: SubmitHandler<MeasurementFields>;
};

const MeasurementForm = ({ data, formHandler }: Props) => {
  const form = useForm<MeasurementFields>({
    // defaultValues: {
    //   userId: "67efd23991c18e2aef414bec",
    //   bloodSugarLevel: 222,
    //   measurementType: "",
    //   insulinDose: 1 || undefined,
    //   notes: undefined,
    //   createdAt: new Date(),
    // },
    defaultValues: {
      userId: "67efd23991c18e2aef414bec",
      bloodSugarLevel: data?.bloodSugarLevel || undefined,
      measurementType: data?.measurementType || "",
      insulinDose: data?.insulinDose || undefined,
      notes: data?.notes || undefined,
      createdAt: data?.createdAt || new Date(),
    },
    resolver: zodResolver(MeasurementSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(formHandler!!)}
        className="space-y-4 w-full"
      >
        <FormField
          control={form.control}
          name="bloodSugarLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sugar Level</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Write blood sugar level..."
                  className="placeholder:text-xs  focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="measurementType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Meal
                <span className="text-xs ms-2 capitalize ">optional</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Add your meal..."
                  {...field}
                  className="placeholder:text-xs   focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="insulinDose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Insuline Dose
                <span className="text-xs ms-2 capitalize ">optional</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Write insuline dose..."
                  {...field}
                  className="placeholder:text-xs   focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="createdAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={clsx(
                        "text-left font-normal ",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value?.toDateString()}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Notes
                <span className="text-xs ms-2 capitalize ">optional</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Add your notes..."
                  className="placeholder:text-xs  focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full rounded-md"
          disabled={form.formState.isSubmitting ? true : false}
        >
          {form.formState.isSubmitting ? (
            <>
              <Spinner /> Adding...
            </>
          ) : (
            " Add Measurement"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default MeasurementForm;
