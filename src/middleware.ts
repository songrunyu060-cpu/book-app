import { auth } from "@/auth" // 你的 auth.ts 导出的 auth
import { NextResponse } from "next/server"

// 不需要登录的白名单路径
const publicPaths = [
  "/user/login",
  "/user/home",
  "/user/books",
]

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const path = req.nextUrl.pathname

  // 如果访问的是需要登录的页面，且没登录 → 跳转到登录页
  if (!publicPaths.includes(path) && !isLoggedIn) {
    return NextResponse.redirect(
      new URL("/user/login", req.url)
    )
  }

  return NextResponse.next()
})

// 匹配所有路径
export const config = {
  // 排除 public 静态资源（如 /video/welcome.mp4），避免未登录时被重定向到登录页
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|video/).*)",
  ],
}
