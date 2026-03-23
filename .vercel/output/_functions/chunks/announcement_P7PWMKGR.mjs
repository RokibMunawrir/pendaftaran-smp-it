import { d as db } from './index_0YfntIbu.mjs';
import { a as announcements } from './announcement_BC0Oyqeh.mjs';
import { eq, desc } from 'drizzle-orm';

const getAnnouncements = async () => {
  return await db.select().from(announcements).orderBy(desc(announcements.createdAt));
};
const getPublishedAnnouncements = async () => {
  return await db.select().from(announcements).where(eq(announcements.isPublished, true)).orderBy(desc(announcements.createdAt));
};
const updateAnnouncement = async (id, data) => {
  return await db.update(announcements).set(data).where(eq(announcements.id, id));
};
const createAnnouncement = async (data) => {
  return await db.insert(announcements).values(data);
};
const deleteAnnouncement = async (id) => {
  return await db.delete(announcements).where(eq(announcements.id, id));
};

export { getPublishedAnnouncements as a, createAnnouncement as c, deleteAnnouncement as d, getAnnouncements as g, updateAnnouncement as u };
