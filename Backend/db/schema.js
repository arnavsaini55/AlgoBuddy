import { pgTable, varchar, integer, text, uuid } from "drizzle-orm/pg-core";
import { randomUUID } from "crypto";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().default(randomUUID()), // ✅ fixed
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  salt: text().notNull(),
});
