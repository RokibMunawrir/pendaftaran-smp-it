import { mysqlTable, varchar, datetime, index } from "drizzle-orm/mysql-core";
import { registrations } from "./registration";

export const documents = mysqlTable(
  "documents",
  {
    id: varchar("id", { length: 191 }).primaryKey(),
    registrationId: varchar("registration_id", { length: 191 }).notNull().references(() => registrations.id),
    type: varchar("type", { length: 100 }),
    fileUrl: varchar("file_url", { length: 255 }),
    status: varchar("status", { length: 50 }).default("PENDING"),
    uploadDate: datetime("upload_date"),
    verifiedAt: datetime("verified_at"),
  },
  (t) => [
    index("documents_registration_idx").on(t.registrationId),
  ]
);