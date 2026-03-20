export const REGISTRATION_STATUS = {
  REGISTERED: "REGISTERED",
  DRAFT: "DRAFT",
  PENDING_PAYMENT: "PENDING_PAYMENT",
  UPLOAD_DOCUMENT: "UPLOAD_DOCUMENT",
  VERIFYING: "VERIFYING",
  PENDING_VERIFICATION: "PENDING",
  TEST_INTERVIEW: "TEST_INTERVIEW",
  REVISION: "REVISION",
  REJECTED: "REJECTED",
  ACCEPTED: "ACCEPTED",
} as const;

export const DOCUMENT_STATUS = {
  PENDING: "PENDING",
  VERIFIED: "VERIFIED",
  REJECTED: "REJECTED",
} as const;

const statusMap: Record<string, string> = {
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
  INACTIVE: "badge-ghost",
};

export const roleBadge: Record<string, string> = {
  admin: "badge-primary",
  operator: "badge-secondary",
  santri: "badge-accent",
};

export const getStatusBadge = (status: string | null | undefined) => {
  if (!status) return "badge-ghost";
  
  const key = status.toUpperCase().replace(/\s+/g, '_');
  
  // Mapping Indonesian variants and other common variations to canonical keys
  const variants: Record<string, string> = {
    "DIVERIFIKASI": "VERIFIED",
    "MENUNGGU": "PENDING",
    "DITOLAK": "REJECTED",
  };

  const normalizedKey = variants[key] || key;
  return statusMap[normalizedKey] || "badge-ghost";
};

export const getRoleBadge = (role: string | null | undefined) => {
  if (!role) return "badge-ghost";
  return roleBadge[role] || "badge-ghost";
};
