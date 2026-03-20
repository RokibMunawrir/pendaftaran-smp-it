import db from "../index";
import { academicYears } from "../schema/academicYears";
import { registrationPaths } from "../schema/registrationPath";
import { eq, sql, and } from "drizzle-orm";

// --- Academic Years ---

export const getAcademicYears = async () => {
  return await db.select().from(academicYears).orderBy(sql`${academicYears.year} DESC`);
};

export const getActiveAcademicYear = async () => {
    const result = await db.select().from(academicYears).where(eq(academicYears.isActive, true)).limit(1);
    return result[0] || null;
};

export const createAcademicYear = async (data: typeof academicYears.$inferInsert) => {
  return await db.insert(academicYears).values(data);
};

export const updateAcademicYear = async (id: string, data: Partial<typeof academicYears.$inferInsert>) => {
  return await db.update(academicYears).set({ ...data, updatedAt: new Date() }).where(eq(academicYears.id, id));
};

export const setActiveAcademicYear = async (id: string) => {
    return await db.transaction(async (tx) => {
        // Set all to inactive
        await tx.update(academicYears).set({ isActive: false, updatedAt: new Date() });
        // Set target to active
        await tx.update(academicYears).set({ isActive: true, updatedAt: new Date() }).where(eq(academicYears.id, id));
    });
};

// --- Registration Paths ---

export const getRegistrationPaths = async (onlyActive = false) => {
    if (onlyActive) {
        return await db.select().from(registrationPaths).where(eq(registrationPaths.isActive, true));
    }
    return await db.select().from(registrationPaths);
};

export const createRegistrationPath = async (data: typeof registrationPaths.$inferInsert) => {
  return await db.insert(registrationPaths).values(data);
};

export const updateRegistrationPath = async (id: string, data: Partial<typeof registrationPaths.$inferInsert>) => {
  return await db.update(registrationPaths).set({ ...data, updatedAt: new Date() }).where(eq(registrationPaths.id, id));
};

export const deleteRegistrationPath = async (id: string) => {
    // Soft delete or hard delete? Schema has deletedAt but it defaults to NOW and is NOT NULL?
    // Given the schema, I'll just do a hard delete for now or update a flag.
    // Actually, I'll just use isActive toggle for "deletion" if preferred, but I'll implement hard delete for cleanup.
    return await db.delete(registrationPaths).where(eq(registrationPaths.id, id));
};
