import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { wellcomeEmailTemplate } from "./templates/wellcome";
export async function sendMail({
  to,
  name,
  subject,
  body,
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
}) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  await new Promise((resolve, reject) => {
    transport.verify((error, success) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("server is listening...");
        resolve(success);
      }
    });
  });

  const info = await transport.sendMail({ from: SMTP_EMAIL, to: to, html: body, subject });
  console.log({ info });
}

export async function prepareWellcomeEmail() {
  const template = handlebars.compile(wellcomeEmailTemplate);
  const htmlEmail = template({
    name: "Sakura Dev",
    url: "youtube.com/@sakuradev",
  });

  await sendMail({
    to: "sakuradev23@gmail.com",
    name: "Sakura Dev",
    subject: "Welcome",
    body: htmlEmail,
  });
}
