import {
  bigint,
  bigserial,
  boolean,
  foreignKey,
  index,
  integer,
  pgTable,
  primaryKey,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core"
import {
  createInsertSchema,
  createSelectSchema,
} from "drizzle-zod"
import z from "zod"

import { books } from "./book.schema"

/**
 * 图书筛选分类树（后台可任意增删）。
 * - `parent_id` 为 **null**：一级，如「读者」「内容」「状态」…
 * - `parent_id` 指向某一级 id：其下二级，如「男生」「幽默」「已完结」…
 * 树深度不限；产品常见为两级。一级、二级均为数据行，无 Postgres ENUM。
 */
export const bookTaxonomyNodes = pgTable(
  "book_taxonomy_nodes",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    parentId: bigint("parent_id", { mode: "number" }),
    name: varchar("name", { length: 128 }).notNull(),
    slug: varchar("slug", { length: 64 }),
    sortOrder: integer("sort_order").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
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
    foreignKey({
      columns: [t.parentId],
      foreignColumns: [t.id],
      name: "book_taxonomy_nodes_parent_id_fkey",
    }),
    index("idx_book_taxonomy_parent").on(t.parentId),
    index("idx_book_taxonomy_parent_active_sort").on(
      t.parentId,
      t.isActive,
      t.sortOrder
    ),
    uniqueIndex("uq_book_taxonomy_parent_name").on(
      t.parentId,
      t.name
    ),
  ]
)

/**
 * 图书与「分类节点」多对多。建议只关联 **叶子节点**（二级选项），由业务层校验；
 * 若需关联一级，也可入库但筛选语义需自行约定。
 */
export const bookTaxonomyLinks = pgTable(
  "book_taxonomy_links",
  {
    bookId: bigint("book_id", { mode: "number" })
      .notNull()
      // 图书删除 → 关联记录自动删
      .references(() => books.id, { onDelete: "cascade" }),
    nodeId: bigint("node_id", { mode: "number" })
      .notNull()
      // 分类节点删除 → 关联记录自动删除
      .references(() => bookTaxonomyNodes.id, {
        onDelete: "cascade",
      }),
  },
  (t) => [
    primaryKey({
      columns: [t.bookId, t.nodeId],
      name: "book_taxonomy_links_pkey",
    }),
    index("idx_book_taxonomy_links_node_id").on(t.nodeId),
  ]
)

export const bookTaxonomyNodesSelectSchema =
  createSelectSchema(bookTaxonomyNodes)
export const bookTaxonomyNodesInsertSchema =
  createInsertSchema(bookTaxonomyNodes, {
    name: z.string().min(1).max(128),
    slug: z.string().min(1).max(64).optional().nullable(),
  }).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
export const bookTaxonomyNodesUpdateSchema =
  bookTaxonomyNodesInsertSchema.partial()

export type BookTaxonomyNode =
  typeof bookTaxonomyNodes.$inferSelect
export type NewBookTaxonomyNode =
  typeof bookTaxonomyNodes.$inferInsert
export type BookTaxonomyLink =
  typeof bookTaxonomyLinks.$inferSelect
