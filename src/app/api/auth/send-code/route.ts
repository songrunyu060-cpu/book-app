import { NextResponse } from "next/server"
import { randomSixDigitCode } from "@/lib/auth/otp"
import { saveOtp } from "@/lib/auth/otp-store"
import {
  isCnMobile,
  normalizePhone,
} from "@/lib/auth/phone"
import { getSmsSender } from "@/lib/auth/sms"

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    phone?: string
  } | null
  const phone = normalizePhone(body?.phone ?? "")

  if (!isCnMobile(phone)) {
    return NextResponse.json(
      { ok: false, message: "手机号格式不正确" },
      { status: 400 }
    )
  }

  // if (!allowSend(phone)) {
  //   return NextResponse.json({ ok: false, message: "发送过于频繁，请稍后再试" }, { status: 429 })
  // }

  // 生成6位随机验证码
  const code = randomSixDigitCode()

  // 保存验证码到内存
  saveOtp(phone, code)

  const sms = getSmsSender()
  // 发送验证码到手机
  const sent = await sms.sendLoginCode(phone, code)
  if (!sent.ok) {
    return NextResponse.json(
      { ok: false, message: sent.message },
      { status: 502 }
    )
  }

  const isDev =
    process.env.NEXT_PUBLIC_APP_ENV === "development"
  const exposeDebug =
    isDev && process.env.SMS_EXPOSE_DEBUG_CODE === "true"

  return NextResponse.json({
    ok: true,
    // 仅本地调试可开；生产必须为 false
    ...(exposeDebug ? { debugCode: code } : {}),
  })
}
