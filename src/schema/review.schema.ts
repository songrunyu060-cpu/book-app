import {
  bigint,
  bigserial,
  index,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core"
import {
  createInsertSchema,
  createSelectSchema,
} from "drizzle-zod"
import z from "zod"

import { adminUsers } from "./admin_user.schema"
import { books } from "./book.schema"
import { users } from "./user.schema"

/** 书评表，对应《数据库表结构设计》5.13 */
export const bookReviews = pgTable(
  "book_reviews",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    userId: bigint("user_id", { mode: "number" })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    bookId: bigint("book_id", { mode: "number" })
      .notNull()
      .references(() => books.id, { onDelete: "cascade" }),
    // 评分
    rating: integer("rating").notNull(),
    // 内容
    content: text("content").notNull(),
    status: text("status").notNull().default("pending"),
    // 驳回原因
    rejectReason: text("reject_reason"),
    // 审核人
    moderatorAdminId: bigint("moderator_admin_id", {
      mode: "number",
    }).references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    // 审核时间
    moderatedAt: timestamp("moderated_at", {
      withTimezone: true,
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
    index("idx_book_reviews_book_status").on(
      t.bookId,
      t.status
    ),
    index("idx_book_reviews_user_id").on(t.userId),
  ]
)

export const bookReviewsSelectSchema =
  createSelectSchema(bookReviews)
export const bookReviewsInsertSchema = createInsertSchema(
  bookReviews,
  {
    rating: z.number().int().min(1).max(5),
    status: z
      .enum(["pending", "approved", "rejected"])
      .optional(),
  }
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export const bookReviewsUpdateSchema =
  bookReviewsInsertSchema.partial()

export type BookReview = typeof bookReviews.$inferSelect
export type NewBookReview = typeof bookReviews.$inferInsert
