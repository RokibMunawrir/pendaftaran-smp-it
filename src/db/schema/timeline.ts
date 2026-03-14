import { mysqlTable, varchar, text, datetime, boolean } from "drizzle-orm/mysql-core";

export const timelines = mysqlTable("timelines", {
  id: varchar("id", { length: 191 }).primaryKey(),
  title: varchar("title", { length: 191 }),
  description: text("description"),
  startDate: datetime("start_date"),
  endDate: datetime("end_date"),
  isActive: boolean("is_active").default(true),
});