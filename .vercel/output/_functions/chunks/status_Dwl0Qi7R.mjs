const REGISTRATION_STATUS = {
  REGISTERED: "REGISTERED",
  DRAFT: "DRAFT",
  PENDING_PAYMENT: "PENDING_PAYMENT",
  UPLOAD_DOCUMENT: "UPLOAD_DOCUMENT",
  VERIFYING: "VERIFYING",
  PENDING_VERIFICATION: "PENDING",
  TEST_INTERVIEW: "TEST_INTERVIEW",
  REVISION: "REVISION",
  REJECTED: "REJECTED",
  ACCEPTED: "ACCEPTED"
};
const DOCUMENT_STATUS = {
  PENDING: "PENDING",
  VERIFIED: "VERIFIED",
  REJECTED: "REJECTED"
};
const statusMap = {
  VERIFIED: "badge-success",
  DRAFT: "badge-warning",
  REJECTED: "badge-error",
  PENDING: "badge-info",
  PENDING_PAYMENT: "badge-info",
  UPLOAD_DOCUMENT: "badge-info",
  VERIFYING: "badge-info",
  TEST_INTERVIEW: "badge-secondary",
  REVISION: "badge-error",
  ACCEPTED: "badge-success",
  ACTIVE: "badge-success",
  INACTIVE: "badge-ghost"
};
const roleBadge = {
  admin: "badge-primary",
  operator: "badge-secondary",
  santri: "badge-accent"
};
const getStatusBadge = (status) => {
  if (!status) return "badge-ghost";
  const key = status.toUpperCase().replace(/\s+/g, "_");
  const variants = {
    "DIVERIFIKASI": "VERIFIED",
    "MENUNGGU": "PENDING",
    "DITOLAK": "REJECTED"
  };
  const normalizedKey = variants[key] || key;
  return statusMap[normalizedKey] || "badge-ghost";
};
const getRoleBadge = (role) => {
  if (!role) return "badge-ghost";
  return roleBadge[role] || "badge-ghost";
};

export { DOCUMENT_STATUS, REGISTRATION_STATUS, getRoleBadge, getStatusBadge, roleBadge };
