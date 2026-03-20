import type { APIRoute } from "astro"
import { getSettings, updateSettings, createSetting } from "../../../../db/queries/settings"
import { auth } from "../../../../lib/auth"

export const prerender = false

export const GET: APIRoute = async ({ request }) => {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session || (session.user.role !== "admin" && session.user.role !== "operator")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const settings = await getSettings();
  const data = settings?.[0]?.tesSchedule || null;
  return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
};

export const POST: APIRoute = async ({ request }) => {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session || (session.user.role !== "admin" && session.user.role !== "operator")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
  }

  const existingSettings = await getSettings();
  
  if (existingSettings && existingSettings.length > 0) {
    await updateSettings(existingSettings[0].id, {
      tesSchedule: body,
      updatedAt: new Date(),
    });
  } else {
    await createSetting({
      id: "default",
      tesSchedule: body,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
  }

  return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
};
