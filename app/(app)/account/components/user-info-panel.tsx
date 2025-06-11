"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import Panel from "@/components/Panel";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { updateUserAccountSchema } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";
import { ExternalLink, Pen } from "lucide-react";
import Link from "next/link";

const UserInfoPanel = () => {
  const { data, isPending } = authClient.useSession();
  const person = data?.user;
  const [isModelOpen, setIsModelOpen] = useState(false);

  const form = useForm<z.infer<typeof updateUserAccountSchema>>({
    defaultValues: {
      firstName: person?.firstName || "",
      lastName: person?.lastName || "",
    },
    resolver: zodResolver(updateUserAccountSchema),
  });

  const handleUpdateAccount = async (
    values: z.infer<typeof updateUserAccountSchema>
  ) => {
    if (
      values.firstName === person?.firstName &&
      values.lastName === person?.lastName
    )
      return;
    await authClient.updateUser({
      firstName: values.firstName,
      lastName: values.lastName,
      name: values.name,
      fetchOptions: {
        onSuccess: () => {
          toast.success("User data updated");
          setIsModelOpen(false);
        },
        onError: (ctx) => {
          toast.error(
            ctx.error.message ||
              ctx.error.statusText ||
              "Something went wrong. Can't update data now."
          );
        },
      },
    });
  };

  if (isPending) {
    const repeate = Array(4).fill(null);
    return (
      <Panel>
        <div className="grid md:grid-cols-3 gap-8 overflow-auto">
          {repeate.map((_, index) => (
            <div className="flex flex-col space-y-3" key={index}>
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </Panel>
    );
  }

  return (
    <>
      <ResponsiveDialog
        isOpen={isModelOpen}
        setIsOpen={setIsModelOpen}
        title="Update Your Account"
        showFooter={false}
      >
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleUpdateAccount)}
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="New first name"
                      className="placeholder:text-xs text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="New last name"
                      className="placeholder:text-xs text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => {
                  setIsModelOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="rounded-md flex-5 flex-grow"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Spinner />
                  </>
                ) : (
                  "Update Account"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </ResponsiveDialog>

      <Panel
        title="personal information"
        action={
          <Button size="sm" onClick={() => setIsModelOpen(true)}>
            Edit <Pen />
          </Button>
        }
      >
        <div className="grid md:grid-cols-3 gap-5 overflow-auto">
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground text-sm">First Name</p>
            <p className="text-base">{person?.firstName}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground text-sm">Last Name</p>
            <p className="text-base">{person?.lastName}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground text-sm">Date of Birth</p>
            <p className="text-base">COMING SOON</p>
          </div>
          <div className="group flex flex-col gap-1">
            <p className="flex gap-2 items-center text-muted-foreground text-sm ">
              <Link href="/account?email=change">Email</Link>
              <ExternalLink className="size-4 opacity-0 group-hover:opacity-100 transition-all group-hover:scale-105" />
            </p>
            <p className="text-base">{person?.email}</p>
          </div>
        </div>
      </Panel>
    </>
  );
};

export default UserInfoPanel;
