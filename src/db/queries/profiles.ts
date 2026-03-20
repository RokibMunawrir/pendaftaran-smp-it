import db from "../index"
import { profiles } from "../schema/profiles"
import { eq } from "drizzle-orm"

export const getProfiles = async () => {
    return await db.select().from(profiles)
};

export const updateProfile = async (data: any) => {
    return await db.update(profiles).set(data)
};

export const createProfile = async (data: any) => {
    return await db.insert(profiles).values(data)
};

export const getProfileByUserId = async (userId: string) => {
    const res = await db.select().from(profiles).where(eq(profiles.userId, userId));
    return res[0] || null;
};