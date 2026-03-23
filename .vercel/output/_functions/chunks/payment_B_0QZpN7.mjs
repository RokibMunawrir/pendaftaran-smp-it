import { d as db } from './index_0YfntIbu.mjs';
import { mysqlTable, datetime, varchar, decimal, index } from 'drizzle-orm/mysql-core';
import { registrations } from './registration_75Bi9R3x.mjs';
import { sql, eq, desc } from 'drizzle-orm';
import { user } from './auth-schema_DxQznFiq.mjs';

const payments = mysqlTable(
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
    deletedAt: datetime("deleted_at", { fsp: 3 })
  },
  (t) => [
    index("payments_registration_idx").on(t.registrationId)
  ]
);

const getPayments = async () => {
  return await db.select().from(payments).orderBy(desc(payments.paymentDate));
};
const updatePayment = async (id, data) => {
  return await db.update(payments).set(data).where(eq(payments.id, id));
};
const getPaymentById = async (id) => {
  const result = await db.select().from(payments).where(eq(payments.id, id)).limit(1);
  return result[0] || null;
};
const createPayment = async (data) => {
  return await db.insert(payments).values(data);
};
const deletePayment = async (id) => {
  return await db.delete(payments).where(eq(payments.id, id));
};
const getPaymentByRegistrationId = async (registrationId) => {
  const result = await db.select({
    payment: payments,
    adminName: user.name
  }).from(payments).leftJoin(user, eq(payments.verifiedBy, user.id)).where(eq(payments.registrationId, registrationId)).limit(1);
  if (!result[0]) return null;
  return {
    ...result[0].payment,
    verifiedByName: result[0].adminName
  };
};
const upsertPayment = async (data) => {
  const existing = await getPaymentByRegistrationId(data.registrationId);
  if (existing) {
    return await db.update(payments).set({
      ...data,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(payments.id, existing.id));
  } else {
    return await db.insert(payments).values({
      ...data,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    });
  }
};

export { createPayment, deletePayment, getPaymentById, getPaymentByRegistrationId, getPayments, updatePayment, upsertPayment };
