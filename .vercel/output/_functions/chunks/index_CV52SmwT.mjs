import { d as deleteAnnouncement, g as getAnnouncements, c as createAnnouncement, u as updateAnnouncement } from './announcement_P7PWMKGR.mjs';

const prerender = false;
const GET = async () => {
  const announcements = await getAnnouncements();
  return new Response(JSON.stringify(announcements));
};
const POST = async ({ request }) => {
  const body = await request.json();
  const announcement = await createAnnouncement(body);
  return new Response(JSON.stringify(announcement));
};
const PUT = async ({ request }) => {
  const body = await request.json();
  const announcement = await updateAnnouncement(body.id, body);
  return new Response(JSON.stringify(announcement));
};
const DELETE = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });
  }
  const announcement = await deleteAnnouncement(id);
  return new Response(JSON.stringify(announcement));
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    DELETE,
    GET,
    POST,
    PUT,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
