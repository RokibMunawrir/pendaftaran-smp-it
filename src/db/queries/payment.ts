import db from "../index";
import { payments } from "../schema/payment";
import { desc, eq } from "drizzle-orm";

import { user } from "../schema/auth-schema";

export const getPayments = async () => {
    return await db.select().from(payments).orderBy(desc(payments.paymentDate));
};

export const updatePayment = async (id: string, data: any) => {
    return await db.update(payments).set(data).where(eq(payments.id, id));
};

export const getPaymentById = async (id: string) => {
    const result = await db.select().from(payments).where(eq(payments.id, id)).limit(1);
    return result[0] || null;
};

export const createPayment = async (data: any) => {
    return await db.insert(payments).values(data);
};

export const deletePayment = async (id: string) => {
    return await db.delete(payments).where(eq(payments.id, id));
};

export const getPaymentByRegistrationId = async (registrationId: string) => {
    const result = await db.select({
        payment: payments,
        adminName: user.name
    })
    .from(payments)
    .leftJoin(user, eq(payments.verifiedBy, user.id))
    .where(eq(payments.registrationId, registrationId))
    .limit(1);
    
    if (!result[0]) return null;
    return {
        ...result[0].payment,
        verifiedByName: result[0].adminName
    };
};

export const upsertPayment = async (data: any) => {
    const existing = await getPaymentByRegistrationId(data.registrationId);
    if (existing) {
        return await db.update(payments).set({
            ...data,
            updatedAt: new Date(),
        }).where(eq(payments.id, existing.id));
    } else {
        return await db.insert(payments).values({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
};
