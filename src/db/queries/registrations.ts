import db from "../index";
import { registrations } from "../schema/registration";
import { user } from "../schema/auth-schema";
import { profiles } from "../schema/profiles";
import { registrationPaths } from "../schema/registrationPath";
import { documents } from "../schema/document";
import { eq, and } from "drizzle-orm";

export const getRegistrations = async () => {
  return await db
    .select({
      id: registrations.id,
      userId: user.id,
      name: user.name,
      email: user.email,
      origin: profiles.placeOfBirth, // Or wherever origin should come from, usually place of birth or address
      parentName: profiles.fatherName,
      program: registrationPaths.name,
      status: registrations.status,
      registrationNumber: registrations.registrationNumber,
      registeredAt: registrations.registeredAt,
      avatarUrl: documents.fileUrl,
    })
    .from(registrations)
    .innerJoin(user, eq(registrations.userId, user.id))
    .innerJoin(profiles, eq(registrations.profileId, profiles.id))
    .innerJoin(registrationPaths, eq(registrations.registrationPathId, registrationPaths.id))
    .leftJoin(documents, and(eq(registrations.id, documents.registrationId), eq(documents.type, "foto")));
};

export const getRegistrationByUserId = async (userId: string) => {
  const result = await db
    .select({
      id: registrations.id,
      name: user.name,
      email: user.email,
      nik: profiles.nik,
      nisn: profiles.nisn,
      placeOfBirth: profiles.placeOfBirth,
      dateOfBirth: profiles.dateOfBirth,
      gender: profiles.gender,
      religion: profiles.religion,
      hobby: profiles.hobby,
      ambition: profiles.ambition,
      address: profiles.address,
      province: profiles.province,
      city: profiles.city,
      district: profiles.district,
      phone: profiles.phone,
      photo: user.image,
      fatherName: profiles.fatherName,
      fatherPhone: profiles.parentPhone,
      fatherJob: profiles.fatherJob,
      fatherIncome: profiles.fatherIncome,
      motherName: profiles.motherName,
      motherPhone: profiles.parentPhone,
      motherJob: profiles.motherJob,
      motherIncome: profiles.motherIncome,
      parentPhone: profiles.parentPhone,
      previousSchool: profiles.previousSchool,
      originSchoolNpsn: profiles.originSchoolNpsn,
      program: profiles.program, // Source from profiles.program as API saves it there
      registrationDate: registrations.registeredAt,
      registrationNumber: registrations.registrationNumber,
      status: registrations.status,
      verifiedBy: registrations.verifiedBy,
    })
    .from(registrations)
    .innerJoin(user, eq(registrations.userId, user.id))
    .leftJoin(profiles, eq(registrations.profileId, profiles.id))
    .leftJoin(registrationPaths, eq(registrations.registrationPathId, registrationPaths.id))
    .where(eq(user.id, userId))
    .limit(1);

  return result[0] || null;
};

/**
 * Ensures a user has a registration record. 
 * If not, creates one with a generated registration number.
 */
export const ensureRegistration = async (userId: string) => {
  const existing = await getRegistrationByUserId(userId);
  if (existing) return existing;

  const { createId } = await import("@paralleldrive/cuid2");
  const { academicYears } = await import("../schema/academicYears");
  const { registrationPaths } = await import("../schema/registrationPath");
  const { profiles } = await import("../schema/profiles");

  return await db.transaction(async (tx) => {
    // 1. Get Active Academic Year
    const activeYearResult = await tx.select().from(academicYears).where(eq(academicYears.isActive, true)).limit(1);
    const activeYear = activeYearResult[0];
    if (!activeYear) throw new Error("No active academic year found");

    // 2. Get Default Registration Path (first active one)
    const pathResult = await tx.select().from(registrationPaths).where(eq(registrationPaths.isActive, true)).limit(1);
    const path = pathResult[0];
    if (!path) throw new Error("No active registration path found");

    // 3. Create Profile if missing
    const existingProfile = await tx.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);
    let profileId: string;
    
    if (existingProfile.length > 0) {
      profileId = existingProfile[0].id;
    } else {
      profileId = createId();
      await tx.insert(profiles).values({
        id: profileId,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // 4. Generate Registration Number
    // Format: REG-YYYYMMDDXXXX
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000); // 4 digits
    const regNumber = `REG-${dateStr}${randomSuffix}`;

    const { REGISTRATION_STATUS } = await import("../../lib/utils/status");

    // 5. Create Registration
    const regId = createId();
    await tx.insert(registrations).values({
      id: regId,
      userId,
      profileId,
      academicYearId: activeYear.id,
      registrationPathId: path.id,
      registrationNumber: regNumber,
      status: REGISTRATION_STATUS.DRAFT,
      registeredAt: now,
      createdAt: now,
      updatedAt: now,
    });

    return await getRegistrationByUserId(userId);
  });
};
export const updateRegistrationStatus = async (id: string, status: string) => {
    return await db.update(registrations).set({ status, updatedAt: new Date() }).where(eq(registrations.id, id));
};

export const updateRegistration = async (id: string, data: any) => {
    return await db.update(registrations).set({ ...data, updatedAt: new Date() }).where(eq(registrations.id, id));
};
