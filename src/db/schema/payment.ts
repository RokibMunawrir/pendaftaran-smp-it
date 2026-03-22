import { mysqlTable, varchar, decimal, datetime, index } from "drizzle-orm/mysql-core";
import { registrations } from "./registration";
import { sql } from "drizzle-orm";

export const payments = mysqlTable(
  "payments",
  {
    id: varchar("id", { length: 191 }).primaryKey(),
    registrationId: varchar("registration_id", { length: 191 }).notNull().references(() => registrations.id),
    amount: decimal("amount", { precision: 10, scale: 2 }),
    senderName: varchar("sender_name", { length: 255 }),
    bankTujuan: varchar("bank_tujuan", { length: 100 }),
    proofUrl: varchar("proof_url", { length: 255 }),
    status: varchar("status", { length: 50 }).default("PENDING"),
    paymentDate: datetime("payment_date"),
    verifiedAt: datetime("verified_at"),
    verifiedBy: varchar("verified_by", { length: 191 }),
    createdAt: datetime("created_at", { fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
    updatedAt: datetime("updated_at", { fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
    deletedAt: datetime("deleted_at", { fsp: 3 }),
  },
  (t) => [
    index("payments_registration_idx").on(t.registrationId),
  ]
);