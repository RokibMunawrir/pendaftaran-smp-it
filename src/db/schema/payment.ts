import { mysqlTable, varchar, decimal, datetime, index } from "drizzle-orm/mysql-core";
import { registrations } from "./registration";

export const payments = mysqlTable(
  "payments",
  {
    id: varchar("id", { length: 191 }).primaryKey(),
    registrationId: varchar("registration_id", { length: 191 }).notNull().references(() => registrations.id),
    amount: decimal("amount", { precision: 10, scale: 2 }),
    proofUrl: varchar("proof_url", { length: 255 }),
    status: varchar("status", { length: 50 }).default("PENDING"),
    paymentDate: datetime("payment_date"),
    verifiedAt: datetime("verified_at"),
    verifiedBy: varchar("verified_by", { length: 191 }),
  },
  (t) => [
    index("payments_registration_idx").on(t.registrationId),
  ]
);