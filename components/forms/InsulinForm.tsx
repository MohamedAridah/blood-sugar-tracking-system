"use client";

import React, { useImperativeHandle } from "react";
import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsulinSchema, InsulinFields } from "@/schemas/insulin_zod";
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
import { InsulinDose } from "@prisma/client";

type Props = {
  data?: Partial<InsulinDose> & Partial<InsulinFields>;
  formHandler: SubmitHandler<InsulinFields>;
};

export type MyFormHandle = {
  reset: () => void;
};

const InsulinForm = React.forwardRef<MyFormHandle, Props>(
  ({ data, formHandler }, ref) => {
    const form = useForm<InsulinFields>({
      defaultValues: {
        insulinDose: data?.insulinDose || undefined,
        notes: data?.notes || "",
        createdAt: data?.createdAt || new Date(),
      },
      resolver: zodResolver(InsulinSchema),
    });

    useImperativeHandle(ref, () => ({
      reset: () =>
        form.reset({
          insulinDose: parseFloat(undefined!!),
          notes: "",
        }),
    }));

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(formHandler)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="insulinDose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Insulin Dose</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Write insulin dose for this meal..."
                    className="placeholder:text-xs  focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
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
                        {new Date(field.value as Date)?.toDateString()}
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
                    placeholder="Add your notes for insulin dose... (recommended)"
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
              "Add Insulin Dose"
            )}
          </Button>
        </form>
      </Form>
    );
  }
);

export default InsulinForm;
