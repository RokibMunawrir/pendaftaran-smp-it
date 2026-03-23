import { g as getSettings, u as updateSettings, c as createSetting } from './settings_B91pbR9f.mjs';
import { a as auth } from './auth_BrZ9-7fq.mjs';

const prerender = false;
const GET = async ({ request }) => {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session || session.user.role !== "admin" && session.user.role !== "operator") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const settings = await getSettings();
  const data = settings?.[0]?.tesSchedule || null;
  return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
};
const POST = async ({ request }) => {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session || session.user.role !== "admin" && session.user.role !== "operator") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
  }
  const existingSettings = await getSettings();
  if (existingSettings && existingSettings.length > 0) {
    await updateSettings(existingSettings[0].id, {
      tesSchedule: body,
      updatedAt: /* @__PURE__ */ new Date()
    });
  } else {
    await createSetting({
      id: "default",
      tesSchedule: body,
      updatedAt: /* @__PURE__ */ new Date(),
      createdAt: /* @__PURE__ */ new Date()
    });
  }
  return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
