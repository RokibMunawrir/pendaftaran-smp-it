import type { APIRoute } from "astro";
import { updatePayment, getPaymentById } from "../../../db/queries/payment";
import { updateRegistrationStatus } from "../../../db/queries/registrations";
import { REGISTRATION_STATUS } from "../../../lib/utils/status";
import { auth } from "../../../lib/auth";

export const prerender = false;

export const PATCH: APIRoute = async ({ request }) => {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
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
      verifiedAt: status === "VERIFIED" ? new Date() : null,
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
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Payment update error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
