import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from 'uuid';

export const usersTable = sqliteTable("users", {
  id: text().primaryKey().$defaultFn(() => {
    return uuidv4();
  }),
  email: text().notNull().unique(),
  passwordHash: text().notNull()
});