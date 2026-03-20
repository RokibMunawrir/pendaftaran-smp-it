import db from "../index";
import { user } from "../schema/auth-schema";
import { eq } from "drizzle-orm";

export const getUsers = async () => {
    return await db.select().from(user);
};

export const getUser = async (id: string) => {
    return await db.select().from(user).where(eq(user.id, id));
};

export const createUser = async (data: any) => {
    return await db.insert(user).values(data);
};

export const updateUser = async (id: string, data: any) => {
    return await db.update(user).set(data).where(eq(user.id, id));
};

export const deleteUser = async (id: string) => {
    return await db.delete(user).where(eq(user.id, id));
};
