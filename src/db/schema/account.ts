import { mysqlTable, varchar, text, int, datetime, index } from "drizzle-orm/mysql-core";
import { users } from "./users";

export const accounts = mysqlTable(
  "accounts",
  {
    id: varchar("id", { length: 191 }).primaryKey(),
    userId: varchar("user_id", { length: 191 }).notNull().references(() => users.id),
    provider: varchar("provider", { length: 100 }).notNull(),
    providerAccountId: varchar("provider_account_id", { length: 191 }).notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    expiresAt: int("expires_at"),
    tokenType: varchar("token_type", { length: 50 }),
    scope: varchar("scope", { length: 191 }),
    idToken: text("id_token"),
    createdAt: datetime("created_at"),
  },
  (t) => [
    index("accounts_user_idx").on(t.userId),
  ]
);