import { mysqlTable, varchar, datetime, index } from "drizzle-orm/mysql-core";
import { user } from "./auth-schema";
import { profiles } from "./profiles";
import { academicYears } from "./academicYears";
import { registrationPaths } from "./registrationPath";
import { sql } from "drizzle-orm";

export const registrations = mysqlTable(
  "registrations",
  {
    id: varchar("id", { length: 191 }).primaryKey(),
    userId: varchar("user_id", { length: 191 }).notNull().references(() => user.id),
    profileId: varchar("profile_id", { length: 191 }).notNull().references(() => profiles.id),
    academicYearId: varchar("academic_year_id", { length: 191 }).notNull().references(() => academicYears.id),
    registrationPathId: varchar("registration_path_id", { length: 191 }).notNull().references(() => registrationPaths.id),
    registrationNumber: varchar("registration_number", { length: 100 }),
    status: varchar("status", { length: 50 }).default("DRAFT"),
    registeredAt: datetime("registered_at"),
    verifiedAt: datetime("verified_at"),
    verifiedBy: varchar("verified_by", { length: 191 }),
    createdAt: datetime("created_at", { fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
    updatedAt: datetime("updated_at", { fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
    deletedAt: datetime("deleted_at", { fsp: 3 }),
  },
  (t) => [
    index("registrations_user_idx").on(t.userId),
    index("registrations_profile_idx").on(t.profileId),
    index("registrations_academic_year_idx").on(t.academicYearId),
    index("registrations_registration_path_idx").on(t.registrationPathId),
  ]
);