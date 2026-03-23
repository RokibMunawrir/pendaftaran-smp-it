import { b as updateRegistration } from './registrations_D6_46JUM.mjs';
import { a as auth } from './auth_BrZ9-7fq.mjs';
import { REGISTRATION_STATUS } from './status_Dwl0Qi7R.mjs';

const prerender = false;
const PATCH = async ({ request }) => {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });
    if (!session || session.user.role !== "admin" && session.user.role !== "operator") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const { id, status, notes } = await request.json();
    console.log(notes);
    if (!id || !status) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }
    const updateData = { status };
    if (status === REGISTRATION_STATUS.TEST_INTERVIEW) {
      updateData.verifiedAt = /* @__PURE__ */ new Date();
      updateData.verifiedBy = session.user.id;
    }
    await updateRegistration(id, updateData);
    return new Response(JSON.stringify({ message: "Registration status updated successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Registration update error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  PATCH,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
