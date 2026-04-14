// 测试代码

import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/src/db";
import { envCheck } from "@/src/schema";

export async function GET() {
  const rows = await db
    .select()
    .from(envCheck)
    .orderBy(desc(envCheck.id))
    .limit(5);
  return NextResponse.json({ data: rows });
}
