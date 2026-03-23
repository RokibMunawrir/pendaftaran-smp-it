import { mysqlTable, datetime, boolean, varchar, int, text } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

const academicYears = mysqlTable("academic_years", {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => createId()),
  year: varchar("year", { length: 20 }).notNull(),
  isActive: boolean("is_active").default(false),
  startDate: datetime("start_date"),
  endDate: datetime("end_date"),
  createdAt: datetime("created_at", { fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
  updatedAt: datetime("updated_at", { fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
  deletedAt: datetime("deleted_at", { fsp: 3 })
});

const academicYears$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  academicYears
}, Symbol.toStringTag, { value: 'Module' }));

const registrationPaths = mysqlTable("registration_paths", {
  id: varchar("id", { length: 191 }).primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  quota: int("quota"),
  isActive: boolean("is_active").default(true),
  createdAt: datetime("created_at", { fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
  updatedAt: datetime("updated_at", { fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
  deletedAt: datetime("deleted_at", { fsp: 3 })
});

const registrationPath = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  registrationPaths
}, Symbol.toStringTag, { value: 'Module' }));

export { academicYears as a, academicYears$1 as b, registrationPath as c, registrationPaths as r };
