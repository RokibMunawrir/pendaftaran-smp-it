import db from "../index";
import { announcements } from "../schema/announcement";
import { desc, eq } from "drizzle-orm";

export const getAnnouncements = async () => {
    return await db.select().from(announcements).orderBy(desc(announcements.createdAt));
};

export const getPublishedAnnouncements = async () => {
    return await db.select().from(announcements).where(eq(announcements.isPublished, true)).orderBy(desc(announcements.createdAt));
};

export const updateAnnouncement = async (id: string, data: any) => {
    return await db.update(announcements).set(data).where(eq(announcements.id, id));
};

export const createAnnouncement = async (data: any) => {
    return await db.insert(announcements).values(data);
};

export const deleteAnnouncement = async (id: string) => {
    return await db.delete(announcements).where(eq(announcements.id, id));
};