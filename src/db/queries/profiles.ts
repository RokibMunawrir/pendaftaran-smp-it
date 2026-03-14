import db from "../index"
import { profiles } from "../schema/profiles"

export const getProfiles = async () => {
    return await db.select().from(profiles)
};

export const updateProfile = async (data: any) => {
    return await db.update(profiles).set(data)
};

export const createProfile = async (data: any) => {
    return await db.insert(profiles).values(data)
};