import { g as getAcademicYears, a as getRegistrationPaths, c as createAcademicYear, s as setActiveAcademicYear, u as updateAcademicYear, b as createRegistrationPath, d as updateRegistrationPath, e as deleteRegistrationPath } from './registration-settings_0AOtr-1D.mjs';
import { a as auth } from './auth_BrZ9-7fq.mjs';
import { createId } from '@paralleldrive/cuid2';

const prerender = false;
const GET = async ({ request }) => {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    const [years, paths] = await Promise.all([
      getAcademicYears(),
      getRegistrationPaths()
    ]);
    return new Response(JSON.stringify({ years, paths }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
const POST = async ({ request }) => {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    const b = await request.json();
    const { action, type, data } = b;
    if (type === "year") {
      if (action === "create") {
        await createAcademicYear({
          id: createId(),
          year: data.year,
          isActive: data.isActive || false,
          startDate: data.startDate ? new Date(data.startDate) : null,
          endDate: data.endDate ? new Date(data.endDate) : null
        });
        return new Response(JSON.stringify({ message: "Academic year created" }), { status: 201 });
      }
      if (action === "setActive") {
        await setActiveAcademicYear(data.id);
        return new Response(JSON.stringify({ message: "Active year updated" }), { status: 200 });
      }
      if (action === "update") {
        await updateAcademicYear(data.id, {
          year: data.year,
          startDate: data.startDate ? new Date(data.startDate) : null,
          endDate: data.endDate ? new Date(data.endDate) : null
        });
        return new Response(JSON.stringify({ message: "Academic year updated" }), { status: 200 });
      }
    }
    if (type === "path") {
      if (action === "create") {
        await createRegistrationPath({
          id: createId(),
          name: data.name,
          description: data.description || "",
          quota: data.quota || 0,
          isActive: data.isActive !== void 0 ? data.isActive : true
        });
        return new Response(JSON.stringify({ message: "Registration path created" }), { status: 201 });
      }
      if (action === "update") {
        await updateRegistrationPath(data.id, {
          name: data.name,
          description: data.description,
          quota: data.quota,
          isActive: data.isActive
        });
        return new Response(JSON.stringify({ message: "Registration path updated" }), { status: 200 });
      }
      if (action === "delete") {
        await deleteRegistrationPath(data.id);
        return new Response(JSON.stringify({ message: "Registration path deleted" }), { status: 200 });
      }
    }
    return new Response(JSON.stringify({ error: "Invalid action or type" }), { status: 400 });
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
