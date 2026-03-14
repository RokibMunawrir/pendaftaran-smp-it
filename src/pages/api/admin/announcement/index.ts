import type { APIRoute } from "astro";
import { createAnnouncement, deleteAnnouncement, getAnnouncements, updateAnnouncement } from "../../../../db/queries/announcement";

export const prerender = false;
export const GET: APIRoute = async () => {
    const announcements = await getAnnouncements()
    return new Response(JSON.stringify(announcements))
}

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json()
    const announcement = await createAnnouncement(body)
    return new Response(JSON.stringify(announcement)) 
}

export const PUT: APIRoute = async ({ request }) => {
    const body = await request.json()
    const announcement = await updateAnnouncement(body.id, body)
    return new Response(JSON.stringify(announcement)) 
}

export const DELETE: APIRoute = async ({ request }) => {
    const body = await request.json()
    const announcement = await deleteAnnouncement(body.id)
    return new Response(JSON.stringify(announcement)) 
}
