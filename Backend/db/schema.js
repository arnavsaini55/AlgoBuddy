import { pgTable, uuid, varchar, text, integer, timestamp, date } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

// ================= USERS TABLE =================
export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`), // ✅ generate new UUID each insert
  name: varchar("name", { length: 255 }).notNull(),
  age: integer("age").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  salt: text("salt").notNull(),
});

// ================= QUESTIONS TABLE =================
export const questionsTable = pgTable("questions", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`), // ✅ fix duplicate key
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  difficulty: varchar("difficulty", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// ================= SUBMISSIONS TABLE =================
export const submissionsTable = pgTable("submissions", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`), // ✅ fix duplicate key
  userId: uuid("user_id").notNull(),        // FK → users.id
  questionId: uuid("question_id").notNull(), // FK → questions.id
  answer: varchar("answer", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ================= STREAKS TABLE =================
export const streaksTable = pgTable("streaks", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`), // ✅ fix duplicate key
  userId: uuid("user_id").notNull(), // FK → users.id
  currentStreak: integer("current_streak").notNull().default(0),
  longestStreak: integer("longest_streak").notNull().default(0),
  lastActiveDate: date("last_active_date"),
});

// ================= RELATIONS =================
export const submissionsRelations = relations(submissionsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [submissionsTable.userId],
    references: [usersTable.id],
  }),
  question: one(questionsTable, {
    fields: [submissionsTable.questionId],
    references: [questionsTable.id],
  }),
}));

export const streaksRelations = relations(streaksTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [streaksTable.userId],
    references: [usersTable.id],
  }),
}));

export const usersRelations = relations(usersTable, ({ many }) => ({
  submissions: many(submissionsTable),
  streaks: many(streaksTable),
}));

export const questionsRelations = relations(questionsTable, ({ many }) => ({
  submissions: many(submissionsTable),
}));
