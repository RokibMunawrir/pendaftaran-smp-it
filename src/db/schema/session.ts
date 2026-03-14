import { mysqlTable, varchar, datetime, index } from "drizzle-orm/mysql-core";
import { users } from "./users";

export const sessions = mysqlTable(
  "sessions",
  {
    id: varchar("id", { length: 191 }).primaryKey(),
    sessionToken: varchar("session_token", { length: 191 }).notNull(),
    userId: varchar("user_id", { length: 191 }).notNull().references(() => users.id),
    expires: datetime("expires").notNull(),
  },
  (t) => [
    index("sessions_user_idx").on(t.userId),
  ]
);