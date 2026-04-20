import {
  bigserial,
  index,
  integer,
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

/** 轮播图表，对应《数据库表结构设计》5.11 */
export const banners = pgTable(
  "banners",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    imageUrl: text("image_url").notNull(),
    title: varchar("title", { length: 128 }),
    linkUrl: text("link_url"),
    sortOrder: integer("sort_order").notNull().default(0),
    status: text("status").notNull().default("active"),
    startAt: timestamp("start_at", { withTimezone: true }),
    endAt: timestamp("end_at", { withTimezone: true }),
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
    index("idx_banners_status_sort").on(
      t.status,
      t.sortOrder
    ),
  ]
)

export const bannersSelectSchema =
  createSelectSchema(banners)
export const bannersInsertSchema = createInsertSchema(
  banners,
  {
    status: z.enum(["active", "inactive"]).optional(),
  }
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export const bannersUpdateSchema =
  bannersInsertSchema.partial()

export type Banner = typeof banners.$inferSelect
export type NewBanner = typeof banners.$inferInsert
