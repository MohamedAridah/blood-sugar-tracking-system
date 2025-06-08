import prisma from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import sendEmail from "@/lib/send-email";
import ResetPasswordEmail from "@/emails/reset-password";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset Account Password",
        html: ResetPasswordEmail({
          userName: user.name,
          resetLink: url,
        }) as any,
      });
    },
    revokeSessionsOnPasswordReset: true,
  },
  plugins: [nextCookies()],
});
