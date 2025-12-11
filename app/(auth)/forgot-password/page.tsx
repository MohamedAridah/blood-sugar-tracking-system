"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { forgotPasswordFormSchema } from "@/schemas/auth-schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import BackButton from "@/components/BackButton";
import NotificationMessage from "@/components/NotificationMessage";
import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const ForgotPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordFormSchema>) => {
    try {
      await authClient.requestPasswordReset(
        {
          email: values.email,
          redirectTo: "/reset-password",
        },
        {
          onSuccess: (ctx) => {
            console.log("forgetPassword success: ", ctx);
            router.replace("/forgot-password?verify=email");
          },
          onError: (ctx) => {
            console.log("forgetPassword error: ", ctx);
            toast.error(ctx.error.message);
          },
        }
      );
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (searchParams.get("verify")) {
    return (
      <NotificationMessage
        className="w-full max-w-md mx-auto my-[15vh]"
        title="Email sent successfully!"
        description="An email with password reset instructions has been sent to your email address incase it exists in our database."
        theme="no-border"
        icon={BadgeCheck}
        variant="success"
      >
        <BackButton
          link="/sign-in"
          text="back to login"
          className={cn(buttonVariants({}), "hover:text-white")}
        />
      </NotificationMessage>
    );
  }

  return (
    <Card className="w-full max-w-md md:max-w-lg mx-auto">
      <CardHeader>
        <BackButton className="mt-0" link="/sign-in" />
        <CardTitle>Forgot your password</CardTitle>
        <CardDescription>
          Please provide the email address you used when you signed up for your
          account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="someone@mail.com"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormMessage />
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? <Spinner /> : "Send email"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default ForgotPassword;
