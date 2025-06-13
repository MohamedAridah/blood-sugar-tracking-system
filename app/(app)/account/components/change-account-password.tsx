"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { changeUserPasswordSchema } from "@/schemas/auth-schema";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";

export default function ChangeAccountPassword() {
  const router = useRouter();
  const [isModelOpen, setIsModelOpen] = useState(false);

  const form = useForm<z.infer<typeof changeUserPasswordSchema>>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(changeUserPasswordSchema),
  });

  const handleChangeUserPassword = async (
    data: z.infer<typeof changeUserPasswordSchema>
  ) => {
    await authClient.changePassword({
      currentPassword: data.oldPassword,
      newPassword: data.newPassword,
      revokeOtherSessions: true,
      fetchOptions: {
        onSuccess: async (ctx) => {
          toast.success("Password changed");
          router.push("/sign-in");
        await authClient.signOut();
          setIsModelOpen(false);
        },
        onError: (ctx) => {
          toast.error(
            ctx.error.message ||
              ctx.error.statusText ||
              "Something went wrong. Can't change password now."
          );
        },
      },
    });
  };

  return (
    <>
      <ResponsiveDialog
        isOpen={isModelOpen}
        setIsOpen={setIsModelOpen}
        title="Change Account Password"
        showFooter={false}
      >
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleChangeUserPassword)}
          >
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="your old password..."
                      className="placeholder:text-xs text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="your new password..."
                      className="placeholder:text-xs text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="confirm new password..."
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
                  "Change Password"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </ResponsiveDialog>

      <Button size="sm" onClick={() => setIsModelOpen(true)}>
        Change Password
      </Button>
    </>
  );
}
