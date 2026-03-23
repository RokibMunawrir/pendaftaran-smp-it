import { d as db } from './index_0YfntIbu.mjs';
import { profiles } from './profiles_DqcVxMfK.mjs';
import { eq } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';
import { a as auth } from './auth_BrZ9-7fq.mjs';

const prerender = false;
const GET = async ({ request }) => {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const userId = session.user.id;
    const data = await db.select().from(profiles).where(eq(profiles.userId, userId));
    return new Response(JSON.stringify(data[0] || null), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
const POST = async ({ request }) => {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const userId = session.user.id;
    const b = await request.json();
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
      updatedAt: /* @__PURE__ */ new Date()
    };
    if (b.namaLengkap) {
      const { user } = await import('./auth-schema_DxQznFiq.mjs');
      await db.update(user).set({ name: b.namaLengkap }).where(eq(user.id, userId));
    }
    let profileId;
    if (existing.length > 0) {
      profileId = existing[0].id;
      await db.update(profiles).set(profileData).where(eq(profiles.userId, userId));
    } else {
      profileId = createId();
      await db.insert(profiles).values({
        id: profileId,
        ...profileData,
        createdAt: /* @__PURE__ */ new Date()
      });
    }
    const requiredFields = [
      "nik",
      "nisn",
      "placeOfBirth",
      "dateOfBirth",
      "gender",
      "religion",
      "fatherName",
      "fatherJob",
      "fatherIncome",
      "motherName",
      "motherJob",
      "motherIncome",
      "parentPhone",
      "address",
      "province",
      "city",
      "district",
      "previousSchool",
      "program"
    ];
    const isComplete = requiredFields.every((field) => {
      const value = profileData[field];
      return value !== null && value !== void 0 && value !== "";
    }) && !!b.namaLengkap;
    const { registrations } = await import('./registration_75Bi9R3x.mjs');
    const { REGISTRATION_STATUS } = await import('./status_Dwl0Qi7R.mjs');
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
    await db.update(registrations).set({
      status: newStatus,
      profileId,
      // ensure it's linked
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(registrations.userId, userId));
    return new Response(JSON.stringify({
      message: `Profile ${existing.length > 0 ? "updated" : "created"} successfully`,
      id: profileId,
      status: newStatus,
      isComplete
    }), { status: existing.length > 0 ? 200 : 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
