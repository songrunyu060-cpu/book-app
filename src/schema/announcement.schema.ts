import {
  bigint,
  bigserial,
  index,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"
import {
  createInsertSchema,
  createSelectSchema,
} from "drizzle-zod"
import z from "zod"

import { adminUsers } from "./admin_user.schema"

/** 公告表，对应《数据库表结构设计》5.9 */
export const announcements = pgTable(
  "announcements",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    body: text("body").notNull(),
    status: text("status").notNull().default("draft"),
    publishedAt: timestamp("published_at", {
      withTimezone: true,
    }),
    publisherAdminId: bigint("publisher_admin_id", {
      mode: "number",
    }).references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("idx_announcements_status_published_at").on(
      t.status,
      t.publishedAt
    ),
  ]
)

export const announcementsSelectSchema =
  createSelectSchema(announcements)
export const announcementsInsertSchema = createInsertSchema(
  announcements,
  {
    status: z
      .enum(["draft", "published", "archived"])
      .optional(),
  }
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export const announcementsUpdateSchema =
  announcementsInsertSchema.partial()

export type Announcement = typeof announcements.$inferSelect
export type NewAnnouncement =
  typeof announcements.$inferInsert
