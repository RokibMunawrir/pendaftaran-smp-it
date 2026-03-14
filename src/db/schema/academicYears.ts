import { mysqlTable, varchar, boolean, datetime } from "drizzle-orm/mysql-core";

export const academicYears = mysqlTable("academic_years", {
  id: varchar("id", { length: 191 }).primaryKey(),
  year: varchar("year", { length: 20 }).notNull(),
  isActive: boolean("is_active").default(false),
  startDate: datetime("start_date"),
  endDate: datetime("end_date"),
});