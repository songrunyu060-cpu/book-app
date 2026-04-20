import {
  bigint,
  bigserial,
  index,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core"
import {
  createInsertSchema,
  createSelectSchema,
} from "drizzle-zod"
import z from "zod"

import { books } from "./book.schema"
import { users } from "./user.schema"

/** 借阅记录表，对应《数据库表结构设计》5.8 */
export const borrowRecords = pgTable(
  "borrow_records",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    userId: bigint("user_id", { mode: "number" })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    bookId: bigint("book_id", { mode: "number" })
      .notNull()
      .references(() => books.id, { onDelete: "cascade" }),
    borrowedAt: timestamp("borrowed_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
    dueAt: timestamp("due_at", {
      withTimezone: true,
    }).notNull(),
    returnedAt: timestamp("returned_at", {
      withTimezone: true,
    }),
    status: text("status").notNull(),
    remark: text("remark"),
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
    index("idx_borrow_records_user_id").on(t.userId),
    index("idx_borrow_records_book_id").on(t.bookId),
    index("idx_borrow_records_status").on(t.status),
  ]
)

export const borrowRecordsSelectSchema =
  createSelectSchema(borrowRecords)
export const borrowRecordsInsertSchema = createInsertSchema(
  borrowRecords,
  {
    status: z.enum([
      "borrowed",
      "returned",
      "overdue",
      "cancelled",
    ]),
  }
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export const borrowRecordsUpdateSchema =
  borrowRecordsInsertSchema.partial()

export type BorrowRecord = typeof borrowRecords.$inferSelect
export type NewBorrowRecord =
  typeof borrowRecords.$inferInsert
