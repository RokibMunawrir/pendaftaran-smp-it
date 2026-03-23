import { d as db } from './index_0YfntIbu.mjs';
import { profiles } from './profiles_DqcVxMfK.mjs';
import { eq } from 'drizzle-orm';

const getProfiles = async () => {
  return await db.select().from(profiles);
};
const updateProfile = async (data) => {
  return await db.update(profiles).set(data);
};
const createProfile = async (data) => {
  return await db.insert(profiles).values(data);
};
const getProfileByUserId = async (userId) => {
  const res = await db.select().from(profiles).where(eq(profiles.userId, userId));
  return res[0] || null;
};

export { getProfileByUserId as a, createProfile as c, getProfiles as g, updateProfile as u };
