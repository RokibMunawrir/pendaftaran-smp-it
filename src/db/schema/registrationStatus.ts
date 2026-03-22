import { mysqlTable, varchar, datetime, text, index } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const registrationStatuses = mysqlTable("registration_statuses", {
  id: varchar("id", { length: 191 }).primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  createdAt: datetime("created_at", { fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
  updatedAt: datetime("updated_at", { fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
  deletedAt: datetime("deleted_at", { fsp: 3 }),
});