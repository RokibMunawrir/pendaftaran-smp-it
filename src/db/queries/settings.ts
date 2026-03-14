import db from "../index"
import { settings } from "../schema/settings"
import { eq } from "drizzle-orm"

export const getSettings = async () => {
    return await db.select().from(settings)
};

export const updateSettings = async (id: string, data: any) => {
    return await db.update(settings).set(data).where(eq(settings.id, id))
};

export const createSetting = async (data: any) => {
    return await db.insert(settings).values(data)
};
