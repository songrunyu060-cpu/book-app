import {
  bigint,
  index,
  pgTable,
  primaryKey,
  timestamp,
} from "drizzle-orm/pg-core"
import {
  createInsertSchema,
  createSelectSchema,
} from "drizzle-zod"

import { books } from "./book.schema"
import { users } from "./user.schema"

/** 收藏表，对应《数据库表结构设计》5.7 */
export const userCollects = pgTable(
  "user_collects",
  {
    userId: bigint("user_id", { mode: "number" })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    bookId: bigint("book_id", { mode: "number" })
      .notNull()
      .references(() => books.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    primaryKey({
      columns: [t.userId, t.bookId],
      name: "user_collects_pkey",
    }),
    index("idx_user_collects_book_id").on(t.bookId),
  ]
)

export const userCollectsSelectSchema =
  createSelectSchema(userCollects)
export const userCollectsInsertSchema =
  createInsertSchema(userCollects)

export type UserCollect = typeof userCollects.$inferSelect
export type NewUserCollect =
  typeof userCollects.$inferInsert
