import { d as db } from './index_0YfntIbu.mjs';
import { user } from './auth-schema_DxQznFiq.mjs';
import { eq, or, like } from 'drizzle-orm';

const getUsers = async (search) => {
  let query = db.select().from(user);
  if (search) {
    query = query.where(
      or(
        like(user.name, `%${search}%`),
        like(user.email, `%${search}%`)
      )
    );
  }
  return await query;
};
const getUser = async (id) => {
  return await db.select().from(user).where(eq(user.id, id));
};
const updateUser = async (id, data) => {
  return await db.update(user).set(data).where(eq(user.id, id));
};
const deleteUser = async (id) => {
  return await db.delete(user).where(eq(user.id, id));
};

export { getUsers as a, deleteUser as d, getUser as g, updateUser as u };
