import { mysqlTable, varchar, datetime, text, index } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const registrationLogs = mysqlTable("registration_logs", {
  id: varchar("id", { length: 191 }).primaryKey(),
  registrationId: varchar("registration_id", { length: 191 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  notes: text("notes"),
  createdAt: datetime("created_at", { fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
  updatedAt: datetime("updated_at", { fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
  deletedAt: datetime("deleted_at", { fsp: 3 }),
});