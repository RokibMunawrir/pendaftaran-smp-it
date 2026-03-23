import { d as db } from './index_0YfntIbu.mjs';
import { s as settings } from './settings_YrV0kQ3T.mjs';
import { eq } from 'drizzle-orm';

const getSettings = async () => {
  return await db.select().from(settings);
};
const updateSettings = async (id, data) => {
  return await db.update(settings).set(data).where(eq(settings.id, id));
};
const createSetting = async (data) => {
  return await db.insert(settings).values(data);
};

export { createSetting as c, getSettings as g, updateSettings as u };
