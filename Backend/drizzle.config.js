import dotenv from "dotenv";
dotenv.config(); // load .env variables

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL, // must now be defined
  },
});
