import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: text().primaryKey(),
  email: text().notNull().unique(),
  passwordHash: text().notNull()
});