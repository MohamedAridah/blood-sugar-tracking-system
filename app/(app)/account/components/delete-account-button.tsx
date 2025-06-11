"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteUserAccountSchema } from "@/schemas/auth-schema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";

export default function DeleteAccountAction() {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const form = useForm<z.infer<typeof deleteUserAccountSchema>>({
    defaultValues: {
      password: "",
    },
    resolver: zodResolver(deleteUserAccountSchema),
    mode:"onChange"
  });

  const handleDeleteUser = async (
    data: z.infer<typeof deleteUserAccountSchema>
  ) => {
    await authClient.deleteUser({
      password: data.password,
      fetchOptions: {
        onSuccess: (ctx) => {
          toast.success(ctx.data.message);
          router.push("/sign-up");
          setIsDeleteOpen(false);
        },
        onError: (ctx) => {
          toast.error(
            ctx.error.message ||
              ctx.error.statusText ||
              "Something went wrong. Can't delete account now."
          );
        },
      },
    });
  };

  return (
    <>
      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Delete Account"
        description="This action cannot be undone. This will permanently delete your account and remove all your data from our servers."
        showFooter={false}
      >
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleDeleteUser)}
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="your account password..."
                      className="placeholder:text-xs text-sm text-red-500 focus-visible:ring-0 dark:text-red-400 focus-visible:ring-offset-0"
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
                  setIsDeleteOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                size="sm"
                className="rounded-md flex-3 flex-grow"
                disabled={
                  form.formState.isSubmitting ||
                  form.getValues("password").length < 8
                }
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Spinner /> Deleting...
                  </>
                ) : (
                  "Ok. Delete my Account"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </ResponsiveDialog>

      <Button
        variant="destructive"
        size="sm"
        onClick={() => setIsDeleteOpen(true)}
      >
        Delete Account
      </Button>
    </>
  );
}
