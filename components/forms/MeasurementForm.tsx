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
import { Measurement } from "@prisma/client";
import React, { useImperativeHandle, useRef } from "react";

type Props = {
  data?: Partial<Measurement> & Partial<MeasurementFields>;
  formHandler: SubmitHandler<MeasurementFields>;
};

export type MyFormHandle = {
  reset: () => void;
};

const MeasurementForm = React.forwardRef<MyFormHandle, Props>(
  ({ data, formHandler }, ref) => {
    const form = useForm<MeasurementFields>({
      defaultValues: {
        bloodSugarLevel: data?.bloodSugarLevel || undefined,
        notes: data?.notes || undefined,
        createdAt: data?.createdAt || new Date(),
      },
      resolver: zodResolver(MeasurementSchema),
    });

    useImperativeHandle(
      ref,
      () => ({
        reset: () =>
          form.reset({ bloodSugarLevel: parseFloat(undefined!!), notes: "" }),
      }),
      []
    );

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(formHandler)}
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

          {/* <FormField
          control={form.control}
          name="measurementType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meal</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Write blood sugar level..."
                  className="placeholder:text-xs  focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0 read-only:opacity-80"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

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
                    placeholder="Add your notes... (recommended)"
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
  }
);
export default MeasurementForm;

// "use client";

// import clsx from "clsx";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   MeasurementSchema,
//   MeasurementFields,
// } from "@/schemas/measurement_zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import Spinner from "@/components/Spinner";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { CalendarIcon } from "lucide-react";
// import { Measurement } from "@prisma/client";

// type Props = {
//   data?: Partial<Measurement> & Partial<MeasurementFields>;
//   formHandler: SubmitHandler<MeasurementFields>;
// };

// const MeasurementForm = ({ data, formHandler }: Props) => {
//   const form = useForm<MeasurementFields>({
//     defaultValues: {
//       bloodSugarLevel: data?.bloodSugarLevel || undefined,
//       notes: data?.notes || undefined,
//       createdAt: data?.createdAt || new Date(),
//     },
//     resolver: zodResolver(MeasurementSchema),
//   });

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(formHandler)}
//         className="space-y-4 w-full"
//       >
//         <FormField
//           control={form.control}
//           name="bloodSugarLevel"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Sugar Level</FormLabel>
//               <FormControl>
//                 <Input
//                   {...field}
//                   type="number"
//                   placeholder="Write blood sugar level..."
//                   className="placeholder:text-xs  focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* <FormField
//           control={form.control}
//           name="measurementType"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Meal</FormLabel>
//               <FormControl>
//                 <Input
//                   {...field}
//                   placeholder="Write blood sugar level..."
//                   className="placeholder:text-xs  focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0 read-only:opacity-80"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         /> */}

//         <FormField
//           control={form.control}
//           name="createdAt"
//           render={({ field }) => (
//             <FormItem className="flex flex-col">
//               <FormLabel>Date</FormLabel>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <FormControl>
//                     <Button
//                       variant="outline"
//                       className={clsx(
//                         "text-left font-normal ",
//                         !field.value && "text-muted-foreground"
//                       )}
//                     >
//                       {field.value?.toDateString()}
//                       <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                     </Button>
//                   </FormControl>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   <Calendar
//                     mode="single"
//                     selected={field.value}
//                     onSelect={field.onChange}
//                     disabled={(date) =>
//                       date > new Date() || date < new Date("1900-01-01")
//                     }
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="notes"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>
//                 Notes
//                 <span className="text-xs ms-2 capitalize ">optional</span>
//               </FormLabel>
//               <FormControl>
//                 <Textarea
//                   {...field}
//                   placeholder="Add your notes... (recommended)"
//                   className="placeholder:text-xs  focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button
//           type="submit"
//           className="w-full rounded-md"
//           disabled={form.formState.isSubmitting ? true : false}
//         >
//           {form.formState.isSubmitting ? (
//             <>
//               <Spinner /> Adding...
//             </>
//           ) : (
//             " Add Measurement"
//           )}
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default MeasurementForm;
