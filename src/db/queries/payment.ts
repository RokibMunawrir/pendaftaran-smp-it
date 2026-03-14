import db from "../index";
import { payments } from "../schema/payment";
import { eq } from "drizzle-orm";

export const getPayments = async () => {
    return await db.select().from(payments);
};

export const updatePayment = async (id: string, data: any) => {
    return await db.update(payments).set(data).where(eq(payments.id, id));
};

export const createPayment = async (data: any) => {
    return await db.insert(payments).values(data);
};

export const deletePayment = async (id: string) => {
    return await db.delete(payments).where(eq(payments.id, id));
};
