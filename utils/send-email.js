import dayjs from "dayjs";
import { emailTemplates } from "./email-template.js";
import transporter, { fromEmail } from "../config/nodemailer.js";

export const sendReminderEmail = async ({ to, type, subscription }) => {
  if (!to || !type) throw new Error("Missing required fields");

  const template = emailTemplates.find((t) => t.label === type);

  if (!template) throw new Error("Invalid template type");

  const mailInfo = {
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate).format("DD MMM YYYY"),
    planName: subscription.name,
    price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
    paymentMethod: subscription.paymentMethod,
  };

  const message = template.generateBody(mailInfo);
  const subject = template.generateSubject(mailInfo);

  const mailOptions = {
    from: fromEmail,
    to,
    subject,
    html: message,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
