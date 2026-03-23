import { upsertPayment } from './payment_B_0QZpN7.mjs';
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
    const senderName = formData.get("senderName");
    const bankTujuan = formData.get("bankTujuan");
    const registrationId = formData.get("registrationId");
    if (!registrationId || !senderName || !bankTujuan) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }
    const { getPaymentByRegistrationId } = await import('./payment_B_0QZpN7.mjs');
    const { REGISTRATION_STATUS } = await import('./status_Dwl0Qi7R.mjs');
    const existing = await getPaymentByRegistrationId(registrationId);
    if (!file && !existing) {
      return new Response(JSON.stringify({ error: "File proof is required for new payment" }), { status: 400 });
    }
    let proofUrl = existing?.proofUrl || "";
    if (file && file.size > 0) {
      const fileName = `payment_${registrationId}_${file.name.replace(/\s+/g, "_")}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads", "payments", registrationId);
      const filePath = path.join(uploadDir, fileName);
      await fs.mkdir(uploadDir, { recursive: true });
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filePath, buffer);
      proofUrl = `/uploads/payments/${registrationId}/${fileName}`;
    }
    const paymentData = {
      id: existing?.id || createId(),
      registrationId,
      senderName,
      bankTujuan,
      proofUrl,
      status: REGISTRATION_STATUS.PENDING_VERIFICATION,
      paymentDate: /* @__PURE__ */ new Date()
    };
    await upsertPayment(paymentData);
    return new Response(JSON.stringify({
      message: existing ? "Payment information updated" : "Proof of payment uploaded successfully",
      proofUrl
    }), {
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
