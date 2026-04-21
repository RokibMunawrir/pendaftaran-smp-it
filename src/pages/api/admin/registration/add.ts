import type { APIRoute } from "astro";
import { auth } from "../../../../lib/auth";
import { ensureRegistration } from "../../../../db/queries/registrations";
import db from "../../../../db/index";
import { profiles } from "../../../../db/schema/profiles";
import { eq } from "drizzle-orm";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session || (session.user.role !== "admin" && session.user.role !== "operator")) {
       return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { name, email, password, profile } = await request.json();

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: "Semua field harus diisi" }), { status: 400 });
    }

    // Buat user dengan API auth
    const userRes = await auth.api.createUser({
        body: {
            email,
            password,
            name,
            role: "user",
        },
        headers: request.headers
    });
    
    // Auth createUser returns user directly, we don't need to check .error in successful return 
    // because Better Auth throws an error on failure which is caught by the try-catch block
    if (!userRes?.user?.id) {
         return new Response(JSON.stringify({ error: "Gagal membuat akun" }), { status: 500 });
    }

    // Generate profile & registration
    await ensureRegistration(userRes.user.id);

    // Update Profile jika ada data tambahan
    if (profile && Object.keys(profile).length > 0) {
      // Pastikan string dateOfBirth diubah menjadi Date object sebelum disimpan ke database
      const updateData = { ...profile };
      if (updateData.dateOfBirth) {
        updateData.dateOfBirth = new Date(updateData.dateOfBirth);
      }
      
      await db.update(profiles).set(updateData).where(eq(profiles.userId, userRes.user.id));
    }

    return new Response(JSON.stringify({ 
      message: "Siswa berhasil ditambahkan", 
      user: userRes.user 
    }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Add student error:", error);
    return new Response(JSON.stringify({ 
        error: error.message || "Gagal menambahkan siswa" 
    }), { status: 500 });
  }
};
