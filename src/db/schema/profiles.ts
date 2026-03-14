import { mysqlTable, varchar, datetime, text, index } from "drizzle-orm/mysql-core";
import { users } from "./users";

export const profiles = mysqlTable(
  "profiles",
  {
    id: varchar("id", { length: 191 }).primaryKey(),
    userId: varchar("user_id", { length: 191 }).notNull().references(() => users.id),
    nik: varchar("nik", { length: 50 }),
    nisn: varchar("nisn", { length: 50 }),
    placeOfBirth: varchar("place_of_birth", { length: 191 }),
    dateOfBirth: datetime("date_of_birth"),
    gender: varchar("gender", { length: 20 }),
    phone: varchar("phone", { length: 20 }),
    address: text("address"),
    previousSchool: varchar("previous_school", { length: 191 }),
    fatherName: varchar("father_name", { length: 191 }),
    fatherJob: varchar("father_job", { length: 191 }),
    motherName: varchar("mother_name", { length: 191 }),
    motherJob: varchar("mother_job", { length: 191 }),
    parentPhone: varchar("parent_phone", { length: 20 }),
  },
  (t) => [
    index("profiles_user_idx").on(t.userId),
    index("profiles_nik_idx").on(t.nik),
    index("profiles_nisn_idx").on(t.nisn),
  ]
);