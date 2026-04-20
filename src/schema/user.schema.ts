import {
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

export const users = pgTable(
  "users",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    phone: varchar("phone", { length: 20 })
      .notNull()
      .unique(),
    passwordHash: text("password_hash"),
    nickname: varchar("nickname", { length: 64 }),
    avatarUrl: text("avatar_url"),
    role: text("role").notNull().default("user"),
    status: text("status").notNull().default("active"),
    lastLoginAt: timestamp("last_login_at", {
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
  (t) => [index("idx_users_status").on(t.status)]
)

// 生成查询和插入的 schema
export const usersSelectSchema = createSelectSchema(users)
export const usersInsertSchema = createInsertSchema(users, {
  phone: z.string().min(11).max(11),
  // nickname: z.string().min(1).max(64),
  // avatarUrl: z.string().url(),
  // role: z.enum(["user", "admin"]),
  // status: z.enum(["active", "inactive"]),
}).omit({
  id: true,
  lastLoginAt: true,
  createdAt: true,
  updatedAt: true,
})
export const usersUpdateSchema = usersInsertSchema.partial()
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
