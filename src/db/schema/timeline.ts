import { mysqlTable, varchar, text, datetime, boolean } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export const timelines = mysqlTable("timelines", {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => createId()),
  title: varchar("title", { length: 191 }),
  description: text("description"),
  startDate: datetime("start_date"),
  endDate: datetime("end_date"),
  isActive: boolean("is_active").default(true),
  createdAt: datetime("created_at", { fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
  updatedAt: datetime("updated_at", { fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
  deletedAt: datetime("deleted_at", { fsp: 3 }),
});