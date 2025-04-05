import nodemailer from "nodemailer";
import { EMAIL_PASSWORD } from "./env.js";

export const fromEmail = "taronushima@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: fromEmail,
    pass: EMAIL_PASSWORD,
  },
});

export default transporter;
