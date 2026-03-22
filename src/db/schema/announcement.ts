import { mysqlTable, varchar, text, boolean, datetime } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { user } from "./auth-schema";
import { createId } from "@paralleldrive/cuid2";

export const announcements = mysqlTable("announcements", {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => createId()),
  title: varchar("title", { length: 191 }),
  content: text("content"),
  authorId: varchar("authorId", { length: 191 }).references(() => user.id),
  isPublished: boolean("isPublished").default(false),
  isImportant: boolean("is_important").default(false),
  target: varchar("target", { length: 50 }).default("all"),
  createdAt: datetime("createdAt", { fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
  updatedAt: datetime("updatedAt", { fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
  deletedAt: datetime("deletedAt", { fsp: 3 }),
});