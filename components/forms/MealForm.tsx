"use client";

import React, { useImperativeHandle } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MealSchema, MealSchemaType } from "@/schemas/meal_zod";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MyFormHandle } from "@/components/forms/MeasurementForm";

type Props = {
  formData?: Partial<MealSchemaType> & Partial<{ userId: string }>;
  formHandler: SubmitHandler<MealSchemaType>;
};

const MealForm = React.forwardRef<MyFormHandle, Props>(
  ({ formData, formHandler }, ref) => {
    const form = useForm<MealSchemaType>({
      defaultValues: {
        name: formData?.name || "",
        description: formData?.description || "",
      },
      resolver: zodResolver(MealSchema),
    });

    useImperativeHandle(ref, () => ({
      reset: () => form.reset({ name: "", description: "" }),
    }));

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(formHandler)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Meal name"
                    className="placeholder:text-xs  focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormDescription>
                  Meal name should be short and descriptive
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description
                  <span className="text-xs ms-2 capitalize ">optional</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="meal description (recommended)"
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
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Spinner /> Adding...
              </>
            ) : (
              " Add Meal"
            )}
          </Button>
        </form>
      </Form>
    );
  }
);

export default MealForm;
