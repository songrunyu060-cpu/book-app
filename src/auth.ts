import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { verifyOtp } from "@/lib/auth/otp-store"
import {
  isCnMobile,
  normalizePhone,
} from "@/lib/auth/phone"

/**
 * Auth.js（next-auth v5）配置入口。
 * 校验成功后可在 authorize 内查找或创建用户。
 */
export const { handlers, auth, signIn, signOut } = NextAuth(
  {
    secret: process.env.AUTH_SECRET,
    providers: [
      Credentials({
        id: "phone-otp",
        name: "手机号验证码登录",
        credentials: {
          phone: { label: "手机号", type: "text" },
          code: { label: "验证码", type: "text" },
        },
        async authorize(credentials) {
          const phone = normalizePhone(
            String(credentials?.phone ?? "")
          )
          const code = String(
            credentials?.code ?? ""
          ).trim()
          if (!isCnMobile(phone) || !/^\d{6}$/.test(code)) {
            return null
          }

          const result = verifyOtp(phone, code)
          if (result !== "ok") {
            return null
          }

          // TODO: 查找或创建用户（推荐用数据库 user 表）
          return { id: phone, phone }
        },
      }),
    ],
    pages: {
      signIn: "/user/login",
    },
    session: {
      strategy: "jwt",
    },
    callbacks: {
      jwt({ token, user }) {
        if (user?.phone) {
          token.phone = user.phone
        }
        return token
      },
      session({ session, token }) {
        if (session.user && token.phone) {
          session.user.phone = token.phone as string
        }
        return session
      },
    },
  }
)
