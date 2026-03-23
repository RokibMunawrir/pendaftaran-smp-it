import { a as auth } from './auth_BrZ9-7fq.mjs';
import { d as db } from './index_0YfntIbu.mjs';
import { a as announcements } from './announcement_BC0Oyqeh.mjs';
import { eq, desc } from 'drizzle-orm';

const prerender = false;
const GET = async ({ request }) => {
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  try {
    const data = await db.select({ createdAt: announcements.createdAt }).from(announcements).where(eq(announcements.isPublished, true)).orderBy(desc(announcements.createdAt)).limit(1);
    const latestTimestamp = data.length > 0 ? data[0].createdAt : null;
    return new Response(JSON.stringify({ latestTimestamp }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
