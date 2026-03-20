import type { APIRoute } from "astro";
import { updateDocumentStatus } from "../../../db/queries/documents";
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
    const { DOCUMENT_STATUS } = await import("../../../lib/utils/status");

    if (!id || !status) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    if (!Object.values(DOCUMENT_STATUS).includes(status)) {
       return new Response(JSON.stringify({ error: "Invalid status" }), { status: 400 });
    }

    await updateDocumentStatus(id, status);

    return new Response(JSON.stringify({ message: "Document status updated successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Document update error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
