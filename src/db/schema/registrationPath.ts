import { mysqlTable, varchar, text, int, boolean } from "drizzle-orm/mysql-core";

export const registrationPaths = mysqlTable("registration_paths", {
  id: varchar("id", { length: 191 }).primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  quota: int("quota"),
  isActive: boolean("is_active").default(true),
});