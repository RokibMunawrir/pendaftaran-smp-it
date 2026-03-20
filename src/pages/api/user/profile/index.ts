
import type { APIRoute } from "astro";
import db from "../../../../db";
import { profiles } from "../../../../db/schema/profiles";
import { eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

import { auth } from "../../../../lib/auth";

export const prerender = false;

// GET: Fetch the profile for the current user
export const GET: APIRoute = async ({ request }) => {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const userId = session.user.id;
    
    const data = await db.select().from(profiles).where(eq(profiles.userId, userId));
    
    return new Response(JSON.stringify(data[0] || null), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

// POST/PUT: Upsert the profile
export const POST: APIRoute = async ({ request }) => {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const userId = session.user.id;
    const b = await request.json();
    
    // Check if profile exists
    const existing = await db.select().from(profiles).where(eq(profiles.userId, userId));
    
    const profileData = {
      userId,
      nik: b.nik,
      nisn: b.nisn,
      placeOfBirth: b.tempatLahir,
      dateOfBirth: b.tanggalLahir ? new Date(b.tanggalLahir) : null,
      gender: b.jenisKelamin,
      religion: b.agama,
      hobby: b.hobi,
      ambition: b.citaCita,
      phone: b.noTelpOrtu,
      parentPhone: b.noTelpOrtu,
      address: b.alamatLengkap,
      province: b.provinsi,
      city: b.kabupaten,
      district: b.kecamatan,
      previousSchool: b.asalSekolah,
      originSchoolNpsn: b.npsnSekolahAsal,
      fatherName: b.namaAyah,
      fatherJob: b.pekerjaanAyah,
      fatherIncome: b.penghasilanAyah,
      motherName: b.namaIbu,
      motherJob: b.pekerjaanIbu,
      motherIncome: b.penghasilanIbu,
      program: b.program,
      updatedAt: new Date(),
    };

    // 1. Update User Name if provided
    if (b.namaLengkap) {
      const { user } = await import("../../../../db/schema/auth-schema");
      await db.update(user)
        .set({ name: b.namaLengkap })
        .where(eq(user.id, userId));
    }

    // 2. Upsert Profile
    let profileId: string;
    if (existing.length > 0) {
      profileId = existing[0].id;
      await db.update(profiles)
        .set(profileData)
        .where(eq(profiles.userId, userId));
    } else {
      profileId = createId();
      await db.insert(profiles).values({
        id: profileId,
        ...profileData,
        createdAt: new Date(),
      });
    }

    // 3. Check Completeness & Update Registration Status
    const requiredFields = [
      'nik', 'nisn', 'placeOfBirth', 'dateOfBirth', 'gender', 'religion',
      'fatherName', 'fatherJob', 'fatherIncome', 'motherName', 'motherJob',
      'motherIncome', 'parentPhone', 'address', 'province', 'city',
      'district', 'previousSchool', 'program'
    ];
    
    const isComplete = requiredFields.every(field => {
      const value = (profileData as any)[field];
      return value !== null && value !== undefined && value !== '';
    }) && !!b.namaLengkap;

    // Fetch current registration to check status
    const { registrations } = await import("../../../../db/schema/registration");
    const { REGISTRATION_STATUS } = await import("../../../../lib/utils/status");
    const currentReg = await db.select().from(registrations).where(eq(registrations.userId, userId)).limit(1);
    const existingStatus = currentReg[0]?.status || REGISTRATION_STATUS.DRAFT;

    const normalizedExistingStatus = existingStatus.toUpperCase();
    let newStatus = normalizedExistingStatus;

    if (isComplete) {
      newStatus = REGISTRATION_STATUS.PENDING_PAYMENT;
    } else {
      if (normalizedExistingStatus === REGISTRATION_STATUS.REGISTERED || normalizedExistingStatus === REGISTRATION_STATUS.DRAFT) {
        newStatus = REGISTRATION_STATUS.DRAFT;
      }
    }

    // Update registration status
    await db.update(registrations)
      .set({ 
        status: newStatus,
        profileId: profileId, // ensure it's linked
        updatedAt: new Date() 
      })
      .where(eq(registrations.userId, userId));

    return new Response(JSON.stringify({ 
      message: `Profile ${existing.length > 0 ? 'updated' : 'created'} successfully`, 
      id: profileId,
      status: newStatus,
      isComplete 
    }), { status: existing.length > 0 ? 200 : 201 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
