import { mysqlTable, varchar, datetime, text, index } from "drizzle-orm/mysql-core";
import { user } from "./auth-schema";
import { sql } from "drizzle-orm";

export const profiles = mysqlTable(
  "profiles",
  {
    id: varchar("id", { length: 191 }).primaryKey(),
    userId: varchar("user_id", { length: 191 }).notNull().references(() => user.id),
    nik: varchar("nik", { length: 50 }),
    nisn: varchar("nisn", { length: 50 }),
    placeOfBirth: varchar("place_of_birth", { length: 191 }),
    dateOfBirth: datetime("date_of_birth"),
    gender: varchar("gender", { length: 20 }),
    religion: varchar("religion", { length: 50 }),
    hobby: varchar("hobby", { length: 191 }),
    ambition: varchar("ambition", { length: 191 }),
    phone: varchar("phone", { length: 20 }),
    address: text("address"),
    province: varchar("province", { length: 191 }),
    city: varchar("city", { length: 191 }),
    district: varchar("district", { length: 191 }),
    previousSchool: varchar("previous_school", { length: 191 }),
    originSchoolNpsn: varchar("origin_school_npsn", { length: 50 }),
    fatherName: varchar("father_name", { length: 191 }),
    fatherJob: varchar("father_job", { length: 191 }),
    fatherIncome: varchar("father_income", { length: 191 }),
    motherName: varchar("mother_name", { length: 191 }),
    motherJob: varchar("mother_job", { length: 191 }),
    motherIncome: varchar("mother_income", { length: 191 }),
    parentPhone: varchar("parent_phone", { length: 20 }),
    program: varchar("program", { length: 191 }),
    createdAt: datetime("created_at", { fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
    updatedAt: datetime("updated_at", { fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
    deletedAt: datetime("deleted_at", { fsp: 3 }),
  },
  (t) => [
    index("profiles_user_idx").on(t.userId),
    index("profiles_nik_idx").on(t.nik),
    index("profiles_nisn_idx").on(t.nisn),
  ]
);