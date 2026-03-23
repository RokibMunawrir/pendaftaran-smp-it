import { d as db } from './index_0YfntIbu.mjs';
import { registrations } from './registration_75Bi9R3x.mjs';
import { user } from './auth-schema_DxQznFiq.mjs';
import { profiles } from './profiles_DqcVxMfK.mjs';
import { r as registrationPaths } from './registrationPath_cVteuG_V.mjs';
import { d as documents } from './document_BE485zRI.mjs';
import { eq, and } from 'drizzle-orm';

const getRegistrations = async () => {
  return await db.select({
    id: registrations.id,
    userId: user.id,
    name: user.name,
    email: user.email,
    origin: profiles.placeOfBirth,
    // Or wherever origin should come from, usually place of birth or address
    parentName: profiles.fatherName,
    program: registrationPaths.name,
    status: registrations.status,
    registrationNumber: registrations.registrationNumber,
    registeredAt: registrations.registeredAt,
    avatarUrl: documents.fileUrl
  }).from(registrations).innerJoin(user, eq(registrations.userId, user.id)).innerJoin(profiles, eq(registrations.profileId, profiles.id)).innerJoin(registrationPaths, eq(registrations.registrationPathId, registrationPaths.id)).leftJoin(documents, and(eq(registrations.id, documents.registrationId), eq(documents.type, "foto")));
};
const getRegistrationByUserId = async (userId) => {
  const result = await db.select({
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
    program: profiles.program,
    // Source from profiles.program as API saves it there
    registrationDate: registrations.registeredAt,
    registrationNumber: registrations.registrationNumber,
    status: registrations.status,
    verifiedBy: registrations.verifiedBy
  }).from(registrations).innerJoin(user, eq(registrations.userId, user.id)).leftJoin(profiles, eq(registrations.profileId, profiles.id)).leftJoin(registrationPaths, eq(registrations.registrationPathId, registrationPaths.id)).where(eq(user.id, userId)).limit(1);
  return result[0] || null;
};
const ensureRegistration = async (userId) => {
  const existing = await getRegistrationByUserId(userId);
  if (existing) return existing;
  const { createId } = await import('@paralleldrive/cuid2');
  const { academicYears } = await import('./registrationPath_cVteuG_V.mjs').then(n => n.b);
  const { registrationPaths: registrationPaths2 } = await import('./registrationPath_cVteuG_V.mjs').then(n => n.c);
  const { profiles: profiles2 } = await import('./profiles_DqcVxMfK.mjs');
  return await db.transaction(async (tx) => {
    const activeYearResult = await tx.select().from(academicYears).where(eq(academicYears.isActive, true)).limit(1);
    const activeYear = activeYearResult[0];
    if (!activeYear) throw new Error("No active academic year found");
    const pathResult = await tx.select().from(registrationPaths2).where(eq(registrationPaths2.isActive, true)).limit(1);
    const path = pathResult[0];
    if (!path) throw new Error("No active registration path found");
    const existingProfile = await tx.select().from(profiles2).where(eq(profiles2.userId, userId)).limit(1);
    let profileId;
    if (existingProfile.length > 0) {
      profileId = existingProfile[0].id;
    } else {
      profileId = createId();
      await tx.insert(profiles2).values({
        id: profileId,
        userId,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      });
    }
    const now = /* @__PURE__ */ new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(1e3 + Math.random() * 9e3);
    const regNumber = `REG-${dateStr}${randomSuffix}`;
    const { REGISTRATION_STATUS } = await import('./status_Dwl0Qi7R.mjs');
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
      updatedAt: now
    });
    return await getRegistrationByUserId(userId);
  });
};
const updateRegistrationStatus = async (id, status) => {
  return await db.update(registrations).set({ status, updatedAt: /* @__PURE__ */ new Date() }).where(eq(registrations.id, id));
};
const updateRegistration = async (id, data) => {
  return await db.update(registrations).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(registrations.id, id));
};

export { getRegistrations as a, updateRegistration as b, ensureRegistration as e, getRegistrationByUserId as g, updateRegistrationStatus as u };
