import { mysqlTable, varchar, boolean, datetime } from "drizzle-orm/mysql-core";
import { index } from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: 191 }).primaryKey(),
    name: varchar("name", { length: 191 }).notNull(),
    email: varchar("email", { length: 191 }).notNull(),
    emailVerified: boolean("email_verified").default(false),
    image: varchar("image", { length: 255 }),
    role: varchar("role", { length: 50 }).default("SANTRI"),
    status: varchar("status", { length: 50 }).default("ACTIVE"),
    createdAt: datetime("created_at"),
    updatedAt: datetime("updated_at"),
  },
  (t) => [
    index("users_email_idx").on(t.email),
  ]
);