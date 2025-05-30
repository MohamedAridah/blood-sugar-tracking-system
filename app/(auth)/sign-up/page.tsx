"use client";

import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema } from "@/schemas/auth-schema";
import { sendWelcomeEmail } from "@/utils/sendWelcomeEmail";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";

export default function SignUp() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm: "",
    },
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    const { data, error } = await authClient.signUp.email(
      {
        email: values.email,
        name: values.username,
        password: values.password,
      },
      {
        onRequest: () => {
          toast.loading("Please wait...");
        },
        onResponse: () => {
          toast.dismiss();
        },
        onSuccess: async (ctx) => {
          toast.success("account created successfully");
          router.replace("/sign-in");
          await sendWelcomeEmail({
            email: ctx.data.user.email,
            username: ctx.data.user.name,
          });
          form.reset();
        },
        onError: (ctx) => {
          toast.error(
            ctx.error.status === 500 ? ctx.error.statusText : ctx.error.message
          );
        },
      }
    );
    console.log({ data, error });
  };

  return (
    <Card className="w-full max-w-md md:max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create your account to get started.</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Rewrite your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? <Spinner text="" /> : "Sign up"}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
