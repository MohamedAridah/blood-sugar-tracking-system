"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const SignOutUser = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/");
};

export const getUserSession = async () => {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  return { user: session?.user, session: session?.session };
};
