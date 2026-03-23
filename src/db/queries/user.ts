import db from "../index";
import { user } from "../schema/auth-schema";
import { eq, like, or } from "drizzle-orm";

export const getUsers = async (search?: string) => {
    let query = db.select().from(user);
    if (search) {
        // @ts-ignore
        query = query.where(
            or(
                like(user.name, `%${search}%`),
                like(user.email, `%${search}%`)
            )
        );
    }
    return await query;
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
