import { mysqlTable, varchar, text, datetime, json } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const settings = mysqlTable("settings", {

  id: varchar("id", { length: 191 }).primaryKey(),

  updatedAt: datetime("updatedAt", { fsp: 3 }).notNull(),

  createdAt: datetime("createdAt", { fsp: 3 })
    .default(sql`CURRENT_TIMESTAMP(3)`)
    .notNull(),

  siteName: varchar("siteName", { length: 191 }),

  logo: text("logo"),

  heroTitle: varchar("heroTitle", { length: 191 }),

  heroSubtitle: text("heroSubtitle"),

  heroImage: text("heroImage"),

  heroCtaText: varchar("heroCtaText", { length: 191 }),

  heroCtaLink: varchar("heroCtaLink", { length: 191 }),

  aboutTitle: varchar("aboutTitle", { length: 191 }),

  aboutDescription: text("aboutDescription"),

  aboutImage: text("aboutImage"),

  agenda: json("agenda"),

  biaya: json("biaya"),

  faq: json("faq"),

  features: json("features"),

  announcementBanner: text("announcementBanner"),

  announcements: json("announcements"),

  contactAddress: text("contactAddress"),

  contactEmail: varchar("contactEmail", { length: 191 }),

  contactPhone: varchar("contactPhone", { length: 191 }),

  contactMapEmbed: text("contactMapEmbed"),

  socialFacebook: varchar("socialFacebook", { length: 191 }),

  socialInstagram: varchar("socialInstagram", { length: 191 }),

  socialWhatsapp: varchar("socialWhatsapp", { length: 191 }),

  socialYoutube: varchar("socialYoutube", { length: 191 }),

  footer: varchar("footer", { length: 191 })

})