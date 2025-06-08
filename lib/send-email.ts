"use server";

import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { pretty, render } from "@react-email/components";

const sendEmail = async ({ to, subject, html }: MailOptions) => {
  const transporterOptions = {
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };
  return new Promise(async (resolve, reject) => {
    try {
      const transporter = nodemailer.createTransport(transporterOptions);
      const renderedHtml = await render(html as string);
      const mailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject,
        html: renderedHtml,
      };

      await transporter.sendMail(mailOptions);
      resolve("Email sent Successfully");
    } catch (error) {
      console.log("Nodemailer Error: ", error);
      reject("Failed to send Email");
    }
  });
};

export default sendEmail;
