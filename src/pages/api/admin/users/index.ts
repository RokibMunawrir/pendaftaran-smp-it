import type { APIRoute } from "astro";
import { auth } from "../../../../lib/auth";
import db from "../../../../db/index";
import { user } from "../../../../db/schema/auth-schema";
import { count, eq, like, or } from "drizzle-orm";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session || session.user.role !== "admin") {
         // Even if the schema says uppercase SANTRI, Better Auth might use lowercase 'admin'
         // I'll check if session.user.role exists and matches
         if (session?.user.role?.toLowerCase() !== "admin") {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
         }
    }

    const url = new URL(request.url);
    const search = url.searchParams.get("search") || "";
    
    try {
        let query = db.select().from(user);
        
        if (search) {
            // @ts-ignore - Drizzle query builder type changes after .where() and cannot be easily assigned back to the initial 'query' variable
            query = query.where(
                or(
                    like(user.name, `%${search}%`),
                    like(user.email, `%${search}%`)
                )
            );
        }

        const allUsers = await query;
        return new Response(JSON.stringify(allUsers), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};

export const POST: APIRoute = async ({ request }) => {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session || session.user.role?.toLowerCase() !== "admin") {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json();
    const { name, email, password, role, status } = body;

    if (!name || !email || !password) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    try {
        // Use Better Auth Admin API to create user (handles hashing)
        // @ts-expect-error - admin property is available at runtime but type inference might fail in some environments
        const newUser = await auth.api.admin.createUser({
            body: {
                email,
                password,
                name,
                role: role?.toLowerCase() || "operator",
            },
            headers: request.headers // Pass headers for admin context
        });

        // If status is different from default ACTIVE, update it manually as BA might not handle custom fields in createUser
        if (status && status !== "ACTIVE") {
             await db.update(user).set({ status }).where(eq(user.email, email));
        }

        return new Response(JSON.stringify(newUser), { status: 201 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};

export const PATCH: APIRoute = async ({ request }) => {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session || session.user.role?.toLowerCase() !== "admin") {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json();
    const { id, name, email, password, role, status } = body;

    if (!id) {
        return new Response(JSON.stringify({ error: "Missing user ID" }), { status: 400 });
    }

    try {
        // Cek admin protection
        const targetUser = await db.select().from(user).where(eq(user.id, id)).limit(1);
        if (targetUser.length === 0) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        // Jika mengubah role dari admin ke non-admin
        if (role && role.toLowerCase() !== "admin" && targetUser[0].role === "admin") {
            const adminCountResult = await db.select({ value: count() }).from(user).where(eq(user.role, "admin"));
            if (adminCountResult[0].value <= 1) {
                return new Response(JSON.stringify({ error: "Tidak dapat mengubah role admin terakhir. Harus ada minimal 1 admin." }), { status: 400 });
            }
        }

        // Update user details
        const updateData: any = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (role) updateData.role = role.toLowerCase();
        if (status) updateData.status = status;
        
        // Use Better Auth for password if provided
        if (password) {
            // @ts-expect-error - admin property is available at runtime but type inference might fail
            await auth.api.admin.setPassword({
                body: {
                    userId: id,
                    newPassword: password
                },
                headers: request.headers
            });
        }

        await db.update(user).set(updateData).where(eq(user.id, id));

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};

export const DELETE: APIRoute = async ({ request }) => {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session || session.user.role?.toLowerCase() !== "admin") {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
        return new Response(JSON.stringify({ error: "Missing user ID" }), { status: 400 });
    }

    try {
        // Cek admin protection
        const targetUser = await db.select().from(user).where(eq(user.id, id)).limit(1);
        if (targetUser.length === 0) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        if (targetUser[0].role === "admin") {
            // Jika hapus diri sendiri dan hanya ada 1 admin
            if (id === session.user.id) {
                const adminCountResult = await db.select({ value: count() }).from(user).where(eq(user.role, "admin"));
                if (adminCountResult[0].value <= 1) {
                    return new Response(JSON.stringify({ error: "Anda adalah admin terakhir. Anda tidak dapat menghapus diri sendiri." }), { status: 400 });
                }
            } else {
                // Jika hapus admin lain dan itu admin terakhir
                const adminCountResult = await db.select({ value: count() }).from(user).where(eq(user.role, "admin"));
                if (adminCountResult[0].value <= 1) {
                    return new Response(JSON.stringify({ error: "Tidak dapat menghapus admin terakhir." }), { status: 400 });
                }
            }
        }

        await db.delete(user).where(eq(user.id, id));
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
