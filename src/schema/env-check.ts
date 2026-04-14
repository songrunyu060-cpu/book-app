// 测试代码

import { pgTable, text, timestamp, bigserial } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const envCheck = pgTable("env_check", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  env: text("env").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const envCheckSelectSchema = createSelectSchema(envCheck);
export const envCheckInsertSchema = createInsertSchema(envCheck);
