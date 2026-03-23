import { a as upsertDocument } from './documents_BLNw_htN.mjs';
import { createId } from '@paralleldrive/cuid2';
import fs from 'fs/promises';
import path from 'path';
import { a as auth } from './auth_BrZ9-7fq.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const formData = await request.formData();
    const file = formData.get("file");
    const type = formData.get("type");
    const registrationId = formData.get("registrationId");
    if (!file || !type || !registrationId) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }
    const fileName = `${type}_${registrationId}_${file.name}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", registrationId);
    const filePath = path.join(uploadDir, fileName);
    await fs.mkdir(uploadDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);
    const fileUrl = `/uploads/${registrationId}/${fileName}`;
    const { DOCUMENT_STATUS } = await import('./status_Dwl0Qi7R.mjs');
    const documentData = {
      id: createId(),
      registrationId,
      type,
      fileUrl,
      status: DOCUMENT_STATUS.PENDING,
      uploadDate: /* @__PURE__ */ new Date()
    };
    await upsertDocument(documentData);
    return new Response(JSON.stringify({ message: "File uploaded successfully", fileUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Upload error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
