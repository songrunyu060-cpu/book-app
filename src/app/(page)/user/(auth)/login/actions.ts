"use server"

import { redirect } from "next/navigation"
import { signIn } from "@/auth"

export type LoginWithPhoneOtpInput = {
  phone: string
  code: string
}

export type LoginWithPhoneOtpResult =
  | { ok: true }
  | { ok: false; message: string }

function loginFailureMessage(
  error: unknown
): string | null {
  if (
    !error ||
    typeof error !== "object" ||
    !("type" in error)
  ) {
    return null
  }
  const { type } = error as { type?: string }
  if (type === "CredentialsSignin") {
    return "验证码错误或已过期"
  }
  if (typeof type === "string") {
    return "登录失败，请稍后重试"
  }
  return null
}

export async function loginWithPhoneOtp(
  input: LoginWithPhoneOtpInput
): Promise<LoginWithPhoneOtpResult> {
  try {
    const result = await signIn("phone-otp", {
      phone: input.phone,
      code: input.code,
      redirect: false,
    })

    if (
      result &&
      typeof result === "object" &&
      "error" in result
    ) {
      return {
        ok: false,
        message:
          result.error === "CredentialsSignin"
            ? "验证码错误或已过期"
            : "登录失败，请稍后重试",
      }
    }

    redirect("/user/home")
  } catch (error: unknown) {
    const message = loginFailureMessage(error)
    if (message) {
      return { ok: false, message }
    }
    throw error
  }
}
