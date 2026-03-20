import db from "../index";
import { documents } from "../schema/document";
import { eq, and } from "drizzle-orm";

export const getDocumentsByRegistrationId = async (registrationId: string) => {
  return await db.select().from(documents).where(eq(documents.registrationId, registrationId));
};

export const getDocumentByRegistrationIdAndType = async (registrationId: string, type: string) => {
  const result = await db
    .select()
    .from(documents)
    .where(and(eq(documents.registrationId, registrationId), eq(documents.type, type)))
    .limit(1);
  return result[0] || null;
};

export const upsertDocument = async (data: any) => {
  const existing = await getDocumentByRegistrationIdAndType(data.registrationId, data.type);
  
  if (existing) {
    return await db.update(documents).set({
      ...data,
      updatedAt: new Date(),
    }).where(eq(documents.id, existing.id));
  } else {
    return await db.insert(documents).values({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
};
export const updateDocumentStatus = async (id: string, status: string) => {
  const { DOCUMENT_STATUS } = await import("../../lib/utils/status");
  return await db
    .update(documents)
    .set({
      status,
      verifiedAt: status === DOCUMENT_STATUS.VERIFIED ? new Date() : null,
      updatedAt: new Date(),
    })
    .where(eq(documents.id, id));
};
