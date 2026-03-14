import db from "../index";
import { registrations } from "../schema/registration";
import { users } from "../schema/users";
import { profiles } from "../schema/profiles";
import { registrationPaths } from "../schema/registrationPath";
import { eq } from "drizzle-orm";

export const getRegistrations = async () => {
  return await db
    .select({
      id: registrations.id,
      userId: users.id,
      name: users.name,
      email: users.email,
      origin: profiles.placeOfBirth, // Or wherever origin should come from, usually place of birth or address
      parentName: profiles.fatherName,
      program: registrationPaths.name,
      status: registrations.status,
      registeredAt: registrations.registeredAt,
    })
    .from(registrations)
    .innerJoin(users, eq(registrations.userId, users.id))
    .innerJoin(profiles, eq(registrations.profileId, profiles.id))
    .innerJoin(registrationPaths, eq(registrations.registrationPathId, registrationPaths.id));
};

export const getRegistrationByUserId = async (userId: string) => {
  const result = await db
    .select({
      id: registrations.id,
      name: users.name,
      email: users.email,
      nickname: profiles.nik, // Using NIK as placeholder if nickname not exists, or adjust as needed
      birthPlace: profiles.placeOfBirth,
      birthDate: profiles.dateOfBirth,
      gender: profiles.gender,
      address: profiles.address,
      phone: profiles.phone,
      photo: users.image,
      parentName: profiles.fatherName,
      parentPhone: profiles.parentPhone,
      parentJob: profiles.fatherJob,
      parentAddress: profiles.address, // Reusing address
      motherName: profiles.motherName,
      motherPhone: profiles.parentPhone, // Same phone
      motherJob: profiles.motherJob,
      previousSchool: profiles.previousSchool,
      previousSchoolAddress: profiles.address, // Reusing
      program: registrationPaths.name,
      registrationDate: registrations.registeredAt,
      status: registrations.status,
    })
    .from(registrations)
    .innerJoin(users, eq(registrations.userId, users.id))
    .innerJoin(profiles, eq(registrations.profileId, profiles.id))
    .innerJoin(registrationPaths, eq(registrations.registrationPathId, registrationPaths.id))
    .where(eq(users.id, userId))
    .limit(1);

  return result[0] || null;
};
