import { updatePayment, getPaymentById } from './payment_B_0QZpN7.mjs';
import { u as updateRegistrationStatus } from './registrations_D6_46JUM.mjs';
import { REGISTRATION_STATUS } from './status_Dwl0Qi7R.mjs';
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
    if (!id || !status) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }
    await updatePayment(id, {
      status,
      verifiedAt: status === "VERIFIED" ? /* @__PURE__ */ new Date() : null,
      verifiedBy: status === "VERIFIED" ? session.user.id : null
    });
    if (status === "VERIFIED") {
      const payment = await getPaymentById(id);
      if (payment && payment.registrationId) {
        await updateRegistrationStatus(payment.registrationId, REGISTRATION_STATUS.UPLOAD_DOCUMENT);
      }
    }
    return new Response(JSON.stringify({ message: "Payment status updated successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Payment update error:", error);
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
