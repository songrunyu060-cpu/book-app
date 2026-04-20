import {
  bigint,
  bigserial,
  date,
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

import { bookTaxonomyNodes } from "./book_category.schema"

/** 图书主表，见《数据库表结构设计》5.6 */
export const books = pgTable(
  "books",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    categoryId: bigint("category_id", { mode: "number" })
      .notNull()
      .references(() => bookTaxonomyNodes.id, {
        onDelete: "restrict",
      }),
    title: varchar("title", { length: 255 }).notNull(),
    author: varchar("author", { length: 255 }),
    /** 封面图片 */
    coverUrl: text("cover_url"),
    /** 摘要 */
    summary: text("summary"),
    // 字数
    wordCount: integer("word_count").notNull().default(0),
    /** 总库存 */
    totalCopies: integer("total_copies")
      .notNull()
      .default(0),
    // 可用库存
    availableCopies: integer("available_copies")
      .notNull()
      .default(0),
    /** 状态 */
    status: text("status").notNull().default("on_sale"),
    /** 创建时间 */
    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
    /** 更新时间 */
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("idx_books_category_id").on(t.categoryId),
    index("idx_books_status").on(t.status),
  ]
)

export const booksSelectSchema = createSelectSchema(books)
export const booksInsertSchema = createInsertSchema(books, {
  title: z.string().min(1).max(255),
  author: z.string().max(255).optional().nullable(),
  status: z
    .enum(["draft", "on_sale", "off_sale"])
    .optional(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export const booksUpdateSchema = booksInsertSchema.partial()

export type Book = typeof books.$inferSelect
export type NewBook = typeof books.$inferInsert
