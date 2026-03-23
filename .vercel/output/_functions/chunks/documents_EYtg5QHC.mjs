import { u as updateDocumentStatus } from './documents_BLNw_htN.mjs';
import { a as auth } from './auth_BrZ9-7fq.mjs';

const prerender = false;
const PATCH = async ({ request }) => {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });
    if (!session || session.user.role !== "admin") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const { id, status } = await request.json();
    const { DOCUMENT_STATUS } = await import('./status_Dwl0Qi7R.mjs');
    if (!id || !status) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }
    if (!Object.values(DOCUMENT_STATUS).includes(status)) {
      return new Response(JSON.stringify({ error: "Invalid status" }), { status: 400 });
    }
    await updateDocumentStatus(id, status);
    return new Response(JSON.stringify({ message: "Document status updated successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Document update error:", error);
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
