import { mysqlTable, varchar, datetime } from "drizzle-orm/mysql-core";

export const verificationTokens = mysqlTable("verification_tokens", {
  identifier: varchar("identifier", { length: 191 }).primaryKey(),
  token: varchar("token", { length: 191 }).notNull(),
  expires: datetime("expires").notNull(),
});