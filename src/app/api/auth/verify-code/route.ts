import { NextResponse } from "next/server"
import {
  normalizePhone,
  isCnMobile,
} from "@/lib/auth/phone"
import { verifyOtp } from "@/lib/auth/otp-store"

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    phone?: string
    code?: string
  } | null

  const phone = normalizePhone(body?.phone ?? "")
  const code = (body?.code ?? "").trim()

  if (!isCnMobile(phone) || !/^\d{6}$/.test(code)) {
    return NextResponse.json(
      { ok: false, message: "请求参数不正确" },
      { status: 400 }
    )
  }

  const result = verifyOtp(phone, code)
  if (result !== "ok") {
    // 对外统一文案，避免被用来探测用户
    return NextResponse.json(
      { ok: false, message: "验证码错误或已过期" },
      { status: 401 }
    )
  }

  // TODO: 查找或创建用户；签发 Cookie/JWT（见下一节）
  return NextResponse.json({ ok: true })
}
