import { d as db } from './index_0YfntIbu.mjs';
import { d as documents } from './document_BE485zRI.mjs';
import { eq, and } from 'drizzle-orm';

const getDocumentsByRegistrationId = async (registrationId) => {
  return await db.select().from(documents).where(eq(documents.registrationId, registrationId));
};
const getDocumentByRegistrationIdAndType = async (registrationId, type) => {
  const result = await db.select().from(documents).where(and(eq(documents.registrationId, registrationId), eq(documents.type, type))).limit(1);
  return result[0] || null;
};
const upsertDocument = async (data) => {
  const existing = await getDocumentByRegistrationIdAndType(data.registrationId, data.type);
  if (existing) {
    return await db.update(documents).set({
      ...data,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(documents.id, existing.id));
  } else {
    return await db.insert(documents).values({
      ...data,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    });
  }
};
const updateDocumentStatus = async (id, status) => {
  const { DOCUMENT_STATUS } = await import('./status_Dwl0Qi7R.mjs');
  return await db.update(documents).set({
    status,
    verifiedAt: status === DOCUMENT_STATUS.VERIFIED ? /* @__PURE__ */ new Date() : null,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(documents.id, id));
};

export { upsertDocument as a, getDocumentsByRegistrationId as g, updateDocumentStatus as u };
