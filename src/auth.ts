import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {
  normalizePhone,
  isCnMobile,
} from "@/lib/auth/phone"
import { verifyOtp } from "@/lib/auth/otp-store"

/**
 * 约定：src/auth.ts 作为 Auth.js 配置入口。
 * 你可以在这里接入 Drizzle/Postgres：校验成功后「查找或创建用户」，并返回用户信息。
 */
export const { handlers, auth, signIn, signOut } = NextAuth(
  {
    providers: [
      Credentials({
        // 这个 id 会在客户端 signIn() 时用到
        id: "phone-otp",
        name: "Phone OTP",
        credentials: {
          phone: { label: "Phone", type: "text" },
          code: { label: "Code", type: "text" },
        },
        async authorize(credentials: {
          phone: string
          code: string
        }) {
          const phone = normalizePhone(
            String(credentials?.phone ?? "")
          )
          const code = String(
            credentials?.code ?? ""
          ).trim()

          if (!isCnMobile(phone) || !/^\d{6}$/.test(code))
            return null

          const result = verifyOtp(phone, code)
          if (result !== "ok") return null

          // TODO: 查找或创建用户（推荐用数据库 user 表）
          // 必须返回一个包含 id 的对象（string）
          return { id: phone, phone }
        },
      }),
    ],
    pages: {
      signIn: "/user/login",
    },
  }
)
