import { d as db } from './index_0YfntIbu.mjs';
import { a as academicYears, r as registrationPaths } from './registrationPath_cVteuG_V.mjs';
import { sql, eq } from 'drizzle-orm';

const getAcademicYears = async () => {
  return await db.select().from(academicYears).orderBy(sql`${academicYears.year} DESC`);
};
const createAcademicYear = async (data) => {
  return await db.insert(academicYears).values(data);
};
const updateAcademicYear = async (id, data) => {
  return await db.update(academicYears).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(academicYears.id, id));
};
const setActiveAcademicYear = async (id) => {
  return await db.transaction(async (tx) => {
    await tx.update(academicYears).set({ isActive: false, updatedAt: /* @__PURE__ */ new Date() });
    await tx.update(academicYears).set({ isActive: true, updatedAt: /* @__PURE__ */ new Date() }).where(eq(academicYears.id, id));
  });
};
const getRegistrationPaths = async (onlyActive = false) => {
  if (onlyActive) {
    return await db.select().from(registrationPaths).where(eq(registrationPaths.isActive, true));
  }
  return await db.select().from(registrationPaths);
};
const createRegistrationPath = async (data) => {
  return await db.insert(registrationPaths).values(data);
};
const updateRegistrationPath = async (id, data) => {
  return await db.update(registrationPaths).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(registrationPaths.id, id));
};
const deleteRegistrationPath = async (id) => {
  return await db.delete(registrationPaths).where(eq(registrationPaths.id, id));
};

export { getRegistrationPaths as a, createRegistrationPath as b, createAcademicYear as c, updateRegistrationPath as d, deleteRegistrationPath as e, getAcademicYears as g, setActiveAcademicYear as s, updateAcademicYear as u };
