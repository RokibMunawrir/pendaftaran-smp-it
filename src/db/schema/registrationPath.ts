import { mysqlTable, varchar, text, int, boolean, datetime } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const registrationPaths = mysqlTable("registration_paths", {
  id: varchar("id", { length: 191 }).primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  quota: int("quota"),
  isActive: boolean("is_active").default(true),
  createdAt: datetime("created_at", { fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
  updatedAt: datetime("updated_at", { fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
  deletedAt: datetime("deleted_at", { fsp: 3 }),
});