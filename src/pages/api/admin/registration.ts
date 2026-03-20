import type { APIRoute } from "astro";
import { updateRegistration } from "../../../db/queries/registrations";
import { auth } from "../../../lib/auth";
import { REGISTRATION_STATUS } from "../../../lib/utils/status";

export const prerender = false;

export const PATCH: APIRoute = async ({ request }) => {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session || (session.user.role !== "admin" && session.user.role !== "operator")) {
       return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { id, status, notes } = await request.json();
    console.log(notes);
    if (!id || !status) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // Determine verification info based on status
    const updateData: any = { status };
    
    if (status === REGISTRATION_STATUS.TEST_INTERVIEW) {
      updateData.verifiedAt = new Date();
      updateData.verifiedBy = session.user.id;
    }

    await updateRegistration(id, updateData);

    return new Response(JSON.stringify({ message: "Registration status updated successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Registration update error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
