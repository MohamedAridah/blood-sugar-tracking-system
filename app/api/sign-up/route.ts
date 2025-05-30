import { NextRequest, NextResponse } from "next/server";
import sendEmail from "@/lib/send-email";
import Welcome from "@/emails/welcome";

export const POST = async (req: NextRequest) => {
  const { username, email } = await req.json();

  await sendEmail({
    to: email,
    subject: "Welcome to BSTS!",
    html: Welcome({
      username,
    }),
  });

  return NextResponse.json({});
};
