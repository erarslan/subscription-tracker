import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  MONGO_URI,
  NODE_ENV,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  QSTASH_URL,
  QSTASH_TOKEN,
  SERVER_URL,
  EMAIL_PASSWORD,
} = process.env;
