
import type { APIRoute } from "astro";
import { upsertPayment } from "../../../db/queries/payment";
import { createId } from "@paralleldrive/cuid2";
import fs from "fs/promises";
import path from "path";

import { auth } from "../../../lib/auth";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const senderName = formData.get("senderName") as string;
    const bankTujuan = formData.get("bankTujuan") as string;
    const registrationId = formData.get("registrationId") as string;

    if (!registrationId || !senderName || !bankTujuan) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const { getPaymentByRegistrationId } = await import("../../../db/queries/payment");
    const { REGISTRATION_STATUS } = await import("../../../lib/utils/status");
    const existing = await getPaymentByRegistrationId(registrationId);

    if (!file && !existing) {
      return new Response(JSON.stringify({ error: "File proof is required for new payment" }), { status: 400 });
    }

    let proofUrl = existing?.proofUrl || "";

    if (file && file.size > 0) {
      const fileName = `payment_${registrationId}_${file.name.replace(/\s+/g, "_")}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads", "payments", registrationId);
      const filePath = path.join(uploadDir, fileName);

      // Create directory if it doesn't exist
      await fs.mkdir(uploadDir, { recursive: true });

      // Save file
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filePath, buffer);

      proofUrl = `/uploads/payments/${registrationId}/${fileName}`;
    }

    // Update database
    const paymentData = {
      id: existing?.id || createId(),
      registrationId,
      senderName,
      bankTujuan,
      proofUrl,
      status: REGISTRATION_STATUS.PENDING_VERIFICATION,
      paymentDate: new Date(),
    };

    await upsertPayment(paymentData);

    return new Response(JSON.stringify({ 
      message: existing ? "Payment information updated" : "Proof of payment uploaded successfully", 
      proofUrl 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
