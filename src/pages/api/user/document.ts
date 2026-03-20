
import type { APIRoute } from "astro";
import { upsertDocument } from "../../../db/queries/documents";
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
    const file = formData.get("file") as File;
    const type = formData.get("type") as string;
    const registrationId = formData.get("registrationId") as string;

    if (!file || !type || !registrationId) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const fileName = `${type}_${registrationId}_${file.name}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", registrationId);
    const filePath = path.join(uploadDir, fileName);

    // Create directory if it doesn't exist
    await fs.mkdir(uploadDir, { recursive: true });

    // Save file
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    const fileUrl = `/uploads/${registrationId}/${fileName}`;

    const { DOCUMENT_STATUS } = await import("../../../lib/utils/status");

    // Update database
    const documentData = {
      id: createId(),
      registrationId,
      type,
      fileUrl,
      status: DOCUMENT_STATUS.PENDING,
      uploadDate: new Date(),
    };

    await upsertDocument(documentData);

    return new Response(JSON.stringify({ message: "File uploaded successfully", fileUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
