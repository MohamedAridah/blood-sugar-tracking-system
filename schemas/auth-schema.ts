import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password cannot exceed 50 characters" })
    .trim(),
  // .regex(/[A-Z]/, { message: "Must include at least one uppercase letter" })
  // .regex(/[0-9]/, { message: "Must include at least one number" }),
});

const usernameSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Minimum lenght is 2 characters" })
    .trim()
    .max(20, { message: "Name cannot exceed 20 characters" })
    .trim(),
});

export const signUpFormSchema = formSchema
  .extend({
    firstName: usernameSchema.shape.username,
    lastName: usernameSchema.shape.username,
    confirmPassword: formSchema.shape.password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match. check for typo!",
    path: ["confirmPassword"],
  })
  .transform((data) => ({
    ...data,
    name: `${data.firstName} ${data.lastName}`,
  }));

export const signInFormSchema = formSchema
  .pick({
    email: true,
    password: true,
  })
  .extend({
    rememberMe: z.boolean().default(false).optional(),
  });

export const forgotPasswordFormSchema = formSchema.pick({
  email: true,
});

export const resetPasswordFormSchema = formSchema
  .pick({
    password: true,
  })
  .extend({
    confirmPassword: formSchema.shape.password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match. check for typo!",
    path: ["confirmPassword"],
  });

export const deleteUserAccountSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Account password contain at least 8 character(s)" }),
});

export const changeUserPasswordSchema = z
  .object({
    oldPassword: formSchema.shape.password,
    newPassword: formSchema.shape.password,
  })
  .extend({
    confirmPassword: formSchema.shape.password,
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match. Check for typo!",
        path: ["confirmPassword"],
      });
    }

    if (data.newPassword === data.oldPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "New password must be different from old password",
        path: ["newPassword"],
      });
    }
  });

export const updateUserAccountSchema = z
  .object({
    firstName: usernameSchema.shape.username,
    lastName: usernameSchema.shape.username,
  })
  .transform((data) => ({
    ...data,
    name: `${data.firstName} ${data.lastName}`,
  }));
