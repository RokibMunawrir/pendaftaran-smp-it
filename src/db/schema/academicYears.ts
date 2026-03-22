import { mysqlTable, varchar, boolean, datetime } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export const academicYears = mysqlTable("academic_years", {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => createId()),
  year: varchar("year", { length: 20 }).notNull(),
  isActive: boolean("is_active").default(false),
  startDate: datetime("start_date"),
  endDate: datetime("end_date"),
  createdAt: datetime("created_at", { fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
  updatedAt: datetime("updated_at", { fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
  deletedAt: datetime("deleted_at", { fsp: 3 }),
});