import {
  bigserial,
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

export const adminUsers = pgTable("admin_users", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  username: varchar("username", { length: 64 })
    .notNull()
    .unique(),
  passwordHash: text("password_hash").notNull(),
  displayName: varchar("display_name", { length: 64 }),
  role: text("role").notNull().default("editor"),
  status: text("status").notNull().default("active"),
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
})

export const adminUsersSelectSchema =
  createSelectSchema(adminUsers)
export const adminUsersInsertSchema = createInsertSchema(
  adminUsers,
  {
    username: z.string().min(1).max(64),
  }
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
export const adminUsersUpdateSchema =
  adminUsersInsertSchema.partial()

export type AdminUser = typeof adminUsers.$inferSelect
export type NewAdminUser = typeof adminUsers.$inferInsert
