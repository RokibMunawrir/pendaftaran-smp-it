import type { APIRoute } from "astro";
import { auth } from "../../../../lib/auth";
import db from "../../../../db/index";
import { announcements } from "../../../../db/schema/announcement";
import { eq, desc } from "drizzle-orm";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    try {
        const data = await db.select()
            .from(announcements)
            .where(eq(announcements.isPublished, true))
            .orderBy(desc(announcements.createdAt));

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
