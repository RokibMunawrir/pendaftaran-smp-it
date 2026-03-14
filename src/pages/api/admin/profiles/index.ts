import type { APIRoute } from "astro";
import { createProfile, getProfiles, updateProfile } from "../../../../db/queries/profiles";

export const prerender = false;
export const GET: APIRoute = async () => {
    const profiles = await getProfiles()
    return new Response(JSON.stringify(profiles))
}

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json()
    const profile = await createProfile(body)
    return new Response(JSON.stringify(profile)) 
}

export const PUT: APIRoute = async ({ request }) => {
    const body = await request.json()
    const profile = await updateProfile(body)
    return new Response(JSON.stringify(profile)) 
}
